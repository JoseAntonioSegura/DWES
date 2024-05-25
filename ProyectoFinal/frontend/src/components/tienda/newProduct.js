import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './newProduct.css';

function NewProduct({ cantidad, ordenar }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(`${url}/games?sort=${ordenar}`);
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        const productosLimitados = data.games.slice(0, cantidad);
        setProductos(productosLimitados);
        setLoading(false);
      } catch (error) {
        setError('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    obtenerProductos();
  }, [cantidad, ordenar]);

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
          />
        </Link>
      ))}
    </div>
  );


}



function Producto({ titulo, precio, imagen }) {
  return (
    <div className='containerNewProduct'>
        <img src={imagen} alt={titulo} className="imageNewProduct" />
        <div className="cotainerTextNewProduct">
          <div className="titleNewProduct">Último lanzamiento:</div>
          <div className="nameNewProduct">{titulo}</div>
          <div className="priceNewProduct">{precio}€</div>
        </div>
    </div>
  );
}

export default NewProduct;
