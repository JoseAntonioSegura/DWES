import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}

export default Home;
