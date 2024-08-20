import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const createTransactionSchema = z.object({
    sof_number: z.string().optional(),
    dof_number: z.string(),
    amount: z.number(),
    transaction_type: z.string().optional(),
    account_id: z.number().optional(),
    transaction_datetime: z.string().optional(),
});

const responseTransactionSchema = z.array(
    z.object({
        id: z.number(),
        sof_number: z.string(),
        dof_number: z.string(),
        amount: z.number(),
        transaction_type: z.string(),
        account_id: z.number(),
        transaction_datetime: z.string(),
    })
);

export type RequestTransaction = z.infer<typeof createTransactionSchema>
export type ResponseTransaction = z.infer<typeof responseTransactionSchema>
export const { schemas: TransactionSchema, $ref } = buildJsonSchemas({
    createTransactionSchema,
    responseTransactionSchema
},{
    $id: 'transactionSchemas'// Ensure the root $id is unique
});