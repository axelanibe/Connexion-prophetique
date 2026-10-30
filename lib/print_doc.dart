// Ouverture et téléchargement d'un document, 30 oct. 2026 : sur le
// web, le document s'ouvre dans un nouvel onglet pour impression ;
// sur téléphone, il passe par Téléchargements et le partage, comme
// les exports existants. Même nom de fonctions des deux côtés.
export 'print_doc_mobile.dart' if (dart.library.html) 'print_doc_web.dart';
