import { body, validationResult } from "express-validator";

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("tile must be a string").bail()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Title must be between 2 or 100 words")
        .isAlpha('en-US', { ignore: " " }).withMessage("Character only have alfabet no special character"),
    body("description")
        .exists().withMessage("Description Required")
        .isString().withMessage("tile must be a string").bail()
        .trim(),
    body("price.amount")
        .exists().withMessage("AMOUNT IS REQURED")
        .isFloat({ min: 0 }).withMessage("price amount must be a floating number "),
    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("currency must be a string value")
        .isIn(["INR", "USD"]).withMessage('INR OR USD'),
    body("clothInfo")
        .exists().withMessage("Cloth Info is required").bail()
        .isArray().withMessage("Size must be an array object"),
    body("clothInfo.*.size")
        .exists().withMessage("Cloth Size is required").bail()
        .isString().withMessage("Size must be a string").bail()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage('INR OR USD').bail()
        .trim,
    body("clothInfo.*.stock")
        .exists().withMessage("Cloth Size is required").bail()
        .isInt({ min: 0 }).withMessage("Must be an valid integer").bail(),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "invalid request",
                errors: errors.array()
            })
        }
        next()
    }





]
