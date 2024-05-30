import React, { useState } from 'react';
import './eliminarFactura.css'; // Importa el archivo CSS de estilo

function EliminarFactura() {
  const [facturaID, setFacturaID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmado, setConfirmado] = useState(false); // Nuevo estado para la confirmación
  const url = process.env.REACT_APP_URL;

  const handleFacturaIDChange = (event) => {
    setFacturaID(event.target.value);
  };

  const handleEliminarFactura = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`${url}/factura/${facturaID}`, {
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
      setConfirmado(false); // Reinicia el estado de confirmación después de eliminar con éxito
      alert('Factura eliminada correctamente');
    } catch (error) {
      console.error(error);
      setError('Error al eliminar la factura');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (facturaID.trim() === '') {
      setError('Por favor, introduce un ID de factura válido.');
    } else {
      setConfirmado(true);
    }
  };

  const handleCancelar = () => {
    setConfirmado(false);
  };

  return (
    <div className="eliminarFactura-container">
      <h2>Eliminar Factura</h2>
      <p>Ingrese el ID de la factura que desea eliminar.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="facturaIDInput"
          value={facturaID}
          onChange={handleFacturaIDChange}
          placeholder='ID de factura a eliminar'
          required
        />
        <button type="submit" disabled={loading}>Eliminar</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {confirmado && (
        <div className="confirmacion">
          <p>¿Estás seguro de que deseas eliminar la factura con ID {facturaID}?</p>
          <button onClick={handleEliminarFactura}>Sí</button>
          <button onClick={handleCancelar}>No</button>
        </div>
      )}
    </div>
  );
}

export default EliminarFactura;
