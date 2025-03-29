import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-[#fcedcc] min-h-screen flex flex-col">

      <header className="bg-black text-white py-6">
        <img src="/images/mon_logo.png.png" alt="Logo DriveMeNow" className="mx-auto w-32 mb-3" />
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
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-black shadow-md' : 'text-black hover:bg-orange-200' font-semibold py-2 px-6 rounded-xl shadow-lg  transition duration-200 ease-in-out transform hover:scale-105 active:scale-95">
              Inscrivez-vous gratuitement
            </button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">Accompagnement administratif</h3>
            <p>Simplifiez vos démarches ANTS et évitez les erreurs administratives.</p>
            <Link to="/tarifs" className="mt-4 inline-block text-orange-400 font-bold hover:underline">Découvrir →</Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">Code de la route</h3>
            <p>Accédez à une préparation complète pour réussir votre examen théorique.</p>
            <Link to="/tarifs" className="mt-4 inline-block text-orange-400 font-bold hover:underline">Découvrir →</Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">Préparation à la conduite</h3>
            <p>Progressez efficacement grâce à notre méthode pédagogique unique.</p>
            <Link to="/tarifs" className="mt-4 inline-block text-orange-400 font-bold hover:underline">Découvrir →</Link>
          </div>

        </section>

      </main>

      <footer className="bg-black text-white py-6 text-center">
        <p>© 2025 DriveMeNow. Tous droits réservés.</p>
        <p><Link to="/cgu" className="text-orange-400 hover:underline">Conditions générales d'utilisation</Link></p>
      </footer>

    </div>
  );
}