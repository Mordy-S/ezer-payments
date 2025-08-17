'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/analytics"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {typeof value === 'number' ? formatNumber(value) : value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className={`text-xs mt-1 flex items-center gap-1 ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{formatPercentage(Math.abs(trend.value))} from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface KPIGridProps {
  stats: {
    totalDonations: number
    totalAmount: number
    totalDonors: number
    averageDonation: number
    successRate: number
  }
}

export function KPIGrid({ stats }: KPIGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <StatsCard
        title="Total Donations"
        value={stats.totalDonations}
        description="Total donations received"
        icon={<span>📊</span>}
      />
      <StatsCard
        title="Total Amount"
        value={formatCurrency(stats.totalAmount)}
        description="Total amount raised"
        icon={<span>💰</span>}
      />
      <StatsCard
        title="Unique Donors"
        value={stats.totalDonors}
        description="Unique donors"
        icon={<span>👥</span>}
      />
      <StatsCard
        title="Average Donation"
        value={formatCurrency(stats.averageDonation)}
        description="Average donation amount"
        icon={<span>📈</span>}
      />
      <StatsCard
        title="Success Rate"
        value={formatPercentage(stats.successRate)}
        description="Successful payments"
        icon={<span>✅</span>}
      />
    </div>
  )
}
