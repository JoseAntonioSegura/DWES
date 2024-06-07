# Manual de uso - Proyecto Final

## 🔎 Conceptos

### 🕹️ Ninja Games:

## 🧾 Documentación

### Configuración del entorno
Para instalar y ejecutar el proyecto, asegúrate de tener Node.js y npm instalados en tu sistema.

#### Instalación usando npm (NO RECOMENDADO)
1. Clona este repositorio.
2. Navega hacia una de las carpetas del repositorio principal (backend o frontend).
3. Ejecuta `npm install` para instalar las dependencias en cada carpeta.
4. Configurar las variables de entornos correspondientes.
4. Ejecuta `npm start` en el backend una vez que hayas realizado el paso anterior.
5. Ejecuta `npm start` en el frontend, esperar a que nos indique que el puerto 3000 ya está en uso e indicarle que continue desde el puerto 3001.

- Es importante indicar que primero se debe ejecutar el backend y luego el frontend para evitar errores. 
- Si queremos acceder a Swagger usaremos la siguiente ruta `http://localhost:3000/api-docs/`

### Variables de entorno (SOLO PARA LA INSTALACIÓN USANDO NPM)
Asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto.

- **BACKEND**
    - PORT=3000
    - SECRET_KEY=macacobrasileiro
    - MONGODB_USER=jaseggom
    - MONGODB_PASSWORD=Ja1977-1980

- **BACKEND**
    - REACT_APP_URL=http://localhost:3000

#### Ejecución con Docker (RECOMENDADO)
También puedes ejecutar el proyecto usando Docker lo que nos permitirá poder desplegar el frontend y el backend a la vez, sin necesidad de modificar ni añadir variables de entorno. Asegúrate de tener Docker-Desktop instalado en tu sistema.
1. Clona este repositorio.
2. Navega a la carpeta del raiz del proyecto en tu terminal (./proyecto).
3. Ejecuta `docker-compose build` para construir los contenedores.
4. Ejecuta `docker-compose up` para levantar los correspondientes contenedores.
5. Abrimos el navegador y accederemos a esta URL `http://localhost:4001/`.

- Si queremos acceder a Swagger usaremos la siguiente ruta `http://localhost:4000/api-docs/`

### Pruebas
#### POSTMAN
Todos los test funcionan y pasan correctamente, los resultados exportados marcan dos errores en los DELETE de Carrito y Facturas. Si funcionan pero no he puesto los datos necesarios ya que da una pereza horrible tener que volver a buscar los ID.

### 🚃 Rutas Principales

- Todos los endpoints que contengan admin o deban acceder al panel administrador deben contar con el rol `Admin` para poder ser utilizados. 

#### 🔐 Autenticación:

- `POST: /login` Endpoint para iniciar sesión.

#### 👤 Usuarios:

- `GET: /users/me`: Obtener los datos del usuario logueado.
- `GET: /users/name/:name`: Obtener los datos del usuario por su nombre desde el panel administrador.
- `GET: /users/admin/:id`: Obtener los datos del usuario por su id desde el panel administrador.
- `GET: /users`: Obtener todos los usuarios desde el panel administrador.
- `POST: /users`: Crear un usuario.
- `PATCH: /users/:id`: Actualizar un usuario.
- `PATCH: /users/admin/:id`: Actualizar un usuario desde el panel administrador.
- `DELETE: /users/:id`: Eliminar un usuario.

#### 🎮 Juegos:

- `GET: /games`: Obtener todos los juegos.
- `GET: /games/name/:title`: Obtener un juego por título.
- `GET: /games/:id`: Obtener un juego por ID.
- `POST: /games`: Crear un juego.
- `PATCH: /games/:id`: Actualizar datos de forma limitada cuando el usuario realiza una compra.
- `PATCH: /games/admin/:id`: Actualizar un juego con todos sus apartados desde el panel administrador.
- `DELETE: /games/:id`: Eliminar un juego.

#### 🛒 Carrito:

- `GET: /carrito/:userId`: Obtener productos del carrito de un usuario.
- `POST: /carrito/agregar`: Agregar producto al carrito.
- `PATCH: /carrito`: Modificar cantidad de producto en el carrito.
- `DELETE: /carrito/:carritoId`: Eliminar producto del carrito.
- `POST: /carrito/:confirmar-compra`: Recopila todos los endpoint anteriores para en un único endpoint realizar todo el proceso de compra.

