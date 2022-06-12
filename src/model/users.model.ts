import { User } from "../controllers/users.controller";
import db from "../db/index";

export const fetchAllUsers: () => Promise<User[]> = () => {
    return db
        .query(`SELECT * from users`)
        .then(({ rows }: { rows: User[] }) => {
            return rows;
        });
};

export const fetchUserByUsername: (username: string) => Promise<User> = (
    username
) => {
    return db
        .query(`SELECT * from users WHERE username = $1 `, [username])
        .then(({ rows }: { rows: User[] }) => {
            return rows[0];
        });
};
