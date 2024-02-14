import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import baner from '../../resources/baner.jpeg'

function Header() {
  return (
    <>
      <header>
        <h1>Bienvenido a mi aplicación</h1>
        <Link to="/login">Iniciar Sesión</Link>
      </header>
      <div className='imagenContenedor'>
        <img className='imagenHero' src={baner}/>
      </div>
    </>
  );
}

export default Header;
