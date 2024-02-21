import Carrito from '../../models/Carrito.js';

export async function addToCart(userId, productId) {
  const carrito = await Carrito.create({ userId, productId });
  return carrito;
}

export async function removeFromCart(id) {
  await Carrito.findByIdAndDelete(id);
}
