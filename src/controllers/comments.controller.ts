import express from "express";
import {
    removeCommentById,
    updateNewCommentVotes,
} from "../model/comments.model";

export type Comment = {
    body: string;
    votes: number;
    author: string;
    article_id: number;
    created_at: Date;
    comment_id: number;
};

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

export const patchNewCommentVotes: express.RequestHandler<
    { comment_id: number },
    { comment: Comment },
    { inc_votes: number }
> = (req, res, next) => {
    const { inc_votes } = req.body;
    const { comment_id } = req.params;
    updateNewCommentVotes(comment_id, inc_votes).then((comment) => {
        res.status(200).send({ comment });
    });
};
