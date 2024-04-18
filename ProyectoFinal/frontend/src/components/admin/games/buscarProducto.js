import React, { useState } from 'react';
import './buscarProducto.css';

function BuscarProducto() {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [error, setError] = useState('');

  const buscarProducto = async () => {
    if (!productoBuscado.trim()) {
      setError('Por favor, ingresa un nombre de producto válido.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/games/titulo/${productoBuscado}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        setError('Producto no encontrado');
        setProductoEncontrado(null);
      } else {
        setProductoEncontrado(data[0]);
        setError('');
      }
    } catch (error) {
      console.error('Error al buscar el producto:', error.message);
      setError('No se pudo buscar el producto. Inténtalo de nuevo más tarde.');
      setProductoEncontrado(null);
    }
  };

  return (
    <div className="buscarProducto">
      <h1>Buscar Producto</h1>
      <input 
        type="text" 
        value={productoBuscado} 
        onChange={(e) => setProductoBuscado(e.target.value)} 
        placeholder="Nombre del producto" 
      />
      <button onClick={buscarProducto}>Buscar</button>
      {error && <p className="error-message">{error}</p>}
      {productoEncontrado && (
        <div>
          <h2>{productoEncontrado.titulo}</h2>
          <p>ID: {productoEncontrado._id}</p>
          <p>Descripción: {productoEncontrado.descripcion}</p>
          <p>Unidades: {productoEncontrado.unidades}</p>
          <p>Categoría: {productoEncontrado.categoria.join(', ')}</p>
          <p>Precio: {productoEncontrado.precio}</p>
          <p>Desarrollador: {productoEncontrado.desarrollador}</p>
          <p>Plataforma: {productoEncontrado.plataforma}</p>
          <p>Fecha de Lanzamiento: {productoEncontrado.fechaLanzamiento}</p>
          <img src={productoEncontrado.imagen} alt="Imagen del producto" />
          <p>Trailer: {productoEncontrado.trailer}</p>
          <p>PEGI: {productoEncontrado.pegi}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarProducto;
