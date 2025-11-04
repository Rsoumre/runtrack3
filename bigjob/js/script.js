// Chargement des données depuis localStorage
let users = JSON.parse(localStorage.getItem('users')) || []; // tableau des utilisateurs
let requests = JSON.parse(localStorage.getItem('requests')) || []; // tableau des demandes de présence
let current = JSON.parse(localStorage.getItem('currentUser')); // utilisateur actuellement connecté

// INSCRIPTION 
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

        users.push({ name, email, password, role: "admin" });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Compte créé avec succès !");
        window.location.href = 'connexion.html';
    });
}

// CONNEXION
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

// DASHBOARD 
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'connexion.html';
  });
}

// Page Dashboard
if (window.location.pathname.includes('dashboard.html')) {
  if (!current) {
    alert('Veuillez vous connecter avant d’accéder au tableau de bord.');
    window.location.href = 'connexion.html';
  }

  const userArea = document.getElementById('userArea');
  if (userArea && current) {
    userArea.innerHTML = `<span>Bienvenue, ${current.name} (${current.role})</span>`;
  }

  // lien admin ici
  const adminLink = document.getElementById('adminLink');
  if (adminLink && current.role === 'admin') {
    adminLink.classList.remove('d-none');
  }

  // Gestion des demandes de présence 
  const askPresence = document.getElementById('askPresence');
  const requestList = document.getElementById('requestList');

  if (askPresence) {
    askPresence.addEventListener('click', () => {
      const date = document.getElementById('presenceDate').value;
      if (!date) return alert("Choisis une date !");
      if (new Date(date) < new Date()) return alert("Date déjà passée !");

      requests.push({ user: current.email, date, status: "pending" });
      localStorage.setItem('requests', JSON.stringify(requests));
      alert("Demande envoyée !");
      renderRequests();
    });
  }

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



// PAGE ADMIN 
if (window.location.pathname.includes('admin.html')) {
  if (!current || current.role !== 'admin') {
    alert('Accès réservé aux administrateurs.');
    window.location.href = 'connexion.html';
  }

  const userArea = document.getElementById('userArea');
  const logoutBtn = document.getElementById('logoutBtn');
  const userTableBody = document.getElementById('userTableBody');

  // Afficher l'utilisateur connecté
  if (userArea && current) {
    userArea.innerHTML = `<span>Bienvenue, ${current.name} (${current.role})</span>`;
  }

  // Déconnexion
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'connexion.html';
    });
  }

  // Fonction pour afficher la liste des utilisateurs
  function renderUsers() {
    userTableBody.innerHTML = '';
    users.forEach((u, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>
          <select class="form-select form-select-sm role-select" data-index="${index}">
            <option value="user" ${u.role === 'user' ? 'selected' : ''}>Utilisateur</option>
            <option value="moderator" ${u.role === 'moderator' ? 'selected' : ''}>Modérateur</option>
            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
          </select>
        </td>
        <td><button class="btn btn-sm btn-success save-btn" data-index="${index}">Sauvegarder</button></td>
      `;
      userTableBody.appendChild(tr);
    });

    // Gérer le changement de rôle
    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.dataset.index;
        const newRole = document.querySelector(`.role-select[data-index="${index}"]`).value;
        users[index].role = newRole;
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Le rôle de ${users[index].name} est maintenant "${newRole}"`);
        renderUsers(); // recharger la table
      });
    });
  }

  renderUsers();

  // Fonction pour afficher la liste des demandes
  const requestTableBody = document.getElementById('requestTableBody');
  function renderRequests() {
    if (!requestTableBody) return;
    
    requestTableBody.innerHTML = '';
    requests.forEach((request, index) => {
      const user = users.find(u => u.email === request.user);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user ? user.name : request.user}</td>
        <td>${request.date}</td>
        <td><span class="badge ${getBadgeClass(request.status)}">${request.status}</span></td>
        <td>
          ${request.status === 'pending' ? `
            <button class="btn btn-sm btn-success me-2 action-btn" data-action="accept" data-index="${index}">
              Accepter
            </button>
            <button class="btn btn-sm btn-danger action-btn" data-action="reject" data-index="${index}">
              Refuser
            </button>
          ` : ''}
        </td>
      `;
      requestTableBody.appendChild(tr);
    });

    // Gérer les actions sur les demandes
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = parseInt(e.target.dataset.index);
        const action = e.target.dataset.action;
        
        requests[index].status = action === 'accept' ? 'accepted' : 'rejected';
        localStorage.setItem('requests', JSON.stringify(requests));
        renderRequests();
      });
    });
  }

  // Fonction helper pour obtenir la classe du badge selon le statut
  function getBadgeClass(status) {
    switch(status) {
      case 'pending': return 'bg-warning';
      case 'accepted': return 'bg-success';
      case 'rejected': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  // Afficher les demandes au chargement de la page
  renderRequests();
}