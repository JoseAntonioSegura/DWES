import { HttpStatusError } from 'common-errors';
import jwt from 'jsonwebtoken';
import { getUserByName } from '../services/database/user-db-service.js';

import config from '../config.js';
import { checkHash } from '../utils/encrypt.js';

// Iniciar sesión
export async function login(req, res, next){
    // Obtener los datos de la petición usuario y contraseña
        const { username, password } = req.body;

        // Buscar el usuario en la base de datos
        try {
        const user = await getUserByName(username);

        // Si el usuario existe, comparar la contraseña
        if(user){
            //console.log(password, user.password);
            // Si la contraseña es correcta, generar un token y enviarlo
            if(checkHash(password, user.password)){
                // Crear el token con la información del usuario
                const userInfo = { id: user._id, username: user.username };
                // Configurar el token con una duración de 7 días
                const jwtConfig = { expiresIn: 7 * 24 * 60 * 60 };
                // Generar el token
                const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);
                // Enviar el token con el estado 201
                return res.status(201).send({ token });
            }
        }
        throw new HttpStatusError(401, 'Invalid credentials');
    } catch(error) {
    next(error);
    }

}
