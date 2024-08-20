import { db } from "../../../utils/prisma";
import {RequestTransaction, ResponseTransaction} from "./transaction.schema";

export async function createTransaction(input: RequestTransaction) {
    const newAccount = await db.transactions.create({
        data: {
            sof_number: input.sof_number ? input.sof_number : "",
            dof_number: input.dof_number,
            amount: input.amount,
            transaction_type: input.transaction_type ? input.transaction_type : "",
            account_id: input.account_id ? input.account_id : 0,
            transaction_datetime: input.transaction_datetime
        }
    });

    return newAccount;
}

export async function getTransaction(id: number) {
    const transactions = await db.transactions.findMany(
        {
            where: {
                account_id: id
            }
        }
    );
    return transactions;
}