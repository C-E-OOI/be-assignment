"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middlewares/authentication");
const transaction_1 = __importDefault(require("./transaction"));
exports.routes = (0, express_1.default)()
    .use('/transaction', authentication_1.authMiddleware, transaction_1.default);
