import express from 'express';
//import { login } from '../controllers/login-controller.js';
import miscRouter from './misc-router.js';
import gameRouter from './game-router.js';
//import { checkToken } from '../middlewares/auth-middleware.js';

const router = express.Router();

//router.post('/login', login);

router.use(miscRouter);
router.use('/games', gameRouter);

export default router;
