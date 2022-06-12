import { User } from "../controllers/users.controller";
import db from "../db/index";

export const fetchAllUsers: () => Promise<User[]> = () => {
    return db
        .query(`SELECT * from users`)
        .then(({ rows }: { rows: User[] }) => {
            return rows;
        });
};
