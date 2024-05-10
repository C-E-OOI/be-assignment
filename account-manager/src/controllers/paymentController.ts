import { Response } from 'express';
import { STATUS } from '../constants/status';
import { paymentService } from '../services/paymentService';
import { IGetUserAuthInfoRequest } from 'src/types/express';



export const paymentController = {
  createPaymentAccount: async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const userId = req.user.user.id;
      const { account_type, account_number, balance = 0 } = req.body;
      const newPaymentAccount = await paymentService.createPaymentAccount({
        user_id: userId,
        account_type,
        account_number,
        balance,
      });

      res.status(STATUS.CREATED).json(newPaymentAccount);
    } catch (error) {
      console.error('Error creating payment account:', error);
      res.status(STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
    }
  },

  getAllPaymentAccounts: async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const userId = req.user.user.id;
      const paymentAccounts = await paymentService.getAllPaymentAccountsByUserId(userId);

      res.status(STATUS.SUCCESS).json(paymentAccounts);
    } catch (error) {
      console.error('Error retrieving payment accounts:', error);
      res.status(STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
    }
  },

  getPaymentAccountById: async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const userId = req.user.user.id;
      const id  = +req.params.id as number
      const paymentAccount = await paymentService.getPaymentAccountById(userId, id);

      if (!paymentAccount) {
        return res.status(STATUS.NOT_FOUND).json({ error: 'Payment account not found' });
      }

      res.status(STATUS.SUCCESS).json(paymentAccount);
    } catch (error) {
      console.error('Error retrieving payment account:', error);
      res.status(STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
    }
  },

  getPaymentHistoryByAccountId: async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const userId = req.user.user.id;
      const id  = +req.params.id as number
      const paymentHistory = await paymentService.getPaymentHistoryByAccountId(userId, id);

      res.status(STATUS.SUCCESS).json(paymentHistory);
    } catch (error) {
      console.error('Error retrieving payment history:', error);
      res.status(STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
    }
  },
};