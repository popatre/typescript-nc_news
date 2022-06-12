import express from "express";
import { fetchAllArticles } from "../model/articles.model";
import { Request, Response } from "express";
export type Articles = {
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
    { articles: Articles[] }
> = (_req, res) => {
    fetchAllArticles().then((articles) => {
        const articleResults = articles;
        res.status(200).send({ articles: articleResults });
    });
};
