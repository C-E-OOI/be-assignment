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
exports.createAccountHandler = createAccountHandler;
exports.getBalanceByAccountHandler = getBalanceByAccountHandler;
exports.checkBalanceHandler = checkBalanceHandler;
exports.checkIsCreditTypeHandler = checkIsCreditTypeHandler;
exports.getCreditAccountByIdHandler = getCreditAccountByIdHandler;
exports.updateBalanceHandler = updateBalanceHandler;
const account_service_1 = require("./account.service");
function createAccountHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const account = yield (0, account_service_1.createAccount)(body, request.user.id);
            return reply.status(201).send(account);
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
function getBalanceByAccountHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        let { type } = request.query;
        try {
            const balance = yield (0, account_service_1.getBalanceByAccount)(type, request.user.id);
            return reply.status(201).send(balance);
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
function checkBalanceHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const balance = yield (0, account_service_1.getBalance)(request.user.id);
            return reply.status(201).send(balance);
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
function checkIsCreditTypeHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const result = yield (0, account_service_1.checkIsCredit)(body.account_number);
            if (result.account_type !== "credit") {
                return reply.status(400).send({
                    message: "Invalid account number. Try again!",
                });
            }
            return reply.status(201).send({
                status: "success"
            });
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
function getCreditAccountByIdHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = request.params;
        try {
            const account = yield (0, account_service_1.getCreditAccountById)(param.user_id);
            if (!account) {
                return reply.status(400).send({
                    message: "Invalid account number. Try again!",
                });
            }
            return reply.status(201).send({
                account
            });
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
function updateBalanceHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const account = yield (0, account_service_1.getCreditAccountById)(request.user.id);
            if (!account) {
                return reply.status(400).send({
                    message: "Invalid account number. Try again!",
                });
            }
            (0, account_service_1.updateBalance)(body.amount, account.id);
            return reply.status(201).send({
                status: "balance updated succsfully"
            });
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
