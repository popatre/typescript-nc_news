const {
    removeCommentById,
    fetchAllComments,
} = require("../models/comments.model");

exports.deleteByCommentId = async (req, res, next) => {
    const { comment_id } = req.params;
    const deleted = await removeCommentById(comment_id);
    res.sendStatus(204);
};

exports.getAllComments = async (req, res, next) => {
    const comments = await fetchAllComments();
    res.status(200).send({ comments });
};
