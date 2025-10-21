// Écrire une fonction qui prend en entrée un tableau de nombres et un ordre
// ('asc' pour ascendant, 'desc' pour descendant) et retourne le tableau trié selon l'ordre spécifié.

function tri (numbres, order) {
if (order === 'asc') {
    return numbres.sort((a, b) => a - b);   
}
else if (order === 'desc') {
    return numbres.sort((a, b) => b - a); 
}
else {
    return 'ordre non valide';
}
}

console.log(tri([5, 2, 9, 1, 5, 6], 'asc'));   // [1, 2, 5, 5, 6, 9]
console.log(tri([5, 2, 9, 1, 5, 6], 'desc'));  // [9, 6, 5, 5, 2, 1]
console.log(tri([5, 2, 9, 1, 5, 6], 'invalid')); // 'ordre non valide'