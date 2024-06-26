const readline = require('readline');
const fs = require('fs');
const path = require('path');

const directorio = 'C:/Users/joans/Documents/GitHub/DWES/Ejercicios/Trabajo';

const eleccionUsuario = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// console.log('Menú:');
// console.log('1. Crear nueva nota');
// console.log('2. Editar nota existente');
// console.log('3. Eliminar nota');

if (process.argv.length > 2) {
  const opcion = process.argv[2];
  if (opcion === '1') {
    console.log('Has elegido la opción 1: Crear nueva nota:');
    eleccionUsuario.question('Introduzca a continuación el nombre de la nota que desea crear:', (nombre) => {
      const archivoPath = path.resolve(directorio, `${nombre}.note`);

      let nuevoContenido = '';
      let saltosDeLinea = 0;

      console.log('Ahora introduzca el contenido que desea agregar. Presione Enter dos veces para finalizar:');

      eleccionUsuario.on('line', (linea) => {
        if (linea === '') {
          saltosDeLinea += 1;
          if (saltosDeLinea === 2) {
            fs.writeFile(archivoPath, nuevoContenido, (err) => {
              if (err) {
                console.error('Error al crear el fichero', err);
              } else {
                console.log('Fichero creado con éxito');
              }
              eleccionUsuario.close();
            });
          } else {
            nuevoContenido += '\n';
          }
        } else {
          saltosDeLinea = 0;
          nuevoContenido += `${linea}\n`;
        }
      });
    });
  } else if (opcion === '2') {
    console.log('Has elegido la opción 2: Editar nota existente');
    fs.readdir(directorio, (err, archivos) => {
      if (err) {
        console.error('Error al leer el directorio: ', err);
        eleccionUsuario.close();
        return;
      }

      const archivosNote = archivos.filter((archivo) => path.extname(archivo) === '.note');

      if (archivosNote.length === 0) {
        console.log('No hay archivos .note en el directorio. Cerrando el menú...');
        eleccionUsuario.close();
        return;
      }

      console.log('Archivos .note en el directorio:');
      let contador = 0;
      archivosNote.forEach((archivo) => {
        console.log(`${contador}. ${archivo}`);
        contador += 1;
      });

      eleccionUsuario.question('Seleccione el número del archivo que desea editar: ', (indice) => {
        const parsedIndice = parseInt(indice, 10);
        if (Number.isNaN(parsedIndice) || parsedIndice < 0 || parsedIndice >= archivosNote.length) {
          console.log('El archivo seleccionado no existe. Por favor, elija un número válido.');
          eleccionUsuario.close();
          return;
        }

        const archivoSeleccionado = archivosNote[parsedIndice];
        if (!archivoSeleccionado) {
          console.log('El archivo seleccionado no existe. Por favor, elija un número válido.');
          eleccionUsuario.close();
          return;
        }

        const archivoPath = path.resolve(directorio, archivoSeleccionado);

        fs.readFile(archivoPath, 'utf8', (err1, data) => {
          if (err1) {
            console.error('Error al leer el archivo', err1);
            eleccionUsuario.close();
            return;
          }
          console.log('Contenido actual del archivo:');
          console.log(data);

          let nuevoContenido = '';
          let saltosDeLinea = 0;

          console.log('A continuación escriba el texto que desea editar, presione Enter dos veces para finalizar:');

          eleccionUsuario.on('line', (linea) => {
            if (linea === '') {
              saltosDeLinea += 1;
              if (saltosDeLinea === 2) {
                fs.writeFile(archivoPath, nuevoContenido, (err2) => {
                  if (err2) {
                    console.error('Error al escribir en el archivo', err2);
                  } else {
                    console.log('Archivo editado con éxito');
                  }
                  eleccionUsuario.close();
                });
              } else {
                nuevoContenido += '\n';
              }
            } else {
              saltosDeLinea = 0;
              nuevoContenido += `${linea}\n`;
            }
          });
        });
      });
    });
  } else if (opcion === '3') {
    console.log('Has elegido la opción 3: Eliminar nota');
    fs.readdir(directorio, (err, archivos) => {
      if (err) {
        console.error('Error al leer el directorio: ', err);
        eleccionUsuario.close();
        return;
      }

      const archivosNote = archivos.filter((archivo) => path.extname(archivo) === '.note');

      if (archivosNote.length === 0) {
        console.log('No hay archivos .note en el directorio. Cerrando el menú...');
        eleccionUsuario.close();
        return;
      }

      console.log('Archivos .note en el directorio:');
      let contador = 0;
      archivosNote.forEach((archivo) => {
        console.log(`${contador}. ${archivo}`);
        contador += 1;
      });

      eleccionUsuario.question('Seleccione el número del archivo que desea eliminar: ', (indice) => {
        const parsedIndice = parseInt(indice, 10);
        if (Number.isNaN(parsedIndice) || parsedIndice < 0 || parsedIndice >= archivosNote.length) {
          console.log('El archivo seleccionado no existe. Por favor, elija un número válido.');
          eleccionUsuario.close();
          return;
        }
        const archivoSeleccionado = archivosNote[parsedIndice];
        const archivoPath = path.resolve(directorio, archivoSeleccionado);

        fs.unlink(archivoPath, (err3) => {
          if (err3) {
            console.error('Error al eliminar el archivo', err3);
          } else {
            console.log('El archivo ha sido eliminado');
          }
          eleccionUsuario.close();
        });
      });
    });
  } else {
    console.log('Opción no válida');
    eleccionUsuario.close();
  }
}
