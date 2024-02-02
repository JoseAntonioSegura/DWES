import bycript from 'bcrypt';

export async function encryptPassword(password){
  return bycript.hash(password, 10);
}

export function checkHash(text, hash){
  return bcrypt.compareSync(text, hash);
}
