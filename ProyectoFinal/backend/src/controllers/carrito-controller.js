import { HttpStatusError } from 'common-errors';
import * as CarritoService from '../services/database/carrito-db-service.js';

// Obtener productos del carrito
export const obtenerProductosCarrito = async (req, res) => {
  try {
    // Obtener productos del carrito
    const productos = await CarritoService.obtenerProductosDelCarrito(req.params.userId);
    // Si no hay productos en el carrito, lanzar un error 404
    if (!productos) {
      throw new HttpStatusError(404, 'No se encontraron productos en el carrito');
    }
    // Enviar los productos del carrito como respuesta
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos del carrito:', error);
    res.status(error.status || 500).json({ message: error.message || 'Error al obtener los productos del carrito' });
  }
};

// Anadir producto al carrito
export const agregarProductoAlCarrito = async (req, res) => {
  const { userId, productId, cantidad } = req.body;
  // Si no se proporciona el userId, productId o cantidad, lanzar un error 400
  try {
    if (!userId || !productId || !cantidad) {
      throw new HttpStatusError(400, 'Algo ha fallado');
    }
    // Agregar el producto al carrito
    const result = await CarritoService.agregarProductoAlCarrito(userId, productId, cantidad);
    // Enviar el resultado 201 como respuesta
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Error al agregar producto al carrito' });
  }
};

// Modificar cantidad de producto en el carrito
export const modificarCantidadProductoEnCarrito = async (req, res) => {
  const { carritoId, cantidad } = req.body;
  try {
    // Si no se proporciona el carritoId o cantidad, lanzar un error 400
    if (!carritoId || !cantidad) {
      throw new HttpStatusError(400, 'Los campos carritoId y cantidad son obligatorios');
    }
    // Modificar la cantidad del producto en el carrito cuando se proporciona el carritoId y cantidad
    const result = await CarritoService.modificarCantidadProductoEnCarrito(carritoId, cantidad);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Error al modificar cantidad del producto en el carrito' });
  }
};

// Eliminar producto del carrito
export const eliminarProductoDelCarrito = async (req, res) => {
  const { carritoId } = req.params;
  // Si no se proporciona el carritoId, lanzar un error 400
  try {
    if (!carritoId) {
      throw new HttpStatusError(400, 'El parámetro carritoId es obligatorio');
    }
    // Eliminar el producto del carrito
    const result = await CarritoService.eliminarProductoDelCarrito(carritoId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Error al eliminar producto del carrito' });
  }
};


export const confirmarCompra = async (req, res) => {
  const { carritoId, userId, productos } = req.body;
  try {
    console.log('confirmarCompra', req.body);
    const result = await CarritoService.confirmarCompra(userId, carritoId, productos);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Error al confirmar la compra' });
  }
}