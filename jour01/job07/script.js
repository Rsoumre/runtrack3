function jourtravaille(date) {
    const joursFeries = [
        '2020-01-01',
        '2020-04-10',
        '2020-04-13',
        '2020-05-01',
        '2020-05-08',
        '2020-05-21',
        '2020-06-01',
        '2020-07-14',
        '2020-08-15',
        '2020-11-01',
        '2020-11-11',
        '2020-12-25'
    ];

    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const dateStr = date.toISOString().split('T')[0]; // format YYYY-MM-DD
    const jour = date.getDate();
    const mois = date.getMonth() + 1;
    const annee = date.getFullYear();

    if (joursFeries.includes(dateStr)) {
        console.log(`Le ${jour} ${mois} ${annee} est un jour férié`);
    } else if (date.getDay() === 0 || date.getDay() === 6) {
        console.log(`Non, ${jour} ${mois} ${annee} est un week-end`);
    } else {
        console.log(`Oui, ${jour} ${mois} ${annee} est un jour travaillé`);
    }
}

// Exemples d'utilisation
jourtravaille(new Date('2020-01-01')); // Jour férié
jourtravaille(new Date('2020-04-11')); // Week-end
jourtravaille(new Date('2020-04-14')); // Jour travaillé
