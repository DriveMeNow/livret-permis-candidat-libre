import express from 'express';
import { sendRegistrationEmail } from '../controllers/mailController.js';

const router = express.Router();

router.post('/send-registration-email', sendRegistrationEmail);

export default router;
