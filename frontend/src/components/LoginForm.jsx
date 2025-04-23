import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const handleCaptchaChange = (value) => setCaptcha(value);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!captcha) {
      alert("Veuillez compléter le CAPTCHA !");
      return;
    }
    // Logique de connexion ici
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-center text-xl text-white font-bold">CONNEXION</h2>

      <input
        type="email"
        value={email}
        placeholder="Votre email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-lg text-gray-900 bg-gray-50"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-gray-900 bg-gray-50"
          required
        />
        <button type="button" className="absolute right-3 top-2" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff className="text-orange-400" /> : <Eye className="text-orange-400" />}
        </button>
      </div>

      <input
        type="text"
        placeholder="Code OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 rounded-lg text-gray-900 bg-gray-50"
        required
      />

      <ReCAPTCHA
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
        className="flex justify-center"
      />

      <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 font-semibold">
        Se connecter
      </button>
    </form>
  );
}