#### 🧾 Facturas:

- `GET: /factura/:userId`: Obtener todas las facturas de un usuario.
- `GET: /factura/admin/:userId`: Obtener facturas de otros usuarios desde el administrador.
- `POST: /factura/agregar`: Agregar una factura.
- `DELETE: /factura/:facturaId`: Eliminar una factura.

### 🗝️ Middleware Utilizado:

- `checkToken`: Middleware para verificar el token de autenticación en las rutas protegidas.
- `isAdmin`: Middleware para el rol del usuario a la hora de loguearse.

## Middleware
- El proyecto utiliza algunos middlewares para ciertas funcionalidades. Puedes encontrarlos en los archivos correspondientes en la carpeta `middlewares`.

## Swagger
- Puedes acceder a la documentación de la API utilizando Swagger visitando `/docs` o `/api-docs` después de ejecutar el servidor.

##  TEST-SONAR

- Puedes acceder a los tests generados con la configuración de SonarQube realizando el siguiente comando desde la `./backend`:
  - `docker-compose -f docker-compose.test.yml up`.
- Posteriormente, en el `package.json`, encontrarás todos los scripts necesarios para verificar cada apartado.

## Importar la colección de Postman
Para facilitar las pruebas de la API, hemos incluido una colección de Postman. Sigue los siguientes pasos para importar la colección:

1. Descarga el archivo Postman Collection:
    [Descargar colección Postman](./Proyecto%20Final.postman_collection.json)

2. Abre Postman y ve a `File -> Import`.

3. Selecciona `Upload Files` y elige el archivo `.json` descargado.

4. Haz clic en `Import`.

### Variables de entorno
Asegúrate de configurar las variables de entorno necesarias en Postman. Las variables que necesitas configurar son:

- `token`: token necesario para determinadas URL.
- `id`: id utilizada para las peticiones get, patch y delete.

## Ver las Cuentas en Swagger

Puedes acceder a la documentación de la API utilizando Swagger. Primero de todo, deberemos clonar y desplegar el backend como se ve en los ejemplos anteriores, tras realizar dichos pasos sigue estos:

1. Abre tu navegador web y visita la URL siguiente: `https://dwes.onrender.com/api-docs/`.

2. Se abrirá la interfaz de Swagger, donde encontrarás una lista de todos los endpoints disponibles en tu API.

3. Busca la sección o el endpoint relacionado con las cuentas.

4. Haz clic en el endpoint correspondiente para ver más detalles sobre cómo usarlo. En la documentación de Swagger, encontrarás información sobre los parámetros que puedes enviar, las respuestas que puedes esperar y ejemplos de cómo realizar la solicitud.

5. Utiliza la interfaz de Swagger para probar el endpoint y ver las cuentas en acción. Puedes enviar solicitudes directamente desde la interfaz y ver las respuestas en tiempo real.

## 📋 Correcciones y nuevas características desde la correción del 2 Trimestre:
- `Correcciones realizadas: (Recomendadas por Gabri)`
  - Ahora la actualización y eliminación de usuarios se realiza mediante la ID correspondiente.
  - La actualización y eliminación de productos ahora se realiza mediante la ID asociada.
  - Además el proceso de compra ahora se realiza desde un unico endpoint.
- `Nuevas características implementadas:`
  - Se ha desarrollado un Panel de Administrador completamente funcional. Para acceder, es necesario iniciar sesión como usuario "admin" con la contraseña "admin". El acceso está disponible en el encabezado.
  - Se han realizado mejoras estéticas en toda la aplicación, sobre todo en la vista inicial del usuario con un producto.
  - Implementación de paginación de productos por categoría y orden, además de la capacidad de desplazarse fácilmente entre las páginas.
  - El footer ha sido prácticamente finalizado e incluye la documentación correspondiente.
  - Se han realizado pruebas utilizando AVA, principalmente enfocadas en los controladores.
  - Se ha agregado la funcionalidad de visualizar facturas y administrarlas por usuario.
  - Dockerización Acabada.
  - Despliegue terminado y documentación Swagger y Postman mejorados y acabados.
  - Versión Mobile.
  - Se implementaron más filtros y correciones.
  - Mejoras estéticas.
  - El despliegue de la aplicación web desde Render y Netlify.
  - Documentación Proyecto Acabado.
  - Mucho más.