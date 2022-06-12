import express from "express";
import { fetchAllUsers, fetchUserByUsername } from "../model/users.model";

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

export const getUserByUsername: express.RequestHandler<
    { username: string },
    { user: User }
> = (req, res, next) => {
    const { username } = req.params;
    fetchUserByUsername(username)
        .then((user) => {
            res.status(200).send({ user });
        })
        .catch(next);
};
