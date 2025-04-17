import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL, // URL avec "rediss://"
  socket: {
    tls: true,
    rejectUnauthorized: false
  }
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis connecté avec succès.");
  } catch (err) {
    console.error("❌ Erreur de connexion Redis :", err);
  }
})();

export default redisClient;
