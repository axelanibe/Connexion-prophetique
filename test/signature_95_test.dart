// Carte 95, 8 nov. 2026 : signature dessinée de l'administrateur.
// La pose de la signature dans les documents est une transformation
// de texte pure, elle se teste sans téléphone et sans serveur.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/print_html.dart';
import 'package:connexion_prophetique/signature_admin.dart';

const _fausseSignature = 'data:image/png;base64,iVBORw0KGgo=';

void main() {
  test('la ligne vide de l’attestation est remplacée par la signature', () {
    const gabarit =
        '<div class="text-center w-56"><div class="h-14 w-full border-b border-slate-800"></div>'
        '<p>Signature manuscrite du signataire</p></div>';
    final signe = insererSignatureAttestation(gabarit, _fausseSignature);
    expect(signe, contains('<img src="$_fausseSignature"'));
    expect(signe, isNot(contains(ligneVideAttestation)));
    expect(signe, contains('Signature manuscrite du signataire'));
  });

  test('sans signature, le HTML de l’attestation reste tel quel', () {
    const gabarit = '<div class="h-14 w-full border-b border-slate-800"></div>';
    expect(insererSignatureAttestation(gabarit, null), gabarit);
    expect(insererSignatureAttestation(gabarit, ''), gabarit);
  });

  test('sans la ligne vide, le HTML n’est pas touché', () {
    const html = '<p>Aucune ligne de signature ici.</p>';
    expect(insererSignatureAttestation(html, _fausseSignature), html);
  });

  test('la ligne vide visée est bien celle du gabarit du serveur', () {
    // Copie exacte de la ligne du fichier
    // server-production/src/attestation.html, sans le commentaire.
    const ligneServeur = '<div class="h-14 w-full border-b border-slate-800"></div>';
    expect(ligneServeur, ligneVideAttestation);
  });

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
