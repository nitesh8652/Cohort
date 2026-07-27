import React, { useState } from 'react'
import { Plus, FolderKanban, Folder, StickyNotesIcon, Pen, Settings as SettingsIcon, ChevronDown, ChevronRight, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSidebar } from '../context/SidebarContext'

const Left = () => {
    const projects = useSelector(state => state.projects)
    const location = useLocation()
    const [projectsOpen, setProjectsOpen] = useState(true)
    const { isOpen, closeSidebar } = useSidebar()

    return (
        <>
            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-neutral-200 bg-white backdrop-blur-xl transition-transform duration-300 dark:border-amber-500/10 dark:bg-neutral-950 lg:translate-x-0 lg:bg-white/90 lg:dark:bg-neutral-950/90 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center gap-3 border-b border-neutral-200 px-6 py-5 dark:border-amber-500/10">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-500 dark:text-amber-400">
                            <Pen />
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                            NotePen
                        </span>
                        <span className="text-xs font-light tracking-tight text-neutral-500 dark:text-neutral-400">
                            Your Personal Workspace
                        </span>

                    </div>
                    <button
                        onClick={closeSidebar}
                        className="rounded-lg p-1.5 text-neutral-500 hover:bg-amber-500/10 hover:text-amber-500 dark:text-neutral-400 dark:hover:text-amber-400 lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pt-6">

                    <Link to='/create-note' onClick={closeSidebar}>
                        <button className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.97]">
                            <Plus className="h-5 w-5" />
                            Create Note
                        </button>

                    </Link>

                    <Link to='/notes' onClick={closeSidebar}>
                        <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-600 transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-500 active:scale-[0.97] dark:text-neutral-400 dark:hover:text-amber-400">
                            <StickyNotesIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                            <span>Notes</span>
                        </button>

                    </Link>


                    <div className="flex items-center gap-1">
                        <Link to='/projects' className="flex-1" onClick={closeSidebar}>
                            <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-600 transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-500 active:scale-[0.97] dark:text-neutral-400 dark:hover:text-amber-400">
                                <FolderKanban className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                                <span>Projects</span>
                            </button>
                        </Link>
                        <button
                            onClick={() => setProjectsOpen(v => !v)}
                            className="rounded-lg p-2 text-neutral-500 transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-500 dark:hover:text-amber-400"
                        >
                            {projectsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                    </div>

                    {projectsOpen && (
                        <div className="ml-4 flex flex-col gap-1 border-l border-neutral-200 pl-3 dark:border-amber-500/10">
                            {projects.length === 0 ? (
                                <span className="px-3 py-2 text-xs text-neutral-400 dark:text-neutral-600">No projects yet</span>
                            ) : (
                                projects.map((project) => {
                                    const active = location.pathname === `/projects/${project.id}`
                                    return (
                                        <Link key={project.id} to={`/projects/${project.id}`} onClick={closeSidebar}>
                                            <button
                                                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                                                    active
                                                        ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400'
                                                        : 'text-neutral-500 hover:bg-amber-500/10 hover:text-amber-500 dark:hover:text-amber-400'
                                                }`}
                                            >
                                                <Folder className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                                                <span className="truncate">{project.name}</span>
                                            </button>
                                        </Link>
                                    )
                                })
                            )}
                        </div>
                    )}

                    <Link to='/settings' onClick={closeSidebar}>
                        <button
                            className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                                location.pathname === '/settings'
                                    ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400'
                                    : 'text-neutral-600 hover:bg-amber-500/10 hover:text-amber-500 dark:text-neutral-400 dark:hover:text-amber-400'
                            }`}
                        >
                            <SettingsIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                            <span>Settings</span>
                        </button>
                    </Link>
                </div>
            </aside>
        </>
    )
}

export default Left
