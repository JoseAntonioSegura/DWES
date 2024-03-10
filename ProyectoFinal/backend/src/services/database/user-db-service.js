import { User } from '../../models/index.js';

//Obtener usuario por nombre
export async function getUserByName(username){
  const user = await User.findOne({ username});

  return user;
}

//Obtener usuarios segun los filtros
export async function getUsers(filters){
  const { name } = filters;

  // Crear el query de filtrado para la base de datos ignorando las mayúsculas
  const query = {
    username: name && new RegExp(name, 'i'),
  };

// Limpiar el query de valores indefinidos
const cleanedQuery = Object.fromEntries(
  Object.entries(query).filter(([_, a]) => a !==undefined)
);
  console.log(cleanedQuery);
  // Obtener los usuarios de la base de datos
  const users = await User.find(cleanedQuery).select('-password');
  return users;
}

//Crear usuario
export async function createUser(user){
  const userDoc = new User(user);
  const createdUser = await userDoc.save();
  return createdUser;
}

//Eliminar usuario
export async function deleteUser(username) {
  return User.findOneAndDelete({ username: username });
}

// Actualizar usuario
export async function updateUser(username, updatedUserInfo) {
  const updatedUser = await User.findOneAndUpdate({ username }, updatedUserInfo, { new: true });

  return updatedUser;
}
