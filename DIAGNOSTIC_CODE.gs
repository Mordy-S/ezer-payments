/**
 * DIAGNOSTIC CODE FOR YOUR GOOGLE APPS SCRIPT
 * 
 * INSTRUCTIONS:
 * 1. Copy this entire function into your Google Apps Script
 * 2. Run the "debugSheetConnection" function
 * 3. Check the execution log for detailed information
 * 4. This will tell us exactly what's wrong
 */

// Your current sheet ID from the code
const DEBUG_SHEET_ID = '1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg';

function debugSheetConnection() {
  console.log('🔍 STARTING DIAGNOSTIC TEST...');
  console.log('================================');
  
  try {
    // Test 1: Can we access the spreadsheet?
    console.log('📊 Test 1: Accessing spreadsheet...');
    const spreadsheet = SpreadsheetApp.openById(DEBUG_SHEET_ID);
    console.log('✅ SUCCESS: Connected to spreadsheet');
    console.log(`   Spreadsheet name: "${spreadsheet.getName()}"`);
    console.log(`   Spreadsheet URL: https://docs.google.com/spreadsheets/d/${DEBUG_SHEET_ID}`);
    
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
      return;
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
    
    // Show first few data rows
    console.log('');
    console.log('   SAMPLE DATA (First 3 rows after headers):');
    for (let i = 1; i <= Math.min(3, values.length - 1); i++) {
      if (values[i]) {
        console.log(`   Row ${i + 1}:`);
        values[i].forEach((cell, index) => {
          console.log(`      Column ${index + 1}: "${cell}"`);
        });
        console.log('   ---');
      }
    }
    
    // Test 5: Check for expected column names
    console.log('');
    console.log('🔍 Test 5: Looking for expected columns...');
    const expectedColumns = [
      '1. Receipt #',
      '2. Payment Date',
      '6. Full Hebrew Date',
      '7. Parsha Name (Hebrew)',
      '9. Month and year',
      '11. Donor Jewish Name',
      '13. Amount',
      '16. Status',
      '17. Campaign'
    ];
    
    if (values.length > 0) {
      const headers = values[0];
      expectedColumns.forEach(expectedCol => {
        const found = headers.some(header => String(header).includes(expectedCol.split('.')[1]?.trim()) || header === expectedCol);
        if (found) {
          console.log(`   ✅ Found: "${expectedCol}"`);
        } else {
          console.log(`   ❌ Missing: "${expectedCol}"`);
        }
      });
    }
    
    // Test 6: Try to process the data like the main function does
    console.log('');
    console.log('⚙️ Test 6: Testing data processing...');
    const jsonData = [];
    
    if (values.length > 1) {
      const headers = values[0];
      
      for (let i = 1; i < Math.min(values.length, 4); i++) { // Just test first 3 rows
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          const header = headers[j];
          const value = values[i][j];
          
          if (value instanceof Date) {
            row[header] = value.toISOString().split('T')[0];
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
      
      console.log(`   ✅ Processed ${jsonData.length} sample rows successfully`);
      console.log('   Sample processed data:');
      console.log(JSON.stringify(jsonData, null, 2));
    }
    
    // Test 7: Final summary
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
      console.log('   SOLUTION: Add some data to your sheet!');
    } else if (jsonData.length === 0) {
      console.log('❌ MAIN ISSUE: Data rows exist but they appear to be empty');
      console.log('   SOLUTION: Make sure your data rows have actual content');
    } else {
      console.log('✅ DATA PROCESSING: Working correctly');
      console.log('   Your sheet should work with the dashboard!');
    }
    
  } catch (error) {
    console.log('');
    console.log('❌ CRITICAL ERROR:');
    console.log('================================');
    console.log(`Error: ${error.toString()}`);
    console.log('');
    
    if (error.toString().includes('requested entity was not found')) {
      console.log('🔍 LIKELY CAUSE: Wrong Sheet ID or no access permissions');
      console.log('   SOLUTION 1: Double-check the Sheet ID in your code');
      console.log('   SOLUTION 2: Make sure the sheet is shared with your Google account');
      console.log('   SOLUTION 3: Make sure the sheet URL is correct');
    } else if (error.toString().includes('permission')) {
      console.log('🔍 LIKELY CAUSE: Permission denied');
      console.log('   SOLUTION: Share the sheet with your Google account or make it public');
    } else {
      console.log('🔍 UNKNOWN ERROR: Check the error message above');
    }
  }
  
  console.log('');
  console.log('🎯 NEXT STEPS:');
  console.log('================================');
  console.log('1. Read the diagnostic results above');
  console.log('2. Fix any issues identified');
  console.log('3. Re-run your dashboard');
  console.log('4. If still having issues, share the diagnostic results');
}

/**
 * Alternative function to test with a different sheet ID
 * Use this if you think the sheet ID might be wrong
 */
function debugWithDifferentSheetId() {
  // Replace this with your actual sheet ID if different
  const TEST_SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
  
  console.log(`🔍 Testing with different sheet ID: ${TEST_SHEET_ID}`);
  
  try {
    const spreadsheet = SpreadsheetApp.openById(TEST_SHEET_ID);
    console.log('✅ SUCCESS: Connected to spreadsheet');
    console.log(`   Spreadsheet name: "${spreadsheet.getName()}"`);
    
    // Run the same tests...
    // (You can copy the main diagnostic code here if needed)
    
  } catch (error) {
    console.log('❌ FAILED: Could not connect to sheet');
    console.log(`   Error: ${error.toString()}`);
  }
}

/**
 * Function to list all your accessible spreadsheets
 * This helps you find the right sheet ID
 */
function listMySpreadsheets() {
  console.log('📋 LISTING YOUR SPREADSHEETS:');
  console.log('================================');
  
  try {
    // This gets all files that are spreadsheets
    const files = DriveApp.getFilesByType(MimeType.GOOGLE_SHEETS);
    let count = 0;
    
    while (files.hasNext() && count < 10) { // Limit to first 10
      const file = files.next();
      console.log(`📊 ${count + 1}. "${file.getName()}"`);
      console.log(`   ID: ${file.getId()}`);
      console.log(`   URL: https://docs.google.com/spreadsheets/d/${file.getId()}`);
      console.log('   ---');
      count++;
    }
    
    if (count === 0) {
      console.log('❌ No spreadsheets found in your Drive');
    } else {
      console.log(`✅ Found ${count} spreadsheets (showing first 10)`);
    }
    
  } catch (error) {
    console.log('❌ Error listing spreadsheets:', error.toString());
  }
}
