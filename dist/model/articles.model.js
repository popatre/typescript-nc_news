"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewArticle = exports.removeArticleById = exports.fetchCommentsById = exports.addCommentByArticleId = exports.addNewVoteByArticleId = exports.fetchArticleById = exports.fetchAllArticlesAlt = exports.fetchAllArticles = exports.countArticles = void 0;
const index_1 = __importDefault(require("../db/index"));
const utils_1 = require("../utils/utils");
const countArticles = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    let queryStr = `SELECT COUNT('*') FROM articles `;
    const queryParams = [];
    if (topic) {
        queryStr += `WHERE articles.topic ILIKE $1`;
        queryParams.push(topic);
    }
    const count = yield index_1.default
        .query(queryStr, queryParams)
        .then((result) => Number(result.rows[0].count));
    return count;
});
exports.countArticles = countArticles;
const fetchAllArticles = (sort_by = "created_at", order = "DESC", topic, limit = 10, p = 1) => {
    const sortGreenList = [
        "title",
        "topic",
        "author",
        "body",
        "created_at",
        "votes",
        "comment_count",
    ];
    const orderGreenList = ["ASC", "asc", "DESC", "desc"];
    const validSort = (0, utils_1.checkIsValidQuery)(sortGreenList, sort_by);
    const validOrder = (0, utils_1.checkIsValidQuery)(orderGreenList, order);
    const validTopics = (0, utils_1.getValidTopics)();
    let queryStr = `SELECT articles.*, COUNT(comments.article_id)::int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;
    const filterArr = [];
    return Promise.all([validTopics, validSort, validOrder])
        .then(([greenListTopics]) => {
        if (topic) {
            if (!greenListTopics.includes(topic)) {
                return Promise.reject({
                    status: 404,
                    msg: "topic not found",
                });
            }
            else {
                queryStr += `WHERE topic = $1 `;
                filterArr.push(topic);
            }
        }
        queryStr += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;
        return index_1.default.query(queryStr, filterArr);
    })
        .then((response) => {
        return response.rows;
    });
};
exports.fetchAllArticles = fetchAllArticles;
/**
 *
 * With promise.all in controller */
const fetchAllArticlesAlt = (sort_by = "created_at", order = "DESC", topic, limit = 12, p = 1) => {
    const sortGreenList = [
        "title",
        "topic",
        "author",
        "body",
        "created_at",
        "votes",
        "comment_count",
    ];
    if (isNaN(limit) || isNaN(p)) {
        return Promise.reject({
            status: 400,
            msg: "Limit and/or p must be a number",
        });
    }
    const offset = (+p - 1) * limit;
    const orderGreenList = ["ASC", "asc", "DESC", "desc"];
    const validSort = (0, utils_1.checkIsValidQuery)(sortGreenList, sort_by);
    const validOrder = (0, utils_1.checkIsValidQuery)(orderGreenList, order);
    let queryStr = `SELECT articles.*, COUNT (comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id `;
    const filterArr = [];
    return Promise.all([validSort, validOrder])
        .then(() => {
        if (topic) {
            queryStr += `WHERE topic = $1 `;
            filterArr.push(topic);
        }
        queryStr += `GROUP BY articles.article_id 
            ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${offset}  `;
        return index_1.default.query(queryStr, filterArr);
    })
        .then((response) => {
        return response.rows;
    });
};
exports.fetchAllArticlesAlt = fetchAllArticlesAlt;
/**
 *
 * With promise.all in controller */
const fetchArticleById = (article_id) => {
    return index_1.default
        .query(`SELECT articles.*, COUNT(comments.article_id)::int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`, [article_id])
        .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404,
                msg: "Article not found",
            });
        }
        return rows[0];
    });
};
exports.fetchArticleById = fetchArticleById;
const addNewVoteByArticleId = (articleId, votes) => {
    if (votes == null) {
        return Promise.reject({ status: 400, msg: "Missing object keys" });
    }
    return index_1.default
        .query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`, [votes, articleId])
        .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404,
                msg: "Article not found",
            });
        }
        return rows[0];
    });
};
exports.addNewVoteByArticleId = addNewVoteByArticleId;
const addCommentByArticleId = (articleId, body, username) => {
    if (body == null || username == null) {
        return Promise.reject({ status: 400, msg: "Missing post body keys" });
    }
    if (typeof body !== "string" || typeof username !== "string") {
        return Promise.reject({
            status: 400,
            msg: "Post values must be strings",
        });
    }
    return index_1.default
        .query(`INSERT INTO comments(body, author, article_id) VALUES ($1, $2, $3) RETURNING *`, [body, username, articleId])
        .then(({ rows }) => {
        return rows[0];
    });
};
exports.addCommentByArticleId = addCommentByArticleId;
/* Method without promise.all */
// export const fetchCommentsById: (articleId: number) => Promise<Comment[]> = (
//     articleId
// ) => {
//     return db
//         .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
//         .then(({ rows }: { rows: [] }) => {
//             if (!rows.length) {
//                 return Promise.reject({
//                     status: 404,
//                     msg: "Article not found",
//                 });
//             } else {
//                 return db.query(
//                     `SELECT * from comments WHERE article_id = $1`,
//                     [articleId]
//                 );
//             }
//         })
//         .then(({ rows }: { rows: Comment[] }) => {
//             return rows;
//         });
// };
const fetchCommentsById = (articleId, limit = 10, p = 1) => {
    if (isNaN(limit) || isNaN(p)) {
        return Promise.reject({
            status: 400,
            msg: "Limit and/or p must be a number",
        });
    }
    const offset = (p - 1) * limit;
    return index_1.default
        .query(`SELECT * from comments WHERE article_id = $1 LIMIT ${limit} OFFSET ${offset}`, [articleId])
        .then(({ rows }) => {
        return rows;
    });
};
exports.fetchCommentsById = fetchCommentsById;
const removeArticleById = (articleId) => {
    return index_1.default
        .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
        .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404,
                msg: "Article id not found",
            });
        }
        return index_1.default.query(`DELETE FROM articles WHERE article_id = $1`, [
            articleId,
        ]);
    });
};
exports.removeArticleById = removeArticleById;
const addNewArticle = (author, title, body, topic) => {
    if (typeof author !== "string" ||
        typeof title !== "string" ||
        typeof body !== "string" ||
        typeof topic !== "string") {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return index_1.default
        .query(`INSERT INTO articles(author, title, body, topic) VALUES($1, $2, $3, $4) RETURNING *`, [author, title, body, topic])
        .then(({ rows }) => {
        rows[0].comment_count = 0;
        return rows[0];
    });
};
exports.addNewArticle = addNewArticle;
