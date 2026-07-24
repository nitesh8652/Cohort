import { useNavigate } from 'react-router-dom'
import { Zap, ShoppingCart, LogOut } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { store } from "../context/Context"

const Navbar = ({ activePage = "Home" }) => {

  const { fullname, setFullname } = useContext(store)
  const navigate = useNavigate()




  const logout = () => {
    localStorage.removeItem("user")
    navigate('/')
  }



  return (
    <nav className="h-[72px] flex items-center justify-between rounded-2xl px-4 border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#D9FF00] flex items-center justify-center">
          <Zap className="w-6 h-6 text-black" />
        </div>

        <h1 className="text-2xl font-bold">
          <span className="text-[#F5F5F5]">Sky</span>
          <span className="text-[#D9FF00]">Mart</span>
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <NavLink to='/home' className={({ isActive }) => `text-sm font-medium transition-all duration-300 ${isActive ? "text-[#D9FF00]" : "text-[#A1A1AA] hover:text-[#D9FFAA]"}`}>
          Home
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => `text-sm font-medium transition-all duration-300 ${isActive ? "text-[#D9FF00]" : "text-[#A1A1AA] hover:text-[#D9FFAA]"}`}>
          About
        </NavLink>
        <NavLink to='/shop' className={({ isActive }) => `text-sm font-medium transition-all duration-300 ${isActive ? "text-[#D9FF00]" : "text-[#A1A1AA] hover:text-[#D9FFAA]"}`}>
          Shop
        </NavLink>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 bg-[#111111] border border-white/[0.12] rounded-full pl-2 pr-5 py-1">
          <div className="w-8 h-8 rounded-lg bg-[#D9FF00] flex items-center justify-center">
            <span className="text-black font-bold text-sm">C</span>
          </div>

          <span className="text-[#F5F5F5] text-sm font-medium">
            {fullname}
          </span>
        </div>

        <NavLink to="/cart" className="w-12 h-12 rounded-xl border border-white/[0.12] flex items-center justify-center text-[#A1A1AA] hover:border-[#D9FF00]/50 transition-all duration-300">
          <ShoppingCart className="w-5 h-5" />
        </NavLink>


        <button 
        onClick={logout}
        className="w-12 h-12 rounded-xl border border-white/[0.12] flex items-center justify-center text-[#A1A1AA]">
          <LogOut className="w-5 h-5" />
        </button>

      </div>
    </nav>
  )
}

export default Navbar