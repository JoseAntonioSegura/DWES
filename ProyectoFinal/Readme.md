# Proyecto Final

## 🔎 Conceptos

### 🕹️ Página Web de venta de productos/videojuegos:
- **Objetivo:** Desarrollar una aplicación con los siguientes apartados.

- **💻 Hecho/Realizando:** 
  - Sistema de Inicio de Sesión y Registro.
  - Edición de Datos Personales y logout.
  - Añadir productos al carrito, modificar carrito, simular checkout y confirmar pago.
  - Listar facturas de pagos realizados anteriormente.
  - Listar productos, limitar el número de productos que aparecen, y poder ordenarlos o filtrarlos en la página inicio.
  - Usuario admin con diferentes apartados.
  - Vista de los datos de un producto.
  - Buscador de productos y filtros.
  - Footer básico.
- **💡 Por hacer:** 
  - Usuario Admin que tenga la posibilidad de editar productos.
  - Una página inicio y contacto.
  - Poder comprar un producto directamente.
  - Aceptar términos y condiciones generado.
  - Desplegar y no usar el localhost.
  - Mejoras de CSS.

## 🧾 Documentación

### Configuración del entorno
Para instalar y ejecutar el proyecto, asegúrate de tener Node.js y npm instalados en tu sistema.

#### Instalación usando npm
1. Clona este repositorio.
2. Navega a la carpeta del proyecto en tu terminal.
3. Ejecuta `npm install` para instalar las dependencias.

#### Ejecución con Docker
También puedes ejecutar el proyecto usando Docker. Asegúrate de tener Docker y docker-compose instalados en tu sistema.
1. Clona este repositorio.
2. Navega a la carpeta del proyecto en tu terminal.
3. Ejecuta `docker-compose up` para construir y levantar los contenedores.

### Variables de entorno
Asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto.

- **Usando-MongoATLAS**
    - PORT=3000
    - SECRET_KEY=macacobrasileiro
    - MONGODB_USER=jaseggom
    - MONGODB_PASSWORD=Ja1977-1980

- **Ya no lo uso-MongoDB**
    - MONGODB_HOST=localhost
    - MONGODB_PORT=27017
    - MONGODB_DBNAME=test

### Pruebas
#### POSTMAN
Todos los test funcionan y pasan correctamente, los resultados exportados marcan dos errores en los DELETE de Carrito y Facturas. Si funcionan pero no he puesto los datos necesarios ya que da una pereza horrible tener que volver a buscar los ID.

### 🚃 Rutas Principales

#### 🔐 Autenticación:

- `/login`: Endpoint para iniciar sesión.

#### 👤 Usuarios:

- `/users/me`: Obtener los datos del usuario logueado.
- `/users`: Obtener todos los usuarios.
- `/users/:username`: Actualizar un usuario.
- `/users/:username`: Eliminar un usuario.

#### 🎮 Juegos:

- `/games`: Obtener todos los juegos.
- `/games/:title`: Obtener un juego por título.
- `/games/id/:id`: Obtener un juego por ID.
- `/games`: Crear un juego.
- `/games/:title`: Actualizar un juego.
- `/games/:title`: Eliminar un juego.

#### 🛒 Carrito:

- `/carrito/:userId`: Obtener productos del carrito de un usuario.
- `/carrito/agregar`: Agregar producto al carrito.
- `/carrito`: Modificar cantidad de producto en el carrito.
- `/carrito/:carritoId`: Eliminar producto del carrito.

#### 🧾 Facturas:

- `/factura/agregar`: Agregar una factura.
- `/factura/:userId`: Obtener todas las facturas de un usuario.
- `/factura/:facturaId`: Eliminar una factura.

### 🗝️ Middleware Utilizado:

- `checkToken`: Middleware para verificar el token de autenticación en las rutas protegidas.


## Middleware
- El proyecto utiliza algunos middlewares para ciertas funcionalidades. Puedes encontrarlos en los archivos correspondientes en la carpeta `middlewares`.

## Swagger
- Puedes acceder a la documentación de la API utilizando Swagger visitando `/docs` o `/api-docs` después de ejecutar el servidor.

##  TEST-SONAR

- Puedes acceder a los tests generados con la configuración de SonarQube realizando el siguiente comando:
  - `docker-compose -f docker-compose.test.yml up`.
- Posteriormente, en el `package.json`, encontrarás todos los scripts necesarios para verificar cada apartado.
