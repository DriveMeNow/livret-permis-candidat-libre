import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mailRoutes from './routes/mailRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { verifyJWT } from './middleware/auth.js';
import redisClient from './redisClient.js';

dotenv.config();

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com", "https://www.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'", process.env.FRONTEND_URL, process.env.VITE_BACKEND_URL],
      frameSrc: ["'self'", "https://www.google.com"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  frameguard: { action: 'deny' },
  noSniff: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  xssFilter: true,
}));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: { httpOnly: true, secure: true, sameSite: 'Strict' } });
app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Trop de tentatives échouées. Réessayez après 15 minutes.',
});

app.use('/api/auth/login', loginLimiter, authRoutes);
app.use('/api/mail', mailRoutes);

app.get('/api/auth/check-session', verifyJWT, (req, res) => {
  res.status(200).json({ loggedIn: true, email: req.user.email });
});

app.get('/dashboard', verifyJWT, (req, res) => {
  res.json({ message: 'Dashboard accessible uniquement aux utilisateurs connectés.' });
});

app.post('/api/auth/logout', verifyJWT, (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.status(200).json({ message: 'Déconnexion réussie.' });
});

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Formulaire invalide, veuillez réessayer.' });
  }
  next(err);
});

redisClient.on('connect', () => console.log('✅ Redis connecté'));
redisClient.on('error', (err) => console.error('❌ Erreur Redis:', err));

export default app;
