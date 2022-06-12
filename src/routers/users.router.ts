import express from "express";
import { getAllUsers } from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);

export default usersRouter;
