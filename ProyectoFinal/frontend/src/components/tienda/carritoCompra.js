import React, { useState } from 'react';

function CarritoCompra() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  // Método para agregar un artículo al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setTotal(total + producto.precio);
  };

  // Método para eliminar un artículo del carrito
  const eliminarDelCarrito = (producto) => {
    const nuevoCarrito = carrito.filter(item => item !== producto);
    setCarrito(nuevoCarrito);
    setTotal(total - producto.precio);
  };

  // Método para actualizar la cantidad de un artículo en el carrito
  const actualizarCantidad = (producto, nuevaCantidad) => {
    const nuevoCarrito = carrito.map(item => {
      if (item === producto) {
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    });
    setCarrito(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  // Método para calcular el total de la compra
  const calcularTotal = (carrito) => {
    let totalCompra = 0;
    carrito.forEach(item => {
      totalCompra += item.precio * item.cantidad;
    });
    setTotal(totalCompra);
  };

  // Método para simular el proceso de checkout
  const checkout = () => {
    if (carrito.length === 0) {
      setError('El carrito está vacío. Por favor, agrega artículos antes de continuar.');
    } else {
      // Implementa lógica para finalizar la compra (puede ser una llamada a una API, etc.)
      setError('');
      setCarrito([]);
      setTotal(0);
      alert('¡Compra realizada con éxito!');
    }
  };

  return (
    <div>
      <h2>Carrito de Compra</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((producto, index) => (
            <div key={index}>
              <p>{producto.nombre} - Cantidad: {producto.cantidad}</p>
              <button onClick={() => actualizarCantidad(producto, producto.cantidad - 1)}>-</button>
              <button onClick={() => actualizarCantidad(producto, producto.cantidad + 1)}>+</button>
              <button onClick={() => eliminarDelCarrito(producto)}>Eliminar</button>
            </div>
          ))}
          <p>Total: {total}€</p>
          <button onClick={checkout}>Checkout</button>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default CarritoCompra;
