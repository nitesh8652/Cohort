import productModel from "../models/product.model.js";


export async function   createProduct(req, res) {
    console.log(req.body)

    req.status(200).json({
        message: "dummm ka dumm"
    })
}