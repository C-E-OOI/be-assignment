"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.TransactionSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const z = __importStar(require("zod"));
const createTransactionSchema = z.object({
    sof_number: z.string().optional(),
    dof_number: z.string(),
    amount: z.number(),
    transaction_type: z.string().optional(),
    account_id: z.number().optional(),
    transaction_datetime: z.string().optional(),
});
const responseTransactionSchema = z.array(z.object({
    id: z.number(),
    sof_number: z.string(),
    dof_number: z.string(),
    amount: z.number(),
    transaction_type: z.string(),
    account_id: z.number(),
    transaction_datetime: z.string(),
}));
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createTransactionSchema,
    responseTransactionSchema
}, {
    $id: 'transactionSchemas' // Ensure the root $id is unique
}), exports.TransactionSchema = _a.schemas, exports.$ref = _a.$ref;
