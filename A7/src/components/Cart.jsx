import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useContext } from "react"
import { store } from "../context/Context"
import { NavLink } from "react-router-dom"

const Cart = () => {
  const { cart, removeFromCart, updateQty, cartTotal } = useContext(store)

  return (
    <div className="min-h-screen bg-[#0B0B0B] font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6">
        <Navbar activePage="Cart" />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-[#F5F5F5]">Your Cart</h1>
          <p className="text-[#A1A1AA] text-sm mt-1">{cart.length} {cart.length === 1 ? "item" : "items"} in your bag</p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border border-white/[0.08] flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-[#A1A1AA]" />
            </div>
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">Your cart is empty</h2>
            <p className="text-[#A1A1AA] text-sm mb-8 max-w-xs">Looks like you haven&apos;t added anything yet. Start shopping to fill it up!</p>
            <NavLink to="/shop">
              <button className="h-12 px-8 bg-[#D9FF00] text-black font-semibold rounded-full flex items-center gap-2 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(217,255,0,0.2)] transition-all duration-300">
                <ArrowLeft className="w-5 h-5" />
                Browse Products
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="flex-1 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/[0.1] bg-[#111111] p-4 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#F5F5F5] font-semibold text-sm truncate">{item.title}</h3>
                    <p className="text-[#A1A1AA] text-xs mt-0.5 capitalize">{item.category}</p>
                    <p className="text-[#D9FF00] font-bold text-lg mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-[#1A1A1A] border border-white/[0.08] rounded-xl px-3 py-1.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-[#F5F5F5] font-medium text-sm w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-[#F5F5F5] font-bold text-sm w-20 text-right">${(item.price * item.qty).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#A1A1AA] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-80">
              <div className="rounded-2xl border border-white/[0.1] bg-[#111111] p-6 sticky top-6">
                <h2 className="text-lg font-bold text-[#F5F5F5] mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#A1A1AA]">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#A1A1AA]">
                    <span>Shipping</span>
                    <span className="text-[#D9FF00]">Free</span>
                  </div>
                  <div className="border-t border-white/[0.08] pt-3 flex justify-between text-[#F5F5F5] font-bold text-base">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full h-12 mt-6 bg-[#D9FF00] text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(217,255,0,0.2)] transition-all duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart