import express from 'express';
import notesController from './notes.js';
//import { validateAdminMiddleware } from '../middlewares/misc-middleware.js';


const router = express.Router();

//Ejercicio 1
router.use('/notes', notesController);


export default router;
