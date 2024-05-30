import React, { useState, useEffect } from "react";
import "./facturasUsuarios.css";

const FacturasUsuarios = () => {
    const [factura, setFactura] = useState(null);
    const [facturaID, setFacturaID] = useState(""); 
    const [error, setError] = useState(null);
    const [facturas, setFacturas] = useState([]);
    const [productosDetalles, setProductosDetalles] = useState([]);
    const url = process.env.REACT_APP_URL;

    useEffect(() => {
        const obtenerFacturasUsuario = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');
            if (user && token) {
                try {
                    const response = await fetch(`${url}/factura/${user._id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('No se pudieron obtener las facturas del usuario.');
                    }
                    const data = await response.json();
                    setFacturas(data);
                } catch (error) {
                    setError(error.message);
                }
            }
        };

        obtenerFacturasUsuario();
    }, []);

    const obtenerFacturaPorID = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        fetch(`${url}/factura/admin/${facturaID}`, {
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
        .then(async (data) => {
            setFactura(data);
            setError(null);

            const token = localStorage.getItem('token');
            const detalles = await Promise.all(data.datosProducto.map(async (producto) => {
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
            setProductosDetalles(detalles);
        })
        .catch(error => {
            setError(error.message);
            setFactura(null);
        });
    };

    const handleFacturaIDChange = (event) => {
        setFacturaID(event.target.value);
    };

    const calcularTotalFactura = (factura) => {
        let total = 0;
        factura.datosProducto.forEach((producto) => {
            total += producto.precio * producto.unidades;
        });
        return total;
    };

    const formatearFecha = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="facturas-container">
            <h2>Buscar factura</h2>
            <p>Ingrese su ID de la factura para ver toda la información.</p>
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
                    <p><strong>Fecha:</strong> {formatearFecha(factura.timestamp)} <strong>Total:</strong> {calcularTotalFactura(factura)}€</p>
                    <div className="productos-list">
                        <h4>Productos:</h4>
                        {productosDetalles.map((producto, index) => (
                            <div key={index} className="producto-item">
                                <p>{producto.detalles.titulo}</p>
                                <p><strong>Cantidad:</strong> {producto.unidades}</p>
                                <p><strong>Precio:</strong> {producto.precio}€</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default FacturasUsuarios;
