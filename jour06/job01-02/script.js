
    // Bouton "Rebooter le Monde" : change le texte du jumbotron (citations Blade Runner 1982)
    const citations = [
      "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion.",
      "All those moments will be lost in time, like tears in rain.",
      "It's too bad she won't live! But then again, who does?",
      "Quite an experience to live in fear, isn't it? That's what it is to be a slave."
    ];
    const rebooterBtn = document.querySelector(".btn-danger");
    if (rebooterBtn) {
      rebooterBtn.addEventListener("click", function() {
        const citation = citations[Math.floor(Math.random() * citations.length)];
        // replace the jumbotron content (title + paragraph)
        const display = document.querySelector(".display-6");
        if (display) display.innerText = citation;
      });
    }

    // Pagination : change le texte du jumbotron selon la page (utilise le numéro affiché)
    const pages = ["Bienvenue sur ma page !", "Deuxième page activée !", "Troisième page, encore moi !"];
    document.querySelectorAll(".pagination .page-link").forEach((link, i) => {
      link.addEventListener("click", (ev) => {
        ev.preventDefault();
        const num = parseInt(link.innerText, 10);
        const display = document.querySelector('.display-6');
        if (!isNaN(num) && display) {
          const idx = Math.max(0, Math.min(pages.length - 1, num - 1));
          display.innerText = pages[idx];
        }
      });
    });

    // Liste : rend actif l’élément cliqué
    document.querySelectorAll(".list-group-item").forEach(item => {
      item.addEventListener("click", function() {
        document.querySelectorAll(".list-group-item").forEach(el => el.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Barre de progression 
    let progress = 75;
    const progressEl = document.getElementById("progressBar");
    function setProgress(p) {
      progress = Math.max(0, Math.min(100, p));
      if (progressEl) {
        progressEl.style.width = progress + "%";
        progressEl.setAttribute('aria-valuenow', String(progress));
        progressEl.textContent = progress + '%';
      }
    }
    const minusBtn = document.getElementById("moins");
    const plusBtn = document.getElementById("plus");
    if (minusBtn) minusBtn.addEventListener("click", () => setProgress(progress - 10));
    if (plusBtn) plusBtn.addEventListener("click", () => setProgress(progress + 10));
    // init from inline width if present
    (function() {
      if (progressEl) {
        const w = progressEl.style.width || progressEl.getAttribute('aria-valuenow');
        if (w && typeof w === 'string') {
          const n = parseInt(w, 10);
          if (!isNaN(n)) setProgress(n);
        } else setProgress(progress);
      }
    })();

    // Raccourci clavier DGC → affiche la modale avec infos du formulaire 
    let keyBuffer = [];
    const TARGET_SEQ = ['D','G','C'];
    document.addEventListener('keydown', (e) => {
      keyBuffer.push(e.key.toUpperCase());

      if (keyBuffer.length > 10) keyBuffer.shift();
      if (keyBuffer.slice(-3).join('') === TARGET_SEQ.join('')) {
        const leftForm = document.querySelector('.container .row form');
        let emailVal = '';
        let passVal = '';
        if (leftForm) {
          const em = leftForm.querySelector('input[type="email"]');
          const pw = leftForm.querySelector('input[type="password"]');
          emailVal = em ? em.value : '';
          passVal = pw ? pw.value : '';
        }
        document.getElementById('modalBody').innerHTML = `\n          <p><strong>Email :</strong> ${emailVal || 'non renseigné'}</p>\n          <p><strong>Mot de passe :</strong> ${passVal ? '●'.repeat(6) : 'non renseigné'}</p>\n        `;
        new bootstrap.Modal(document.getElementById('formModal')).show();
        keyBuffer = [];
      }
    });

    // Changement aléatoire de couleur du spinner après soumission du formulaire 
    const colorForm = document.getElementById('colorForm');
    if (colorForm) {
      colorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailEl = colorForm.querySelector('input[type="email"]');
        const pwdEl = colorForm.querySelector('input[type="password"]');
        const email = emailEl ? emailEl.value.trim() : '';
        const pwd = pwdEl ? pwdEl.value.trim() : '';
        if (!email || !pwd) {
          const msg = document.createElement('div');
          msg.className = 'text-danger mt-2';
          msg.textContent = 'Email et mot de passe requis.';
          colorForm.appendChild(msg);
          setTimeout(() => msg.remove(), 2000);
          return;
        }
        const colors = ['text-danger', 'text-success', 'text-warning', 'text-primary', 'text-info'];
        const spinner = document.querySelector('.spinner-border');
        if (spinner) {
          spinner.classList.remove('text-danger','text-success','text-warning','text-primary','text-info');
          const cls = colors[Math.floor(Math.random() * colors.length)];
          spinner.classList.add(cls);
        }
      });
    }