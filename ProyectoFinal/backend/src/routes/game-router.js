import { Router } from 'express';
import { getAllGames, getGame,createGame,getGameById , deleteGame, updateGame } from '../controllers/game-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js'

const router = Router();


router.get('/', getAllGames )
router.get('/:title', getGame)
router.get('/id/:id', getGameById);
router.post('/', createGame);
router.patch('/:title', updateGame);
router.delete('/:title', deleteGame);


export default router;
