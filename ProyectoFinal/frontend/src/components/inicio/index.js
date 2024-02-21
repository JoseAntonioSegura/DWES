import React from 'react';
import { Link } from 'react-router-dom';
import Productos from '../tienda/obtenerProductos.js'; 
import './index.css';
import Header from './header.js';
import Footer from './footer.js';
import baner2 from '../../resources/baner3.png';

function Index() {
  return (
    <>
      <Header />
      <div className='imagenContenedor'>
        <img className='imagenHero' src={baner2} alt="Banner"/>
      </div>
      <div className='contenedorTransicion'></div>
      <main>
        <div className='ListaDeProductos'>
        <h1 className='titulos'>Ultimas Unidades:</h1>
          <Productos cantidad={3} />
        </div>
        <div className='separador'></div>
        <div className='ListaDeProductos'>
        <h1 className='titulos'>Catálogo:</h1>
          <Productos />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Index;
