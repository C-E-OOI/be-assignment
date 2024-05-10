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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentHistoryService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const decimal_js_1 = __importDefault(require("decimal.js"));
exports.paymentHistoryService = {
    receiverPaymentHistory: (transactionData) => __awaiter(void 0, void 0, void 0, function* () {
        const { processedTransaction, from_account_id, amount, } = transactionData;
        yield prisma_1.default.paymentHistory.create({
            data: {
                account_id: from_account_id,
                transaction_id: processedTransaction.id,
                amount: new decimal_js_1.default(amount),
                transaction_type: 'receive',
            },
        });
    }),
    createPaymentHistory: (transactionData) => __awaiter(void 0, void 0, void 0, function* () {
        const { processedTransaction, to_account_id, amount, toAccount } = transactionData;
        yield prisma_1.default.paymentHistory.create({
            data: {
                account_id: to_account_id,
                transaction_id: processedTransaction.id,
                amount: new decimal_js_1.default(amount),
                transaction_type: toAccount ? 'send' : 'withdraw',
            },
        });
    })
};
