# Dockerfile del backend
# Utiliza una imagen base con Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app/backend

# Copia los archivos de configuración y dependencias del backend
COPY ./package.json ./package-lock.json ./

# Instala las dependencias del backend
RUN npm install --production

# Copia el resto de los archivos del backend
COPY . .

# Expone el puerto en el que se ejecutará el backend
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "start"]
