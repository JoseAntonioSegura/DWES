import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductosFiltrados from './obtenerProductosFiltrados.js'; 
import Header from '../inicio/headerHome.js';
import Footer from '../inicio/footer.js';
import SearchBar from './barraBusqueda.js';
import './navegar.css';

function Index() {
  const [showImage, setShowImage] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const location = useLocation();
  let query = new URLSearchParams(location.search).get('buscar');

  const [plataforma, setPlataforma] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [pegi, setPegi] = useState('');

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

  const handlePlataformaChange = (event) => {
    setPlataforma(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handlePegiChange = (event) => {
    setPegi(event.target.value);
  };

  const buildQueryUrl = () => {

    if (plataforma) {
      query += `&plataforma=${plataforma}`;
    }
    if (categoria) {
      query += `&categoria=${categoria}`;
    }
    if (precio) {
      query += `&precio=${precio}`;
    }
    if (pegi) {
      query += `&pegi=${pegi}`;
    }

    return query;
  };

  return (
    <>
      <Header showImage={showImage} />
      <div className={`imagenContenedor ${showImage ? 'show' : 'hide'}`}>
        {showSearchBar && <SearchBar />}
      </div>
      <div className='contenedorTransicion'></div>
      <main>
        <div className='contenedorFiltros'>
          <div className='barraDeBusqueda'><SearchBar /></div>
          <div className='filtros'>
            <div className='filtroPlataforma'>
              <select onChange={handlePlataformaChange}>
                <option value="">Seleccionar plataforma</option>
                <option value="ps4">PS4</option>
                <option value="xbox">Xbox</option>
                <option value="switch">Switch</option>
              </select>
            </div>
            <div className='filtroCategoria'>
              <select onChange={handleCategoriaChange}>
                <option value="">Seleccionar categoría</option>
                <option value="accion">Acción</option>
                <option value="aventura">Aventura</option>
                <option value="estrategia">Estrategia</option>
                <option value="rol">Rol</option>
                <option value="deportes">Deportes</option>
                <option value="carreras">Carreras</option>
                <option value="puzzle">Puzzle</option>
                <option value="sandbox">Sandbox</option>
                <option value="terror">Terror</option>
                <option value="plataforma">Plataforma</option>
                <option value="lucha">Lucha</option>
                <option value="mundo abierto">Mundo abierto</option>
                <option value="simulacion">Simulación</option>
                <option value="supervivencia">Supervivencia</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div className='filtroPrecio'>
              <select onChange={handlePrecioChange}>
                <option value="">Seleccionar rango de precios</option>
                <option value="0-20">$0 - $20</option>
                <option value="20-50">$20 - $50</option>
                <option value="50-100">$50 - $100</option>
              </select>
            </div>
            <div className='filtroPegi'>
              <select onChange={handlePegiChange}>
                <option value="">Seleccionar rango de PEGI</option>
                <option value="4">+4</option>
                <option value="7">+7</option>
                <option value="12">+12</option>
                <option value="16">+16</option>
                <option value="18">+18</option>
              </select>
            </div>
          </div>
        </div>
        <div className='separador'></div>
        <div className='ListaDeProductos'>
          <h1 className='titulos'>Catálogo:</h1>
          <ProductosFiltrados consulta={buildQueryUrl()} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Index;
