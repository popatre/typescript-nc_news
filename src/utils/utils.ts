import db from "../db/index";

export const checkIsValidQuery = (
    greenList: string[],
    wordToCheck: string
): boolean | Promise<{ status: number; msg: string }> => {
    if (!greenList.includes(wordToCheck)) {
        return Promise.reject({ status: 400, msg: "Invalid query" });
    } else {
        return true;
    }
};

export const getValidTopics: () => Promise<string[]> = async () => {
    const { rows } = await db.query(`SELECT slug from topics;`);
    const topics = rows.map((topic: { slug: string }) => topic.slug);
    return topics;
};

export const checkIfExists = (
    table: string,
    column: string,
    value: string,
    message: string
): [] => {
    return db
        .query(`SELECT * from ${table} WHERE ${column} = $1`, [value])
        .then(({ rows }: { rows: [] }) => {
            if (!rows.length) {
                return Promise.reject({
                    status: 404,
                    msg: `${message}`,
                });
            } else return [];
        });
};
