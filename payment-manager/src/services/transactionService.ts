
import prisma from "../config/prisma";
import { paymentHistoryService } from "./paymentHistoryService";
import Decimal from "decimal.js";


export const transactionService = {
    
  createTransaction : async (transactionData: any) => {
    const {
      from_account_id,
      to_account_id,
      amount,
      timestamp,
      status
    } = transactionData;
    
      const transaction = await prisma.transaction.create({
        data: {
          from_account: {
            connect: { id: from_account_id },
          },
          to_account: {
            connect: { id: to_account_id },
          },
          amount: new Decimal(amount),
          timestamp: new Date(timestamp),
          status,
        },
      });
      
      return transaction;
    },
    
    getTransactionById : async (transactionId: any) => {
      const transaction = await prisma.transaction.findUnique({
        where: {
          id: transactionId,
        },
      });
      return transaction;
    },
    
    getTransactionsByUserId : async (userId: string) => {
      const transactions = await prisma.transaction.findMany({
        where: {
          OR: [
            {
              from_account: {
                user_id: userId,
              },
            },
            {
              to_account: {
                user_id: userId,
              },
            },
          ],
        },
      });
      return transactions;
    },
    
    processTransaction: (transaction: any) => {
      return new Promise((resolve, reject) => {
        console.log('Transaction processing started for:', transaction);

        transaction.status = 'pending'
    
        setTimeout(async () => {
          let transact : any
          try {
            const { from_account_id, to_account_id, amount } = transaction;
    
            const fromAccount = await prisma.paymentAccount.findUnique({
              where: { id: from_account_id },
            });
    
            if (!fromAccount) {
              throw new Error('Sender payment account not found');
            }
    
            let toAccount = null;
            if (to_account_id) {
              toAccount = await prisma.paymentAccount.findUnique({
                where: { id: to_account_id },
              });
    
              if (!toAccount) {
                throw new Error('Recipient payment account not found');
              }
            }
    
            if (fromAccount.balance.lt(new Decimal(amount))) {
              throw new Error('Insufficient balance');
            }
    
            const processedTransaction = await prisma.transaction.create({
              data: {
                from_account: {
                  connect: { id: from_account_id },
                },
                to_account: {
                  connect: { id: to_account_id },
                },
                amount: new Decimal(amount),
                timestamp: new Date(),
                status: 'pending',
              },
            });
            transact = processedTransaction

            await prisma.paymentAccount.update({
              where: { id: from_account_id },
              data: {
                balance: fromAccount.balance.minus(new Decimal(amount)),
              },
            });
    
            if (toAccount) {
              await prisma.paymentAccount.update({
                where: { id: to_account_id },
                data: {
                  balance: toAccount.balance.plus(new Decimal(amount)),
                },
              });
            }

            await prisma.transaction.update({
              where: { id: processedTransaction.id },
              data: {
                status: 'success',
              },
            });
            
            const transactionData = {
              processedTransaction,
              from_account_id,
              to_account_id,
              amount,
              toAccount
            }

            await paymentHistoryService.createPaymentHistory(transactionData)
  
            // Make PaymentHistory for receiver (if true)
            if (toAccount) {
              await paymentHistoryService.receiverPaymentHistory(transactionData)
            }
    
            console.log('Transaction processed for:', processedTransaction);
            resolve(processedTransaction);
          } catch (error) {
            console.error('Failed to process transaction:', error);

            await prisma.transaction.update({
              where: { id: transact.id },
              data: {
                status: 'failed',
              },
            });

          }
        }, 30000); // 30 detik
      });
    },
}

