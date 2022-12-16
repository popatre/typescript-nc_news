"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewTopic = exports.getAllTopics = void 0;
const topics_model_1 = require("../model/topics.model");
const getAllTopics = (req, res) => {
    (0, topics_model_1.fetchAllTopics)().then((topics) => {
        res.status(200).send({ topics });
    });
};
exports.getAllTopics = getAllTopics;
const postNewTopic = (req, res, next) => {
    const { description, slug } = req.body;
    (0, topics_model_1.addNewTopic)(description, slug)
        .then((topic) => {
        res.status(201).send({ topic });
    })
        .catch(next);
};
exports.postNewTopic = postNewTopic;
