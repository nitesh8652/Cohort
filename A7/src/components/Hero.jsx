import { ArrowRight, Package, TrendingUp, Star, Tag } from "lucide-react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { NavLink } from "react-router"
import { useContext } from "react"
import { store } from "../context/Context"
import { useState } from "react"
import { useNavigate } from "react-router"



const Hero = ({category}) => {


  const deals = [
    { title: "Wireless Headphones", oldPrice: "$129", newPrice: "$79", tag: "-40%" },
    { title: "Smart Watch Pro", oldPrice: "$249", newPrice: "$149", tag: "-40%" },
    { title: "Designer Sneakers", oldPrice: "$189", newPrice: "$99", tag: "-47%" },
    { title: "Backpack 45L", oldPrice: "$89", newPrice: "$49", tag: "-45%" },

  ]

  const categories = [
  { name: "electronics", icon: "💻", items: "20 items" },
  { name: "jewelery", icon: "💍", items: "15 items" },
  { name: "men's clothing", icon: "👔", items: "25 items" },
  { name: "women's clothing", icon: "👗", items: "30 items" },
]

  const navigate = useNavigate()
  const { selectedCategory, setSelectedCategory } = useContext(store)
  let { products, setProducts } = useContext(store)





  return (
    <div className="min-h-screen bg-[#0B0B0B] font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6">
        <Navbar activePage="Home" />

        <section className="rounded-3xl border border-white/[0.15] bg-[#111111] p-8 lg:p-12 mt-6 relative overflow-hidden min-h-[340px]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
          <div className="relative z-10 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[70%]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                <span className="text-[#F5F5F5]">Welcome back,</span>
                <br />
                <span className="text-[#D9FF00]">Clipsync!</span>
              </h1>
              <p className="text-[#A1A1AA] text-base max-w-[500px] mb-8">
                Discover today&apos;s picks — hand-curated products across electronics, fashion, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <NavLink to='/shop'>
                  <button className="h-12 px-8 bg-[#D9FF00] text-black font-semibold rounded-full flex items-center gap-2 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(217,255,0,0.2)] transition-all duration-300">
                    Shop Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </NavLink>
                <NavLink to='/shop'>
                  <button className="h-12 px-8 bg-transparent border border-white/[0.12] text-[#F5F5F5] font-semibold rounded-full hover:border-[#D9FF00] hover:scale-[1.03] transition-all duration-300">
                    View All Products
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="lg:w-[30%] flex flex-row lg:flex-col gap-4">
              <div className="flex-1 flex flex-col items-center justify-center bg-[#1A2A1A] rounded-3xl p-6 min-h-[140px]">
                <span className="text-5xl font-bold text-[#D9FF00]">20+</span>
                <span className="text-[#A1A1AA] text-sm mt-1">Products Available</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center border border-white/[0.12] rounded-3xl p-6 min-h-[140px]">
                <span className="text-5xl font-bold text-[#F5F5F5]">Free</span>
                <span className="text-[#A1A1AA] text-sm mt-1">Delivery on ₹999+</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { icon: Package, bg: "bg-green-600/20", value: "0", label: "Cart Items", sub: "In your bag" },
            { icon: TrendingUp, bg: "bg-blue-600/20", value: "$0.00", label: "Cart Value", sub: "Ready to checkout" },
            { icon: Star, bg: "bg-orange-600/20", value: "5", label: "Top Products", sub: "Highly rated" },
            { icon: Tag, bg: "bg-purple-600/20", value: "6", label: "Categories", sub: "To explore" },
          ].map((card) => (
            <div key={card.label} className="rounded-3xl border border-white/[0.12] bg-[#111111] p-7 flex items-center gap-5 hover:-translate-y-1 hover:shadow-2xl hover:border-[#D9FF00]/50 transition-all duration-300">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${card.bg}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F5F5F5]">{card.value}</p>
                <p className="text-[#A1A1AA] text-sm font-medium">{card.label}</p>
                <p className="text-[#A1A1AA] text-xs">{card.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6">🛍️ Category Wise Shopping</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* <NavLink to='/shop'> */}
            
            {categories.map((cat) => (
              <div key={cat.name} 
              onClick={()=>{setSelectedCategory(cat.name); navigate('/shop')}}
              className="rounded-2xl border border-white/[0.1] bg-[#1A1A1A] p-5 flex flex-col items-center 
              text-center hover:-translate-y-1 hover:border-[#D9FF00]/50 transition-all duration-300 cursor-pointer">
                <span className="text-4xl mb-3">{cat.icon}</span>
                <span className="text-[#F5F5F5] font-semibold text-sm">{cat.name}</span>
                <span className="text-[#A1A1AA] text-xs mt-1">{cat.items}</span>
              </div>
            ))}
            
            {/* </NavLink> */}




          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6">🔥 Best Deals for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {deals.map((deal) => (
              <div key={deal.title} className="rounded-2xl border border-white/[0.1] bg-[#1A1A1A] p-5 hover:-translate-y-1 hover:border-[#D9FF00]/50 transition-all duration-300 cursor-pointer">
                <div className="bg-[#D9FF00]/10 rounded-xl h-32 flex items-center justify-center mb-4">
                  <span className="text-4xl">📦</span>
                </div>
                <span className="inline-block bg-[#D9FF00] text-black text-xs font-bold px-2 py-1 rounded mb-2">{deal.tag}</span>
                <h3 className="text-[#F5F5F5] font-semibold text-sm mb-2">{deal.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[#D9FF00] font-bold text-lg">{deal.newPrice}</span>
                  <span className="text-[#A1A1AA] text-sm line-through">{deal.oldPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Hero
