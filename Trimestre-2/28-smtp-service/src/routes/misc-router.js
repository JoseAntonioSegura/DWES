import { Router } from 'express';
import { pingController } from '../controllers/misc-controller.js';
import { emailController } from '../controllers/smtp-controller.js';

const router = Router();

router.get('/ping', pingController);

router.post('/email', emailController );

export default router;
