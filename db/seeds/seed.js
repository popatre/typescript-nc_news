const db = require("../index");

const format = "pg-format";

const seed = (data) => {
    const { articleData, commentData, topicData, userData } = data;
    return db.query(`DROP TABLE IF EXISTS articles;`).then(() => {
        return db.query(`DROP TABLE IF EXISTS comments;`).then(() => {
            return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
                return db
                    .query(`DROP TABLE IF EXISTS topics;`)
                    .then(() => {
                        return db.query(`
                                CREATE TABLE topics(
                                slug VARCHAR PRIMARY KEY UNIQUE,
                                description VARCHAR);
                `);
                    })
                    .then(() => {
                        return db.query(`
                        CREATE TABLE users(
                        username SERIAL PRIMARY KEY UNIQUE,
                        avatar_url VARCHAR,
                        name VARCHAR NOT NULL);
                  `);
                    })
                    .then(() => {
                        return db.query(`CREATE TABLE articles(
                    article_id SERIAL PRIMARY KEY UNIQUE,
                    title VARCHAR NOT NULL,
                    body VARCHAR NOT NULL,
                    votes INT,
                    topic VARCHAR REFERENCES topics(slug),
                    author INT REFERENCES users(username),
                    created_at TIMESTAMP
                  );`);
                    })
                    .then(() => {
                        return db.query(`CREATE TABLE comments(
                    comment_id SERIAL PRIMARY KEY UNIQUE,
                    author INT REFERENCES users(username),
                    article_id INT DEFAULT 0,
                    created_at TIMESTAMP,
                    comment_body VARCHAR NOT NULL
                  );`);
                    });
            });
        });
    });
};

module.exports = seed;
