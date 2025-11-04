// Chargement des données depuis localStorage
let users = JSON.parse(localStorage.getItem('users')) || []; // tableau des utilisateurs
let requests = JSON.parse(localStorage.getItem('requests')) || []; // tableau des demandes de présence
let current = JSON.parse(localStorage.getItem('currentUser')); // utilisateur actuellement connecté

// --- INSCRIPTION ---
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();

        if (!email.endsWith('@laplateforme.io')) {
            alert("Seules les adresses @laplateforme.io sont autorisées !");
            return;
        }

        if (users.find(u => u.email === email)) {
            alert("Cet email est déjà utilisé !");
            return;
        }

        users.push({ name, email, password, role: "user" });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Compte créé avec succès !");
        window.location.href = 'connexion.html';
    });
}

// --- CONNEXION ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) return alert("Email ou mot de passe incorrect !");
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    });
}

// --- DASHBOARD ---
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'connexion.html';
    });
}
// Affichage des informations utilisateur sur le dashboard
if (window.location.pathname.includes('dashbaord.html')) {
    if (!current) {
        alert('Veuillez vous connecter avant d’accéder au tableau de bord.');
        window.location.href = 'connexion.html';
    }

    const userArea = document.getElementById('userArea');
    if (userArea && current) {
        userArea.innerHTML = `<span>Bienvenue, ${current.name} (${current.role})</span>`;
    }
// Gestion des demandes de présence
    const askPresence = document.getElementById('askPresence');
    const requestList = document.getElementById('requestList');

    askPresence.addEventListener('click', () => {
        const date = document.getElementById('presenceDate').value;
        if (!date) return alert("Choisis une date !");
        if (new Date(date) < new Date()) return alert("Date déjà passée !");

        requests.push({ user: current.email, date, status: "pending" });
        localStorage.setItem('requests', JSON.stringify(requests));
        alert("Demande envoyée !");
        renderRequests();
    });
// Affichage des demandes de présence
    function renderRequests() {
        requestList.innerHTML = '';
        requests
            .filter(r => r.user === current.email)
            .forEach(r => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${r.date} → ${r.status}`;
                requestList.appendChild(li);
            });
    }

    renderRequests();
}
