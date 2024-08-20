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
exports.createTransactionHandler = createTransactionHandler;
exports.getTransactionHandler = getTransactionHandler;
const transaction_service_1 = require("./transaction.service");
const account_service_1 = require("../account/account.service");
const account_service_2 = require("../account/account.service");
function createTransactionHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        //validate origin account
        const accountSof = yield (0, account_service_2.getCreditAccountById)(request.user.id);
        if (!accountSof || accountSof.account_type !== "credit") {
            return reply.status(400).send({
                message: "Invalid account number. Try again!",
            });
        }
        //validate destination account
        const accountDof = yield (0, account_service_1.checkIsCredit)(request.body.dof_number);
        if (!accountDof || accountSof.account_type !== "credit") {
            return reply.status(400).send({
                message: "Invalid account number. Try again!",
            });
        }
        body.account_id = accountSof.id;
        body.sof_number = accountSof.account_number;
        body.transaction_type = "D";
        body.transaction_datetime = new Date().toISOString();
        if (body.amount <= 0) {
            return reply.status(400).send({
                message: "Amount must be greater than 0"
            });
        }
        // check user balance 
        const balance = yield (0, account_service_2.getBalance)(request.user.id);
        if (balance < body.amount) {
            return reply.status(400).send({
                message: "Insufficient balance"
            });
        }
        //check destination account not same with origin account
        if (body.sof_number === body.dof_number) {
            return reply.status(400).send({
                message: "Destination account cannot be same with origin account"
            });
        }
        const dofType = yield (0, account_service_1.checkIsCredit)(body.dof_number);
        if (dofType.account_type !== "credit") {
            return reply.status(400).send({
                message: "Invalid account number. Try again!",
            });
        }
        const sofType = yield (0, account_service_1.checkIsCredit)(body.sof_number);
        if (sofType.account_type !== "credit") {
            return reply.status(400).send({
                message: "Invalid account number. Try again!",
            });
        }
        try {
            //create DEBIT transaction
            const transaction = yield (0, transaction_service_1.createTransaction)(body);
            if (!transaction) {
                return reply.status(400).send({
                    message: "Failed create transaction. Try again!",
                });
            }
            //create CREDIT transaction
            body.transaction_type = "C";
            body.account_id = accountDof.id;
            body.transaction_datetime = new Date().toISOString();
            const debitTransaction = yield (0, transaction_service_1.createTransaction)(body);
            if (!debitTransaction) {
                return reply.status(400).send({
                    message: "Failed create transaction. Try again!",
                });
            }
            //deduct balance credit
            const balanceUpdated = yield (0, account_service_1.updateBalance)(accountSof.balance - body.amount, accountSof.id);
            if (!balanceUpdated) {
                return reply.status(400).send({
                    message: "Failed update balance. Try again!",
                });
            }
            //add balance debit
            const debitBalanceUpdated = yield (0, account_service_1.updateBalance)(accountDof.balance + body.amount, accountDof.id);
            if (!balanceUpdated) {
                return reply.status(400).send({
                    message: "Failed update balance. Try again!",
                });
            }
            return reply.status(201).send(transaction);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({
                message: "Internal Server Error",
                error: error
            });
        }
    });
}
function getTransactionHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accountCredit = yield (0, account_service_2.getCreditAccountById)(request.user.id);
            if (!accountCredit) {
                return reply.status(400).send({
                    message: "Invalid account number. Try again!",
                });
            }
            const transactions = yield (0, transaction_service_1.getTransaction)(accountCredit.id);
            return reply.status(201).send(transactions);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({
                message: "Internal Server Error",
                error: error
            });
        }
    });
}
