import { Zap, Package, Users, Star, Truck, ShieldCheck, HeartHandshake, BadgeCheck, ArrowRight } from "lucide-react"
import Navbar from "./Navbar"

const StatCard = ({ icon: Icon, value, subtitle }) => (
  <div className="bg-[#111111] border border-white/[0.12] rounded-3xl p-8 h-[170px] flex flex-col items-center justify-center text-center hover:-translate-y-[6px] hover:border-lime-300 hover:shadow-xl transition-all duration-300">
    <Icon className="w-8 h-8 text-[#D9FF00] mb-3" />
    <span className="text-3xl font-bold text-[#F5F5F5]">{value}</span>
    <span className="text-[#A1A1AA] text-sm mt-1">{subtitle}</span>
  </div>
)

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="bg-[#111111] border border-white/[0.12] rounded-2xl p-8 flex items-start gap-5 hover:-translate-y-1 hover:border-lime-300/60 transition-all duration-300">
    <div className="w-[52px] h-[52px] shrink-0 bg-[#1A2A1A] rounded-xl flex items-center justify-center">
      <Icon className="w-6 h-6 text-[#D9FF00]" />
    </div>
    <div>
      <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">{title}</h3>
      <p className="text-[#A1A1AA] text-sm leading-6">{description}</p>
    </div>
  </div>
)

const TeamCard = ({ name, role, bgColor }) => {
  const initial = name.charAt(0)
  return (
    <div className="bg-[#111111] border border-white/[0.12] rounded-2xl p-8 flex flex-col items-center text-center hover:-translate-y-1 hover:border-lime-300 transition-all duration-300">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${bgColor}`}>
        <span className="text-xl font-bold text-black">{initial}</span>
      </div>
      <h3 className="text-lg font-bold text-[#F5F5F5]">{name}</h3>
      <p className="text-[#A1A1AA] text-sm mt-1">{role}</p>
    </div>
  )
}

const About = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8">
        <Navbar activePage="About" />

        <section className="flex flex-col items-center py-16 text-center">
          <div className="w-20 h-20 bg-[#D9FF00] rounded-2xl flex items-center justify-center mb-6">
            <Zap className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-[#F5F5F5]">About </span>
            <span className="text-[#D9FF00]">SkyMart</span>
          </h1>
          <p className="text-[#A1A1AA] text-lg leading-8 max-w-[650px] mx-auto mt-4">
            SkyMart is a next-generation e-commerce platform built to make online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Package} value="20K+" subtitle="Products" />
          <StatCard icon={Users} value="50K+" subtitle="Happy Customers" />
          <StatCard icon={Star} value="4.9" subtitle="Avg. Rating" />
          <StatCard icon={Truck} value="99%" subtitle="On-time Delivery" />
        </div>

        <section className="bg-[#111111] border border-white/[0.12] rounded-3xl p-8 lg:p-12 mt-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-6">Our Story</h2>
          <div className="max-w-[900px] space-y-5 text-[#A1A1AA] text-base leading-7">
            <p>
              SkyMart started in 2022 as a small side project — two engineers tired of bloated, slow e-commerce
              experiences. We asked ourselves: what if shopping online was actually enjoyable?
            </p>
            <p>
              Three years later, SkyMart serves over 50,000 customers across the country. We stock electronics,
              fashion, jewelry, and everyday essentials — all at prices that don&apos;t require a second mortgage.
            </p>
            <p>
              We&apos;re still the same team at heart: obsessed with speed, transparency, and making you feel good
              about every purchase you make here.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#F5F5F5] mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ValueCard icon={ShieldCheck} title="Trust" description="Every product is verified for quality and authenticity before listing." />
            <ValueCard icon={Truck} title="Speed" description="We obsess over delivery times so your orders arrive when promised." />
            <ValueCard icon={HeartHandshake} title="Community" description="Built around real customer feedback, not just business metrics." />
            <ValueCard icon={BadgeCheck} title="Quality" description="We curate the best — no filler, no junk, just great products." />
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#F5F5F5] mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamCard name="Aryan Shah" role="Founder & CEO" bgColor="bg-[#D9FF00]" />
            <TeamCard name="Priya Mehta" role="Head of Product" bgColor="bg-blue-400" />
            <TeamCard name="Rohan Verma" role="Lead Engineer" bgColor="bg-purple-400" />
            <TeamCard name="Sneha Kapoor" role="Design Director" bgColor="bg-red-400" />
          </div>
        </section>

        <section className="bg-[#111111] border border-[#D9FF00] rounded-3xl p-10 lg:p-14 mt-20 flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4">Ready to shop?</h2>
          <p className="text-[#A1A1AA] text-lg mb-8">Explore thousands of products at unbeatable prices.</p>
          <button className="flex items-center gap-2 bg-[#D9FF00] text-black font-semibold px-8 py-4 rounded-full hover:scale-105 hover:brightness-105 hover:shadow-[0_0_30px_rgba(217,255,0,.25)] transition-all duration-300">
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      </div>
    </div>
  )
}

export default About
