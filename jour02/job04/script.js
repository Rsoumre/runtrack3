document.addEventListener("keydown", function(event) {
    const textarea = document.getElementById("keylogger");
    const key = event.key;

    // Vérifie si la touche est une lettre (a-z ou A-Z)
    if (/^[a-z]$/i.test(key)) {
        // Si le focus est sur le textarea, on ajoute deux fois
        if (document.activeElement === textarea) {
            textarea.value += key + key;
        } else {
            // Sinon, on ajoute une seule fois
            textarea.value += key;
        }
    }
});
