const heureEl = document.getElementById('heure');

// Minuteur
const displayMinuteur = document.getElementById('affichageMinuteur');
const inputMinutes = document.getElementById('minutes');
const inputSecondes = document.getElementById('secondes');
const startMinuteurBtn = document.getElementById('demarrerMinuteur');
const cancelMinuteurBtn = document.getElementById('annulerMinuteur');

// Chronomètre
const startChronoBtn = document.getElementById('startchrono');
const tourBtn = document.getElementById('tourchrono');
const displayChrono = document.getElementById('affichagechronometeur');
const resetChronoBtn = document.getElementById('ressetchrono');
const lapsList = document.getElementById('lapsList');

// Réveil / Alarme
const timeInput = document.getElementById('herurereveil');
const textInput = document.getElementById('messagealarm');
const ajouteAlarmBtn = document.getElementById('ajoutealarm');
const alarmsListEl = document.getElementById('alarmsList');

// Zone de notification (affiche les messages)
const notificationEl = document.getElementById('notification');


function showNotification(msg, type = 'info', timeout = 4000) {
    if (!notificationEl) return; // si l'élément n'existe pas, on arrête
    notificationEl.textContent = msg;
    notificationEl.style.padding = '8px 12px';
    notificationEl.style.borderRadius = '6px';
    notificationEl.style.margin = '8px 0';
    
    // Couleur selon le type de message
    if (type === 'error') {
        notificationEl.style.background = '#fee2e2';
        notificationEl.style.color = '#991b1b';
    } else if (type === 'success') {
        notificationEl.style.background = '#ecfdf5';
        notificationEl.style.color = '#065f46';
    } else {
        notificationEl.style.background = '#eef2ff';
        notificationEl.style.color = '#0f172a';
    }

    // Efface la notification après un certain délai
    if (timeout) setTimeout(() => { 
        notificationEl.textContent = ''; 
        notificationEl.style.padding = ''; 
        notificationEl.style.background = ''; 
    }, timeout);
}

// Ajoute un 0 devant les chiffres < 10 (ex: 3 devient "03")
function pad(n) { return String(n).padStart(2, '0'); }

function getFranceTime() {
    const now = new Date(); // heure locale
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000); // conversion UTC
    const fr = new Date(utc.getTime() + 1 * 3600 * 1000); // +1h pour la France
    return fr;
}

function displayClock() {
    if (!heureEl) return;
    const fr = getFranceTime();
    const hh = pad(fr.getHours());
    const mm = pad(fr.getMinutes());
    const ss = pad(fr.getSeconds());
    heureEl.textContent = `${hh}:${mm}:${ss}`; // affiche l'heure
}
setInterval(displayClock, 1000); // met à jour chaque seconde
displayClock(); // affichage initial

let minuteurInterval = null;
let minuteurRemaining = 0; // en secondes

// Met à jour l'affichage du minuteur
function updateMinuteurDisplayFromSeconds(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (displayMinuteur) displayMinuteur.textContent = `${pad(m)}:${pad(s)}`;
}

if (displayMinuteur) displayMinuteur.textContent = '00:00';

// Démarrage du minuteur
function startMinuteur() {
    if (!inputMinutes || !inputSecondes) return;
    let minutes = parseInt(inputMinutes.value, 10);
    let secondes = parseInt(inputSecondes.value, 10);

    // Si les valeurs ne sont pas valides, on met à 0
    if (isNaN(minutes)) minutes = 0;
    if (isNaN(secondes)) secondes = 0;

    // Limite les valeurs
    minutes = Math.max(0, minutes);
    secondes = Math.max(0, Math.min(59, secondes));

    minuteurRemaining = minutes * 60 + secondes;
    updateMinuteurDisplayFromSeconds(minuteurRemaining);

    // Si un minuteur est déjà en cours, on le stoppe
    if (minuteurInterval) clearInterval(minuteurInterval);

    // Décompte chaque seconde
    minuteurInterval = setInterval(() => {
        if (minuteurRemaining <= 0) {
            clearInterval(minuteurInterval);
            minuteurInterval = null;
            updateMinuteurDisplayFromSeconds(0);
            showNotification('Le minuteur est terminé.', 'success', 5000);
            return;
        }
        minuteurRemaining -= 1;
        updateMinuteurDisplayFromSeconds(minuteurRemaining);
    }, 1000);
}

// Annule le minuteur
function cancelMinuteur() {
    if (minuteurInterval) {
        clearInterval(minuteurInterval);
        minuteurInterval = null;
        minuteurRemaining = 0;
        updateMinuteurDisplayFromSeconds(0);
        showNotification('Minuteur annulé.', 'info', 2000);
    }
}

// Boutons minuteur
if (startMinuteurBtn) startMinuteurBtn.addEventListener('click', startMinuteur);
if (cancelMinuteurBtn) cancelMinuteurBtn.addEventListener('click', cancelMinuteur);

let chronoInterval = null;
let chronoStartAt = null; 
let chronoAccum = 0; // temps accumulé

