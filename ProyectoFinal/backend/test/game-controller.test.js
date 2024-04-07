import test from 'ava';
import app from '../src/app.js';
import supertest from 'supertest';

const request = supertest(app);

let ID = null;

const newGame = {
    _id: '661170da18faf206fdb14988',
    titulo: 'ElNuevoJuego',
    descripcion: 'Descripción del juego',
    fechaLanzamiento: '2024-04-06',
    plataforma: 'Steam',
    desarrollador: 'Desarrollador del juego',
    pegi: 18,
    trailer: 'URL del trailer del juego',
    imagen: 'URL de la imagen del juego',
    precio: 49.99,
    unidades: 100,
    categoria: ['supervivencia']
};


// Test para el endpoint de crear un juego
test.serial('POST / - Debería crear un juego', async t => {
    const res = await request.post('/games').send(newGame);
    t.is(res.status, 201);
    t.truthy(res.body);
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
    t.truthy(res.body);
});

// Test para el endpoint de obtener un juego por ID
test.serial('GET /:id - Debería obtener un juego por ID', async t => {
    const res = await request.get('/games/' + newGame._id);
    t.is(res.status, 200);
    t.truthy(res.body);
});

// Test para el endpoint de actualizar un juego
test.serial('PATCH /:id - Debería actualizar un juego por ID', async t => {
    const updatedGame = {
        title: 'Juego actualizado',
    };

    const res = await request.patch('/games/' + newGame._id).send(updatedGame);
    t.is(res.status, 200);
    t.truthy(res.body);
});

// Test para el endpoint de eliminar un juego
test.serial('DELETE /:id - Debería eliminar un juego por ID', async t => {
    console.log(ID);
    const res = await request.delete('/games/' + newGame._id);
    t.is(res.status, 200);
    t.truthy(res.body);
});

// Prueba de error al intentar crear un juego con datos incorrectos
test.serial('POST / - Debería devolver un error si los datos del juego son incorrectos', async t => {
    const invalidGame = {
        titulo: 'Juego incorrecto',
    };

    const res = await request.post('/games').send(invalidGame);
    t.is(res.status, 400); 
    t.is(res.body.message, 'Los datos del juego son incorrectos'); 
});



// Prueba de error al intentar obtener un juego inexistente por título
test.serial('GET /titulo/:title - Debería devolver un error si el juego no existe por título', async t => {
    const res = await request.get('/games/titulo/JuegoInexistente');
    t.is(res.status, 404);
    t.is(res.body.message, 'El juego no existe');
});

// Prueba de error al intentar obtener un juego inexistente por ID
test.serial('GET /:id - Debería devolver un error si el juego no existe por ID', async t => {
    const res = await request.get('/games/123456789012345678901234'); 
    t.is(res.status, 404);
    t.is(res.body.message, 'El juego no existe');
});

// Prueba de error al intentar actualizar un juego inexistente por ID
test.serial('PATCH /:id - Debería devolver un error si el juego no existe para actualizar por ID', async t => {
    const updatedGame = {
        title: 'Juego actualizado',
    };
    const res = await request.patch('/games/123456789012345678901234').send(updatedGame); 
    t.is(res.status, 404);
    t.is(res.body.message, 'El juego no existe');
});

// Prueba de error al intentar eliminar un juego inexistente por ID
test.serial('DELETE /:id - Debería devolver un error si el juego no existe para eliminar por ID', async t => {
    const res = await request.delete('/games/123456789012345678901234');
    t.is(res.status, 404);
    t.is(res.body.message, 'El juego no existe');
});
