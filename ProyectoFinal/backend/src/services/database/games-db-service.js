import { Game } from '../../models/index.js';

// crear un juego en la base de datos
export async function createGame(data){
  const game =  new Game(data);
  return game.save();
}

// Obtener un juego por título
export async function getGameByTitle(titulo) {
  return Game.find({ titulo: { $regex: titulo, $options: 'i' } });
}
// Obtener un juego por id
export async function getGameById(id) {
  return Game.findById(id);
}

// Obtener todos los juegos con filtros
export async function getGames(filters = {}) {
  const { sort, offset, limit, ...query } = filters;
  const gamesQuery = Game.find(query);

  // Aplicar los filtros
  if (sort) {
    gamesQuery.sort(sort);
  }
  if (offset) {
    gamesQuery.skip(offset);
  }
  if (limit) {
    gamesQuery.limit(limit);
  }

  return gamesQuery.exec();
}

// Eliminar un juego por el título del juego
export async function deleteGameByTitle(titulo) {
  return Game.findOneAndDelete({ titulo: titulo });
}

// Actualizar un juego por el título del juego
export async function updateGameByTitle(title, newData) {
  const game = await Game.findOneAndUpdate({ titulo: title }, newData, { new: true });
  return game;
}
