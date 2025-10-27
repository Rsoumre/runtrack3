document.getElementById('update').addEventListener("click", async () => {
    try {
        const response = await fetch('users.php');
        const users = await response.json();
        const tbody = document.querySelector('tbody'); // Vider le tableau avant d'ajouter de nouvelles lignes
        if (tbody) tbody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nom || ''}</td>
                <td>${user.prenom || ''}</td>
                <td>${user.email || ''}</td>
            `;
            if (tbody) tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
});