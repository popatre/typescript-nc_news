import { Articles } from "../controllers/articles.controller";
import db from "../db/index";

export const fetchAllArticles: () => Promise<Articles> = () => {
    return db
        .query("SELECT * FROM articles;")
        .then((response: { rows: [] }) => {
            return response.rows;
        });
};
