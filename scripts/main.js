document.getElementById('generate').addEventListener("click", generate);

const url = 'https://pokeapi.co/api/v2/pokemon';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

async function fetchJSON(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function generate() {
    //Get Total Number of pokemon from PokeAPI
    const { count: pokeCount } = await fetchJSON(url)    

    //Get Random Pokemon within the pokeCount limit
    let rand_index = Math.floor(Math.random() * pokeCount) + 1;
    console.log(`Random Index: ${rand_index}`);

    //Get Pokemon Details
    const data = await fetchJSON(`${url}/${rand_index}`)

    console.log(data);
    document.getElementById('name').innerHTML = capitalizeFirstLetter(data.name);
    //Implement Pokemon Type Information
    let typeContainer = document.getElementById('type-container');
    data.types.forEach(type => {

    });
    console.log(typeContainer);

    //Fighting Stats
    document.getElementById('hp').innerHTML = data.stats[0].base_stat;
    document.getElementById('attack').innerHTML = data.stats[1].base_stat;
    document.getElementById('defense').innerHTML = data.stats[2].base_stat;
    document.getElementById('speed').innerHTML = data.stats[5].base_stat;
}