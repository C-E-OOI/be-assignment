"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionController = void 0;
const transactionService_1 = require("../services/transactionService");
const status_1 = require("../constants/status");
exports.transactionController = {
    createTransactionHandler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { from_account_id, to_account_id, amount, timestamp, status } = req.body;
            const userId = req.user.user.id;
            if (!from_account_id || !to_account_id || !amount || !timestamp || !status) {
                return res.status(status_1.STATUS.BAD_REQ).json({ error: 'Missing required fields' });
            }
            const transactionData = {
                from_account_id,
                to_account_id,
                amount,
                timestamp,
                status,
                userId
            };
            const transaction = yield transactionService_1.transactionService.createTransaction(transactionData);
            res.status(status_1.STATUS.CREATED).json(transaction);
        }
        catch (error) {
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Failed to create transaction' });
        }
    }),
    getTransactionByIdHandler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const transactionId = req.params.id;
            const transaction = yield transactionService_1.transactionService.getTransactionById(transactionId);
            if (!transaction) {
                return res.status(status_1.STATUS.NOT_FOUND).json({ error: 'Transaction not found' });
            }
            res.json(transaction);
        }
        catch (error) {
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Failed to get transaction' });
        }
    }),
    getTransactionsByUserIdHandler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.user.id;
            const transactions = yield transactionService_1.transactionService.getTransactionsByUserId(userId);
            res.json(transactions);
        }
        catch (error) {
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Failed to get transactions' });
        }
    }),
    processTransactionHandler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const transactionData = req.body;
            const transaction = yield transactionService_1.transactionService.processTransaction(transactionData);
            res.json(transaction);
        }
        catch (error) {
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Failed to process transaction' });
        }
    }),
};
