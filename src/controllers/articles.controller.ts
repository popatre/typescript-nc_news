import express from "express";
import {
    addCommentByArticleId,
    addNewVoteByArticleId,
    fetchAllArticles,
    fetchArticleById,
    fetchCommentsById,
} from "../model/articles.model";
import { Request, Response } from "express";

export type Article = {
    title: string;
    topic: string;
    author: string;
    body: string;
    created_at: Date;
    votes: number;
    comment_count: number;
    article_id: number;
};

export type Comment = Omit<Article, "topic" | "title" | "comment_count">;

export const getAllArticles: express.RequestHandler<
    Request,
    { articles: Article[] }
> = (_req, res) => {
    fetchAllArticles().then((articles) => {
        const articleResults = articles;
        res.status(200).send({ articles: articleResults });
    });
};

export const getArticleById: express.RequestHandler<
    { article_id: number },
    { article: Article }
> = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleById(article_id)
        .then((article) => {
            res.status(200).send({ article });
        })
        .catch(next);
};

export const patchNewVote: express.RequestHandler<
    { article_id: string },
    { article: Article },
    { inc_votes: number }
> = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    addNewVoteByArticleId(article_id, inc_votes)
        .then((article) => {
            res.status(200).send({ article });
        })
        .catch(next);
};

export const postCommentByArticleId: express.RequestHandler<
    { article_id: number },
    { comment: Comment },
    { username: string; body: string }
> = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
    addCommentByArticleId(article_id, body, username)
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch(next);
};

export const getCommentsById: express.RequestHandler<
    { article_id: number },
    { comments: Comment[] }
> = (req, res, next) => {
    const { article_id } = req.params;

    const checkArticleIdExists = fetchArticleById(article_id);

    Promise.all([checkArticleIdExists, fetchCommentsById(article_id)])
        .then(([_article, comments]) => {
            res.status(200).send({ comments });
        })
        .catch(next);
};
