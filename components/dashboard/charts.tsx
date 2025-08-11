'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { MonthlyStats, ParshaStats, CampaignStats, getChartColor, formatCurrency } from "@/lib/analytics"

interface MonthlyChartProps {
  data: MonthlyStats[]
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Donations by Hebrew Month</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="hebrewMonth" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Amount']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar dataKey="totalAmount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface ParshaChartProps {
  data: ParshaStats[]
}

export function ParshaChart({ data }: ParshaChartProps) {
  const chartData = data.slice(0, 8).map((item, index) => ({
    name: item.parsha,
    value: item.totalAmount,
    fill: getChartColor(index)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donations by Torah Portion (Parsha)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface CampaignChartProps {
  data: CampaignStats[]
}

export function CampaignChart({ data }: CampaignChartProps) {
  const chartData = data.map((item, index) => ({
    name: item.campaign,
    value: item.totalAmount,
    fill: getChartColor(index)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donations by Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number"
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="category"
              dataKey="name" 
              tick={{ fontSize: 12 }}
              width={100}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Amount']}
              labelFormatter={(label) => `Campaign: ${label}`}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
