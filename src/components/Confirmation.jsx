import { motion } from 'framer-motion';

export default function Confirmation() {
  return (
    <motion.div
      className="text-center p-6 rounded-xl bg-green-100 shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-green-600">Inscription réussie !</h2>
      <p className="mt-3 text-gray-700">
        Vérifiez votre email pour activer votre compte et accéder à votre espace candidat.
      </p>
    </motion.div>
  );
}
