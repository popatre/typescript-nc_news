import { Articles } from "../controllers/articles.controller";
import db from "../db/index";

export const fetchAllArticles: () => Promise<Articles[]> = () => {
    return db
        .query(
            "SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.comment_id GROUP BY articles.article_id;"
        )
        .then((response: { rows: [] }) => {
            return response.rows;
        });
};
