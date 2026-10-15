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

    const cart = (await cartModel.findone({ user: req.user.userId })) ?? await cartModel.create({ user: req.user.userId })

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


    const productInCart = cart.product.find(p => p.product.toString() === productId)

    if (productInCart) {
        if ((productInCart.quantity) > selectedSize.stock) {
            return res.status(400).json({

                message: "Insufficient STOCK!!! "

            })
        }
        await cartModel.updateOne(
            {
                user: req.user.userId,
                "products.product": productId,
                "products.size": size,
            }, {
            $inc: {
                "products.$.quantity": quantity
            }
        }
        )
    }

    await cartModel.findOneAndUpdate({
        user: req.user.userId
    }, {
        $push: {
            products: {
                product: productId,
                quantity: quantity,
                size: size
            }
        }
    })

    return res.status(200).json({
        message: "product added to cart successfully"
    })

}


export async function getCart(req, res) {
    const cart = (await cartModel.findOne({ user: req.user.userId })) ??
        (await cartModel.create({ user: req.user.userId }))


        return res.status(200).json({
            message:"cart retrived successfully",
            data:{
                cart: cart
            }
        })
}