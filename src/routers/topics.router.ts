import express from "express";
import { getAllTopics } from "../controllers/topics.controller";

const topicsRouter = express.Router();

topicsRouter.route("/").get(getAllTopics);

export default topicsRouter;
