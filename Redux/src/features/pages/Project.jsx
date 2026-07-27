import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FolderKanban, Plus, Trash2, ArrowLeft, FileText, FolderPlus, X, Menu } from 'lucide-react'
import Left from '../../components/Left'
import { useSidebar } from '../../context/SidebarContext'
import { addProject, deleteProject } from '../redux/projects.slice'
import { moveNoteToProject } from '../redux/notes.slice'

const stripHtml = (html) => {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || '').replace(/\s+/g, ' ').trim()
}

const ProjectList = () => {
  const projects = useSelector(state => state.projects)
  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const { openSidebar } = useSidebar()

  const noteCount = (projectId) => notes.filter(n => n.projectId === projectId).length

  const handleCreate = () => {
    if (!name.trim()) return
    const id = Date.now().toString()
    dispatch(addProject({ id, name: name.trim() }))
    setName('')
    setCreating(false)
    navigate(`/projects/${id}`)
  }

  return (
    <main className="min-h-screen bg-neutral-50 pt-16 dark:bg-neutral-950 lg:ml-64">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={openSidebar}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 dark:border-amber-500/10 dark:text-neutral-400 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Projects</h1>
              <p className="mt-1 text-sm text-neutral-500">{projects.length} projects</p>
            </div>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.97]"
          >
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>

        {creating && (
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-amber-500/30 bg-white p-4 dark:border-amber-500/20 dark:bg-neutral-900/60">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="Project name..."
              className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-neutral-100/70 px-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-amber-500/40 dark:border-amber-500/10 dark:bg-neutral-900/50 dark:text-neutral-100 dark:placeholder-neutral-500"
            />
            <button
              onClick={handleCreate}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-950 hover:brightness-110"
            >
              Create
            </button>
            <button
              onClick={() => { setCreating(false); setName('') }}
              className="rounded-lg p-2 text-neutral-500 hover:text-amber-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {projects.length === 0 && !creating && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-amber-500/30 py-20 text-center dark:border-amber-500/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
              <FolderPlus className="h-7 w-7 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">No projects yet</h2>
              <p className="mt-1 text-sm text-neutral-500">Create one to group similar notes together</p>
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="group relative cursor-pointer rounded-xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-amber-500/30 hover:bg-neutral-50 hover:shadow-[0_0_12px_-6px_#f59e0b] dark:border-amber-500/10 dark:bg-neutral-900/60 dark:hover:bg-neutral-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                  <FolderKanban className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); dispatch(deleteProject(project.id)) }}
                  className="rounded-lg p-1.5 text-neutral-400 opacity-100 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 dark:text-neutral-600 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-4 font-medium text-neutral-900 transition-colors group-hover:text-amber-500 dark:text-neutral-100 dark:group-hover:text-amber-400">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">{noteCount(project.id)} notes</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

const ProjectDetail = ({ projectId }) => {
  const project = useSelector(state => state.projects.find(p => p.id === projectId))
  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [adding, setAdding] = useState(false)
  const { openSidebar } = useSidebar()

  const projectNotes = notes.filter(n => n.projectId === projectId)
  const otherNotes = notes.filter(n => n.projectId !== projectId)

  if (!project) {
    return (
      <main className="min-h-screen bg-neutral-50 pt-16 dark:bg-neutral-950 lg:ml-64">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-neutral-500 sm:px-8">
          Project not found
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-50 pt-16 dark:bg-neutral-950 lg:ml-64">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <button
            onClick={openSidebar}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 dark:border-amber-500/10 dark:text-neutral-400 lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <Link to='/projects'>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all duration-200 hover:border-amber-500/30 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{project.name}</h1>
            <p className="mt-1 text-sm text-neutral-500">{projectNotes.length} notes</p>
          </div>
          <button
            onClick={() => setAdding(v => !v)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.97]"
          >
            <Plus className="h-4 w-4" />
            Add Note
          </button>
        </div>

        {adding && (
          <div className="mb-8 rounded-xl border border-amber-500/30 bg-white p-4 dark:border-amber-500/20 dark:bg-neutral-900/60">
            <p className="mb-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">Add an existing note to this project</p>
            {otherNotes.length === 0 ? (
              <p className="text-sm text-neutral-500">No other notes available.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {otherNotes.map(note => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-neutral-100/60 px-4 py-2.5 dark:border-amber-500/10 dark:bg-neutral-900/50"
                  >
                    <div className="flex min-w-0 items-center gap-2 text-sm text-neutral-800 dark:text-neutral-200">
                      <FileText className="h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" />
                      <span className="truncate">{note.title}</span>
                    </div>
                    <button
                      onClick={() => dispatch(moveNoteToProject({ noteId: note.id, projectId }))}
                      className="shrink-0 rounded-lg px-3 py-1 text-xs font-semibold text-amber-500 hover:bg-amber-500/10 dark:text-amber-400"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {projectNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-amber-500/30 py-20 text-center dark:border-amber-500/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
              <FileText className="h-7 w-7 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">No notes in this project</h2>
              <p className="mt-1 text-sm text-neutral-500">Add an existing note or create a new one</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projectNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => navigate(`/note/${note.id}`)}
                className="group relative cursor-pointer rounded-xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-amber-500/30 hover:bg-neutral-50 hover:shadow-[0_0_12px_-6px_#f59e0b] dark:border-amber-500/10 dark:bg-neutral-900/60 dark:hover:bg-neutral-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                    <FileText className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); dispatch(moveNoteToProject({ noteId: note.id, projectId: null })) }}
                    className="rounded-lg p-1.5 text-neutral-400 opacity-100 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 dark:text-neutral-600 sm:opacity-0 sm:group-hover:opacity-100"
                    title="Remove from project"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-4 font-medium text-neutral-900 dark:text-neutral-100">{note.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">{stripHtml(note.preview)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

const Project = () => {
  const { id } = useParams()

  return (
    <>
      <Left />
      {id ? <ProjectDetail projectId={id} /> : <ProjectList />}
    </>
  )
}

export default Project
