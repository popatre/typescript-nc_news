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
import path from "path";
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", apiRouter);

// Configure Express to use EJS
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.all("*", notValidRoute);
app.use(errors400);
app.use(psqlErrors);

export default app;
