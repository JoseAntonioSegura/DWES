import test from 'ava';
import express from 'express';
import { authenticateUser } from '../src/controllers/auth-controller.js';

test('authenticateUser should return a valid JWT token for correct credentials', async (t) => {
  const app = express();
  app.use(express.json());

  const validCredentials = {
    username: 'admin',
    password: '1234alcachofa',
  };

  const requestObject = {
    body: validCredentials,
  };

  const responseObject = {
    status: (code) => {
      t.is(code, 200);
      return responseObject;
    },
    json: (data) => { 
      t.truthy(data.token);
      t.is(typeof data.token, 'string');
    },
  };

  await authenticateUser(requestObject, responseObject);
});
