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
exports.paymentController = void 0;
const status_1 = require("../constants/status");
const paymentService_1 = require("../services/paymentService");
exports.paymentController = {
    createPaymentAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.user.id;
            const { account_type, account_number, balance = 0 } = req.body;
            const newPaymentAccount = yield paymentService_1.paymentService.createPaymentAccount({
                user_id: userId,
                account_type,
                account_number,
                balance,
            });
            res.status(status_1.STATUS.CREATED).json(newPaymentAccount);
        }
        catch (error) {
            console.error('Error creating payment account:', error);
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
        }
    }),
    getAllPaymentAccounts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.user.id;
            const paymentAccounts = yield paymentService_1.paymentService.getAllPaymentAccountsByUserId(userId);
            res.status(status_1.STATUS.SUCCESS).json(paymentAccounts);
        }
        catch (error) {
            console.error('Error retrieving payment accounts:', error);
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
        }
    }),
    getPaymentAccountById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.user.id;
            const id = +req.params.id;
            const paymentAccount = yield paymentService_1.paymentService.getPaymentAccountById(userId, id);
            if (!paymentAccount) {
                return res.status(status_1.STATUS.NOT_FOUND).json({ error: 'Payment account not found' });
            }
            res.status(status_1.STATUS.SUCCESS).json(paymentAccount);
        }
        catch (error) {
            console.error('Error retrieving payment account:', error);
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
        }
    }),
    getPaymentHistoryByAccountId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.user.id;
            const id = +req.params.id;
            const paymentHistory = yield paymentService_1.paymentService.getPaymentHistoryByAccountId(userId, id);
            res.status(status_1.STATUS.SUCCESS).json(paymentHistory);
        }
        catch (error) {
            console.error('Error retrieving payment history:', error);
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
        }
    }),
};
