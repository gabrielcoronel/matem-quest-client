import 'animate.css'
import 'katex/dist/katex.min.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { PlayerProvider } from './contexts/player-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {
  Root,
  Home,
  Campaign,
  Ranked,
  Profile,
  Ranking,
  SignUp,
  LogIn,
  Gameplay,
  FactoringGameplay,
  RationalExpressionsGameplay,
  EquationsGameplay
} from './screens'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
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

            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/log-in" element={<LogIn />} />

            <Route path="gameplay/" element={<Gameplay />}>
              <Route path="factoring" element={<FactoringGameplay />} />

              <Route path="rational-expressions" element={<RationalExpressionsGameplay />} />

              <Route path="equations" element={<EquationsGameplay />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PlayerProvider>

      <Toaster position="bottom-center" />
    </QueryClientProvider>
  </React.StrictMode>
)
