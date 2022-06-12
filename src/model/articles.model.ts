import { Article } from "../controllers/articles.controller";
import db from "../db/index";

export const fetchAllArticles: () => Promise<Article[]> = () => {
    return db
        .query(
            "SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.comment_id GROUP BY articles.article_id;"
        )
        .then((response: { rows: Article[] }) => {
            return response.rows;
        });
};

export const fetchArticleById: (article_id: string) => Promise<Article> = (
    article_id
) => {
    return db
        .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({ rows }: { rows: Article[] }) => {
            return rows[0];
        });
};
