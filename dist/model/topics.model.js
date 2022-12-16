"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewTopic = exports.fetchAllTopics = void 0;
const index_1 = __importDefault(require("../db/index"));
const fetchAllTopics = () => {
    return index_1.default
        .query(`SELECT * FROM topics;`)
        .then(({ rows }) => {
        return rows;
    });
};
exports.fetchAllTopics = fetchAllTopics;
const addNewTopic = (description, slug) => {
    if (typeof description !== "string" || typeof slug !== "string") {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return index_1.default
        .query("INSERT INTO topics(description, slug) VALUES ($1, $2) RETURNING *", [description, slug])
        .then(({ rows }) => {
        return rows[0];
    });
};
exports.addNewTopic = addNewTopic;
