import { Router } from 'express';
import { getAllGames, getGame,createGame,getGameById , deleteGame, updateGame } from '../controllers/game-controller.js';
//import { checkToken } from '../middlewares/auth-middleware.js'

const router = Router();

// Rutas para los juegos
// Obtener todos los juegos
router.get('/', getAllGames );
// Obtener un juego por título
router.get('/:title', getGame);
// Obtener un juego por id
router.get('/id/:id', getGameById);
// Crear un juego
router.post('/', createGame);
// Actualizar un juego
router.patch('/:title', updateGame);
// Eliminar un juego
router.delete('/:title', deleteGame);


export default router;
