// backend/index.js
import dotenv from 'dotenv';
dotenv.config();

import app from './src/App.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Serveur sécurisé en écoute sur le port ${PORT}`);
});
