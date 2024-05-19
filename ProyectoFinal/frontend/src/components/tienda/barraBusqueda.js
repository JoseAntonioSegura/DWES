import React, { useState, useEffect } from 'react';
import './barraBusqueda.css'; 
import lupa from '../../resources/lupa.svg';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const titulo = urlParams.get('titulo');
    if (titulo) {
      setQuery(titulo);
    }
  }, []); 

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery) {
      navigate(`/navegar?titulo=${encodeURIComponent(newQuery)}`);
    } else {
      navigate('/navegar');
    }
  };

  const handleSearchClick = () => {
    navigate(`/navegar?titulo=${encodeURIComponent(query)}`);
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
      <img 
        src={lupa} 
        alt="Icono de búsqueda" 
        className="search-icon" 
        onClick={handleSearchClick} 
      />
    </div>
  );
};

export default SearchBar;
