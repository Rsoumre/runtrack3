// Charge pokemon.json et expose le filtrage
let pokemons = [];

// Charger les données Pokémon depuis le fichier JSON
async function loadPokemons() {
  try {
    const res = await fetch('pokemon.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    pokemons = await res.json();
    // Optionnel: afficher un message initial
    renderMessage('Données chargées — entrez des filtres et cliquez sur Filtrer.');
  } catch (err) {
    console.error('Erreur chargement pokemon.json', err);
    renderMessage('Impossible de charger les données (ouvrir via un serveur local).', true);
  }
}


// Afficher un message dans le conteneur de résultats
function renderMessage(text, isError = false) {
  const container = document.getElementById('results');
  if (!container) return;
  container.innerHTML = `<p style="color:${isError? '#a00': '#333'}">${text}</p>`;
}

function render(results) {
  const container = document.getElementById('results');
  if (!container) return;
  if (!results || results.length === 0) {
    container.innerHTML = '<p>Aucun Pokémon trouvé.</p>';
    return;
  }

  // Construire la grille de cartes
  const html = results.map(p => {
    const types = (p.type || []).map(t => `<span class="type">${t}</span>`).join(' ');
    const stats = p.base ? Object.entries(p.base).map(([k,v]) => `<li><strong>${k}</strong>: ${v}</li>`).join('') : '';
    const nameFr = p.name && p.name.french ? p.name.french : '';
    const nameEn = p.name && p.name.english ? p.name.english : '';
    return `
      <article class="pokemon-card">
        <div class="card-head">
          <div class="poke-id">#${p.id}</div>
          <h3 class="poke-name">${nameFr} <small class="muted">(${nameEn})</small></h3>
        </div>
        <div class="card-body">
          <div class="types">${types}</div>
          <ul class="stats">${stats}</ul>
        </div>
      </article>`;
  }).join('');

  container.innerHTML = `<div class="grid">${html}</div>`;
}

// Appliquer les filtres du formulaire
function applyFilters(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (!pokemons || pokemons.length === 0) {
    renderMessage('Les données ne sont pas encore chargées.');
    return;
  }


  // Récupérer les valeurs des champs
  const idVal = document.getElementById('id').value.trim();
  const nomVal = document.getElementById('nom').value.trim().toLowerCase();
  const typeVal = document.getElementById('type').value.trim().toLowerCase();

  const results = pokemons.filter(p => {
    if (idVal) {
      if (String(p.id) !== idVal) return false;
    }
    if (nomVal) {
      const names = `${(p.name && p.name.french)||''} ${(p.name && p.name.english)||''}`.toLowerCase();
      if (!names.includes(nomVal)) return false;
    }
    if (typeVal) {
      const types = (p.type || []).join(' ').toLowerCase();
      if (!types.includes(typeVal)) return false;
    }
    return true;
  });

  render(results);
}

// Liaisons
window.addEventListener('load', () => {
  loadPokemons();
  const form = document.querySelector('form');
  if (form) form.addEventListener('submit', applyFilters);
});
const buttonSubmit = document.getElementById('submit-input');
const pokemonId = document.getElementById('id')
const pokemonNom = document.getElementById('nom')
const pokemonType = document.getElementById('type')
// Écouter le clic sur le bouton après le chargement du DOM
document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('pokemon.json');
    const pokemons = await response.json();
    buttonSubmit.addEventListener('click', function () {
        const idValue = parseInt(pokemonId.value);
        const pokemon = pokemons.find(p => p.id === idValue);
        if (pokemon) {
            pokemonNom.textContent = pokemon.nom;
            pokemonType.textContent = pokemon.type;
        } else {
            pokemonNom.textContent = 'Pokémon non trouvé';
            pokemonType.textContent = '';
        }

    });
});



