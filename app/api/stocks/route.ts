import { NextRequest, NextResponse } from "next/server"
import yahooFinance from "yahoo-finance2"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbols = searchParams.get("symbols")?.split(",") || ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]
  const period = searchParams.get("period") || "1mo"
  const symbol = searchParams.get("symbol")

  try {
    // If a single symbol is requested with historical data
    if (symbol) {
      const quote = await yahooFinance.quote(symbol)
      const chart = await yahooFinance.chart(symbol, {
        period1: getPeriodStart(period),
        interval: getInterval(period),
      })

      return NextResponse.json({
        quote: {
          symbol: quote.symbol,
          name: quote.shortName || quote.longName || quote.symbol,
          price: quote.regularMarketPrice,
          change: quote.regularMarketChange,
          changePercent: quote.regularMarketChangePercent,
          previousClose: quote.regularMarketPreviousClose,
          open: quote.regularMarketOpen,
          dayHigh: quote.regularMarketDayHigh,
          dayLow: quote.regularMarketDayLow,
          volume: quote.regularMarketVolume,
          marketCap: quote.marketCap,
        },
        history: chart.quotes.map((q: any) => ({
          date: q.date,
          close: q.close,
          high: q.high,
          low: q.low,
          open: q.open,
          volume: q.volume,
        })),
      })
    }

    // Batch quotes for multiple symbols
    const quotes = await Promise.all(
      symbols.map(async (sym) => {
        try {
          const q = await yahooFinance.quote(sym.trim())
          return {
            symbol: q.symbol,
            name: q.shortName || q.longName || q.symbol,
            price: q.regularMarketPrice,
            change: q.regularMarketChange,
            changePercent: q.regularMarketChangePercent,
            previousClose: q.regularMarketPreviousClose,
            volume: q.regularMarketVolume,
            marketCap: q.marketCap,
          }
        } catch {
          return { symbol: sym.trim(), error: true }
        }
      })
    )

    return NextResponse.json({ quotes })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function getPeriodStart(period: string): string {
  const now = new Date()
  switch (period) {
    case "1d": now.setDate(now.getDate() - 1); break
    case "5d": now.setDate(now.getDate() - 5); break
    case "1mo": now.setMonth(now.getMonth() - 1); break
    case "3mo": now.setMonth(now.getMonth() - 3); break
    case "6mo": now.setMonth(now.getMonth() - 6); break
    case "1y": now.setFullYear(now.getFullYear() - 1); break
    case "5y": now.setFullYear(now.getFullYear() - 5); break
    default: now.setMonth(now.getMonth() - 1)
  }
  return now.toISOString().split("T")[0]
}

function getInterval(period: string): "1d" | "1wk" | "1mo" | "5m" | "15m" | "1h" {
  switch (period) {
    case "1d": return "5m"
    case "5d": return "15m"
    case "1mo": return "1d"
    case "3mo": return "1d"
    case "6mo": return "1wk"
    case "1y": return "1wk"
    case "5y": return "1mo"
    default: return "1d"
  }
}
