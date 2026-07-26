import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNote, togglePin } from '../features/redux/notes.slice'
import { FileText, Clock, Trash2, Pin, PinOff, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Left from './Left'
import Navbar from './Navbar'

const Body = () => {
  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const sorted = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  return (
<>
    <Left/>
    <Navbar/>
    
    <main className="ml-64 pt-16 min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-6xl px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-100">All Notes</h1>
            <p className="mt-1 text-sm text-neutral-500">{notes.length} notes</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((note) => (
            <div
              key={note.id}
              className={`group relative rounded-xl border p-5 transition-all duration-300 hover:shadow-[0_0_12px_-6px_#f59e0b] ${
                note.pinned
                  ? 'border-amber-500/30 bg-amber-900/20 hover:bg-amber-900/30'
                  : 'border-amber-500/10 bg-neutral-900/60 hover:border-amber-500/30 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                  <FileText className="h-4 w-4 text-amber-400" />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => dispatch(togglePin(note.id))}
                    className={`rounded-lg p-1.5 opacity-0 transition-all duration-200 group-hover:opacity-100 ${
                      note.pinned
                        ? 'text-amber-400 hover:bg-amber-500/20'
                        : 'text-neutral-600 hover:bg-amber-500/10 hover:text-amber-400'
                    }`}
                  >
                    {note.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => navigate(`/edit-note/${note.id}`)}
                    className="rounded-lg p-1.5 text-neutral-600 opacity-0 transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-400 group-hover:opacity-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => dispatch(deleteNote(note.id))}
                    className="rounded-lg p-1.5 text-neutral-600 opacity-0 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="mt-4 font-medium text-neutral-100 transition-colors group-hover:text-amber-400">
                {note.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                {note.preview}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-600">
                <Clock className="h-3.5 w-3.5" />
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
</>
  )
}

export default Body
