import { NextRequest, NextResponse } from "next/server"

const FRED_API_KEY = "c0b7353895e2dff15092c9fad15bd79d"
const BASE_URL = "https://api.stlouisfed.org/fred"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "series"
  const seriesId = searchParams.get("series_id")

  try {
    if (type === "series" && seriesId) {
      // Get observations for a specific series
      const [info, observations] = await Promise.all([
        fetchFred(`${BASE_URL}/series?series_id=${seriesId}`),
        fetchFred(
          `${BASE_URL}/series/observations?series_id=${seriesId}&sort_order=desc&limit=60`
        ),
      ])

      return NextResponse.json({
        series: info.seriess?.[0] || null,
        observations: observations.observations || [],
      })
    }

    if (type === "regional") {
      // Get regional data - popular economic indicators
      const seriesIds = searchParams.get("series_ids")?.split(",") || [
        "GDP",        // Gross Domestic Product
        "UNRATE",     // Unemployment Rate
        "CPIAUCSL",   // Consumer Price Index
        "FEDFUNDS",   // Federal Funds Rate
        "DGS10",      // 10-Year Treasury
        "DEXUSEU",    // USD/EUR Exchange Rate
      ]

      const results = await Promise.all(
        seriesIds.map(async (id) => {
          try {
            const [info, obs] = await Promise.all([
              fetchFred(`${BASE_URL}/series?series_id=${id}`),
              fetchFred(
                `${BASE_URL}/series/observations?series_id=${id}&sort_order=desc&limit=12`
              ),
            ])
            return {
              id,
              title: info.seriess?.[0]?.title || id,
              units: info.seriess?.[0]?.units || "",
              frequency: info.seriess?.[0]?.frequency || "",
              observations: obs.observations || [],
            }
          } catch {
            return { id, error: true }
          }
        })
      )

      return NextResponse.json({ indicators: results })
    }

    // Default: return popular series list
    const popular = await fetchFred(
      `${BASE_URL}/series/search?search_text=GDP+unemployment+inflation&limit=10`
    )
    return NextResponse.json({ series: popular.seriess || [] })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function fetchFred(url: string) {
  const separator = url.includes("?") ? "&" : "?"
  const res = await fetch(
    `${url}${separator}api_key=${FRED_API_KEY}&file_type=json`,
    { next: { revalidate: 600 } }
  )
  return res.json()
}
