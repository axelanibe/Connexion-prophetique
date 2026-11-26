// Nouvel Assistant, tranche T5, 26 nov. 2026.
// Contrat de l'Assistant : tout est local, sauf la demande de
// prière privée, transmise par la route existante POST /prieres,
// qui envoie l'e-mail à la structure sans rien conserver.
import '../api.dart';

abstract class ServiceAssistant {
  /// Envoie le sujet de prière à la structure, par e-mail.
  Future<void> envoyerSujetPriere(String sujet);
}

class ServiceAssistantApi implements ServiceAssistant {
  ServiceAssistantApi(this._api);
  final ApiClient _api;

  @override
  Future<void> envoyerSujetPriere(String sujet) async {
    await _api.envoyerSujetPriere(sujet);
  }
}
