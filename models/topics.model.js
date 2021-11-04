const db = require("../db");

exports.fetchAllTopics = async () => {
    const { rows } = await db.query("SELECT * FROM topics");
    return rows;
};

exports.addNewTopic = async (slug, description) => {
    const { rows } = await db.query(
        `INSERT INTO topics VALUES ($1, $2) RETURNING *;`,
        [slug, description]
    );
    return rows[0];
};
