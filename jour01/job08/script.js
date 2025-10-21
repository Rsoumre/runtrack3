// Fonction pour vérifier si un nombre est premier

function estPremier(nombre) {
    if (nombre <= 1) return false;
    for (let i = 2; i <= Math.sqrt(nombre); i++) {
        if (nombre % i === 0) return false;
    }
    return true;
}

function sommenombrespremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b;
    } else {
        return false;
    }
}

console.log(sommenombrespremiers(3, 5));   //  8 (3 et 5 sont premiers)
console.log(sommenombrespremiers(4, 7));   //  false (4 n’est pas premier)
console.log(sommenombrespremiers(11, 13)); //  24 (11 et 13 sont premiers) 