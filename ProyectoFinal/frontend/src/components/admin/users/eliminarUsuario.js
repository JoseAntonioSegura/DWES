import React, { useState } from 'react';
import './eliminarUsuario.css';

function EliminarUsuario() {
  const [userId, setUserId] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const url = process.env.REACT_APP_URL;

  const resetState = () => {
    setUserId('');
    setConfirmed(false);
    setError('');
  };

  const handleDelete = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await fetch(`${url}/users/${userId}`, {
        headers: {
          'rol': user.rol
        },
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Usuario eliminado correctamente');
        resetState();
      } else {
        throw new Error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      setError('No se pudo eliminar el usuario. Inténtalo de nuevo más tarde.');
      setConfirmed(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim() === '') {
      setError('Por favor, introduce un ID de usuario válido.');
    } else {
      setConfirmed(true);
    }
  };

  const handleCancel = () => {
    resetState(); 
  };

  return (
    <div className="eliminarUsuario-container">
      <h2>Eliminar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <p>Ingrese ID del usuario que desea eliminar.</p>
        <input placeholder='Ingrese la ID del usuario' type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button type="submit">Eliminar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {confirmed && (
        <div className="confirmacion">
          <p>¿Estás seguro de que deseas eliminar el usuario con ID {userId}?</p>
          <button className onClick={handleDelete}>Sí</button>
          <button onClick={handleCancel}>No</button>
        </div>
      )}
    </div>
  );
}

export default EliminarUsuario;
