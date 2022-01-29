document.getElementById('generate').addEventListener("click", generate);

function generate() {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(response => response.json())
    .then(data => console.log(data));
}