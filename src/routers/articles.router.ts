import express from "express";
import {
    getAllArticles,
    getArticleById,
    patchNewVote,
} from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id").get(getArticleById).patch(patchNewVote);

export default articlesRouter;
