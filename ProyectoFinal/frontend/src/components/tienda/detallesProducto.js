import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube'; // Importar el componente YouTube
import Header from '../inicio/header.js';
import './detallesProducto.css'

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
  
  function extractVideoId(url) {
    // Patrones para encontrar el ID del video de YouTube en la URL
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
  
    // Iterar sobre los patrones y extraer el ID del video si se encuentra
    for (let pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
  
    return null; 
  }

  // Verificar si producto tiene elementos antes de acceder a sus propiedades
  if (!producto || producto.length === 0) {
    return <div>Cargando detalles del producto...</div>;
  }
  
  console.log(producto)
  return (
    <>
      <Header />
      <div className="contenedorProducto">
        <div className='contenedorDatos'>
          <img src={producto[0].imagen} alt={titulo}/>
          <YouTube videoId={extractVideoId(producto[0].trailer)} /> 
          <p>Descripción: {producto[0].descripcion}</p>
          <p>Fecha Lanzamiento: {producto[0].fechaLanzamiento}</p>
        </div>
        <div className='contenedorCompra'>
          <h2>{producto[0].titulo}</h2>
          <p>Precio: {producto[0].precio}€</p>
          <p>Unidades disponibles: {producto[0].unidades}</p>
        </div>
      </div>
    </>
  );
}


export default DetallesProducto;
