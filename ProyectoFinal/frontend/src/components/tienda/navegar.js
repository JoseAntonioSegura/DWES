import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ProductosFiltrados from './obtenerProductosFiltrados.js'; 
import Header from '../inicio/headerHome.js';
import Footer from '../inicio/footer.js';
import './navegar.css';

function Index() {
  const [showImage, setShowImage] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const location = useLocation();
  const history = useNavigate();
  let query = new URLSearchParams(location.search).get('titulo');
  let initialPage = parseInt(new URLSearchParams(location.search).get('page')) || 1;
  
  const [page, setPage] = useState(initialPage);
  const [plataforma, setPlataforma] = useState('');
  const [categoria, setCategoria] = useState('');
  const [minPrecio, setMinPrecio] = useState('');
  const [maxPrecio, setMaxPrecio] = useState('');
  const [pegi, setPegi] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [totalPages, setTotalPages] = useState(null);
  const url = process.env.REACT_APP_URL;

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

  useEffect(() => {
    obtenerTotalPaginas();
  }, [query, plataforma, categoria, minPrecio, maxPrecio, pegi, sortOrder, page]);

  useEffect(() => {
    const queryParams = buildQueryUrl(page);
    window.history.pushState(null, '', `?${queryParams}`);
  }, [query, plataforma, categoria, minPrecio, maxPrecio, pegi, sortOrder, page]);

  const handlePlataformaChange = (event) => {
    setPlataforma(event.target.value);
    setPage(1); 
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
    setPage(1);
  };

  const handleMinPrecioChange = (event) => {
    setMinPrecio(event.target.value);
    setPage(1); 
  };

  const handleMaxPrecioChange = (event) => {
    setMaxPrecio(event.target.value);
    setPage(1); 
  };

  const handlePegiChange = (event) => {
    setPegi(event.target.value);
    setPage(1);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setPage(1); 
  };

  const obtenerTotalPaginas = async () => {
    try {
      const queryParams = buildQueryUrl(page);
      const response = await fetch(`${url}/games?${queryParams}`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setTotalPages(data.totalPages);
      if (page > data.totalPages) {
        setPage(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const buildQueryUrl = (pageNumber) => {
    let queryUrl = '';
  
    if (query) queryUrl += `titulo=${query}&`;
    if (plataforma) queryUrl += `plataforma=${plataforma}&`;
    if (categoria) queryUrl += `categoria=${categoria}&`;
    if (minPrecio) queryUrl += `precioMin=${minPrecio}&`;
    if (maxPrecio) queryUrl += `precioMax=${maxPrecio}&`;
    if (pegi) queryUrl += `pegi=${pegi}&`;
    if (sortOrder) queryUrl += `sort=${sortOrder}&`;
    if (pageNumber) queryUrl += `page=${pageNumber}`;
  
    if (queryUrl.endsWith('&')) {
      queryUrl = queryUrl.slice(0, -1);
    }
  
    return queryUrl;
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }
  
    const items = [];
    if (page > 1) {
      items.push(
        <Link key="prev" to={`?${query ? `titulo=${query}&` : ''}page=${page - 1}`} onClick={() => setPage(page - 1)}>&lt;</Link>
      );
    }
    
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Link key={i} to={`?${query ? `titulo=${query}&` : ''}page=${i}`} className={page === i ? 'active' : ''} onClick={() => setPage(i)}>{i}</Link>
      );
    }
  
    if (page < totalPages) {
      items.push(
        <Link key="next" to={`?${query ? `titulo=${query}&` : ''}page=${page + 1}`} onClick={() => setPage(page + 1)}>&gt;</Link>
      );
    }
  
    return items;
  };

  return (
    <>
      <Header showImage={showImage} />
      <div className={`imagenContenedor ${showImage ? 'show' : 'hide'}`}>
      </div>
      <div className='contenedorTransicion'></div>
      <main>
        <div className='contenedorFiltros'>
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
              <div className='filtroPrecio'>
                <input type="number" placeholder="Precio mínimo" onChange={handleMinPrecioChange} />
                <input type="number" placeholder="Precio máximo" onChange={handleMaxPrecioChange} />
              </div>
              </div>
          </div>
        <div className='separador'></div>
        <div className='ListaDeProductos'>
          <ProductosFiltrados consulta={buildQueryUrl(page)} />
          <div className="pagination">
            {totalPages && renderPagination()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Index;