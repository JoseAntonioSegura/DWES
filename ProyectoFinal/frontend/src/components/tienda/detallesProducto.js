import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube'; // Importar el componente YouTube
import Header from '../inicio/header.js';
import './detallesProducto.css';

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

  const agregarAlCarrito = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Manejar el caso en que el usuario no esté autenticado
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/carrito/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Enviar el token en el encabezado de autorización
        },
        body: JSON.stringify({ productId: producto._id }) // Enviar el ID del producto al carrito
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto al carrito');
      }

      // Manejar la respuesta exitosa
      alert('Producto agregado al carrito correctamente.');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar el producto al carrito.');
    }
  };

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
  if (loading) {
    return <div>Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  console.log(producto);

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
            <p>Desarrolladora: {producto[0].desarrollador}</p>
            <p>Géneros: {producto[0].categoria}</p>
            <p>categoria: {producto[0].pegi}</p>
            <p>Fecha Lanzamiento: {producto[0].fechaLanzamiento}</p>
            <p className='precioDatos'>Precio: {producto[0].precio}€</p>
          </div>
          <div className='contenedorCompraBotones'>
            <button className='carritoBtn' onClick={agregarAlCarrito}><strong>Agregar al Carrito</strong></button>
            <button className='compraBtn'><strong>Comprar Ahora</strong></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetallesProducto;
