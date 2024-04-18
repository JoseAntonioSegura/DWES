import React, { useState } from 'react';

function EliminarFactura() {
  const [facturaID, setFacturaID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFacturaIDChange = (event) => {
    setFacturaID(event.target.value);
  };

  const handleEliminarFactura = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`http://localhost:3000/factura/${facturaID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'rol': user.rol
        },
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la factura');
      }
      setError(null);
      alert('Factura eliminada correctamente');
    } catch (error) {
      console.error(error);
      setError('Error al eliminar la factura');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Eliminar Factura</h1>
      <form onSubmit={handleEliminarFactura}>
        <label htmlFor="facturaIDInput">ID de Factura:</label>
        <input
          type="text"
          id="facturaIDInput"
          value={facturaID}
          onChange={handleFacturaIDChange}
          required
        />
        <button type="submit" disabled={loading}>Eliminar</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default EliminarFactura;
