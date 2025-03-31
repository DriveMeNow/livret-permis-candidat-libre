import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mailRoutes from './src/routes/mailRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/mail', mailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
