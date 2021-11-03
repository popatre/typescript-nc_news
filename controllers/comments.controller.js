const {
    removeCommentById,
    fetchAllComments,
    addVotesByCommentId,
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

exports.updateVotesByCommentId = async (req, res, next) => {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;

    addVotesByCommentId(comment_id, inc_votes)
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch(next);
};
