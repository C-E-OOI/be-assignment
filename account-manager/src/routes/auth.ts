import { Router } from 'express'
import AuthController from '../controllers/authController'

const authRoutes = Router()

export default authRoutes.post('/login', AuthController.login)
    .post('/register', AuthController.register)