import express from "express";
import { deleteCommentById } from "../controllers/comments.controller";

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(deleteCommentById);

export default commentsRouter;
