import React from 'react';
import { Link } from 'react-router-dom';
import Productos from '../tienda/obtenerProductos.js'; 
import './home.css';

function Home() {
  return (
    <div>
      <header>
        <h1>Bienvenido a mi aplicación</h1>
        <Link to="/login">Iniciar Sesión</Link>
      </header>
      <main>
        <div className='ListaDeProductos'>
          <Productos />
        </div>
      </main>
    </div>
  );
}

export default Home;
