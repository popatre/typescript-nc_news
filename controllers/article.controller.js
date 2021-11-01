const { fetchArticleById } = require("../models/articles.model");

exports.getArticleById = async (req, res, next) => {
    const { article_id } = req.params;
    console.log(article_id);
    try {
        const article = await fetchArticleById(article_id);
        res.status(200).send({ article });
    } catch (err) {
        next(err);
    }
};
