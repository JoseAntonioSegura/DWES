import React, { useState } from 'react';
import './crearProducto.css';

function CrearProducto() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [unidades, setUnidades] = useState('');
  const [categoria, setCategoria] = useState([]);
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [trailer, setTrailer] = useState('');
  const [pegi, setPegi] = useState('');
  const [desarrollador, setDesarrollador] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [fechaLanzamiento, setFechaLanzamiento] = useState('');
  const [error, setError] = useState('');
  const url = process.env.REACT_APP_URL;

  const handleGuardarProducto = async () => {
    if (!titulo.trim() || !descripcion.trim() || !unidades || !categoria.length || !precio || !imagen || !trailer || !pegi || !desarrollador || !plataforma || !fechaLanzamiento) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.rol);

    try {
      const response = await fetch(`${url}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'rol': user.rol
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          unidades: parseInt(unidades),
          categoria,
          precio: parseFloat(precio),
          imagen,
          trailer,
          pegi: parseInt(pegi),
          desarrollador,
          plataforma,
          fechaLanzamiento: new Date(fechaLanzamiento).toISOString().split('T')[0]
        })
      });
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
      setTitulo('');
      setDescripcion('');
      setUnidades('');
      setCategoria([]);
      setPrecio('');
      setImagen('');
      setTrailer('');
      setPegi('');
      setDesarrollador('');
      setPlataforma('');
      setFechaLanzamiento('');
      setError('');
    } catch (error) {
      console.error('Error al guardar el producto:', error.message);
      setError('No se pudo guardar el producto. Inténtalo de nuevo más tarde.');
    }
  };

  const handleCategoriaChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setCategoria(selectedOptions);
  };

  return (
    <div className="crearProducto">
      <h2>Crear Producto</h2>
      <p>A continuación rellene todos los campos correspondientes.</p>
      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Ingrese el título del producto"
      />
      <label>Descripción:</label>
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Ingrese una descripción del producto"
      />
      <label>Unidades:</label>
      <input
        type="number"
        value={unidades}
        onChange={(e) => setUnidades(e.target.value)}
        placeholder="Ingrese el número de unidades disponibles"
      />
      <label>Categoría:</label>
      <select multiple value={categoria} onChange={handleCategoriaChange}>
        <option value="acción">Acción</option>
        <option value="aventura">Aventura</option>
        <option value="rol">Rol</option>
        <option value="disparos">Disparos</option>
        <option value="estrategia">Estrategia</option>
        <option value="deportes">Deportes</option>
        <option value="carreras">Carreras</option>
        <option value="puzzle">Puzzle</option>
        <option value="sandbox">Sandbox</option>
        <option value="terror">Terror</option>
        <option value="plataforma">Plataforma</option>
        <option value="lucha">Lucha</option>
        <option value="mundo abierto">Mundo Abierto</option>
        <option value="simulación">Simulación</option>
        <option value="otros">Otros</option>
        <option value="supervivencia">Supervivencia</option>
      </select>
      <label>Precio:</label>
      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        placeholder="Ingrese el precio del producto"
      />
      <label>Imagen:</label>
      <input
        type="text"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        placeholder="Ingrese la URL de la imagen"
      />
      <label>Tráiler:</label>
      <input
        type="text"
        value={trailer}
        onChange={(e) => setTrailer(e.target.value)}
        placeholder="Ingrese la URL del tráiler"
      />
      <label>PEGI:</label>
      <select value={pegi} onChange={(e) => setPegi(e.target.value)}>
        <option value="">Seleccione una clasificación PEGI</option>
        <option value="4">PEGI 4</option>
        <option value="7">PEGI 7</option>
        <option value="12">PEGI 12</option>
        <option value="16">PEGI 16</option>
        <option value="18">PEGI 18</option>
      </select>
      <label>Desarrollador:</label>
      <input
        type="text"
        value={desarrollador}
        onChange={(e) => setDesarrollador(e.target.value)}
        placeholder="Ingrese el nombre del desarrollador"
      />
      <label>Plataforma:</label>
      <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
        <option value="">Seleccione una plataforma</option>
        <option value="Steam">Steam</option>
        <option value="EpicGames">EpicGames</option>
        <option value="Xbox">Xbox</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Windows">Windows</option>
        <option value="Origin">Origin</option>
        <option value="Nintendo">Nintendo</option>
        <option value="Launcher">Launcher</option>
      </select>
      <label>Fecha de Lanzamiento:</label>
      <input
        type="date"
        value={fechaLanzamiento}
        onChange={(e) => setFechaLanzamiento(e.target.value)}
      />
      <button onClick={handleGuardarProducto}>Guardar</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CrearProducto;