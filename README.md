### Step 1: Upload Data to Google Sheets

1. **Create a Google Sheet**:
   - Go to Google Sheets and create a new spreadsheet.

2. **Upload `data_final.csv`**:
   - Open your Google Sheet.
   - Click on `File` > `Import`.
   - Choose the `Upload` tab and drag your `data_final.csv` file or select it from your computer.
   - Choose to insert the data into the current sheet.

### Step 2: Set Up Google Apps Script

1. **Open Google Apps Script**:
   - In your Google Sheet, click on `Extensions` > `Apps Script`.

2. **Create a Script to Generate HTML**:
   - Replace the default code with the following script to read data from the sheet and generate HTML content.

   ```javascript
   function doGet() {
     const htmlOutput = HtmlService.createHtmlOutputFromFile('Index');
     return htmlOutput;
   }

   function getData() {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = sheet.getDataRange().getValues();
     return data;
   }
   ```

3. **Create an HTML File**:
   - In the Apps Script editor, click on `File` > `New` > `HTML file` and name it `Index`.
   - Add the following HTML code to display the data:

   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <base target="_top">
       <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shadcn-ui/dist/shadcn-ui.min.css">
   </head>
   <body>
       <h1>Data Visualization</h1>
       <canvas id="myChart"></canvas>
       <script>
           google.script.run.withSuccessHandler(drawChart).getData();

           function drawChart(data) {
               const labels = data[0].slice(1); // Assuming first row is headers
               const values = data.slice(1).map(row => row.slice(1)); // Exclude first column

               const ctx = document.getElementById('myChart').getContext('2d');
               const myChart = new Chart(ctx, {
                   type: 'bar',
                   data: {
                       labels: labels,
                       datasets: values.map((value, index) => ({
                           label: data[index + 1][0], // First column as label
                           data: value,
                           backgroundColor: 'rgba(75, 192, 192, 0.2)',
                           borderColor: 'rgba(75, 192, 192, 1)',
                           borderWidth: 1
                       }))
                   },
                   options: {
                       scales: {
                           y: {
                               beginAtZero: true
                           }
                       }
                   }
               });
           }
       </script>
   </body>
   </html>
   ```

### Step 3: Deploy the Web App

1. **Deploy the App**:
   - Click on `Deploy` > `New deployment`.
   - Select `Web app`.
   - Set the access to `Anyone` or `Anyone with the link` depending on your sharing preference.
   - Click `Deploy` and authorize the script.

2. **Get the URL**:
   - After deployment, you will receive a URL. This is the link to your web app that you can share with others.

### Step 4: Enhance Visualization with Shadcn UI

1. **Integrate Shadcn UI**:
   - Ensure you have included the Shadcn UI CSS in your HTML file as shown in the HTML code above.
   - You can further customize the UI by using Shadcn components as per your requirements.

### Step 5: Test and Share

1. **Test the Web App**:
   - Open the URL provided after deployment to see your data visualized in a chart.

2. **Share the Link**:
   - Share the URL with others to allow them to view the data visualization.

### Conclusion

You have now created a project that uploads data from a CSV file to Google Sheets, visualizes it using the Shadcn UI framework, and generates HTML content with Google Apps Script. You can further enhance the project by adding more features or customizing the UI as needed.