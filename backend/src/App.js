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

// Sécurité optimale Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com", "https://www.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'", "https://drivemenow.netlify.app", "https://livret-numerique-permisb-candidat-libre.onrender.com"],
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

// CORS précis et sécurisé pour ton frontend Netlify
app.use(cors({
  origin: 'https://drivemenow.netlify.app',
  credentials: true,
}));

// Parsing JSON et cookies sécurisé
app.use(express.json());
app.use(cookieParser());

// Protection CSRF sécurisée
const csrfProtection = csrf({
  cookie: { httpOnly: true, secure: true, sameSite: 'Strict' },
});
app.use(csrfProtection);

// Endpoint précis pour obtenir le token CSRF
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Limitation efficace des tentatives de connexion
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Trop de tentatives échouées. Réessayez après 15 minutes.',
});

// Routes publiques
app.use('/api/auth/login', loginLimiter, authRoutes);
app.use('/api/mail', mailRoutes);

// Vérification session JWT
app.get('/api/auth/check-session', verifyJWT, (req, res) => {
  res.status(200).json({ loggedIn: true, email: req.user.email });
});

// Routes protégées JWT
app.get('/dashboard', verifyJWT, (req, res) => {
  res.json({ message: 'Dashboard accessible uniquement aux utilisateurs connectés.' });
});

// Déconnexion JWT sécurisée
app.post('/api/auth/logout', verifyJWT, (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.status(200).json({ message: 'Déconnexion réussie.' });
});

// Gestion précise des erreurs CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Formulaire invalide, veuillez réessayer.' });
  }
  next(err);
});

// Connexion Redis (gestion précise des erreurs)
redisClient.on('connect', () => {
  console.log('✅ Redis connecté avec succès');
});
redisClient.on('error', (err) => {
  console.error('❌ Erreur Redis:', err);
});

export default app;
