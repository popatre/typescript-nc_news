import express from "express";
import { addNewTopic, fetchAllTopics } from "../model/topics.model";

export type Topics = {
    description: string;
    slug: string;
};

export const getAllTopics: express.RequestHandler<{}, { topics: Topics[] }> = (
    req,
    res
) => {
    fetchAllTopics().then((topics) => {
        res.status(200).send({ topics });
    });
};

export const postNewTopic: express.RequestHandler<
    {},
    { topic: Topics },
    { description: string; slug: string }
> = (req, res, next) => {
    const { description, slug } = req.body;
    addNewTopic(description, slug).then((topic) => {
        res.status(201).send({ topic });
    });
};
