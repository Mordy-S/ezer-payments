import { DonationRecord } from '@/lib/sample-data'

// Dashboard statistics calculation utilities
export interface DashboardStats {
  totalDonations: number
  totalAmount: number
  totalDonors: number
  averageDonation: number
  successRate: number
  monthlyBreakdown: MonthlyStats[]
  parshaBreakdown: ParshaStats[]
  campaignBreakdown: CampaignStats[]
  paymentTypeBreakdown: PaymentTypeStats[]
}

export interface MonthlyStats {
  month: string
  hebrewMonth: string
  totalAmount: number
  donationCount: number
  averageAmount: number
}

export interface ParshaStats {
  parsha: string
  totalAmount: number
  donationCount: number
  percentage: number
}

export interface CampaignStats {
  campaign: string
  totalAmount: number
  donationCount: number
  percentage: number
}

export interface PaymentTypeStats {
  type: string
  totalAmount: number
  donationCount: number
  percentage: number
}

export function calculateDashboardStats(donations: DonationRecord[]): DashboardStats {
  const totalDonations = donations.length
  const totalAmount = donations.reduce((sum, donation) => sum + donation["13. Amount"], 0)
  const uniqueDonors = new Set(donations.map(d => d["11. Donor Jewish Name"])).size
  const averageDonation = totalAmount / totalDonations
  const successfulDonations = donations.filter(d => d["16. Status"] === "Success").length
  const successRate = (successfulDonations / totalDonations) * 100

  // Monthly breakdown
  const monthlyMap = new Map<string, { total: number; count: number }>()
  donations.forEach(donation => {
    const hebrewMonth = donation["9. Month and year"]
    const existing = monthlyMap.get(hebrewMonth) || { total: 0, count: 0 }
    monthlyMap.set(hebrewMonth, {
      total: existing.total + donation["13. Amount"],
      count: existing.count + 1
    })
  })

  const monthlyBreakdown: MonthlyStats[] = Array.from(monthlyMap.entries()).map(([month, stats]) => ({
    month: month,
    hebrewMonth: month,
    totalAmount: stats.total,
    donationCount: stats.count,
    averageAmount: stats.total / stats.count
  }))

  // Parsha breakdown
  const parshaMap = new Map<string, { total: number; count: number }>()
  donations.forEach(donation => {
    const parsha = donation["7. Parsha Name (Hebrew)"]
    const existing = parshaMap.get(parsha) || { total: 0, count: 0 }
    parshaMap.set(parsha, {
      total: existing.total + donation["13. Amount"],
      count: existing.count + 1
    })
  })

  const parshaBreakdown: ParshaStats[] = Array.from(parshaMap.entries()).map(([parsha, stats]) => ({
    parsha,
    totalAmount: stats.total,
    donationCount: stats.count,
    percentage: (stats.total / totalAmount) * 100
  }))

  // Campaign breakdown
  const campaignMap = new Map<string, { total: number; count: number }>()
  donations.forEach(donation => {
    const campaign = donation["17. Campaign"]
    const existing = campaignMap.get(campaign) || { total: 0, count: 0 }
    campaignMap.set(campaign, {
      total: existing.total + donation["13. Amount"],
      count: existing.count + 1
    })
  })

  const campaignBreakdown: CampaignStats[] = Array.from(campaignMap.entries()).map(([campaign, stats]) => ({
    campaign,
    totalAmount: stats.total,
    donationCount: stats.count,
    percentage: (stats.total / totalAmount) * 100
  }))

  // Payment type breakdown
  const paymentTypeMap = new Map<string, { total: number; count: number }>()
  donations.forEach(donation => {
    const type = donation["14. Payment Type"]
    const existing = paymentTypeMap.get(type) || { total: 0, count: 0 }
    paymentTypeMap.set(type, {
      total: existing.total + donation["13. Amount"],
      count: existing.count + 1
    })
  })

  const paymentTypeBreakdown: PaymentTypeStats[] = Array.from(paymentTypeMap.entries()).map(([type, stats]) => ({
    type,
    totalAmount: stats.total,
    donationCount: stats.count,
    percentage: (stats.total / totalAmount) * 100
  }))

  return {
    totalDonations,
    totalAmount,
    totalDonors: uniqueDonors,
    averageDonation,
    successRate,
    monthlyBreakdown: monthlyBreakdown.sort((a, b) => b.totalAmount - a.totalAmount),
    parshaBreakdown: parshaBreakdown.sort((a, b) => b.totalAmount - a.totalAmount),
    campaignBreakdown: campaignBreakdown.sort((a, b) => b.totalAmount - a.totalAmount),
    paymentTypeBreakdown: paymentTypeBreakdown.sort((a, b) => b.totalAmount - a.totalAmount)
  }
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format numbers with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Format percentage
export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`
}

// Get color for charts
export function getChartColor(index: number): string {
  const colors = [
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#84CC16', // Lime
    '#F97316', // Orange
    '#EC4899', // Pink
    '#6366F1', // Indigo
  ]
  return colors[index % colors.length]
}
