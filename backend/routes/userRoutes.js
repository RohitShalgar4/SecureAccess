import express from 'express';
import {
  getAllUsers,
  getUserById,
  activateUser,
  deactivateUser,
  getMyProfile,
  updateMyProfile,
  changeMyPassword
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// User profile routes (any authenticated user)
router.get('/profile/me', getMyProfile);
router.put('/profile/update', updateMyProfile);
router.put('/profile/change-password', changeMyPassword);

// Admin only routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', authorize('admin'), getUserById);
router.put('/:id/activate', authorize('admin'), activateUser);
router.put('/:id/deactivate', authorize('admin'), deactivateUser);

export default router;
