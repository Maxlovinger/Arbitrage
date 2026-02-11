"use client"

import { Blocks, BarChart3, Newspaper, TrendingUp, Settings2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const navItems = [
  { icon: Blocks, label: "DASHBOARD", id: "dashboard" },
  { icon: BarChart3, label: "MARKETS", id: "markets" },
  { icon: Newspaper, label: "NEWS", id: "news" },
  { icon: TrendingUp, label: "ECONOMIC DATA", id: "economic" },
]

export function Sidebar({ active = "dashboard" }: { active?: string }) {
  const router = useRouter()

  return (
    <aside className="sticky top-24 h-[calc(100vh-8rem)] md:w-48 lg:w-64 bg-[#0D0D0D] rounded-2xl hidden md:flex flex-col p-8 overflow-y-auto">
      <nav className="flex flex-col gap-8">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 cursor-pointer transition-colors ${
              active === item.id
                ? "text-[#E7E7E7]"
                : "text-[#919191] hover:text-[#E7E7E7]"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-[#1F1F1F] flex flex-col gap-8">
        <div className="flex items-center gap-4 text-[#919191] hover:text-[#E7E7E7] transition-colors cursor-pointer">
          <Settings2 className="h-5 w-5" />
          <span className="text-sm font-medium tracking-wide">SETTINGS</span>
        </div>
        <div
          className="flex items-center gap-4 text-[#919191] hover:text-[#E7E7E7] transition-colors cursor-pointer"
          onClick={() => router.push("/")}
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium tracking-wide">EXIT</span>
        </div>
      </div>
    </aside>
  )
}
