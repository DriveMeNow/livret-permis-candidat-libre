import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mailRoutes from './src/routes/mailRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import { verifyJWT } from './src/middleware/auth.js';
import redisClient from './src/redisClient.js';

dotenv.config();

const app = express();

// Sécurité avancée avec Helmet (version compacte et optimisée)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com", "https://www.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'", "https://drivemenow.netlify.app", "https://livret-numerique-permisb-candidat-libre.onrender.com"],
      frameSrc: ["'self'", "https://www.google.com"],
    },
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  xssFilter: true,
}));

// Configuration CORS sécurisée
app.use(cors({
  origin: 'https://drivemenow.netlify.app',
  credentials: true,
}));

// Parsing cookies & JSON
app.use(cookieParser());
app.use(express.json());

// CSRF Protection renforcée
const csrfProtection = csrf({ cookie: { httpOnly: true, secure: true, sameSite: 'Strict' } });
app.use(csrfProtection);

// Endpoint token CSRF
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Limitation tentatives login
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

// Routes protégées par JWT
app.get('/dashboard', verifyJWT, (req, res) => {
  res.json({ message: 'Dashboard accessible uniquement aux utilisateurs connectés.' });
});

// Déconnexion sécurisée
app.post('/api/auth/logout', verifyJWT, (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.status(200).json({ message: 'Déconnexion réussie.' });
});

// Gestion erreurs CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Formulaire invalide, veuillez réessayer.' });
  }
  next(err);
});

// Connexion Redis
redisClient.on('connect', () => {
  console.log('✅ Redis connecté avec succès');
});
redisClient.on('error', (err) => {
  console.error('❌ Erreur de connexion Redis:', err);
});

// Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur sécurisé en écoute sur le port ${PORT}`);
});
