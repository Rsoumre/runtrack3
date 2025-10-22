window.addEventListener('scroll', function () {
    const footer = document.querySelector('footer');
    if (!footer) return;


    // Calculer le pourcentage de défilement
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;

    // Empêcher la division par zéro (page très courte)
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    // Mettre à jour la largeur de la barre de progression
    const bar = document.getElementById('progress-bar');
    if (bar) {
        const pct = Math.round(scrollPercent * 100);
        bar.style.width = pct + '%';
        bar.setAttribute('aria-valuenow', String(pct));
    }
});

// Exécuter une fois au chargement pour initialiser la couleur
window.addEventListener('load', function () {
    window.dispatchEvent(new Event('scroll'));
});