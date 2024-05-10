import { Router } from 'express'
import { paymentController } from '../controllers/paymentController'

const paymentRoutes = Router()

export default paymentRoutes.get('/', paymentController.getAllPaymentAccounts)
    .get('/:id', paymentController.getPaymentAccountById)
    .get('/:id/history', paymentController.getPaymentHistoryByAccountId)
    .post('/', paymentController.createPaymentAccount)