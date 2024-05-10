import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const paymentService = {
  createPaymentAccount: async (data: any) => {
    return prisma.paymentAccount.create({ data });
  },

  getAllPaymentAccountsByUserId: async (user_id: string) => {
    return prisma.paymentAccount.findMany({
      where: { user_id },
    });
  },

  getPaymentAccountById: async (user_id: string, id: number) => {
    return prisma.paymentAccount.findFirst({
      where: { id, user_id },
    });
  },

  getPaymentHistoryByAccountId: async (userId: string, accountId: number) => {
    return prisma.paymentHistory.findMany({
      where: {
        account_id: accountId,
        payment_account: {
          user_id: userId,
        },
      },
    });
  }
};