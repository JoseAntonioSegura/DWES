import express from 'express';
import { login } from '../controllers/login-controller.js';
import miscRouter from './misc-router.js';
import { getAnimals } from '../controllers/animals-controller.js'

const router = express.Router();

router.post('/login', login);

//Creo la ruta animales http://localhost:3000/animals?animal_type=horse&amount=10
router.post('/animals', getAnimals)

router.use(miscRouter);

export default router;
