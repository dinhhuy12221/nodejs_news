const express = require("express");
const app = express();
const port = 3000;

app.get("/tin-tuc", (req, res) => res.send("<h1>News</h1>"));

app.get("/", (req, res) => {
  var a = 1;
  var b = 2;
  var c = a - b;
  res.send("<h1>Hello world</h1>");
});

app.listen(port, () =>
  console.log(`Example app listening at localhost:${port}`)
);
