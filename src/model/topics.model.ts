import db from "../db/index";
import { Topics } from "../controllers/topics.controller";

export const fetchAllTopics: () => Promise<Topics[]> = () => {
    return db
        .query(`SELECT * FROM topics;`)
        .then(({ rows }: { rows: Topics[] }) => {
            return rows;
        });
};
