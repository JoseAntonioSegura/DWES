import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../../resources/logoHeader.jpeg';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión:
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setDropdownVisible(false);
    navigate("/");  
  };

  // Función para renderizar el nombre de usuario o el enlace "Iniciar Sesión"
  const renderUserOrLoginLink = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      return (
        <div className="user-profile" >
          {user.usernameImage && <img onClick={handleProfileClick} src={user.usernameImage} alt="User Avatar" />}
          {dropdownVisible && (
            <div ref={dropdownRef} className="dropdown-menu">
              <div><Link to="/mis-facturas">Mis facturas</Link></div>
              <div><Link to="/editar-perfil">Editar Perfil</Link></div>
              <div><button onClick={handleLogout}>Logout</button></div>
            </div>
          )}
        </div>
      );
    } else {
      return <div><Link to="/login">Iniciar Sesión</Link></div>;
    }
  };

  return (
    <>
      <header>
        <Link to="/"><img className='logo' src={logo} alt="Logo"/></Link>
        <div>
          <div><Link to="/carrito">Comprar</Link></div>
          {renderUserOrLoginLink()}
        </div>
      </header>
    </>
  );
}

export default Header;
