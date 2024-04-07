import test from 'ava';
import app from '../src/app.js';
import supertest from 'supertest';

const request = supertest(app);

let token = '';
let carritoId = '';
let facturaId = '';

const newGame = {
    _id: '661170da18faf206fdb14128',
    titulo: 'ElNuevoJuego2',
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

const newUser = {
    _id: '661170da18faf206fdb11290',
    username: 'testuser2',
    password: 'password',
    email: 'testusdfsdfser@example.com',
    country: 'TestfsdfsdfCountry',
    lastname: 'TestsdfsdfsdfLastName',
    name: 'dfsdfsdf'
};

const producto = {
    userId: newUser._id,
    productId: newGame._id,
    cantidad: 1
};

let carritoID = '';

// Crear un nuevo juego /////////////////////////////////////////////
test.serial.before('POST / - Debería crear un juego', async t => {
    const res = await request.post('/games').send(newGame);
    t.is(res.status, 201);
    t.truthy(res.body);
});

// Crear un nuevo usuario ///////////////////////////////////////////
test.serial.before('POST / crea un nuevo usuario', async t => {
    const res = await request.post('/users').send(newUser);

    t.is(res.status, 201);
    t.truthy(res.body);
});

// Login devuelve un token de acceso válido /////////////////////////
test.serial.before('Login devuelve un token de acceso válido', async t => {
    const credentials = {
        username: newUser.username,
        password: newUser.password
    };

    const res = await request.post('/login').send(credentials);

    t.is(res.status, 201);
    t.truthy(res.body.token);

    token = res.body.token;
    console.log('Token recibido:', token);
});

// Test para agregar un producto al carrito
test.serial('POST /carrito/agregar agrega un producto al carrito', async t => {
    const res = await request.post('/carrito/agregar').set('Authorization', `Bearer ${token}`)
        .send(producto);

    t.is(res.status, 201);
    t.truthy(res.body);
});

// Test para obtener productos del carrito
test.serial('GET /carrito/:userId obtiene productos del carrito', async t => {
    const res = await request.get(`/carrito/${newUser._id}`)
        .set('Authorization', `Bearer ${token}`);

    t.is(res.status, 200);
    t.truthy(res.body);
    console.log(res.body);

    carritoID = res.body[0]._id;
});

// Test para modificar la cantidad de un producto en el carrito
test.serial('PATCH /carrito modifica la cantidad de un producto en el carrito', async t => {
    const modificaciones = {
        carritoId: carritoID,
        cantidad: 2
    };

    const res = await request.patch('/carrito').set('Authorization', `Bearer ${token}`)
        .send(modificaciones);

    t.is(res.status, 200);
    t.truthy(res.body);
});


// Test para eliminar un producto del carrito
test.serial('DELETE /carrito/:carritoId elimina un producto del carrito', async t => {
    const carritoId = carritoID;

    const res = await request.delete(`/carrito/${carritoId}`)
        .set('Authorization', `Bearer ${token}`);

    t.is(res.status, 200);
    t.truthy(res.body);
});

// Test para agregar un producto al carrito
test.serial('POST /carrito/agregar Repetir', async t => {
    const res = await request.post('/carrito/agregar').set('Authorization', `Bearer ${token}`)
        .send(producto);

    t.is(res.status, 201);
    t.truthy(res.body);
});


// Test para confirmar la compra
test.serial('POST /carrito/confirmar-compra confirma la compra', async t => {
    const compra = {
        carritoId: carritoID, 
        userId: newUser._id,
        productos: [{ productId: newGame._id, cantidad: 1, precioOriginal: newGame.precio}]
    };

    const res = await request.post('/carrito/confirmar-compra').set('Authorization', `Bearer ${token}`)
        .send(compra);

    t.is(res.status, 200);
    t.truthy(res.body);
});

// Prueba para agregar una factura
test.serial('POST /factura/agregar agrega una factura', async t => {
    const newFactura = {
        carritoId: carritoID, 
        userId: newUser._id,
        productos: [{ productId: newGame._id, cantidad: 1, precioOriginal: newGame.precio}]
    };

    const res = await request.post('/factura/agregar').set('Authorization', `Bearer ${token}`)
        .send(newFactura);

    t.is(res.status, 201);
    t.truthy(res.body);
    facturaId = res.body.factura._id;
    console.log(res.body);
    console.log('Factura ID:', facturaId);
});

// Prueba para obtener facturas por usuario
test.serial('GET /factura/:userId obtiene facturas por usuario', async t => {
    const res = await request.get(`/factura/${newUser._id}`)
        .set('Authorization', `Bearer ${token}`);

    t.is(res.status, 200);
    t.truthy(res.body);
    t.true(Array.isArray(res.body));
});

// Prueba para eliminar una factura
test.serial('DELETE /factura/:facturaId elimina una factura por ID', async t => {
    const res = await request.delete(`/factura/${facturaId}`).set('Authorization', `Bearer ${token}`);

    t.is(res.status, 200);
    t.truthy(res.body);
});

// Pruebas de ERROR //////////////////////////////////////////////////
// Prueba para agregar un producto al carrito con datos incorrectos
test.serial('POST /carrito/agregar - Debería devolver un error si los datos del producto son incorrectos', async t => {
    const invalidProduct = {
        userId: newUser._id,
        productId: 'SADASDASDASD'
    };


    const res = await request.post('/carrito/agregar').set('Authorization', `Bearer ${token}`)
        .send(invalidProduct);


    t.is(res.status, 400);
    t.truthy(res.body);
});

// Prueba para modificar la cantidad de un producto en el carrito con datos incorrectos
test.serial('PATCH /carrito - Debería devolver un error si los datos de la modificación son incorrectos', async t => {
    const modificaciones = {
        carritoId: 'SADASDASDASD',
        unidades: 2
    };


    const res = await request.patch('/carrito').set('Authorization', `Bearer ${token}`)
        .send(modificaciones);


    t.is(res.status, 400);
    t.truthy(res.body);
});

test.serial('DELETE /carrito/:carritoId - Debería devolver un error si el carritoId es incorrecto', async t => {
    const res = await request.delete('/carrito/129834901283812dasd')
        .set('Authorization', `Bearer ${token}`);


    t.is(res.status, 500);
    t.truthy(res.body);
});

test.serial('POST /carrito/confirmar-compra - Debería devolver un error si los datos de la compra son incorrectos', async t => {
    const compra = {
        carritoId: carritoID,
        userId: "asdasdasdasd",
        productos: []
    };


    const res = await request.post('/carrito/confirmar-compra').set('Authorization', `Bearer ${token}`)
        .send(compra);


    t.is(res.status, 500);
    t.truthy(res.body);
});


// Prueba para agregar una factura con datos incorrectos
test.serial('POST /factura/agregar - Debería devolver un error si los datos de la factura son incorrectos', async t => {
    const newFactura = {
        carritoId: 'asdalksd,asd,',
        userId: "asdasdasdasd",
        productos: []
    };


    const res = await request.post('/factura/agregar').set('Authorization', `Bearer ${token}`)
        .send(newFactura);


    t.is(res.status, 500);
    t.truthy(res.body);
});

// Prueba para obtener facturas por usuario con datos incorrectos
test.serial('GET /factura/:userId - Debería devolver un error si el userId es incorrecto', async t => {
    const res = await request.get('/factura/123')
        .set('Authorization', `Bearer ${token}`);


    t.is(res.status, 500);
    t.truthy(res.body);
});


// Prueba para eliminar una factura con datos incorrectos
test.serial('DELETE /factura/:facturaId - Debería devolver un error si el facturaId es incorrecto', async t => {
    const res = await request.delete('/factura/123').set
    ('Authorization', `Bearer ${token}`);


    t.is(res.status, 500);
    t.truthy(res.body);
});


// Eliminar un usuario /////////////////////////////////////////////////
test.serial.after('DELETE /:id elimina un usuario por ID', async t => {
    const res = await request.delete(`/users/${newUser._id}`).set('Authorization', `Bearer ${token}`);

    t.is(res.status, 200);
    t.truthy(res.body);
});

// Eliminar un juego //////////////////////////////////////////////////
test.serial.after('DELETE /:id - Debería eliminar un juego por ID', async t => {
    const res = await request.delete('/games/' + newGame._id);
    t.is(res.status, 200);
    t.truthy(res.body);
});
