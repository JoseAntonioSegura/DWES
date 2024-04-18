import { Router } from 'express';
import { getUsersController, createUsersController, getUserMe, getUserByNameForAdmin,getUserByIdController, deleteUserController, updateUserController } from '../controllers/users-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js'
import  isAdmin  from '../middlewares/admin-middleware.js'

const router = Router();

// Rutas para los usuarios
// Obtener los datos del usuario logueado
router.get('/me', checkToken,  getUserMe);
// Ruta para obtener un usuario por su nombre
router.get('/name/:name', isAdmin, getUserByNameForAdmin);
// Obtener todos los usuarios
router.get('/', isAdmin, getUsersController);
// Crear un usuario
router.post('/', createUsersController);
//Obtener un usuario por su id
router.get('/admin/:id', isAdmin, getUserByIdController);
// Actualizar un usuario
router.patch('/:id', checkToken, updateUserController);
// Actualizar un usuario desde el admin
router.patch('/admin/:id', isAdmin, updateUserController);
// Eliminar un usuario
router.delete('/:id', isAdmin, deleteUserController);

export default router;
