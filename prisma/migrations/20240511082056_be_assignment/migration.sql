/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `payment_accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[historyId]` on the table `payment_historys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - The required column `accountId` was added to the `payment_accounts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `historyId` was added to the `payment_historys` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `transactionId` was added to the `transactions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "payment_accounts" ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payment_historys" ADD COLUMN     "historyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "transactionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_accounts_accountId_key" ON "payment_accounts"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_historys_historyId_key" ON "payment_historys"("historyId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transactionId_key" ON "transactions"("transactionId");
