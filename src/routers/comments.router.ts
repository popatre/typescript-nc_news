import express from "express";
import {
    deleteCommentById,
    patchNewCommentVotes,
} from "../controllers/comments.controller";

const commentsRouter = express.Router();

commentsRouter
    .route("/:comment_id")
    .delete(deleteCommentById)
    .patch(patchNewCommentVotes);

export default commentsRouter;
