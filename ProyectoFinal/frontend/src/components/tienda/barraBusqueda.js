import React from 'react';
import './barraBusqueda.css'; 
import lupa from '../../resources/lupa.svg';

const SearchBar = () => {
  return (
    <div className="barraBusqueda">
      <input type="text" placeholder="Buscar productos..." className="search-input" />
      <img src={lupa} alt="Icono de búsqueda" className="search-icon" />
    </div>
  );
};

export default SearchBar;
