import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './administrar.css';
import Header from '../inicio/header';
import Footer from '../inicio/footer';
import BuscarProducto from './games/buscarProducto';
import CrearProducto from './games/crearProducto';
import EditarProductos from './games/editarProducto';
import EliminarProducto from './games/eliminarProducto';
import MostrarUsuarios from './users/mostrarUsuarios';
import BuscarUsuario from './users/buscarUsuario';
import EliminarUsuario from './users/eliminarUsuario';
import EditarUsuario from './users/editarUsuario';
import MostrarFacturas from './facturas/mostrarFacturas';
import MostrarFactura from './facturas/mostrarFactura';
import EliminarFactura from './facturas/eliminarFactura';

function Administrar() {
  const [productosVisible, setProductosVisible] = useState(false);
  const [usuariosVisible, setUsuariosVisible] = useState(false);
  const [facturasVisible, setFacturasVisible] = useState(false);
  const [contenidoDerecha, setContenidoDerecha] = useState(null);

  const toggleProductos = () => {
    setProductosVisible(!productosVisible);
    setUsuariosVisible(false); 
    setFacturasVisible(false);
  };

  const toggleUsuarios = () => {
    setUsuariosVisible(!usuariosVisible);
    setProductosVisible(false);
    setFacturasVisible(false);
  };

  const toggleFacturas = () => {
    setFacturasVisible(!facturasVisible);
    setProductosVisible(false);
    setUsuariosVisible(false);
  };

  const handleSeleccionSubapartado = (subapartado) => {
    switch (subapartado) {
      case 'Buscar Producto':
        setContenidoDerecha(<BuscarProducto/>);
        break;
      case 'Agregar Producto':
        setContenidoDerecha(<CrearProducto/>); 
        break;
      case 'Actualizar Producto':
        setContenidoDerecha(<EditarProductos/>); 
        break;
      case 'Eliminar Producto':
        setContenidoDerecha(<EliminarProducto/>);
        break;
      case 'Buscar Usuario':
        setContenidoDerecha(<BuscarUsuario/>);
        break;
      case 'Mostrar Usuarios':
        setContenidoDerecha(< MostrarUsuarios/>);
        break;
      case 'Editar Usuario':
        setContenidoDerecha(<EditarUsuario/>);
        break;
      case 'Eliminar Usuario':
        setContenidoDerecha(<EliminarUsuario/>);
        break;
      case 'Buscar Facturas':
        setContenidoDerecha(<MostrarFacturas/>);
        break;
        case 'Buscar Factura':
          setContenidoDerecha(<MostrarFactura/>);
          break;
      case 'Eliminar Factura':
        setContenidoDerecha(<EliminarFactura/>);
        break;
      default:
        setContenidoDerecha(null);
        break;
    }
  };
  

  return (
    <>
      <Header />
      <div id="administrar">
        <div id='columnaIzquierda'>
          <div id='titulo'><h1>Lista</h1></div>
          <div id='apartado2' onClick={() => {toggleProductos(); handleSeleccionSubapartado('Buscar Producto')}}>Productos</div>
          <div className={productosVisible ? 'subapartado visible' : 'subapartado'}>
            <div className='buscar' id='subApartado1' onClick={() => handleSeleccionSubapartado('Buscar Producto')}>Buscar Producto</div>
            <div className='agregar' id='subApartado2' onClick={() => handleSeleccionSubapartado('Agregar Producto')}>Agregar Producto</div>
            <div className='editar' id='subApartado3' onClick={() => handleSeleccionSubapartado('Actualizar Producto')}>Actualizar Producto</div>
            <div className='eliminar' id='subApartado4' onClick={() => handleSeleccionSubapartado('Eliminar Producto')}>Eliminar Producto</div>
          </div>
          <div id='apartado2' onClick={() => {toggleUsuarios(); handleSeleccionSubapartado('Buscar Usuario')}}>Usuarios</div>
          <div className={usuariosVisible ? 'subapartado visible' : 'subapartado'}>
            <div className='buscar' id='subApartado5' onClick={() => handleSeleccionSubapartado('Mostrar Usuarios')}>Mostrar Usuarios</div>
            <div className='buscar' id='subApartado6' onClick={() => handleSeleccionSubapartado('Buscar Usuario')}>Buscar Usuario</div>
            <div className='editar' id='subApartado7' onClick={() => handleSeleccionSubapartado('Editar Usuario')}>Editar Usuario</div>
            <div className='eliminar' id='subApartado8' onClick={() => handleSeleccionSubapartado('Eliminar Usuario')}>Eliminar Usuario</div>
          </div>
          <div id='apartado3' onClick={() => {toggleFacturas(); handleSeleccionSubapartado('Buscar Factura')}}>Facturas</div>
          <div className={facturasVisible ? 'subapartado visible' : 'subapartado'}>
            <div className='buscar' id='subApartado9' onClick={() => handleSeleccionSubapartado('Buscar Facturas')}>Buscar Facturas</div>
            <div className='buscar' id='subApartado10' onClick={() => handleSeleccionSubapartado('Buscar Factura')}>Buscar Factura</div>
            <div className='eliminar' id='subApartado12' onClick={() => handleSeleccionSubapartado('Eliminar Factura')}>Eliminar Factura</div>
          </div>
        </div>
        <div id='columnaDerecha'>
          {contenidoDerecha} 
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Administrar;
