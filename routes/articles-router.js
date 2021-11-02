const express = require("express");
const {
    getArticleById,
    updateVotesById,
    getAllArticles,
} = require("../controllers/article.controller");
const articleRouter = express.Router();

articleRouter.route("/:article_id").get(getArticleById).patch(updateVotesById);
articleRouter.route("/").get(getAllArticles);

module.exports = articleRouter;
