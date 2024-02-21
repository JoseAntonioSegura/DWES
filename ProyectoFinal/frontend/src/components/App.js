import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/iniciarSesion.js';
import Home from './inicio/index.js';
import Registro from './login/registro.js';
import ObtenerProductos from "./tienda/obtenerProductos.js";
import DetallesProducto from "./tienda/detallesProducto.js";
import EditarPerfil from './login/editarPerfil.js';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/obtenerProductos" element={<ObtenerProductos />} />
        <Route path="/producto/:titulo" element={<DetallesProducto />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
      </Routes>
  );
}

export default App;