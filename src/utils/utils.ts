export const checkIsValidQuery = (
    greenList: string[],
    wordToCheck: string
): boolean => {
    return greenList.includes(wordToCheck);
};
