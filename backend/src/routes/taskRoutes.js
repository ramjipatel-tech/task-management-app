import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController.js';
import { verifyToken } from '../middleware/auth.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(verifyToken);
router.use(apiLimiter);

router.get('/', getTasks);
router.get('/stats', getTaskStats);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.patch('/:id/status', updateTaskStatus);
router.delete('/:id', deleteTask);

export default router;
