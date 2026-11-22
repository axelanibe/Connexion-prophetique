// Conversion d'un lien de contenu en adresse integrable dans
// l'application, 28 oct. 2026 : une video YouTube ou Vimeo s'ouvre
// dans son lecteur integre, pas dans l'application YouTube ni dans
// le navigateur. Les autres liens passent tels quels.
//
// MO-7, 22 nov. 2026 : http non chiffré interdit, l'adresse est
// remontée en https, et la liste blanche ci-dessous décide ce qui
// peut s'ouvrir dans la vue web de l'application. Un hôte hors
// liste ne s'ouvre jamais dans la WebView ni dans l'iframe : il
// part vers le navigateur externe.
const hoteWebViewAutorises = <String>{
  'www.youtube.com',
  'youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtube-nocookie.com',
  'youtube-nocookie.com',
  'vimeo.com',
  'www.vimeo.com',
  'player.vimeo.com',
  'connexionprophetique.com',
  'www.connexionprophetique.com',
  'connexion-prophetique-site.onrender.com',
  'connexion-prophetique.onrender.com',
};

/// Vrai quand l'hôte du lien est autorisé dans la vue web de
/// l'application, après conversion par embedUrl.
bool hoteWebViewAutorise(String raw) {
  final uri = Uri.tryParse(raw.trim());
  if (uri == null) return false;
  return hoteWebViewAutorises.contains(uri.host.toLowerCase());
}

String embedUrl(String raw) {
  final uri = Uri.tryParse(raw.trim());
  if (uri == null) return raw;
  // http interdit : remontée en https, jamais de page en clair
  // dans la vue web de l'application.
  final https = uri.scheme == 'http'
      ? uri.replace(scheme: 'https')
      : uri;
  final host = https.host.toLowerCase();
  String? videoId;
  if (host == 'youtu.be') {
    if (https.pathSegments.isNotEmpty) videoId = https.pathSegments.first;
    if (videoId != null && videoId.isNotEmpty) {
      return 'https://www.youtube.com/embed/$videoId';
    }
  }
  if (host == 'www.youtube.com' || host == 'youtube.com' || host == 'm.youtube.com') {
    if (https.pathSegments.isNotEmpty && (https.pathSegments.first == 'watch')) {
      videoId = https.queryParameters['v'];
    } else if (https.pathSegments.length >= 2 && (https.pathSegments.first == 'shorts' || https.pathSegments.first == 'live' || https.pathSegments.first == 'embed')) {
      videoId = https.pathSegments[1];
    }
    if (videoId != null && videoId.isNotEmpty) {
      return 'https://www.youtube.com/embed/$videoId';
    }
  }
  if (host == 'vimeo.com' || host == 'www.vimeo.com') {
    if (https.pathSegments.isNotEmpty && int.tryParse(https.pathSegments.first) != null) {
      return 'https://player.vimeo.com/video/${https.pathSegments.first}';
    }
  }
  return https.toString();
}

/// Vrai si le lien est une page ou une video, pas un fichier audio
/// direct : YouTube, Vimeo, article, page web. Un fichier audio
/// direct (.mp3 et compagnie) ou un fichier serveur /fichiers/
/// reste lu par le lecteur audio de l'application.
bool isPageLink(String raw) {
  final uri = Uri.tryParse(raw.trim());
  if (uri == null) return false;
  if (uri.scheme != 'http' && uri.scheme != 'https') return false;
  if (uri.path.contains('/fichiers/')) return false;
  final path = uri.path.toLowerCase();
  const audioExt = ['.mp3', '.m4a', '.wav', '.aac', '.ogg', '.opus', '.flac'];
  for (final ext in audioExt) {
    if (path.endsWith(ext)) return false;
  }
  return true;
}
