# Google Apps Script Instructions

## Step-by-Step Guide to Export Your Sheet Data

### 1. Open Google Apps Script
- Go to [script.google.com](https://script.google.com)
- Sign in with your Google account

### 2. Create New Project
- Click "New Project"
- You'll see a default `myFunction()` - delete all the code

### 3. Add the Export Script
- Copy all the code from `export-sheet-data.js`
- Paste it into the Apps Script editor
- The script is already configured with your sheet ID: `1w3TLvwiNF9YTAVTqKNmXTxRvwRr1ZfHBLZ-MD3ljQUg`

### 4. Run the Script
- Click the function dropdown (currently shows "exportSheetData")
- Select "exportSheetData"
- Click the "Run" button (▶️)
- **First time**: You'll need to authorize the script to access your sheets

### 5. View the Output
- Click "View" → "Logs" (or Ctrl+Enter)
- You'll see:
  - Sheet information
  - Data in JSON format
  - Data in CSV format
  - Column headers

### 6. Copy the Data
- Copy the JSON data from the logs
- Paste it here in our chat
- I'll use this to build your dashboard!

### Alternative Functions

If you want to try different exports:

**Get Sheet Info Only:**
```javascript
// Change function dropdown to "getSheetInfo" and run
```

**Export Specific Sheet:**
```javascript
// Change function dropdown to "exportSheetByName" and run
```

### What I Need

After you run the script, please copy and paste:
1. **The JSON data** (this is the most important)
2. **The column headers** (so I understand the structure)
3. **Any sample rows** (to see the data format)

### Example Output Format

You should see something like:
```
Sheet Name: Sheet1
Rows: 50, Columns: 8
====================
JSON Data:
[
  {
    "Date": "2024-01-15",
    "Campaign": "חגים",
    "Reason": "מזון",
    "Amount": 1200
  },
  ...
]
```

Copy that JSON data and paste it here - then I'll build your stunning Hebrew calendar dashboard! 🚀
