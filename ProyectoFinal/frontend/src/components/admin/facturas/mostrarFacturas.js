import React, { useEffect, useState } from "react";
import "./facturasUsuarios.css";

const FacturasUsuarios = () => {
    const [facturas, setFacturas] = useState([]);
    const [userID, setUserID] = useState(""); 
    const url = process.env.REACT_APP_URL;

    const cargarFacturas = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${url}/factura/${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                const detalles = await Promise.all(data.map(async (factura) => {
                    const productosDetalles = await Promise.all(factura.datosProducto.map(async (producto) => {
                        const response = await fetch(`${url}/games/${producto.productoId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const detallesProducto = await response.json();
                        return { ...producto, detalles: detallesProducto };
                    }));
                    const totalFactura = productosDetalles.reduce((total, producto) => total + (producto.precio * producto.unidades), 0).toFixed(2);
                    return { ...factura, datosProducto: productosDetalles, total: totalFactura };
                }));
                setFacturas(detalles);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Error al cargar facturas:", error);
        }
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
                    <div key={index} className="">
                        <h3>Factura {factura._id}</h3> 
                        <p><strong>Fecha:</strong> {new Date(factura.timestamp).toLocaleDateString()} <strong>Total:</strong> {factura.total}€</p>
                        <p></p>
                        <div className="productos-list">
                            <h4>Productos:</h4>
                            {factura.datosProducto.map((producto, index) => (
                                <div key={index} className="producto-item">
                                    <p><strong>{producto.detalles.titulo}</strong></p>
                                    <p><strong>Cantidad:</strong> {producto.unidades}</p>
                                    <p><strong>Precio:</strong> {producto.precio.toFixed(2)}€</p>
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
