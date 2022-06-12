import express from "express";
import { fetchAllTopics } from "../model/topics.model";

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
