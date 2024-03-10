import { Router } from 'express';
import { agregarFactura, obtenerFacturasPorUsuario, eliminarFactura } from '../controllers/factura-controller.js';

const router = Router();

// Rutas para las facturas
// Agregar una factura
router.post('/agregar', agregarFactura);
// Obtener todas las facturas de un usuario
router.get('/:userId', obtenerFacturasPorUsuario);
// Eliminar una factura (Solo lo uso para pruebas, no debería estar en la API pública)
router.delete('/:facturaId', eliminarFactura);

export default router;
