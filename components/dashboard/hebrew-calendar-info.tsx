'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonationRecord } from "@/lib/sample-data"

interface HebrewCalendarInfoProps {
  donations: DonationRecord[]
}

export function HebrewCalendarInfo({ donations }: HebrewCalendarInfoProps) {
  // Get unique parshiot and their frequencies
  const parshaFrequency = donations.reduce((acc, donation) => {
    const parsha = donation["7. Parsha Name (Hebrew)"]
    acc[parsha] = (acc[parsha] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topParshiot = Object.entries(parshaFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  // Get unique Hebrew months
  const hebrewMonths = [...new Set(donations.map(d => d["9. Month and year"]))]
    .sort()

  // Get current Hebrew date info from the latest donation
  const latestDonation = donations[0]
  const currentHebrewDate = latestDonation?.["6. Full Hebrew Date (e.g., ג' אב תשפ\"ה)"] || ''

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Hebrew Calendar Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Current Hebrew Date</h4>
            <p className="text-lg hebrew-data">{currentHebrewDate}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Hebrew Months in Data</h4>
            <div className="flex flex-wrap gap-2">
              {hebrewMonths.map((month) => (
                <span 
                  key={month}
                  className="inline-flex px-2 py-1 bg-primary/10 text-primary rounded-md text-sm hebrew-data"
                >
                  {month}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Torah Portions (Parshiot)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topParshiot.map(([parsha, count], index) => (
              <div key={parsha} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📜'}
                  </span>
                  <span className="hebrew-data">{parsha}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ 
                        width: `${(count / Math.max(...Object.values(parshaFrequency))) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {count} donations
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
