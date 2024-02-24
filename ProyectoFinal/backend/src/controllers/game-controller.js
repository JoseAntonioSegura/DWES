import { HttpStatusError } from 'common-errors';
import * as gameService from '../services/database/games-db-service.js';

export async function getAllGames(req, res, next){
  try {
    const filters = {}
    const games = await gameService.getGames(filters);
    return res.send(games);
  } catch (error){
    next(error);
  }
}

export async function getGame(req, res, next){
  try {
    const game = await gameService.getGameByTitle(req.params.title);
    return res.send(game);
  } catch (error){
    next(error);
  }
}

export async function getGameById(req, res, next) {
  try {
    const game = await gameService.getGameById(req.params.id);
    return res.send(game);
  } catch (error) {
    next(error);
  }
}


export async function createGame(req, res, next){
  try {
    const body = req.body;
    const game = await gameService.createGame(body);
    return res.send(game);
  } catch (error){
    next(error);
  }
}

export async function updateGame(req, res, next){
  try {
    const updatedGame = await gameService.updateGameByTitle(req.params.title, req.body);
    return res.send(updatedGame);
  } catch (error){
    next(error);
  }
}

export async function deleteGame(req, res, next){
  try {
    const game = await gameService.deleteGameByTitle(req.params.title);
    if (!game) throw new HttpStatusError(404, 'El juego no existe');
    return res.status(200).send(game);
  } catch (error){
    next(error);
  }
}
