import { Zap, Globe, Camera, Briefcase, ScanFace } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.12] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D9FF00] rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" />
            </div>

            <h2 className="text-2xl font-bold">
              <span className="text-[#F5F5F5]">Sky</span>
              <span className="text-[#D9FF00]">Mart</span>
            </h2>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-[#A1A1AA]">
            <a href="#" className="hover:text-[#D9FF00] duration-300">
              Home
            </a>

            <a href="#" className="hover:text-[#D9FF00] duration-300">
              Shop
            </a>

            <a href="#" className="hover:text-[#D9FF00] duration-300">
              About
            </a>

            <a href="#" className="hover:text-[#D9FF00] duration-300">
              Contact
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 border border-white/[0.12] rounded-lg flex items-center justify-center text-[#A1A1AA] hover:bg-[#D9FF00] hover:text-black duration-300"
            >
              <Globe className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="w-10 h-10 border border-white/[0.12] rounded-lg flex items-center justify-center text-[#A1A1AA] hover:bg-[#D9FF00] hover:text-black duration-300"
            >
              <ScanFace className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="w-10 h-10 border border-white/[0.12] rounded-lg flex items-center justify-center text-[#A1A1AA] hover:bg-[#D9FF00] hover:text-black duration-300"
            >
              <Briefcase className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/[0.08] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#71717A]">
          <p>© Nitesh Salian. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D9FF00] duration-300">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-[#D9FF00] duration-300">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer