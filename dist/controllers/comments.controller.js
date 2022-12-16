"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchNewCommentVotes = exports.deleteCommentById = void 0;
const comments_model_1 = require("../model/comments.model");
const deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    (0, comments_model_1.removeCommentById)(comment_id)
        .then(() => {
        res.sendStatus(204);
    })
        .catch(next);
};
exports.deleteCommentById = deleteCommentById;
const patchNewCommentVotes = (req, res, next) => {
    const { inc_votes } = req.body;
    const { comment_id } = req.params;
    (0, comments_model_1.updateNewCommentVotes)(comment_id, inc_votes)
        .then((comment) => {
        res.status(200).send({ comment });
    })
        .catch(next);
};
exports.patchNewCommentVotes = patchNewCommentVotes;
