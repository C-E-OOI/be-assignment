import express from 'express'
import auth from './auth'

export const routes = express()
.use(auth)