import { HttpStatusError } from 'common-errors';
import { getUsers, createUser, getUserByName, deleteUser, updateUser } from "../services/database/user-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";

// Obtener un usuario por nombre
export async function getUserMe(req, res, next) {
  try {
    const user = await getUserByName(req.user.username);
    if (!user) {
      throw new HttpStatusError(404, 'El usuario no existe');
    }
    return res.send(user);
  } catch (error) {
    next(error);
  }
}

// Obtener todos los usuarios
export async function getUsersController(req, res, next) {
  try {
    const users = await getUsers(req.query);
    if (!users) {
      throw new HttpStatusError(404, 'No hay usuarios');
    }
    return res.send(users);
  } catch (error) {
    next(error);
  }
}

// Crear un usuario bonito
export async function createUsersController(req, res, next) {
  try {
    const body = req.body;
    // Hashea la contraseña antes de guardarla
    body.password = await encryptPassword(body.password);
    // Crea el usuario
    const users = await createUser(req.body);
    return res.status(201).send(users);
  } catch (error) {
    if (error.message.includes('validation')) {
      error.status = 400;
    }
    next(error);
  }
}

// Eliminar un usuario
export async function deleteUserController(req, res, next) {
  try {
    const user = await deleteUser(req.params.username);
    if (!user) {
      throw new HttpStatusError(404, 'El usuario no existe');
    }
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

//actualizar un usuario por nombre
export async function updateUserController(req, res, next) {
  try {
    // Recoge el nombre del usuario
    const { username } = req.params;
    // Recoge la información actualizada del usuario
    const updatedUserInfo = req.body;

    // Si el usuario está actualizando la contraseña, hasheala antes de guardarla
    if (updatedUserInfo.password) {
      // Sustituir la contraseña nueva a la hasheada
      updatedUserInfo.password = await encryptPassword(updatedUserInfo.password);
    }

    // Llma a la función que actualiza el usuario actualizando los datos que sean distintos a los que ya tiene
    const updatedUser = await updateUser(username, updatedUserInfo);

    if (!updatedUser) {
      throw new HttpStatusError(404, 'El usuario no existe');
    }

    return res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
}
