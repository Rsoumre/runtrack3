const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const adresse = document.getElementById('adresse');
const codepostal = document.getElementById('codepostal');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordconfirm = document.getElementById('passwordconfirm');
const submit = document.getElementById('submit');
let error;

nom.addEventListener('input', () => {
    if (nom.value === '') {
        error = 'le nom est requis';
    } else if (nom.value.length < 3) {
        error = ' le nom doit contenir au moin 3 lettres';
    } else {
        error = '';
    }
    nom.nextElementSibling.textContent = error;
})


prenom.addEventListener('input', function () {
    if (prenom.value === '') {
        error = 'le prenom est requis';
    } else if (prenom.value.length < 3) {
        error = 'prenom doit avoir au moins 3 lettres';
    } else {
        error = '';
    }
    prenom.nextElementSibling.textContent = error;
})

email.addEventListener('input', function () {
    if (email.value === '') {
        error = 'le mail est requis';
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        error = 'Format d\'email invalide.';
    }
    email.nextElementSibling.textContent = error;
})


password.addEventListener('input', function () {
    if (password.value === '') {
        error = 'mot de passe obligatoire';
    } else if (password.value.length < 8) {
        error = '8 caractères minimum.';
    } else {
        error = '';
    }
    password.nextElementSibling.textContent = error
})


passwordconfirm.addEventListener('input', function () {
    if (passwordconfirm.value === '') {
        error = 'mot de passe obligatoire';
    } else if (passwordconfirm.value.length < 8) {
        error = '8 caractères minimum.';
    } else if (passwordconfirm.value !== password.value) {
        error = 'mot de passe ne correspond'
    } else {
        error = '';
    }
    passwordconfirm.nextElementSibling.textContent = error
})

adresse.addEventListener('input', function () {
    if (adresse.value === '') {
        error = 'veuillez remplir le champ';
    } else {
        error = '';
    }
    adresse.nextElementSibling.textContent = error
})


codepostal.addEventListener('input', function () {
    if (codepostal.value === '') {
        error = 'veuillez remplir le champ';
    } else {
        error = '';
    }
    codepostal.nextElementSibling.textContent = error
})


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (!form) return;

    // Champs à valider dynamiquement (connexion ou inscription)
    const fields = Array.from(form.querySelectorAll('input')).filter(input => input.type !== 'submit' && input.type !== 'button');

    // Création des messages d'erreur sous chaque champ
    fields.forEach(input => {
        let error = document.createElement('div');
        error.className = 'error-message';
        error.id = input.id + '-error';
        input.insertAdjacentElement('afterend', error);
    });
})
