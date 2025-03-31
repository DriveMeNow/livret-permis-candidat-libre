import { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import Loader from './Loader';

axios.defaults.withCredentials = true;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const MAX_ATTEMPTS = 5;
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleCaptchaChange = (value) => setCaptcha(value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!captcha) {
      setErrorMsg("Veuillez compléter le CAPTCHA !");
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    setLoading(true);
    try {
      await axios.post('https://livret-numerique-permisb-candidat-libre.onrender.com/api/auth/login', { email, password, otp });
      localStorage.setItem('userLoggedIn', 'true');
      window.location.href = "/dashboard";
    } catch (error) {
      setAttempts(prev => prev + 1);
      setErrorMsg("Email, mot de passe ou OTP incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {attempts < MAX_ATTEMPTS ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-xl text-white font-bold text-center">CONNEXION</h2>

          {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email" required className="w-full p-2 rounded-lg border border-gray-300" />

          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)} required
              placeholder="Mot de passe" className="w-full p-2 rounded-lg border border-gray-300" />
            <button type="button" className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="text-orange-400" /> : <Eye className="text-orange-400" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} id="rememberMe" className="accent-orange-400" />
            <label htmlFor="rememberMe" className="text-gray-200">Se souvenir de moi</label>
          </div>

          {!localStorage.getItem('userLoggedIn') && (
            <input type="text" placeholder="Code OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full p-2 rounded-lg border border-gray-300" />
          )}

<ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_KEY} onChange={handleCaptchaChange} className="flex justify-center" />

          <div className="flex justify-center">
            {loading ? <Loader /> : <button type="submit" className="px-8 bg-[#feecc7] hover:bg-orange-400 text-black rounded-lg py-2 font-semibold text-base">Se connecter</button>}
          </div>
        </form>
      ) : (
        <p className="text-center text-red-500">
          Trop de tentatives échouées. Réessayez après 15 minutes.
        </p>
      )}
    </>
  );
}
