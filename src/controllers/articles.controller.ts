import express from "express";
import { fetchAllArticles, fetchArticleById } from "../model/articles.model";
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
> = (req, res) => {
    const { article_id } = req.params;
    fetchArticleById(article_id).then((article) => {
        res.status(200).send({ article });
    });
};
