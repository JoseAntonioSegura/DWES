import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../inicio/header";
import './facturas.css';

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [selectedFactura, setSelectedFactura] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!user || !token) {
            navigate('/login');
        } else {
            fetch(`http://localhost:3000/factura/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
        }
    }, [navigate]); 

    const calcularTotalFactura = (factura) => {
        let total = 0;
        factura.datosProducto.forEach((producto) => {
            total += producto.precio * producto.unidades;
        });
        return total;
    };

    const mostrarDetallesFactura = (factura) => {
        setSelectedFactura(factura);
    };

    const closeModal = () => {
        setSelectedFactura(null);
    };

    return (
        <div>
            <Header />
            {facturas.length > 0 && facturas.map((factura, index) => (
                <div key={index} className="factura-item">
                    <div className="factura-header">
                        <span>Índice: {index + 1}</span>
                        <span>Usuario: {factura.userId}</span>
                        <span>Fecha: {factura.timestamp}</span>
                        <span>Total: {calcularTotalFactura(factura)}</span>
                    </div>
                    <button onClick={() => mostrarDetallesFactura(factura)}>Ver Detalles</button>
                </div>
            ))}

            {selectedFactura && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Detalles de la Factura</h2>
                        <p>Fecha: {selectedFactura.timestamp}</p>
                        <p>Total: {calcularTotalFactura(selectedFactura)}</p>
                        <div>
                            Productos:
                            {selectedFactura.datosProducto.map((producto, index) => (
                                <div key={index}>
                                    <p>{producto.productoId.titulo}</p>
                                    <p>Cantidad: {producto.unidades}</p>
                                    <p>Precio: {producto.precio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Facturas;
