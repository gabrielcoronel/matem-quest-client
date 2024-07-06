import 'animate.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Root, Home, Campaign, Ranked, Profile, Ranking, Registration } from './screens'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="home/" element={<Home />}>
              <Route path="campaign" element={<Campaign />} />

              <Route path="ranked" element={<Ranked />} />
            </Route>

            <Route path="ranking" element={<Ranking />} />

            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="bottom-center" />
    </QueryClientProvider>
  </React.StrictMode>
)
