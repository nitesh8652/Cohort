import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notes.slice";
import projectsReducer from "./projects.slice";

export const store = configureStore({
    reducer:{
        notes: notesReducer,
        projects: projectsReducer
    }
})

store.subscribe(() => {
    try {
        const state = store.getState()
        localStorage.setItem('notes', JSON.stringify(state.notes))
        localStorage.setItem('projects', JSON.stringify(state.projects))
    } catch (e) {
        console.error('Failed to persist state', e)
    }
})
