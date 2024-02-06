import { HttpStatusError } from 'common-errors';
import * as notesService from '../services/database/note-db-service.js'

export async function getAllNotes(req, res, next){
  try {
    const filters = {}
    const notes = await getAllNotes(filters);
    return res.send();
  } catch (error){
    next(error);
  }
}

export async function getNote(req, res, next){
  try {
    const note = await notesService.getNoteById(req.params.id);
    return res.send(note);
  } catch (error){
    next(error);
  }
}

export async function createNote(req, res, next){
  try {
    const body = req.body;
    body.author = req.user.id;
    const note = await notesService.createNote(body);
    return res.send(note);
  } catch (error){
    next(error);
  }
}

export async function updateNote(req, res, next){
  try {
    const note = await notesService.updateNote(req.params.id, req.body);
    return res.send(note);
  } catch (error){
    next(error);
  }
}

export async function deleteNote(req, res, next){
  try {
    const note = await notesService.deleteNote(req.params.id);
    if(!note) throw HttpStatusError(404, 'no found mano');
    return res.status(200).send(note);
  } catch (error){
    next(error);
  }
}

