import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Productos from '../tienda/obtenerProductos.js'; 
import NewProduct from '../tienda/newProduct.js'; 
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
      <div>
        <NewProduct cantidad={1} ordenar={ "-fechaLanzamiento" }/>
      </div>
      <div className='contenedorTransicion'>
      </div>
      <main>
      <h1 className='titulos'>Últimas Unidades:</h1>
        <div className='ListaDeProductos'>
          <Productos cantidad={6} ordenar={ "unidades" } />
        </div>
        <div className='separador'></div>
        <h1 className='titulos'>Últimos lanzamientos:</h1>
        <div className='ListaDeProductos'>
          <Productos cantidad={6} ordenar={ "-fechaLanzamiento" } />
        </div>
        <h1 className='titulos'>Clásicos:</h1>
        <div className='separador'></div>
        <div className='ListaDeProductos'>
          <Productos cantidad={6} ordenar={ "fechaLanzamiento" } />
        </div>
        <div className='separador'></div>
        <h1 className='titulos'>Catálogo:</h1>
        <div className='ListaDeProductos'>
          <Productos ordenar={ "-fechaLanzamiento" }/>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Index;
