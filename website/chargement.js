(function(){
  var t = document.getElementById('chargement-texte');
  if (t && (navigator.language || '').toLowerCase().indexOf('en') === 0) { t.textContent = 'Loading…'; }
  window.addEventListener('flutter-first-frame', function(){
    var el = document.getElementById('chargement');
    if (el) { el.remove(); }
  });
})();
