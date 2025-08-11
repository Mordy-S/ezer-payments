// Campaign data types
export interface CampaignData {
  id: string;
  date: Date;
  campaign: string;
  reason: string;
  amount?: number;
  status?: 'active' | 'completed' | 'pending';
  hebrewDate?: string;
  hebrewMonth?: string;
  hebrewWeek?: string;
  parashat?: string;
}

// Hebrew calendar types
export interface HebrewDate {
  hebrewDate: string;
  hebrewMonth: string;
  hebrewYear: number;
  parashat?: string;
  isHoliday?: boolean;
  holidayName?: string;
}

// Chart data types
export interface ChartData {
  name: string;
  value: number;
  date?: string;
  hebrewMonth?: string;
  parashat?: string;
}

// Filter options
export interface FilterOptions {
  dateRange?: {
    start: Date;
    end: Date;
  };
  campaign?: string;
  reason?: string;
  hebrewMonth?: string;
  parashat?: string;
}

// Google Sheets API types
export interface SheetsConfig {
  spreadsheetId: string;
  range: string;
  apiKey?: string;
}
