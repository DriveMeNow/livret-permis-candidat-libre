import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'inscription' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(initialMode);

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:p-0 bg-[#fcedcc]">
      <motion.div
        className="w-full max-w-[420px] bg-black rounded-xl shadow-2xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <img src="/images/mon_logo.png.png" alt="Logo DriveMeNow" className="mx-auto w-32 mb-3" />
          <h1 className="text-gray-200 font-semibold">
            Bienvenue ! Rejoignez DriveMeNow pour accéder à votre guide complet et votre livret d'apprentissage personnalisé pour réussir le permis de conduire en candidat libre. Inscrivez-vous ou connectez-vous dès maintenant.
          </h1>
        </div>

        <div className="flex rounded-lg overflow-hidden bg-[#feecc7] mb-4 shadow-lg">
          <button
            className={`w-1/2 py-2 text-base font-semibold transition duration-300 ease-in-out
            ${activeTab === 'login' ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-black shadow-md' : 'text-black hover:bg-orange-200'}`}
            onClick={() => setActiveTab('login')}
          >
            Connexion
          </button>
          <button
            className={`w-1/2 py-2 text-base font-semibold transition duration-300 ease-in-out
            ${activeTab === 'register' ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-black shadow-md' : 'text-black hover:bg-orange-200'}`}
            onClick={() => setActiveTab('register')}
          >
            Inscription
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'login' ? (
            <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoginForm />
            </motion.div>
          ) : (
            <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RegisterForm />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
