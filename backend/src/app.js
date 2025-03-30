// /src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { verifyFirebaseToken } from './middlewares/authMiddleware.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Public or semi-public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/tasks', verifyFirebaseToken, tasksRoutes);
app.use('/api/user', verifyFirebaseToken, userRoutes);

// Global error handler
app.use(errorHandler);

export default app;
