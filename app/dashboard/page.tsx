import { DashboardHeader } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardMetrics } from "@/components/dashboard/metrics"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { TickerList } from "@/components/dashboard/ticker-list"
import { NewsFeed } from "@/components/dashboard/news-feed"
import { EconomicData } from "@/components/dashboard/economic-data"

export default function DashboardPage() {
  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      <DashboardHeader />

      <div className="h-full overflow-y-auto no-scrollbar">
        <main className="flex gap-6 p-6 pt-24 min-h-full">
          <Sidebar />

          <div className="flex-1 flex flex-col gap-6 min-w-0 pb-8">
            <DashboardMetrics />
            <PerformanceChart />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <TickerList />
              <NewsFeed />
            </div>

            <EconomicData />

            <div className="flex items-center justify-end gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-[#86efac]" />
              <span className="text-sm text-[#919191]">Live</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
