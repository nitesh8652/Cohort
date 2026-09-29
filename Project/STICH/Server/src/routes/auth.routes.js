import { Router } from 'express'
import {registerValidator} from '../validator/auth.validator.js'

const router = Router()

/* 
@post  
*/

router.post("/register", registerValidator)

export default router