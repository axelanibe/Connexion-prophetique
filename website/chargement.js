(function(){
  var t = document.getElementById('chargement-texte');
  if (t && (navigator.language || '').toLowerCase().indexOf('en') === 0) { t.textContent = 'Loading…'; }
  window.addEventListener('flutter-first-frame', function(){
    var el = document.getElementById('chargement');
    if (el) { el.remove(); }
  });
  // Carte 152, 22 nov. 2026 : filet de sécurité, 30 s sans
  // premier rendu. Un blocage ne laisse plus jamais un écran
  // figé sans explication, on propose de recharger.
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
  }, 30000);
})();
