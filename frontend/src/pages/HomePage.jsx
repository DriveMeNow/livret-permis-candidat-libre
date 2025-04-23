import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-[#fcedcc] min-h-screen flex flex-col">
      <header className="bg-black text-white py-6">
        <img src="https://res.cloudinary.com/dosumxjzj/image/upload/v1744160623/logo_1.png_smrbh2.png" alt="Logo DriveMeNow" className="mx-auto w-32 mb-3" />
        <h1 className="text-center text-xl font-extrabold">Bienvenue chez DriveMeNow</h1>
        <p className="text-center text-lg">Votre livret numérique et accompagnement personnalisé pour réussir le permis B en candidat libre.</p>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <section className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-4">Pourquoi choisir DriveMeNow ?</h2>
          <ul className="text-lg space-y-2">
            <li className="flex items-center justify-center gap-2">
              <CheckCircle className="text-orange-500" /> Économisez jusqu'à 70% comparé aux auto-écoles traditionnelles.
            </li>
            <li className="flex items-center justify-center gap-2">
              <CheckCircle className="text-orange-500" /> Un guide complet pour réussir votre permis sans stress.
            </li>
            <li className="flex items-center justify-center gap-2">
              <CheckCircle className="text-orange-500" /> Accompagnement administratif simplifié.
            </li>
            <li className="flex items-center justify-center gap-2">
              <CheckCircle className="text-orange-500" /> Préparez efficacement votre examen du code et de la conduite.
            </li>
          </ul>
        </section>

        <section className="flex justify-center mb-6">
          <Link to="/auth?mode=inscription">
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-black font-semibold py-2 px-6 rounded-xl shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95">
              Inscrivez-vous gratuitement
            </button>
          </Link>
        </section>
      </main>

      <footer className="bg-black text-white py-6 text-center">
        <p>© 2025 DriveMeNow. Tous droits réservés.</p>
        <Link to="/cgu" className="text-orange-400 hover:underline">Conditions générales d'utilisation</Link>
      </footer>
    </div>
  );
}
