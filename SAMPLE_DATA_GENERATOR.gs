/**
 * SAMPLE DATA GENERATOR FOR TESTING
 * 
 * INSTRUCTIONS:
 * 1. Copy this function into your Google Apps Script
 * 2. Run "generateSampleData" function
 * 3. This will create test data in your sheet
 * 4. Then test your dashboard again
 */

function generateSampleData() {
  console.log('🔧 GENERATING SAMPLE DATA...');
  
  try {
    // Open your spreadsheet
    const spreadsheet = SpreadsheetApp.openById('1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg');
    const sheet = spreadsheet.getActiveSheet();
    
    // Clear existing data
    sheet.clear();
    
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
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
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
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
    
    // Format the sheet
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#E8F0FE');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    console.log('✅ Sample data generated successfully!');
    console.log(`   Added ${sampleData.length} sample donations`);
    console.log('   Now test your dashboard again');
    
    return {
      success: true,
      message: 'Sample data created successfully',
      rowsAdded: sampleData.length
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
 * Alternative: Add data to a specific sheet by name
 */
function generateSampleDataInSheet(sheetName = 'Sheet1') {
  try {
    const spreadsheet = SpreadsheetApp.openById('1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg');
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      console.log(`✅ Created new sheet: ${sheetName}`);
    }
    
    // Same data generation logic as above...
    // (Use the same code from generateSampleData function)
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

/**
 * Quick test to verify the data was added correctly
 */
function testSampleData() {
  try {
    const result = getSheetData(); // This calls your main dashboard function
    console.log('🔍 Testing dashboard with sample data...');
    console.log('Result:', JSON.stringify(result, null, 2));
    
    if (result.success && result.data && result.data.length > 0) {
      console.log('✅ SUCCESS: Dashboard should now work!');
      console.log(`   Found ${result.data.length} donations`);
      console.log(`   Total amount: $${result.stats.totalAmount}`);
    } else {
      console.log('❌ Still having issues. Check the result above.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}
