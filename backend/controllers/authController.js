import jwt from 'jsonwebtoken';
import redisClient from '../redisClient.js';

export const login = async (req, res) => {
  const { email, password, otp } = req.body;

  try {
    const storedOtp = await redisClient.get(email);
    if (!storedOtp || storedOtp !== otp) {
      return res.status(401).json({ error: "OTP incorrect ou expiré." });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 86400000 });
    return res.status(200).json({ message: "Connexion réussie." });

  } catch (error) {
    console.error("Erreur lors du login :", error);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  return res.status(200).json({ message: "Déconnexion réussie." });
};
