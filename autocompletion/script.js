const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');
// Écouteur d'événement pour la saisie dans le champ de recherche
searchInput.addEventListener('keyup', () => {
  const query = searchInput.value.trim();
// Si la requête est vide, on vide la liste des suggestions
  if (query.length === 0) {
    suggestionsList.innerHTML = '';
    return;
  }
// Requête AJAX pour obtenir les suggestions
  fetch(`suggestions.php?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      suggestionsList.innerHTML = '';
// Si des données sont retournées, on les affiche
      if (data.length > 0) {
        data.forEach((item, index) => {
          const li = document.createElement('li');
          li.textContent = item.nom;
          li.onclick = () => {
            window.location.href = `element.php?id=${item.id}`;
          };

          // Séparation entre résultats exacts et partiels
          if (index === data.exact_count) {
            const separator = document.createElement('li');
            separator.textContent = '────────────';
            separator.classList.add('separator');
            suggestionsList.appendChild(separator);
          }
// Ajout de l'élément à la liste des suggestions
          suggestionsList.appendChild(li);
        });
      } else {
        suggestionsList.innerHTML = '<li>Aucun résultat</li>';
      }
    });
});
