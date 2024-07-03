import 'animate.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root, Home, Campaign, Ranked, Profile, Ranking, Registration } from './screens'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "/home/campaign",
            element: <Campaign />
          },
          {
            path: "/home/ranked",
            element: <Ranked />
          }
        ]
      },
      {
        path: "/ranking",
        element: <Ranking />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/registration",
        element: <Registration />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
