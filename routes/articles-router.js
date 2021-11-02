const express = require("express");
const {
    getArticleById,
    updateVotesById,
    getAllArticles,
    getArticleCommentsById,
    postCommentById,
} = require("../controllers/article.controller");
const articleRouter = express.Router();

articleRouter.route("/:article_id").get(getArticleById).patch(updateVotesById);
articleRouter.route("/:article_id/comments").get(getArticleCommentsById);
articleRouter.route("/:article_id/comments").post(postCommentById);
articleRouter.route("/").get(getAllArticles);

module.exports = articleRouter;
