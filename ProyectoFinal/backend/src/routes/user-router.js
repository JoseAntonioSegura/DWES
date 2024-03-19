import { Router } from 'express';
import { getUsersController, createUsersController, getUserMe, deleteUserController, updateUserController } from '../controllers/users-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js'

const router = Router();

// Rutas para los usuarios
// Obtener los datos del usuario logueado
router.get('/me',checkToken,  getUserMe);
// Obtener todos los usuarios
router.get('/', getUsersController);
// Crear un usuario
router.post('/', createUsersController);
// Actualizar un usuario
router.patch('/:id', checkToken, updateUserController);
// Eliminar un usuario
router.delete('/:id', deleteUserController);

export default router;
