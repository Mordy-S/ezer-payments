'use client'

import { useState, useEffect } from "react"
import { sampleDonations, generateMoreSampleData } from "@/lib/sample-data"
import { calculateDashboardStats } from "@/lib/analytics"
import { KPIGrid } from "@/components/dashboard/stats-cards"
import { MonthlyChart, ParshaChart, CampaignChart } from "@/components/dashboard/charts"
import { DonationTable } from "@/components/dashboard/donation-table"
import { HebrewCalendarInfo } from "@/components/dashboard/hebrew-calendar-info"
import { Button } from "@/components/ui/button"

// Pre-calculate data to avoid hydration issues
const allDonationsData = [...sampleDonations, ...generateMoreSampleData()]
const dashboardStatsData = calculateDashboardStats(allDonationsData)

export default function Home() {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    // Set date on client side to prevent hydration mismatch
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
  }, [])

  return (
    <div className="min-h-screen bg-background app-content">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <div>
                <h1 className="text-2xl font-bold">Donations Dashboard - Meshivat Nefesh</h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive donation management dashboard with Hebrew calendar integration
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Last Updated</div>
              <div className="text-sm font-medium">{currentDate || 'August 10, 2025'}</div>
              <div className="mt-2 space-y-2">
                <Button className="block" variant="default" size="sm">
                  Test Button
                </Button>
                <div className="p-2 bg-red-500 text-white rounded">Tailwind Test - Red Background</div>
                <div className="p-2 bg-blue-500 text-white rounded">Tailwind Test - Blue Background</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
          <KPIGrid stats={dashboardStatsData} />
        </section>

        {/* Hebrew Calendar Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Hebrew Calendar Information</h2>
          <HebrewCalendarInfo donations={allDonationsData} />
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Data Analytics</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <MonthlyChart data={dashboardStatsData.monthlyBreakdown} />
            <ParshaChart data={dashboardStatsData.parshaBreakdown} />
            <CampaignChart data={dashboardStatsData.campaignBreakdown} />
          </div>
        </section>

        {/* Detailed Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Detailed Data</h2>
          <DonationTable donations={allDonationsData} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Data from Google Sheets | {allDonationsData.length} donations
            </div>
            <div className="flex items-center gap-4">
              <span>🔒 Secure</span>
              <span>📊 Real-time</span>
              <span>🎯 Accurate</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
