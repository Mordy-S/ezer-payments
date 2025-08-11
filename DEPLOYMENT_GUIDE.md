# 🚀 Google Apps Script Deployment Guide

## Complete Dashboard Deployment Instructions

### 📋 What You'll Deploy
- **Complete donation dashboard** with Hebrew calendar integration
- **Real-time data** from your Google Sheets
- **KPI cards**, charts, and detailed table view
- **Responsive design** that works on all devices
- **Hebrew text support** with RTL layout

---

## 🎯 Step-by-Step Deployment

### Step 1: Open Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Sign in with your Google account
3. Click **"New Project"**
4. Name it: **"Donations Dashboard - Meshivat Nefesh"**

### Step 2: Delete Default Code
1. You'll see a default `myFunction()` in `Code.gs`
2. **Delete ALL the default code** (select all and delete)

### Step 3: Copy the Main Code
1. Copy **ALL** the content from `Code.gs` (the file I just created)
2. Paste it into the Apps Script editor
3. Click **Save** (Ctrl+S)

### Step 4: Add HTML Files
You need to add 3 HTML files:

#### 4a. Add dashboard.html
1. Click **"+"** next to "Files"
2. Select **"HTML"**
3. Name it: **`dashboard`** (no .html extension)
4. Copy ALL content from `dashboard.html` and paste it
5. Click **Save**

#### 4b. Add styles.html
1. Click **"+"** next to "Files"
2. Select **"HTML"**
3. Name it: **`styles`** (no .html extension)
4. Copy ALL content from `styles.html` and paste it
5. Click **Save**

#### 4c. Add scripts.html
1. Click **"+"** next to "Files"
2. Select **"HTML"**
3. Name it: **`scripts`** (no .html extension)
4. Copy ALL content from `scripts.html` and paste it
5. Click **Save**

### Step 5: Update appsscript.json
1. Find `appsscript.json` in the file list
2. Replace its content with the content from `appsscript.json`
3. Click **Save**

### Step 6: Test the Connection
1. In the function dropdown, select **`testConnection`**
2. Click the **Run** button (▶️)
3. **First time**: You'll need to authorize the script
   - Click **"Review permissions"**
   - Choose your Google account
   - Click **"Allow"**
4. Check the execution log - you should see ✅ success messages

### Step 7: Deploy as Web App
1. Click **"Deploy"** → **"New deployment"**
2. Click the **gear icon** next to "Select type"
3. Choose **"Web app"**
4. Fill in the deployment configuration:
   - **Description**: "Donations Dashboard v1.0"
   - **Execute as**: "Me (your email)"
   - **Who has access**: "Anyone" (or "Anyone with Google account" for more security)
5. Click **"Deploy"**
6. **Copy the Web app URL** - this is your dashboard URL!

---

## 🎉 Your Dashboard is Live!

### ✅ Verification Checklist

Visit your Web app URL and verify:
- [ ] Dashboard loads without errors
- [ ] KPI cards show real data from your sheet
- [ ] Hebrew text displays correctly (RTL)
- [ ] Donations table shows your actual data
- [ ] Search and filter functionality works
- [ ] Refresh button updates data

### 🔧 If Something Goes Wrong

**Problem**: Dashboard shows "Error Loading Data"
- Go back to Apps Script
- Run `testConnection` function manually
- Check the execution log for errors
- Make sure your Sheet ID is correct in the code

**Problem**: Hebrew text is broken
- Check that your browser supports Hebrew fonts
- Verify the sheet data contains Hebrew text

**Problem**: No data appears
- Run `getSheetData` function manually in Apps Script
- Check the execution log
- Verify the sheet has data in the expected format

---

## 📊 Understanding Your Data

### Your Sheet Structure
The dashboard expects these columns in your Google Sheet:
- `1. Receipt #` - Donation receipt number
- `2. Payment Date` - Date of payment
- `6. Full Hebrew Date` - Hebrew calendar date
- `7. Parsha Name (Hebrew)` - Weekly Torah portion
- `11. Donor Jewish Name` - Donor's Hebrew name
- `13. Amount` - Donation amount
- `17. Campaign` - Campaign name
- `16. Status` - Payment status

### Dashboard Features
1. **KPI Cards**: Total donations, amount, donors, average, success rate
2. **Hebrew Calendar**: Current Hebrew date and parsha
3. **Charts**: Breakdown by month, parsha, and campaign
4. **Data Table**: Searchable and filterable donation records
5. **Real-time Updates**: Click refresh to get latest data

---

## 🔒 Security & Permissions

### What the Script Can Access
- **Read-only access** to your specific Google Sheet
- **No write permissions** - completely safe
- **No access** to other sheets or data

### Sharing Your Dashboard
- Share the Web app URL with anyone who needs access
- Data is always fresh from your Google Sheet
- No need to manually update or export data

---

## 🚀 Next Steps

### After Deployment
1. **Bookmark** your dashboard URL
2. **Test** all functionality with real data
3. **Share** with your team members
4. **Monitor** performance and usage

### Future Updates
To update your dashboard:
1. Make changes in the Apps Script editor
2. Save your changes
3. Click **"Deploy"** → **"Manage deployments"**
4. Click **"Edit"** on your deployment
5. Change version to **"New version"**
6. Click **"Deploy"**

---

## 📞 Support

If you encounter any issues:
1. Check the **execution log** in Apps Script
2. Verify your **sheet data format**
3. Test the **connection functions** manually
4. Review the **browser console** for JavaScript errors

---

## 🎯 Success!

Once deployed, you'll have a **professional, real-time donation dashboard** that:
- ✅ Connects directly to your Google Sheets
- ✅ Supports Hebrew text and calendar
- ✅ Updates automatically when you refresh
- ✅ Works on desktop and mobile
- ✅ Requires no maintenance

**Your dashboard URL is ready to use and share!** 🎉

---

*Deployment time: ~10-15 minutes*  
*Technical skill required: Basic (copy/paste)*  
*Result: Professional live dashboard* ✨
