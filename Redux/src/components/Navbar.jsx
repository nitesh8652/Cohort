import { Search, Sun, Moon, Menu } from 'lucide-react'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useSidebar } from '../context/SidebarContext'

const Navbar = ({ search, onSearchChange }) => {
  const { theme, toggleTheme } = useTheme()
  const { openSidebar } = useSidebar()

  return (
    <nav className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center border-b border-neutral-200 bg-white/80 px-4 backdrop-blur-xl dark:border-amber-500/10 dark:bg-neutral-950/80 sm:px-6 lg:left-64">
      <div className="flex w-full items-center gap-3">
        <button
          onClick={openSidebar}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all duration-200 hover:border-amber-500/40 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400 lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative min-w-0 flex-1 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search your notes..."
            className="w-full rounded-lg border border-neutral-200 bg-neutral-100/70 py-2 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:border-amber-500/40 focus:bg-white focus:shadow-[0_0_16px_-6px_#f59e0b] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-amber-500/50 dark:focus:bg-neutral-800"
          />
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all duration-200 hover:border-amber-500/40 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
