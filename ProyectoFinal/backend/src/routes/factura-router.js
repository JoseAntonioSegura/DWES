import { Router } from 'express';
import { agregarFactura, obtenerFacturasPorUsuario,obtenerFacturaPorId, eliminarFactura } from '../controllers/factura-controller.js';
import isAdmin from '../middlewares/admin-middleware.js';

const router = Router();

// Rutas para las facturas
// Agregar una factura
router.post('/agregar', agregarFactura);
// Obtener todas las facturas de un usuario
router.get('/:userId', obtenerFacturasPorUsuario);
// Obtener una factura por su ID
router.get('/admin/:facturaId', isAdmin, obtenerFacturaPorId);
// Eliminar una factura 
router.delete('/:facturaId', isAdmin, eliminarFactura);

export default router;
