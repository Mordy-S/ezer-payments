/**
 * Google Apps Script Web App for Donation Dashboard
 * Deployed to: script.google.com
 * Sheet ID: 1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg
 */

// Your Google Sheet ID - ONLY DECLARED ONCE HERE
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

// =================================================================
// EXPORT SHEET DATA FUNCTIONS (Previously in separate file)
// =================================================================

/**
 * Main function to export sheet data
 * Note: SHEET_ID is already declared above - no duplicate declaration
 */
function exportSheetData() {
  try {
    // Open the spreadsheet (uses SHEET_ID from above)
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Get the first sheet (you can modify this if you have multiple sheets)
    const sheet = spreadsheet.getSheets()[0];
    
    // Get all data from the sheet
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    // Get sheet info
    const sheetName = sheet.getName();
    const numRows = values.length;
    const numCols = values[0] ? values[0].length : 0;
    
    console.log(`Sheet Name: ${sheetName}`);
    console.log(`Rows: ${numRows}, Columns: ${numCols}`);
    console.log('====================');
    
    // Export as JSON format (easier to work with)
    const jsonData = convertToJSON(values);
    
    console.log('JSON Data:');
    console.log(JSON.stringify(jsonData, null, 2));
    console.log('====================');
    
    // Also export as CSV format
    const csvData = convertToCSV(values);
    
    console.log('CSV Data:');
    console.log(csvData);
    console.log('====================');
    
    // Export column information
    if (values.length > 0) {
      console.log('Column Headers:');
      values[0].forEach((header, index) => {
        console.log(`Column ${index + 1}: ${header}`);
      });
    }
    
    console.log('Export completed successfully!');
    
  } catch (error) {
    console.error('Error exporting data:', error);
  }
}

/**
 * Convert sheet data to JSON format
 */
function convertToJSON(values) {
  if (values.length === 0) return [];
  
  const headers = values[0];
  const data = [];
  
  for (let i = 1; i < values.length; i++) {
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[i][j];
    }
    data.push(row);
  }
  
  return data;
}

/**
 * Convert sheet data to CSV format
 */
