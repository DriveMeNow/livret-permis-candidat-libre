export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Bienvenue sur DriveMeNow !</h1>
      <p className="mt-4 text-gray-700">Votre permis en candidat libre simplifié.</p>
      <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Commencer maintenant
      </button>
    </div>
  );
}
import Navbar from '../components/Navbar';
