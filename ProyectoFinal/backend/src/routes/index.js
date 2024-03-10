import express from 'express';
import { login } from '../controllers/login-controller.js';
import gameRouter from './game-router.js';
import userRouter from './user-router.js';
import carritoRouter from './carrito-router.js';
import facturaRouter from './factura-router.js'

const router = express.Router();

router.post('/login', login);

router.use('/games', gameRouter);
router.use('/factura', facturaRouter);
router.use('/users', userRouter);
router.use('/carrito', carritoRouter);




export default router;
