import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logoLarge from '../../resources/nombre mas logo linea blanco.png';
import logoSmall from '../../resources/logo solo.png';
import cesta from '../../resources/cesta.png';
import FacturasModal from '../facturas/facturas.js';
import EditarPerfilModal from '../login/editarPerfil.js';

function Header({ productoAgregado , mostrarCarrito }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [showImage, setShowImage] = useState(true);
  const [showFacturasModal, setShowFacturasModal] = useState(false); 
  const [showEditarPerfilModal, setShowEditarPerfilModal] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logoLarge);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;

  const handleCartClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate("/login");
    } else {
      navigate("/carrito");
    }
  };

  useEffect(() => {
    let lastScrollPosition = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition > lastScrollPosition) {
        setShowImage(false);
      } else {
        setShowImage(true);
      }
      lastScrollPosition = currentScrollPosition;

      const header = document.querySelector('header');
      if (window.scrollY > 10) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.99)';
        header.style.height = window.innerWidth < 780 ? '70px' : '90px';
      } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        header.style.height = window.innerWidth < 780 ? '80px' : '110px';
      }
    };

      if(mostrarCarrito === false){

      }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`${url}/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setIsAdmin(userData.rol === 'Admin');
        } else {
          console.error('Error al obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud fetch:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const obtenerProductosDelCarrito = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await fetch(`${url}/carrito/${user._id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener productos del carrito');
        }
        const data = await response.json();
        setProductosEnCarrito(data);
      } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
      }
    };

    obtenerProductosDelCarrito();
  }, [productoAgregado]);

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

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth < 768) {
        setLogoSrc(logoSmall);
      } else {
        setLogoSrc(logoLarge);
      }
    };

    updateLogo();
    window.addEventListener('resize', updateLogo);

    return () => {
      window.removeEventListener('resize', updateLogo);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setDropdownVisible(false);
    navigate("/");
  };

  const renderUserOrLoginLink = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let sumaTotal = 0;

    for (let i = 0; i < productosEnCarrito.length; i++) {
      if (productosEnCarrito[i].cantidad > 1) {
        sumaTotal += productosEnCarrito[i].cantidad;
      } else {
        sumaTotal += 1;
      }
    }

    if (user && isAdmin) {
      return (
        <div className="infoUser">
          <Link className='linkAdmin' to="/administrador">Administrar</Link>
          <div className='user-profile'>
            {user.usernameImage && <img className='fotoPefil' onClick={handleProfileClick} src={user.usernameImage} />}
          </div>
          {dropdownVisible && (
            <div ref={dropdownRef} className="dropdown-menu-admin">
              <div><button className='buttonLogoutAdmin' onClick={handleLogout}>Logout</button></div>
            </div>
          )}
        </div>
      );
    } else if (user) {
      return (
        <div className="infoUser">
          {mostrarCarrito && (
            <div className="cesta" onClick={handleCartClick}>
              <Link to="/carrito">
                <img src={cesta} alt="Carrito" />
              </Link>
              <div className="carrito-count">
                <span>{sumaTotal}</span>
              </div>
            </div>
          )}
          <div className={`user-profile ${!mostrarCarrito ? 'only-user' : ''}`}>
            {user.usernameImage && <img className='fotoPefil' onClick={handleProfileClick} src={user.usernameImage} />}
          </div>
          {dropdownVisible && (
            <div ref={dropdownRef} className="dropdown-menu">
              <div><button className='primerBoton' onClick={() => setShowFacturasModal(true)}>Mis facturas</button></div>
              <div><button className='primerBoton' onClick={() => setShowEditarPerfilModal(true)}>Editar Perfil</button></div>
              <div><button onClick={handleLogout}>Cerrar Sesión</button></div>
            </div>
          )}
        </div>
      );
    }
    else {
      return (
        <div className='infoUser'>
          {mostrarCarrito && (
            <div className="cesta" onClick={handleCartClick}>
              <Link to="/carrito">
                <img src={cesta} alt="Carrito" />
              </Link>
              <div className="carrito-count">
                <span>{sumaTotal}</span>
              </div>
            </div>
          )}
          <Link className='user-profile' to="/login">Iniciar Sesión</Link>
        </div>
      );
    }
  };

  return (
    <>
      <header>
      <Link to="/"><img className='logo' src={logoSrc} alt="Logo" /></Link>
        <div>
          {renderUserOrLoginLink()}
        </div>
      </header>
      {showFacturasModal && <FacturasModal onClose={() => setShowFacturasModal(false)} />}
      {showEditarPerfilModal && <EditarPerfilModal onClose={() => setShowEditarPerfilModal(false)} />}
    </>
  );
}

export default Header;
