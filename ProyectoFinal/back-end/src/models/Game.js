import mongoose from "mongoose";

const { Schema, model } = mongoose;

const gameSchema = new Schema({
  titulo: { type: String, required: true, unique: true},
  descripcion: { type: String, required: true},
  unidades: { type: Number, required: true},
  categoria: { type: String, default: 'desconocido'},
  precio: { type: Number, required: true},
  imagen: { type: String, required: true},
  trailer: { type: String, required: true},
}, {timestamps: true});

export default model('Game', gameSchema);
