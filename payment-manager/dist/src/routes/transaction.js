"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const authentication_1 = require("../middlewares/authentication");
const transactionRoutes = express_1.default.Router();
transactionRoutes
    .post('/', authentication_1.authMiddleware, transactionController_1.transactionController.createTransactionHandler)
    .get('/:id', authentication_1.authMiddleware, transactionController_1.transactionController.getTransactionByIdHandler)
    .get('/', authentication_1.authMiddleware, transactionController_1.transactionController.getTransactionsByUserIdHandler)
    .post('/send', authentication_1.authMiddleware, transactionController_1.transactionController.processTransactionHandler)
    .post('/withdraw', authentication_1.authMiddleware, transactionController_1.transactionController.processTransactionHandler);
exports.default = transactionRoutes;