function convertToCSV(values) {
  return values.map(row => 
    row.map(cell => {
      // Handle cells that contain commas or quotes
      const cellStr = String(cell || '');
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(',')
  ).join('\n');
}

/**
 * Alternative function to export specific sheet by name
 */
function exportSheetByName(sheetName = 'Sheet1') {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      console.error(`Sheet "${sheetName}" not found`);
      return;
    }
    
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    console.log(`Exporting sheet: ${sheetName}`);
    console.log('Data:');
    console.log(JSON.stringify(convertToJSON(values), null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Get sheet information only
 */
function getSheetInfo() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheets = spreadsheet.getSheets();
    
    console.log('Spreadsheet Info:');
    console.log(`Title: ${spreadsheet.getName()}`);
    console.log(`Number of sheets: ${sheets.length}`);
    console.log('====================');
    
    sheets.forEach((sheet, index) => {
      const range = sheet.getDataRange();
      console.log(`Sheet ${index + 1}:`);
      console.log(`  Name: ${sheet.getName()}`);
      console.log(`  Rows: ${range.getNumRows()}`);
      console.log(`  Columns: ${range.getNumColumns()}`);
      
      // Show first row (headers)
      if (range.getNumRows() > 0) {
        const headers = range.getValues()[0];
        console.log(`  Headers: ${headers.join(', ')}`);
      }
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error getting sheet info:', error);
  }
}

// =================================================================
// DIAGNOSTIC AND SAMPLE DATA FUNCTIONS
// =================================================================

/**
 * DIAGNOSTIC FUNCTION - Run this to debug connection issues
 */
function debugSheetConnection() {
  console.log('🔍 STARTING DIAGNOSTIC TEST...');
  console.log('================================');
  
  try {
    // Test 1: Can we access the spreadsheet?
    console.log('📊 Test 1: Accessing spreadsheet...');
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('✅ SUCCESS: Connected to spreadsheet');
    console.log(`   Spreadsheet name: "${spreadsheet.getName()}"`);
    console.log(`   Spreadsheet URL: https://docs.google.com/spreadsheets/d/${SHEET_ID}`);
    
    // Test 2: How many sheets are there?
    console.log('');
    console.log('📑 Test 2: Checking sheets...');
    const sheets = spreadsheet.getSheets();
    console.log(`✅ SUCCESS: Found ${sheets.length} sheet(s)`);
    
    sheets.forEach((sheet, index) => {
      console.log(`   Sheet ${index + 1}: "${sheet.getName()}"`);
    });
    
    // Test 3: Get data from the active sheet
    console.log('');
    console.log('📋 Test 3: Checking active sheet data...');
    const activeSheet = spreadsheet.getActiveSheet();
    console.log(`   Active sheet name: "${activeSheet.getName()}"`);
    
    const range = activeSheet.getDataRange();
    const numRows = range.getNumRows();
    const numCols = range.getNumColumns();
    
    console.log(`   Data range: ${numRows} rows × ${numCols} columns`);
    
    if (numRows === 0) {
      console.log('❌ PROBLEM: Sheet is completely empty!');
      return {
        success: false,
        error: 'Sheet is completely empty',
        solution: 'Use generateSampleData() function to add test data'
      };
    }
    
    // Test 4: Show the first few rows
    console.log('');
    console.log('📊 Test 4: Sample data...');
    const values = range.getValues();
    
    // Show headers (first row)
    if (values.length > 0) {
      console.log('   HEADERS (Row 1):');
      values[0].forEach((header, index) => {
        console.log(`      Column ${index + 1}: "${header}"`);
      });
    }
    
    // Test 5: Final summary
    console.log('');
    console.log('📋 DIAGNOSTIC SUMMARY:');
    console.log('================================');
    console.log(`✅ Spreadsheet access: Working`);
    console.log(`✅ Sheet count: ${sheets.length}`);
    console.log(`✅ Active sheet: "${activeSheet.getName()}"`);
    console.log(`✅ Data rows: ${numRows - 1} (excluding header)`);
    console.log(`✅ Data columns: ${numCols}`);
    
    if (numRows <= 1) {
      console.log('❌ MAIN ISSUE: No data rows found (only headers or completely empty)');
      console.log('   SOLUTION: Run generateSampleData() function to add test data!');
      return {
        success: false,
        error: 'No data rows found',
        solution: 'Run generateSampleData() function'
      };
    } else {
      console.log('✅ DATA PROCESSING: Should work correctly');
      console.log('   Your sheet should work with the dashboard!');
      return {
        success: true,
        message: 'All tests passed - dashboard should work!'
      };
    }
    
  } catch (error) {
    console.log('');
    console.log('❌ CRITICAL ERROR:');
    console.log('================================');
    console.log(`Error: ${error.toString()}`);
    
    if (error.toString().includes('requested entity was not found')) {
      console.log('🔍 LIKELY CAUSE: Wrong Sheet ID or no access permissions');
      console.log('   SOLUTION: Double-check the Sheet ID in your code');
    } else if (error.toString().includes('permission')) {
      console.log('🔍 LIKELY CAUSE: Permission denied');
      console.log('   SOLUTION: Share the sheet with your Google account');
    }
    
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * SAFE SAMPLE DATA GENERATOR - Creates data in a NEW sheet, doesn't touch existing data
 */
function generateSampleDataSafely() {
  console.log('🔧 GENERATING SAMPLE DATA SAFELY...');
  console.log('⚠️ This will create a NEW sheet called "Sample Data" without touching existing data');
  
  try {
    // Open your spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Create a NEW sheet for sample data
    let sampleSheet;
    try {
      sampleSheet = spreadsheet.getSheetByName('Sample Data');
      if (sampleSheet) {
        console.log('ℹ️ Sample Data sheet already exists, clearing it...');
        sampleSheet.clear();
      }
    } catch (e) {
      // Sheet doesn't exist, create it
      sampleSheet = spreadsheet.insertSheet('Sample Data');
      console.log('✅ Created new "Sample Data" sheet');
    }
    
    if (!sampleSheet) {
      sampleSheet = spreadsheet.insertSheet('Sample Data');
    }
    
    // Create headers that match the dashboard expectations
    const headers = [
      '1. Receipt #',
      '2. Payment Date', 
      '3. Payment Time',
      '4. Donation ID',
      '5. Gregorian Date',
      '6. Full Hebrew Date (e.g., ג\' אב תשפ"ה)',
      '7. Parsha Name (Hebrew)',
      '8. Month (Hebrew)',
      '9. Month and year',
      '10. Donor ID',
      '11. Donor Jewish Name',
      '12. Contact Info',
      '13. Amount',
      '14. Currency',
      '15. Payment Method',
      '16. Status',
      '17. Campaign',
      '18. Notes'
    ];
    
    // Set headers
    sampleSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Sample data
    const sampleData = [
      [
        'R001', '2025-08-01', '14:30', 'D001', '2025-08-01',
        'כ״ה תמוז תשפ״ה', 'דברים', 'תמוז', 'תמוז תשפ״ה', 'DON001',
        'יוסף כהן', 'yosef@example.com', 180, 'USD', 'Credit Card',
        'Success', 'כללי', 'תרומה חודשית'
      ],
      [
        'R002', '2025-08-02', '09:15', 'D002', '2025-08-02', 
        'כ״ו תמוז תשפ״ה', 'דברים', 'תמוז', 'תמוז תשפ״ה', 'DON002',
        'משה לוי', 'moshe@example.com', 250, 'USD', 'Bank Transfer',
        'Success', 'חינוך', 'תרומה לחינוך'
      ],
      [
        'R003', '2025-08-03', '16:45', 'D003', '2025-08-03',
        'כ״ז תמוז תשפ״ה', 'דברים', 'תמוז', 'תמוז תשפ״ה', 'DON003', 
        'אברהם יצחק', 'abraham@example.com', 360, 'USD', 'PayPal',
        'Success', 'צדקה', 'תרומה שבועית'
      ],
      [
        'R004', '2025-08-04', '11:20', 'D004', '2025-08-04',
        'כ״ח תמוז תשפ״ה', 'דברים', 'תמוז', 'תמוז תשפ״ה', 'DON004',
        'דוד שלמה', 'david@example.com', 500, 'USD', 'Check', 
        'Success', 'בניין', 'תרומה לבניין'
      ],
      [
        'R005', '2025-08-05', '13:10', 'D005', '2025-08-05',
        'כ״ט תמוז תשפ״ה', 'דברים', 'תמוז', 'תמוז תשפ״ה', 'DON005',
        'יעקב אהרן', 'yaakov@example.com', 120, 'USD', 'Credit Card',
        'Success', 'כללי', 'תרומה חודשית'
      ]
    ];
    
    // Add sample data starting from row 2
    sampleSheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
    
    // Format the sheet
    sampleSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sampleSheet.getRange(1, 1, 1, headers.length).setBackground('#E8F0FE');
    
    // Auto-resize columns
    sampleSheet.autoResizeColumns(1, headers.length);
    
    console.log('✅ Sample data generated successfully in NEW sheet!');
    console.log(`   Created in sheet: "Sample Data"`);
    console.log(`   Added ${sampleData.length} sample donations`);
    console.log('   ⚠️ Your original data should be UNTOUCHED');
    console.log('   📋 To use this data, change the SHEET_ID or make this the active sheet');
    
    return {
      success: true,
      message: 'Sample data created safely in new sheet',
      sheetName: 'Sample Data',
      rowsAdded: sampleData.length,
      totalAmount: 1410
    };
    
  } catch (error) {
    console.error('❌ Error generating sample data:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Quick test to verify everything is working
 */
function testDashboardWithSampleData() {
  try {
    console.log('🔍 Testing dashboard with sample data...');
    const result = getSheetData(); // This calls your main dashboard function
    
    if (result.success && result.data && result.data.length > 0) {
      console.log('✅ SUCCESS: Dashboard should now work!');
      console.log(`   Found ${result.data.length} donations`);
      console.log(`   Total amount: $${result.stats.totalAmount}`);
      console.log(`   Total donors: ${result.stats.totalDonors}`);
      console.log('   🎉 Your dashboard is ready!');
      return result;
    } else {
      console.log('❌ Still having issues. Result:');
      console.log(JSON.stringify(result, null, 2));
      return result;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * EXTRACT ALL REAL DATA FROM YOUR GOOGLE SHEET
 * Run this to get all the actual donation data from your sheet
 */
function extractAllRealData() {
  console.log('📊 EXTRACTING ALL REAL DATA FROM GOOGLE SHEET...');
  console.log('================================================');
  
  try {
    // Open your spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    console.log(`✅ Connected to: "${spreadsheet.getName()}"`);
    console.log(`📋 Sheet URL: https://docs.google.com/spreadsheets/d/${SHEET_ID}`);
    
    // Get all sheets in the spreadsheet
    const sheets = spreadsheet.getSheets();
    console.log(`📑 Found ${sheets.length} sheet(s):`);
    
    const allData = {};
    
    // Extract data from each sheet
    sheets.forEach((sheet, index) => {
      const sheetName = sheet.getName();
      console.log(`\n🔍 Processing Sheet ${index + 1}: "${sheetName}"`);
      
      const range = sheet.getDataRange();
      const numRows = range.getNumRows();
      const numCols = range.getNumColumns();
      
      console.log(`   📐 Size: ${numRows} rows × ${numCols} columns`);
      
      if (numRows === 0) {
        console.log(`   ⚠️ Sheet "${sheetName}" is empty`);
        allData[sheetName] = { data: [], headers: [], isEmpty: true };
        return;
      }
      
      const values = range.getValues();
      const headers = values[0] || [];
      
      console.log(`   📝 Headers (${headers.length}):`);
      headers.forEach((header, idx) => {
        console.log(`      ${idx + 1}. "${header}"`);
      });
      
      // Convert to structured data
      const sheetData = [];
      for (let i = 1; i < values.length; i++) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          const header = headers[j];
          const value = values[i][j];
          
          // Handle different data types
          if (value instanceof Date) {
            row[header] = value.toISOString().split('T')[0];
          } else if (typeof value === 'number') {
            row[header] = value;
          } else {
            row[header] = String(value || '');
          }
        }
        
        // Only include rows that have some data
        if (Object.values(row).some(val => val !== '')) {
          sheetData.push(row);
        }
      }
      
      console.log(`   💾 Data rows: ${sheetData.length}`);
      
      allData[sheetName] = {
        data: sheetData,
        headers: headers,
        totalRows: numRows,
        totalCols: numCols,
        isEmpty: sheetData.length === 0
      };
      
      // Show sample data
      if (sheetData.length > 0) {
        console.log(`   🔍 Sample data (first row):`);
        const firstRow = sheetData[0];
        Object.entries(firstRow).forEach(([key, value]) => {
          console.log(`      "${key}": "${value}"`);
        });
      }
    });
    
    // Summary
    console.log(`\n📋 EXTRACTION SUMMARY:`);
    console.log('======================');
    Object.entries(allData).forEach(([sheetName, info]) => {
      console.log(`📊 Sheet: "${sheetName}"`);
      console.log(`   Rows: ${info.data.length}`);
      console.log(`   Headers: ${info.headers.length}`);
      console.log(`   Status: ${info.isEmpty ? 'Empty' : 'Has Data'}`);
    });
    
    // Find the main sheet with donation data
    const mainSheet = Object.entries(allData).find(([name, info]) => 
      info.data.length > 0 && 
      (name.toLowerCase().includes('donation') || 
       name.toLowerCase().includes('payment') || 
       info.headers.some(h => h.includes('Amount') || h.includes('Donor')))
    );
    
    if (mainSheet) {
      const [sheetName, sheetInfo] = mainSheet;
      console.log(`\n🎯 MAIN DONATION SHEET FOUND: "${sheetName}"`);
      console.log(`   Contains ${sheetInfo.data.length} donation records`);
      
      // Calculate statistics
      const donationData = sheetInfo.data;
      const amountField = sheetInfo.headers.find(h => h.includes('Amount') || h.includes('amount'));
      const donorField = sheetInfo.headers.find(h => h.includes('Donor') || h.includes('donor'));
      
      if (amountField) {
        const totalAmount = donationData.reduce((sum, record) => {
          const amount = parseFloat(record[amountField]) || 0;
          return sum + amount;
        }, 0);
        console.log(`   💰 Total Amount: $${totalAmount.toLocaleString()}`);
      }
      
      if (donorField) {
        const uniqueDonors = new Set();
        donationData.forEach(record => {
          const donor = record[donorField];
          if (donor && donor.trim()) {
            uniqueDonors.add(donor.trim());
          }
        });
        console.log(`   👥 Unique Donors: ${uniqueDonors.size}`);
      }
    }
    
    console.log(`\n✅ DATA EXTRACTION COMPLETE!`);
    console.log(`📄 Complete data saved to execution log above`);
    
    return {
      success: true,
      spreadsheetName: spreadsheet.getName(),
      totalSheets: sheets.length,
      allData: allData,
      extractedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Error extracting data:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * EXPORT REAL DATA TO JSON FORMAT
 * Run this to get a clean JSON export of all your data
 */
function exportRealDataAsJSON() {
  console.log('📤 EXPORTING REAL DATA AS JSON...');
  
  try {
    const result = extractAllRealData();
    
    if (result.success && result.allData) {
      console.log('\n📄 JSON EXPORT:');
      console.log('===============');
      console.log(JSON.stringify(result.allData, null, 2));
      
      return result.allData;
    } else {
      console.log('❌ Export failed:', result.error);
      return null;
    }
    
  } catch (error) {
    console.error('❌ Export error:', error);
    return null;
  }
}

/**
 * QUICK CHECK - What's currently in your sheet?
 */
function quickDataCheck() {
  console.log('🔍 QUICK DATA CHECK...');
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    console.log(`📊 Sheet: "${sheet.getName()}"`);
    console.log(`📐 Size: ${values.length} rows × ${values[0]?.length || 0} columns`);
    
    if (values.length > 0) {
      console.log('📝 Headers:');
      values[0].forEach((header, idx) => {
        console.log(`   ${idx + 1}. "${header}"`);
      });
      
      if (values.length > 1) {
        console.log(`💾 Data rows: ${values.length - 1}`);
        console.log('🔍 First data row:');
        values[1].forEach((cell, idx) => {
          console.log(`   ${values[0][idx]}: "${cell}"`);
        });
      } else {
        console.log('⚠️ No data rows (only headers)');
      }
    } else {
      console.log('❌ Sheet is completely empty');
    }
    
    return {
      success: true,
      rows: values.length,
      cols: values[0]?.length || 0,
      hasData: values.length > 1
    };
    
  } catch (error) {
    console.error('❌ Check failed:', error);
    return { success: false, error: error.toString() };
  }
}
