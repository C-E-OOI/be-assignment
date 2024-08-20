import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const accountCore = {          // define the common account schema
    balance: z.number(),
    account_type: z.string(),
}

const createAccountSchema = z.object({
    account_type: z.string(
        { required_error: "account_type is required", invalid_type_error: "account_type is not valid" }
    ),
    balance: z.number()
});

const updateBalance = z.object({
    amount: z.number(
        { required_error: "amount is required", invalid_type_error: "amount is not valid" }
    ),
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

const responseAccountSchema = z.object({
    id: z.number(),
    account_number: z.string(),
    user_id: z.number(),
    ...accountCore,
});

const responseBalanceAccountSchema = z.array(
    z.object({
        account_number: z.string(),
        account_type: z.string(),
        balance: z.number()
    })
);

const responseTypeCheck = z.object({
   account_type: z.string(),
});

const sendBalanceSchema = z.object({
    sof_number: z.number(
        { required_error: "sof_number is required", invalid_type_error: "sof_number is not valid" }
    ),
    dof_number: z.number(
        { required_error: "dof_number is required", invalid_type_error: "dof_number is not valid" }
    ),
    amount: z.number(
        { required_error: "amount is required", invalid_type_error: "amount is not valid" }
    ),
    transaction_type: z.string(
        { required_error: "transaction_type is required", invalid_type_error: "transaction_type is not valid" }
    ),
    account_id: z.number(
        { required_error: "account_id is required", invalid_type_error: "account_id is not valid" }
    ),
    transaction_datetime: z.string()
});

const accountQuery = z.object({
    type: z.string().optional(),
});

export type CreateInputAccount = z.infer<typeof createAccountSchema>
export type GetBalanceByAccountType = z.infer<typeof getBalanceByAccountType>
export type GetTypeByAccountNumber = z.infer<typeof getTypeByAccountNumber>
export type QueryAccount = z.infer<typeof accountQuery>
export type SendBalance = z.infer<typeof sendBalanceSchema>
export type ParamPath = z.infer<typeof paramPathSchema>
export type UpdateBalance = z.infer<typeof updateBalance>

export const { schemas: AccountSchema, $ref } = buildJsonSchemas({
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
},{
    $id: 'accountSchemas'      // Ensure the root $id is unique
});