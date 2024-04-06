/*
import test from 'ava';
import request from 'supertest';
import app from '../src/app.js';

let token = '';
let userId = '';

const newUser = {
    username: 'testuser',
    password: 'password',
    email: 'testuser@example.com',
    country: 'TestCountry',
    lastname: 'TestLastName',
    name: 'TestName'
};


test('POST / crea un nuevo usuario', async t => {
    const res = await request(app)
        .post('/users')
        .send(newUser);

    t.is(res.status, 201);
    t.truthy(res.body);

    userId = res.body._id;
});

test('Login devuelve un token de acceso válido', async t => {
    const credentials = {
        username: newUser.username,
        password: newUser.password
    };

    const res = await request(app)
        .post('/login')
        .send(credentials);

    t.is(res.status, 200);
    t.truthy(res.body.token);

    token = res.body.token;
});

test('GET /me devuelve el usuario actual', async t => {
    const res = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`);

    t.is(res.status, 200);
    t.truthy(res.body);

    userId = res.body._id;
    console.log('userId', userId);
});
*/