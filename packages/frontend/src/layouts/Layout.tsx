// packages/frontend/src/layouts/Layout.tsx
import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { User } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import AuthModal from '../components/AuthModal'

export default function Layout() {
  const setAuthModalOpen = useAuthStore(s => s.setAuthModalOpen)

  return (
    <div className="flex flex-col min-h-screen bg-brand-light">
      <header className="relative bg-black text-white py-6">
        <button
          onClick={() => setAuthModalOpen(true)}
          className="absolute top-4 right-4 text-white hover:text-orange-400"
          aria-label="Se connecter"
        >
          <User size={28} />
        </button>
        <img
          src="https://res.cloudinary.com/dosumxjzj/image/upload/v1744160623/logo_1.png_smrbh2.png"
          alt="Logo DriveMeNow"
          className="mx-auto w-32 mb-3"
        />
        <h1 className="text-center text-xl font-extrabold">
          Bienvenue chez DriveMeNow
        </h1>
        <p className="text-center text-lg">
          Votre livret numérique et accompagnement personnalisé pour réussir
          le permis B en candidat libre.
        </p>
      </header>

      <AuthModal />

      <main className="container mx-auto px-4 py-12 flex-1 text-black">
        <Outlet />
      </main>

      <footer className="bg-black text-white py-6 text-center">
        <p>© 2025 DriveMeNow. Tous droits réservés.</p>
        <p>
          <Link to="/cgu" className="text-orange-400 hover:underline">
            Conditions générales d'utilisation
          </Link>
        </p>
      </footer>
    </div>
  )
}
