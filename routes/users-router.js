const express = require("express");
const { getAllUsernames } = require("../controllers/users.controller");
const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsernames);

module.exports = usersRouter;
