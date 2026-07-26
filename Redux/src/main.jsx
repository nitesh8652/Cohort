import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Router, RouterProvider } from 'react-router-dom'
import { router } from './features/routes/Routes.jsx'
import { Provider } from 'react-redux'
import { store } from './features/redux/store'

createRoot(document.getElementById('root')).render(
  
<Provider store={store}>
<RouterProvider router={router} />
</Provider>

  
)
