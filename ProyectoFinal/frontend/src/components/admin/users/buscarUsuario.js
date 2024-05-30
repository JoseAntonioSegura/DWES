import React, { useState } from 'react';
import './buscarUsuario.css';

function BuscarUsuario() {
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`${url}/users/name/${name}`, {
        headers: {
          'Content-Type': 'application/json',
          'rol': user.rol
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener el usuario');
      }
      const userData = await response.json();
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('No se encontró ningún usuario con el nombre proporcionado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerSearchUser">
      <h2>Buscar Usuario</h2>
      <p htmlFor="nameInput">Nombre de Usuario que desea buscar.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          placeholder='Ingrese el nombre del usuario'
        />
        <button type="submit" disabled={loading}>Buscar</button>
      </form>
      {loading && <div className="loading">Cargando...</div>}
      {error && <p className="error-message">{error}</p>}
      {user && (
        <div className="user-container">
          <div className="user-image">
            <img src={user.usernameImage} alt="Avatar" className="user-image" />
          </div>
          <div className="user-details">
            <p><strong>Usuario:</strong> {user.username}</p>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Apellidos:</strong> {user.lastname}</p>
            <p><strong>País:</strong> {user.country}</p>
            <p><strong>Correo Electrónico:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user._id}</p>
            <p><strong>Rol:</strong> {user.rol}</p>
          </div>
        </div>
      )}
    </div>
  );
}


export default BuscarUsuario;
