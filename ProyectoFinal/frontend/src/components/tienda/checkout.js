import React, { useState, useEffect } from 'react';
import './checkout.css';
import { useNavigate } from 'react-router-dom';
import Header from '../inicio/header';

const Checkout = () => {
  const [productos, setProductos] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [error, setError] = useState('');
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

  // Función para obtener productos del carrito
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
    // Redondear el total a dos decimales
    total = parseFloat(total.toFixed(2));
    setTotalCompra(total);
  };

  const eliminarDelCarrito = async (producto) => {
    try {
      const carritoId = producto._id;

      // Eliminar el producto del carrito
      await fetch(`http://localhost:3000/carrito/${carritoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Actualizar la lista de productos en el carrito
      obtenerProductosDelCarrito(JSON.parse(localStorage.getItem('user'))._id);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      setError('Error al eliminar producto del carrito');
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setDatosUsuario({ ...datosUsuario, [name]: value });
    verificarCamposRellenados();
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
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
        for (const producto of productos) {
          await eliminarDelCarrito(producto);
        }
        setProductos([]);
        setTotalCompra(0);
      }
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
      setError('Error al eliminar todos los productos del carrito');
    }
  };

 const procesarCompra = async () => {
  // Validar campos de usuario
  const camposUsuarioRellenados = Object.values(datosUsuario).every(valor => valor !== '');
  const camposPagoRellenados = Object.values(datosPago).every(valor => valor !== '');

  // Establecer estados de error
  setErroresUsuario({
    nombre: !datosUsuario.nombre,
    apellido: !datosUsuario.apellido,
    correo: !datosUsuario.correo,
    telefono: !datosUsuario.telefono,
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

  // Verificar si hay campos incompletos
  const camposRellenados = camposUsuarioRellenados && camposPagoRellenados;
  setCamposRellenados(camposRellenados);

  if (!aceptaCondiciones || !camposRellenados) {
    return;
  }

  try {
    // Agregar la factura a la base de datos
    await agregarFacturaYProductos();

    // Eliminar Productos del carrito
    await eliminarTodosLosProductos();

    // Redirigir a la página principal y mostrar la alerta
    navigate('/');
    alert('La compra se ha realizado correctamente.');
  } catch (error) {
    console.error('Error al procesar la compra:', error);
  }
};

const agregarFacturaYProductos = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    // Construir la lista de productos para la factura
    const productosParaFactura = productos.map(producto => ({
      productId: producto.productId._id,
      cantidad: producto.cantidad,
      precioOriginal: producto.productId.precio
    }));

    // Enviar la solicitud para agregar la factura con los productos al servidor
    const response = await fetch('http://localhost:3000/factura/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        userId,
        productos: productosParaFactura
      })
    });

    if (!response.ok) {
      throw new Error('Error al agregar factura y productos');
    }
  } catch (error) {
    console.error('Error al agregar factura y productos:', error);
    throw error;
  }
};




  return (
    <>
      <Header />
      <div className="container-checkout">
        <h2>Datos del Usuario</h2>
        <div className='contenedorIzquierdoUsuario'>
          <form>
            <label htmlFor="datosPersonales"><h2>Datos Personales:</h2></label>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={datosUsuario.nombre} onChange={handleUserInputChange} required placeholder="Nombre" className={erroresUsuario.nombre ? 'error' : ''} />
              {erroresUsuario.nombre && <span className="mensaje-error">*</span>}
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" value={datosUsuario.apellido} onChange={handleUserInputChange} required placeholder="Apellido" className={erroresUsuario.apellido ? 'error' : ''} />
              {erroresUsuario.apellido && <span className="mensaje-error">*</span>}
            </div>
            <label htmlFor="datosContacto"><h2>Datos de Contacto:</h2></label>
            <div>
              <label htmlFor="correo">Correo:</label>
              <input type="email" id="correo" name="correo" value={datosUsuario.correo} onChange={handleUserInputChange} required placeholder="Correo electrónico" className={erroresUsuario.correo ? 'error' : ''} />
              {erroresUsuario.correo && <span className="mensaje-error">*</span>}
              <label htmlFor="telefono">Teléfono:</label>
              <input type="phone" id="telefono" name="telefono" value={datosUsuario.telefono} onChange={handleUserInputChange} placeholder=" XXX-XX-XX-XX" />
              {erroresUsuario.telefono && <span className="mensaje-error">*</span>}
            </div>
            <label htmlFor="datosFacturacion"><h2>Datos de Facturación:</h2></label>
            <div>
              <label htmlFor="pais">País:</label>
              <input id="pais" name="pais" value={datosUsuario.pais} onChange={handleUserInputChange} required placeholder=" Spain " />
              {erroresUsuario.pais && <span className="mensaje-error">*</span>}
              <label htmlFor="codigoPostal">Código Postal:</label>
              <input id="codigoPostal" name="codigoPostal" value={datosUsuario.codigoPostal} onChange={handleUserInputChange} required placeholder=" XXXXX " />
              {erroresUsuario.codigoPostal && <span className="mensaje-error">*</span>}
            </div>
            <label htmlFor="direccionFacturacion"><h2>Dirección de facturación:</h2></label>
            <div>
              <input id="direccionFacturacion" name="direccionFacturacion" value={datosUsuario.direccionFacturacion} onChange={handleUserInputChange} required placeholder="Calle Patricio, 3" />
              {erroresUsuario.direccionFacturacion && <span className="mensaje-error">*</span>}
            </div>
          </form>
        </div>

        <h2>Datos de Pago</h2>
        <div className='contenedorIzquierdoPago'>
          <form>
            <label htmlFor="nombreTarjeta"><h2>Nombre en la Tarjeta:</h2></label>
            <input type="text" id="nombreTarjeta" name="nombreTarjeta" value={datosPago.nombreTarjeta} onChange={handlePaymentInputChange} required placeholder=" Usuario " className={erroresPago.nombreTarjeta ? 'error' : ''} />
            {erroresPago.nombreTarjeta && <span className="mensaje-error">Nombre en la tarjeta requerido</span>}

            <label htmlFor="numeroTarjeta"><h2>Número de Tarjeta:</h2></label>
            <input type="text" id="numeroTarjeta" name="numeroTarjeta" value={datosPago.numeroTarjeta} onChange={handlePaymentInputChange} required placeholder="XXXX XXXX XXXX XXXX" className={erroresPago.numeroTarjeta ? 'error' : ''} />
            {erroresPago.numeroTarjeta && <span className="mensaje-error">Número de tarjeta requerido</span>}

            <label htmlFor="fechaExpiracion"><h2>Fecha de Expiración:</h2></label>
            <div>
              <input type="text" id="fechaExpiracion" name="fechaExpiracion" value={datosPago.fechaExpiracion} onChange={handlePaymentInputChange} required placeholder="MM/YY" className={erroresPago.fechaExpiracion ? 'error' : ''} />
              {erroresPago.fechaExpiracion && <span className="mensaje-error">Fecha de expiración</span>}

              <input type="text" id="cvv" name="cvv" value={datosPago.cvv} onChange={handlePaymentInputChange} required placeholder=" XXX " className={erroresPago.cvv ? 'error' : ''} />
              {erroresPago.cvv && <span className="mensaje-error">Debes poner el CVV</span>}
            </div>
          </form>
        </div>

        <div className='contenedorDerecho'>
          <h2 className='contenedorDerechoTitulo'>Resumen</h2>
          <p className='tituloContenedorDerecho'>Productos</p>
          <div className='contenedorDerechoContenido'>
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
}

export default Checkout;
