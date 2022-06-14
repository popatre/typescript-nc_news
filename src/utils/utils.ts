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
