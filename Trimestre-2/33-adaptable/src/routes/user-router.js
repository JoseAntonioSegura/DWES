import { Router } from 'express';
import { getUsersController, createUsersController } from '../controllers/users-controller.js';

const router = Router();

router.get('/', getUsersController)
router.post('/', createUsersController);

export default router;
