const db = require("../db");

exports.fetchArticleById = async (id) => {
    const { rows } = await db.query(
        `SELECT articles.*, COUNT(comments.article_id) AS comment_count
        FROM articles 
        LEFT JOIN comments
        ON articles.article_id = comments.article_id 
        WHERE articles.article_id = $1
        GROUP BY articles.article_id
        ;`,
        [id]
    );
    if (rows.length === 0) {
        return Promise.reject({ status: "400", msg: "invalid request" });
    }
    return rows[0];
};

exports.fetchAllArticles = async (sort_by = "created_at", order = "asc") => {
    if (
        !["title", "topic", "author", "body", "created_at", "votes"].includes(
            sort_by
        )
    ) {
        return Promise.reject({ status: 400, msg: "invalid sort query" });
    }
    if (!["asc", "desc"].includes(order)) {
        return Promise.reject({ status: 400, msg: "invalid order query" });
    }

    const { rows } = await db.query(`
    SELECT articles.*, COUNT (comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};
    `);
    return rows;
};

exports.incrementVotesById = async (id, increment) => {
    if (increment === undefined || increment.length === 0) {
        return Promise.reject({ status: 400, msg: "invalid input" });
    }

    const { rows } = await db.query(
        `UPDATE articles 
        SET votes = votes + $1
        WHERE article_id = $2 RETURNING *;`,
        [increment, id]
    );
    return rows[0];
};
