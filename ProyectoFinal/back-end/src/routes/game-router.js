import { Router } from 'express';
import { getAllGames, getGame,createGame, deleteGame, updateGame } from '../controllers/game-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js'

const router = Router();


router.get('/', getAllGames )
router.get('/:title', getGame)
router.post('/', createGame);
router.patch('/:title', updateGame);
router.delete('/:title', deleteGame);


export default router;
