import mongoose from 'mongoose';
import logger from '../utils/logger.js';

// Conexión a la base de datos
export default async function(config){
  // Conexión a la base de datos con mongoAtlas, recogiendo los datos de la configuración
  const url = `mongodb+srv://${config.user}:${config.password}@bd-azure.tvlwczp.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(url);
    logger.info(`Connected to MongoDB at ${url}`)
  }catch(err){
    logger.error(`Error connecting to MongoDB at ${url} \n${err}`)
  }
}
