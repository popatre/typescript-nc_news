import { Article, Comment } from "../controllers/articles.controller";
import db from "../db/index";

export const fetchAllArticles: () => Promise<Article[]> = () => {
    return db
        .query(
            "SELECT articles.*, COUNT(comments.article_id)::int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;"
        )
        .then((response: { rows: Article[] }) => {
            return response.rows;
        });
};

export const fetchArticleById: (article_id: number) => Promise<Article> = (
    article_id
) => {
    return db
        .query(
            `SELECT articles.*, COUNT(comments.article_id)::int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
            [article_id]
        )
        .then(({ rows }: { rows: Article[] }) => {
            if (!rows.length) {
                return Promise.reject({
                    status: 404,
                    msg: "Article not found",
                });
            }
            return rows[0];
        });
};

export const addNewVoteByArticleId: (
    articleId: string,
    votes: number
) => Promise<Article> = (articleId, votes) => {
    if (votes == null) {
        return Promise.reject({ status: 400, msg: "Missing object keys" });
    }

    return db
        .query(
            `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
            [votes, articleId]
        )
        .then(({ rows }: { rows: Article[] }) => {
            if (!rows.length) {
                return Promise.reject({
                    status: 404,
                    msg: "Article not found",
                });
            }
            return rows[0];
        });
};

export const addCommentByArticleId: (
    article_id: number,
    username: string,
    body: string
) => Promise<Comment> = (articleId, body, username) => {
    if (body == null || username == null) {
        return Promise.reject({ status: 400, msg: "Missing post body keys" });
    }

    if (typeof body !== "string" || typeof username !== "string") {
        return Promise.reject({
            status: 400,
            msg: "Post values must be strings",
        });
    }

    return db
        .query(
            `INSERT INTO comments(body, author, article_id) VALUES ($1, $2, $3) RETURNING *`,
            [body, username, articleId]
        )
        .then(({ rows }: { rows: Comment[] }) => {
            return rows[0];
        });
};

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

export const fetchCommentsById: (articleId: number) => Promise<Comment[]> = (
    articleId
) => {
    return db
        .query(`SELECT * from comments WHERE article_id = $1`, [articleId])

        .then(({ rows }: { rows: Comment[] }) => {
            return rows;
        });
};
