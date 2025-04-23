import { motion } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <div className="bg-[#fcedcc] min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[420px] bg-black rounded-xl shadow-2xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <img
            src="https://res.cloudinary.com/dosumxjzj/image/upload/v1744160623/logo_1.png_smrbh2.png"
            alt="Logo DriveMeNow"
            className="mx-auto w-32 mb-3"
          />
          <h1 className="text-gray-200 font-semibold">
            Bienvenue ! Rejoignez DriveMeNow pour réussir votre permis B en candidat libre.
          </h1>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
