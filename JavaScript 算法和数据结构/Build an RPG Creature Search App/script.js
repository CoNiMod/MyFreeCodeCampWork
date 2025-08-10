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
const types = document.getElementById('creature-info').querySelector('#types');

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

    // Clear previous results - this is crucial for the tests
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
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            return null;
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// Display creature data
function displayCreature(creature) {
    // Update creature name (should be uppercase)
    creatureName.textContent = creature.name.toUpperCase();
    
    // Update creature ID (can be #1 or 1 format)
    creatureId.textContent = `#${creature.id}`;
    
    // Update stats
    weight.textContent = creature.weight;
    height.textContent = creature.height;
    hp.textContent = creature.hp;
    attack.textContent = creature.attack;
    defense.textContent = creature.defense;
    specialAttack.textContent = creature.specialAttack;
    specialDefense.textContent = creature.specialDefense;
    speed.textContent = creature.speed;

    // Clear types first, then add new ones
    types.innerHTML = '';
    
    // Display types - each type should be a separate element
    creature.types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.className = 'type-badge';
        typeElement.textContent = type.toUpperCase();
        types.appendChild(typeElement);
    });

    // Show the creature info
    creatureInfo.classList.add('show');
}
