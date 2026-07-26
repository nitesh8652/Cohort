import { createSlice } from "@reduxjs/toolkit";

const loadNotes = () => {
  try {
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const initialState = loadNotes()

const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
        addNote: (state, action) => {
            state.unshift({ ...action.payload, pinned: false })
        },
        deleteNote: (state, action) => {
            return state.filter(note => note.id !== action.payload)
        },
        togglePin: (state, action) => {
            const note = state.find(n => n.id === action.payload)
            if (note) note.pinned = !note.pinned
        },
        updateNote: (state, action) => {
            const idx = state.findIndex(n => n.id === action.payload.id)
            if (idx !== -1) state[idx] = { ...state[idx], ...action.payload }
        }
    }
})

export const {addNote, deleteNote, togglePin, updateNote} = notesSlice.actions
export default notesSlice.reducer
