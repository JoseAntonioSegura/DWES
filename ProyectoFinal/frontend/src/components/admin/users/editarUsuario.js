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

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleBuscarUsuario = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.rol);

    try {
      const response = await fetch(`http://localhost:3000/users/admin/${userId}`, {
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
      console.log(data);
    } catch (error) {
      console.error('Error al buscar el usuario:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarUsuario = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.rol);
    try {
      const modifiedData = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== userData[key]) {
          modifiedData[key] = formData[key];
        }
      });

      const response = await fetch(`http://localhost:3000/users/admin/${userId}`, {
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
    }
  };

  return (
    <div className="editarUsuario">
      <h1>Editar Usuario</h1>
      <label>Ingrese el ID del usuario:</label>
      <input type="text" value={userId} onChange={handleUserIdChange} />
      <button onClick={handleBuscarUsuario}>Buscar</button>
      {userData && (
        <div>
          <h2>Usuario</h2>
          <p>ID: {userData._id}</p>
          <label>Imagen de Usuario</label>
          <input type="text" name="usernameImage" value={formData.usernameImage} onChange={handleInputChange} />
          <label>Nombre de Usuario:</label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          <label>Apellido:</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} />
          <label>País:</label>
          <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
          <label>Correo Electrónico:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          <label>Número de Teléfono:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
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
