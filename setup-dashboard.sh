#!/bin/bash

# Quick Setup Script for Google Apps Script Dashboard
# This script helps organize files for easy copying to Apps Script

echo "🚀 Preparing Google Apps Script Dashboard Files..."
echo "=================================================="

# Create a deployment folder
mkdir -p "apps-script-deployment"

echo "📁 Created deployment folder"

# Copy files with instructions
cp google-apps-script/Code.gs "apps-script-deployment/"
cp google-apps-script/dashboard.html "apps-script-deployment/"
cp google-apps-script/styles.html "apps-script-deployment/"
cp google-apps-script/scripts.html "apps-script-deployment/"
cp google-apps-script/appsscript.json "apps-script-deployment/"
cp google-apps-script/Test.gs "apps-script-deployment/"

echo "📄 Copied all necessary files"

# Create a file list for easy reference
cat > "apps-script-deployment/FILE_UPLOAD_ORDER.txt" << EOF
📋 Google Apps Script File Upload Order
======================================

Follow this exact order when creating files in Apps Script:

1. Code.gs (replace default code)
   - Copy content from: Code.gs
   
2. dashboard.html (HTML file, name: "dashboard")
   - Copy content from: dashboard.html
   
3. styles.html (HTML file, name: "styles")
   - Copy content from: styles.html
   
4. scripts.html (HTML file, name: "scripts")
   - Copy content from: scripts.html
   
5. Test.gs (Script file, name: "Test")
   - Copy content from: Test.gs
   
6. appsscript.json (update existing file)
   - Copy content from: appsscript.json

⚠️  IMPORTANT NOTES:
- When adding HTML files, don't include the .html extension in the name
- Save each file after pasting the content
- Test connection before deploying

🎯 After uploading all files:
1. Run "testConnection" function to verify
2. Run "runComprehensiveTest" to check everything
3. Deploy as Web App
EOF

echo "📋 Created upload instructions"

# Create a summary file
cat > "apps-script-deployment/DEPLOYMENT_SUMMARY.txt" << EOF
🎯 Deployment Summary
====================

Your Google Apps Script dashboard includes:

✅ Complete HTML dashboard with Hebrew support
✅ Real-time Google Sheets integration  
✅ KPI cards, charts, and data tables
✅ Search and filter functionality
✅ Responsive design for all devices
✅ Hebrew calendar integration

📊 Features:
- Total donations tracking
- Amount and donor analytics  
- Hebrew date display
- Campaign breakdown
- Success rate monitoring
- Real-time data refresh

🔧 Technical Details:
- Sheet ID: 1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg
- 6 files total (Code.gs + 3 HTML + Test.gs + appsscript.json)
- RTL Hebrew text support
- Responsive CSS design
- Asynchronous data loading

🚀 Next Steps:
1. Upload files to script.google.com
2. Test connection and data
3. Deploy as web app
4. Share dashboard URL

Estimated setup time: 10-15 minutes
Result: Professional live dashboard! 🎉
EOF

echo "📄 Created deployment summary"

echo ""
echo "✅ Setup Complete!"
echo "📁 All files ready in: apps-script-deployment/"
echo "📋 Follow FILE_UPLOAD_ORDER.txt for step-by-step instructions"
echo ""
echo "🎯 Next: Go to script.google.com and create your project!"
