// Conversion d'un lien de contenu en adresse integrable dans
// l'application, 28 oct. 2026 : une video YouTube ou Vimeo s'ouvre
// dans son lecteur integre, pas dans l'application YouTube ni dans
// le navigateur. Les autres liens passent tels quels.
String embedUrl(String raw) {
  final uri = Uri.tryParse(raw.trim());
  if (uri == null) return raw;
  final host = uri.host.toLowerCase();
  String? videoId;
  if (host == 'youtu.be') {
    if (uri.pathSegments.isNotEmpty) videoId = uri.pathSegments.first;
    if (videoId != null && videoId.isNotEmpty) {
      return 'https://www.youtube.com/embed/$videoId';
    }
  }
  if (host == 'www.youtube.com' || host == 'youtube.com' || host == 'm.youtube.com') {
    if (uri.pathSegments.isNotEmpty && (uri.pathSegments.first == 'watch')) {
      videoId = uri.queryParameters['v'];
    } else if (uri.pathSegments.length >= 2 && (uri.pathSegments.first == 'shorts' || uri.pathSegments.first == 'live' || uri.pathSegments.first == 'embed')) {
      videoId = uri.pathSegments[1];
    }
    if (videoId != null && videoId.isNotEmpty) {
      return 'https://www.youtube.com/embed/$videoId';
    }
  }
  if (host == 'vimeo.com' || host == 'www.vimeo.com') {
    if (uri.pathSegments.isNotEmpty && int.tryParse(uri.pathSegments.first) != null) {
      return 'https://player.vimeo.com/video/${uri.pathSegments.first}';
    }
  }
  return raw;
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
