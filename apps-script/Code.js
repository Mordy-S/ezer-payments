/**
 * Google Apps Script to fetch data from the specific Google Sheet
 * Sheet ID: 1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg
 */

// Your Google Sheet ID
const SHEET_ID = '1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg';

/**
 * Main function to export sheet data for the dashboard
 */
function exportSheetDataForDashboard() {
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
      return null;
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
    
    // Log the results
    console.log('=== SHEET EXPORT RESULTS ===');
    console.log(`Sheet Name: ${sheet.getName()}`);
    console.log(`Total Rows: ${values.length - 1}`);
    console.log(`Total Columns: ${headers.length}`);
    console.log('');
    
    console.log('=== COLUMN HEADERS ===');
    headers.forEach((header, index) => {
      console.log(`${index + 1}. ${header}`);
    });
    console.log('');
    
    console.log('=== SAMPLE DATA (First 3 rows) ===');
    jsonData.slice(0, 3).forEach((row, index) => {
      console.log(`Row ${index + 1}:`, JSON.stringify(row, null, 2));
    });
    console.log('');
    
    console.log('=== COMPLETE JSON DATA ===');
    console.log('Copy this JSON data for your dashboard:');
    console.log('```json');
    console.log(JSON.stringify(jsonData, null, 2));
    console.log('```');
    
    return jsonData;
    
  } catch (error) {
    console.error('Error exporting sheet data:', error);
    return null;
  }
}

/**
 * Function to get sheet structure and metadata
 */
function getSheetInfo() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    const range = sheet.getDataRange();
    
    console.log('=== SHEET INFORMATION ===');
    console.log(`Spreadsheet Name: ${spreadsheet.getName()}`);
    console.log(`Sheet Name: ${sheet.getName()}`);
    console.log(`Last Row: ${range.getLastRow()}`);
    console.log(`Last Column: ${range.getLastColumn()}`);
    console.log(`Total Cells: ${range.getNumRows()} x ${range.getNumColumns()}`);
    
    // Get column headers and types
    const headers = range.getValues()[0];
    console.log('');
    console.log('=== COLUMNS ===');
    headers.forEach((header, index) => {
      // Get a sample value from the second row to determine type
      const sampleValue = range.getValues()[1] ? range.getValues()[1][index] : null;
      const dataType = sampleValue instanceof Date ? 'Date' : 
                      typeof sampleValue === 'number' ? 'Number' : 
                      typeof sampleValue === 'boolean' ? 'Boolean' : 'Text';
      
      console.log(`${String.fromCharCode(65 + index)}. ${header} (${dataType})`);
    });
    
  } catch (error) {
    console.error('Error getting sheet info:', error);
  }
}

/**
 * Function to test the connection
 */
function testConnection() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('✅ Successfully connected to spreadsheet:', spreadsheet.getName());
    
    const sheet = spreadsheet.getActiveSheet();
    console.log('✅ Successfully accessed sheet:', sheet.getName());
    
    const range = sheet.getDataRange();
    console.log('✅ Successfully got data range:', `${range.getNumRows()} rows x ${range.getNumColumns()} columns`);
    
    console.log('🎉 Connection test passed! You can now run exportSheetDataForDashboard()');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
  }
}
