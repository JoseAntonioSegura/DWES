# Utiliza una imagen base con Node.js para la etapa de construcción
FROM node:14 as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app/frontend

# Copia los archivos de configuración y dependencias del frontend
COPY ./package.json ./package-lock.json ./

# Instala las dependencias del frontend
RUN npm install

# Copia el resto de los archivos del frontend
COPY . .

# Construye el proyecto del frontend
RUN npm run build

# Expone el puerto en el que se ejecutará el frontend
EXPOSE 3001

# Comando para iniciar la aplicación frontend
CMD ["npm", "start"]

# Me queda configurar NGINX para que sirva el frontend - parte de israel
