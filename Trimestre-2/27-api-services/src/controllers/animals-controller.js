import { getFromAnimals } from "../services/animals-services.js";

// Creo un controlador que se encarga de recoger los query de la solicitud get, recoge el tipo de animal ya sea un cat o dog, horse... y la cantidad de datos (mount)
async function getAnimals(req, res) {
    try {
      //Animal type
      const animalType = req.query.animal_type || 'cat';
      //Cantidad de animales por pantalla
      const amount = parseInt(req.query.amount) || 5;

      //Llama al servicio para recibir un json
      const result = await getFromAnimals(animalType, amount);

      //Devuelve el json con los resultados
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}

// Exporto para la ruta
export { getAnimals };