import { Router } from 'express';
import { agregarProductoAlCarrito, modificarCantidadProductoEnCarrito, eliminarProductoDelCarrito, obtenerProductosCarrito } from '../controllers/carrito-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js';

const router = Router();

// Rutas para el carrito
router.get('/:userId', checkToken, obtenerProductosCarrito);
router.post('/agregar', checkToken, agregarProductoAlCarrito);
router.patch('/:carritoId', checkToken, modificarCantidadProductoEnCarrito);
router.delete('/:carritoId', checkToken, eliminarProductoDelCarrito);

export default router;
