const express = require("express");
const app = express();
const path = require("path");
const apiRouter = require("./routes/api-router");

const { notARoute } = require("./controllers/errors.controller");

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", notARoute);

module.exports = app;
