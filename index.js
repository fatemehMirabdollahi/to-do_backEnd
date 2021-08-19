const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const task = require("./routes/task");

app.use("/tasks", task);

module.exports = app;
