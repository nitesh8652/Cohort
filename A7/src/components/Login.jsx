import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Zap, Mail, Lock, Eye, ArrowRight } from "lucide-react"
import { Navigate } from "react-router"
import { toast } from "react-toastify"
import { useContext } from "react"
import { store } from "../context/Context"



const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(store)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleLogin = (e) => {
        e.preventDefault()
        const saved = localStorage.getItem('user')
        if (!saved) {
            navigate('/register')
            toast.error('Please Register First')
            return
        }

        const storedUser = JSON.parse(saved)
        if (storedUser.email === email && storedUser.password === password) {
            toast.success('Login Successful')
            setUser(storedUser)
            navigate('/home')
        } else {
            toast.error('Invalid email or password')
        }

    }



    return (
        <div className="min-h-screen bg-[#0B0B0B] font-['Inter',sans-serif] flex flex-col lg:flex-row">
            {/* Left Hero Section */}
            <section className="relative lg:w-1/2 px-6 sm:px-10 lg:px-16 pt-12 pb-12 lg:pb-16 flex flex-col overflow-hidden animate-[fadeIn_0.8s_ease-out]">
                {/* Background Glow */}
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#D9FF00]/10 rounded-full blur-3xl animate-[pulseGlow_4s_ease-in-out_infinite]" />

                {/* Logo */}
                <div className="flex items-center gap-3 mb-20 lg:mb-24">
                    <div className="w-10 h-10 bg-[#D9FF00] rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-3xl font-bold">
                        <span className="text-white">Sky</span>
                        <span className="text-[#D9FF00]">Mart</span>
                    </span>
                </div>

                {/* Hero Content */}
                <div className="flex-1 flex flex-col justify-center animate-[slideLeft_0.8s_ease-out]">
                    <p className="text-[#D9FF00] font-semibold tracking-[0.2em] text-sm mb-6">
                        WELCOME BACK
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        <span className="text-[#F5F5F5]">Shop the future.</span>
                        <br />
                        <span className="text-[#D9FF00]">Today.</span>
                    </h1>
                    <p className="text-[#A1A1AA] text-base md:text-lg leading-8 max-w-[500px] mb-12 lg:mb-16">
                        Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
                    </p>
                </div>

                {/* Stats Cards */}

            </section>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-white/[0.08] self-stretch" />

            {/* Right Login Section */}
            <section className="lg:w-1/2 flex items-center justify-center px-4 py-12 lg:py-0 animate-[fadeIn_0.8s_ease-out]">
                <div className="w-full max-w-sm md:max-w-md lg:w-[480px] bg-[#111111] border border-white/[0.08] rounded-3xl shadow-2xl p-8 sm:p-12 animate-[slideRight_0.8s_ease-out]">
                    <h2 className="text-4xl font-bold text-[#F5F5F5] mb-2">Sign in</h2>
                    <p className="text-[#A1A1AA] mb-10">Enter your credentials to continue</p>

                    {/* Email Input */}
                    <div className="relative mb-4">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email address"
                            className="w-full h-14 bg-[#1A1A1A] border border-white/10 rounded-xl pl-12 pr-4 text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#D9FF00] hover:border-[#D9FF00]/60 transition-all duration-300"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative mb-6">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full h-14 bg-[#1A1A1A] border border-white/10 rounded-xl pl-12 pr-12 text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#D9FF00] hover:border-[#D9FF00]/60 transition-all duration-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#D9FF00] transition-colors duration-300"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <Eye className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full h-14 bg-[#D9FF00] text-black font-semibold text-lg rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(217,255,0,0.25)] transition-all duration-300">
                        Sign in
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* Footer */}
                    <p className="text-center text-[#A1A1AA] mt-8">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-[#D9FF00] font-semibold hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </section >
        </div >
    )
}

export default Login
