import React, { useEffect, useState } from "react";
import "./facturasUsuarios.css";

const FacturasUsuarios = () => {
    const [facturas, setFacturas] = useState([]);
    const [userID, setUserID] = useState(""); 
    const url = process.env.REACT_APP_URL;

    const cargarFacturas = () => {
        const token = localStorage.getItem('token');
        fetch(`${url}/factura/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                console.log(data.error);
            } else {
                setFacturas(data);
            }
        });
    };

    const handleUserIDChange = (event) => {
        setUserID(event.target.value);
    };
    return (
        <div className="facturas-container">
            <h2>Facturas: Introduzca su ID de usuario</h2>
            <p>Ingrese su ID de usuario para cargar sus facturas.</p>
            <input 
                type="text"
                placeholder="Ingrese su ID de usuario"
                value={userID}
                onChange={handleUserIDChange}
            />
            <button onClick={cargarFacturas}>Cargar Facturas</button>
            <div className="facturas-grid">
                {facturas.length > 0 && facturas.map((factura, index) => (
                    <div key={index} className="factura-item">
                        <h3>Factura {factura._id}</h3> 
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
                ))}
            </div>
        </div>
    );
};

export default FacturasUsuarios;
