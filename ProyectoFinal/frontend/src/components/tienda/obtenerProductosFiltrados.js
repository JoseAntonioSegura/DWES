import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './obtenerProductos.css';

function ProductosFiltrados({ consulta }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(`${url}/games?${consulta}`);
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProductos(data.games);
        setLoading(false);
      } catch (error) {
        setError('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    obtenerProductos();

    const interval = setInterval(obtenerProductos, 300000);
    return () => clearInterval(interval);
  }, [consulta]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {productos.map(producto => (
        <Link key={producto.id} to={`/producto/${producto.titulo}`}>
          <Producto
            titulo={producto.titulo}
            precio={producto.precio}
            imagen={producto.imagen}
            video={producto.video}
          />
        </Link>
      ))}
    </div>
  );
}

function Producto({ titulo, precio, imagen }) {
  return (
    <div className='contenedorProductoInterior'>
      <div className="producto-container">
        <img src={imagen} alt={titulo} className="producto-image" />
        <div className="producto-info">
          <div className="titulo">{titulo}</div>
          <div className="precio">{precio}€</div>
        </div>
      </div>
    </div>
  );
}

export default ProductosFiltrados;
