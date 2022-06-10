import express from "express";
import { getAllArticles } from "./controllers/articles.controller";
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/articles", getAllArticles);

export default app;
