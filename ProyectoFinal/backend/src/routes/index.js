import express from 'express';
import { login } from '../controllers/login-controller.js';
import miscRouter from './misc-router.js';
import gameRouter from './game-router.js';
import userRouter from './user-router.js';
import { checkToken } from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post('/login', login);

router.use(miscRouter);
router.use('/games', gameRouter);
router.use('/users', userRouter);


export default router;
