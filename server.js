const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
const Dbconnection = require("./app/db/connection");
const appRoute = require("./app/routes/allRoute");
var path = require('path');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

/* Setting Up App Dir and Public Dir */
app.use(express.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, './../public')));

/**morgon logs */
app.use(morgan("dev"));

/**adding cors */
app.use(cors());

/**database connection */
Dbconnection.establishConnection();

app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "token");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

/**initialize routes */
appRoute.initialize(app);

/**server running port */
app.listen(8000, () =>
  console.log(`server is running on port ${8000}`)
);

