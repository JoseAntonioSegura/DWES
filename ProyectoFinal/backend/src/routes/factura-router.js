import { Router } from 'express';
import { agregarFactura, obtenerFacturasPorUsuario, eliminarFactura } from '../controllers/factura-controller.js';

const router = Router();

// Rutas para las facturas
router.post('/agregar', agregarFactura);
router.get('/:userId', obtenerFacturasPorUsuario);
router.delete('/:facturaId', eliminarFactura);

export default router;
