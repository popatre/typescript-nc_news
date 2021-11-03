const db = require("../db");

exports.fetchAllUsernames = async () => {
    const { rows } = await db.query(`SELECT username FROM users;`);

    return rows;
};

exports.fetchUsernameByName = async (username) => {
    const { rows } = await db.query(
        `SELECT username, avatar_url, name FROM users WHERE username = $1;`,
        [username]
    );

    return rows[0];
};
