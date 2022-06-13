import express from "express";
import { getAllArticles } from "./controllers/articles.controller";
import {
    errors400,
    notValidRoute,
    psqlErrors,
} from "./controllers/errors.controller";
import apiRouter from "./routers/api.router";
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.all("*", notValidRoute);
app.use(errors400);
app.use(psqlErrors);

export default app;