import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNote, togglePin } from '../features/redux/notes.slice'
import { FileText, Clock, Trash2, Pin, PinOff, Pencil, StickyNote, Plus } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import Left from './Left'
import Navbar from './Navbar'

const stripHtml = (html) => {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || '').replace(/\s+/g, ' ').trim()
}

const Body = () => {
  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = React.useState('')

  const query = search.trim().toLowerCase()
  const filtered = query
    ? notes.filter(note =>
        note.title?.toLowerCase().includes(query) ||
        note.preview?.toLowerCase().includes(query)
      )
    : notes

  const sorted = [...filtered].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  return (
<>
    <Left/>
    <Navbar search={search} onSearchChange={setSearch}/>

    <main className="min-h-screen bg-neutral-50 pt-16 dark:bg-neutral-950 lg:ml-64">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">All Notes</h1>
            <p className="mt-1 text-sm text-neutral-500">{sorted.length} notes</p>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-amber-500/30 py-20 text-center dark:border-amber-500/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
              <StickyNote className="h-7 w-7 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">No notes yet</h2>
              <p className="mt-1 text-sm text-neutral-500">Create one to continue</p>
            </div>
            <Link to="/create-note">
              <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.97]">
                <Plus className="h-4 w-4" />
                Create Note
              </button>
            </Link>
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-sm text-neutral-500">No notes match your search.</p>
        ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((note) => (
            <div
              key={note.id}
              onClick={() => navigate(`/note/${note.id}`)}
              className={`group relative cursor-pointer rounded-xl border p-5 transition-all duration-300 hover:shadow-[0_0_12px_-6px_#f59e0b] ${
                note.pinned
                  ? 'border-amber-500/40 bg-amber-100/60 hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-900/20 dark:hover:bg-amber-900/30'
                  : 'border-neutral-200 bg-white hover:border-amber-500/30 hover:bg-neutral-50 dark:border-amber-500/10 dark:bg-neutral-900/60 dark:hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                  <FileText className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                </div>
                <div className="flex gap-1 opacity-100 transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); dispatch(togglePin(note.id)) }}
                    className={`rounded-lg p-1.5 transition-all duration-200 ${
                      note.pinned
                        ? 'text-amber-500 hover:bg-amber-500/20 dark:text-amber-400'
                        : 'text-neutral-400 hover:bg-amber-500/10 hover:text-amber-500 dark:text-neutral-600 dark:hover:text-amber-400'
                    }`}
                  >
                    {note.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/edit-note/${note.id}`) }}
                    className="rounded-lg p-1.5 text-neutral-400 transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-500 dark:text-neutral-600 dark:hover:text-amber-400"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); dispatch(deleteNote(note.id)) }}
                    className="rounded-lg p-1.5 text-neutral-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 dark:text-neutral-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="mt-4 font-medium text-neutral-900 transition-colors group-hover:text-amber-500 dark:text-neutral-100 dark:group-hover:text-amber-400">
                {note.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                {stripHtml(note.preview)}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-600">
                <Clock className="h-3.5 w-3.5" />
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </main>
</>
  )
}

export default Body
