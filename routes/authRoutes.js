import express from 'express'
import {loginController, registerController} from '../controllers/authControllers.js'
// import { requireSignIn } from '../middlewares/authMiddleware.js'

// router object
const router = express.Router()

// routing
// Register || METHOD POST
router.post('/register', registerController)

// Login || Method POST
router.post('/login',loginController)


export default router