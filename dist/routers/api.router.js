"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_controller_1 = require("../controllers/api.controller");
const articles_router_1 = __importDefault(require("./articles.router"));
const comments_router_1 = __importDefault(require("./comments.router"));
const topics_router_1 = __importDefault(require("./topics.router"));
const users_router_1 = __importDefault(require("./users.router"));
const apiRouter = express_1.default.Router();
apiRouter.use("/articles", articles_router_1.default);
apiRouter.use("/topics", topics_router_1.default);
apiRouter.use("/users", users_router_1.default);
apiRouter.use("/comments", comments_router_1.default);
apiRouter.route("/").get(api_controller_1.getAllEndpoints);
exports.default = apiRouter;
