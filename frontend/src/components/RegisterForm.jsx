import { useRegisterForm } from '../hooks/useRegisterForm';
import { Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function RegisterForm() {
  const {
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, toggleShowPassword,
    showConfirmPassword, toggleShowConfirmPassword,
    handleCaptchaChange,
    handleSubmit,
    passwordCriteria, isPasswordValid,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300" required />

      <div className="relative">
        <input type={showPassword ? 'text' : 'password'} placeholder="Mot de passe"
          value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300" required />
        <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3" onClick={toggleShowPassword}>
          {showPassword ? <EyeOff size={20} className="text-orange-400" /> : <Eye size={20} className="text-orange-400" />}
        </button>
      </div>

      <div className="relative">
        <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmer votre mot de passe"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300" required />
        <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3" onClick={toggleShowConfirmPassword}>
          {showConfirmPassword ? <EyeOff size={20} className="text-orange-400" /> : <Eye size={20} className="text-orange-400" />}
        </button>
      </div>

      <ul className="text-sm text-gray-300 mt-1">
        <li>{passwordCriteria.length ? "✅" : "❌"} Min. 9 caractères</li>
        <li>{passwordCriteria.uppercase ? "✅" : "❌"} 1 majuscule</li>
        <li>{passwordCriteria.lowercase ? "✅" : "❌"} 1 minuscule</li>
        <li>{passwordCriteria.number ? "✅" : "❌"} 1 chiffre</li>
      </ul>

      <div className="flex items-center justify-center mb-6">
        <input type="checkbox" id="cgu" required className="mr-2 accent-orange-400" />
        <label htmlFor="cgu" className="text-sm text-gray-300">
          J'accepte les <a href="/cgu" target="_blank" className="text-orange-400 underline">CGU</a>
        </label>
      </div>

      <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} className="flex justify-center" />

      <div className="flex justify-center pt-4">
        <button disabled={!isPasswordValid || password !== confirmPassword}
          className="px-8 bg-[#feecc7] hover:bg-orange-400 text-black rounded-lg py-2 font-semibold">
          S'inscrire
        </button>
      </div>
    </form>
  );
}
