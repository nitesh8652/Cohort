import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notes.slice";

export const store = configureStore({
    reducer:{
        notes: notesReducer
    }
})

store.subscribe(() => {
    try {
        const notes = store.getState().notes
        localStorage.setItem('notes', JSON.stringify(notes))
    } catch (e) {
        console.error('Failed to persist notes', e)
    }
})