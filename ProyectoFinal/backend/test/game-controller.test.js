
import test from 'ava';
import * as gameService from '../src/services/database/games-db-service.js';
import app from '../src/app.js'; // Supongamos que tienes una instancia de Express llamada 'app'
import supertest from 'supertest';

const request = supertest(app);

let nombreJuego = 'Nuevo Juego';
let ID = null;

const newGame = {
    _id: '661170da18faf206fdb14988',
    titulo: 'ElNuevoJuego',
    descripcion: 'Descripción del juego',
    fechaLanzamiento: '2024-04-06', // Fecha de lanzamiento del juego
    plataforma: 'Steam', // Ejemplo de plataforma válida (cambia esto según tus opciones)
    desarrollador: 'Desarrollador del juego',
    pegi: 18, // Ejemplo de clasificación PEGI válida (cambia esto según tus opciones)
    trailer: 'URL del trailer del juego',
    imagen: 'URL de la imagen del juego',
    precio: 49.99, // Precio del juego
    unidades: 100, // Número de unidades disponibles
    categoria: ['supervivencia'] // Categorías del juego
};


// Test para el endpoint de crear un juego
test.serial('POST / - Debería crear un juego', async t => {
    const res = await request.post('/games').send(newGame);
    t.is(res.status, 201);
    t.truthy(res.body); // Verifica que se reciba una respuesta válida
});

// Test para el endpoint de obtener todos los juegos
test.serial('GET / - Debería obtener todos los juegos', async t => {
    const res = await request.get('/games');
    t.is(res.status, 200);
    t.true(Array.isArray(res.body));
    t.true(res.body.length > 0);
});


// Test para el endpoint de obtener un juego por título
test.serial('GET /titulo/:title - Debería obtener un juego por título', async t => {
    const res = await request.get('/games/titulo/' + newGame.titulo);
    t.is(res.status, 200);
    console.log(res.body);
    t.truthy(res.body); // Verifica que se reciba una respuesta válida

    // Guarda el ID del objeto juego para usarlo en los siguientes tests
    ID = res.body[0]._id; // Accede al primer elemento del array de juegos
    console.log(ID);
});

// Test para el endpoint de obtener un juego por ID
test.serial('GET /:id - Debería obtener un juego por ID', async t => {
    const res = await request.get('/games/' + newGame._id); // Suponiendo que tienes un ID de juego válido
    t.is(res.status, 200);
    t.truthy(res.body); // Verifica que se reciba una respuesta válida
});

// Test para el endpoint de actualizar un juego
test.serial('PATCH /:id - Debería actualizar un juego por ID', async t => {
    const updatedGame = {
        // Incluir los campos que se desean actualizar
        title: 'Juego actualizado',
    };

    const res = await request.patch('/games/' + newGame._id).send(updatedGame); // Suponiendo un ID de juego válido
    t.is(res.status, 200);
    t.truthy(res.body); // Verifica que se reciba una respuesta válida
});

// Test para el endpoint de eliminar un juego
test.serial('DELETE /:id - Debería eliminar un juego por ID', async t => {
    console.log(ID);
    const res = await request.delete('/games/' + newGame._id); // Suponiendo un ID de juego válido
    t.is(res.status, 200);
    t.truthy(res.body); // Verifica que se reciba una respuesta válida
});

