export const checkIsValidQuery = (
    greenList: string[],
    wordToCheck: string
): Promise<{ status: number; msg: string }> | boolean => {
    console.log("in here");

    return greenList.includes(wordToCheck);
};
