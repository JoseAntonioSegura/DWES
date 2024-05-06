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

    const userData = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        const userResponse = await fetch('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          delete userData.password;
          delete userData.role;
          localStorage.setItem('user', JSON.stringify(userData));
        }
        navigate('/');
      } else {
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
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
    </>
  );
}

export default Login;
