/**
 * Simple Test Script for the Dashboard Deployment
 * Run this in Google Apps Script to verify everything works
 */

function runAllTests() {
  console.log('🧪 Running Dashboard Tests...');
  console.log('================================');
  
  // Test 1: Connection Test
  console.log('Test 1: Testing connection to Google Sheets...');
  var connectionResult = testConnection();
  console.log('Connection Result:', connectionResult);
  
  if (connectionResult.success) {
    console.log('✅ Connection test PASSED');
  } else {
    console.log('❌ Connection test FAILED:', connectionResult.error);
    return;
  }
  
  console.log('');
  
  // Test 2: Data Retrieval Test
  console.log('Test 2: Testing data retrieval...');
  var dataResult = getSheetData();
  console.log('Data Retrieval Result:', dataResult);
  
  if (dataResult.success && dataResult.data) {
    console.log('✅ Data retrieval PASSED');
    console.log('📊 Found', dataResult.data.length, 'donation records');
    console.log('📈 Statistics calculated successfully');
  } else {
    console.log('❌ Data retrieval FAILED:', dataResult.error);
    return;
  }
  
  console.log('');
  
  // Test 3: Hebrew Calendar Test
  console.log('Test 3: Testing Hebrew calendar info...');
  var calendarResult = getHebrewCalendarInfo();
  console.log('Calendar Result:', calendarResult);
  
  if (calendarResult.success) {
    console.log('✅ Hebrew calendar PASSED');
  } else {
    console.log('⚠️ Hebrew calendar WARNING:', calendarResult.error);
  }
  
  console.log('');
  console.log('🎉 ALL TESTS COMPLETED!');
  console.log('================================');
  
  // Summary
  if (connectionResult.success && dataResult.success) {
    console.log('✅ Your dashboard is ready for deployment!');
    console.log('📝 Next step: Deploy as Web App');
    console.log('🌐 Your dashboard will show', dataResult.data.length, 'donations');
    console.log('💰 Total amount:', formatCurrency(dataResult.stats.totalAmount));
  } else {
    console.log('❌ Please fix the issues above before deploying');
  }
}

function testDashboardHTML() {
  console.log('🖥️ Testing HTML Dashboard Generation...');
  
  try {
    var html = HtmlService.createTemplateFromFile('dashboard');
    var output = html.evaluate();
    console.log('✅ Dashboard HTML generated successfully');
    return true;
  } catch (error) {
    console.log('❌ Dashboard HTML generation failed:', error);
    return false;
  }
}

function testWebApp() {
  console.log('🌐 Testing Web App Configuration...');
  
  try {
    var htmlResult = testDashboardHTML();
    var dataResult = getSheetData();
    
    if (htmlResult && dataResult.success) {
      console.log('✅ Web app is ready for deployment!');
      console.log('🎯 All components working correctly');
      return true;
    } else {
      console.log('❌ Web app has issues - check HTML and data');
      return false;
    }
  } catch (error) {
    console.log('❌ Web app test failed:', error);
    return false;
  }
}

function showDeploymentInstructions() {
  console.log('');
  console.log('📋 DEPLOYMENT INSTRUCTIONS');
  console.log('==========================');
  console.log('1. Click "Deploy" → "New deployment"');
  console.log('2. Choose "Web app" as deployment type');
  console.log('3. Set execute as "Me"');
  console.log('4. Set access to "Anyone" or "Anyone with Google account"');
  console.log('5. Click "Deploy"');
  console.log('6. Copy the web app URL');
  console.log('7. Open the URL to see your dashboard!');
  console.log('');
  console.log('🎉 Your dashboard will be live and connected to your Google Sheet!');
}

// Run comprehensive test
function runComprehensiveTest() {
  runAllTests();
  testWebApp();
  showDeploymentInstructions();
}
