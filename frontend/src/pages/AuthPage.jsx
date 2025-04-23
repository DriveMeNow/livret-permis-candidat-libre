import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AuthLayout from '../components/AuthLayout';

export default function AuthPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'inscription' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(initialMode);

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

  return (
    <AuthLayout>
      <div className="flex rounded-lg overflow-hidden bg-[#feecc7] mb-6 shadow-lg">
        <button
          className={`w-1/2 py-2 font-semibold transition duration-300
          ${activeTab === 'login' ? 'bg-orange-500 text-white' : 'text-black hover:bg-orange-300'}`}
          onClick={() => setActiveTab('login')}
        >
          Connexion
        </button>
        <button
          className={`w-1/2 py-2 font-semibold transition duration-300
          ${activeTab === 'register' ? 'bg-orange-500 text-white' : 'text-black hover:bg-orange-300'}`}
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
    </AuthLayout>
  );
}
