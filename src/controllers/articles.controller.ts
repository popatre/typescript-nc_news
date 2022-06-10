import express from "express";
import { fetchAllArticles } from "../model/articles.model";

export type Articles = {
    title: string;
    topic: string;
    author: string;
    body: string;
    created_at: Date;
    votes: number;
};

export const getAllArticles: express.RequestHandler<
    {},
    { articles: Articles }
> = (req, res) => {
    fetchAllArticles().then((articles) => {
        res.status(200).send({ articles });
    });
};
