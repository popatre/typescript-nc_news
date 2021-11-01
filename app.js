const express = require("express");
const app = express();
const path = require("path");
const apiRouter = require("./routes/api-router");

const { notARoute, errors400 } = require("./controllers/errors.controller");

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", notARoute);

app.use(errors400);
module.exports = app;
