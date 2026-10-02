import { Router } from 'express'
import { loginValidator, registerValidator } from '../validator/auth.validator.js'
import { register, login, refresh } from '../controller/auth.controller.js'

const router = Router()

/* 
@post  
*/

router.post("/register", registerValidator, register)
router.post("/login", loginValidator, login)
router.post("/refresh", refresh)
router.get('/me')

export default router
