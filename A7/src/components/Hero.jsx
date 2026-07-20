import { Zap, ShoppingCart, LogOut, ArrowRight, Package, TrendingUp, Star, Tag } from "lucide-react"

const Navbar = () => {
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
        <a href="#" className="text-[#D9FF00] font-semibold text-sm tracking-wide">Home</a>
        <a href="#" className="text-[#A1A1AA] hover:text-[#F5F5F5] font-medium text-sm tracking-wide transition-colors duration-300">Shop</a>
        <a href="#" className="text-[#A1A1AA] hover:text-[#F5F5F5] font-medium text-sm tracking-wide transition-colors duration-300">About</a>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 bg-[#111111] border border-white/[0.12] rounded-full pl-2 pr-5 py-1">
          <div className="w-8 h-8 bg-[#D9FF00] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">C</span>
          </div>
          <span className="text-[#F5F5F5] text-sm font-medium">Clipsync</span>
        </div>

        <button className="w-12 h-12 rounded-xl border border-white/[0.12] flex items-center justify-center text-[#A1A1AA] hover:text-[#D9FF00] hover:border-[#D9FF00] transition-all duration-300">
          <ShoppingCart className="w-5 h-5" />
        </button>

        <button className="w-12 h-12 rounded-xl border border-white/[0.12] flex items-center justify-center text-[#A1A1AA] hover:text-[#D9FF00] hover:border-[#D9FF00] transition-all duration-300">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}

const HeroStatCard = ({ value, label }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#1A2A1A] rounded-3xl p-6 min-h-[140px]">
      <span className="text-5xl font-bold text-[#D9FF00]">{value}</span>
      <span className="text-[#A1A1AA] text-sm mt-1">{label}</span>
    </div>
  )
}

const HeroSection = () => {
  return (
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
          <p className="text-[#D9FF00] font-semibold tracking-[0.2em] text-sm mb-6">
            GOOD EVENING 👋
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="text-[#F5F5F5]">Welcome back,</span>
            <br />
            <span className="text-[#D9FF00]">Clipsync!</span>
          </h1>
          <p className="text-[#A1A1AA] text-base max-w-[500px] mb-8">
            Discover today&apos;s picks — hand-curated products across electronics, fashion, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="h-12 px-8 bg-[#D9FF00] text-black font-semibold rounded-full flex items-center gap-2 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(217,255,0,0.2)] transition-all duration-300">
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="h-12 px-8 bg-transparent border border-white/[0.12] text-[#F5F5F5] font-semibold rounded-full hover:border-[#D9FF00] hover:scale-[1.03] transition-all duration-300">
              View All Products
            </button>
          </div>
        </div>

        <div className="lg:w-[30%] flex flex-row lg:flex-col gap-4">
          <HeroStatCard value="20+" label="Products Available" />
          <div className="flex-1 flex flex-col items-center justify-center border border-white/[0.12] rounded-3xl p-6 min-h-[140px]">
            <span className="text-5xl font-bold text-[#F5F5F5]">Free</span>
            <span className="text-[#A1A1AA] text-sm mt-1">Delivery on ₹999+</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const StatCard = ({ icon: Icon, bgColor, value, label, sub }) => {
  return (
    <div className="rounded-3xl border border-white/[0.12] bg-[#111111] p-7 flex items-center gap-5 hover:-translate-y-1 hover:shadow-2xl hover:border-[#D9FF00]/50 transition-all duration-300">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${bgColor}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-[#F5F5F5]">{value}</p>
        <p className="text-[#A1A1AA] text-sm font-medium">{label}</p>
        <p className="text-[#A1A1AA] text-xs">{sub}</p>
      </div>
    </div>
  )
}

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <StatCard icon={Package} bgColor="bg-green-600/20" value="0" label="Cart Items" sub="In your bag" />
      <StatCard icon={TrendingUp} bgColor="bg-blue-600/20" value="$0.00" label="Cart Value" sub="Ready to checkout" />
      <StatCard icon={Star} bgColor="bg-orange-600/20" value="5" label="Top Products" sub="Highly rated" />
      <StatCard icon={Tag} bgColor="bg-purple-600/20" value="6" label="Categories" sub="To explore" />
    </div>
  )
}

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0B] font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6">
        <Navbar />
        <HeroSection />
        <StatsGrid />
      </div>
    </div>
  )
}

export default Hero
