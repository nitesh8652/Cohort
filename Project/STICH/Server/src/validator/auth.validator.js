import { body, validationResult } from "express-validator"

export const registerValidator = [
    body('email')
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Enter valid email address"),
    body("name")
        .exists().withMessage("name is required").bail()
        .isString().withMessage("Name must be string")
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("Name length 2-50 characters"),
    body("password")
        .exists().withMessage("Password required").bail()
        .trim()
        .isLength({ min: 4 }).withMessage("4 char long"),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }
        next()
    }

]

export const loginValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Emil must be a string").bail()
        .trim()
        .isEmail().withMessage("Enter avalid email address"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Paddword must be astring").bail()
        .trim()
        .isLength({ min: 4 }).withMessage("Password at least 4 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())

            return res.status(400).json({
                message: "Invalid data",
                errors: errors.array()
            })
        next()
    }
]


