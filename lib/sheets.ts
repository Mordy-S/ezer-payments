import { CampaignData } from '@/types';
import { convertToHebrewDate } from './hebrew-calendar';

/**
 * Google Sheets API configuration
 */
export interface SheetsConfig {
  spreadsheetId: string;
  range?: string;
  apiKey?: string;
}

/**
 * Parse raw CSV data from Google Sheets
 */
export function parseSheetData(csvData: string): CampaignData[] {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map((line, index) => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const data: Record<string, string> = {};
      
      headers.forEach((header, i) => {
        data[header] = values[i] || '';
      });

      // Parse date and add Hebrew calendar info
      const date = new Date(data.date || data.Date || data.תאריך);
      const hebrewInfo = convertToHebrewDate(date);

      return {
        id: data.id || `row-${index}`,
        date: date,
        campaign: data.campaign || data.Campaign || data.קמפיין || '',
        reason: data.reason || data.Reason || data.סיבה || '',
        amount: data.amount ? parseFloat(data.amount) : undefined,
        status: data.status as 'active' | 'completed' | 'pending' || 'active',
        hebrewDate: hebrewInfo.hebrewDate,
        hebrewMonth: hebrewInfo.hebrewMonth,
        parashat: hebrewInfo.parashat,
        hebrewWeek: hebrewInfo.parashat,
      } as CampaignData;
    });
}

/**
 * Fetch data from Google Sheets using the public CSV export URL
 */
export async function fetchSheetsData(config: SheetsConfig): Promise<CampaignData[]> {
  const { spreadsheetId, range = '' } = config;
  const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=0${range ? `&range=${range}` : ''}`;
  
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }
    
    const csvData = await response.text();
    return parseSheetData(csvData);
  } catch (error) {
    console.error('Error fetching sheets data:', error);
    throw error;
  }
}

/**
 * Mock data for development - based on typical campaign structure
 */
export function getMockData(): CampaignData[] {
  const mockData: CampaignData[] = [
    {
      id: '1',
      date: new Date('2024-01-15'),
      campaign: 'קמפיין חורף',
      reason: 'תרומות לחימום',
      amount: 1500,
      status: 'completed',
    },
    {
      id: '2', 
      date: new Date('2024-02-20'),
      campaign: 'קמפיין פורים',
      reason: 'משלוח מנות',
      amount: 800,
      status: 'completed',
    },
    {
      id: '3',
      date: new Date('2024-03-10'),
      campaign: 'קמפיין פסח',
      reason: 'מצות לעניים',
      amount: 2500,
      status: 'active',
    },
    {
      id: '4',
      date: new Date('2024-04-05'),
      campaign: 'קמפיין אביב',
      reason: 'פעילויות נוער',
      amount: 1200,
      status: 'pending',
    },
    {
      id: '5',
      date: new Date('2024-05-15'),
      campaign: 'קמפיין לג בעומר',
      reason: 'אירועי קהילה',
      amount: 900,
      status: 'completed',
    },
  ];

  // Add Hebrew calendar info to mock data
  return mockData.map(item => {
    const hebrewInfo = convertToHebrewDate(item.date);
    
    return {
      ...item,
      hebrewDate: hebrewInfo.hebrewDate,
      hebrewMonth: hebrewInfo.hebrewMonth,
      parashat: hebrewInfo.parashat,
      hebrewWeek: hebrewInfo.parashat,
    };
  });
}

/**
 * Extract spreadsheet ID from Google Sheets URL
 */
export function extractSpreadsheetId(url: string): string {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : '';
}
