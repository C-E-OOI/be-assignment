import express from 'express'
import auth from './auth'
import accounts from './accounts'
import { authMiddleware } from '../middlewares/authentication'

export const routes = express()
.use(auth)
.use('/account', authMiddleware, accounts)