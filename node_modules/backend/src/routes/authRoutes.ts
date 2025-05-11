import { Router } from 'express';
import { signup, login, logout } from '../controllers/authController';
import { verifyJWT } from '../middlewares/authJWT';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', verifyJWT, logout);
export default router;