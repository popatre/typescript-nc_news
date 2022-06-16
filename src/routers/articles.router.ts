import express from "express";
import {
    deleteArticleById,
    getAllArticles,
    getArticleById,
    getCommentsById,
    patchNewVote,
    postCommentByArticleId,
} from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/").get(getAllArticles);
articlesRouter
    .route("/:article_id")
    .get(getArticleById)
    .patch(patchNewVote)
    .delete(deleteArticleById);
articlesRouter
    .route("/:article_id/comments")
    .post(postCommentByArticleId)
    .get(getCommentsById);

export default articlesRouter;
