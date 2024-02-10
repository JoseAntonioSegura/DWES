import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './iniciarSesion.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Importa useNavigate desde react-router-dom

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Objeto con los datos del usuario
    const userData = {
      username: username,
      password: password
    };

    try {
      // Enviar la solicitud POST al servidor
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        // Si la solicitud fue exitosa, redirigir al usuario a otra página
        navigate('/'); // Redirige al usuario al menú inicial
      } else {
        // Si la solicitud no fue exitosa, mostrar un mensaje de error
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error('Error:', error);
      alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div>
        ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </div>
    </div>
  );
}

export default Login;
