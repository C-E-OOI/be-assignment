"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const payment_1 = __importDefault(require("./payment"));
exports.routes = (0, express_1.default)()
    .use(auth_1.default)
    .use(payment_1.default);
