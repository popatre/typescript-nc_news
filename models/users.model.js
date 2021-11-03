const db = require("../db");

exports.fetchAllUsernames = async () => {
    const { rows } = await db.query(`SELECT username FROM users;`);

    return rows;
};
