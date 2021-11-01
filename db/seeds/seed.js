const db = require("../index");

const format = require("pg-format");

const seed = (data) => {
    const { articleData, commentData, topicData, userData } = data;
    return db
        .query(`DROP TABLE IF EXISTS comments;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS articles;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS users;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS topics;`);
        })
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
                        username VARCHAR PRIMARY KEY UNIQUE NOT NULL,
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
                    author VARCHAR REFERENCES users(username),
                    created_at VARCHAR
                  );`);
        })
        .then(() => {
            return db.query(`CREATE TABLE comments(
                    comment_id SERIAL PRIMARY KEY UNIQUE,
                    author VARCHAR REFERENCES users(username),
                    article_id INT REFERENCES articles(article_id),
                    created_at VARCHAR,
                    body VARCHAR NOT NULL,
                    votes INT DEFAULT 0
                  );`);
        })
        .then(() => {
            console.log("inserting into topics...");

            const queryTopics = format(
                `INSERT INTO topics (slug, description)
                        VALUES %L;`,
                topicData.map((topics) => {
                    return [topics.slug, topics.description];
                })
            );
            return db.query(queryTopics);
        })
        .then(() => {
            console.log("inserting into users...");
            const queryUsers = format(
                `
          INSERT INTO users (username, avatar_url, name)
          VALUES %L;`,
                userData.map((user) => {
                    return [user.username, user.avatar_url, user.name];
                })
            );
            return db.query(queryUsers);
        })
        .then(() => {
            console.log("inserting into articles....");
            const queryArticles = format(
                `
          INSERT INTO articles (title, topic, author, body, created_at, votes) 
          VALUES %L;`,
                articleData.map((article) => {
                    return [
                        article.title,
                        article.topic,
                        article.author,
                        article.body,
                        article.created_at,
                        article.votes,
                    ];
                })
            );
            return db.query(queryArticles);
        })
        .then(() => {
            console.log("inserting into comments...");
            const queryComments = format(
                `
          INSERT INTO comments(body, votes, author, article_id, created_at) 
          VALUES %L;`,
                commentData.map((comment) => {
                    return [
                        comment.body,
                        comment.votes,
                        comment.author,
                        comment.article_id,
                        comment.created_at,
                    ];
                })
            );
            return db.query(queryComments);
        });
};

module.exports = seed;
