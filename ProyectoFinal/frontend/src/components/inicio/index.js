import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Productos from '../tienda/obtenerProductos.js'; 
import './index.css';
import Header from './headerHome.js';
import Footer from './footer.js';
import baner2 from '../../resources/baner3.png';

function Index() {
  const [showImage, setShowImage] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(true);

  return (
    <>
      <Header showImage={showImage} />
      <div className={`imagenContenedor ${showImage ? 'show' : 'hide'}`}>
        <img className='imagenHero' src={baner2} alt="Banner"/>
      </div>
      <div className='contenedorTransicion'></div>
      <main>
        <div className='ListaDeProductos'>
          <h1 className='titulos'>Últimas Unidades:</h1>
          <Productos cantidad={6} ordenar={ "unidades" } />
        </div>
        <div className='separador'></div>
        <div className='ListaDeProductos'>
          <h1 className='titulos'>Últimos lanzamientos:</h1>
          <Productos cantidad={6} ordenar={ "-fechaLanzamiento" } />
        </div>
        <div className='separador'></div>
        <div className='ListaDeProductos'>
          <h1 className='titulos'>Clásicos:</h1>
          <Productos cantidad={6} ordenar={ "fechaLanzamiento" } />
        </div>
        <div className='separador'></div>
        <div className='ListaDeProductos'>
          <h1 className='titulos'>Catálogo:</h1>
          <Productos ordenar={ "-fechaLanzamiento" }/>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Index;
