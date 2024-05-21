import React, { useEffect, useState } from "react";
import './facturas.css';

const FacturasModal = ({ onClose }) => {
    const [facturas, setFacturas] = useState([]);
    const [selectedFactura, setSelectedFactura] = useState(null);
    const [user, setUser] = useState(null);
    const [productosDetalles, setProductosDetalles] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
        const token = localStorage.getItem('token');
        if (user && token) {
            fetch(`http://localhost:3000/factura/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    setFacturas(data);
                }
            });
        }
    }, []);

    const calcularTotalFactura = (factura) => {
        let total = 0;
        factura.datosProducto.forEach((producto) => {
            total += producto.precio * producto.unidades;
            total = Math.round(total * 100) / 100;
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

    const mostrarDetallesFactura = async (factura) => {
        const token = localStorage.getItem('token');
        const detalles = await Promise.all(factura.datosProducto.map(async (producto) => {
            const response = await fetch(`http://localhost:3000/games/${producto.productoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            return { ...producto, detalles: data };
        }));
        setProductosDetalles(detalles);
        setSelectedFactura(factura);
    };

    const closeModal = () => {
        setSelectedFactura(null);
        onClose();
    };

    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Mis Facturas</h2>
                    <span className="close" onClick={closeModal}>&times;</span>
                </div>
                {facturas.length > 0 && facturas.map((factura, index) => (
                    <div key={index} className="factura-item">
                        <div className="factura-header">
                            <span>Índice: {index + 1}</span>
                            <span>Nombre: {user.username}</span>
                            <span>Fecha: {formatearFecha(factura.timestamp)}</span>
                            <span>Total: {calcularTotalFactura(factura)}€</span>
                        </div>
                        <button onClick={() => mostrarDetallesFactura(factura)}>Ver Detalles</button>
                    </div>
                ))}

                {selectedFactura && (
                    <div className="modal" onClick={() => setSelectedFactura(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Detalles de la Factura</h2>
                                <span className="close" onClick={() => setSelectedFactura(null)}>&times;</span>
                            </div>
                            <div className="factura-detalle">
                              <div className="factura-header">
                                    <p><strong>Fecha:</strong> {formatearFecha(selectedFactura.timestamp)}</p>
                                    <p><strong>Total:</strong> {calcularTotalFactura(selectedFactura)}€</p>
                                </div>
                                <div className="productos">
                                    {productosDetalles.map((producto, index) => (
                                        <div key={index} className="producto-detalle">
                                            <img src={producto.detalles.imagen} alt={producto.detalles.titulo} className="producto-imagen" />
                                            <p><strong>Producto:</strong> {producto.detalles.titulo}</p>
                                            <p><strong>Cantidad:</strong> {producto.unidades}</p>
                                            <p><strong>Precio:</strong> {producto.precio}€</p>
                                            <p><strong>Total:</strong> {Math.round(producto.precio * producto.unidades * 100) / 100}€</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacturasModal;
