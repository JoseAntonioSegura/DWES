import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 10) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        header.style.height = '50px';
      } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        header.style.height = '100px';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para obtener el nombre de usuario almacenado en el localStorage
  const getLoggedInUsername = () => {
    return localStorage.getItem('username');
  };

  // Función para renderizar el nombre de usuario o el enlace "Iniciar Sesión"
  const renderUserOrLoginLink = () => {
    const username = getLoggedInUsername();

    if (username) {
      return <div>Bienvenido, {username}</div>;
    } else {
      return <div><Link to="/login">Iniciar Sesión</Link></div>;
    }
  };

  return (
    <>
      <header>
        <h1>Bienvenido a mi aplicación</h1>
        <div>
          {renderUserOrLoginLink()}
          <div><Link to="/Comprar">Comprar</Link></div>
        </div>
      </header>
    </>
  );
}

export default Header;
