import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import Header from '../inicio/header.js';
import './detallesProducto.css';

function DetallesProducto() {
  const { titulo } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productoAgregado, setProductoAgregado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDetallesProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/games/titulo/${titulo}`);
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
  }, [titulo, productoAgregado]);

  useEffect(() => {
    if (productoAgregado) {
      const timeout = setTimeout(() => {
        setProductoAgregado(false);
      }, 1000);
  
      return () => clearTimeout(timeout);
    }
  }, [productoAgregado]);

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
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!token || !user) {
        navigate('/login');
        return;
      }

      const carritoBody = JSON.stringify({
        userId: user._id,
        productId: producto[0]._id,
        cantidad: 1
      });
  
      const carritoResponse = await fetch('http://localhost:3000/carrito/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: carritoBody
      });    
  
      if (!carritoResponse.ok) {
        throw new Error('Error al agregar producto al carrito');
      }

      const updatedProduct = { ...producto[0], unidades: producto[0].unidades - 1 };
  
      const productoBody = JSON.stringify({
        unidades: updatedProduct.unidades
      });
  
      const productoResponse = await fetch(`http://localhost:3000/games/${producto[0]._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: productoBody
      });
  
      if (!productoResponse.ok) {
        throw new Error('Error al actualizar las unidades del producto');
      }

      setProductoAgregado(true);
  
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const comprarAhora = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!token || !user) {
        navigate('/login');
        return;
      }

      const carritoBody = JSON.stringify({
        userId: user._id,
        productId: producto[0]._id,
        cantidad: 1
      });
  
      const carritoResponse = await fetch('http://localhost:3000/carrito/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: carritoBody
      });    
  
      if (!carritoResponse.ok) {
        throw new Error('Error al agregar producto al carrito');
      }

      const updatedProduct = { ...producto[0], unidades: producto[0].unidades - 1 };
  
      const productoBody = JSON.stringify({
        unidades: updatedProduct.unidades
      });
  
      const productoResponse = await fetch(`http://localhost:3000/games/${producto[0]._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: productoBody
      });
  
      if (!productoResponse.ok) {
        throw new Error('Error al actualizar las unidades del producto');
      }

      setProductoAgregado(true);
  
      navigate('/carrito');
  
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
  
  
  const unidadesDisponibles = producto[0].unidades;

  

  return (
    <>
      <Header productoAgregado={productoAgregado} mostrarCarrito={true} />
      <div className="contenedorProducto">
        <div className='contenedorDatos'>
          <YouTube  iframeClassName="youtubeContainer" videoId={extractVideoId(producto[0].trailer) } opts={{ playerVars: { autoplay: 1 }}}  /> 
          <div className='contenedorDatosInfo'>
            <h1>{producto[0].titulo}</h1>
            <p>Descripción: {producto[0].descripcion}</p>
          </div>
        </div>
        <div className='contenedorCompra'>
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
            <button className='carritoBtn' onClick={agregarAlCarrito} disabled={unidadesDisponibles === 0}>
              <strong>Agregar al Carrito</strong>
            </button>
            <button className='compraBtn' onClick={comprarAhora} disabled={unidadesDisponibles === 0}>
              <strong>Comprar Ahora</strong>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetallesProducto;
