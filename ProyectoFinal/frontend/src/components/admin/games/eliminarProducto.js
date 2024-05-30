import React, { useState } from 'react';
import './eliminarProducto.css';

function EliminarProducto() {
  const [idJuego, setIdJuego] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState('');
  const url = process.env.REACT_APP_URL;

  const resetState = () => {
    setIdJuego('');
    setConfirmado(false);
    setError('');
  };

  const handleEliminar = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await fetch(`${url}/games/${idJuego}`, {
        headers: {
          'rol': user.rol,
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      });

      if (response.status === 404) {
        throw new Error('Producto no encontrado');
      } else if (response.status === 403) {
        throw new Error('No tienes permiso para eliminar este producto');
      } else if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      console.log('Juego eliminado correctamente');
      resetState();
    } catch (error) {
      console.error('Error al eliminar el juego:', error.message);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idJuego.trim() === '') {
      setError('Por favor, introduce un ID de juego válido.');
    } else {
      setError('');
      setConfirmado(true);
    }
  };

  const handleCancelar = () => {
    resetState();
  };

  return (
    <div className="eliminarProducto-container">
      <h2>Eliminar Producto</h2>
      <form onSubmit={handleSubmit}> 
        <p>Ingrese la ID del producto que desea eliminar.</p>
        <input
          type="text"
          placeholder='Ingrese la ID del producto'
          value={idJuego}
          onChange={(e) => setIdJuego(e.target.value)}
        />
        <button type="submit">Eliminar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {confirmado && (
        <div className="confirmacion">
          <p>¿Estás seguro de que deseas eliminar el producto con ID {idJuego}?</p>
          <button onClick={handleEliminar}>Sí</button>
          <button onClick={handleCancelar}>No</button>
        </div>
      )}
    </div>
  );
}

export default EliminarProducto;
