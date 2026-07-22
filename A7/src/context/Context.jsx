import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const store = createContext()

const ContextProvider = ({ children }) => {

    const [products, setProducts] = useState([])

    const [selectedCategory, setSelectedCategory] = useState("all")

    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                toast.success(`Increased "${product.title}" quantity to ${existing.qty + 1}`, { autoClose: 1500 })
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            }
            toast.success(`"${product.title}" added to cart!`, { autoClose: 1500 })
            return [...prev, { ...product, qty: 1 }]
        })
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item =>
            item.id === id
                ? { ...item, qty: Math.max(1, item.qty + delta) }
                : item
        ))
    }

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

    const [user, setUser] = useState([])

    return (
        <store.Provider
            value={{
                products,
                setProducts,
                selectedCategory,
                setSelectedCategory,
                cart,
                addToCart,
                removeFromCart,
                updateQty,
                cartTotal,
                user,
                setUser
            }}
        >

            {children}
        </store.Provider>
    )


}

export default ContextProvider

