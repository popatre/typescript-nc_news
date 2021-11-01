const express = require("express");
const {
    getArticleById,
    updateVotesById,
} = require("../controllers/article.controller");
const articleRouter = express.Router();

articleRouter.route("/:article_id").get(getArticleById).patch(updateVotesById);

module.exports = articleRouter;
