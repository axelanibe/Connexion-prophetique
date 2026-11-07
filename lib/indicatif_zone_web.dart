// Fuseau IANA sur le web, carte 87, 7 nov. 2026.
// Intl.DateTimeFormat().resolvedOptions().timeZone donne le
// fuseau de l'appareil, par exemple « Europe/Paris » en
// France, « America/Toronto » au Canada. Un fuseau IANA
// désigne une ville, donc un seul pays : Europe/Paris n'est
// qu'en France. Lu seulement ici, jamais envoyé au serveur,
// jamais stocké. Toute erreur, navigateur ancien sans Intl
// par exemple, renvoie null, et la détection retombe sur les
// langues, puis le fuseau nord-américain, puis le repli +225.
import 'dart:js_interop';
import 'dart:js_interop_unsafe';

String? fuseauIanaAppareil() {
  try {
    final intl = globalContext.getProperty('Intl'.toJS);
    if (intl == null) return null;
    final constructeur = (intl as JSObject).getProperty('DateTimeFormat'.toJS);
    if (constructeur == null) return null;
    final format = (constructeur as JSFunction).callAsConstructor<JSObject>();
    final options = format.callMethod('resolvedOptions'.toJS);
    if (options == null) return null;
    final fuseau = (options as JSObject).getProperty('timeZone'.toJS);
    if (fuseau == null) return null;
    final texte = (fuseau as JSString).toDart;
    return texte.isEmpty ? null : texte;
  } catch (_) {
    return null;
  }
}
