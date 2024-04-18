import React, { useState } from "react";
import "./facturasUsuarios.css";

const FacturasUsuarios = () => {
    const [factura, setFactura] = useState(null);
    const [facturaID, setFacturaID] = useState(""); 
    const [error, setError] = useState(null);

    const obtenerFacturaPorID = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:3000/factura/admin/${facturaID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'rol': user.rol
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la factura.');
            }
            return response.json();
        })
        .then(data => {
            setFactura(data);
            setError(null);
        })
        .catch(error => {
            setError(error.message);
            setFactura(null);
        });
    };

    const handleFacturaIDChange = (event) => {
        setFacturaID(event.target.value);
    };

    return (
        <div className="facturas-container">
            <h2>Facturas: Introduzca el ID de la factura</h2>
            <p>Ingrese el ID de la factura para obtener los detalles.</p>
            <input 
                type="text"
                placeholder="Ingrese el ID de la factura"
                value={facturaID}
                onChange={handleFacturaIDChange}
            />
            <button onClick={obtenerFacturaPorID}>Obtener Factura</button>
            {error && <p className="error-message">{error}</p>}
            {factura && (
                <div className="factura-detalles">
                    <h3>Detalles de la Factura</h3>
                    <p>ID: {factura._id}</p> 
                    <p>Fecha: {factura.timestamp}</p>
                    <p>Total: {factura.total}</p>
                    <div className="productos-list">
                        <h4>Productos:</h4>
                        {factura.datosProducto.map((producto, index) => (
                            <div key={index} className="producto-item">
                                <p>{producto.productoId.titulo}</p>
                                <p>Cantidad: {producto.unidades}</p>
                                <p>Precio: {producto.precio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacturasUsuarios;
