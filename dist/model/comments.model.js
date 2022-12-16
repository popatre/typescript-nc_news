"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNewCommentVotes = exports.removeCommentById = void 0;
const index_1 = __importDefault(require("../db/index"));
const removeCommentById = (commentId) => {
    return index_1.default
        .query(`SELECT * FROM comments WHERE comment_id = $1`, [commentId])
        .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Id not found" });
        }
        else {
            return index_1.default.query(`DELETE FROM comments WHERE comment_id = $1`, [
                commentId,
            ]);
        }
    });
};
exports.removeCommentById = removeCommentById;
const updateNewCommentVotes = (commentId, voteNumber) => {
    if (typeof voteNumber !== "number") {
        return Promise.reject({
            status: 400,
            msg: "Bad data type and/or missing keys",
        });
    }
    return index_1.default
        .query(`UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`, [voteNumber, commentId])
        .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404,
                msg: "Comment not found",
            });
        }
        return rows[0];
    });
};
exports.updateNewCommentVotes = updateNewCommentVotes;
