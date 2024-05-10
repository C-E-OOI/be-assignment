import express from 'express'

import { authMiddleware } from '../middlewares/authentication'
import transactionRoutes from './transaction'

export const routes = express()
.use('/transaction', authMiddleware, transactionRoutes)