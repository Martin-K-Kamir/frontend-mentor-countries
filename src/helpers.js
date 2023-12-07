export const toTitleCase = string => {
    if (!string) return "";
    let result = string.replace(/([A-Z])/g, " $1");


    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result;
};

export const toCamelCase = string => {
    if (!string) return "";
    return string
        .split(" ")
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join("");
}