const express = require("express");
const articleRouter = require("./articles-router");
const topicsRouter = require("./topics-router");
const apiRouter = express.Router();

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
