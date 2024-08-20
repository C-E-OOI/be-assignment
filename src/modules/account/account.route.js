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
const account_controller_1 = require("./account.controller");
const account_schema_1 = require("./account.schema");
function accountRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/create', {
            preHandler: [fastify.authenticate],
            schema: {
                body: (0, account_schema_1.$ref)("createAccountSchema"),
                response: {
                    201: (0, account_schema_1.$ref)("responseAccountSchema"),
                },
            },
        }, account_controller_1.createAccountHandler);
        fastify.get('/', {
            preHandler: [fastify.authenticate],
            schema: {
                querystring: (0, account_schema_1.$ref)("accountQuery"),
                response: {
                    201: (0, account_schema_1.$ref)("responseBalanceAccountSchema"),
                },
            },
        }, account_controller_1.getBalanceByAccountHandler);
        fastify.get('/user/:id', {
            preHandler: [fastify.authenticate],
        }, account_controller_1.getCreditAccountByIdHandler);
        fastify.get('/balance', {
            preHandler: [fastify.authenticate],
            schema: {
                response: {
                    201: (0, account_schema_1.$ref)("responseBalanceAccountSchema"),
                },
            },
        }, account_controller_1.checkBalanceHandler);
        fastify.post('/check', {
            preHandler: [fastify.authenticate],
            schema: {
                body: (0, account_schema_1.$ref)("getTypeByAccountNumber"),
            },
        }, account_controller_1.checkIsCreditTypeHandler);
        fastify.put('/balance', {
            preHandler: [fastify.authenticate],
            schema: {
                body: (0, account_schema_1.$ref)("updateBalance"),
            },
        }, account_controller_1.updateBalanceHandler);
    });
}
exports.default = accountRoutes;
