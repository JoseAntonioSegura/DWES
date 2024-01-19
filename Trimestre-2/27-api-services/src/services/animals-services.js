import fetch from 'node-fetch';

// recibo el tipo de animal y el numero para posteriormente realizar una peticion a la api
async function getFromAnimals(type, amount) {
    //Ruta de la api donde se complementa con la query escrita por el usuario
    const path = '/facts/random?animal_type=' + type + '&amount=' + amount;
    const url = 'https://cat-fact.herokuapp.com' + path;
    const response = await fetch(url);

    //Se devuelve la respuesta en formato json
    return response.json();
}

export { getFromAnimals };