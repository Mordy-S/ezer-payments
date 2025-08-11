'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DonationRecord } from "@/lib/sample-data"
import { formatCurrency } from "@/lib/analytics"

interface DonationTableProps {
  donations: DonationRecord[]
}

export function DonationTable({ donations }: DonationTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Filter and sort donations
  const filteredDonations = donations
    .filter(donation => {
      const matchesSearch = 
        donation["11. Donor Jewish Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation["1. Receipt #"].toString().includes(searchTerm) ||
        donation["17. Campaign"].toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || donation["16. Status"] === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a["2. Payment Date"])
          bValue = new Date(b["2. Payment Date"])
          break
        case 'amount':
          aValue = a["13. Amount"]
          bValue = b["13. Amount"]
          break
        case 'donor':
          aValue = a["11. Donor Jewish Name"]
          bValue = b["11. Donor Jewish Name"]
          break
        case 'receipt':
          aValue = a["1. Receipt #"]
          bValue = b["1. Receipt #"]
          break
        default:
          aValue = a["2. Payment Date"]
          bValue = b["2. Payment Date"]
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detailed Donations List</CardTitle>
        <div className="flex gap-4 items-center justify-between mt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search donor, receipt number, or campaign..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {filteredDonations.length} of {donations.length} donations
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort('receipt')}
                >
                  Receipt # {sortBy === 'receipt' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort('date')}
                >
                  Payment Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Hebrew Date</TableHead>
                <TableHead>Torah Portion</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort('donor')}
                >
                  Donor Name {sortBy === 'donor' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort('amount')}
                >
                  Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.slice(0, 50).map((donation) => (
                <TableRow key={donation["1. Receipt #"]} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {donation["1. Receipt #"]}
                  </TableCell>
                  <TableCell>
                    {new Date(donation["2. Payment Date"]).toLocaleDateString('en-US')}
                  </TableCell>
                  <TableCell className="hebrew-data">
                    {donation["6. Full Hebrew Date (e.g., ג' אב תשפ\"ה)"]}
                  </TableCell>
                  <TableCell className="hebrew-data">
                    {donation["7. Parsha Name (Hebrew)"]}
                  </TableCell>
                  <TableCell className="hebrew-data">
                    {donation["11. Donor Jewish Name"]}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(donation["13. Amount"])}
                  </TableCell>
                  <TableCell>
                    {donation["14. Payment Type"]}
                  </TableCell>
                  <TableCell className="hebrew-data">
                    {donation["17. Campaign"]}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      donation["16. Status"] === 'Success' 
                        ? 'bg-green-100 text-green-800' 
                        : donation["16. Status"] === 'Failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {donation["16. Status"]}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredDonations.length > 50 && (
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing first 50 donations. Use search to narrow results.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
