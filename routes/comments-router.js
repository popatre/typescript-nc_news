const express = require("express");
const {
    deleteByCommentId,
    getAllComments,
    updateVotesByCommentId,
} = require("../controllers/comments.controller");
const commentsRouter = express.Router();

commentsRouter
    .route("/:comment_id")
    .delete(deleteByCommentId)
    .patch(updateVotesByCommentId);
commentsRouter.route("/").get(getAllComments);

module.exports = commentsRouter;
