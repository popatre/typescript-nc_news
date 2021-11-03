const express = require("express");
const {
    getAllUsernames,
    getUsernameByName,
} = require("../controllers/users.controller");
const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsernames);
usersRouter.route("/:username").get(getUsernameByName);

module.exports = usersRouter;
