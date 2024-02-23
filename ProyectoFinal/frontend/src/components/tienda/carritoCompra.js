import React, { useState, useEffect } from 'react';

function CarritoCompra() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProductosDelCarrito();
  }, []);

  const obtenerProductosDelCarrito = async () => {
    try {
      // Recuperar userId del localStorage
// Recuperar userId del localStorage
const userId = localStorage.getItem('userId');
if (!userId) {
  throw new Error('Usuario no encontrado en el almacenamiento local');
}
      if (!userId) {
        throw new Error('Usuario no encontrado en el almacenamiento local');
      }

      // Recuperar token del localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado en el almacenamiento local');
      }

      const response = await fetch(`http://localhost:3000/carrito/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener los productos del carrito');
      }
      const data = await response.json();
      setProductos(data);
      setLoading(false);
    } catch (error) {
      setError('Error al obtener los productos del carrito');
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const modificarCantidadProducto = async (carritoId, nuevaCantidad) => {
    try {
      const response = await fetch(`/carrito/${carritoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Recuperar token del localStorage
        },
        body: JSON.stringify({ carritoId, nuevaCantidad })
      });
      if (!response.ok) {
        throw new Error('Error al modificar la cantidad del producto en el carrito');
      }
      // Actualizar el estado después de modificar la cantidad
      obtenerProductosDelCarrito();
    } catch (error) {
      console.error('Error al modificar la cantidad del producto en el carrito:', error);
    }
  };

  const eliminarProductoDelCarrito = async (carritoId) => {
    try {
      const response = await fetch(`/carrito/${carritoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Recuperar token del localStorage
        }
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto del carrito');
      }
      // Actualizar el estado después de eliminar el producto
      obtenerProductosDelCarrito();
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  if (loading) {
    return <div>Cargando productos del carrito...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <p>{producto.nombre} - Cantidad: {producto.cantidad}</p>
            <button onClick={() => modificarCantidadProducto(producto.id, producto.cantidad + 1)}>+</button>
            <button onClick={() => modificarCantidadProducto(producto.id, producto.cantidad - 1)}>-</button>
            <button onClick={() => eliminarProductoDelCarrito(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarritoCompra;
