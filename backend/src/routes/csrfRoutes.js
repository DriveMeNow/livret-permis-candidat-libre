import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

router.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default router;
