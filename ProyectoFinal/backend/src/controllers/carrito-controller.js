import * as CarritoService from '../services/database/carrito-db-service.js';

export const obtenerProductosCarrito = async (req, res) => {
  try {
    const productos = await CarritoService.obtenerProductosDelCarrito(req.params.userId);
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos del carrito:', error);
    res.status(500).json({ message: 'Error al obtener los productos del carrito' });
  }
};


export const agregarProductoAlCarrito = async (req, res) => {
  const { userId, productId, cantidad } = req.body;
  try {
    const result = await CarritoService.agregarProductoAlCarrito(userId, productId, cantidad);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const modificarCantidadProductoEnCarrito = async (req, res) => {
  const { carritoId, cantidad } = req.body;
  try {
    const result = await CarritoService.modificarCantidadProductoEnCarrito(carritoId, cantidad);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarProductoDelCarrito = async (req, res) => {
  const { carritoId } = req.params;
  try {
    const result = await CarritoService.eliminarProductoDelCarrito(carritoId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
