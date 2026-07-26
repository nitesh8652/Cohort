import React, { useState } from 'react'
import { ArrowLeft, Save, X } from 'lucide-react'
import Left from '../../components/Left'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateNote } from '../redux/notes.slice'
import ReactQuill from 'react-quill-new'
import "react-quill-new/dist/quill.snow.css"

const EditNote = () => {
  const { id } = useParams()
  const note = useSelector(state => state.notes.find(n => n.id === id))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState(note?.title || '')
  const [Content, setContent] = useState(note?.preview || '')
  const [category, setCategory] = useState(note?.category || '')

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

  const handleSave = () => {
    if (!title.trim() || !note) return

    dispatch(updateNote({
      id: note.id,
      title: title.trim(),
      preview: Content || 'No content',
      category,
    }))
    navigate('/')
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-neutral-950">
        <Left />
        <main className="ml-64 pt-16 min-h-screen bg-neutral-950">
          <div className="mx-auto max-w-4xl px-8 py-8">
            <div className="text-center text-neutral-500">Note not found</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <Left />
      <main className="ml-64 pt-16 min-h-screen bg-neutral-950">
        <div className="mx-auto max-w-4xl px-8 py-8">
          <div className="mb-8 flex items-center gap-4">
            <Link to='/'>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/10 text-neutral-400 transition-all duration-200 hover:border-amber-500/30 hover:text-amber-400">
                <ArrowLeft className="h-4 w-4" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-neutral-100">Edit Note</h1>
              <p className="mt-1 text-sm text-neutral-500">Update your note</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-400">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full rounded-xl border border-amber-500/10 bg-neutral-900/60 px-5 py-3.5 text-lg text-neutral-100 placeholder-neutral-600 outline-none transition-all duration-200 focus:border-amber-500/40 focus:bg-neutral-900 focus:shadow-[0_0_20px_-8px_#f59e0b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-400">Content</label>
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
                <label className="mb-2 block text-sm font-medium text-neutral-400">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-amber-500/10 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-100 outline-none transition-all duration-200 focus:border-amber-500/40 focus:shadow-[0_0_20px_-8px_#f59e0b]"
                >
                  <option value="" disabled className="bg-neutral-900">Select project</option>
                  <option value="personal" className="bg-neutral-900">Personal</option>
                  <option value="work" className="bg-neutral-900">Work</option>
                  <option value="study" className="bg-neutral-900">Study</option>
                  <option value="ideas" className="bg-neutral-900">Ideas</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Link to='/'>
                <button className="flex items-center gap-2 rounded-lg border border-amber-500/10 px-5 py-2.5 text-sm font-medium text-neutral-400 transition-all duration-200 hover:border-amber-500/30 hover:text-amber-400">
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </Link>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.97]"
              >
                <Save className="h-4 w-4" />
                Update Note
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EditNote
