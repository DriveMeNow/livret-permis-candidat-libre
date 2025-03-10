import { useState } from "react";
export default function AuthPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Authentification</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-primary focus:border-primary"/>
          <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded-lg mb-4" />
          <button type="submit" className="w-full bg-primary text-white rounded-lg py-2">Se connecter</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Pas encore inscrit ?
          <Link to="/inscription" className="text-primary font-semibold"> Inscrivez-vous ici</Link>
        </p>
      </div>
    </div>
  );
}
export default AuthPage;
