var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", function (req, res) {
  const date = new Date();
  const utc = date.toUTCString();
  return res.json({ "unix": date.getTime(), "utc": utc });
});

app.get("/api/:date", function (req, res) {
  try {
    if (Number(req.params.date)) {
      const unixDate = parseInt(req.params.date);
      const date = new Date(unixDate);
      const utc = date.toUTCString();
      return res.json({ "unix": unixDate, "utc": utc });
    }
    else if (Date.parse(req.params.date)) {
      const date = new Date(req.params.date);
      const utc = date.toUTCString();
      return res.json({ "unix": date.getTime(), "utc": utc });
    }
    return res.json({ error: "Invalid Date" });
  } catch (e) {
    return res.json({ error: "Invalid Date" });
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
