/**
 * Google Apps Script Web App for Donation Dashboard
 * Deployed to: script.google.com
 * Sheet ID: 1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg
 */

// Your Google Sheet ID
const SHEET_ID = '1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg';

/**
 * doGet function - Required for web app deployment
 * This serves the main dashboard HTML file
 */
function doGet(request) {
  var html = HtmlService.createTemplateFromFile('dashboard');
  
  // Pass any URL parameters to the template
  if (request.parameter) {
    html.params = request.parameter;
  }
  
  var output = html.evaluate()
    .setTitle('Donations Dashboard - Meshivat Nefesh')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  
  return output;
}

/**
 * Include function - Used to import CSS and JS files into HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Main function to get real data from your Google Sheet
 */
function getSheetData() {
  try {
    // Open the spreadsheet by ID
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Get the active sheet (first sheet)
    const sheet = spreadsheet.getActiveSheet();
    
    // Get all data from the sheet
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    if (values.length === 0) {
      console.log('No data found in the sheet');
      return { error: 'No data found' };
    }
    
    // Get headers (first row)
    const headers = values[0];
    
    // Convert to JSON format
    const jsonData = [];
    for (let i = 1; i < values.length; i++) {
      const row = {};
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const value = values[i][j];
        
        // Handle different data types
        if (value instanceof Date) {
          row[header] = value.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        } else if (typeof value === 'number') {
          row[header] = value;
        } else {
          row[header] = String(value || '');
        }
      }
      
      // Only add rows that have some data
      if (Object.values(row).some(val => val !== '')) {
        jsonData.push(row);
      }
    }
    
    // Calculate dashboard statistics
    const stats = calculateDashboardStats(jsonData);
    
    return {
      success: true,
      data: jsonData,
      stats: stats,
      metadata: {
        sheetName: sheet.getName(),
        totalRows: values.length - 1,
        totalColumns: headers.length,
        headers: headers,
        lastUpdated: new Date().toISOString()
      }
    };
    
  } catch (error) {
    console.error('Error getting sheet data:', error);
    return { 
      error: 'Failed to fetch data: ' + error.toString(),
      success: false 
    };
  }
}

/**
 * Calculate dashboard statistics from the raw data
 */
function calculateDashboardStats(data) {
  if (!data || data.length === 0) {
    return {
      totalDonations: 0,
      totalAmount: 0,
      totalDonors: 0,
      averageDonation: 0,
      successRate: 0,
      monthlyBreakdown: [],
      parshaBreakdown: [],
      campaignBreakdown: []
    };
  }
  
  // Calculate basic stats
  const totalDonations = data.length;
  const totalAmount = data.reduce((sum, record) => {
    const amount = parseFloat(record['13. Amount']) || 0;
    return sum + amount;
  }, 0);
  
  // Get unique donors
  const uniqueDonors = new Set();
  data.forEach(record => {
    const donorName = record['11. Donor Jewish Name'];
    if (donorName && donorName.trim()) {
      uniqueDonors.add(donorName.trim());
    }
  });
  const totalDonors = uniqueDonors.size;
  
  const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;
  
  // Calculate success rate (assuming all records in sheet are successful)
  const successfulDonations = data.filter(record => 
    record['16. Status'] === 'Success' || 
    record['16. Status'] === 'success' || 
    !record['16. Status'] // assume success if no status
  ).length;
  const successRate = totalDonations > 0 ? (successfulDonations / totalDonations) * 100 : 0;
  
  // Monthly breakdown
  const monthlyData = {};
  data.forEach(record => {
    const monthYear = record['9. Month and year'] || 'Unknown';
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { count: 0, amount: 0 };
    }
    monthlyData[monthYear].count++;
    monthlyData[monthYear].amount += parseFloat(record['13. Amount']) || 0;
  });
  
  const monthlyBreakdown = Object.entries(monthlyData).map(([month, data]) => ({
    month: month,
    count: data.count,
    amount: data.amount
  }));
  
  // Parsha breakdown
  const parshaData = {};
  data.forEach(record => {
    const parsha = record['7. Parsha Name (Hebrew)'] || 'Unknown';
    if (!parshaData[parsha]) {
      parshaData[parsha] = { count: 0, amount: 0 };
    }
    parshaData[parsha].count++;
    parshaData[parsha].amount += parseFloat(record['13. Amount']) || 0;
  });
  
  const parshaBreakdown = Object.entries(parshaData).map(([parsha, data]) => ({
    parsha: parsha,
    count: data.count,
    amount: data.amount
  }));
  
  // Campaign breakdown
  const campaignData = {};
  data.forEach(record => {
    const campaign = record['17. Campaign'] || 'Unknown';
    if (!campaignData[campaign]) {
      campaignData[campaign] = { count: 0, amount: 0 };
    }
    campaignData[campaign].count++;
    campaignData[campaign].amount += parseFloat(record['13. Amount']) || 0;
  });
  
  const campaignBreakdown = Object.entries(campaignData).map(([campaign, data]) => ({
    campaign: campaign,
    count: data.count,
    amount: data.amount
  }));
  
  return {
    totalDonations,
    totalAmount,
    totalDonors,
    averageDonation,
    successRate,
    monthlyBreakdown,
    parshaBreakdown,
    campaignBreakdown
  };
}

/**
 * Function to test the connection and return sample data
 */
function testConnection() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('✅ Successfully connected to spreadsheet:', spreadsheet.getName());
    
    const sheet = spreadsheet.getActiveSheet();
    console.log('✅ Successfully accessed sheet:', sheet.getName());
    
    const range = sheet.getDataRange();
    console.log('✅ Successfully got data range:', `${range.getNumRows()} rows x ${range.getNumColumns()} columns`);
    
    return {
      success: true,
      message: 'Connection test passed!',
      sheetName: sheet.getName(),
      rows: range.getNumRows(),
      columns: range.getNumColumns()
    };
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Get Hebrew calendar information for today
 */
function getHebrewCalendarInfo() {
  try {
    // This would normally use the HebCal API, but for simplicity we'll return static info
    const today = new Date();
    const hebrewDate = "כ״ט תמוז תשפ״ה"; // Example Hebrew date
    const parsha = "דברים"; // Example parsha
    
    return {
      success: true,
      gregorianDate: today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      hebrewDate: hebrewDate,
      parsha: parsha,
      dayOfWeek: today.toLocaleDateString('he-IL', { weekday: 'long' })
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Format currency values
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 * Format numbers with commas
 */
function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format percentages
 */
function formatPercentage(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(num / 100);
}
