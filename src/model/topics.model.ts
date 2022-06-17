import db from "../db/index";
import { Topics } from "../controllers/topics.controller";

export const fetchAllTopics: () => Promise<Topics[]> = () => {
    return db
        .query(`SELECT * FROM topics;`)
        .then(({ rows }: { rows: Topics[] }) => {
            return rows;
        });
};

export const addNewTopic: (
    description: string,
    slug: string
) => Promise<Topics> = (description, slug) => {
    if (typeof description !== "string" || typeof slug !== "string") {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }

    return db
        .query(
            "INSERT INTO topics(description, slug) VALUES ($1, $2) RETURNING *",
            [description, slug]
        )
        .then(({ rows }: { rows: Topics[] }) => {
            return rows[0];
        });
};
