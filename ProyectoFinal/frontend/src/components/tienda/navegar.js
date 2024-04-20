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
  const [minPrecio, setMinPrecio] = useState('');
  const [maxPrecio, setMaxPrecio] = useState('');
  const [sortOrder, setSortOrder] = useState('');

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

  const handleMinPrecioChange = (event) => {
    setMinPrecio(event.target.value);
  };
  
  const handleMaxPrecioChange = (event) => {
    setMaxPrecio(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const buildQueryUrl = () => {
    let queryUrl = '';
  
    if (plataforma) {
      queryUrl += `&plataforma=${plataforma}`;
    }
    if (categoria) {
      queryUrl += `&categoria=${categoria}`;
    }
    if (minPrecio) {
      queryUrl += `&precioMin=${minPrecio}`;
    }
    if (maxPrecio) {
      queryUrl += `&precioMax=${maxPrecio}`;
    }
    if (pegi) {
      queryUrl += `&pegi=${pegi}`;
    }
    if (sortOrder) {
      queryUrl += `&sort=${sortOrder}`;
    }
  
    console.log(queryUrl);
    return queryUrl;
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
                <option value="">Todas las plataformas</option>
                <option value="Steam">Steam</option>
                <option value="EpicGames">EpicGames</option>
                <option value="Windows">Windows</option>
                <option value="Launcher">Launcher</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo">Nintendo</option>
              </select>
            </div>
            <div className='filtroCategoria'>
              <select onChange={handleCategoriaChange}>
                <option value="">Todas las categorias</option>
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
                <input type="number" placeholder="Precio mínimo" onChange={handleMinPrecioChange} />
                <input type="number" placeholder="Precio máximo" onChange={handleMaxPrecioChange} />
            </div>
            <div className='filtroPegi'>
              <select onChange={handlePegiChange}>
                <option value="">Cualquier Edad</option>
                <option value="4">+4</option>
                <option value="7">+7</option>
                <option value="12">+12</option>
                <option value="16">+16</option>
                <option value="18">+18</option>
              </select>
            </div>
            <div className='filtroOrden'>
              <select onChange={handleSortOrderChange}>
                <option value="">Ordenar por</option>
                <option value="precio">Precio</option>
                <option value="-precio">Precio (alto a bajo)</option>
                <option value="titulo">Título</option>
                <option value="-titulo">Título (Z-A)</option>
                <option value="fechaLanzamiento">Fecha de lanzamiento</option>
                <option value="-fechaLanzamiento">Fecha de lanzamiento (más reciente primero)</option>
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
