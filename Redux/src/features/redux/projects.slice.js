import { createSlice } from "@reduxjs/toolkit";

const loadProjects = () => {
  try {
    const saved = localStorage.getItem('projects')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const initialState = loadProjects()

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.unshift(action.payload)
    },
    deleteProject: (state, action) => {
      return state.filter(project => project.id !== action.payload)
    },
    renameProject: (state, action) => {
      const project = state.find(p => p.id === action.payload.id)
      if (project) project.name = action.payload.name
    },
    clearProjects: () => {
      return []
    }
  }
})

export const { addProject, deleteProject, renameProject, clearProjects } = projectsSlice.actions
export default projectsSlice.reducer
