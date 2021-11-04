const express = require("express");
const {
    getArticleById,
    updateVotesById,
    getAllArticles,
    getArticleCommentsById,
    postCommentById,
    deleteArticleById,
    postNewArticles,
} = require("../controllers/article.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const articleRouter = express.Router();

articleRouter
    .route("/:article_id")
    .get(getArticleById)
    .patch(updateVotesById)
    .delete(deleteArticleById);
articleRouter.route("/:article_id/comments").get(getArticleCommentsById);
articleRouter.route("/:article_id/comments").post(postCommentById);
articleRouter
    .route("/")
    .get(getAllArticles)
    .post(postNewArticles)
    .all(methodNotAllowed);

module.exports = articleRouter;
