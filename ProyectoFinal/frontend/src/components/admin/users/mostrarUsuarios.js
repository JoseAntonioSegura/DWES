import React, { useState, useEffect } from 'react';
import './mostrarUsuarios.css';

function MostrarUsuarios() {
  const [users, setUsers] = useState([]);
  const url = process.env.REACT_APP_URL;
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await fetch(`${url}/users`, {
        headers: {
          'Content-Type': 'application/json',
          'rol': user.rol
      }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {users.map(user => (
        <div key={user._id} className="user-container">
          <img src={user.usernameImage} alt="Avatar" className="user-image" />
          <div className="user-details">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>ID: {user._id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MostrarUsuarios;
