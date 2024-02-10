import { Note } from '../../models/index.js';

export async function createNote(data){
  const note =  new Note(data);
  return note.save();
}

export async function getNoteById(id){
  return Note.findById(id).populate('author');
}

export async function getNotes(filters){
  const { sort, offset, limit, ...query} = filters;
  return Note.find(query).sort(sort).skip(offset).limit(limit);
}

export async function deleteNote(id){
  return Note.findByIdAndDelete(id);
}

export async  function updateNote(id, body){
  const note = await Note.findById(id);
  Object.assign(note, body);
  return note.save();
  }

