/*
  Warnings:

  - You are about to drop the column `payment_account_id` on the `PaymentHistory` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_payment_account_id_fkey";

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "payment_account_id",
ADD COLUMN     "account_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
