// /src/routes/authRoutes.js
import express from 'express';
import { verifyFirebaseToken } from '../middlewares/authMiddleware.js';
import { syncUser } from '../controllers/authController.js';

const router = express.Router();

// Sync user with dynamic avatar
router.post('/sync', verifyFirebaseToken, syncUser);

export default router;
