import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../resources/logoHeader.jpeg';
function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 10) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.99)';
        header.style.height = '80px';
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

  // Función para renderizar el nombre de usuario o el enlace "Iniciar Sesión"
  const renderUserOrLoginLink = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Parsea el objeto JSON guardado en localStorage
  
    if (user.username) {
      return (
        <div>
          {user.username}
          {user && user.usernameImage && <img src={user.usernameImage} alt="User Avatar"/>}
        </div>
      );
    } else {
      return <div><Link to="/login">Iniciar Sesión</Link></div>;
    }
  };

  return (
    <>
      <header>
        <img className='logo' src={logo}/>
        <div>
          <div><Link to="/Comprar">Comprar</Link></div>
          {renderUserOrLoginLink()}
        </div>
      </header>
    </>
  );
}

export default Header;
