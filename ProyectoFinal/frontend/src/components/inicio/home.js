import React from 'react';
import { Link } from 'react-router-dom';
import Productos from '../tienda/obtenerProductos.js'; 
import './home.css';
import Header from './header.js';
import baner2 from '../../resources/baner3.png';

function Home() {
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

        <div className='ListaDeProductos'>
        <h1 className='titulos'>Catálogo:</h1>
          <Productos />
        </div>
      </main>
    </>
  );
}

export default Home;
