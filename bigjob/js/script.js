// VARIABLES GLOBALES 
let users = JSON.parse(localStorage.getItem('users')) || [];
let requests = JSON.parse(localStorage.getItem('requests')) || [];
let current = JSON.parse(localStorage.getItem('currentUser')) || null;

// CHARGEMENT INITIAL 
async function initApp() {
  // Charger depuis users.json uniquement si le localStorage est vide
  if (users.length === 0 || requests.length === 0) {
    console.log(" Import initial depuis users.json...");
    try {
      const response = await fetch('users.json');
      const data = await response.json();
      users = data.users || [];
      requests = data.requests || [];
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('requests', JSON.stringify(requests));
      console.log(" Données importées avec succès !");
    } catch (err) {
      console.error(" Erreur lors du chargement de users.json :", err);
    }
  }

  // Rafraîchir current user
  current = JSON.parse(localStorage.getItem('currentUser')) || null;

  // Lancer les fonctions selon la page
  handleAuth();
  handleDashboard();
  handleAdmin();
}

// AFFICHAGE ALERTES DYNAMIQUES
function showAlert(message, type = 'info') {
  const colors = {
    success: '#4CAF50',
    error: '#F44336',
    info: '#2196F3',
    warning: '#FFC107'
  };

  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.style.position = 'fixed';
  alertBox.style.bottom = '20px';
  alertBox.style.right = '20px';
  alertBox.style.padding = '10px 16px';
  alertBox.style.color = 'white';
  alertBox.style.background = colors[type] || '#333';
  alertBox.style.borderRadius = '8px';
  alertBox.style.fontSize = '15px';
  alertBox.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
  alertBox.style.zIndex = '9999';
  document.body.appendChild(alertBox);

  setTimeout(() => alertBox.remove(), 3000);
}

//  INSCRIPTION / CONNEXION 
function handleAuth() {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  // Inscription
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('registerName').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value.trim();

      if (!email.endsWith('@laplateforme.io'))
        return showAlert("Seules les adresses @laplateforme.io sont autorisées", 'warning');

      if (users.some(u => u.email === email))
        return showAlert("Cet email est déjà utilisé !", 'error');

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: "user",
        created_at: new Date().toISOString().split('T')[0]
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      showAlert("Compte créé avec succès ", 'success');
      setTimeout(() => (window.location.href = 'connexion.html'), 1000);
    });
  }

  // Connexion
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return showAlert("Email ou mot de passe incorrect", 'error');

      localStorage.setItem('currentUser', JSON.stringify(user));
      showAlert(`Bienvenue ${user.name} `, 'success');
      setTimeout(() => (window.location.href = 'dashboard.html'), 1000);
    });
  }
}

// DASHBOARD UTILISATEUR 
function handleDashboard() {
  if (!window.location.pathname.includes('dashboard.html')) return;
  if (!current) {
    showAlert("Connecte-toi d'abord !", 'warning');
    return (window.location.href = 'connexion.html');
  }

  const userArea = document.getElementById('userArea');
  const askBtn = document.getElementById('askPresence');
  const dateInput = document.getElementById('presenceDate');
  const requestList = document.getElementById('requestList');
  const adminLink = document.getElementById('adminLink');
  const logoutBtn = document.getElementById('logoutBtn');

  if (userArea) userArea.innerHTML = ` Bonjour, <b>${current.name}</b> (${current.role})`;
  if (adminLink && (current.role === 'admin' || current.role === 'moderator'))
    adminLink.classList.remove('d-none');
  if (logoutBtn)
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'connexion.html';
    });

  if (askBtn) {
    askBtn.addEventListener('click', () => {
      const date = dateInput.value;
      if (!date) return showAlert("Choisis une date !", 'warning');
      if (new Date(date) < new Date()) return showAlert("Date déjà passée !", 'error');

      const newReq = {
        id: Date.now(),
        user_id: current.id,
        date,
        status: 'pending',
        created_at: new Date().toISOString().split('T')[0]
      };

      requests.push(newReq);
      localStorage.setItem('requests', JSON.stringify(requests));
      showAlert("Demande envoyée ", 'success');
      renderRequests();
    });
  }

  function renderRequests() {
    if (!requestList) return;
    requestList.innerHTML = '';
    const myRequests = requests.filter(r => r.user_id === current.id);

    if (myRequests.length === 0) {
      requestList.innerHTML = `<li class="text-muted text-center py-3">Aucune demande encore</li>`;
      return;
    }

    myRequests.forEach(r => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      const formattedDate = new Date(r.date).toLocaleDateString('fr-FR');

      const statusInfo = {
        pending: { text: 'En attente', color: 'text-warning', icon: 'fa-clock' },
        approved: { text: 'Acceptée', color: 'text-success', icon: 'fa-check-circle' },
        rejected: { text: 'Refusée', color: 'text-danger', icon: 'fa-times-circle' }
      }[r.status];

      li.innerHTML = `
        <span><i class="fas fa-calendar-alt me-2"></i>${formattedDate}</span>
        <span class="${statusInfo.color}">
          <i class="fas ${statusInfo.icon} me-1"></i>${statusInfo.text}
        </span>`;
      requestList.appendChild(li);
    });
  }

  renderRequests();
}

