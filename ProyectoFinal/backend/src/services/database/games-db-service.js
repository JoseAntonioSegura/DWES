import { Game } from '../../models/index.js';

export async function createGame(data){
  const game =  new Game(data);
  return game.save();
}

export async function getGameByTitle(titulo) {
  return Game.find({ titulo: { $regex: titulo, $options: 'i' } });
}

export async function getGameById(id) {
  return Game.findById(id);
}

export async function getGames(filters){
  const { sort, offset, limit, ...query} = filters;
  return Game.find(query).sort(sort).skip(offset).limit(limit);
}

export async function deleteGameByTitle(titulo) {
  return Game.findOneAndDelete({ titulo: titulo });
}


export async function updateGameByTitle(title, newData) {
  const game = await Game.findOneAndUpdate({ titulo: title }, newData, { new: true });
  return game;
}