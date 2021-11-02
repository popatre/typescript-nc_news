const {
    removeCommentById,
    fetchAllComments,
} = require("../models/comments.model");

exports.deleteByCommentId = async (req, res, next) => {
    const { comment_id } = req.params;
    try {
        const deleted = await removeCommentById(comment_id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await fetchAllComments();
        res.status(200).send({ comments });
    } catch (err) {
        next(err);
    }
};
