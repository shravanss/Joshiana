const CLIENT_ID = '668100241522-nugjhtnio377rc0mdnqt2t9bafllkl4j.apps.googleusercontent.com'; // Replace with your actual client ID
const API_KEY = 'AIzaSyBcYI4_Xf9XUhI39dFJqabdi3LvdSXpJ2Q'; // Replace with your actual API key
const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1PN8YoPW__kWCGtze-sPFFLwOb3hVTRm7W7G7ePU2VkM/edit?pli=1#gid=0'; // Replace with your actual spreadsheet ID

// Load Google Sheets API
gapi.load('client:auth2', initClient);

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: "https://www.googleapis.com/auth/spreadsheets",
  }).then(function () {
    // Attach event listener to the anchor tag
    document.getElementById('submitAnchor').addEventListener('click', addEmail);
  });
}

function addEmail(event) {
  event.preventDefault();

  const email = document.getElementById('emailInput').value;

  // Call the Google Sheets API to append the email to the sheet
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1", // Replace with your actual sheet name and range
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [[email]],
    },
  }).then(function(response) {
    console.log("Email added:", response);
    // Clear the email input field
    document.getElementById('emailInput').value = '';
  }, function(error) {
    console.error("Error adding email:", error);
  });
}