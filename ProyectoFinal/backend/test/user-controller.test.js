import test from 'ava';
import request from 'supertest';
import app from '../src/app.js';

let token = '';

const newUser = {
    _id: '661170da18faf206fdb14990',
    username: 'testuser',
    password: 'password',
    email: 'testuser@example.com',
    country: 'TestCountry',
    lastname: 'TestLastName',
    name: 'TestName'
};


test.serial('POST / crea un nuevo usuario', async t => {
    const res = await request(app)
        .post('/users')
        .send(newUser);

    t.is(res.status, 201);
    t.truthy(res.body);
});

test.serial('Login devuelve un token de acceso válido', async t => {
    const credentials = {
        username: newUser.username,
        password: newUser.password
    };

    const res = await request(app)
        .post('/login')
        .send(credentials);

    t.is(res.status, 201);
    t.truthy(res.body.token);

    token = res.body.token;
    console.log('Token recibido:', token);
});

test.serial('GET /me devuelve el usuario actual', async t => {
    const res = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`);

    t.is(res.status, 200);
    t.truthy(res.body);

});

test.serial('GET / devuelve todos los usuarios', async t => {
    const res = await request(app)
        .get('/users')
        .set('rol', 'Admin');
    t.is(res.status, 200);
    t.true(Array.isArray(res.body));
    t.true(res.body.length > 0);
});

test.serial('PATCH /:id actualiza un usuario por ID', async t => {
    const updatedUser = {
        username: 'testuser2223222',
    };

    const res = await request(app)
        .patch(`/users/${newUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser);

    t.is(res.status, 200);
    t.truthy(res.body);
});

test.serial('DELETE /:id elimina un usuario por ID', async t => {
    const res = await request(app)
        .delete(`/users/${newUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .set('rol', 'Admin');

    t.is(res.status, 200);
    t.truthy(res.body);
});

// Casos de prueba adicionales errores

test.serial('POST /login - Inicio de sesión con credenciales incorrectas', async t => {
    const credentials = {
        username: 'fdsdfsdf',
        password: 'sdfsdfsdfsdfsdfsdf'
    };

    const res = await request(app)
        .post('/login')
        .send(credentials);

    t.is(res.status, 401);
});

test.serial('PATCH /users/:id - Intento de actualizar un usuario con datos no válidos', async t => {
    const invalidUserData = {
        sadasdasdas: '',
    };

    const res = await request(app)
        .patch(`/users/${newUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(invalidUserData);

    t.is(res.status, 404);
});

test.serial('DELETE /users/:id - Intento de eliminar un usuario inexistente', async t => {
    const nonExistentUserId = 'nonexistentuserid';

    const res = await request(app)
        .delete(`/users/${nonExistentUserId}`)
        .set('rol', 'Admin');

    t.is(res.status, 500);
});

