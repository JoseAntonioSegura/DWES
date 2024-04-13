import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './administrar.css';
import Header from '../inicio/header';

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
        setContenidoDerecha(<p>Hola</p>);
        break;
      case 'Agregar Producto':
        setContenidoDerecha(null); 
        break;
      case 'Actualizar Producto':
        setContenidoDerecha(null); 
        break;
      case 'Eliminar Producto':
        setContenidoDerecha(null);
        break;
      case 'Buscar Usuario':
        setContenidoDerecha();
        break;
      case 'Agregar Usuario':
        setContenidoDerecha(null);
        break;
      case 'Actualizar Usuario':
        setContenidoDerecha(null);
        break;
      case 'Eliminar Usuario':
        setContenidoDerecha(null);
        break;
      case 'Buscar Factura':
        setContenidoDerecha();
        break;
      case 'Agregar Factura':
        setContenidoDerecha(null);
        break;
      case 'Eliminar Factura':
        setContenidoDerecha(null);
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
          <div id='apartado1' onClick={() => {toggleProductos(); handleSeleccionSubapartado('Buscar Producto')}}>Productos</div>
          <div className={productosVisible ? 'subapartado visible' : 'subapartado'}>
            <div id='subApartado1' onClick={() => handleSeleccionSubapartado('Buscar Producto')}>Buscar Producto</div>
            <div id='subApartado2' onClick={() => handleSeleccionSubapartado('Agregar Producto')}>Agregar Producto</div>
            <div id='subApartado3' onClick={() => handleSeleccionSubapartado('Actualizar Producto')}>Actualizar Producto</div>
            <div id='subApartado4'>Eliminar Producto</div>
          </div>
          <div id='apartado2' onClick={() => {toggleUsuarios(); handleSeleccionSubapartado('Buscar Usuario')}}>Usuarios</div>
          <div className={usuariosVisible ? 'subapartado visible' : 'subapartado'}>
            <div id='subApartado5' onClick={() => handleSeleccionSubapartado('Buscar Usuario')}>Buscar Usuario</div>
            <div id='subApartado6' onClick={() => handleSeleccionSubapartado('Agregar Usuario')}>Agregar Usuario</div>
            <div id='subApartado7' onClick={() => handleSeleccionSubapartado('Actualizar Usuario')}>Actualizar Usuario</div>
            <div id='subApartado8'>Eliminar Usuario</div>
          </div>
          <div id='apartado3' onClick={() => {toggleFacturas(); handleSeleccionSubapartado('Buscar Factura')}}>Facturas</div>
          <div className={facturasVisible ? 'subapartado visible' : 'subapartado'}>
            <div id='subApartado9' onClick={() => handleSeleccionSubapartado('Buscar Factura')}>Buscar Factura</div>
            <div id='subApartado10' onClick={() => handleSeleccionSubapartado('Agregar Factura')}>Agregar Factura</div>
            <div id='subApartado12' onClick={() => handleSeleccionSubapartado('Eliminar Factura')}>Eliminar Factura</div>
          </div>
        </div>
        <div id='columnaDerecha'>
          <h1>Contenido</h1>
          {contenidoDerecha} 
        </div>
      </div>
    </>
  );
}

export default Administrar;
