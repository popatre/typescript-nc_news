import express from "express";
import articlesRouter from "./articles.router";
import topicsRouter from "./topics.router";

const apiRouter = express.Router();

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);

export default apiRouter;
