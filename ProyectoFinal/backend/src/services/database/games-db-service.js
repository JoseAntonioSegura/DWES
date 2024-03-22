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

// Eliminar un juego
export async function deleteGameByID(id) {
  return Game.findByIdAndDelete(id);
}


// Actualizar un juego
export async function updateGameByID(id, newData) {
  return Game.findByIdAndUpdate(id, newData, { new: true });
}

