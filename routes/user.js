import express from 'express';
import auth from '../middleware/auth.js';
import { getProfile, updateProfile, updateTheme, getSettings, updateSettings, getLoginHistory } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/theme', auth, updateTheme);
router.get('/settings', auth, getSettings);
router.put('/settings', auth, updateSettings);
router.get('/login-history', auth, getLoginHistory);

export default router;
