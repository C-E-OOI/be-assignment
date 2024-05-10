import express from 'express'
import auth from './auth'
import payment from './payment'
import { authMiddleware } from '../middlewares/authentication'

export const routes = express()
.use(authMiddleware, auth)
.use(payment)