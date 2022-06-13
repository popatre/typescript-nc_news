import db from "../db/index";

export const removeCommentById: (comment_id: string) => Promise<void> = (
    commentId
) => {
    return db
        .query(`SELECT * FROM comments WHERE comment_id = $1`, [commentId])
        .then(({ rows }: { rows: [] }) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: "Id not found" });
            } else {
                return db.query(`DELETE FROM comments WHERE comment_id = $1`, [
                    commentId,
                ]);
            }
        });
};
