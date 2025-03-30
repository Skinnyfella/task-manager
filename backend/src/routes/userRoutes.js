// /src/routes/userRoutes.js
import express from 'express';
import { verifyFirebaseToken } from '../middlewares/authMiddleware.js';
import { getUserInfo, getUserStats } from '../controllers/userController.js';

const router = express.Router();

// Fetch user info (avatar, name, etc.)
router.get('/', verifyFirebaseToken, getUserInfo);

// Fetch user stats (completed, in_progress, onTimeCompletion)
router.get('/stats', verifyFirebaseToken, getUserStats);

export default router;
