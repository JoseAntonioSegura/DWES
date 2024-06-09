import { User } from '../../models/index.js';

//Obtener usuario por nombre
export async function getUserByName(username){
  const user = await User.findOne({ username });

  return user;
}

// Obtener un usuario por su nombre de usuario desde la base de datos
export async function getUserByNameAdmin(name) {
  try {
    const user = await User.findOne({ username: { $regex: new RegExp(`^${name}$`, 'i') } });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el usuario por nombre');
  }
}

// Obtener un usuario por su ID desde la base de datos
export async function getUserByID(id) {
  try {
    const user = await User.findById(id);
    return user;
  }
  catch (error) {
    console.error(error);
    throw new Error('Error al obtener el usuario por ID');
  }
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
  //console.log(cleanedQuery);
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
export async function deleteUser(id) {
  return User.findByIdAndDelete(id);
  
}

// Actualizar usuario
export async function updateUser(id, updatedUserInfo) {
  const updatedUser = await User.findByIdAndUpdate(id, updatedUserInfo, { new: true });

  return updatedUser;
}
