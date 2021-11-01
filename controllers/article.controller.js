const {
    fetchArticleById,
    incrementVotesByID,
    incrementVotesById,
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
