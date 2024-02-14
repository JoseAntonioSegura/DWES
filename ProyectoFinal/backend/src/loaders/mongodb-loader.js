import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export default async function(config){
  const url = `mongodb+srv://${config.user}:${config.password}@bd-azure.tvlwczp.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(url);
    logger.info(`Connected to MongoDB at ${url}`)
  }catch(err){
    logger.error(`Error connecting to MongoDB at ${url} \n${err}`)
  }
}
