const {
    fetchArticleById,
    incrementVotesByID,
    incrementVotesById,
    fetchAllArticles,
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
    try {
        const articles = await fetchAllArticles();
        res.status(200).send(articles);
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
