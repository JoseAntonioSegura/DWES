import React, { useState, useEffect } from 'react';
import './carritoCompra.css';

const CarritoCompra = () => {
  const [productos, setProductos] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [error, setError] = useState('');
  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

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
      calcularTotalCompra(data);
    } catch (error) {
      console.error('Error al obtener productos del carrito:', error);
      setError('Error al obtener productos del carrito');
    }
  };

  const calcularTotalCompra = (productos) => {
    let total = 0;
    productos.forEach(producto => {
      total += producto.cantidad * producto.productId.precio;
    });
    setTotalCompra(total);
  };
  
  const eliminarDelCarrito = async (producto) => {
    try {
      const carritoId = producto._id;
  
      // Eliminar el producto del carrito
      await fetch(`http://localhost:3000/carrito/${carritoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // Actualizar las unidades del juego
      await actualizarUnidadesDelJuego(producto);
      
      // Actualizar la lista de productos en el carrito
      obtenerProductosDelCarrito(JSON.parse(localStorage.getItem('user'))._id);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      setError('Error al eliminar producto del carrito');
    }
  };
  
  const actualizarUnidadesDelJuego = async (producto) => {
    try {
      const unidadesEliminadas = producto.cantidad; // Obtener la cantidad de productos eliminados
      const nuevasUnidades = producto.productId.unidades + unidadesEliminadas; // Restar las unidades eliminadas
      await fetch(`http://localhost:3000/games/${producto.productId.titulo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ unidades: nuevasUnidades })
      });
    } catch (error) {
      console.error('Error al actualizar las unidades del juego:', error);
    }
  };
  
  const modificarCantidad = async (carritoId, cantidadActual, incremento) => {
    try {
      const nuevaCantidad = cantidadActual + incremento;
      if (nuevaCantidad < 1) {
        throw new Error('La cantidad mínima es 1');
      }
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        const productoEnCarrito = productos.find(producto => producto._id === carritoId);
        if (!productoEnCarrito) {
          throw new Error('Producto no encontrado en el carrito');
        }
  
        const response = await fetch(`http://localhost:3000/games/${productoEnCarrito.productId.titulo}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener información del juego');
        }

        const juego = await response.json();
        if (juego[0].unidades <= 0 && incremento === 1) {
          throw new Error('No hay suficientes unidades disponibles');
        }
  
        await fetch(`http://localhost:3000/carrito`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ carritoId, cantidad: nuevaCantidad })
        });
        await modificarCantidadJuegos(carritoId, nuevaCantidad, incremento);
        obtenerProductosDelCarrito(user._id); // Actualizar productos en el carrito
      }
    } catch (error) {
      console.error('Error al modificar la cantidad del producto:', error);
    }
  };
  
  

  // Función para modificar la cantidad de un producto en el carrito y actualizar la cantidad en el backend
  const modificarCantidadJuegos = async (carritoId, nuevaCantidad, incremento) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        const productoEnCarrito = productos.find(producto => producto._id === carritoId);
        if (!productoEnCarrito) {
          throw new Error('Producto no encontrado en el carrito');
        }
        
        // Calcula la diferencia entre la nueva cantidad y la cantidad anterior
        const diferencia = nuevaCantidad - productoEnCarrito.cantidad;
        
        // Actualiza las unidades del producto en el inventario
        const nuevasUnidades = productoEnCarrito.productId.unidades - diferencia;
        
        // Envía una solicitud PATCH al backend para actualizar las unidades del juego
        await fetch(`http://localhost:3000/games/${productoEnCarrito.productId.titulo}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ unidades: nuevasUnidades }) // Envía las nuevas unidades del producto
        });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al modificar la cantidad del producto:', error);
    }
  };
  
  // Función para eliminar todos los productos del carrito
  const eliminarTodosLosProductos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        for (const producto of productos) {
          await eliminarDelCarrito(producto);
        }
        setProductos([]);
        setTotalCompra(0);
      }
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
      setError('Error al eliminar todos los productos del carrito');
    }
  };
  
  const procesarCompra = async () => {
    if (!direccionEnvio || !metodoPago) {
      setError('Por favor ingresa una dirección de envío y selecciona un método de pago.');
      return;
    }

    // Si la compra se realiza con éxito, puedes eliminar los productos del carrito.
    alert('Compra procesada con éxito!');
    eliminarTodosLosProductos();
  };

  if (!sesionIniciada) {
    return <div>No se ha iniciado sesión.</div>;
  }

  return (
    <div>
      {error && <div>{error}</div>}
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
                      <img src={producto.productId.imagen} alt={producto.productId.titulo} className='imagenes' />
                      <span>{producto.productId.titulo}</span>
                    </td>
                    <td>
                      <input
                        type="button"
                        value="-"
                        onClick={() => modificarCantidad(producto._id, producto.cantidad, -1)}
                      />
                      <span>{producto.cantidad}</span>
                      <input
                        type="button"
                        value="+"
                        onClick={() => modificarCantidad(producto._id, producto.cantidad, 1)}
                      />
                    </td>
                    <td>${producto.productId.precio}</td>
                    <td>${producto.cantidad * producto.productId.precio}</td> {/* Precio total */}
                    <td>
                      <button onClick={() => eliminarDelCarrito(producto)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>Total de la compra: ${totalCompra}</div>
            <div>
              <label htmlFor="direccionEnvio">Dirección de Envío:</label>
              <input
                type="text"
                id="direccionEnvio"
                value={direccionEnvio}
                onChange={(e) => setDireccionEnvio(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="metodoPago">Método de Pago:</label>
              <select
                id="metodoPago"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <option value="">Selecciona un método de pago</option>
                <option value="tarjeta">Tarjeta de Crédito</option>
                <option value="paypal">PayPal</option>
                <option value="efectivo">Efectivo</option>
              </select>
            </div>
            <button onClick={procesarCompra}>Procesar Compra</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoCompra;
