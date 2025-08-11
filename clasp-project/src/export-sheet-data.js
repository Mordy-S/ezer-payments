/**
 * Google Apps Script to Export Sheet Data for Dashboard
 * 
 * Instructions:
 * 1. Open Google Apps Script (script.google.com)
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Update the SHEET_ID with your sheet ID
 * 5. Run the 'exportSheetData' function
 * 6. Copy the output from the console/logs
 */

// Note: SHEET_ID is declared in Code.gs - do not redeclare here

/**
 * Main function to export sheet data
 */
function exportSheetData() {
  try {
    // Open the spreadsheet
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
