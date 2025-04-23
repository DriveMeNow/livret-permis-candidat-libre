// LoginForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import Loader from './Loader';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 5;

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
    if (!captcha) return setErrorMsg("Veuillez compléter le CAPTCHA.");

    if (rememberMe) localStorage.setItem('rememberedEmail', email);
    else localStorage.removeItem('rememberedEmail');

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password, otp });
      window.location.href = "/dashboard";
    } catch {
      setAttempts(a => a + 1);
      setErrorMsg("Email, mot de passe ou OTP incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-xl font-bold text-center text-white">CONNEXION</h2>
      {errorMsg && <div className="text-red-400 text-center">{errorMsg}</div>}
      <input type="email" className="w-full p-2 rounded-lg border" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <div className="relative">
        <input type={showPassword ? "text" : "password"} className="w-full p-2 rounded-lg border" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" className="absolute inset-y-0 right-2" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff className="text-orange-400" /> : <Eye className="text-orange-400" />}
        </button>
      </div>
      <input type="text" placeholder="Code OTP" className="w-full p-2 rounded-lg border" value={otp} onChange={(e) => setOtp(e.target.value)} required />
      <label className="flex items-center gap-2 text-gray-200">
        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Se souvenir de moi
      </label>
      <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
      <div className="flex justify-center">
        {loading ? <Loader /> : <button className="px-6 py-2 bg-orange-400 rounded-lg">Se connecter</button>}
      </div>
      {attempts >= MAX_ATTEMPTS && <p className="text-red-400">Trop de tentatives. Réessayez plus tard.</p>}
    </form>
  );
}
