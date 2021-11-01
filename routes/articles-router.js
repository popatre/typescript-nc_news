const express = require("express");
const { getArticleById } = require("../controllers/article.controller");
const articleRouter = express.Router();

articleRouter.route("/:article_id").get(getArticleById);

module.exports = articleRouter;
