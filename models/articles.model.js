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

exports.fetchAllArticles = async (
    sort_by = "created_at",
    order = "asc",
    topic
) => {
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

    let queryStr = `SELECT articles.*, COUNT (comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id `;

    const topicArr = [];
    if (topic) {
        topicArr.push(topic);
        queryStr += `WHERE topic = $1 `;
    }

    queryStr += `GROUP BY articles.article_id 
    ORDER BY ${sort_by} ${order}`;

    const { rows } = await db.query(queryStr, topicArr);

    if (rows.length === 0) {
        const topicRes = await db.query(
            `SELECT * FROM topics WHERE slug = $1;`,
            [topic]
        );
        if (topicRes.rows.length === 0) {
            return Promise.reject({ status: 400, msg: "invalid input" });
        }
    }
    return rows;
};

exports.incrementVotesById = async (id, increment, reqLength) => {
    if (increment === undefined || increment.length === 0 || reqLength > 1) {
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

exports.fetchArticleCommentsById = async (id) => {
    const { rows } = await db.query(
        "SELECT * FROM comments WHERE article_id = $1;",
        [id]
    );
    if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "no comments found" });
    }
    return rows;
};

exports.addCommentById = async (id, username, body) => {
    if (username === undefined || username.length === 0) {
        return Promise.reject({ status: 400, msg: "invalid input" });
    }
    if (body === undefined || body.length === 0) {
        return Promise.reject({ status: 400, msg: "invalid input" });
    }
    const { rows } = await db.query(
        `INSERT INTO comments(body, author, article_id) 
    VALUES ($1, $2, $3) RETURNING *;`,
        [body, username, id]
    );
    return rows[0];
};

exports.removeArticleById = async (id) => {
    const noArticle = await db.query(
        "SELECT * FROM comments WHERE article_id = $1;",
        [id]
    );
    if (noArticle.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
    }

    const deleted = await db.query(
        `DELETE FROM articles WHERE article_id = $1;`,
        [id]
    );
    return deleted;
};
