"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserByUsername = exports.fetchAllUsers = void 0;
const index_1 = __importDefault(require("../db/index"));
const fetchAllUsers = () => {
    return index_1.default
        .query(`SELECT * from users`)
        .then(({ rows }) => {
        return rows;
    });
};
exports.fetchAllUsers = fetchAllUsers;
const fetchUserByUsername = (username) => {
    return index_1.default
        .query(`SELECT * from users WHERE username = $1 `, [username])
        .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404,
                msg: "Username not found",
            });
        }
        return rows[0];
    });
};
exports.fetchUserByUsername = fetchUserByUsername;
