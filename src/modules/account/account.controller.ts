import { FastifyReply, FastifyRequest } from "fastify";

import { CreateInputAccount, ParamPath, UpdateBalance} from "./account.schema";
import { GetTypeByAccountNumber } from "./account.schema";
import { createAccount, getBalanceByAccount, getBalance, checkIsCredit, getCreditAccountById, updateBalance } from "./account.service";


export async function createAccountHandler(
    request: FastifyRequest<{
        Body: CreateInputAccount;
    }>, 
    reply: FastifyReply
) {
    const body = request.body;
    try {
        const account = await createAccount(body,request.user.id);
        return reply.status(201).send(account);
        
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}

export async function getBalanceByAccountHandler(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    let { type } = request.query as { type?: string };
    try {
        const balance = await getBalanceByAccount(type,request.user.id);
        return reply.status(201).send(balance);
        
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}

export async function checkBalanceHandler(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    try {
        const balance = await getBalance(request.user.id);
        return reply.status(201).send(balance);
        
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}

export async function checkIsCreditTypeHandler(
    request: FastifyRequest<
    {Body:GetTypeByAccountNumber;}
    >, 
    reply: FastifyReply
) {
    const body = request.body;
    try {
        const result = await checkIsCredit(body.account_number);
        if (result.account_type !== "credit") {
            return reply.status(400).send({
                message: "Invalid account number. Try again!",
            });
        }
        return reply.status(201).send({
            status : "success"
        });
        
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}
export async function getCreditAccountByIdHandler(
    request: FastifyRequest<
    {Params:ParamPath;}
    >, 
    reply: FastifyReply
) {
    const param = request.params;
    try {
        const account = await getCreditAccountById(param.user_id);
        if (!account) {
            return reply.status(400).send({
                message: "Invalid account number. Try again!",
            });
        }
        return reply.status(201).send({
            account
        });
        
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}

export async function updateBalanceHandler(
    request: FastifyRequest<
    {Body:UpdateBalance;}
    >, 
    reply: FastifyReply
) {
    const body = request.body;
    try {
        const account = await getCreditAccountById(request.user.id);
        if (!account) {
            return reply.status(400).send({
                message: "Invalid account number. Try again!",
            });
        }
        updateBalance(body.amount,account.id);
        return reply.status(201).send({
            status : "balance updated succsfully"
        });
        
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}