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
  - Una página inicio y contacto.
  - Poder comprar un producto directamente.
  - Aceptar términos y condiciones generado.
  - Desplegar y no usar el localhost.
  - Mejoras de CSS.
  - Más test que abarquen más errores.
  - Probar una API que permite la implementación de un chatBot.
- **💡Arreglos:** 
  - Busqueda de usuarios y productos ahora por ID.
  - Rol Admin y Middleware Admin.
  - Más test para SonarQube usando ava.

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
- `/users/:id`: Actualizar un usuario.
- `/users/:id`: Eliminar un usuario.

#### 🎮 Juegos:

- `/games`: Obtener todos los juegos.
- `/games/name/:title`: Obtener un juego por título.
- `/games/id/:id`: Obtener un juego por ID.
- `/games`: Crear un juego.
- `/games/:id`: Actualizar un juego.
- `/games/:id`: Eliminar un juego.

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
- `isAdmin`: Middleware para el rol del usuario a la hora de loguearse.



## Middleware
- El proyecto utiliza algunos middlewares para ciertas funcionalidades. Puedes encontrarlos en los archivos correspondientes en la carpeta `middlewares`.

## Swagger
- Puedes acceder a la documentación de la API utilizando Swagger visitando `/docs` o `/api-docs` después de ejecutar el servidor.

##  TEST-SONAR

- Puedes acceder a los tests generados con la configuración de SonarQube realizando el siguiente comando:
  - `docker-compose -f docker-compose.test.yml up`.
- Posteriormente, en el `package.json`, encontrarás todos los scripts necesarios para verificar cada apartado.

## 📋 Correcciones y nuevas características de la primera entrega:
- `Correcciones realizadas:`
  - Ahora la actualización y eliminación de usuarios se realiza mediante la ID correspondiente.
  - La actualización y eliminación de productos ahora se realiza mediante la ID asociada.
- `Nuevas características implementadas:`
  - Se ha desarrollado un Panel de Administrador completamente funcional. Para acceder, es necesario iniciar sesión como usuario "admin" con la contraseña "admin". El acceso está disponible en el encabezado.
  - Se han realizado mejoras estéticas en toda la aplicación, sobre todo en la vista inicial del usuario con un producto.
  - Implementación de paginación de productos por categoría y orden, además de la capacidad de desplazarse fácilmente entre las páginas.
  - El footer ha sido prácticamente finalizado e incluye la documentación correspondiente.
  - Se han realizado pruebas utilizando AVA, principalmente enfocadas en los controladores.
  - Se ha agregado la funcionalidad de visualizar facturas y administrarlas por usuario. La parte estética de esta función está pendiente.
- `Próximas actualizaciones:`
  - Mejoras estéticas en toda la aplicación, así como su adaptación a dispositivos móviles.
  - Se implementarán más filtros para evitar errores por parte del usuario.
  - Mejora de los iconos, logotipos y otros elementos visuales como botones, imágenes y la vista de productos.
  - El despliegue de la aplicación web sin una urgencia inmediata.
  - La documentación, al menos del apartado 4, será completada y se corregirá el apartado 3.


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

