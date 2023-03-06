const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const createRandomId = (length = 3) => {
    let result = '';

    while (result.length < length) {
        result += letters[Math.floor(Math.random() * letters.length)];
    }

    return result;
};