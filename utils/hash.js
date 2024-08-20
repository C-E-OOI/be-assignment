"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const crypto_1 = __importDefault(require("crypto"));
function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const hash = crypto_1.default
        .pbkdf2Sync(password, salt, 1000, 64, "sha512") // (password: crypto.BinaryLike, salt: crypto.BinaryLike, iterations: number, keylen: number, digest: string)
        .toString('hex');
    return { hash, salt };
}
function verifyPassword({ candidatePassword, salt, hash }) {
    const candidateHash = crypto_1.default
        .pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512")
        .toString('hex');
    return candidateHash === hash;
}
