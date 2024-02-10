import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/iniciarSesion.js';
import Home from './inicio/home.js';
import Registro from './login/registro.js';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
  );
}

export default App;