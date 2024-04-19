import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './obtenerProductos.css';

function Productos({ cantidad, ordenar }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/games?sort=${ordenar}&limit=${cantidad}`);
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        // Ordena los productos por unidades y toma los primeros 'cantidad'
        const productosOrdenados = data;
        setProductos(productosOrdenados);
        setLoading(false);
      } catch (error) {
        setError('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    // Llama a obtenerProductos al montar el componente
    obtenerProductos();

    // Define un intervalo para actualizar los productos cada 5 minutos (300000 milisegundos)
    const interval = setInterval(obtenerProductos, 300000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [cantidad]);

  
  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
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
    </>
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

export default Productos;
