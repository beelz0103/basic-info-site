const express = require("express");
const app = express();
const port = 8080;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/about.html");
});

app.get("/contactme", function (req, res) {
  res.sendFile(__dirname + "/contactme.html");
});

app.use(function (req, res) {
  res.sendFile(__dirname + "/error.html");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
