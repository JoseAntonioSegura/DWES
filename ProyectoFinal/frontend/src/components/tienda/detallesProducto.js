import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import Header from '../inicio/header.js';
import Footer from '../inicio/footer.js';
import './detallesProducto.css';

function DetallesProducto() {
  const { titulo } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productoAgregado, setProductoAgregado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    const obtenerDetallesProducto = async () => {
      try {
        const response = await fetch(`${url}/games/titulo/${titulo}`);
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

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.rol === 'dmin') {
      setIsAdmin(true);
    }
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

      const carritoResponse = await fetch(`${url}/carrito/agregar`, {
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

      const productoResponse = await fetch(`${url}/games/${producto[0]._id}`, {
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

      const carritoResponse = await fetch(`${url}/carrito/agregar`, {
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

      const productoResponse = await fetch(`${url}/games/${producto[0]._id}`, {
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

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getStockMessage = (unidades) => {
    if (unidades > 10) return "Stock";
    if (unidades > 0 && unidades <= 10) return "Pocas unidades";
    return "Sin stock";
  };

  const getStockClass = (unidades) => {
    if (unidades > 10) return "stock-alto";
    if (unidades > 0 && unidades <= 10) return "stock-bajo";
    return "sin-stock";
  };

  const getCategoriaClass = (pegi) => {
    switch (pegi) {
      case 4: return 'pegi pegi-4';
      case 7: return 'pegi pegi-7';
      case 12: return 'pegi pegi-12';
      case 16: return 'pegi pegi-16';
      case 18: return 'pegi pegi-18';
      default: return 'pegi';
    }
  };

  return (
    <>
      <Header productoAgregado={productoAgregado} mostrarCarrito={true} />
      <div className="contenedorProducto">
        <div className='contenedorDatos'>
          <YouTube iframeClassName="youtubeContainer" videoId={extractVideoId(producto[0].trailer)} opts={{ playerVars: { autoplay: 1 } }} />
          <div className='contenedorDatosInfo'>
            <p className='productDescriptionTitle'>Descripción:</p>
            <p className='productDescription'>{producto[0].descripcion}</p>
            <p className='productDescriptionTitle2'>Géneros:</p>
            <div className="generos">
              {producto[0].categoria.map((genero, index) => (
                <span key={index} className="tag">{genero}</span>
              ))}
            </div>
          </div>
        </div>
        <div className='contenedorCompra'>
          <img src={producto[0].imagen} alt={titulo} />
          <div className='contenedorCompraDatos'>
            <h1>{producto[0].titulo} <span className={getStockClass(producto[0].unidades)}>({getStockMessage(producto[0].unidades)})</span></h1>
            <strong>Clasificación:</strong><p className={getCategoriaClass(producto[0].pegi)}>PEGI: {producto[0].pegi}</p>
            <p><a className='developer'>Plataforma: </a>{producto[0].plataforma}</p>
            <p><a className='developer'>Desarrolladora: </a>{producto[0].desarrollador}</p>
            <p><a className='lanzamiento'>Fecha de Lanzamiento: </a>{formatFecha(producto[0].fechaLanzamiento)}</p>
          </div>
          <div className='contenedorCompraBotones'>
            <button className='carritoBtn' onClick={agregarAlCarrito} disabled={producto[0].unidades === 0 || isAdmin}>
              <strong>Agregar al Carrito</strong>
            </button>
            <button className='compraBtn' onClick={comprarAhora} disabled={producto[0].unidades === 0 || isAdmin}>
              <strong>Comprar Ahora</strong>
            </button>
            <p className='precioDatos'>{producto[0].precio}€</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetallesProducto;
