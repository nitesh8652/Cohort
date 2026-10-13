import { Router } from "express"
import { createProductValidator } from "../validator/product.validator.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { createProduct } from '../controller/product.controller.js'
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage(),
                        limits:{
                            files:5,
                            fileSize:5*1024*1024
                        }

 })

const router = Router()


// /api/products
router.post("/", authenticate, (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "User is not authorized to create products"
        })
    }

    next()
}, upload.array("images"), (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.price = JSON.parse(req.body.sizes))
    next()
}, createProduct)

export default router

