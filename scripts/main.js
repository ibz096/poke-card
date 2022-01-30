document.getElementById('generate').addEventListener("click", generate);

function generate() {
    fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(response => response.json())
    .then(function(data) {
        console.log(data);
        document.getElementById('name').innerHTML = data.name;
        document.getElementById('hp').innerHTML = data.stats[0].base_stat;
        document.getElementById('attack').innerHTML = data.stats[1].base_stat;
        document.getElementById('defense').innerHTML = data.stats[2].base_stat;
        document.getElementById('speed').innerHTML = data.stats[5].base_stat;
    });
}