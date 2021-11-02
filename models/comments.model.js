const db = require("../db");

exports.removeCommentById = async (id) => {
    const deleted = await db.query(
        `DELETE FROM comments WHERE comment_id = $1;`,
        [id]
    );
    return deleted;
};

exports.fetchAllComments = async () => {
    const { rows } = await db.query(`SELECT * FROM comments`);
    return rows;
};
