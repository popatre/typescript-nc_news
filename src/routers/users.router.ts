import express from "express";
import {
    getAllUsers,
    getUserByUsername,
} from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/:username").get(getUserByUsername);

export default usersRouter;
