import express from "express";
import { fetchAllUsers } from "../model/users.model";

export type User = {
    username: string;
    name: string;
    avatar_url: string;
};

export const getAllUsers: express.RequestHandler<{}, { users: User[] }> = (
    _req,
    res
) => {
    fetchAllUsers().then((users) => {
        res.status(200).send({ users });
    });
};
