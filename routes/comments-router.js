const express = require("express");
const {
    deleteByCommentId,
    getAllComments,
} = require("../controllers/comments.controller");
const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(deleteByCommentId);
commentsRouter.route("/").get(getAllComments);

module.exports = commentsRouter;
