export const camelCaseToTitleCase = camelCase => {
    let result = camelCase.replace(/([A-Z])/g, " $1");

    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result;
};
