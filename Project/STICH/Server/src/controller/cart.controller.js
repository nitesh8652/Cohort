import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function addToCart(req, res) {
    const { productId, quantity, size } = req.body

    const product = await productModel.findById(productId)

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    let cart = await cartModel.findOne({ user: req.user.userId })

    if (!cart) {
        cart = new cartModel({ user: req.user.userId, products: [] })
    }

    const existingItem = cart.products.find(
        item => item.product.toString() === productId && item.size === size
    )

    if (existingItem) {
        existingItem.quantity += Number(quantity)
    } else {
        cart.products.push({ product: productId, quantity, size })
    }

    await cart.save()

    res.status(200).json({
        message: "Product added to cart",
        data: {
            cart
        }
    })
}
