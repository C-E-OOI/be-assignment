"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumberString = generateRandomNumberString;
function generateRandomNumberString(length = 10) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
// Example usage:
//const randomString = generateRandomNumberString();
