var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./client/mongo");

var securityMiddleware = require("./middlewares/security");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(securityMiddleware.checkJWT);

//routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
