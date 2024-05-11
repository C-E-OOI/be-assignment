/*
  Warnings:

  - You are about to drop the column `amount` on the `payment_historys` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `payment_historys` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `payment_historys` table. All the data in the column will be lost.
  - You are about to drop the column `toAddress` on the `payment_historys` table. All the data in the column will be lost.
  - Added the required column `historyId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_historys" DROP COLUMN "amount",
DROP COLUMN "status",
DROP COLUMN "timestamp",
DROP COLUMN "toAddress";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "historyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "payment_historys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