// ADMIN & MODÉRATEUR 
function handleAdmin() {
  if (!window.location.pathname.includes('admin.html')) return;
  if (!current || (current.role !== 'admin' && current.role !== 'moderator')) {
    showAlert("Accès réservé aux administrateurs/modérateurs", 'error');
    return (window.location.href = 'connexion.html');
  }

  const userArea = document.getElementById('userArea');
  const userTable = document.getElementById('userTableBody');
  const requestTable = document.getElementById('requestTableBody');
  const logoutBtn = document.getElementById('logoutBtn');

  if (userArea) userArea.innerHTML = ` Espace ${current.role} - ${current.name}`;
  if (logoutBtn)
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'connexion.html';
    });

  // --- Table utilisateurs ---
  function renderUsers() {
    if (!userTable) return;
    userTable.innerHTML = '';
    users.forEach((u, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>
          ${current.role === 'admin' ? `
            <select class="form-select form-select-sm role-select" data-index="${i}" ${u.id === current.id ? 'disabled' : ''}>
              <option value="user" ${u.role === 'user' ? 'selected' : ''}>Utilisateur</option>
              <option value="moderator" ${u.role === 'moderator' ? 'selected' : ''}>Modérateur</option>
              <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
            </select>` : `<span>${u.role}</span>`}
        </td>
        <td>${u.created_at}</td>
        ${current.role === 'admin' && u.id !== current.id ? `<td><button class="btn btn-sm btn-success save-btn" data-index="${i}">Sauvgarde</button></td>` : '<td></td>'}
      `;
      userTable.appendChild(tr);
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = e.target.dataset.index;
        const newRole = document.querySelector(`.role-select[data-index="${i}"]`).value;
        users[i].role = newRole;
        localStorage.setItem('users', JSON.stringify(users));
        showAlert(`Rôle de ${users[i].name} changé en ${newRole}`, 'success');
        renderUsers();
      });
    });
  }

  renderUsers();

  // --- Table demandes ---
  function renderRequests() {
    if (!requestTable) return;
    requestTable.innerHTML = '';
    if (requests.length === 0) {
      requestTable.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">Aucune demande</td></tr>`;
      return;
    }

    requests.forEach((r, i) => {
      const user = users.find(u => u.id === r.user_id);
      const formattedDate = new Date(r.date).toLocaleDateString('fr-FR');
      const statusLabel = {
        pending: { text: 'En attente', cls: 'bg-warning' },
        approved: { text: 'Acceptée', cls: 'bg-success' },
        rejected: { text: 'Refusée', cls: 'bg-danger' }
      }[r.status];

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user ? user.name : 'Inconnu'}</td>
        <td>${formattedDate}</td>
        <td><span class="badge ${statusLabel.cls}">${statusLabel.text}</span></td>
        <td>
          ${r.status === 'pending'
            ? `
              <button class="btn btn-sm btn-success action-btn" data-action="accept" data-index="${i}">✔️</button>
              <button class="btn btn-sm btn-danger action-btn" data-action="reject" data-index="${i}">❌</button>
            `
            : `<small class="text-muted">Traitée par ${users.find(u => u.id === r.approved_by)?.name || 'modérateur'}</small>`
          }
        </td>`;
      requestTable.appendChild(tr);
    });

    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = e.target.dataset.index;
        const action = e.target.dataset.action;
        requests[i].status = action === 'accept' ? 'approved' : 'rejected';
        requests[i].approved_by = current.id;
        localStorage.setItem('requests', JSON.stringify(requests));
        showAlert(`Demande ${action === 'accept' ? 'approuvée ' : 'refusée '}`, 'success');
        renderRequests();
      });
    });
  }

  renderRequests();
}

// DÉMARRAGE
initApp();