import logger from '../utils/logger.js';

const isAdmin = (req, res, next) => {
    logger.info('Verificando si el usuario es administrador');
    const rol = req.headers.rol;
  
    //console.log(rol);
    
    if (rol === 'Admin') {
        logger.info('El usuario es administrador');
      next();
    } else {
        logger.error('Acceso denegado. Se requiere rol de administrador.');
      return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
    }
  };
  
  export default isAdmin;
  