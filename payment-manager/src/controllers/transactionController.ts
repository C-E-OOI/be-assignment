import { Response } from 'express';
import { transactionService } from '../services/transactionService';

import { STATUS } from '../constants/status';
import { Prisma } from '@prisma/client';

export const transactionController = {
  createTransactionHandler : async (req: any, res: Response) => {
    try {
      const { 
        from_account_id,
        to_account_id,
        amount,
        timestamp,
        status
       } = req.body;
       const userId = req.user.user.id;

       if (!from_account_id || !to_account_id || !amount || !timestamp || !status) {
        return res.status(STATUS.BAD_REQ).json({ error: 'Missing required fields' });
      }

      const transactionData = {
        from_account_id,
        to_account_id,
        amount,
        timestamp,
        status,
        userId
      };

      const transaction = await transactionService.createTransaction(transactionData);

      res.status(STATUS.CREATED).json(transaction);
    } catch (error) {
      res.status(STATUS.NETWORK_ERROR).json({ error: 'Failed to create transaction' });
    }
  },
  
  getTransactionByIdHandler : async (req: any, res: Response) => {
    try {
      const transactionId = req.params.id;
      const transaction = await transactionService.getTransactionById(transactionId);

      if (!transaction) {
        return res.status(STATUS.NOT_FOUND).json({ error: 'Transaction not found' });
      }

      res.json(transaction);
    } catch (error) {
      res.status(STATUS.NETWORK_ERROR).json({ error: 'Failed to get transaction' });
    }
  },
  
  getTransactionsByUserIdHandler : async (req: any, res: Response) => {
    try {
      const userId = req.user.user.id;
      const transactions = await transactionService.getTransactionsByUserId(userId);
      res.json(transactions);
    } catch (error) {
      res.status(STATUS.NETWORK_ERROR).json({ error: 'Failed to get transactions' });
    }
  },
  
  processTransactionHandler : async (req: any, res: Response) => {
    try {
      const transactionData = req.body;
      const transaction = await transactionService.processTransaction(transactionData);

      res.json(transaction);
    } catch (error) {
      res.status(STATUS.NETWORK_ERROR).json({ error: 'Failed to process transaction' });
    }
  },
}
