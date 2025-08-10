   function doGet() {
     return HtmlService.createHtmlOutputFromFile('Index');
   }

   function getData() {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = sheet.getDataRange().getValues();
     return data;
   }