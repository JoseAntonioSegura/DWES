import React, { useState } from 'react';
import './editarUsuario.css';

function EditarUsuario() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    usernameImage: '',
    name: '',
    lastname: '',
    country: '',
    email: '',
    phoneNumber: '',
    password: '',
    rol: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_URL;

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleBuscarUsuario = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await fetch(`${url}/users/admin/${userId}`, {
        headers: {
          'rol': user.rol
        }
      });
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const data = await response.json();
      setUserData(data);
      setFormData(data);
    } catch (error) {
      console.error('Error al buscar el usuario:', error.message);
      setError('Error al buscar el usuario');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarUsuario = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const modifiedData = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== userData[key]) {
          modifiedData[key] = formData[key];
        }
      });

      const response = await fetch(`${url}/users/admin/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'rol': user.rol
        },
        body: JSON.stringify(modifiedData)
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      setError('Error al actualizar el usuario');
    }
  };


  return (
    <div className="editarUsuario">
      <h2>Editar Usuario</h2>
      <p>Ingrese el ID del usuario que desea editar.</p>
      <input
        type="text"
        value={userId}
        onChange={handleUserIdChange}
        placeholder="Ingrese el ID del usuario"
      />
      <button onClick={handleBuscarUsuario}>Buscar</button>
      {error && <p className="error-message">{error}</p>}
      {userData && (
        <div className="user-details">
          <label>Imagen de Usuario:</label>
          <input
            type="text"
            name="usernameImage"
            value={formData.usernameImage}
            onChange={handleInputChange}
            placeholder="Ingrese la URL de la imagen de usuario"
          />
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre de usuario"
          />
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre"
          />
          <label>Apellido:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder="Ingrese el apellido"
          />
          <label>País:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Ingrese el país"
          />
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Ingrese el correo electrónico"
          />
          <label>Número de Teléfono:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Ingrese el número de teléfono"
          />
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Ingrese la contraseña"
          />
          <label>Rol:</label>
          <select name="rol" value={formData.rol} onChange={handleInputChange}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <button onClick={handleActualizarUsuario}>Actualizar Usuario</button>
        </div>
      )}
    </div>
  );
}

export default EditarUsuario;
