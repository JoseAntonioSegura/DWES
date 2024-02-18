import React from 'react';
import { Link } from 'react-router-dom';
import Productos from '../tienda/obtenerProductos.js'; 
import './home.css';
import Header from './header.js';

function Home() {
  return (
    <>
      <Header />
      <main>
        <div className='ListaDeProductos'>
        <h1 className='titulos'>Ultimas Unidades:</h1>
          <Productos cantidad={3} />
        </div>

        <div className='ListaDeProductos'>
        <h1 className='titulos'>Catálogo:</h1>
          <Productos />
        </div>
      </main>
    </>
  );
}

export default Home;
