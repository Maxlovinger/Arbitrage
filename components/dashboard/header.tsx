"use client"

import { Settings2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const router = useRouter()

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-black/10 backdrop-blur-[120px]">
      <h1
        className="font-orbitron text-xl font-bold text-white tracking-wider cursor-pointer"
        onClick={() => router.push("/")}
      >
        ARBITR<span className="text-emerald-400">AGE</span>
      </h1>

      <div className="flex items-center gap-3">
        <button className="p-2 text-[#919191] hover:text-white transition-colors rounded-lg hover:bg-[#1A1A1A]">
          <Settings2 className="h-5 w-5" />
        </button>
        <button
          onClick={() => router.push("/")}
          className="p-2 text-[#919191] hover:text-white transition-colors rounded-lg hover:bg-[#1A1A1A]"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
