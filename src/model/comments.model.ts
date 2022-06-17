import { Comment } from "../controllers/comments.controller";
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

export const updateNewCommentVotes: (
    commentId: number,
    voteNumber: number
) => Promise<Comment> = (commentId, voteNumber) => {
    return db
        .query(
            `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`,
            [voteNumber, commentId]
        )
        .then(({ rows }: { rows: Comment[] }) => {
            return rows[0];
        });
};
