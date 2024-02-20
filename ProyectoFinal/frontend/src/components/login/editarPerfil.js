import React, { useState, useEffect } from "react";
import './editarPerfil.css';

function EditarPerfil(){

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        // Recuperar datos del usuario del localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar user al servidor para actualizar el perfil del usuario
        console.log(user);
    };

    return (
        <div className="contenedorPrincipalEditarPerfil">
            <div className="contenedorEditarPerfil">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
                    </div>
                    {/* Agrega más campos para otras características del usuario aquí */}
                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

export default EditarPerfil;
