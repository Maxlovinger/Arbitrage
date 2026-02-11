import { NextRequest, NextResponse } from "next/server"

const NEWSAPI_KEY = "1363ca11f4444846bf619c1f9591f20d"
const GUARDIAN_KEY = "7d09773a-523f-43b7-9233-484e39fb1c79"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || "economy stocks market finance"
  const page = searchParams.get("page") || "1"

  try {
    const [newsApiRes, guardianRes] = await Promise.all([
      fetchNewsApi(query, page),
      fetchGuardian(query, page),
    ])

    const articles = [
      ...newsApiRes.map((a: any) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        source: a.source?.name || "NewsAPI",
        publishedAt: a.publishedAt,
        imageUrl: a.urlToImage,
      })),
      ...guardianRes.map((a: any) => ({
        title: a.webTitle,
        description: a.fields?.trailText || "",
        url: a.webUrl,
        source: "The Guardian",
        publishedAt: a.webPublicationDate,
        imageUrl: a.fields?.thumbnail || null,
      })),
    ]

    // Sort by date, newest first
    articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    return NextResponse.json({ articles })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function fetchNewsApi(query: string, page: string) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=10&page=${page}&apiKey=${NEWSAPI_KEY}`,
      { next: { revalidate: 300 } }
    )
    const data = await res.json()
    return data.articles || []
  } catch {
    return []
  }
}

async function fetchGuardian(query: string, page: string) {
  try {
    const res = await fetch(
      `https://content.guardianapis.com/search?q=${encodeURIComponent(query)}&section=business|money&show-fields=trailText,thumbnail&page-size=10&page=${page}&api-key=${GUARDIAN_KEY}`,
      { next: { revalidate: 300 } }
    )
    const data = await res.json()
    return data.response?.results || []
  } catch {
    return []
  }
}
