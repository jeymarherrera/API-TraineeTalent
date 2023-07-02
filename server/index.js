const express = require("express");
const cookieParser = require("cookie-parser");
const { router } = require("./routes/index");
const server = express();

const cors = require("cors");

server.use(express.json());
server.use(cookieParser());


server.use(cors({ origin: true, credentials: true }));
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Witd, Content-Type, Accept, Json"
  );
  next();
});

server.use(router);
server.use("/public", express.static(__dirname + "/public"));

module.exports = { server };
