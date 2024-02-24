import React, { useState, useEffect } from 'react';
import './carritoCompra.css';
import Header from '../inicio/header.js';

const CarritoCompra = () => {
  const [productos, setProductos] = useState([]);
  const [sesionIniciada, setSesionIniciada] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSesionIniciada(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        obtenerProductosDelCarrito(user._id);
      }
    } else {
      setSesionIniciada(false);
    }
  }, []);

  const obtenerProductosDelCarrito = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/carrito/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener productos del carrito');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos del carrito:', error);
    }
  };
  
  const modificarCantidad = async (carritoId, cantidad) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        await fetch(`http://localhost:3000/carrito`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ carritoId, cantidad })
        });
  
        // Obtener los productos actualizados del carrito después de modificar la cantidad
        await obtenerProductosDelCarrito(user._id);
        window.location.reload();

        // Verificar si la nueva cantidad es menor o igual a 0 y eliminar el producto si es así
        if (cantidad <= 0) {
          
          eliminarProducto(carritoId);
        }
      }
    } catch (error) {
      console.error('Error al modificar la cantidad del producto:', error);
    }
  };
  
  
  
  const eliminarProducto = async (carritoId) => {
    try {
      await fetch(`http://localhost:3000/carrito/${carritoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Actualizar los productos después de eliminar un producto
      obtenerProductosDelCarrito(JSON.parse(localStorage.getItem('user'))._id); // Pasar userId
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const calcularPrecioTotal = (cantidad, precioUnitario) => {
    return cantidad * precioUnitario;
  };
  
  if (!sesionIniciada) {
    return <div>No se ha iniciado sesión.</div>;
  }

  return (
    <div>
      {productos.length === 0 ? (
        <div>No hay productos en el carrito.</div>
      ) : (
        <div>
          <h2>Carrito de Compra</h2>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
              <tr key={index}>
                <td>
                  <img src={producto.productId.imagen} className='imagenes' />
                  <span>{producto.productId.titulo}</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => modificarCantidad(producto._id, e.target.value)}
                  />
                </td>
                <td>${producto.productId.precio}</td>
                <td>${calcularPrecioTotal(producto.cantidad, producto.productId.precio)}</td> {/* Precio total */}
                <td>
                  <button onClick={() => eliminarProducto(producto._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CarritoCompra;
