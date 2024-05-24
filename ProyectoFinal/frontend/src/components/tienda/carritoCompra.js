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
  
      await fetch(`http://localhost:3000/carrito/${carritoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      setProductos(prevProductos => prevProductos.filter(item => item._id !== carritoId));
  
      await actualizarUnidadesDelJuego(producto);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      setError('Error al eliminar producto del carrito');
    }
  };
  
  
  const actualizarUnidadesDelJuego = async (producto) => {
    try {
      const unidadesEliminadas = producto.cantidad;
      const nuevasUnidades = producto.productId.unidades + unidadesEliminadas;
      await fetch(`http://localhost:3000/games/${producto.productId._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ unidades: nuevasUnidades })
      });
  
      setProductos(prevProductos => prevProductos.map(item => {
        if (item._id === producto._id) {
          return {
            ...item,
            productId: {
              ...item.productId,
              unidades: nuevasUnidades
            }
          };
        }
        return item;
      }));
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
  
        const response = await fetch(`http://localhost:3000/games/${productoEnCarrito.productId._id}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener información del juego');
        }

        const juego = await response.json();

        if (juego.unidades <= 0 && incremento === 1) {
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
        obtenerProductosDelCarrito(user._id);
      }
    } catch (error) {
      console.error('Error al modificar la cantidad del producto:', error);
    }
  };
  

  const modificarCantidadJuegos = async (carritoId, nuevaCantidad, incremento) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        const productoEnCarrito = productos.find(producto => producto._id === carritoId);
        if (!productoEnCarrito) {
          throw new Error('Producto no encontrado en el carrito');
        }
        
        const diferencia = nuevaCantidad - productoEnCarrito.cantidad;
        
        const nuevasUnidades = productoEnCarrito.productId.unidades - diferencia;
        
        await fetch(`http://localhost:3000/games/${productoEnCarrito.productId._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ unidades: nuevasUnidades })
        });
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
      <Header/>
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

          {productos.length > 0 && (
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
                <Link to="/checkout"><button className='botonProcesarCompra' onClick={procesarCompra}><a>Realizar pago</a></button></Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CarritoCompra;