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
    <div className='listaUsuariosContainer'>
      <h2>Lista de Usuarios</h2>
      <p>A continuación, se muestra la lista de todos los usuarios.</p>
      {users.map(user => (
        <div key={user._id} className="user-container">
          <img src={user.usernameImage} alt="Avatar" className="user-image" />
          <div className="user-details">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user._id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MostrarUsuarios;
