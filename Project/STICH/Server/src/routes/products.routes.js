import { Router } from "express"
import { createProductValidator } from "../validator/product.validator"
import { authenticate } from "../middleware/auth.middleware"

const router = Router()

// /api/products
router.post("/",authenticate, (req, res, next) =>{
    if(req.user.role !== "seller"){
        return res.status(403).json({
            message:"User is not authorized to create products"
        })
    }

    next()
},)

export default router