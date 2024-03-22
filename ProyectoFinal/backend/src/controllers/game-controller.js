import { HttpStatusError } from 'common-errors';
import * as gameService from '../services/database/games-db-service.js';

// Obtener todos los juegos
export async function getAllGames(req, res, next){
  try {
    // Obtener los parámetros de consulta de la URL
    const { sort, limit, plataforma } = req.query;

    // Construir el objeto de filtros
    const filters = {};

    // Agregar los filtros según los parámetros de consulta
    if (sort) {
      filters.sort = sort;
    }
    if (limit) {
      filters.limit = parseInt(limit); // Convertir a entero si es necesario
    }
    if (plataforma) {
      filters.plataforma = plataforma;
    }

    // Llamar a la función getGames con los filtros
    const games = await gameService.getGames(filters);

    // Enviar la respuesta
    return res.send(games);
  } catch (error){
    // Manejar errores
    next(error);
  }
}

// Obtener un juego por título
export async function getGame(req, res, next){
  try {
    const game = await gameService.getGameByTitle(req.params.title);
    if (!game || game.length === 0) {
      throw new HttpStatusError(404, 'El juego no existe');
    }
    return res.send(game);
  } catch (error){
    next(error);
  }
}

// Obtener todos los juegos
export async function getGameById(req, res, next) {
  try {
    const game = await gameService.getGameById(req.params.id);
    if (!game) {
      throw new HttpStatusError(404, 'El juego no existe');
    }
    return res.send(game);
  } catch (error) {
    next(error);
  }
}

// crear un juego
export async function createGame(req, res, next){
  try {
    const body = req.body;
    const game = await gameService.createGame(body);
    return res.status(201).send(game);
  } catch (error){
    next(error);
  }
}

// Actualizar un juego
export async function updateGame(req, res, next){
  try {
    const updatedGame = await gameService.updateGameByID(req.params.id, req.body);
    if (!updatedGame) {
      throw new HttpStatusError(404, 'El juego no existe');
    }
    return res.send(updatedGame);
  } catch (error){
    next(error);
  }
}

// Eliminar un juego
export async function deleteGame(req, res, next){
  try {
    const game = await gameService.deleteGameByID(req.params.id);
    if (!game) {
      throw new HttpStatusError(404, 'El juego no existe');
    }
    return res.status(200).send(game);
  } catch (error){
    next(error);
  }
}
