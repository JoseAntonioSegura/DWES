import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import baner from '../../resources/baner.jpeg'

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 10) { // Cambia 100 al número de píxeles que desees que el usuario se desplace hacia abajo antes de cambiar el color
    header.style.backgroundColor = 'rgba(0, 0, 0, 1)'; // Cambia el color a negro sólido
  } else {
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Vuelve al fondo transparente inicial
  }
});

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');

  if (window.scrollY > 10) {
    header.style.height = '50px'; // Cambia la altura del encabezado a 50px al desplazarse hacia abajo
  } else {
    header.style.height = '100px'; // Vuelve a la altura original del encabezado al desplazarse hacia arriba
  }
});


function Header() {
  return (
    <>
      <header>
        <h1>Bienvenido a mi aplicación</h1>
        <div>
          <div><Link to="/login">Iniciar Sesión</Link></div>
          <div><Link to="/Comprar">Comprar</Link></div>
        </div>
      </header>
      <div className='imagenContenedor'>
        <img className='imagenHero' src={baner}/>
      </div>
    </>
  );
}

export default Header;
