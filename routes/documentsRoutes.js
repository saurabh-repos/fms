import express from 'express'
import { savedocument,getalldocuments } from '../controllers/documentsController.js'




// router object
const router = express.Router()

// routing
// Save File in database || METHOD POST
router.post('/savedocument', savedocument)
router.get('/getalldocuments', getalldocuments)


export default router