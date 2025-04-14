import jwt from 'jsonwebtoken';
import csurf from 'csurf';

// Middleware JWT
export const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Session expirée. Reconnectez-vous." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Accès refusé." });
    req.user = decoded.email;
    next();
  });
};