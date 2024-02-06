import { Router } from 'express';
import { getUsersController, createUsersController, getUserMe } from '../controllers/users-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js'

const router = Router();

router.get('/me', getUserMe)
router.get('/', checkToken, getUsersController)
router.post('/', createUsersController);

export default router;
