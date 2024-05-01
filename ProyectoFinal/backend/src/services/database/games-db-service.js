import { Game } from '../../models/index.js';

// crear un juego en la base de datos
export async function createGame(data){
  const game =  new Game(data);
  return game.save();
}

// Obtener un juego por título
export async function getGameByTitle(titulo) {
  return Game.find({ titulo: { $regex: titulo, $options: 'i' } });
}

// Obtener un juego por id
export async function getGameById(id) {
  return Game.findById(id);
}

export async function getGames(filters = {}, options = {}) {
  const { sort, titulo, pegi, plataforma, precioMin, precioMax, categoria, ...query } = filters;

  let gamesQuery = Game.find(query);

  // Aplicar los demás filtros
  if (titulo) {
    gamesQuery = gamesQuery.where('titulo').regex(new RegExp(titulo, 'i'));

  }
  if (categoria) {
    console.log(categoria);
    gamesQuery = gamesQuery.where('categoria').equals(categoria);
  }
  if (plataforma) {
    console.log(plataforma);
    gamesQuery = gamesQuery.where('plataforma').equals(plataforma);
  }
  if (precioMin !== undefined) {
    gamesQuery = gamesQuery.where('precio').gte(precioMin);
  }
  if (precioMax !== undefined) {
    gamesQuery = gamesQuery.where('precio').lte(precioMax);
  }
  if (pegi) {
    gamesQuery = gamesQuery.where('pegi').lte(pegi);
  }

  // Clonar la consulta para contar los documentos
  const countQuery = gamesQuery.model.find(gamesQuery.getFilter());

  // Obtener el número total de juegos con los filtros aplicados y esperar a que termine
  const totalCount = await Game.countDocuments(gamesQuery.getFilter());

  // Aplicar los filtros de ordenamiento
  if (sort !== undefined) {
    switch (sort) {
      case 'precio':
        gamesQuery.sort({ precio: 1 });
        break;
      case '-precio':
        gamesQuery.sort({ precio: -1 });
        break;
      case 'titulo':
        gamesQuery.sort({ titulo: 1 });
        break;
      case '-titulo':
        gamesQuery.sort({ titulo: -1 });
        break;
      case 'fechaLanzamiento':
        gamesQuery.sort({ fechaLanzamiento: 1 });
        break;
      case '-fechaLanzamiento':
        gamesQuery.sort({ fechaLanzamiento: -1 });
        break;
      default:
        break;
    }
  }

  // Aplicar paginación
  const { page = 1, limit = 15 } = options;
  const paginatedResults = await gamesQuery.skip((page - 1) * limit).limit(limit).exec();

  // Calcular el número total de páginas
  const totalPages = Math.ceil(totalCount / limit);

  return { paginatedResults, totalPages };
}



// Actualizar un juego
export async function updateGameByID(id, newData) {
  return Game.findByIdAndUpdate(id, newData, { new: true });
}

