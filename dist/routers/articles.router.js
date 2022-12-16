"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articles_controller_1 = require("../controllers/articles.controller");
const articlesRouter = express_1.default.Router();
articlesRouter.route("/").get(articles_controller_1.getAllArticles).post(articles_controller_1.postNewArticle);
articlesRouter
    .route("/:article_id")
    .get(articles_controller_1.getArticleById)
    .patch(articles_controller_1.patchNewVote)
    .delete(articles_controller_1.deleteArticleById);
articlesRouter
    .route("/:article_id/comments")
    .post(articles_controller_1.postCommentByArticleId)
    .get(articles_controller_1.getCommentsById);
exports.default = articlesRouter;
