import React, { useState } from 'react'
import { ArrowLeft, Tag, Save, X, Plus, Menu } from 'lucide-react'
import Left from '../../components/Left'
import { useSidebar } from '../../context/SidebarContext'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import "react-quill-new/dist/quill.snow.css";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNote } from '../redux/notes.slice'
import { addProject } from '../redux/projects.slice'

const CreateNote = () => {

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["link", "code-block"],
            ["clean"],
        ]
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const projects = useSelector(state => state.projects)
    const { openSidebar } = useSidebar()

    const [title, setTitle] = useState('')
    const [projectId, setProjectId] = useState('')
    const [Content, setContent] = useState('')
    const [creatingProject, setCreatingProject] = useState(false)
    const [newProjectName, setNewProjectName] = useState('')

    const handleCreateProject = () => {
        if (!newProjectName.trim()) return
        const id = Date.now().toString()
        dispatch(addProject({ id, name: newProjectName.trim() }))
        setProjectId(id)
        setNewProjectName('')
        setCreatingProject(false)
    }

    const handleSave = () => {

        if (!title.trim()) return

        dispatch(addNote({
            id: Date.now().toString(),
            title: title.trim(),
            preview: Content || 'No content',
            date: 'Just now',
            color: 'amber',
            projectId: projectId || null,

        }))
        navigate('/')
    }


    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <Left />
            <main className="min-h-screen bg-neutral-50 pt-16 dark:bg-neutral-950 lg:ml-64">
                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
                    <div className="mb-8 flex items-center gap-4">
                        <button
                            onClick={openSidebar}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 dark:border-amber-500/10 dark:text-neutral-400 lg:hidden"
                        >
                            <Menu className="h-4 w-4" />
                        </button>
                        <Link to='/'>
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all duration-200 hover:border-amber-500/30 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400">
                                <ArrowLeft className="h-4 w-4" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Create Note</h1>
                            <p className="mt-1 text-sm text-neutral-500">Write down your thoughts</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-600 dark:text-neutral-400">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter note title..."
                                className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-3.5 text-lg text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:border-amber-500/40 focus:shadow-[0_0_20px_-8px_#f59e0b] dark:border-amber-500/10 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder-neutral-600 dark:focus:bg-neutral-900"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-600 dark:text-neutral-400">Content</label>
                            {/* <textarea
                                rows={14}
                                placeholder="Start writing your note..."
                                className="w-full resize-none rounded-xl border border-amber-500/10 bg-neutral-900/60 px-5 py-4 text-sm leading-relaxed text-neutral-100 placeholder-neutral-600 outline-none transition-all duration-200 focus:border-amber-500/40 focus:bg-neutral-900 focus:shadow-[0_0_20px_-8px_#f59e0b]"
                            /> */}

                            <ReactQuill
                                theme="snow"
                                value={Content}
                                onChange={setContent}
                                modules={modules}
                                placeholder="Write your content here..."
                                className="quill-editor"
                            />

                        </div>

                        <div className="flex gap-4">


                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-medium text-neutral-600 dark:text-neutral-400">Project</label>
                                <select
                                    value={projectId}
                                    onChange={(e) => {
                                        if (e.target.value === '__new__') {
                                            setCreatingProject(true)
                                        } else {
                                            setProjectId(e.target.value)
                                        }
                                    }}
                                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-all duration-200 focus:border-amber-500/40 focus:shadow-[0_0_20px_-8px_#f59e0b] dark:border-amber-500/10 dark:bg-neutral-900/60 dark:text-neutral-100"
                                >
                                    <option value="" className="bg-white dark:bg-neutral-900">No project</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id} className="bg-white dark:bg-neutral-900">
                                            {project.name}
                                        </option>
                                    ))}
                                    <option value="__new__" className="bg-white dark:bg-neutral-900">+ New project</option>
                                </select>

                                {creatingProject && (
                                    <div className="mt-3 flex items-center gap-2">
                                        <input
                                            autoFocus
                                            value={newProjectName}
                                            onChange={(e) => setNewProjectName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                                            placeholder="New project name..."
                                            className="flex-1 rounded-lg border border-neutral-200 bg-neutral-100/70 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-amber-500/40 dark:border-amber-500/10 dark:bg-neutral-900/50 dark:text-neutral-100 dark:placeholder-neutral-500"
                                        />
                                        <button
                                            onClick={handleCreateProject}
                                            className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-neutral-950 hover:brightness-110"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            Add
                                        </button>
                                        <button
                                            onClick={() => { setCreatingProject(false); setNewProjectName('') }}
                                            className="rounded-lg p-2 text-neutral-500 hover:text-amber-500 dark:hover:text-amber-400"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
                            <button className="flex items-center gap-2 rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-600 transition-all duration-200 hover:border-amber-500/30 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400">
                                <X className="h-4 w-4" />
                                Cancel
                            </button>
                            <button 
                            onClick={handleSave}
                            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.97]">
                                <Save className="h-4 w-4" />
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreateNote
