// packages/frontend/src/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage  from './pages/LoginPage'
import Dashboard  from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index      element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login"  element={<LoginPage  />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
