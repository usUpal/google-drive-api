const { google } = require("googleapis");

const CLIENT_ID =
  "864485508079-7r5t9sl41krmpdk7rb8njhrk5gagfe0k.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04kQuVguhOuqNCgYIARAAGAQSNwF-L9IrM0aGnC3LmH2HxW3BbMyrcUqgr8qxwDy6H0HpUkwQ86GpF8CF4UXMA8egRIS5LvBoiCU";
console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN);

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

module.exports = drive;
