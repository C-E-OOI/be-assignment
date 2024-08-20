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
exports.$ref = exports.AccountSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const z = __importStar(require("zod"));
const accountCore = {
    balance: z.number(),
    account_type: z.string(),
};
const createAccountSchema = z.object({
    account_type: z.string({ required_error: "account_type is required", invalid_type_error: "account_type is not valid" }),
    balance: z.number()
});
const updateBalance = z.object({
    amount: z.number({ required_error: "amount is required", invalid_type_error: "amount is not valid" }),
});
const getBalanceByAccountType = z.object({
    account_type: z.string(),
});
const getTypeByAccountNumber = z.object({
    account_number: z.string(),
});
const paramPathSchema = z.object({
    user_id: z.number(),
});
const responseAccountSchema = z.object(Object.assign({ id: z.number(), account_number: z.string(), user_id: z.number() }, accountCore));
const responseBalanceAccountSchema = z.array(z.object({
    account_number: z.string(),
    account_type: z.string(),
    balance: z.number()
}));
const responseTypeCheck = z.object({
    account_type: z.string(),
});
const sendBalanceSchema = z.object({
    sof_number: z.number({ required_error: "sof_number is required", invalid_type_error: "sof_number is not valid" }),
    dof_number: z.number({ required_error: "dof_number is required", invalid_type_error: "dof_number is not valid" }),
    amount: z.number({ required_error: "amount is required", invalid_type_error: "amount is not valid" }),
    transaction_type: z.string({ required_error: "transaction_type is required", invalid_type_error: "transaction_type is not valid" }),
    account_id: z.number({ required_error: "account_id is required", invalid_type_error: "account_id is not valid" }),
    transaction_datetime: z.string()
});
const accountQuery = z.object({
    type: z.string().optional(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createAccountSchema,
    responseAccountSchema,
    getBalanceByAccountType,
    getTypeByAccountNumber,
    responseBalanceAccountSchema,
    responseTypeCheck,
    accountQuery,
    sendBalanceSchema,
    paramPathSchema,
    updateBalance
}, {
    $id: 'accountSchemas' // Ensure the root $id is unique
}), exports.AccountSchema = _a.schemas, exports.$ref = _a.$ref;
