// Ejercicio 1
export function pingController(req, res) {
  res.send('pong');
}

//Prueba
export function adminAccessController(req, res) {
  res.status(200).send('Bienvenid@, disfrute del contenido');
}