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
exports.transactionService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const paymentHistoryService_1 = require("./paymentHistoryService");
const decimal_js_1 = __importDefault(require("decimal.js"));
exports.transactionService = {
    createTransaction: (transactionData) => __awaiter(void 0, void 0, void 0, function* () {
        const { from_account_id, to_account_id, amount, timestamp, status } = transactionData;
        const transaction = yield prisma_1.default.transaction.create({
            data: {
                from_account: {
                    connect: { id: from_account_id },
                },
                to_account: {
                    connect: { id: to_account_id },
                },
                amount: new decimal_js_1.default(amount),
                timestamp: new Date(timestamp),
                status,
            },
        });
        return transaction;
    }),
    getTransactionById: (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield prisma_1.default.transaction.findUnique({
            where: {
                id: transactionId,
            },
        });
        return transaction;
    }),
    getTransactionsByUserId: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const transactions = yield prisma_1.default.transaction.findMany({
            where: {
                OR: [
                    {
                        from_account: {
                            user_id: userId,
                        },
                    },
                    {
                        to_account: {
                            user_id: userId,
                        },
                    },
                ],
            },
        });
        return transactions;
    }),
    processTransaction: (transaction) => {
        return new Promise((resolve, reject) => {
            console.log('Transaction processing started for:', transaction);
            transaction.status = 'pending';
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                let transact;
                try {
                    const { from_account_id, to_account_id, amount } = transaction;
                    const fromAccount = yield prisma_1.default.paymentAccount.findUnique({
                        where: { id: from_account_id },
                    });
                    if (!fromAccount) {
                        throw new Error('Sender payment account not found');
                    }
                    let toAccount = null;
                    if (to_account_id) {
                        toAccount = yield prisma_1.default.paymentAccount.findUnique({
                            where: { id: to_account_id },
                        });
                        if (!toAccount) {
                            throw new Error('Recipient payment account not found');
                        }
                    }
                    if (fromAccount.balance.lt(new decimal_js_1.default(amount))) {
                        throw new Error('Insufficient balance');
                    }
                    const processedTransaction = yield prisma_1.default.transaction.create({
                        data: {
                            from_account_id,
                            to_account_id,
                            amount: new decimal_js_1.default(amount),
                            timestamp: new Date(),
                            status: 'pending',
                        },
                    });
                    transact = processedTransaction;
                    yield prisma_1.default.paymentAccount.update({
                        where: { id: from_account_id },
                        data: {
                            balance: fromAccount.balance.minus(new decimal_js_1.default(amount)),
                        },
                    });
                    if (toAccount) {
                        yield prisma_1.default.paymentAccount.update({
                            where: { id: to_account_id },
                            data: {
                                balance: toAccount.balance.plus(new decimal_js_1.default(amount)),
                            },
                        });
                    }
                    yield prisma_1.default.transaction.update({
                        where: { id: processedTransaction.id },
                        data: {
                            status: 'success',
                        },
                    });
                    const transactionData = {
                        processedTransaction,
                        from_account_id,
                        to_account_id,
                        amount,
                        toAccount
                    };
                    yield paymentHistoryService_1.paymentHistoryService.createPaymentHistory(transactionData);
                    // Make PaymentHistory for receiver (if true)
                    if (toAccount) {
                        yield paymentHistoryService_1.paymentHistoryService.receiverPaymentHistory(transactionData);
                    }
                    console.log('Transaction processed for:', processedTransaction);
                    resolve(processedTransaction);
                }
                catch (error) {
                    console.error('Failed to process transaction:', error);
                    yield prisma_1.default.transaction.update({
                        where: { id: transact.id },
                        data: {
                            status: 'failed',
                        },
                    });
                }
            }), 30000); // 30 detik
        });
    },
};
