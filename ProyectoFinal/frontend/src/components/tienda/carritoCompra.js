import React, { useState, useEffect } from 'react';
import './carritoCompra.css';
import Header from '../inicio/header';
import { Link } from 'react-router-dom';

const CarritoCompra = () => {
  const [productos, setProductos] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [error, setError] = useState('');

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
    // Redondear el total a dos decimales
    total = parseFloat(total.toFixed(2));
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
  
  const procesarCompra = async () => {
    console.log("Ningun fall0");
  };

  if (!sesionIniciada) {
    return <div>No se ha iniciado sesión.</div>;
  }

  return (
    <>
      <Header />
      <div className="container-center">
        <div className="carrito-container">
          {error && <div>{error}</div>}
          <div>
            {productos.length === 0 ? (
              <div>No hay productos en el carrito.</div>
            ) : (
              <div className='contenedorIzquierdo'>
                <h2>Carrito de Compra</h2>
                {productos.map((producto, index) => (
                  <div key={index} className='productosCarrito'>
                    <div className='productosCarritoImagen'>
                      <img src={producto.productId.imagen} alt={producto.productId.titulo} className='imagenes' />
                    </div>
                    <div className='productosCarritoPrecio'>
                      <h3>{producto.productId.titulo}</h3>
                      <div className='productosCarritoCantidad'>
                        <span className='productosPrecio'>{producto.productId.precio}€</span>
                        <input className='modificar-cantidad-btn'
                          type="button"
                          value="-"
                          onClick={() => modificarCantidad(producto._id, producto.cantidad, -1)}
                        />
                        <span>{producto.cantidad}</span>
                        <input className='modificar-cantidad-btn'
                          type="button"
                          value="+"
                          onClick={() => modificarCantidad(producto._id, producto.cantidad, 1)}
                        />
                      </div>
                    </div>
                    <div className='productosCarritoInfo'>
                      <button className='botonEliminar' onClick={() => eliminarDelCarrito(producto)}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='contenedorDerecho'>
          <h2 className='contenedorDerechoTitulo'>Resumen</h2>
          <div className='contenedorDerechoContenido'>
            <p className='tituloContenedorDerecho'>Productos</p>
            {productos.map((producto, index) => (
              <div key={index} className='resumen'>
                <p>{producto.cantidad} x {producto.productId.titulo}</p>
                <p>{(producto.cantidad * producto.productId.precio).toFixed(2)}€</p>
              </div>
            ))}
          </div>
          <div className='totalCompra'>
            <p>Total de la compra: {totalCompra}€</p>
            <Link to="/checkout"><button className='botonProcesarCompra' onClick={procesarCompra}>Realizar el pago</button></Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CarritoCompra;
