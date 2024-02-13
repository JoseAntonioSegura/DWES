import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/iniciarSesion.js';
import Home from './inicio/home.js';
import Registro from './login/registro.js';
import obtenerProductos from "./tienda/obtenerProductos.js";

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/obtenerProductos" element={<obtenerProductos />} />
      </Routes>
  );
}

export default App;