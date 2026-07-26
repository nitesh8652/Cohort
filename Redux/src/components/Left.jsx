import React from 'react'
import { Plus, FolderKanban, StickyNotesIcon, Pen, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

const Left = () => {
    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-amber-500/10 bg-neutral-950/90 backdrop-blur-xl">
            <div className="flex  items-center gap-3 border-b border-amber-500/10 px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-400">
                        <Pen />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className="text-lg font-semibold tracking-tight text-neutral-100">
                        NotePen
                    </span>
                    <span className="text-xs font-light tracking-tight text-neutral-100">
                        Your Personal Workspace
                    </span>

                </div>
            </div>

            <div className="flex flex-1 flex-col gap-2 px-4 pt-6">

                <Link to='/create-note'>
                    <button className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.97]">
                        <Plus className="h-5 w-5" />
                        Create Note
                    </button>

                </Link>

                <Link to='/notes'>
                    <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-400 transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-400 active:scale-[0.97]">
                        <StickyNotesIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        <span>Notes</span>
                    </button>

                </Link>


                <Link to='/projects'>

                    <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-400 transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-400 active:scale-[0.97]">
                        <FolderKanban className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        <span>Projects</span>
                    </button>
                </Link>

                <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-400 transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-400 active:scale-[0.97]">
                    <Settings className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    )
}

export default Left
