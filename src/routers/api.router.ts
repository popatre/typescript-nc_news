import express from "express";
import articlesRouter from "./articles.router";

const apiRouter = express.Router();

apiRouter.use("/articles", articlesRouter);

export default apiRouter;
