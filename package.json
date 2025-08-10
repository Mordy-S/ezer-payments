   function doGet() {
     const htmlOutput = HtmlService.createHtmlOutputFromFile('Index')
         .setTitle('Data Visualization')
         .setWidth(600)
         .setHeight(400);
     return htmlOutput;
   }

   function getData() {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = sheet.getDataRange().getValues();
     return data;
   }