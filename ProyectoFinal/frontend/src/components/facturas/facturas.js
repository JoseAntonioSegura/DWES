import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../inicio/header";

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
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

    return (
        <div>
            <Header />
            {facturas.length > 0 && facturas.map((factura, index) => (
    <div key={index}>
        <h3>Factura {index + 1}</h3>
        <p>Fecha: {factura.timestamp}</p>
        <p>Total: {factura.total}</p>
        <div>
            Productos:
            {factura.datosProducto.map((producto, index) => (
                <div key={index}>
                    <p>{producto.productoId.titulo}</p>
                    <p>Cantidad: {producto.unidades}</p>
                    <p>Precio: {producto.precio}</p>
                </div>
            ))}
        </div>
    </div>
))}

        </div>
    );
};

export default Facturas;
