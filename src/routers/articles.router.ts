import express from "express";
import {
    getAllArticles,
    getArticleById,
} from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id").get(getArticleById);

export default articlesRouter;
