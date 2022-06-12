import express from "express";
import { getAllArticles } from "./controllers/articles.controller";
import { errors400, notValidRoute } from "./controllers/errors.controller";
import apiRouter from "./routers/api.router";
const app = express();
const cors = require("cors");
app.use(cors());

app.use("/api", apiRouter);

app.all("*", notValidRoute);
app.use(errors400);

export default app;
