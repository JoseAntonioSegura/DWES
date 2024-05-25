import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './iniciarSesion.css';
import userLogin from '../../resources/user.login.png';
import passwordLogin from '../../resources/password.login.png';
import logo from '../../resources/nombre mas logo linea blanco.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formFilled, setFormFilled] = useState(false);
  const [isError, setIsError] = useState(false); 
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    checkFormFilled(event.target.value, password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkFormFilled(username, event.target.value);
  };

  const checkFormFilled = (username, password) => {
    if (username.trim() !== '' && password.trim() !== '') {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        const userResponse = await fetch(`${url}/users/me`, {
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
        setError('Usuario o contraseña incorrectos');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
      setIsError(true); 
    }
  };

  useEffect(() => {
    setError('');
    setIsError(false);
  }, [username, password]);

  return (
    <>
    <div className="login-container">
      <div className="login-form">
        <Link to="/"><img className='logo' src={logo} alt="Logo"/></Link>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${isError ? 'error' : ''}`}> 
            <div className={`imgLogin ${isError ? 'error' : ''}`}>
              <img className={`imgLogin ${isError ? 'error' : ''}`} src={userLogin} alt="User Login"/>
            </div>
            <input type="text" value={username} placeholder='Nombre' onChange={handleUsernameChange} />
          </div>
          <div className={`form-group ${isError ? 'error' : ''}`}>
            <div className={`imgLogin ${isError ? 'error' : ''}`}>
              <img className={`imgLogin ${isError ? 'error' : ''}`} src={passwordLogin} alt="Password Login"/>
            </div>
            <input type="password" value={password} placeholder='Contraseña' onChange={handlePasswordChange} />
          </div>
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={!formFilled}>Iniciar Sesión</button>
        </form>
        <div>
          ¿No tienes una cuenta? <Link className='link' to="/registro">Regístrate</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
