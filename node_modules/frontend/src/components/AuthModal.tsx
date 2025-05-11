// packages/frontend/src/components/AuthModal.tsx
import React, { useState, useEffect, FormEvent } from 'react'
import { useAuthStore } from '../store/authStore'
import api from '../services/api'
import ReCAPTCHA from 'react-google-recaptcha'
import { Eye, EyeOff, Check } from 'lucide-react'

export default function AuthModal() {
  const isOpen      = useAuthStore(s => s.isAuthModalOpen)
  const mode        = useAuthStore(s => s.authMode)
  const setOpen     = useAuthStore(s => s.setAuthModalOpen)
  const setMode     = useAuthStore(s => s.setAuthMode)
  const setToken    = useAuthStore(s => s.setToken)
  const rememberMe  = useAuthStore(s => s.rememberMe)
  const setRemember = useAuthStore(s => s.setRememberMe)

  const [email, setEmail]       = useState('')
  const [phone, setPhone]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [otp, setOtp]           = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [accepted, setAccepted]     = useState(false)
  const [captcha, setCaptcha]       = useState<string|null>(null)
  const [error, setError]           = useState<string|null>(null)

  // règles mot de passe
  const validLength     = password.length >= 9
  const hasUpper        = /[A-Z]/.test(password)
  const hasLower        = /[a-z]/.test(password)
  const hasNumber       = /\d/.test(password)
  const passwordsMatch  = password === confirm

  // Web OTP API (auto‐remplissage)
  useEffect(() => {
    if (mode === 'login' && 'OTPCredential' in window) {
      // @ts-ignore
      navigator.credentials
        .get({ otp: { transport: ['sms'] }, signal: new AbortController().signal } as any)
        .then((c: any) => setOtp(c.code))
        .catch(() => {})
    }
  }, [mode])

  // reset form
  useEffect(() => {
    if (!isOpen) {
      setEmail(''); setPhone('')
      setPassword(''); setConfirm('')
      setOtp(''); setAccepted(false)
      setCaptcha(null); setError(null)
      setShowPass(false); setShowConfirm(false)
      setRemember(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // validation signup
    if (mode === 'signup') {
      if (!validLength || !hasUpper || !hasLower || !hasNumber)
        return setError('Mot de passe : ≥9 car., maj., min. & chiffre.')
      if (!passwordsMatch)
        return setError('Les mots de passe ne correspondent pas.')
      if (!phone.match(/^\+?\d{8,15}$/))
        return setError('Numéro de téléphone invalide.')
      if (!accepted)
        return setError('Vous devez accepter les CGU.')
    }

    // validation login
    if (mode === 'login' && !rememberMe && otp.trim() === '')
      return setError('Entrez le code OTP ou cochez “Se souvenir de moi”.')

    if (!captcha)
      return setError('Veuillez compléter le reCAPTCHA.')

    try {
      if (mode === 'signup') {
        await api.post('/auth/signup', { email, phone, password, captcha })
        setMode('login')
      } else {
        const payload: any = { email, password, captcha }
        if (!rememberMe) payload.otp = otp
        const res = await api.post('/auth/login', payload)
        setToken(res.data.token)
        setOpen(false)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur réseau.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-black text-white rounded-2xl w-full max-w-lg p-6 relative">
        {/* fermer */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-orange-400"
          aria-label="Fermer"
        >✕</button>

        {/* onglets avec slider */}
        <div className="relative flex mb-6">
          <span
            className={`
              absolute bottom-0 left-0 h-1 w-1/2 bg-orange-500
              transition-transform duration-300
              ${mode==='signup' ? 'translate-x-full' : 'translate-x-0'}
            `}
          />
          {['login','signup'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m as 'login'|'signup')}
              className={`
                flex-1 py-2 text-center font-semibold
                ${mode===m
                  ? 'bg-yellow-100 text-black'
                  : 'bg-transparent text-white/70 hover:text-white'}
                transition-colors
              `}
            >
              {m==='login'?'Connexion':'Inscription'}
            </button>
          ))}
        </div>

        <h2 className="text-center text-2xl font-bold mb-4">
          {mode==='login'?'Connexion':'INSCRIPTION'}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email :</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-orange-400"
            />
          </div>

          {/* Téléphone (signup) */}
          {mode==='signup' && (
            <div>
              <label className="block text-sm mb-1">Téléphone :</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-white text-black focus:outline-orange-400"
              />
              <p className="text-xs mt-1 text-white/70">
                Ce numéro sert uniquement à l’envoi du code OTP et ne sera JAMAIS
                utilisé à des fins commerciales.
              </p>
            </div>
          )}

          {/* Mot de passe */}
          <div>
            <label className="block text-sm mb-1">Mot de passe :</label>
            <div className="relative">
              <input
                type={showPass?'text':'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-white text-black focus:outline-orange-400"
              />
              <button
                type="button"
                onClick={()=>setShowPass(v=>!v)}
                className="absolute inset-y-0 right-2 flex items-center text-black/60"
                aria-label="Afficher/masquer"
              >
                {showPass?<EyeOff size={20}/>:<Eye size={20}/>}
              </button>
            </div>
          </div>

          {/* Confirmation (signup) */}
          {mode==='signup' && (
            <div className="relative">
              <label className="block text-sm mb-1">
                Confirmer le mot de passe :
              </label>
              <input
                type={showConfirm?'text':'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-white text-black focus:outline-orange-400"
              />
              <button
                type="button"
                onClick={()=>setShowConfirm(v=>!v)}
                className="absolute inset-y-0 right-2 flex items-center text-black/60"
                aria-label="Afficher/masquer"
              >
                {showConfirm?<EyeOff size={20}/>:<Eye size={20}/>}
              </button>
            </div>
          )}

          {/* OTP & Se souvenir (login) */}
          {mode==='login' && (
            <>
              <div>
                <label className="block text-sm mb-1">Code OTP :</label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  placeholder="Entrez le code reçu par SMS"
                  className="w-full px-3 py-2 rounded bg-white text-black focus:outline-orange-400"
                />
              </div>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e=>setRemember(e.target.checked)}
                  className="mr-2 accent-orange-400"
                />
                Se souvenir de moi (pas de code OTP)
              </label>
            </>
          )}

          {/* Critères mot de passe */}
          {mode==='signup' && (
            <ul className="text-xs space-y-1">
              {[
                [validLength, 'Min. 9 caractères'],
                [hasUpper,    '1 majuscule'],
                [hasLower,    '1 minuscule'],
                [hasNumber,   '1 chiffre'],
              ].map(([ok, txt], i) => (
                <li key={i} className="flex items-center gap-1">
                  <Check size={14}
                    className={ok?'text-green-400':'text-white/50'} />
                  <span className={ok?'text-green-400':'text-white/50'}>
                    {txt}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CGU (signup) */}
          {mode==='signup' && (
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={accepted}
                onChange={e=>setAccepted(e.target.checked)}
                className="mr-2 accent-orange-400"
              />
              <a
                href="/cgu"
                className="underline text-white hover:text-orange-400 transition-colors"
              >
                J’accepte les conditions générales d’utilisation
              </a>
            </label>
          )}

          {/* reCAPTCHA */}
          <div className="flex justify-center mt-2">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={t => setCaptcha(t)}
            />
          </div>

          {/* Erreur */}
          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}

          {/* Bouton */}
          <button
            type="submit"
            className="
              mx-auto block px-8 py-2 rounded-full
              bg-gradient-to-r from-orange-400 to-orange-500
              text-black font-bold
              hover:scale-105 transition-transform
            "
          >
            {mode==='login'?'Se connecter':"S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  )
}
