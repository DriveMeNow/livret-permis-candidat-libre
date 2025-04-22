import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [captcha, setCaptcha] = useState(null);
  const [resetStep, setResetStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const passwordCriteria = {
    length: newPassword.length >= 9,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const handleCaptchaChange = (value) => setCaptcha(value);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!captcha) {
      alert("Veuillez compléter le CAPTCHA !");
      return;
    }
    // Logique de connexion ici
  };

  const handlePasswordResetRequest = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Veuillez entrer une adresse mail valide.");
      return;
    }
    setResetStep(2);
    // Logique pour envoyer OTP par mail ici
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid || newPassword !== confirmNewPassword) {
      alert("Vérifiez les critères et la correspondance des mots de passe.");
      return;
    }
    // Logique de réinitialisation du mot de passe ici
  };

  return (
    <div className="space-y-4">
      {!forgotPassword ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-center text-xl text-white font-bold">CONNEXION</h2>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Email :</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-orange-400" required />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Mot de passe :</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pr-10 rounded-lg border border-gray-300 focus:ring focus:ring-orange-400" required />
              <button type="button" className="absolute inset-y-0 right-0 px-3" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="text-orange-400" /> : <Eye className="text-orange-400" />}
              </button>
            </div>
            <a onClick={() => setForgotPassword(true)} className="text-sm text-orange-400 cursor-pointer hover:underline">Mot de passe oublié ?</a>
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Code à usage unique :</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-orange-400" required />
          </div>

          <ReCAPTCHA sitekey="6LfNHvsqAAAAAKR8lxybwjTmTAz6_3U7H2EkkQO2" onChange={handleCaptchaChange} className="flex justify-center"/>

          <div className="flex justify-center pt-6">
            <button type="submit"
              className="px-8 bg-[#feecc7] hover:bg-orange-400 text-black rounded-lg py-2 font-semibold text-base">
              Se connecter
            </button>
          </div>
        </form>
      ) : (
        <form className="space-y-4">
          <h2 className="text-center text-xl text-white font-bold">RÉINITIALISER MOT DE PASSE</h2>

          {resetStep === 1 && (
            <>
              <input type="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300" required />
              <div className="flex justify-center pt-6">
                <button onClick={handlePasswordResetRequest}
                  className="px-8 bg-[#feecc7] hover:bg-orange-400 text-black rounded-lg py-2 font-semibold text-base">
                  Envoyer le code
                </button>
              </div>
            </>
          )}

          {resetStep === 2 && (
            <>
              <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300" required />
              <input type="password" placeholder="Confirmer nouveau mot de passe" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300" required />

              <div className="flex justify-center pt-6">
                <button onClick={handleNewPasswordSubmit}
                  className="px-8 bg-[#feecc7] hover:bg-orange-400 text-black rounded-lg py-2 font-semibold text-base">
                  Réinitialiser mot de passe
                </button>
              </div>
            </>
          )}

          <button onClick={() => setForgotPassword(false)} className="text-sm text-orange-400 hover:underline">Retour à la connexion</button>
        </form>
      )}
    </div>
  );
}
