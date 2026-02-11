"use client"

import { useEffect, useState } from "react"
import { Calendar, Download } from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

const PERIODS = ["1D", "1M", "3M", "6M", "1Y"] as const
const PERIOD_MAP: Record<string, string> = {
  "1D": "1d",
  "1M": "1mo",
  "3M": "3mo",
  "6M": "6mo",
  "1Y": "1y",
}

interface ChartPoint {
  date: string
  close: number
}

export function PerformanceChart() {
  const [symbol, setSymbol] = useState("AAPL")
  const [period, setPeriod] = useState<string>("1M")
  const [data, setData] = useState<ChartPoint[]>([])
  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [inputValue, setInputValue] = useState("AAPL")

  useEffect(() => {
    async function fetchChart() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/stocks?symbol=${symbol}&period=${PERIOD_MAP[period]}`
        )
        const json = await res.json()
        if (json.history) {
          setData(
            json.history
              .filter((p: any) => p.close != null)
              .map((p: any) => ({
                date: new Date(p.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }),
                close: p.close,
              }))
          )
        }
        if (json.quote) setQuote(json.quote)
      } catch {
        setData([])
      } finally {
        setLoading(false)
      }
    }
    fetchChart()
  }, [symbol, period])

  const prices = data.map((d) => d.close)
  const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices) * 0.98) : 0
  const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices) * 1.02) : 100
  const isUp = quote ? (quote.change || 0) >= 0 : true
  const accentColor = isUp ? "#86efac" : "#F87171"

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#0D0D0D] rounded-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-medium text-white">Performance</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSymbol(inputValue.toUpperCase())
            }}
            className="flex items-center gap-2"
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-24 px-3 py-1 bg-[#1A1A1A] rounded-full border border-[#333] text-sm font-medium text-white uppercase text-center outline-none focus:border-emerald-500/50"
            />
          </form>
          {quote && (
            <span className={`text-sm font-medium ${isUp ? "text-[#86efac]" : "text-[#F87171]"}`}>
              ${quote.price?.toFixed(2)} ({isUp ? "+" : ""}
              {quote.changePercent?.toFixed(2)}%)
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#1A1A1A] rounded-lg p-1">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === p
                    ? "bg-[#2A2A2A] text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="p-2 text-gray-400 hover:text-white bg-[#1A1A1A] rounded-lg transition-colors">
            <Calendar className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white bg-[#1A1A1A] rounded-lg transition-colors">
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center text-[#919191]">
            Loading chart...
          </div>
        ) : data.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-[#919191]">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F1F1F"
                vertical={false}
              />
              <XAxis dataKey="date" hide />
              <YAxis
                domain={[minPrice, maxPrice]}
                orientation="left"
                tick={{ fill: "#666", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={60}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#1A1A1A] border border-[#333] p-2 rounded-lg shadow-xl">
                        <p className="text-white font-medium">
                          ${Number(payload[0].value).toFixed(2)}{" "}
                          <span className="text-gray-400 text-sm ml-2">
                            {payload[0].payload.date}
                          </span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke={accentColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
