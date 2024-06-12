# Manual de uso - Proyecto Final

## 🕹️ Ninja Games:

## Importar la colección de Postman
Para facilitar las pruebas de la API, hemos incluido una colección de Postman. Sigue los siguientes pasos para importar la colección:

1. Descarga el archivo Postman Collection: [Descargar colección Postman](./Proyecto%20Final.postman_collection.json)

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