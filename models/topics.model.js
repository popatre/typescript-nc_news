const db = require("../db");

exports.fetchAllTopics = async () => {
    const { rows } = await db.query("SELECT * FROM topics");
    return rows;
};
