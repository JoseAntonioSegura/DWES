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
      <div className='titulos'><h1>Últimas Unidades:</h1></div>
        <div className='ListaDeProductos'>
          <Productos cantidad={6} ordenar={ "unidades" } />
        </div>
        <div className='separador'></div>
        <div className='titulos'><h1>Últimos lanzamientos:</h1></div>
        <div className='ListaDeProductos'>
          <Productos cantidad={6} ordenar={ "-fechaLanzamiento" } />
        </div>
        <div className='titulos'><h1>Clásicos:</h1></div>
        <div className='separador'></div>
        <div className='ListaDeProductos'>
          <Productos cantidad={6} ordenar={ "fechaLanzamiento" } />
        </div>
        <div className='separador'></div>
        <div className='titulos'><h1>Catálogo:</h1></div>
        <div className='ListaDeProductos'>
          <Productos ordenar={ "-fechaLanzamiento" }/>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Index;
