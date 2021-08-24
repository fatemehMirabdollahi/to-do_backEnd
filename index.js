const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const task = require("./routes/task");
const list = require("./routes/list");

app.use("/tasks", task);
app.use("/lists", list);

module.exports = app;
