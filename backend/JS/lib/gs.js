const { google } = require("googleapis");
const path = require('path')
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname,'credential.json'),
    scopes: "https://www.googleapis.com/auth/spreadsheets",
})

const main = async(inputSpreadsheetId,inputRange) =>  {
     // Create client instance for auth
 const client = await auth.getClient();

 // Instance of Google Sheets API
 const googleSheets = google.sheets({ version: "v4", auth: client });

 const spreadsheetId = inputSpreadsheetId;

 // Get metadata about spreadsheet
 const metaData = await googleSheets.spreadsheets.get({
   auth,
   spreadsheetId,
   ranges: inputRange
 });
 
 const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: inputRange,
  });
  console.log(getRows.data.values.length[14]);
  return((getRows.data.values[getRows.data.values.length -1 ]));
}
module.exports= main

