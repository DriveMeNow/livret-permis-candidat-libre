import express from 'express';
import { sendRegistrationEmail } from '../controllers/mailController.js';
import { csrfProtection } from '../middleware/auth.js';
import cors from 'cors';

const router = express.Router();

router.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

router.post('/send-registration-email', sendRegistrationEmail);

export default router;
