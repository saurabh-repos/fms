import express from 'express'
import { remarksController } from '../controllers/remarksController.js'




// router object
const router = express.Router()

// routing
// Save File in database || METHOD POST
router.post('/saveremarks', remarksController)


export default router