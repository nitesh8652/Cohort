import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Clock, FolderKanban, Pin, PinOff, Pencil, Trash2, Menu } from 'lucide-react'
import Left from '../../components/Left'
import { useSidebar } from '../../context/SidebarContext'
import { deleteNote, togglePin } from '../redux/notes.slice'
import "react-quill-new/dist/quill.snow.css"

const Note = () => {
  const { id } = useParams()
  const note = useSelector(state => state.notes.find(n => n.id === id))
  const project = useSelector(state => state.projects.find(p => p.id === note?.projectId))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { openSidebar } = useSidebar()

  if (!note) {
    return (
      <>
        <Left />
        <main className="min-h-screen bg-neutral-50 pt-16 dark:bg-neutral-950 lg:ml-64">
          <div className="mx-auto max-w-4xl px-4 py-8 text-center text-neutral-500 sm:px-8">
            Note not found
          </div>
        </main>
      </>
    )
  }

  const handleDelete = () => {
    dispatch(deleteNote(note.id))
    navigate('/notes')
  }

  return (
    <>
      <Left />
      <main className="min-h-screen bg-neutral-50 pt-16 dark:bg-neutral-950 lg:ml-64">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <button
              onClick={openSidebar}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 dark:border-amber-500/10 dark:text-neutral-400 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <Link to='/notes'>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all duration-200 hover:border-amber-500/30 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400">
                <ArrowLeft className="h-4 w-4" />
              </button>
            </Link>
            <div className="flex-1" />
            <button
              onClick={() => dispatch(togglePin(note.id))}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 ${
                note.pinned
                  ? 'border-amber-500/40 text-amber-500 hover:bg-amber-500/10 dark:text-amber-400'
                  : 'border-neutral-200 text-neutral-500 hover:border-amber-500/30 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400'
              }`}
            >
              {note.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </button>
            <button
              onClick={() => navigate(`/edit-note/${note.id}`)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all duration-200 hover:border-amber-500/30 hover:text-amber-500 dark:border-amber-500/10 dark:text-neutral-400 dark:hover:text-amber-400"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all duration-200 hover:border-red-500/30 hover:text-red-400 dark:border-amber-500/10 dark:text-neutral-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <h1 className="break-words text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">{note.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{note.date}</span>
            </div>
            {project && (
              <Link to={`/projects/${project.id}`}>
                <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-500 hover:bg-amber-500/20 dark:text-amber-400">
                  <FolderKanban className="h-3.5 w-3.5" />
                  {project.name}
                </div>
              </Link>
            )}
          </div>

          <div className="quill-editor mt-6 rounded-xl border border-neutral-200 dark:border-amber-500/10">
            <div
              className="ql-editor"
              style={{ minHeight: 'auto' }}
              dangerouslySetInnerHTML={{ __html: note.preview || 'No content' }}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default Note
