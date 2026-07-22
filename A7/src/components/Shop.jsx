import { Search, ChevronDown } from "lucide-react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import ProductCard from "./ProductCard"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { store } from "../context/Context"

const Shop = () => {

  let { products, setProducts } = useContext(store)
  const {selectedCategory, setSelectedCategory} = useContext(store)
  const [search, setSearch] = useState('')

  let fetchProducts = async () => {

    try {
      let res = await axios.get('https://fakestoreapi.com/products')
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSelectedCategory('all')
              }}
            />
          </div>

          <div className="relative w-full sm:w-44">

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#1A1A1A] border border-white/[0.1] text-[#F5F5F5] text-sm outline-none appearance-none cursor-pointer focus:border-[#D9FF00]/50 transition-colors">
              <option value='all'>All</option>
              {[...new Set(products.map(p => p.category))].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>



            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA] pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {
            products.filter(p => {
              const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
              const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
              return matchesSearch && matchesCategory
            }).map((val) => {
              return <ProductCard key={val.id} id={val.id} title={val.title} price={val.price} image={val.image} rating={val.rating.rate} category={val.category} />
            })
          }
        </div>      </div>
      <Footer />
    </div>
  )
}

export default Shop;
