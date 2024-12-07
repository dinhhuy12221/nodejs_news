const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
var path = require("path");
var fs = require("fs");

const route = require("./routes");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../log/access.log"),
  {
    flags: "a",
  }
);

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

// Routes init
route(app);

app.listen(port, () =>
  console.log(`Example app listening at localhost:${port}`)
);
