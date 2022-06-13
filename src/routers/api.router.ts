import express from "express";
import articlesRouter from "./articles.router";
import commentsRouter from "./comments.router";
import topicsRouter from "./topics.router";
import usersRouter from "./users.router";

const apiRouter = express.Router();

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

export default apiRouter;
