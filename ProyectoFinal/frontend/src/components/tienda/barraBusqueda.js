import React, { useState } from 'react';
import './barraBusqueda.css'; 
import lupa from '../../resources/lupa.svg';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const navegar = () => {
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
      <img src={lupa} alt="Icono de búsqueda" className="search-icon" onClick={navegar} />
    </div>
  );
};

export default SearchBar;
