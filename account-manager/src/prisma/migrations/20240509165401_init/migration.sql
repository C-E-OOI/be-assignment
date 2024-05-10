-- CreateTable
CREATE TABLE "PaymentAccount" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "PaymentAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentHistory" (
    "id" SERIAL NOT NULL,
    "payment_account_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "from_account_id" INTEGER NOT NULL,
    "to_account_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_payment_account_id_fkey" FOREIGN KEY ("payment_account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
