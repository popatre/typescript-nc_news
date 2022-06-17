import express from "express";
import { getAllTopics, postNewTopic } from "../controllers/topics.controller";

const topicsRouter = express.Router();

topicsRouter.route("/").get(getAllTopics).post(postNewTopic);

export default topicsRouter;
