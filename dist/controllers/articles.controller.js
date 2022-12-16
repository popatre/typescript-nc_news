"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewArticle = exports.deleteArticleById = exports.getCommentsById = exports.postCommentByArticleId = exports.patchNewVote = exports.getArticleById = exports.getAllArticles = void 0;
const articles_model_1 = require("../model/articles.model");
const utils_1 = require("../utils/utils");
const getAllArticles = (req, res, next) => {
    const { sort_by, order, topic, limit, p } = req.query;
    // fetchAllArticles(sort_by, order, topic, limit, p)
    //     .then((articles) => {
    //         const articleResults = articles;
    //         res.status(200).send({ articles: articleResults });
    //     })
    //     .catch(next);
    const promiseArr = [];
    const allArticles = (0, articles_model_1.fetchAllArticlesAlt)(sort_by, order, topic, limit, p);
    if (topic) {
        const checkTopicExists = (0, utils_1.checkIfExists)("topics", "slug", topic, "topic not found");
        promiseArr.push(allArticles, checkTopicExists);
    }
    else {
        promiseArr.push(allArticles);
    }
    return Promise.all(promiseArr)
        .then(([articles]) => {
        res.status(200).send({ articles });
    })
        .catch((err) => {
        console.log(err);
        next(err);
    });
};
exports.getAllArticles = getAllArticles;
const getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    (0, articles_model_1.fetchArticleById)(article_id)
        .then((article) => {
        res.status(200).send({ article });
    })
        .catch(next);
};
exports.getArticleById = getArticleById;
const patchNewVote = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    (0, articles_model_1.addNewVoteByArticleId)(article_id, inc_votes)
        .then((article) => {
        res.status(200).send({ article });
    })
        .catch(next);
};
exports.patchNewVote = patchNewVote;
const postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
    (0, articles_model_1.addCommentByArticleId)(article_id, body, username)
        .then((comment) => {
        res.status(201).send({ comment });
    })
        .catch(next);
};
exports.postCommentByArticleId = postCommentByArticleId;
const getCommentsById = (req, res, next) => {
    const { article_id } = req.params;
    const { limit, p } = req.query;
    const checkArticleIdExists = (0, articles_model_1.fetchArticleById)(article_id);
    Promise.all([checkArticleIdExists, (0, articles_model_1.fetchCommentsById)(article_id, limit, p)])
        .then(([_article, comments]) => {
        res.status(200).send({ comments });
    })
        .catch(next);
};
exports.getCommentsById = getCommentsById;
const deleteArticleById = (req, res, next) => {
    const { article_id } = req.params;
    (0, articles_model_1.removeArticleById)(article_id)
        .then(() => {
        res.sendStatus(204);
    })
        .catch(next);
};
exports.deleteArticleById = deleteArticleById;
const postNewArticle = (req, res, next) => {
    const { author, title, body, topic } = req.body;
    const isValidUsername = (0, utils_1.checkIfExists)("users", "username", author, "Username not found");
    const isValidTopic = (0, utils_1.checkIfExists)("topics", "slug", topic, "Topic not found");
    const addArticle = (0, articles_model_1.addNewArticle)(author, title, body, topic);
    Promise.all([addArticle, isValidUsername, isValidTopic])
        .then(([article]) => {
        res.status(201).send({ article });
    })
        .catch(next);
};
exports.postNewArticle = postNewArticle;
