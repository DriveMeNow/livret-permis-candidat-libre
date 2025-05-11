import { Request, Response } from 'express'
import axios from 'axios'
import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, RECAPTCHA_SECRET_KEY } from '../config'
import { sendOTPEmail } from '../services/emailService'
import { redis } from '../services/sessionService'

// vérification reCAPTCHA
async function verifyCaptcha(token: string) {
  const resp = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    { params: { secret: RECAPTCHA_SECRET_KEY, response: token } }
  )
  return resp.data.success
}

export async function signup(req: Request, res: Response) {
  const { email, password, phone, captcha } = req.body
  // reCAPTCHA
  if (!await verifyCaptcha(captcha)) {
    return res.status(400).json({ error: 'reCAPTCHA invalide' })
  }
  // hash password
  const hashed = await hash(password, 10)
  // génère OTP aléatoire
  const otp = Math.floor(100000 + Math.random()*900000).toString()
  // envoie email (ou SMS selon implémentation)
  await sendOTPEmail(email, otp)
  // stocke user minimal + OTP
  await redis.set(`otp:${email}`, otp, 'EX', 300)
  return res.status(201).json({ message: 'Inscription réussie, code OTP envoyé.' })
}

export async function login(req: Request, res: Response) {
  const { email, password, otp, captcha } = req.body
  if (!await verifyCaptcha(captcha)) {
    return res.status(400).json({ error: 'reCAPTCHA invalide' })
  }
  // vérifie OTP
  const storedOtp = await redis.get(`otp:${email}`)
  if (otp !== storedOtp) {
    return res.status(400).json({ error: 'OTP incorrect' })
  }
  // génère token JWT
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '2h' })
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: true })
  return res.json({ token })
}