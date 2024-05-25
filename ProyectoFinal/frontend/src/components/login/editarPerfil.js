import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './editarPerfil.css';
import userLogin from '../../resources/user.login.png';
import passwordLogin from '../../resources/password.login.png';
import correo from '../../resources/email.png';
import telefono from '../../resources/telefono.png';
import nombre from '../../resources/nombre.png';
import pais from '../../resources/country.png';
import Header from '../inicio/header.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarPerfilModal = ({ onClose }) => {

    const [user, setUser] = useState({
        username: "",
        name: "",
        lastname: "",
        country: "",
        email: "",
        phoneNumber: "",
        confirmPassword: "",
        usernameImage: "", 
        password: "" 
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [formChanged, setFormChanged] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); 
    const [newImageUrl, setNewImageUrl] = useState(""); 
    const navigate = useNavigate();
    const url = process.env.REACT_APP_URL;

    useEffect(() => {
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
        setFormChanged(true);
    };

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSaveImageUrl = async () => {
        if (!isValidImageUrl(newImageUrl)) {
            setErrorMessage('La URL de la imagen no es válida.');
            return;
        }
    
        setUser(prevUser => ({
            ...prevUser,
            usernameImage: newImageUrl
        }));
        setModalOpen(false);
    
        try {
            const response = await fetch(`${url}/users/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ usernameImage: newImageUrl })
            });
    
            if (response.ok) {
                const userData = await response.json();
                localStorage.setItem('user', JSON.stringify(userData));
                alert('Datos actualizados correctamente');
            } else {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage('Error al actualizar los datos. Por favor, inténtalo de nuevo.');
        }
    };
    
    const isValidImageUrl = (url) => {
        const pattern = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|bmp|svg|webp)$/;
        return pattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }
    
        const { password, ...userDataWithoutPassword } = user;
        const userDataToSend = password ? user : userDataWithoutPassword;
    
        try {
            const response = await fetch(`${url}/users/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userDataToSend)
            });
    
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(user));
                setErrorMessage("");
                toast.success('Datos actualizados correctamente');
            } else {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage('Error al actualizar los datos. Por favor, inténtalo de nuevo.');
        } 
    };
    
    
    const validateForm = () => {
        const { username, email, phoneNumber, country, password, confirmPassword, name, lastname } = user;
        let errors = {};
        if (!username || username.length < 3) {
            errors.username = true;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = true;
        }
        if (!country || country.length < 3) {
            errors.country = true;
        }
        if (password && (password.length < 7 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[^A-Za-z0-9]/.test(password))) {
            errors.password = true;
        }
        if (password !== confirmPassword && password.length > 0) {
            errors.password = true;
            errors.confirmPassword = true;
        }
        if (phoneNumber && phoneNumber.length < 9) {
            errors.phoneNumber = true;
                    }
        if (!name || name.length < 3) {
            errors.name = true;
        }
        if (!lastname || lastname.length < 3) {
            errors.lastname = true;
        }

        setErrors(errors);
        return Object.keys(errors).length === 0 ? '' : 'Por favor, corrige los errores en el formulario.';
    };

    const closeModal = () => {
        onClose();
    };

    return (
        <div className="contenedorPrincipalEditarPerfil" onClick={closeModal}>
            <div className="contenedorEditarPerfil" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <ToastContainer />
                <div className="containerImageProfile">
                    <img className="user-image" src={user.usernameImage} alt="User Image" onClick={handleImageClick} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${errors.username && 'error'}`}>
                        <div className="imgLogin">
                            <img src={userLogin} alt="User Login" />
                        </div>
                        <input type="text" id="username" name="username" value={user.username} placeholder='Nombre de usuario' onChange={handleChange} />
                    </div>
                    <div className={`form-group ${errors.name && 'error'}`}>
                        <div className="imgLogin">
                            <img src={nombre} alt="Nombre" />
                        </div>
                        <input type="text" id="name" name="name" value={user.name} placeholder='Nombre' onChange={handleChange} />
                    </div>
                    <div className={`form-group ${errors.lastname && 'error'}`}>
                        <div className="imgLogin">
                            <img src={nombre} alt="Apellido" />
                        </div>
                        <input type="text" id="lastname" name="lastname" value={user.lastname} placeholder='Apellido' onChange={handleChange} />
                    </div>
                    <div className={`form-group ${errors.country && 'error'}`}>
                        <div className="imgLogin">
                            <img src={pais} alt="País" />
                        </div>
                        <input type="text" id="country" name="country" value={user.country} placeholder='País' onChange={handleChange} />
                    </div>
                    <div className={`form-group ${errors.email && 'error'}`}>
                        <div className="imgLogin">
                            <img src={correo} alt="Email" />
                        </div>
                        <input type="email" id="email" name="email" value={user.email} placeholder='Correo electrónico' onChange={handleChange} />
                    </div>
                    <div className={`form-group ${errors.phoneNumber && 'error'}`}>
                        <div className="imgLogin">
                            <img src={telefono} alt="Número de teléfono" />
                        </div>
                        <input type="text" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} placeholder='Número de teléfono' onChange={handleChange} />
                    </div>
                    <div className={`form-group ${errors.password && 'error'}`}>
                        <div className="imgLogin">
                            <img src={passwordLogin} alt="Contraseña" />
                        </div>
                        <input type="password" id="password" name="password" placeholder='Contraseña' onChange={handleChange} />
                    </div>
                    <div className={`form-group ${errors.confirmPassword && 'error'}`}>
                        <div className="imgLogin">
                            <img src={passwordLogin} alt="Confirmar Contraseña" />
                        </div>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirmar Contraseña' onChange={handleChange} />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button className="confirmProfile" type="submit" disabled={!formChanged}>Guardar cambios</button>
                    <button className="exitProfile" onClick={closeModal}>Salir</button>
                </form>
                {modalOpen && (
                    <div className="modal" onClick={handleModalClose}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="close" onClick={handleModalClose}>&times;</span>
                            <h2>Actualizar imagen de usuario</h2>
                            <input type="text" placeholder="Ingresa la URL de la nueva imagen" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
                            <button onClick={handleSaveImageUrl}>Guardar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditarPerfilModal;

