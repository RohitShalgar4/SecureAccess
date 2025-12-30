import express from 'express';
import {
  getAllUsers,
  getUserById,
  activateUser,
  deactivateUser
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Admin only routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', authorize('admin'), getUserById);
router.put('/:id/activate', authorize('admin'), activateUser);
router.put('/:id/deactivate', authorize('admin'), deactivateUser);

export default router;
