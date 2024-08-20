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
const transaction_controller_1 = require("./transaction.controller");
const transaction_schema_1 = require("./transaction.schema");
function transactionRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/send', {
            preHandler: [fastify.authenticate],
            schema: {
                body: (0, transaction_schema_1.$ref)("createTransactionSchema")
            },
        }, transaction_controller_1.createTransactionHandler);
        fastify.get('/', {
            preHandler: [fastify.authenticate],
            schema: {
                response: {
                    201: (0, transaction_schema_1.$ref)("responseTransactionSchema"),
                },
            },
        }, transaction_controller_1.getTransactionHandler);
    });
}
exports.default = transactionRoutes;
