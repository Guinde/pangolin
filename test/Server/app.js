require("./database/index.js");
const env = require(`./environment/${process.env.NODE_ENV}.js`);
const indexRouter = require("./routes/index.js");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("errorhandler");
const cookieParser = require("cookie-parser");
const { addReqFeatures } = require("./middlewares/jwt.middleware");
const port = env.port;

const app = express();

exports.app = app;

app.use(cookieParser());
app.use("/", morgan("short"));
app.use("/", express.json());
app.use("/", express.urlencoded({ extended: true }));
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};
app.use("/", cors(corsOptions));
app.use("/", addReqFeatures);
app.use("/", indexRouter);

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

app.listen(port);
