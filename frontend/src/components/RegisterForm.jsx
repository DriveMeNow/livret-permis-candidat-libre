import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const handleCaptchaChange = (value) => setCaptcha(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captcha) {
      alert("Veuillez compléter le CAPTCHA !");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Logique pour envoyer l'inscription ici.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-center text-xl text-white font-bold">INSCRIPTION</h2>

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

      <div className="relative">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-gray-900 bg-gray-50"
          required
        />
        <button type="button" className="absolute right-3 top-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <EyeOff className="text-orange-400" /> : <Eye className="text-orange-400" />}
        </button>
      </div>

      <ReCAPTCHA
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
        className="flex justify-center"
      />

      <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 font-semibold">
        S'inscrire
      </button>
    </form>
  );
}