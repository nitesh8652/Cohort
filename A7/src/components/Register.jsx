import { useEffect, useState, useContext } from "react"
import { Link, NavLink } from "react-router"
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { store } from "../context/Context"


const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { user , setUser } = useContext(store)


console.log(User);



  return (
    <div className="min-h-screen bg-[#0B0B0B] font-['Inter',sans-serif] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#D9FF00]/10 rounded-full blur-3xl animate-[pulseGlow_4s_ease-in-out_infinite]" />

      <div className="w-full max-w-md lg:w-[500px] bg-[#111111] border border-white/[0.08] rounded-3xl shadow-2xl p-8 sm:p-12 animate-[slideUp_0.6s_ease-out]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#D9FF00] rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <span className="text-3xl font-bold">
            <span className="text-[#F5F5F5]">Sky</span>
            <span className="text-[#D9FF00]">Mart</span>
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-[#F5F5F5] mb-2 tracking-tight">Create account</h2>
        <p className="text-[#A1A1AA] text-base mb-10">Join SkyMart and start shopping</p>

        <form className="space-y-5">
          <div className="relative">
            <label htmlFor="fullName" className="sr-only">Full name</label>
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A1A1AA]" />
            <input
              id="fullName"
             
              type="text"
              required='True'
              placeholder="Full name"
              autoComplete="name"
              className="w-full h-14 bg-[#1A1A1A] border border-white/10 rounded-xl pl-12 pr-4 text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#D9FF00] focus:border-transparent hover:border-[#D9FF00]/60 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">Email address</label>
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A1A1AA]" />
            <input
              required='True'
              id="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              className="w-full h-14 bg-[#1A1A1A] border border-white/10 rounded-xl pl-12 pr-4 text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#D9FF00] focus:border-transparent hover:border-[#D9FF00]/60 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A1A1AA]" />
            <input
              required='True'
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 chars)"
              autoComplete="new-password"
              className="w-full h-14 bg-[#1A1A1A] border border-white/10 rounded-xl pl-12 pr-12 text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#D9FF00] focus:border-transparent hover:border-[#D9FF00]/60 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#D9FF00] transition-colors duration-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A1A1AA]" />
            <input
              required='True'
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              className="w-full h-14 bg-[#1A1A1A] border border-white/10 rounded-xl pl-12 pr-12 text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#D9FF00] focus:border-transparent hover:border-[#D9FF00]/60 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#D9FF00] transition-colors duration-300"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>

          <NavLink to='/home'>


            <button
              type="submit"
              className="w-full h-14 bg-[#D9FF00] text-black font-semibold text-lg rounded-xl flex items-center justify-center gap-2 hover:brightness-105 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(217,255,0,0.25)] active:scale-95 transition-all duration-300"
            >
              Create Account
              <ArrowRight className="w-[18px] h-[18px]" />
            </button>
          </NavLink>
        </form>

        <p className="text-center text-[#A1A1AA] mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-[#D9FF00] font-semibold hover:underline hover:brightness-110 transition-all duration-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
