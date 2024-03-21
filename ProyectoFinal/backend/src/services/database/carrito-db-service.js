import Carrito from '../../models/Carrito.js';
import { agregarFactura } from './factura-db-service.js';

// Agregar producto al carrito
export async function agregarProductoAlCarrito(userId, productId, cantidad) {
  try {
    // Verificar si ya existe un producto del mismo tipo en el carrito del usuario
    const carritoExistente = await Carrito.findOne({ userId, productId });

    if (carritoExistente) {
      // Si el producto ya existe, simplemente actualiza la cantidad
      carritoExistente.cantidad += cantidad;
      await carritoExistente.save();
      return { message: 'Producto agregado al carrito', carrito: carritoExistente };
    } else {
      // Si el producto no existe, crea una nueva entrada en el carrito
      const nuevoProducto = new Carrito({ userId, productId, cantidad });
      await nuevoProducto.save();
      return { message: 'Producto agregado al carrito', carrito: nuevoProducto };
    }
  } catch (error) {
    throw new Error('Error al agregar producto al carrito');
  }
}

// Obtener productos del carrito
export async function obtenerProductosDelCarrito(userId) {
  try {
    // Buscar los productos del carrito por el ID del usuario
    const productos = await Carrito.find({ userId }).populate('productId');
    return productos;
  } catch (error) {
    throw new Error('Error al obtener los productos del carrito');
  }
}

// Modificar cantidad de producto en el carrito
export async function modificarCantidadProductoEnCarrito(carritoId, cantidad) {
  try {
    // Buscar el producto en el carrito por su ID
    const productoEnCarrito = await Carrito.findById(carritoId);

    if (!productoEnCarrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    // Actualizar la cantidad del producto
    productoEnCarrito.cantidad = cantidad;
    await productoEnCarrito.save();

    return { message: 'Cantidad de producto modificada en el carrito', carrito: productoEnCarrito };
  } catch (error) {
    throw new Error('Error al modificar cantidad del producto en el carrito');
  }
}

// Eliminar producto del carrito
export async function eliminarProductoDelCarrito(carritoId) {
  try {
    // Buscar y eliminar el producto del carrito por su ID
    const productoEnCarrito = await Carrito.findByIdAndDelete(carritoId);

    if (!productoEnCarrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    return { message: 'Producto eliminado del carrito', carrito: productoEnCarrito };
  } catch (error) {
    throw new Error('Error al eliminar producto del carrito');
  }
}

export async function confirmarCompra(userId, carritoId, productos) {
  try {
    if (productos.length === 0) {
      throw new Error('No hay productos en el carrito');
    }
    
    agregarFactura(userId, productos);
    
    await Carrito.findByIdAndDelete(carritoId);
    
    return { message: 'Compra confirmada', productos };
  } catch (error) {
    throw new Error('Error al confirmar la compra');
  }
}	