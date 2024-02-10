import bcrypt from 'bcrypt';

//Encriptar la contraseyia
export async function encryptPassword(password){
  return bcrypt.hash(password, 10);
}

//Comparar la contraseyia con el hash
export function checkHash(text, hash){
  return bcrypt.compareSync(text, hash);
}
