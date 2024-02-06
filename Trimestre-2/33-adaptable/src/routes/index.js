import express from 'express';
import { login } from '../controllers/login-controller.js';
import miscRouter from './misc-router.js';
import userRouter from './user-router.js';
import notesRouter from './notes-router.js';
import { checkToken } from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post('/login', login);

router.use(miscRouter);
router.use('/notes',checkToken, notesRouter)
router.use('/users', userRouter);

export default router;
