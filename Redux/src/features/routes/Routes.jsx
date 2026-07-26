import { createBrowserRouter } from "react-router-dom"
import Body from "../../components/Body"
import Project from "../pages/Project"
import App from "../../App"
import CreateNote from "../pages/CreateNote"
import EditNote from "../pages/EditNote"

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
        path:'/projects',
        element: <Project />
    }
])