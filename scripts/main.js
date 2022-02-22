const url = 'https://pokeapi.co/api/v2/pokemon';

const type_map = {
    normal: "rgb(168 168 120)",
    fire: "rgb(240 128 48)",
    water: "rgb(104 144 240)",
    grass: "rgb(120 200 80)",
    electric: "rgb(248 208 48)",
    ice: "rgb(152 216 216)",
    fighting: "rgb(192 48 40)",
    poison: "rgb(160 64 160)",
    ground: "rgb(224 192 104)",
    flying: "rgb(168 144 240)",
    psychic: "rgb(248 88 136)",
    bug: "rgb(168 144 240)",
    rock: "rgb(184 160 56)",
    ghost: "rgb(112 88 152)",
    dark: "rgb(112 88 72)",
    dragon: "rgb(112 56 248)",
    steel: "rgb(184 184 208)",
    fairy: "rgb(240 182 188)"
}

document.getElementById('generate').addEventListener("click", generate);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchJSON(url) {
    const response = await fetch(url)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
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
    const data = await fetchJSON(`${url}/${rand_index}`).catch(error => {
        console.log(error.message);
        return {
            name: "missingNo",
            sprites: {
                other: {
                    dream_world: {
                        front_default: "https://archives.bulbagarden.net/media/upload/9/98/Missingno_RB.png"
                    }
                }
            },
            types: [{ type: { name: "???" } }],
            stats: [{ base_stat: "???" }, { base_stat: "???" }, { base_stat: "???" }, undefined, undefined, { base_stat: "???" }]
        }
    });

    //Set Pokemon Name after Capitilization
    document.getElementById('name').innerHTML = capitalizeFirstLetter(data.name);

    //Update Pokemon Image
    let image = document.getElementById('pokemon-image');
    image.src = data.sprites.other.dream_world.front_default;

    //Implement Pokemon Type Information
    const typeContainer = document.getElementById('type-container');
    //Clear Child Elements under `type-container`
    while (typeContainer.firstChild) {
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