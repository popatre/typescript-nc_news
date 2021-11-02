const {
    fetchArticleById,
    incrementVotesByID,
    incrementVotesById,
    fetchAllArticles,
    fetchArticleCommentsById,
    addCommentById,
} = require("../models/articles.model");

exports.getArticleById = async (req, res, next) => {
    const { article_id } = req.params;

    try {
        const article = await fetchArticleById(article_id);
        res.status(200).send({ article });
    } catch (err) {
        next(err);
    }
};

exports.getAllArticles = async (req, res, next) => {
    const { sort_by, order, topic } = req.query;
    try {
        const articles = await fetchAllArticles(sort_by, order, topic);
        res.status(200).send({ articles });
    } catch (err) {
        next(err);
    }
};

exports.updateVotesById = async (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    try {
        const article = await incrementVotesById(article_id, inc_votes);
        res.status(201).send({ article });
    } catch (err) {
        next(err);
    }
};

exports.getArticleCommentsById = async (req, res, next) => {
    const { article_id } = req.params;
    try {
        const comments = await fetchArticleCommentsById(article_id);
        res.status(200).send({ comments });
    } catch (err) {
        next(err);
    }
};

exports.postCommentById = async (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
    const comment = await addCommentById(article_id, username, body);
    res.status(201).send({ comment });
};
