import express from "express";
import { removeCommentById } from "../model/comments.model";

export const deleteCommentById: express.RequestHandler<{
    comment_id: string;
}> = (req, res, next) => {
    const { comment_id } = req.params;
    removeCommentById(comment_id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next);
};
