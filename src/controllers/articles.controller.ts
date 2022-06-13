import express from "express";
import {
    addNewVoteByArticleId,
    fetchAllArticles,
    fetchArticleById,
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
};

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
    { article_id: string },
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