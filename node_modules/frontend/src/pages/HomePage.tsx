import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../services/api'
import { CheckCircle } from 'lucide-react'

export default function HomePage() {
  // récupère depuis le store les setters de la modale
  const setAuthMode = useAuthStore((s) => s.setAuthMode)
  const setAuthModalOpen = useAuthStore((s) => s.setAuthModalOpen)

  const openModal = useAuthStore((s) => () => {
    s.setAuthMode('signup')
    s.setAuthModalOpen(true)
  })

  return (
    <>
      {/* Section Pourquoi choisir */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Pourquoi choisir DriveMeNow ?
        </h2>
        <ul className="text-lg space-y-2">
          {[
            "Économisez jusqu'à 70% comparé aux auto-écoles.",
            "Un guide complet pour réussir sans stress.",
            "Accompagnement administratif simplifié.",
            "Préparez efficacement votre examen du code et de la conduite."
          ].map((text) => (
            <li key={text} className="flex items-center justify-center gap-2">
              <CheckCircle className="text-orange-500" size={20} />
              {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Bouton d’inscription qui ouvre la modale */}
      <section className="flex justify-center mb-6">
        <button
          onClick={openModal}
          className="
            bg-gradient-to-r
            from-orange-400 to-orange-500
            text-black font-semibold
            py-2 px-6 rounded-xl shadow-lg
            transition duration-200 ease-in-out transform
            hover:scale-105 active:scale-95
          "
        >
          Inscrivez-vous gratuitement
        </button>
      </section>

      {/* Les trois cartes */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Accompagnement administratif",
            desc:  "Simplifiez vos démarches ANTS et évitez les erreurs."
          },
          {
            title: "Code de la route",
            desc:  "Préparez votre examen théorique en toute sérénité."
          },
          {
            title: "Préparation à la conduite",
            desc:  "Progressez efficacement grâce à notre méthode unique."
          }
        ].map(({ title, desc }) => (
          <div key={title} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p>{desc}</p>
            <Link
              to="/tarifs"
              className="mt-4 inline-block text-orange-400 font-bold hover:underline"
            >
              Découvrir →
            </Link>
          </div>
        ))}
      </section>
    </>
  )
}
