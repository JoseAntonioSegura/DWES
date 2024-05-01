import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const gameSchema = new Schema({
  titulo: { type: String, required: true, unique: true},
  descripcion: { type: String, required: true},
  unidades: { type: Number, required: true},
  categoria: {
    type: [String],
    enum: ['acción', 'aventura', 'rol', 'disparos', 'estrategia', 'deportes', 'carreras', 'puzzle', 'sandbox', 'terror', 'plataforma', 'lucha', 'mundo abierto', 'simulación', 'otros', 'supervivencia'],
    default: ['undefined']
  },
  precio: { type: Number, required: true},
  imagen: { type: String, required: true},
  trailer: { type: String, required: true},
  pegi: { type: Number,
    enum: [4, 7, 12, 16, 18],
    required: true
  },
  desarrollador: { type: String, required: true},
  plataforma: {
    type: String,
    enum: ['Steam', 'EpicGames', 'Xbox', 'PlayStation', 'Windows', 'Origin', 'Nintendo', 'Launcher'],
    required: true
  },
  fechaLanzamiento: { type: Date, required: true }
}, {timestamps: true});

gameSchema.plugin(mongoosePaginate);

export default model('Game', gameSchema);
