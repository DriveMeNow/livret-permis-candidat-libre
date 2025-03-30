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

dotenv.config();
const app = express();

// Sécurité avancée HTTP avec Helmet
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com", "https://www.gstatic.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
    connectSrc: ["'self'"],
    frameSrc: ["'self'", "https://www.google.com"],
  },
}));

app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noSniff());

// CORS sécurisé
app.use(cors({
  origin: 'https://drivemenow.netlify.app/', // à changer en production
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// CSRF Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Rate Limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Trop de tentatives échouées. Réessayez après 15 minutes."
});

// Routes
app.use('/api/auth/login', loginLimiter, authRoutes);
app.use('/api/mail', mailRoutes);
app.get('/api/auth/check-session', verifyJWT, (req, res) => {
  res.status(200).json({ loggedIn: true, email: req.user.email });
});

// Routes sécurisées
app.get('/dashboard', verifyJWT, (req, res) => {
  res.json({ message: 'Dashboard accessible uniquement aux utilisateurs connectés.' });
});

app.post('/api/auth/logout', verifyJWT, (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.status(200).json({ message: 'Déconnexion réussie.' });
});

// Gestion globale des erreurs CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Formulaire invalide, veuillez réessayer.' });
  }
  next(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur sécurisé en écoute sur le port ${PORT}`);
});
