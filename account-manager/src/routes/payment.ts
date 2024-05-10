import { Router } from 'express'
import { paymentController } from '../controllers/paymentController'

const paymentRoutes = Router()

export default paymentRoutes.get('/accounts', paymentController.getAllPaymentAccounts)
    .get('/accounts/:id', paymentController.getPaymentAccountById)
    .get('/accounts/:id/history', paymentController.getPaymentHistoryByAccountId)
    .post('/accounts', paymentController.createPaymentAccount)