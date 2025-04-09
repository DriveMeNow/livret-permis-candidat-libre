import { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const { data } = await axios.get('https://livret-numerique-permisb-candidat-libre.onrender.com/api/csrf-token');
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
      } catch (error) {
        console.error('Erreur récupération CSRF:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleCaptchaChange = (value) => setCaptcha(value);

  const passwordCriteria = {
    length: password.length >= 9,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  
    if (!captcha || !isPasswordValid || password !== confirmPassword) {
      return;
    }
  
    const otp = generateOTP(); // Génération OTP claire et explicite
    try {
      await axios.post('https://livret-numerique-permisb-candidat-libre.onrender.com/api/mail/send-registration-email', { email, otp });
      alert('Inscription réussie, vérifiez votre email pour récupérer le code OTP.');
  
      // Redirection automatique vers la page de connexion après l'inscription réussie
      navigate('/auth?mode=login');
  
    } catch (error) {
      alert("Erreur lors de l'envoie de l'email.");
    }
  }; 

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-center text-xl text-white font-bold">INSCRIPTION</h2>

      <div>
        <label className="block text-white font-medium mb-1">Email :</label>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-orange-400"
          required
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-1">Mot de passe :</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-orange-400"
            required
          />
          <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} className="text-orange-400" /> : <Eye size={20} className="text-orange-400" />}
          </button>
        </div>
        <ul className="text-sm text-gray-300 mt-1">
          <li>{passwordCriteria.length ? "✅" : "❌"} Min. 9 caractères</li>
          <li>{passwordCriteria.uppercase ? "✅" : "❌"} 1 majuscule</li>
          <li>{passwordCriteria.lowercase ? "✅" : "❌"} 1 minuscule</li>
          <li>{passwordCriteria.number ? "✅" : "❌"} 1 chiffre</li>
        </ul>
      </div>

      <div>
        <label className="block text-white font-medium mb-1">Confirmer le mot de passe :</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-orange-400"
            required
          />
          <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff size={20} className="text-orange-400" /> : <Eye size={20} className="text-orange-400" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <input type="checkbox" id="cgu" required className="mr-2" />
        <label htmlFor="cgu" className="text-sm text-gray-300">
          J'accepte les <a href="/cgu" target="_blank" className="text-orange-400 underline">conditions générales d'utilisation</a>
        </label>
      </div>

      <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} className="flex justify-center" />

      <div className="flex justify-center pt-4">
        <button type="submit" className="px-8 bg-[#feecc7] hover:bg-orange-400 text-black rounded-lg py-2 font-semibold text-base">
          S'inscrire
        </button>
      </div>
    </form>
  );
}
