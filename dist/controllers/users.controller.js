"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.getAllUsers = void 0;
const users_model_1 = require("../model/users.model");
const getAllUsers = (_req, res) => {
    (0, users_model_1.fetchAllUsers)().then((users) => {
        res.status(200).send({ users });
    });
};
exports.getAllUsers = getAllUsers;
const getUserByUsername = (req, res, next) => {
    const { username } = req.params;
    (0, users_model_1.fetchUserByUsername)(username)
        .then((user) => {
        res.status(200).send({ user });
    })
        .catch(next);
};
exports.getUserByUsername = getUserByUsername;
