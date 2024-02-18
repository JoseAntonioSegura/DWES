import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../inicio/header.js';

function DetallesProducto() {
  const { titulo } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDetallesProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/games/${titulo}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del producto');
        }
        const data = await response.json();
        setProducto(data);
        setLoading(false);
      } catch (error) {
        setError('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
        console.error('Error:', error);
      }
    };
  
    obtenerDetallesProducto();
  }, [titulo]);
  
  // Verificar si producto tiene elementos antes de acceder a sus propiedades
  if (!producto || producto.length === 0) {
    return <div>Cargando detalles del producto...</div>;
  }
  
  return (
    <div>
      <>
      <Header />
        <h2>{producto[0].titulo}</h2>
        <p>Descripción: {producto[0].descripcion}</p>
        <p>Precio: {producto[0].precio}€</p>
        <p>Unidades disponibles: {producto[0].unidades}</p>
      </>
    </div>
  );
  
}

export default DetallesProducto;
