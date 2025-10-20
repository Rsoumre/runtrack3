// Fonction pour déterminer si une année est bissextile
function bisextile(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Exemple de jeu de données à tester
const annees = [2000, 2004, 1900, 2024, 2023];

// Affiche dans la console si chaque année est bissextile ou non
annees.forEach((annee) => {
    const estBissextile = bisextile(annee);
    console.log(`${annee} : ${estBissextile ? 'bissextile' : 'non bissextile'}`);
});


