import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registro.css';
import userLogin from '../../resources/user.login.png';
import passwordLogin from '../../resources/password.login.png';
import correo from '../../resources/email.png';
import telefono from '../../resources/telefono.png';
import nombre from '../../resources/nombre.png';
import pais from '../../resources/country.png';
import logo from '../../resources/nombre mas logo linea blanco.png';


function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formFilled, setFormFilled] = useState(false);
  const [errorField, setErrorField] = useState([]);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    checkFormFilled(event.target.value, password, confirmPassword, email, name, lastname, country);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkFormFilled(username, event.target.value, confirmPassword, email, name, lastname, country);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    checkFormFilled(username, password, event.target.value, email, name, lastname, country);
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    if (value.length <= 9) {
      setPhone(value);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    checkFormFilled(username, password, confirmPassword, event.target.value, name, lastname, country);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    checkFormFilled(username, password, confirmPassword, email, event.target.value, lastname, country);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
    checkFormFilled(username, password, confirmPassword, email, name, event.target.value, country);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    checkFormFilled(username, password, confirmPassword, email, name, lastname, event.target.value);
  };

  const checkFormFilled = (username, password, confirmPassword, email, name, lastname, country) => {
    if (
      username.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      email.trim() !== '' &&
      name.trim() !== '' &&
      lastname.trim() !== '' &&
      country.trim() !== ''
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  const validateForm = () => {
    if (username.length < 3) {
      setErrorField(['username']);
      return 'El nombre de usuario debe tener al menos 3 caracteres.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorField(['email']);
      return 'El email no es válido.';
    }
    if (phoneNumber.length !== 9 && phoneNumber.length !== 0) {
      setErrorField(['phone']);
      return 'El número de teléfono debe tener 9 dígitos.';
    }
    if (country.length < 3) {
      setErrorField(['country']);
      return 'El país debe tener al menos 3 caracteres.';
    }
    if (password.length < 7 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setErrorField(['password']);
      return 'La contraseña debe tener al menos 7 caracteres, incluyendo una letra mayúscula, una letra minúscula y un carácter especial.';
    }
    if (password !== confirmPassword) {
      setErrorField(['confirmPassword', 'password']);
      return 'Las contraseñas no coinciden.';
    }
    if (name.length < 3) {
      setErrorField(['name']);
      return 'El nombre debe tener al menos 3 caracteres.';
    }
    if (lastname.length < 3) {
      setErrorField(['lastname']);
      return 'El apellido debe tener al menos 3 caracteres.';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!formFilled) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    const userData = {
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      email: email,
      name: name,
      lastname: lastname,
      country: country
    };

    try {
      const response = await fetch(`${url}/users`, {
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

  useEffect(() => {
    setErrorMessage('');
    setErrorField([]);
  }, [username, password, confirmPassword, email, name, lastname, country]);


  return (
    <div className='registro'>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <Link to="/"><img className='logo' src={logo} alt="Logo" /></Link>
          <h2>Registrarse</h2>
          <div className="form-container">
            <div className="form-column">
              <div className={`form-group ${errorField.includes('username') ? 'error' : ''}`}>
                <div className="imgLogin">
                  <img className="imgLogin" src={userLogin} alt="User Login" />
                </div>
                <input className='usernameRegister' type="text" value={username} placeholder='Nombre de usuario' onChange={handleUsernameChange} />
              </div>
              <div className={`form-group ${errorField.includes('email') ? 'error' : ''}`}>
                <div className="imgLogin">
                  <img className="imgLogin" src={correo} alt="User Login" />
                </div>
                <input type="text" value={email} placeholder='Email' onChange={handleEmailChange} />
              </div>
              <div className="form-group">
                <div className="imgLogin">
                  <img className="imgLogin" src={telefono} alt="User Login" />
                </div>
                <input type="number" value={phoneNumber} placeholder='Número de teléfono' onChange={handlePhoneChange} />
              </div>
              <div className={`form-group ${errorField.includes('country') ? 'error' : ''}`}>
                <div className="imgLogin">
                  <img className="imgLogin" src={pais} alt="User Login" />
                </div>
                <input type="text" value={country} placeholder='País' onChange={handleCountryChange} />
              </div>
            </div>
            <div className="form-column">
              <div className={`form-group ${errorField.includes('password') ? 'error' : ''}`}>
                <div className="imgLogin">
                  <img className="imgLogin" src={passwordLogin} alt="User Login" />
                </div>
                <input type="password" value={password} placeholder='Contraseña' onChange={handlePasswordChange} />
              </div>
              <div className={`form-group ${errorField.includes('confirmPassword') ? 'error' : ''}`}>
                <div className="imgLogin">
                  <img className="imgLogin" src={passwordLogin} alt="User Login" />
                </div>
                <input type="password" value={confirmPassword} placeholder='Repetir contraseña' onChange={handleConfirmPasswordChange} />
              </div>
              <div className={`form-group ${errorField.includes('name') ? 'error' : ''}`}>
                <div className="imgLogin">
                  <img className="imgLogin" src={nombre} alt="User Login" />
                </div>
                <input type="text" value={name} placeholder='Nombre' onChange={handleNameChange} />
              </div>
              <div className={`form-group ${errorField.includes('lastname') ? 'error' : ''}`}>
                <div className="imgLogin">
                  <img className="imgLogin" src={nombre} alt="User Login" />
                </div>
                <input type="text" value={lastname} placeholder='Apellidos' onChange={handleLastnameChange} />
              </div>
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" disabled={!formFilled}>Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
