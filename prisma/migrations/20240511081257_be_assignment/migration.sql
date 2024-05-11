/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `payment_accounts` will be added. If there are existing duplicate values, this will fail.
  - The required column `paymentId` was added to the `payment_accounts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "payment_accounts" DROP CONSTRAINT "payment_accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "payment_historys" DROP CONSTRAINT "payment_historys_accountId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_historyId_fkey";

-- AlterTable
ALTER TABLE "payment_accounts" ADD COLUMN     "paymentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_accounts_paymentId_key" ON "payment_accounts"("paymentId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "payment_historys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_historys" ADD CONSTRAINT "payment_historys_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "payment_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_accounts" ADD CONSTRAINT "payment_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
