import express from "express";
import router from '../routes/index.js';
import { printDateMiddleware } from "../middlewares/misc-middleware.js";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import { morganMiddleware } from "../config/morgan.js";
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import swaggerUi from 'swagger-ui-express';
import {swaggerDoc} from '../openapi/openapi.js'

dotenv.config();

export default function (server){
	// CONFIG
	server.use(express.json());
	server.use(express.urlencoded({ extended: true }));
	// MDW
	server.use(morganMiddleware);
	server.use(printDateMiddleware);
	// SUBIR 
	server.use(fileUpload());
	// RUTAS
	server.use(router);
	// ERRORS
	server.use(errorMiddleware);
	// SWAGGER
	server.get('/docs', (req, res) => res.send(swaggerDoc));
	server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
	