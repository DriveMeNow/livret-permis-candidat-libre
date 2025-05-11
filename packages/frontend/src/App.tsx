import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Le route parente va injecter ton Layout autour de toutes les pages */}
        <Route path="/" element={<Layout />}>

          {/* index => path="/" */}
          <Route index element={<HomePage />} />

          {/* /signup */}
          <Route path="signup" element={<SignUpPage />} />

          {/* /login */}
          <Route path="login" element={<LoginPage />} />

          {/* /dashboard avec contrôle d’accès */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ajoute ici tes autres pages si besoin… */}

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

