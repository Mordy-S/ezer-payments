# 🚨 TROUBLESHOOTING: "0 donations" Issue

## Quick Fix Instructions

### Step 1: Run Diagnostic Code
1. Copy the code from `DIAGNOSTIC_CODE.gs`
2. Paste it into your Google Apps Script
3. Run the `debugSheetConnection` function
4. Check the execution log

### Step 2: Generate Sample Data (If Empty Sheet)
1. Copy the code from `SAMPLE_DATA_GENERATOR.gs` 
2. Paste it into your Google Apps Script
3. Run the `generateSampleData` function
4. Refresh your dashboard

### Step 3: Common Issues & Solutions

#### Issue: "Sheet ID not found"
**Solution:** 
- Go to your Google Sheet
- Copy the ID from the URL (the long string between `/d/` and `/edit`)
- Replace the SHEET_ID in your Code.gs file

#### Issue: "Permission denied"
**Solution:**
- Make sure the sheet is shared with your Google account
- Or make the sheet publicly viewable

#### Issue: "Sheet is empty"
**Solution:**
- Use the sample data generator above
- Or manually add headers and data to your sheet

#### Issue: "Column names don't match"
**Solution:**
Your sheet needs these columns:
- `1. Receipt #`
- `2. Payment Date`
- `6. Full Hebrew Date`
- `11. Donor Jewish Name`
- `13. Amount`
- `16. Status`
- `17. Campaign`

### Step 4: Test Your Fix
1. Go to your Google Apps Script
2. Run the `testConnection` function
3. Check the execution log for success
4. Refresh your dashboard web app

### Step 5: If Still Not Working
1. Check the browser console (F12) for JavaScript errors
2. Make sure the web app is deployed correctly
3. Try deploying a new version

## Most Common Root Causes:
1. ❌ **Empty sheet** - Use sample data generator
2. ❌ **Wrong Sheet ID** - Copy correct ID from URL
3. ❌ **No permissions** - Share sheet with your account
4. ❌ **Wrong column names** - Use expected headers above

## Expected Sheet Format:
```
| 1. Receipt # | 2. Payment Date | 6. Full Hebrew Date | 11. Donor Jewish Name | 13. Amount | 16. Status | 17. Campaign |
|-------------|-----------------|-------------------|---------------------|-----------|------------|-------------|
| R001        | 2025-08-01      | כ״ה תמוז תשפ״ה        | יוסף כהן             | 180       | Success    | כללי         |
| R002        | 2025-08-02      | כ״ו תמוז תשפ״ה        | משה לוי              | 250       | Success    | חינוך        |
```

Run the diagnostic code first - it will tell you exactly what's wrong! 🔍
