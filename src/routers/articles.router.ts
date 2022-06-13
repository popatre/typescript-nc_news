import express from "express";
import {
    getAllArticles,
    getArticleById,
    patchNewVote,
    postCommentByArticleId,
} from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id").get(getArticleById).patch(patchNewVote);
articlesRouter.route("/:article_id/comments").post(postCommentByArticleId);

export default articlesRouter;
