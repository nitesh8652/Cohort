import { Pen } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 pt-[23px] right-0 left-64 z-30  bg-neutral-950/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            placeholder="Search your notes..."
            className="w-full rounded-lg border border-amber-500/10 bg-neutral-900/50 py-2 pl-10 pr-4 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all duration-200 focus:border-amber-500/40 focus:bg-neutral-900 focus:shadow-[0_0_16px_-6px_#f59e0b]"
          />
        </div>

        
      </div>
    </nav>
  )
}

export default Navbar
