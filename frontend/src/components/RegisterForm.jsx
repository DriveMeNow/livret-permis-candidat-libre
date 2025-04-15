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
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/csrf-token`);
        axios.defaults.headers.common['X-CSRF-Token'] = data.csrfToken;
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Erreur récupération CSRF:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const passwordCriteria = {
    length: password.length >= 9,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
  const handleCaptchaChange = (value) => setCaptcha(value);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captcha || !isPasswordValid || password !== confirmPassword) return;

    const otp = generateOTP();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/mail/send-registration-email`, { email, otp });
      alert("Inscription réussie, vérifiez votre email.");
      navigate('/auth?mode=login');
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      alert("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-center text-xl text-white font-bold">INSCRIPTION</h2>

      <div>
        <label className="block text-white font-medium mb-1">Email :</label>
        <input type="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-lg border border-gray-300" required />
      </div>

      <div>
        <label className="block text-white font-medium mb-1">Mot de passe :</label>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} placeholder="Votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded-lg border border-gray-300" required />
          <button type="button" className="absolute inset-y-0 right-0 px-3" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff className="text-orange-400" /> : <Eye className="text-orange-400" />}
          </button>
        </div>
        <ul className="text-sm text-gray-300 mt-1">
          {Object.entries(passwordCriteria).map(([criteria, valid]) => (
            <li key={criteria}>{valid ? "✅" : "❌"} {criteria}</li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <label className="block text-white font-medium mb-1">Confirmer le mot de passe :</label>
        <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmez votre mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 rounded-lg border border-gray-300" required />
        <button type="button" className="absolute inset-y-0 right-0 px-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <EyeOff className="text-orange-400" /> : <Eye className="text-orange-400" />}
        </button>
      </div>

      <div className="flex items-center justify-center mb-6">
        <input type="checkbox" id="cgu" required className="mr-2" />
        <label htmlFor="cgu" className="text-sm text-gray-300">
          J'accepte les <a href="/cgu" className="text-orange-400 underline">conditions générales</a>
        </label>
      </div>

      <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} className="flex justify-center" />

      <div className="flex justify-center pt-4">
        <button type="submit" className="px-8 bg-[#feecc7] hover:bg-orange-400 text-black rounded-lg py-2 font-semibold text-base">S'inscrire</button>
      </div>
    </form>
  );
}
