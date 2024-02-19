import mongoose from "mongoose";

const { Schema, model } = mongoose;

const gameSchema = new Schema({
  titulo: { type: String, required: true, unique: true},
  descripcion: { type: String, required: true},
  unidades: { type: Number, required: true},
  categoria: {
    type: [String],
    enum: ['acción', 'aventura', 'rol', 'disparos', 'estrategia', 'deportes', 'carreras', 'puzzle', 'sandbox', 'terror', 'plataforma', 'lucha', 'mundo abierto', 'simulación', 'otros'],
    default: ['undefined']},
  precio: { type: Number, required: true},
  imagen: { type: String, required: true},
  trailer: { type: String, required: true},
  pegi: { type: Number, required: true},
  desarrollador: { type: String, required: true},
  plataforma: { type: String, required: true},
  fechaLanzamiento: { type: Date, required: true }
}, {timestamps: true});

export default model('Game', gameSchema);
