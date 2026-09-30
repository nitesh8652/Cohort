import { Router } from 'express'
import {registerValidator} from '../validator/auth.validator.js'
import {register} from '../controller/auth.controller.js'

const router = Router()

/* 
@post  
*/

router.post("/register", registerValidator, register)

export default router
