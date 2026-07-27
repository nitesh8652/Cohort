import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sun, Moon, Trash2, AlertTriangle, X, Check, Menu } from 'lucide-react'
import Left from '../../components/Left'
import { useTheme } from '../../context/ThemeContext'
import { useSidebar } from '../../context/SidebarContext'
import { clearNotes } from '../redux/notes.slice'
import { clearProjects } from '../redux/projects.slice'

const Settings = () => {
    const { theme, toggleTheme } = useTheme()
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes)
    const projects = useSelector(state => state.projects)
    const { openSidebar } = useSidebar()

    const [confirming, setConfirming] = useState(false)
    const [cleared, setCleared] = useState(false)

    const handleClearData = () => {
        dispatch(clearNotes())
        dispatch(clearProjects())
        localStorage.removeItem('notes')
        localStorage.removeItem('projects')
        setConfirming(false)
        setCleared(true)
        setTimeout(() => setCleared(false), 3000)
    }

    return (
        <>
            <Left />
            <main className="min-h-screen bg-neutral-50 pt-16 dark:bg-neutral-950 lg:ml-64">
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
                    <div className="mb-8 flex items-center gap-4">
                        <button
                            onClick={openSidebar}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 dark:border-amber-500/10 dark:text-neutral-400 lg:hidden"
                        >
                            <Menu className="h-4 w-4" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Settings</h1>
                            <p className="mt-1 text-sm text-neutral-500">Manage your workspace preferences</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-amber-500/10 dark:bg-neutral-900/60">
                            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Appearance</h2>
                            <p className="mt-1 text-sm text-neutral-500">Switch between light and dark mode</p>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-200 px-4 py-3 dark:border-amber-500/10">
                                <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                                    {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                                    <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-semibold text-neutral-950 hover:brightness-110"
                                >
                                    Switch to {theme === 'dark' ? 'light' : 'dark'}
                                </button>
                            </div>
                        </section>

                        <section className="rounded-xl border border-red-500/20 bg-white p-6 dark:bg-neutral-900/60">
                            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Data</h2>
                            <p className="mt-1 text-sm text-neutral-500">
                                You have {notes.length} notes and {projects.length} projects stored locally in this browser.
                            </p>

                            {!confirming && !cleared && (
                                <button
                                    onClick={() => setConfirming(true)}
                                    className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Clear all data
                                </button>
                            )}

                            {confirming && (
                                <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                            This will permanently delete all notes and projects from local storage. This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="mt-4 flex flex-wrap justify-end gap-3">
                                        <button
                                            onClick={() => setConfirming(false)}
                                            className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 hover:border-amber-500/30 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400"
                                        >
                                            <X className="h-4 w-4" />
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleClearData}
                                            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Yes, clear everything
                                        </button>
                                    </div>
                                </div>
                            )}

                            {cleared && (
                                <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-2.5 text-sm text-emerald-500">
                                    <Check className="h-4 w-4" />
                                    All data cleared
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Settings
