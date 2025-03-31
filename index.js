// server.js
// where your node app starts
// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
// Use optionsSuccessStatus instead of optionSuccessStatus
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" }); // Removed xxx
});

// Combined Timestamp endpoint
app.get("/api/:date?", (req, res) => {
  // Use /api/:date? as per FCC examples
  const dateString = req.params.date;
  let date;

  // 1. Handle empty date parameter -> current time
  if (!dateString) {
    date = new Date();
  } else {
    // 2. Check if the input is potentially a Unix timestamp (all digits)
    // Use test() method of regex which returns boolean
    if (/^\d+$/.test(dateString)) {
      // Use parseInt with radix 10
      const timestamp = parseInt(dateString, 10);
      date = new Date(timestamp);
    } else {
      // 3. Otherwise, try parsing as a date string
      date = new Date(dateString);
    }
  }

  // 4. Check if the resulting date is valid
  // Use isNaN on getTime() result
  if (isNaN(date.getTime())) {
    // 5. If invalid, return the error JSON
    res.json({ error: "Invalid Date" });
  } else {
    // Inside the 'else' block for a valid date:
    const unixTime = date.getTime();
    const utcTime = date.toUTCString();
    console.log(`Sending response for input: ${req.params.date}`);
    console.log("Unix Timestamp:", unixTime);
    console.log("Type of Unix Timestamp:", typeof unixTime); // <-- Check this log output
    console.log("UTC String:", utcTime);

    res.json({
      unix: unixTime,
      utc: utcTime,
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  // Added default port for local testing
  console.log("Your app is listening on port " + listener.address().port);
});
