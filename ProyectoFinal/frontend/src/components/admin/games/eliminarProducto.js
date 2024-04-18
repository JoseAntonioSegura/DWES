import React, { useState } from 'react';
import './eliminarProducto.css';

function EliminarProducto() {
  const [idJuego, setIdJuego] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState('');

  const resetState = () => {
    setIdJuego('');
    setConfirmado(false);
    setError('');
  };

  const handleEliminar = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.rol);

    try {
      const response = await fetch(`http://localhost:3000/games/${idJuego}`,
     {
        headers: {
            'rol': user.rol
        },
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Juego eliminado correctamente');
        resetState();
      } else {
        throw new Error('Error al eliminar el juego');
      }
    } catch (error) {
      console.error('Error al eliminar el juego:', error.message);
      setError('No se pudo eliminar el juego. Inténtalo de nuevo más tarde.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idJuego.trim() === '') {
      setError('Por favor, introduce un ID de juego válido.');
    } else {
      setConfirmado(true);
    }
  };

  const handleCancelar = () => {
    resetState(); 
  };

  return (
    <div className="eliminarProducto-container">
      <h1>Eliminar Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>ID del producto:</label>
        <input type="text" value={idJuego} onChange={(e) => setIdJuego(e.target.value)} />
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
