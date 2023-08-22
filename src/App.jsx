
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Main from './components/layout/Main'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Order from './components/Order/Order'
import PrivetRoute from './components/Routes/PrivetRoute'



function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Register></Register>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/logout',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/orders',
          element: <PrivetRoute>
            <Order></Order>
          </PrivetRoute>
        }
      ]
    }

  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
