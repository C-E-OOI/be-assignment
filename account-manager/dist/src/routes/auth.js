"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authRoutes = (0, express_1.Router)();
exports.default = authRoutes.post('/login', authController_1.default.login)
    .post('/register', authController_1.default.register);
