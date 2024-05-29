import './editarProducto.css';
import React, { useState } from 'react';

function EditarProducto() {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    unidades: '',
    categoria: [],
    precio: '',
    imagen: '',
    trailer: '',
    pegi: '',
    desarrollador: '',
    plataforma: '',
    fechaLanzamiento: ''
  });
  const [error, setError] = useState('');
  const url = process.env.REACT_APP_URL;

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleBuscarProducto = async () => {
    if (!productId.trim()) {
      setError('Por favor, ingresa un ID de producto válido.');
      return;
    }
    try {
      const response = await fetch(`${url}/games/${productId}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      const data = await response.json();
      setProductData(data);
      setFormData(data);
      setError('');
    } catch (error) {
      console.error('Error al buscar el producto:', error.message);
      setError('No se pudo buscar el producto. Inténtalo de nuevo más tarde.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'fechaLanzamiento' ? formatDate(value) : value;
    setFormData({ ...formData, [name]: formattedValue });
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const handleActualizarProducto = async () => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(`${url}/games/admin/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'rol': usuario.rol,
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      setError('Producto actualizado con éxito.');
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      setError('No se pudo actualizar el producto. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="actualizarProducto">
      <h1>Actualizar Producto</h1>
      <label>Ingrese el ID del producto:</label>
      <input type="text" value={productId} onChange={handleProductIdChange} />
      <button onClick={handleBuscarProducto}>Buscar</button>
      {productData && (
        <div className="product-details">
          <label>Título:</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} />
          <label>Descripción:</label>
          <input type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
          <label>Unidades:</label>
          <input type="number" name="unidades" value={formData.unidades} onChange={handleInputChange} />
          <label>Categoría:</label>
          <input type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} />
          <label>Precio:</label>
          <input type="number" name="precio" value={formData.precio} onChange={handleInputChange} />
          <label>Imagen:</label>
          <input type="text" name="imagen" value={formData.imagen} onChange={handleInputChange} />
          <label>Tráiler:</label>
          <input type="text" name="trailer" value={formData.trailer} onChange={handleInputChange} />
          <label>PEGI:</label>
          <input type="number" name="pegi" value={formData.pegi} onChange={handleInputChange} />
          <label>Desarrollador:</label>
          <input type="text" name="desarrollador" value={formData.desarrollador} onChange={handleInputChange} />
          <label>Plataforma:</label>
          <input type="text" name="plataforma" value={formData.plataforma} onChange={handleInputChange} />
          <label>Fecha de Lanzamiento:</label>
          <input type="date" name="fechaLanzamiento" value={formData.fechaLanzamiento} onChange={handleInputChange} />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleActualizarProducto}>Actualizar Producto</button>
        </div>
      )}
    </div>
  );
}

export default EditarProducto;
