// Carte 95, 8 nov. 2026 : signature dessinée de l'administrateur.
// Carte 120, 9 nov. 2026 : la pose de la signature dans
// l'attestation HTML disparaît avec le HTML, la signature est
// posée dans le vrai PDF par le serveur. Les tests de pose HTML
// sont retirés, ceux du certificat imprimable restent.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/print_html.dart';

const _fausseSignature = 'data:image/png;base64,iVBORw0KGgo=';

void main() {
  test('le certificat porte la signature quand elle est fournie', () {
    final html = buildCertificateHtml(
      PrintCertificate(
        name: 'Test Membre',
        matricule: 'CP-AA-2526',
        campName: 'Camp Test',
        campDates: '',
        campLieu: '',
        signatureDataUrl: _fausseSignature,
      ),
    );
    expect(html, contains('<img src="$_fausseSignature"'));
    expect(html, contains('Test Membre'));
  });

  test('le certificat ne porte aucune signature quand il n’y en a pas', () {
    final html = buildCertificateHtml(
      PrintCertificate(
        name: 'Test Membre',
        matricule: 'CP-AA-2526',
        campName: 'Camp Test',
        campDates: '',
        campLieu: '',
      ),
    );
    expect(html, isNot(contains('<img')));
    expect(html, contains('Test Membre'));
  });
}
