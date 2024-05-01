import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Productos from '../tienda/obtenerProductos.js'; 
import './index.css';
import Header from './headerHome.js';
import Footer from './footer.js';
import baner2 from '../../resources/baner3.png';
import SearchBar from '../tienda/barraBusqueda.js';

function Index() {
  const [showImage, setShowImage] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(true);

  useEffect(() => {
    let lastScrollPosition = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setShowImage(currentScrollPosition <= lastScrollPosition);
      lastScrollPosition = currentScrollPosition;

      if (window.scrollY > 10) {
        setShowSearchBar(false);
      } else {
        setShowSearchBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header showImage={showImage} />
      <div className={`imagenContenedor ${showImage ? 'show' : 'hide'}`}>
        <img className='imagenHero' src={baner2} alt="Banner"/>
        {showSearchBar && <SearchBar />}
      </div>
      <div className='contenedorTransicion'></div>
      <main>
        <div className='ListaDeProductos'>
          <h1 className='titulos'>Ultimas Unidades:</h1>
          <Productos cantidad={3} ordenar={ "unidades" } />
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
