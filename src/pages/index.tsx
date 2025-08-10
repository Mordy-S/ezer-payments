   function doGet() {
     const htmlOutput = HtmlService.createHtmlOutputFromFile('Index');
     return htmlOutput;
   }

   function getData() {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = sheet.getDataRange().getValues();
     return data;
   }