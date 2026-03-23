const express = require("express");
const { default: middleware } = require("./middleware");
const app = express();


app.use(express.json());
app.use(middleware)

app.get("/healthcheck", (req, res) => {
  const payload = {status:"ok" , uptime:process.uptime()}
  return res.status(200).json(payload);
});

app.get('/error' , (req,res,next)=>{
  next(new Error("forced error"))
})

app.post("/echo", (req, res) => {
  const payload = req.body
  return res.status(200).json(payload);
});

app.listen(3000);
