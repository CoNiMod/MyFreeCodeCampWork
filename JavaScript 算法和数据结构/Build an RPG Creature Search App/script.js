// DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureInfo = document.getElementById('creature-info');

// Creature data elements
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const types = document.getElementById('types');

// API endpoint
const API_BASE_URL = 'https://rpg-creature-api.freecodecamp.rocks/api/creatures';

// Event listeners
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Search function
async function handleSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        return;
    }

    // Clear previous results
    types.innerHTML = '';
    creatureInfo.classList.remove('show');

    try {
        const creature = await fetchCreature(searchTerm);
        
        if (creature) {
            displayCreature(creature);
        } else {
            alert('Creature not found');
        }
    } catch (error) {
        console.error('Error fetching creature:', error);
        alert('Creature not found');
    }
}

// Fetch creature from API
async function fetchCreature(searchTerm) {
    const url = `${API_BASE_URL}/${encodeURIComponent(searchTerm)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        return null;
    }
    
    return await response.json();
}

// Display creature data
function displayCreature(creature) {
    creatureName.textContent = creature.name.toUpperCase();
    creatureId.textContent = `#${creature.id}`;
    weight.textContent = creature.weight;
    height.textContent = creature.height;
    hp.textContent = creature.hp;
    attack.textContent = creature.attack;
    defense.textContent = creature.defense;
    specialAttack.textContent = creature.specialAttack;
    specialDefense.textContent = creature.specialDefense;
    speed.textContent = creature.speed;

    // Display types
    creature.types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.className = 'type-badge';
        typeElement.textContent = type.toUpperCase();
        types.appendChild(typeElement);
    });

    creatureInfo.classList.add('show');
}
