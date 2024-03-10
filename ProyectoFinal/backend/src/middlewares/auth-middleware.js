import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import config from "../config.js";

// Middleware para comprobar el token
export function checkToken(req, res, next){
    console.log(req.headers.authorization)

    // Comprobar si el token está en la cabecera
    const {authorization} = req.headers;

    // Si no hay token lanza un error 401
    if (!authorization) throw new HttpStatusError(401, 'No token provided');

    // Separar el token del bearer
    const [_bearer, token] = authorization.split(' ');

    try{
        // Verificar el token con la clave secreta
        const tokenInfo = jwt.verify(token, config.app.secretKey);
        // Añadir la información del usuario al objeto req
        req.user = tokenInfo;
    }catch(err){
        logger.error(err.message);
        throw new HttpStatusError(401, 'Invalid token');

    }

    next();
}
