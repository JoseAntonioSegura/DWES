import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registro.css';

function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!username || !password || !confirmPassword || !email || !name || !lastname || !country) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      username: username,
      password: password,
      phone: phone,
      email: email,
      name: name,
      lastname: lastname,
      country: country
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        alert('Usuario registrado con éxito');
        navigate('/login');
      } else {
        setErrorMessage('Error al registrarse. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
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
          <div className={`form-group ${formSubmitted && !name ? 'error' : ''}`}>
            <label>Nombre:</label>
            <input type="text" value={name} onChange={handleNameChange} />
            {formSubmitted && !name && <span className="error-indicator">*</span>}
          </div>
          <div className={`form-group ${formSubmitted && !lastname ? 'error' : ''}`}>
            <label>Apellido:</label>
            <input type="text" value={lastname} onChange={handleLastnameChange} />
            {formSubmitted && !lastname && <span className="error-indicator">*</span>}
          </div>
          <div className={`form-group ${formSubmitted && !country ? 'error' : ''}`}>
            <label>País:</label>
            <input type="text" value={country} onChange={handleCountryChange} />
            {formSubmitted && !country && <span className="error-indicator">*</span>}
          </div>
          <button type="submit">Registrarse</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
    </>
  );
}

export default Registro;
