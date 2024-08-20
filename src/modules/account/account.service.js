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
exports.createAccount = createAccount;
exports.getBalanceByAccount = getBalanceByAccount;
exports.getBalance = getBalance;
exports.checkIsCredit = checkIsCredit;
exports.getCreditAccountById = getCreditAccountById;
exports.updateBalance = updateBalance;
const prisma_1 = require("../../../utils/prisma");
const helper_1 = require("../../../utils/helper");
function createAccount(input, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { account_type, balance } = input;
        const acc_number = (0, helper_1.generateRandomNumberString)();
        const newAccount = yield prisma_1.db.accounts.create({
            data: {
                user_id: id,
                account_type,
                account_number: acc_number,
                balance
            }
        });
        return newAccount;
    });
}
function getBalanceByAccount(type, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountInfo = yield prisma_1.db.accounts.findMany({
            where: Object.assign(Object.assign({}, (userId && { user_id: userId })), (type && { account_type: type })),
            select: {
                account_number: true,
                account_type: true,
                balance: true
            }
        });
        return accountInfo;
    });
}
function getBalance(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.db.accounts.findFirst({
            where: {
                user_id: id,
                account_type: "credit"
            }
        });
        return (result === null || result === void 0 ? void 0 : result.balance) || 0;
    });
}
function checkIsCredit(accNum) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.db.accounts.findFirstOrThrow({
            where: {
                account_number: accNum
            }
        });
        return result;
    });
}
function getCreditAccountById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.db.accounts.findFirstOrThrow({
            where: {
                user_id: id,
                account_type: "credit"
            }
        });
        return result;
    });
}
function updateBalance(amount, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.db.accounts.update({
            where: {
                id: id,
            },
            data: {
                balance: amount
            }
        });
        return result;
    });
}
