const express = require("express");
const app = express();

app.use(express.json());
app.get("/healthcheck", (req, res) => {
  const payload = {status:"ok" , uptime:process.uptime()}
  return res.status(200).json(payload);
});

app.post("/echo", (req, res) => {
  const payload = req.body
  return res.status(200).json(payload);
});

app.listen(3000);
