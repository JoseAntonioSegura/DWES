import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const carritoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  cantidad: { type: Number, default: 1 },
});

export default model('Carrito', carritoSchema);
