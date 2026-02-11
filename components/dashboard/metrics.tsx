"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface MarketIndex {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function DashboardMetrics() {
  const [indices, setIndices] = useState<MarketIndex[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIndices() {
      try {
        const res = await fetch(
          "/api/stocks?symbols=^GSPC,^DJI,^IXIC,^RUT"
        )
        const data = await res.json()
        if (data.quotes) {
          setIndices(
            data.quotes
              .filter((q: any) => !q.error)
              .map((q: any) => ({
                symbol: q.symbol,
                name: getIndexName(q.symbol),
                price: q.price || 0,
                change: q.change || 0,
                changePercent: q.changePercent || 0,
              }))
          )
        }
      } catch {
        // Use fallback data if API fails
        setIndices([
          { symbol: "^GSPC", name: "S&P 500", price: 0, change: 0, changePercent: 0 },
          { symbol: "^DJI", name: "Dow Jones", price: 0, change: 0, changePercent: 0 },
          { symbol: "^IXIC", name: "NASDAQ", price: 0, change: 0, changePercent: 0 },
          { symbol: "^RUT", name: "Russell 2000", price: 0, change: 0, changePercent: 0 },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchIndices()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-5 bg-[#0D0D0D] rounded-2xl animate-pulse">
              <div className="h-4 w-24 bg-[#1A1A1A] rounded mb-3" />
              <div className="h-8 w-32 bg-[#1A1A1A] rounded mb-2" />
              <div className="h-4 w-20 bg-[#1A1A1A] rounded" />
            </div>
          ))
        : indices.map((idx) => {
            const isUp = idx.change >= 0
            return (
              <div key={idx.symbol} className="p-5 bg-[#0D0D0D] rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#919191] text-sm">{idx.name}</span>
                  <Activity className="h-4 w-4 text-[#919191]" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {idx.price > 0
                    ? idx.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "—"}
                </div>
                <div className={`flex items-center gap-1 text-sm ${isUp ? "text-[#86efac]" : "text-[#F87171]"}`}>
                  {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  <span>
                    {isUp ? "+" : ""}
                    {idx.change.toFixed(2)} ({isUp ? "+" : ""}
                    {idx.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            )
          })}
    </div>
  )
}

function getIndexName(symbol: string): string {
  const names: Record<string, string> = {
    "^GSPC": "S&P 500",
    "^DJI": "Dow Jones",
    "^IXIC": "NASDAQ",
    "^RUT": "Russell 2000",
  }
  return names[symbol] || symbol
}
