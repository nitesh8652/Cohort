import { body, validationResult } from "express-validator"

export const registerValidator = [
    body('email')
        .exists().withMessage("Email is required")
        .trim()
        .isEmail().withMessage("Enter valid email address"),
    body("name")
        .exists().withMessage("name is required")
        .isString().withMessage("Name must be string")
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("Name length 2-50 characters"),
    body("password")
        .exists().withMessage("Password required")
        .trim()
        .isLength({ min: 4 }).withMessage("4 char long"),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }
        next()
    }

]
