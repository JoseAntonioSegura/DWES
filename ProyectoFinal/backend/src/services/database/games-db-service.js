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

export async function getGames(filters = {}) {
  const { sort, title, pegi, plataforma, precioMin, precioMax, categoria, ...query } = filters;
  const gamesQuery = Game.find(query);

  // Aplicar los filtros
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
  } else {
    gamesQuery.sort(sort);
  }
  if (title) {
    gamesQuery.where('titulo').regex(new RegExp(title, 'i'));
  }
  if (categoria) {
    gamesQuery.where('categoria').equals(categoria);
  }
  if (plataforma) {
    gamesQuery.where('plataforma').equals(plataforma);
  }
  if (precioMin !== undefined) {
    gamesQuery.where('precio').gte(precioMin);
  }
  if (precioMax !== undefined) {
    gamesQuery.where('precio').lte(precioMax);
  }  
  if (pegi) {
    gamesQuery.where('pegi').lte(pegi);
  }

  return gamesQuery.exec();
}


// Actualizar un juego
export async function updateGameByID(id, newData) {
  return Game.findByIdAndUpdate(id, newData, { new: true });
}

