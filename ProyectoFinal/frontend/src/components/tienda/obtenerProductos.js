import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './obtenerProductos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/games');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        setError('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    obtenerProductos();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {productos.map(producto => (
        <Producto
          key={producto.id}
          titulo={producto.titulo}
          precio={producto.precio}
          imagen={producto.imagen}
          video={producto.video}
        />
      ))}
    </div>
  );
}

function Producto({ titulo, precio, imagen }) {
  return (
    <div className="producto-container">
      <img src={imagen} alt={titulo} className="producto-image" />
      <div className="producto-info">
        <div className="titulo">{titulo}</div>
        <div className="precio">{precio}€</div>
      </div>
    </div>
  );
}


export default Productos;
