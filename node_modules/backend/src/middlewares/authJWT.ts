import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Non authentifié' });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token invalide' });
  }
}