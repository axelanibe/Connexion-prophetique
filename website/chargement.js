// Indicateur de chargement, 31 oct. 2026, barre de progression, 22 nov. 2026 :
// la barre avance sur des étapes réelles, lues dans l'API Performance,
// jamais sur un minuteur. main.dart.js téléchargé, puis le moteur
// CanvasKit, puis le premier rendu Flutter qui retire l'indicateur.
// Délai de secours, 22 nov. 2026 : si la barre n'avance plus, 15 s
// après la dernière étape, 60 s pour le premier téléchargement
// (main.dart.js, 1,3 Mo, une connexion lente normale peut dépasser
// 15 s), un message d'erreur avec un bouton de rechargement s'affiche.
(function(){
  var texte = document.getElementById('chargement-texte');
  var barre = document.getElementById('chargement-barre');
  var conteneur = document.getElementById('chargement');
  var erreur = document.getElementById('chargement-erreur');
  var erreurTexte = document.getElementById('chargement-erreur-texte');
  var recharger = document.getElementById('chargement-recharger');
  var anglais = (navigator.language || '').toLowerCase().indexOf('en') === 0;
  var messages = anglais
    ? ['Loading…', 'Starting the engine…', 'Opening the app…']
    : ['Chargement…', 'Démarrage du moteur…', 'Ouverture de l’application…'];
  var messageErreur = anglais
    ? 'Loading is taking too long. Check your connection and try again.'
    : 'Le chargement prend trop de temps. Vérifiez votre connexion puis réessayez.';
  var etape = 0;
  var secours = null;
  function armerSecours() {
    if (secours) window.clearTimeout(secours);
    var delai = (etape === 0) ? 60000 : 15000;
    secours = window.setTimeout(afficherErreur, delai);
  }
  function afficherErreur() {
    window.clearInterval(surveille);
    if (erreurTexte) erreurTexte.textContent = messageErreur;
    if (erreur) erreur.hidden = false;
    if (conteneur) conteneur.classList.add('en-erreur');
  }
  function avancer(pourcent, message) {
    if (barre) {
      barre.style.width = pourcent + '%';
      var piste = barre.parentElement;
      if (piste) piste.setAttribute('aria-valuenow', String(pourcent));
    }
    if (texte && message != null) texte.textContent = message;
    armerSecours();
  }
  if (texte && anglais) texte.textContent = messages[0];
  if (recharger) {
    if (anglais) recharger.textContent = 'Reload';
    recharger.addEventListener('click', function(){ window.location.reload(); });
  }
  avancer(8, null);
  function ressourceFinie(suffixe) {
    if (!window.performance || !performance.getEntriesByType) return false;
    var entrees = performance.getEntriesByType('resource');
    for (var i = 0; i < entrees.length; i++) {
      if ((entrees[i].name || '').indexOf(suffixe) !== -1) return true;
    }
    return false;
  }
  var surveille = window.setInterval(function() {
    if (etape === 0 && ressourceFinie('main.dart.js')) {
      etape = 1;
      avancer(45, messages[1]);
    } else if (etape === 1 && ressourceFinie('canvaskit.wasm')) {
      etape = 2;
      avancer(75, messages[2]);
    }
  }, 250);
  window.addEventListener('flutter-first-frame', function(){
    window.clearInterval(surveille);
    avancer(100, null);
    if (secours) window.clearTimeout(secours);
    if (conteneur) { conteneur.remove(); }
  });
  // Carte 152, 22 nov. 2026 : filet de sécurité, 60 s sans
  // premier rendu. Un premier chargement à froid télécharge
  // environ 15 Mo, 30 s était trop court, il coupait un
  // chargement légitime. Un blocage ne laisse plus jamais un
  // écran figé sans explication, on propose de recharger.
  setTimeout(function(){
    var el = document.getElementById('chargement');
    if (!el) { return; }
    var anglais = (navigator.language || '').toLowerCase().indexOf('en') === 0;
    var message = anglais
      ? 'The app did not load. Check your connection, then try again.'
      : 'L\u2019application ne s\u2019est pas chargée. Vérifiez votre connexion, puis réessayez.';
    var boutonTexte = anglais ? 'Reload' : 'Recharger';
    el.innerHTML = '';
    var p = document.createElement('p');
    p.textContent = message;
    p.style.cssText = 'font-size:16px;margin:0;max-width:420px';
    var b = document.createElement('button');
    b.textContent = boutonTexte;
    b.style.cssText = 'background:#D4A72C;color:#0B1F3A;border:0;border-radius:8px;padding:12px 28px;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit';
    b.onclick = function(){ window.location.reload(); };
    el.appendChild(p);
    el.appendChild(b);
  }, 60000);
})();
