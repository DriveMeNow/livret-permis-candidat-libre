import express from 'express';
import { sendRegistrationEmail } from '../controllers/mailController.js';
import { csrfProtection } from '../middleware/auth.js';
import cors from 'cors';

const router = express.Router();

router.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

router.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

router.post('/send-registration-email', csrfProtection, sendRegistrationEmail);

export default router;
