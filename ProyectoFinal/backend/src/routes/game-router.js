import { Router } from 'express';
import { getAllGames, getGame,createGame,getGameById , deleteGame, updateGame } from '../controllers/game-controller.js';
//import { checkToken } from '../middlewares/auth-middleware.js'
import  isAdmin  from '../middlewares/admin-middleware.js'

const router = Router();

// Rutas para los juegos
// Obtener todos los juegos
router.get('/', getAllGames );
// Obtener un juego por título
router.get('/titulo/:title', getGame);
// Obtener un juego por id
router.get('/:id', getGameById);
// Crear un juego
router.post('/',isAdmin, createGame);
// Actualizar un juego
router.patch('/:id', updateGame);
// Actualizar un juego desde el admin
router.put('/admin/:id',isAdmin, updateGame);
// Eliminar un juego
router.delete('/:id',isAdmin, deleteGame);


export default router;
