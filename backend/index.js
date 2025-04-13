import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mailRoutes from './src/routes/mailRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/mail', mailRoutes);
app.use('/api/auth', authRoutes);

// Sert les fichiers statiques React
app.use(express.static(path.join(__dirname, 'public/dist')));

// Route par défaut vers React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur sécurisé en écoute sur le port ${PORT}`);
});
