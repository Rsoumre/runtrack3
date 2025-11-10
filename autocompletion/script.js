const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');

searchInput.addEventListener('keyup', () => {
  const query = searchInput.value.trim();

  if (query.length === 0) {
    suggestionsList.innerHTML = '';
    return;
  }

  fetch(`suggestions.php?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      suggestionsList.innerHTML = '';

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

          suggestionsList.appendChild(li);
        });
      } else {
        suggestionsList.innerHTML = '<li>Aucun résultat</li>';
      }
    });
});
