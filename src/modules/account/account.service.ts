import { db } from "../../../utils/prisma";
import {CreateInputAccount, GetBalanceByAccountType, GetTypeByAccountNumber, SendBalance} from "./account.schema";
import { generateRandomNumberString } from "../../../utils/helper";

export async function createAccount(input: CreateInputAccount, id: number) {

    const { account_type , balance} = input;

    const acc_number = generateRandomNumberString();

    const newAccount = await db.accounts.create({
        data: {
            user_id : id,
            account_type,
            account_number: acc_number,
            balance
        }
    });

    return newAccount;
}

export async function getBalanceByAccount(type: string|undefined, userId: number) {
    const accountInfo = await db.accounts.findMany({
        where: {
            ...(userId && { user_id: userId }),
            ...(type && { account_type: type }),
        },
        select: {
            account_number: true,
            account_type: true,
            balance: true
        }
    });
    return accountInfo;
}

export async function getBalance(id: number) {
    const result = await db.accounts.findFirst({
        where: {
            user_id: id,
            account_type: "credit"
        }
    });
    return result?.balance || 0;
}

export async function checkIsCredit(accNum: string) {
    const result = await db.accounts.findFirstOrThrow({
        where: {
            account_number: accNum
        }
    });
    return result
}

export async function getCreditAccountById(id: number) {
    const result = await db.accounts.findFirstOrThrow({
        where: {
            user_id: id,
            account_type: "credit"
        }
    });
    return result
}

export async function updateBalance(amount: number, id: number) {
    const result = await db.accounts.update({
        where: {
            id: id,
        },
        data: {
            balance: amount
        }
    });
    return result
}