import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const facturaSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Array de objetos con los productos comprados
  datosProducto: [{
    productoId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    unidades: { type: Number, required: true },
    precio: { type: Number, required: true }
  }],
  timestamp: { type: Date, default: Date.now },
});

export default model('Factura', facturaSchema);
