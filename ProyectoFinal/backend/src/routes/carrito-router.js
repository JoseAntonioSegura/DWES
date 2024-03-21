import { Router } from 'express';
import { agregarProductoAlCarrito, modificarCantidadProductoEnCarrito, eliminarProductoDelCarrito, obtenerProductosCarrito, confirmarCompra } from '../controllers/carrito-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js';

const router = Router();

// Rutas para el carrito, requieren token de autenticaci'on
// Obtener productos del carrito
router.get('/:userId', checkToken, obtenerProductosCarrito);
// Anadir producto al carrito
router.post('/agregar', checkToken, agregarProductoAlCarrito);
// Modificar cantidad de producto en el carrito
router.patch('/', checkToken, modificarCantidadProductoEnCarrito);
// Eliminar producto del carrito
router.delete('/:carritoId', checkToken, eliminarProductoDelCarrito);

router.post('/confirmar-compra', checkToken, confirmarCompra);

export default router;
