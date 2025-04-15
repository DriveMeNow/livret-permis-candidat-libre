import express from 'express';
import { sendRegistrationEmail } from '../controllers/mailController.js';
import { csrfProtection } from '../middleware/auth.js';

const router = express.Router();

// route envoi mail d'inscription avec protection csrf
router.post('/send-registration-email', csrfProtection, sendRegistrationEmail);

export default router;
