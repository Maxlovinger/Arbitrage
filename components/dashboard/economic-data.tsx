"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface EconomicIndicator {
  id: string
  title: string
  units: string
  frequency: string
  observations: { date: string; value: string }[]
}

export function EconomicData() {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFred() {
      try {
        const res = await fetch("/api/fred?type=regional")
        const data = await res.json()
        if (data.indicators) {
          setIndicators(
            data.indicators.filter((i: any) => !i.error)
          )
        }
      } catch {
        setIndicators([])
      } finally {
        setLoading(false)
      }
    }
    fetchFred()
  }, [])

  if (loading) {
    return (
      <div className="bg-[#0D0D0D] rounded-2xl p-6">
        <h2 className="text-lg font-medium text-white mb-4">Economic Indicators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-[#1A1A1A] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0D0D0D] rounded-2xl p-6">
      <h2 className="text-lg font-medium text-white mb-4">
        Economic Indicators{" "}
        <span className="text-xs text-[#919191] font-normal ml-2">via FRED</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {indicators.map((indicator) => {
          const latest = indicator.observations[0]
          const previous = indicator.observations[1]
          const latestVal = latest ? parseFloat(latest.value) : null
          const prevVal = previous ? parseFloat(previous.value) : null
          const change = latestVal != null && prevVal != null ? latestVal - prevVal : null
          const isUp = change != null && change >= 0

          return (
            <div key={indicator.id} className="p-4 bg-[#111] rounded-xl">
              <div className="text-xs text-[#919191] mb-1 truncate" title={indicator.title}>
                {indicator.title}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xl font-bold text-white">
                    {latestVal != null ? formatValue(latestVal, indicator.id) : "—"}
                  </div>
                  <div className="text-xs text-[#666] mt-0.5">
                    {indicator.units} &middot; {indicator.frequency}
                  </div>
                </div>
                {change != null && (
                  <div
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      isUp ? "text-[#86efac]" : "text-[#F87171]"
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {isUp ? "+" : ""}
                    {change.toFixed(2)}
                  </div>
                )}
              </div>
              {latest && (
                <div className="text-[10px] text-[#666] mt-2">
                  As of {latest.date}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function formatValue(val: number, id: string): string {
  if (id === "GDP") return "$" + (val / 1000).toFixed(1) + "T"
  if (id === "CPIAUCSL") return val.toFixed(1)
  if (["UNRATE", "FEDFUNDS", "DGS10"].includes(id)) return val.toFixed(2) + "%"
  return val.toFixed(2)
}
