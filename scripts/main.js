const url = 'https://pokeapi.co/api/v2/pokemon';

document.getElementById('generate').addEventListener("click", generate);

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

    //Set Pokemon Name after Capitilization
    document.getElementById('name').innerHTML = capitalizeFirstLetter(data.name);
        
    //Update Pokemon Image
    let image = document.getElementById('pokemon-image');
    image.src = data.sprites.other.dream_world.front_default;

    //Implement Pokemon Type Information
    const typeContainer = document.getElementById('type-container');
    //Clear Child Elements under `type-container`
    while(typeContainer.firstChild) {
        typeContainer.firstChild.remove();
    }

    //Append Child Elements under `type-container`
    data.types.forEach(type => {
        //Create Div with Class
        let badge = document.createElement('div');
        badge.classList.add('type-badge');
        //Create Text Node
        let text = document.createTextNode(type.type.name);
        //Append Text Node to Badge
        badge.appendChild(text);
        typeContainer.appendChild(badge);

    });

    //Set Pokemon Fighting Stats
    document.getElementById('hp').innerHTML = data.stats[0].base_stat;
    document.getElementById('attack').innerHTML = data.stats[1].base_stat;
    document.getElementById('defense').innerHTML = data.stats[2].base_stat;
    document.getElementById('speed').innerHTML = data.stats[5].base_stat;
}