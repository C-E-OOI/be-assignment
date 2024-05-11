/*
  Warnings:

  - You are about to drop the column `paymentId` on the `payment_accounts` table. All the data in the column will be lost.
  - Added the required column `paymentNumber` to the `payment_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "payment_accounts_paymentId_key";

-- AlterTable
ALTER TABLE "payment_accounts" DROP COLUMN "paymentId",
ADD COLUMN     "paymentNumber" TEXT NOT NULL;
