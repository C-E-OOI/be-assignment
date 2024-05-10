import express from 'express';
import { transactionController } from '../controllers/transactionController';
import { authMiddleware } from '../middlewares/authentication';


const transactionRoutes = express.Router();

transactionRoutes
    .get('/:id', authMiddleware, transactionController.getTransactionByIdHandler)
    .get('/', authMiddleware, transactionController.getTransactionsByUserIdHandler)
    .post('/send', authMiddleware, transactionController.processTransactionHandler)
    .post('/withdraw', authMiddleware, transactionController.processTransactionHandler);

export default transactionRoutes;