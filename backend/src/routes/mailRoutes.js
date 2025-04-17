import express from 'express';
import { sendRegistrationEmail } from '../controllers/mailController.js';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

router.post('/send-registration-email', csrfProtection, sendRegistrationEmail);

export default router;
