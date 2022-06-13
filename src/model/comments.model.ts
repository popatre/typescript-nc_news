import db from "../db/index";

export const removeCommentById: (comment_id: string) => Promise<void> = (
    commentId
) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1`, [commentId]);
};
