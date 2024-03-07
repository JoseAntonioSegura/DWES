import { getUsers, createUser, getUserByName, deleteUser, updateUser } from "../services/database/user-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";


export async function getUserMe(req, res, next){
  try{
    const user = await getUserByName(req.user.username);
    return res.send(user);
  }catch(error){
    next(error);
  }
}

export async function getUsersController(req, res, next){
  try{
    const users = await getUsers(req.query);
    return res.send(users);
  }catch(error){
    next(error);
  }
}

export async function createUsersController(req, res, next){
  try{
    const body = req.body;
    body.password = await encryptPassword(body.password);
    const users = await createUser(req.body);
    return res.status(201).send(users);
  }catch(error){
    if(error.code === 11000){
      error.status = 409;
    }
    if(error.message.includes('validation')){
      error.status = 400;
    }
    next(error);
  }
}

export async function deleteUserController(req, res, next){
  try {
    const user = await deleteUser(req.params.username);
    if (!user) throw new HttpStatusError(404, 'El usuario no existe');
    return res.status(200).send(user);
  } catch (error){
    next(error);
  }
}

export async function updateUserController(req, res, next) {
  try {
    const { username } = req.params;
    const updatedUserInfo = req.body;

    // Si el usuario está actualizando la contraseyia, hasheala antes de guardarla
    if (updatedUserInfo.password) {
      // Sustiruir la contraseyia nueva a la hasheada
      updatedUserInfo.password = await encryptPassword(updatedUserInfo.password);
    }

    // Llama a la funcion de actualizar de manera que el usuario se actualice con el updateUserInfo
    const updatedUser = await updateUser(username, updatedUserInfo);

    return res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
}
