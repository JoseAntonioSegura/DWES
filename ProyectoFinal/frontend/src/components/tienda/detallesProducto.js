import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
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

  function extractVideoId(url) {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
  
    for (let pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
  
    return null; 
  }

  const agregarAlCarrito = async () => {
    try {
      // Obtener el token del Local Storage
      const token = localStorage.getItem('token');
      // Obtener el usuario del Local Storage
      const user = JSON.parse(localStorage.getItem('user'));
  
      // Verificar si hay un token y un usuario almacenados en el Local Storage
      if (!token || !user) {
        throw new Error('Token de autorización o usuario no encontrado');
      }
  
      // Construir el cuerpo de la solicitud
      const body = JSON.stringify({
        userId: user._id, // Suponiendo que el ID del usuario está en la propiedad _id
        productId: producto[0]._id,
        cantidad: 1
      });
  
      // Enviar la solicitud al backend con el token de autorización en el encabezado
      const response = await fetch('http://localhost:3000/carrito/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Añadir el token de autorización al encabezado
        },
        body: body
      });
  
      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }
  
      const data = await response.json();
      alert(data.message); // Mostrar mensaje de respuesta del servidor
  
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  
  

  if (loading) {
    return <div>Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
