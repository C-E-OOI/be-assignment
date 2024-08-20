import { FastifyReply, FastifyRequest } from "fastify";

import { RequestTransaction } from "./transaction.schema";
import { createTransaction, getTransaction } from "./transaction.service";
import { checkIsCredit, updateBalance } from "../account/account.service";
import { getBalance , getCreditAccountById} from "../account/account.service";



export async function createTransactionHandler(
    request: FastifyRequest<{
        Body: RequestTransaction;
    }>, 
    reply: FastifyReply
) {
    const body = request.body;

    //validate origin account
    const accountSof = await getCreditAccountById(request.user.id);
    if (!accountSof || accountSof.account_type !== "credit") {
        return reply.status(400).send({
            message: "Invalid account number. Try again!",
        });
    }

    //validate destination account
    const accountDof = await checkIsCredit(request.body.dof_number);
    if (!accountDof || accountSof.account_type !== "credit") {
        return reply.status(400).send({
            message: "Invalid account number. Try again!",
        });
    }

    body.account_id = accountSof.id
    body.sof_number = accountSof.account_number
    body.transaction_type = "D"
    body.transaction_datetime = new Date().toISOString();

    if (body.amount <= 0) {
        return reply.status(400).send({
            message: "Amount must be greater than 0"
        })
    }
    
    // check user balance 
    const balance = await getBalance(request.user.id);
    if (balance < body.amount) {
        return reply.status(400).send({
            message: "Insufficient balance"
        })
    }

    //check destination account not same with origin account
    if (body.sof_number === body.dof_number) {
        return reply.status(400).send({
            message: "Destination account cannot be same with origin account"
        })
    }

    const dofType = await checkIsCredit(body.dof_number);
    if (dofType.account_type !== "credit") {
        return reply.status(400).send({
            message: "Invalid account number. Try again!",
        });
    }

    const sofType = await checkIsCredit(body.sof_number);
    if (sofType.account_type !== "credit") {
        return reply.status(400).send({
            message: "Invalid account number. Try again!",
        });
    }

    try {
        //create DEBIT transaction
        const transaction = await createTransaction(body);
        if (!transaction) {
            return reply.status(400).send({
                message: "Failed create transaction. Try again!",
            });
        }

        //create CREDIT transaction
        body.transaction_type = "C"
        body.account_id = accountDof.id
        body.transaction_datetime = new Date().toISOString(); 
        const debitTransaction = await createTransaction(body);
        if (!debitTransaction) {
            return reply.status(400).send({
                message: "Failed create transaction. Try again!",
            });
        }
        //deduct balance credit
        const balanceUpdated = await updateBalance(accountSof.balance - body.amount, accountSof.id);
        if (!balanceUpdated) {
            return reply.status(400).send({
                message: "Failed update balance. Try again!",
            });
        }

        //add balance debit
        const debitBalanceUpdated = await updateBalance(accountDof.balance + body.amount, accountDof.id);
        if (!balanceUpdated) {
            return reply.status(400).send({
                message: "Failed update balance. Try again!",
            });
        }
        return reply.status(201).send(transaction);
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}

export async function getTransactionHandler(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    try {
        const accountCredit = await getCreditAccountById(request.user.id);
        if (!accountCredit) {
            return reply.status(400).send({
                message: "Invalid account number. Try again!",
            });
        }

        const transactions = await getTransaction(accountCredit.id);
        return reply.status(201).send(transactions);
        
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}

