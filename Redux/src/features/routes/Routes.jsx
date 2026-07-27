import { createBrowserRouter } from "react-router-dom"
import Body from "../../components/Body"
import Project from "../pages/Project"
import App from "../../App"
import CreateNote from "../pages/CreateNote"
import EditNote from "../pages/EditNote"
import Settings from "../pages/Settings"
import Note from "../pages/Note"

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />
    },
    {
        path:'/notes',
        element: <Body />
    },
    {
        path:'/create-note',
        element: <CreateNote />
    },
    {
        path:'/edit-note/:id',
        element: <EditNote />
    },
    {
        path:'/note/:id',
        element: <Note />
    },
    {
        path:'/projects',
        element: <Project />
    },
    {
        path:'/projects/:id',
        element: <Project />
    },
    {
        path:'/settings',
        element: <Settings />
    }
])