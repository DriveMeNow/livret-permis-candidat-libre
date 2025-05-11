import dotenv from 'dotenv'
dotenv.config()

export const SENDGRID_API_KEY    = process.env.SENDGRID_API_KEY!
export const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL!
export const PORT                = parseInt(process.env.PORT!) || 5000
export const REDIS_URL           = process.env.REDIS_URL!
export const JWT_SECRET          = process.env.JWT_SECRET!
export const FRONTEND_URL        = process.env.FRONTEND_URL!
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!