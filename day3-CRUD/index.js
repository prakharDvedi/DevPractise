const express = require("express");
const app = express();
const tasks = require("./tasks");

app.use(express.json());

app.get("/tasks", (req, res) => {
  const payload = tasks;
  return res.status(200).json(payload);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (tasks[id] != undefined) {
    const payload = tasks[id];
    return res.status(200).json(payload);
  } else {
    return res.status(404);
  }
});

app.post("/tasks", (req, res) => {
  const title = req.body.title;
  if (typeof title !== "string" || title.trim() === "" || title.length > 100) {
    return res.status(400).json({ error: "Invalid title" });
  }
  const lastId = tasks.length ? tasks[tasks.length - 1].id : 0;
  const id = tasks.length ? lastId + 1 : 1;
  const task = { id, title };
  tasks.push(task);
  return res.status(201).json(task);
});

app.put("/tasks/:id", (req, res)=>{
    const title = req.body.title;
    const id = Number(req.body.id)
    if (typeof title !== "string" || title.trim() === "" || title.length > 100) {
    return res.status(400).json({ error: "Invalid title" });
  }
});
app.delete("/tasks/:id", (req, res));

app.listen(3000);
