import express from "express";
import { getAllArticles } from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/").get(getAllArticles);

export default articlesRouter;
