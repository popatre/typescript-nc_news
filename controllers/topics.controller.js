const { fetchAllTopics } = require("../models/topics.model");

exports.getAllTopics = async (req, res, next) => {
    try {
        const topics = await fetchAllTopics();
        res.status(200).send({ topics });
    } catch (err) {
        next(err);
    }
};
