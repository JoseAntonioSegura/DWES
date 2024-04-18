import React, { useState } from 'react';
import './buscarUsuario.css';

function BuscarUsuario() {
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`http://localhost:3000/users/name/${name}`, {
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
    <div className="container">
      <h1>Buscar Usuario</h1>
      <label htmlFor="nameInput">Nombre de Usuario:</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Buscar</button>
      </form>
      {loading && <div className="loading">Cargando...</div>}
      {error && <div className="error">{error}</div>}
      {user && (
        <div className="user-container">
          <div className="user-image">
            <img src={user.usernameImage} alt="Avatar" className="user-image" />
          </div>
          <div className="user-details">
            <p>Nombre de Usuario: {user.username}</p>
            <p>Correo Electrónico: {user.email}</p>
            <p>ID: {user._id}</p>
          </div>
        </div>
      )}
    </div>
  );
}


export default BuscarUsuario;
