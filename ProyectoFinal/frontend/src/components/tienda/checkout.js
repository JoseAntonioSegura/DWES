import React, { useState, useEffect } from 'react';
import './checkout.css';
import { useNavigate } from 'react-router-dom';
import Header from '../inicio/header';
import userLogin from '../../resources/user.login.png';
import correo from '../../resources/email.png';
import telefono from '../../resources/telefono.png';
import nombre from '../../resources/nombre.png';
import pais from '../../resources/country.png';
import cvv from '../../resources/cvv.png';
import fechalimite from '../../resources/fecha-limite.png';
import metododepago from '../../resources/metodo-de-pago.png';
import globo from '../../resources/globo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import buzon from '../../resources/buzon.png';

const Checkout = () => {
  const [productos, setProductos] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [error, setError] = useState('');
  const [carritoIDdefinitivo, setCarritoIDdefinitivo] = useState('');
  const navigate = useNavigate();
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    pais: '',
    codigoPostal: '',
    direccionFacturacion: ''
  });
  const [datosPago, setDatosPago] = useState({
    nombreTarjeta: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: ''
  });
  const [aceptaCondiciones, setAceptaCondiciones] = useState(false);
  const [camposRellenados, setCamposRellenados] = useState(false);
  const [erroresUsuario, setErroresUsuario] = useState({
    nombre: false,
    apellido: false,
    correo: false,
    telefono: false,
    pais: false,
    codigoPostal: false,
    direccionFacturacion: false
  });
  const [erroresPago, setErroresPago] = useState({
    nombreTarjeta: false,
    numeroTarjeta: false,
    fechaExpiracion: false,
    cvv: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSesionIniciada(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        setDatosUsuario({
          nombre: user.name || '',
          apellido: user.lastname || '',
          correo: user.email || '',
          telefono: user.telefono || '',
          pais: user.pais || '',
          codigoPostal: user.codigoPostal || '',
          direccionFacturacion: user.direccionFacturacion || ''
        });
      }
      obtenerProductosDelCarrito(user._id);
    } else {
      setSesionIniciada(false);
    }
  }, []);

  const obtenerProductosDelCarrito = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/carrito/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener productos del carrito');
      }
      const data = await response.json();
      console.log("datosss");
      console.log(data);
      setCarritoIDdefinitivo(data);
      calcularTotalCompra(data);
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos del carrito:', error);
      setError('Error al obtener productos del carrito');
    }
  };

  const calcularTotalCompra = (productos) => {
    let total = 0;
    productos.forEach(producto => {
      total += producto.cantidad * producto.productId.precio;
    });
    total = parseFloat(total.toFixed(2));
    setTotalCompra(total);
  };

  const confirmarCompra = async (productos) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      const productosParaFactura = productos.map(producto => ({
        productId: producto.productId._id,
        cantidad: producto.cantidad,
        precioOriginal: producto.productId.precio
      }));

      const carritoId = carritoIDdefinitivo;

      await fetch(`http://localhost:3000/carrito/confirmar-compra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          carritoId,
          productos: productosParaFactura
        })
      });
      obtenerProductosDelCarrito(userId);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      setError('Error al eliminar producto del carrito');
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "codigoPostal" && (value.length > 5 || !/^\d*$/.test(value))) {
      return; // No actualizamos el estado si no cumple con los requisitos
    }
    setDatosUsuario({ ...datosUsuario, [name]: value });
    verificarCamposRellenados();
  };
  
  
  
  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "numeroTarjeta" && (value.length > 16 || !/^\d*$/.test(value))) {
      return; // No actualizamos el estado si no cumple con los requisitos
    }
    setDatosPago({ ...datosPago, [name]: value });
    verificarCamposRellenados();
  };
  
  
  
  const handlePaymentCardInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cvv" && (value.length > 3 || !/^\d*$/.test(value))) {
      return; // No actualizamos el estado si no cumple con los requisitos
    }
    setDatosPago({ ...datosPago, [name]: value });
    verificarCamposRellenados();
  };
  
  
  
  const handleExpirationDateChange = (e) => {
    const { name, value } = e.target;
    // Expresión regular para validar el formato de fecha (MM/YY)
    const dateFormat = /^(0[1-9]|1[0-2])\/\d{2}$/;
  
    if (name === "fechaExpiracion" && (dateFormat.test(value) || value.length > 5)) {
      return; // No actualizamos el estado si no cumple con los requisitos
    }
  
    setDatosPago({ ...datosPago, [name]: value });
    verificarCamposRellenados();
  };
  
  

  const handleAceptarCondiciones = () => {
    setAceptaCondiciones(!aceptaCondiciones);
  };

  const verificarCamposRellenados = () => {
    const camposUsuarioRellenados = Object.values(datosUsuario).every(valor => valor !== '');
    const camposPagoRellenados = Object.values(datosPago).every(valor => valor !== '');
    setCamposRellenados(camposUsuarioRellenados && camposPagoRellenados);
  };

  const eliminarTodosLosProductos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        await confirmarCompra(productos);
        setProductos([]);
        setTotalCompra(0);
      }
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
      setError('Error al eliminar todos los productos del carrito');
    }
  };

  const procesarCompra = async () => {
    const camposUsuarioRellenados = Object.values(datosUsuario).every(valor => valor !== '');
    const camposPagoRellenados = Object.values(datosPago).every(valor => valor !== '');

    setErroresUsuario({
      nombre: !datosUsuario.nombre,
      apellido: !datosUsuario.apellido,
      correo: !datosUsuario.correo,
      pais: !datosUsuario.pais,
      codigoPostal: !datosUsuario.codigoPostal,
      direccionFacturacion: !datosUsuario.direccionFacturacion
    });
    setErroresPago({
      nombreTarjeta: !datosPago.nombreTarjeta,
      numeroTarjeta: !datosPago.numeroTarjeta,
      fechaExpiracion: !datosPago.fechaExpiracion,
      cvv: !datosPago.cvv
    });

    const camposRellenados = camposUsuarioRellenados && camposPagoRellenados;
    setCamposRellenados(camposRellenados);

    if (!aceptaCondiciones) {
      toast.error('No has aceptado las condiciones y servicios.');
      return;
    } else if (!camposRellenados) {
      toast.error('Debes rellenar todos los campos.');
      return;
    }

    try {
      await eliminarTodosLosProductos();
      toast.success('La compra se ha realizado correctamente.');
      setTimeout(() => {
        navigate('/');
      }, 6000); 
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      toast.error('Hubo un error al procesar la compra.');
    }
  };
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container-checkout">
        <h2>Datos del Usuario</h2>
        <div className='contenedorIzquierdoUsuario'>
          <form>
            <label htmlFor="datosPersonales"><h2>Datos Personales:</h2></label>
            <div>
              <div className={`imgLoginCheckout ${erroresUsuario.nombre ? 'error' : ''}`}>
                <img src={userLogin} alt="User Login" />
              </div>
              <input type="text" id="nombre" name="nombre" value={datosUsuario.nombre} onChange={handleUserInputChange} required placeholder="Nombre" className={erroresUsuario.nombre ? 'error' : ''} />
              {erroresUsuario.nombre && <span className="mensaje-error">Nombre requerido</span>}
              <div className={`imgLoginCheckout ${erroresUsuario.apellido ? 'error' : ''}`}>
                <img src={nombre} alt="User Login" />
              </div>
              <input type="text" id="apellido" name="apellido" value={datosUsuario.apellido} onChange={handleUserInputChange} required placeholder="Apellido" className={erroresUsuario.apellido ? 'error' : ''} />
              {erroresUsuario.apellido && <span className="mensaje-error">Apellido requerido</span>}
            </div>
            <label htmlFor="datosContacto"><h2>Datos de Contacto:</h2></label>
            <div>
              <div className={`imgLoginCheckout ${erroresUsuario.correo ? 'error' : ''}`}>
                <img src={correo} alt="Correo" />
              </div>
              <input type="email" id="correo" name="correo" value={datosUsuario.correo} onChange={handleUserInputChange} required placeholder="Correo electrónico" className={erroresUsuario.correo ? 'error' : ''} />
              {erroresUsuario.correo && <span className="mensaje-error">Correo requerido</span>}
              <div className={`imgLoginCheckout ${erroresUsuario.telefono ? 'error' : ''}`}>
                <img src={telefono} alt="Teléfono" />
              </div>
              <input type="tel" id="telefono" name="telefono" value={datosUsuario.telefono} onChange={handleUserInputChange} placeholder="Número de teléfono" className={erroresUsuario.telefono ? 'error' : ''} />
              {erroresUsuario.telefono && <span className="mensaje-error">Teléfono requerido</span>}
            </div>
            <label htmlFor="datosFacturacion"><h2>Datos de Facturación:</h2></label>
            <div>
              <div className={`imgLoginCheckout ${erroresUsuario.pais ? 'error' : ''}`}>
                <img src={globo} alt="País" />
              </div>
              <input id="pais" name="pais" value={datosUsuario.pais} onChange={handleUserInputChange} required placeholder="País" className={erroresUsuario.pais ? 'error' : ''} />
              {erroresUsuario.pais && <span className="mensaje-error">País requerido</span>}
              <div className={`imgLoginCheckout ${erroresUsuario.codigoPostal ? 'error' : ''}`}>
                <img src={pais} alt="Código Postal" />
              </div>
              <input id="codigoPostal" name="codigoPostal" value={datosUsuario.codigoPostal} onChange={handleUserInputChange} required placeholder="Código Postal" className={erroresUsuario.codigoPostal ? 'error' : ''} />
              {erroresUsuario.codigoPostal && <span className="mensaje-error">Código Postal requerido</span>}
            </div>
            <label htmlFor="direccionFacturacion"><h2>Dirección de Facturación:</h2></label>
            <div>
              <div className={`imgLoginCheckout ${erroresUsuario.direccionFacturacion ? 'error' : ''}`}>
                <img src={buzon} alt="Dirección de Facturación" />
              </div>
              <input id="direccionFacturacion" name="direccionFacturacion" value={datosUsuario.direccionFacturacion} onChange={handleUserInputChange} required placeholder="Calle Patricio, 3" className={erroresUsuario.direccionFacturacion ? 'error' : ''} />
              {erroresUsuario.direccionFacturacion && <span className="mensaje-error">Dirección de facturación requerida</span>}
            </div>
          </form>
        </div>
  
        <h2>Datos de Pago</h2>
        <div className='contenedorIzquierdoPago'>
          <form>
            <label><h2>Datos de la tarjeta:</h2></label>
            <div>
              <div className={`imgLoginCheckout ${erroresPago.nombreTarjeta ? 'error' : ''}`}>
                <img src={userLogin} alt="Nombre en la Tarjeta" />
              </div>
              <input type="text" id="nombreTarjeta" name="nombreTarjeta" value={datosPago.nombreTarjeta} onChange={handlePaymentInputChange} required placeholder="Nombre" className={erroresPago.nombreTarjeta ? 'error' : ''} />
              {erroresPago.nombreTarjeta && <span className="mensaje-error">Nombre en la tarjeta requerido</span>}
              <div className={`imgLoginCheckout ${erroresPago.numeroTarjeta ? 'error' : ''}`}>
                <img src={metododepago} alt="Número de Tarjeta" />
              </div>
              <input type="text" id="numeroTarjeta" name="numeroTarjeta" value={datosPago.numeroTarjeta} onChange={handlePaymentInputChange} required placeholder="Número de la tarjeta" className={erroresPago.numeroTarjeta ? 'error' : ''} />
              {erroresPago.numeroTarjeta && <span className="mensaje-error">Número de tarjeta requerido</span>}
            </div>
            <label htmlFor="fechaExpiracion"><h2>Fecha de Expiración & CVV:</h2></label>
            <div>
              <div className={`imgLoginCheckout ${erroresPago.fechaExpiracion ? 'error' : ''}`}>
                <img src={fechalimite} alt="Fecha de Expiración" />
              </div>
              <input type="text" id="fechaExpiracion" name="fechaExpiracion" value={datosPago.fechaExpiracion} onChange={handleExpirationDateChange} required placeholder="MM/YY" className={erroresPago.fechaExpiracion ? 'error' : ''} />
              {erroresPago.fechaExpiracion && <span className="mensaje-error">Fecha de expiración requerida (MM/YY)</span>}
              <div className={`imgLoginCheckout ${erroresPago.cvv ? 'error' : ''}`}>
                <img src={cvv} alt="CVV" />
              </div>
              <input type="text" id="cvv" name="cvv" value={datosPago.cvv} onChange={handlePaymentCardInputChange} required placeholder="CVV" className={erroresPago.cvv ? 'error' : ''} />
{erroresPago.cvv && <span className="mensaje-error">CVV requerido</span>}
          </div>
        </form>
      </div>

      <div className='contenedorDerecho'>
        <h2 className='contenedorDerechoTitulo'>Resumen</h2>
        <div className='contenedorDerechoContenido'>
          <p className='tituloContenedorDerecho'>Productos</p>
          {productos.map((producto, index) => (
            <div key={index} className='resumen'>
              <p>{producto.cantidad} x {producto.productId.titulo}</p>
              <p>{(producto.cantidad * producto.productId.precio).toFixed(2)}€</p>
            </div>
          ))}
        </div>
        <div className='totalCompra'>
          <p>Total de la compra: {totalCompra}€</p>
        </div>
        <div className='aceptarCondiciones'>
          <input type="checkbox" id="aceptarCondiciones" checked={aceptaCondiciones} onChange={handleAceptarCondiciones} />
          <label htmlFor="aceptarCondiciones">Acepto las condiciones y servicios</label>
        </div>
        <button className='botonProcesarCompra' onClick={procesarCompra}>Realizar el pago</button>
      </div>
    </div>
  </>
);
};
  


export default Checkout;
