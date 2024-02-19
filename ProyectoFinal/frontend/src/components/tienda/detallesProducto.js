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
          <YouTube  iframeClassName="youtubeContainer" videoId={extractVideoId(producto[0].trailer) } opts={{ playerVars: { autoplay: 1 }}}  /> 
          <div className='contenedorDatosInfo'>
            <h1>{producto[0].titulo}</h1>
            <p>Descripción: {producto[0].descripcion}</p>
          </div>
        </div>
        <div className='contenedorCompra'>
          <h1></h1>
          <img src={producto[0].imagen} alt={titulo}/>
          <div className='contenedorCompraDatos'>
            <p>Unidades disponibles: {producto[0].unidades}</p>
            <p>Géneros: {producto[0].categoria}</p>
            <p>categoria: {producto[0].pegi}</p>
            <p>Fecha Lanzamiento: {producto[0].fechaLanzamiento}</p>
            <p className='precioDatos'>Precio: {producto[0].precio}€</p>
          </div>
          <div className='contenedorCompraBotones'>
            <button className='carritoBtn'><strong>Agregar al Carrito</strong></button>
            <button className='compraBtn'><strong>Comprar Ahora</strong></button>
          </div>
        </div>
      </div>
    </>
  );
}


export default DetallesProducto;
