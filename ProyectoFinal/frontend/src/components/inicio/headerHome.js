import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../../resources/nombre mas logo linea blanco.png';
import cesta from '../../resources/cesta.png';
import SearchBar from '../tienda/barraBusqueda.js';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false); 
  const [showImage, setShowImage] = useState(true);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
        header.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        header.style.height = '70px';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.99)';
        header.style.height = '100px';
        setShowSearchBar(true);
      } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        header.style.height = '120px';
        setShowSearchBar(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch('http://localhost:3000/users/me', {
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
        const response = await fetch(`http://localhost:3000/carrito/${user._id}`, {
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
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setDropdownVisible(false);
    navigate("/");
  };

  const renderUserOrLoginLink = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let sumaTotal = 0;

    for(let i = 0; i < productosEnCarrito.length; i++) {
      console.log(productosEnCarrito);
      if(productosEnCarrito[i].cantidad > 1){
        sumaTotal += productosEnCarrito[i].cantidad;
      }else{
        sumaTotal += 1;
      }
    }

    if (user && isAdmin) {
      return (
        <div className="infoUser">
          <Link to="/administrador">Administrar Productos</Link>
          <div className='user-profile'>
            {user.usernameImage && <img className='fotoPefil' onClick={handleProfileClick} src={user.usernameImage}/>}
            </div>
          {dropdownVisible && (
            <div ref={dropdownRef} className="dropdown-menu">
              <div><button onClick={handleLogout}>Logout</button></div>
            </div>
          )}
        </div>
      );
    } else if (user) {
      return (
        <div className="infoUser">
          <div className="cesta">
            <Link to="/carrito">
              <img src={cesta} alt="Carrito" />
            </Link>
            <div className="carrito-count">
              <span>{sumaTotal}</span>
            </div>          
            </div>
            <div className='user-profile'>
            {user.usernameImage && <img className='fotoPefil' onClick={handleProfileClick} src={user.usernameImage}/>}
            </div>
          {dropdownVisible && (
            <div ref={dropdownRef} className="dropdown-menu">
              <div><Link to="/mis-facturas">Mis facturas</Link></div>
              <div><Link to="/editar-perfil">Editar Perfil</Link></div>
              <div><button onClick={handleLogout}>Cerrar Sesión</button></div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className='infoUser'>
           <div className="cesta">
            <Link to="/carrito">
              <img src={cesta} alt="Carrito" />
            </Link>
            <div className="carrito-count">
              <span>{sumaTotal}</span>
            </div>
          </div>
          <Link className='user-profile link' to="/login">Iniciar Sesión</Link>
        </div>
      );
    }
  };

  return (
    <>
      <header>
        <Link to="/"><img className='logo' src={logo} alt="Logo"/></Link>
        {showSearchBar && <SearchBar />}
        <div>
          {renderUserOrLoginLink()}
        </div>
      </header>
    </>
  );
}

export default Header;
