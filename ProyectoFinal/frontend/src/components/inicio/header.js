import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../../resources/logoHeader.jpeg';
import cesta from '../../resources/cesta.png';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
        <div className="user-profile">
          <Link to="/administrador">Administrar Productos</Link>
          {user.usernameImage && <img onClick={handleProfileClick} src={user.usernameImage} alt="User Avatar" />}
          {dropdownVisible && (
            <div ref={dropdownRef} className="dropdown-menu">
              <div><button onClick={handleLogout}>Logout</button></div>
            </div>
          )}
        </div>
      );
    } else if (user) {
      return (
        <div className="user-profile">
          <div className="cesta">
            <Link to="/carrito">
              <img src={cesta} alt="Carrito" />
            </Link>
            <span className="carrito-count">{sumaTotal}</span>
          </div>
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
      return (
        <div>
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      );
    }
  };

  return (
    <>
      <header>
        <Link to="/"><img className='logo' src={logo} alt="Logo"/></Link>
        <div>
          {renderUserOrLoginLink()}
        </div>
      </header>
    </>
  );
}

export default Header;
