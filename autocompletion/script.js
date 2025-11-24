const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        suggestionsList.innerHTML = '';
        return;
    }

    fetch("get_sportifs.php")
        .then(response => response.json())
        .then(data => {
            suggestionsList.innerHTML = '';

            const filtered = data.filter(item =>
                item.nom.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                const li = document.createElement('li');
                li.textContent = 'Aucun résultat';
                li.classList.add('no-result');
                suggestionsList.appendChild(li);
                return;
            }

            filtered.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.nom;
                li.onclick = () => {
                    window.location.href = `element.php?id=${item.id}`;
                };
                suggestionsList.appendChild(li);
            });
        })
        .catch(err => console.error("Erreur fetch JSON :", err));
});
