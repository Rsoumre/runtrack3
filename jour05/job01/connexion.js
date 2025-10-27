const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
let error;


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
