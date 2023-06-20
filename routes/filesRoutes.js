import express from 'express'

import { savefile,getsinglefile,getallfile,getfilesharebyme,getfilesharewithme } from '../controllers/filesController.js';




// router object
const router = express.Router()

// routing
// Save File in database || METHOD POST
router.post('/savefile', savefile)
router.get('/getfile', getsinglefile)
router.get('/getallfile', getallfile)
router.get('/getfilesharebyme', getfilesharebyme)
router.get('/getfilesharewithme', getfilesharewithme)


export default router