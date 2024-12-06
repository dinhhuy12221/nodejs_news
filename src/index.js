const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
var path = require("path");
var fs = require("fs");

const app = express();
const port = 3000;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../log/access.log"),
  {
    flags: "a",
  }
);

app.use(express.static(path.join(__dirname, "public")));

// HTTP request logger
app.use(morgan("combined", { stream: accessLogStream }));

// Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => res.render("news"));

app.listen(port, () =>
  console.log(`Example app listening at localhost:${port}`)
);
