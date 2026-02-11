"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Clock } from "lucide-react"

interface Article {
  title: string
  description: string
  url: string
  source: string
  publishedAt: string
  imageUrl: string | null
}

export function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news?q=stock+market+economy+finance")
        const data = await res.json()
        if (data.articles) {
          setArticles(data.articles.slice(0, 12))
        }
      } catch {
        setArticles([])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="bg-[#0D0D0D] rounded-2xl p-6">
        <h2 className="text-lg font-medium text-white mb-4">Market News</h2>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-[#1A1A1A] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0D0D0D] rounded-2xl p-6">
      <h2 className="text-lg font-medium text-white mb-4">Market News</h2>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        {articles.length === 0 ? (
          <p className="text-[#919191] text-sm">No news available</p>
        ) : (
          articles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-[#111] hover:bg-[#1A1A1A] transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-xs text-[#919191] mt-1.5 line-clamp-2">
                      {article.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-emerald-400/70 font-medium">
                      {article.source}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#666]">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(article.publishedAt)}
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[#919191] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  )
}

function formatTimeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
