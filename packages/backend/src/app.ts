import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import { FRONTEND_URL } from './config';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(helmet());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(csurf({ cookie: true }));

app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

export default app;