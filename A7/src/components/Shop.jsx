import { Search, ChevronDown } from "lucide-react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import ProductCard from "./ProductCard"
import axios from "axios"
import { useContext, useEffect } from "react"
import { useState } from "react"
import ContextProvider from "../context/Context"
import { store } from "../context/Context"

const categories = ["All", "Electronics", "Fashion", "Home & Living", "Beauty", "Sports"]

const Shop = () => {    

  let {products, setProducts} = useContext(store)

  // const [products, setProducts] = useState([])

  let fetchProducts = async () => {

    try {
      let res = await axios.get('https://fakestoreapi.com/products')

      console.log('data', res.data)
      setProducts(res.data)

    } catch (err) {
      console.log('single product err', err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <div className="min-h-screen bg-[#0B0B0B] font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6">
        <Navbar activePage="Shop" />

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#1A1A1A] border border-white/[0.1] text-[#F5F5F5] text-sm outline-none focus:border-[#D9FF00]/50 transition-colors placeholder:text-[#A1A1AA]"
            />
          </div>

          <div className="relative w-full sm:w-44">
            <select className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#1A1A1A] border border-white/[0.1] text-[#F5F5F5] text-sm outline-none appearance-none cursor-pointer focus:border-[#D9FF00]/50 transition-colors">
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#1A1A1A] text-[#F5F5F5]">{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA] pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">


              {
                products.map((val)=>{
                  return <ProductCard key={val.id} title={val.title} price={val.price} image={val.image}/>
                })
              }

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Shop;
