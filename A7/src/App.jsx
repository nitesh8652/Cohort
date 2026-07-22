import MyRoutes from './routes/MyRoutes'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MyRoutes />
        <ToastContainer position="bottom-right" theme="dark" />
      </BrowserRouter>
    </>
  )
}

export default App