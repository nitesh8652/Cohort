import { body } from "express-validator";

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
        .exists().withMessage("Cloth Info is required")
        .isString().withMessage("clothinfo must be a string")
        .trim
        .isAlpha('en-US', { ignore: " " }).withMessage("Character only have alfabet no special character"),
    body("clothInfo.size")
        .exists().withMessage("Cloth Size is required")
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage('INR OR USD')
        .isString().withMessage("Size must be a string")
        .trim,
    body("clothInfo.stock")
        .isNumeric({ min: 0 })
        .exists().withMessage("Cloth Size is required")





]
