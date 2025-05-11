import sgMail from '@sendgrid/mail'
import { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, REDIS_URL } from '../config'
import Redis from 'ioredis'

// Initialise SendGrid
sgMail.setApiKey(SENDGRID_API_KEY)

// Redis pour OTP
const redis = new Redis(REDIS_URL)

export async function sendOTPEmail(email: string, otp: string) {
  // stocke l’OTP 5 min
  await redis.set(`otp:${email}`, otp, 'EX', 300)
  const msg = {
    to: email,
    from: 'no-reply@drivemenow.com',
    subject: 'Votre code OTP',
    text: `Votre code OTP est ${otp}`,
  };
  await sgMail.send(msg);
}