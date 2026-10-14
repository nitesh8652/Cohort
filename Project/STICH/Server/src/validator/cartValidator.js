import { body, validationResult } from 'express-validator'



export const cartValidator = [

    body("productId").exists().withMessage("Product id required").bail()
        .isString().withMessage("product id must be an string ").bail()
        .isMongoId().withMessage("Product ID is not valid "),
    body("quantity")
        .exists().withMessage("quantity is required").bail()
        .isInt({ min: 1 }).withMessage("must be an integer greater than 0 "),
    body("size")
        .exists().withMessage("size is required").bail(),

    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"validation failed",    
                errors:errors.array()
             })
        }
        next()
    }

]