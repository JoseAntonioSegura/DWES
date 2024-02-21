import * as CarritoService from '../services/database/carrito-db-service.js';

export async function addToCart(req, res, next) {
  const { userId, productId } = req.body;

  try {
    const carrito = await CarritoService.addToCart(userId, productId);
    res.status(201).json(carrito);
  } catch (error) {
    next(error);
  }
}

export async function removeFromCart(req, res, next) {
  const { id } = req.params;

  try {
    await CarritoService.removeFromCart(id);
    res.status(200).json({ message: 'Producto eliminado del carrito exitosamente.' });
  } catch (error) {
    next(error);
  }
}
