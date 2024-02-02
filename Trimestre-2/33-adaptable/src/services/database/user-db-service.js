import {User, Note} from '../../models/index.js';
import {  checkHash } from '../../utils/encrypt.js';

export async function getUserByName(username){
  const user = await User.findOne({ username});

  return user;
}

export async function getUsers(filters){
  const { name } = filters;

  const query = {
    username: name && new RegExp(name, 'i'),
  };

const cleanedQuery = Object.fromEntries(
  Object.entries(query).filter(([_, a]) => a !==undefined)
);
  console.log(cleanedQuery);
  const users = await User.find(cleanedQuery);

  return users;
}

export async function createUser(user){
  const userDoc = new User(user);
  const createdUser = await userDoc.save();
  return createdUser;
}
