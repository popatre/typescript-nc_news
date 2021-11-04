const express = require("express");
const {
    getAllTopics,
    postNewTopic,
} = require("../controllers/topics.controller");
const topicsRouter = express.Router();

topicsRouter.route("/").get(getAllTopics).post(postNewTopic);

module.exports = topicsRouter;
