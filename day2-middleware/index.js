const express = require("express");
const middleware = require("./middleware/middleware");
const errorHandler = require("./middleware/error");
const app = express();

app.use(express.json());
app.use(middleware);

app.get("/healthcheck", (req, res) => {
  const payload = { status: "ok", uptime: process.uptime() };
  return res.status(200).json(payload);
});

app.post("/echo", (req, res) => {
  const payload = req.body;
  return res.status(200).json(payload);
});

app.get("/error", (req, res, next) => {
  next(new Error("forced error"));
});

app.use(errorHandler);
app.listen(3000);


// app.use Vs app.get
// app.use runs for every method, does not care about headers and used in middleware
// app.get runs specifically for get request and for particular route handling
// next is a middleware parameter that is passed and handles controls over to the next middleware function
// if next isnt pasnt req will eventually time out into a hang state