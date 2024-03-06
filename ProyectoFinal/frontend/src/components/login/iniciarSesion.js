import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './iniciarSesion.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        // Convertir la respuesta a JSON
        const data = await response.json();
        // Almacenar el token en localStorage
        localStorage.setItem('token', data.token);
        // Obtener el usuario completo y guardarlo en localStorage
        const userResponse = await fetch('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          // No almacenar la contraseña en el localStorage
          delete userData.password;
          delete userData.role;
          localStorage.setItem('user', JSON.stringify(userData));
        }
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
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario:</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <div>
          ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
