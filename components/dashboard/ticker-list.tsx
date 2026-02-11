"use client"

import { useEffect, useState } from "react"
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
}

const WATCH_LIST = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "JPM"]

export function TickerList() {
  const [stocks, setStocks] = useState<StockQuote[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch(`/api/stocks?symbols=${WATCH_LIST.join(",")}`)
        const data = await res.json()
        if (data.quotes) {
          setStocks(
            data.quotes
              .filter((q: any) => !q.error)
              .map((q: any) => ({
                symbol: q.symbol,
                name: q.name || q.symbol,
                price: q.price || 0,
                change: q.change || 0,
                changePercent: q.changePercent || 0,
                volume: q.volume || 0,
                marketCap: q.marketCap || 0,
              }))
          )
        }
      } catch {
        setStocks([])
      } finally {
        setLoading(false)
      }
    }
    fetchStocks()
  }, [])

  if (loading) {
    return (
      <div className="bg-[#0D0D0D] rounded-2xl p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-[#1A1A1A] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0D0D0D] rounded-2xl p-6">
      <h2 className="text-lg font-medium text-white mb-4">Watchlist</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#919191] text-sm">
              <th className="pb-4 text-left font-medium pl-2">
                <div className="flex items-center gap-1">
                  Symbol
                  <ChevronsUpDown className="h-3.5 w-3.5" />
                </div>
              </th>
              <th className="pb-4 text-left font-medium">Name</th>
              <th className="pb-4 text-right font-medium">Price</th>
              <th className="pb-4 text-right font-medium">Change</th>
              <th className="pb-4 text-right font-medium hidden lg:table-cell">Volume</th>
              <th className="pb-4 text-right font-medium hidden xl:table-cell pr-2">Mkt Cap</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => {
              const isUp = stock.change >= 0
              return (
                <tr
                  key={stock.symbol}
                  className="group hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="py-3 pl-2 rounded-l-xl">
                    <span className="font-bold text-white">{stock.symbol}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-[#919191] text-sm truncate max-w-[160px] block">
                      {stock.name}
                    </span>
                  </td>
                  <td className="py-3 text-right text-white font-medium">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 text-right font-medium rounded-r-xl xl:rounded-none ${
                      isUp ? "text-[#86efac]" : "text-[#F87171]"
                    }`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {isUp ? (
                        <ArrowUp className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5" />
                      )}
                      {isUp ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="py-3 text-right text-[#919191] text-sm hidden lg:table-cell">
                    {formatVolume(stock.volume)}
                  </td>
                  <td className="py-3 text-right text-[#919191] text-sm hidden xl:table-cell pr-2 rounded-r-xl">
                    {formatMarketCap(stock.marketCap)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatVolume(v: number): string {
  if (!v) return "—"
  if (v >= 1e9) return (v / 1e9).toFixed(1) + "B"
  if (v >= 1e6) return (v / 1e6).toFixed(1) + "M"
  if (v >= 1e3) return (v / 1e3).toFixed(1) + "K"
  return v.toString()
}

function formatMarketCap(v: number): string {
  if (!v) return "—"
  if (v >= 1e12) return "$" + (v / 1e12).toFixed(2) + "T"
  if (v >= 1e9) return "$" + (v / 1e9).toFixed(1) + "B"
  if (v >= 1e6) return "$" + (v / 1e6).toFixed(1) + "M"
  return "$" + v.toLocaleString()
}
