import React, { useState } from 'react';
import './barraBusqueda.css'; 
import lupa from '../../resources/lupa.svg';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Navegar cuando se ingresa texto y hay un cambio en la búsqueda
    navigate(`/navegar?titulo=${encodeURIComponent(newQuery)}`);
  };

  return (
    <div className="barraBusqueda">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="search-input"
        value={query}
        onChange={handleInputChange}
      />
      <img src={lupa} alt="Icono de búsqueda" className="search-icon" />
    </div>
  );
};

export default SearchBar;
