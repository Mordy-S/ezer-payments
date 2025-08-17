# Simple Google Apps Script Solution

Since CLASP is having some connection issues, here's a simpler approach:

## 🚀 Quick Setup (Manual Method)

### Step 1: Open Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Name it "Sheet Data Exporter"

### Step 2: Copy the Code
Copy this code and paste it into the Apps Script editor:

```javascript
/**
 * Google Apps Script to fetch data from your specific Google Sheet
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
```

### Step 3: Run the Function
1. Click on the function dropdown (should show "exportSheetDataForDashboard")
2. Click the "Run" button (▶️)
3. **First time**: Authorize the script to access your Google Sheets
4. Check the "Execution transcript" or "View" → "Logs" for the output

### Step 4: Copy the JSON Data
- You'll see the complete JSON data in the logs
- Copy everything between the ``` json markers
- Paste it here in our chat

## What This Does:
- ✅ Connects directly to your specific Google Sheet
- ✅ Exports all data in JSON format (perfect for our dashboard)
- ✅ Handles Hebrew text properly
- ✅ Shows column structure and sample data
- ✅ Formats dates consistently

## Ready?
Once you run this and paste the JSON data here, I'll immediately build your stunning Hebrew calendar dashboard! 🎯
