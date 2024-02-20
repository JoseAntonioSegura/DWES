import { Router } from 'express';
import { getUsersController, createUsersController, getUserMe, deleteUserController, updateUserController } from '../controllers/users-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js'

const router = Router();

router.get('/me',checkToken,  getUserMe);
router.get('/', getUsersController);
router.post('/', createUsersController);
router.delete('/:username', deleteUserController);
router.patch('/:username', checkToken, updateUserController);

export default router;
