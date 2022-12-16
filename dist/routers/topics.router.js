"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topics_controller_1 = require("../controllers/topics.controller");
const topicsRouter = express_1.default.Router();
topicsRouter.route("/").get(topics_controller_1.getAllTopics).post(topics_controller_1.postNewTopic);
exports.default = topicsRouter;
