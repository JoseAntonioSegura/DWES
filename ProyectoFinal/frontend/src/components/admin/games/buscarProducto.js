import React, { useState } from 'react';
import './buscarProducto.css';

function BuscarProducto() {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [error, setError] = useState('');
  const url = process.env.REACT_APP_URL;

  const buscarProducto = async () => {
    if (!productoBuscado.trim()) {
      setError('Por favor, ingresa un nombre de producto válido.');
      return;
    }

    try {
      const response = await fetch(`${url}/games/titulo/${productoBuscado}`);
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
      <h2>Buscar Producto</h2>
      <p>Ingrese el nombre del producto que desea buscar.</p>
      <input 
        type="text" 
        value={productoBuscado} 
        onChange={(e) => setProductoBuscado(e.target.value)} 
        placeholder="Nombre del producto" 
      />
      <button onClick={buscarProducto}>Buscar</button>
      {error && <p className="error-message">{error}</p>}
      {productoEncontrado && (
        <div className="product-details">
          <h2>{productoEncontrado.titulo}</h2>
          <p><span className="label">ID:</span> {productoEncontrado._id}</p>
          <p><span className="label">Descripción:</span> {productoEncontrado.descripcion}</p>
          <p><span className="label">Unidades:</span> {productoEncontrado.unidades}</p>
          <p><span className="label">Categoría:</span> {productoEncontrado.categoria.join(', ')}</p>
          <p><span className="label">Precio:</span> {productoEncontrado.precio}</p>
          <p><span className="label">Desarrollador:</span> {productoEncontrado.desarrollador}</p>
          <p><span className="label">Plataforma:</span> {productoEncontrado.plataforma}</p>
          <p><span className="label">Fecha de Lanzamiento:</span> {productoEncontrado.fechaLanzamiento}</p>
          <img src={productoEncontrado.imagen} alt="Imagen del producto" />
          <p><span className="label">Trailer:</span> {productoEncontrado.trailer}</p>
          <p><span className="label">PEGI:</span> {productoEncontrado.pegi}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarProducto;
