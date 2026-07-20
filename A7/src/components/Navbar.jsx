import { Zap, ShoppingCart, LogOut } from "lucide-react"

const Navbar = ({ activePage = "Home" }) => {
  const links = ["Home", "Shop", "About"]

  return (
    <nav className="h-[72px] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#D9FF00] rounded-full flex items-center justify-center">
          <Zap className="w-6 h-6 text-black" />
        </div>
        <span className="text-2xl font-bold">
          <span className="text-[#F5F5F5]">Sky</span>
          <span className="text-[#D9FF00]">Mart</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <span
            key={link}
            className={
              link === activePage
                ? "text-[#D9FF00] font-semibold text-sm tracking-wide"
                : "text-[#A1A1AA] font-medium text-sm tracking-wide cursor-pointer transition-colors duration-300"
            }
          >
            {link}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 bg-[#111111] border border-white/[0.12] rounded-full pl-2 pr-5 py-1">
          <div className="w-8 h-8 bg-[#D9FF00] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">C</span>
          </div>
          <span className="text-[#F5F5F5] text-sm font-medium">Clipsync</span>
        </div>

        <button className="w-12 h-12 rounded-xl border border-white/[0.12] flex items-center justify-center text-[#A1A1AA] transition-all duration-300">
          <ShoppingCart className="w-5 h-5" />
        </button>

        <button className="w-12 h-12 rounded-xl border border-white/[0.12] flex items-center justify-center text-[#A1A1AA] transition-all duration-300">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
