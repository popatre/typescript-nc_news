import { Article } from "../controllers/articles.controller";
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

export const fetchArticleById: (article_id: string) => Promise<Article> = (
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
