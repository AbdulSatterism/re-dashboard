import { StatsCards } from "@/components/stats-cards"
// import { UserGrowthChart } from "@/components/user-growth-chart"
import { BestSellingProduct } from "@/components/best-selling-product"
import { RecentActivity } from "@/components/recent-activity"
import UserGrowthChart from "@/components/user-growth-chart"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatsCards />
          <UserGrowthChart />
        </div>
        <div className="space-y-6">
          <RecentActivity />
          {/* <BestSellingProduct /> */}
        </div>
      </div>
    </div>
  )
}
