import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registro.css';

function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // Campos de verificacion
    if (!username || !password || !confirmPassword || !email) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    // Objeto con los datos del usuario
    const userData = {
      username: username,
      password: password,
      phone: phone,
      email: email
    };

    try {
      // Enviar la solicitud POST al servidor
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        // Si la solicitud fue exitosa, redirigir al usuario a otra página
        navigate('/');
      } else {
        // Si la solicitud no fue exitosa, mostrar un mensaje de error
        setErrorMessage('Error al registrarse. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error('Error:', error);
      setErrorMessage('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className='registro'>
    <div className="registro-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${formSubmitted && !username ? 'error' : ''}`}>
          <label>Usuario:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
          {formSubmitted && !username && <span className="error-indicator">*</span>}
        </div>
        <div className={`form-group ${formSubmitted && !email ? 'error' : ''}`}>
          <label>Correo Electrónico:</label>
          <input type="text" value={email} onChange={handleEmailChange} />
          {formSubmitted && !email && <span className="error-indicator">*</span>}
        </div>
        <div className="form-group">
          <label>Número de Teléfono:</label>
          <input type="number" value={phone} onChange={handlePhoneChange} />
        </div>
        <div className={`form-group ${formSubmitted && !password ? 'error' : ''}`}>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          {formSubmitted && !password && <span className="error-indicator">*</span>}
        </div>
        <div className={`form-group ${formSubmitted && !confirmPassword ? 'error' : ''}`}>
          <label>Confirmar Contraseña:</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          {formSubmitted && !confirmPassword && <span className="error-indicator">*</span>}
        </div>
        <button type="submit">Registrarse</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
    </div>
  );
}

export default Registro;
