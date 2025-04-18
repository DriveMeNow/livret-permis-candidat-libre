// backend/index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mailRoutes from './src/routes/mailRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url)).replace('/src', '');

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'https://drivemenow.netlify.app',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/mail', mailRoutes);
app.use('/api/auth', authRoutes);

app.use(express.static(join(__dirname, 'public', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Serveur sécurisé en écoute sur le port ${PORT}`);
});