// Convertit le temps en hh:mm:ss
function formatMsToHMS(ms) {
    const totalSec = Math.floor(ms / 1000);
    const hh = Math.floor(totalSec / 3600);
    const mm = Math.floor((totalSec % 3600) / 60);
    const ss = totalSec % 60;
    return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

// Met à jour l'affichage
function updateChronoDisplay() {
    const now = Date.now();
    const elapsed = chronoAccum + (chronoStartAt ? (now - chronoStartAt) : 0);
    if (displayChrono) displayChrono.textContent = formatMsToHMS(elapsed);
}

// Démarre / arrête le chronomètre
function toggleChrono() {
    if (chronoInterval) {
        // arrêt
        clearInterval(chronoInterval);
        chronoInterval = null;
        chronoAccum += Date.now() - chronoStartAt;
        chronoStartAt = null;
        showNotification('Chronomètre arrêté.', 'info', 1200);
    } else {
        // démarrage
        chronoStartAt = Date.now();
        chronoInterval = setInterval(updateChronoDisplay, 200);
        showNotification('Chronomètre démarré.', 'success', 1200);
    }
}

// Enregistre un tour
function recordLap() {
    const nowMs = chronoAccum + (chronoStartAt ? (Date.now() - chronoStartAt) : 0);
    if (!lapsList) return;
    const li = document.createElement('li');
    li.textContent = formatMsToHMS(nowMs);
    lapsList.insertBefore(li, lapsList.firstChild);
}

// Réinitialise le chrono
function resetChrono() {
    if (chronoInterval) { clearInterval(chronoInterval); chronoInterval = null; }
    chronoStartAt = null;
    chronoAccum = 0;
    if (displayChrono) displayChrono.textContent = '00:00:00';
    if (lapsList) lapsList.innerHTML = '';
    showNotification('Chronomètre remis à zéro.', 'info', 1200);
}

// Boutons chronomètre
if (startChronoBtn) startChronoBtn.addEventListener('click', toggleChrono);
if (tourBtn) tourBtn.addEventListener('click', recordLap);
if (resetChronoBtn) resetChronoBtn.addEventListener('click', resetChrono);

let alarms = []; // tableau contenant toutes les alarmes

// Affiche la liste des alarmes
function renderAlarms() {
    if (!alarmsListEl) return;
    alarmsListEl.innerHTML = '';
    const now = Date.now();
    alarms.forEach(a => {
        const li = document.createElement('li');
        li.style.padding = '6px 8px';
        li.style.color = '#eef2ff';
        const status = a.triggered ? ' (passée)' : 
            (a.ts <= now ? ' (passée)' : ` (dans ${msToHuman(a.ts - now)})`);
        li.textContent = `${a.time} — ${a.msg}${status}`;
        if (a.triggered) li.style.opacity = '0.6';
        alarmsListEl.appendChild(li);
    });
}

// Convertit des millisecondes en texte lisible 
function msToHuman(ms) {
    if (ms <= 0) return '0s';
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / 60000) % 60;
    const h = Math.floor(ms / 3600000);
    return `${h}h ${m}m ${s}s`;
}

// Convertit une heure (HH:MM) en timestamp futur
function parseTimeToNext(hhmm) {
    const parts = hhmm.split(':');
    if (parts.length < 2) return null;
    const hh = parseInt(parts[0], 10);
    const mm = parseInt(parts[1], 10);
    if (isNaN(hh) || isNaN(mm)) return null;
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0, 0);
    if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1); // si l'heure est déjà passée → lendemain
    return target.getTime();
}

// Bouton "ajouter alarme"
if (ajouteAlarmBtn) {
    ajouteAlarmBtn.addEventListener('click', () => {
        const timeVal = timeInput ? timeInput.value : '';
        const msg = textInput ? textInput.value.trim() : '';
        if (!timeVal) { showNotification('Veuillez saisir une heure pour l\'alarme.', 'error'); return; }
        const ts = parseTimeToNext(timeVal);
        if (!ts) { showNotification('Heure invalide.', 'error'); return; }
        
        // Création de l’objet alarme
        const alarm = { 
            id: Date.now() + Math.random(), 
            time: timeVal, 
            msg: msg || 'Réveil', 
            ts: ts, 
            triggered: false 
        };
        alarms.push(alarm);
        renderAlarms();
        showNotification('Alarme ajoutée : ' + timeVal, 'success', 2500);
        if (textInput) textInput.value = '';
    });
}

// Vérifie toutes les secondes si une alarme doit sonner
setInterval(() => {
    const now = Date.now();
    let changed = false;
    alarms.forEach(a => {
        if (!a.triggered && a.ts <= now) {
            a.triggered = true;
            changed = true;
            showNotification('Alarme: ' + a.msg, 'success', 6000);
        }
    });
    if (changed) renderAlarms();
    if (alarms.length) renderAlarms();
}, 1000);

// Valeurs initiales par défaut
if (displayMinuteur) displayMinuteur.textContent = '00:00';
if (displayChrono) displayChrono.textContent = '00:00:00';