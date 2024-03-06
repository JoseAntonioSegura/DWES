import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './editarPerfil.css';

function EditarPerfil(){

    const [user, setUser] = useState({
        username: "",
        name: "",
        lastname: "",
        country: "",
        usernameImage: "",
        email: "",
        phoneNumber: "",
        password: ""
    });

    const [userOriginal, setUserOriginal] = useState({
        username: "",
        name: "",
        lastname: "",
        country: "",
        usernameImage: "",
        email: "",
        phoneNumber: "",
        password: ""
    });    

    const navigate = useNavigate();

    useEffect(() => {
        // Recuperar datos del usuario del localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
            setUserOriginal(userData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar solicitud PATCH al servidor para actualizar los datos del usuario
            const response = await fetch(`http://localhost:3000/users/${userOriginal.username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(user) // Aquí envías el usuario completo con los datos actualizados
            });
            if (response.ok) {
                // Actualizar datos del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(user));
                alert('Datos actualizados correctamente');
                navigate(-1); // Volver a la página anterior
            } else {
                // Manejar errores de la solicitud
                alert('Error al actualizar los datos. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error:', error);
            alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="contenedorPrincipalEditarPerfil">
            <div className="contenedorEditarPerfil">
                <div className="header">
                    <h2>Editar Perfil</h2>
                    <Link to="#" onClick={() => navigate(-1)}>X</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="editarImagen">
                        <img src={user.usernameImage}/>
                    </div>
                    <div>
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" value={user.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="lastname">Apellido:</label>
                        <input type="text" id="lastname" name="lastname" value={user.lastname} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="country">País:</label>
                        <input type="text" id="country" name="country" value={user.country} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="usernameImage">URL de la imagen:</label>
                        <input type="text" id="usernameImage" name="usernameImage" value={user.usernameImage} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Número de teléfono:</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
                    </div>
                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

export default EditarPerfil;
