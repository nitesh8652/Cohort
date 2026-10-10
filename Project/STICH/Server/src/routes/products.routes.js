import { Router } from "express"
import { createProductValidator } from "../validator/product.validator.js"
import { authenticate } from "../middleware/auth.middleware.js"
import {createProduct} from '../controller/product.controller.js'

const router = Router()

// /api/products
router.post("/",authenticate, (req, res, next) =>{
    if(req.user.role !== "seller"){
        return res.status(403).json({
            message:"User is not authorized to create products"
        })
    }

    next()
}, createProduct)

export default router