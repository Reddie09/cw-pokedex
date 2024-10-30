window.onload = async () => {
    await loadAllPokemon();
};

async function loadAllPokemon() {
    const pokemonData = document.getElementById('pokemonData');
    pokemonData.innerHTML = ''; // Clear previous results

    for (let i = 1; i <= 151; i++) {
        await fetchPokemon(i);
    }
}

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) {
            throw new Error(`Pokémon with ID ${id} not found`);
        }

        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        console.error(error);
    }
}

function displayPokemon(data) {
    const pokemonData = document.getElementById('pokemonData');
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    // Assign background color based on Pokémon type
    const colors = getTypeColors(data.types);
    pokemonElement.style.backgroundColor = colors[0]; // Use the first type color

    pokemonElement.innerHTML = `
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
        <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
    `;

    pokemonData.appendChild(pokemonElement);
}

// Function to map Pokémon types to colors
function getTypeColors(types) {
    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040B0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#F0B6F0',
        unknown: '#68A090',
        shadow: '#9B9B9B',
    };

    // Get the colors based on the Pokémon's types
    return types.map(type => typeColors[type.type.name] || '#FFFFFF');
}
