// Carte seule, tranche carte seule, 4 nov. 2026.
// Remplace la carte 30 : la page Carte ne montre QUE le visuel
// de la carte, sans titre, sans section Cotisation, sans bouton
// Payer, sans Ajouter au portefeuille, sans Modifier mes infos,
// sans pied hors carte, sans ligne de moyens. Les modifications
// se font depuis le Profil, avec NouvelleModifierInfosPage, et
// la carte les reflete. Le visuel interne de la carte est garde :
// monogramme CP, CARTE DE MEMBRE, OFFICIEL ET VERIFIE, pastille
// Actif, photo, nom, matricule, etablissement, Membre depuis,
// QR reel et son bloc interne Scannez pour la presence.
// Exception fonctionnelle, signalee : tant que la carte n'a pas
// ete payee puis validee par la structure, sauf administrateur,
// la carte complete reste masquee, comme depuis le 27 oct. 2026,
// et un seul bouton de creation a 1 000 FCFA est affiche, sans
// explication autour, sinon la creation disparaitrait.
// Palette structure POUR CETTE PAGE, tranche palette 4 nov. 2026.
// La page Modifier mes infos, depuis le Profil, garde les couleurs
// _cn* d'avant, sans changement. Donnees reelles seulement.

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:qr_flutter/qr_flutter.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';

// Palette modele conservee pour NouvelleModifierInfosPage, depuis le Profil.
const _cnFond = Color(0xFF050811);
const _cnNuit = Color(0xFF0A0F1D);
const _cnNuit2 = Color(0xFF0F172A);
const _cnCarte = Color(0xFF1E293B);
const _cnLigne = Color(0xFF334155);
const _cnTexteDoux = Color(0xFF94A3B8);
const _cnOr = Color(0xFFD97706);
const _cnOrClair = Color(0xFFFBBF24);
const _cnVert = Color(0xFF34D399);

// Palette structure, page Carte seule seulement.
// Les constantes _cn* ci-dessus restent inchangees pour
// NouvelleModifierInfosPage, ouverte depuis le Profil.
const _carteFond = Color(0xFF0B1F3A);
const _carteNuit = Color(0xFF0B1F3A);
const _carteNuit2 = Color(0xFF0B1F3A);
const _carteCarte = Color(0xFF0B1F3A);
const _carteLigne = Color(0xFFD4A72C);
const _carteTexteDoux = Color(0xFFF5F6FA);
const _carteOr = Color(0xFFD4A72C);
const _carteOrClair = Color(0xFFD4A72C);
const _carteVert = Color(0xFF34D399);

TextStyle _cnTexte({double size = 14, FontWeight weight = FontWeight.w500, Color color = Colors.white}) =>
    GoogleFonts.plusJakartaSans(fontSize: size, fontWeight: weight, color: color);

TextStyle _cnTitre({double size = 14, FontWeight weight = FontWeight.w700, Color color = Colors.white}) =>
    GoogleFonts.cinzel(fontSize: size, fontWeight: weight, color: color);

TextStyle _carteTexte({double size = 14, FontWeight weight = FontWeight.w500, Color color = Colors.white}) =>
    GoogleFonts.plusJakartaSans(fontSize: size, fontWeight: weight, color: color);

TextStyle _carteTitre({double size = 14, FontWeight weight = FontWeight.w700, Color color = Colors.white}) =>
    GoogleFonts.cinzel(fontSize: size, fontWeight: weight, color: color);

const _cnDegradeOr = LinearGradient(
  colors: [Color(0xFFBF953F), Color(0xFFFCF6BA), Color(0xFFB38728), Color(0xFFFBF5B7), Color(0xFFAA771C)],
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
);

const _carteDegradeOr = LinearGradient(
  colors: [Color(0xFFD4A72C), Color(0xFF8A6A12), Color(0xFFD4A72C)],
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
);

class NouvelleCartePage extends StatefulWidget {
  const NouvelleCartePage({super.key});

  @override
  State<NouvelleCartePage> createState() => _NouvelleCartePageState();
}

class _NouvelleCartePageState extends State<NouvelleCartePage> {
  bool _creating = false;

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final m = app.member;
      if (m == null) {
        return Scaffold(
          backgroundColor: _carteFond,
          body: Center(
            child: FilledButton(
              style: FilledButton.styleFrom(backgroundColor: _carteOr, foregroundColor: Colors.white),
              onPressed: () => go(c, const ProfilePage()),
              child: Text(tr('Créer un compte ou se connecter')),
            ),
          ),
        );
      }
      if (!app.hasPaidCard(m.matricule) && !app.isAdmin) {
        final pendingCard = app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && !r.confirmed).toList();
        return Scaffold(
          backgroundColor: _carteFond,
          body: Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: pendingCard.isNotEmpty
                  ? OutlinedButton(
                      style: OutlinedButton.styleFrom(foregroundColor: Colors.white, side: const BorderSide(color: _carteLigne)),
                      onPressed: null,
                      child: Text(tr('Création en attente')),
                    )
                  : FilledButton(
                      style: FilledButton.styleFrom(backgroundColor: _carteOr, foregroundColor: Colors.white),
                      onPressed: _creating
                          ? null
                          : () async {
                              setState(() => _creating = true);
                              try {
                                await startPayment(c, 'carte', 1000);
                              } finally {
                                if (mounted) setState(() => _creating = false);
                              }
                            },
                      child: Text(_creating ? tr('Création…') : tr('Créer ma carte : 1 000 FCFA')),
                    ),
            ),
          ),
        );
      }
      final annee = m.anneeAffichee;
      final photo = memberPhotoProvider(m);
      return Scaffold(
        backgroundColor: _carteFond,
        body: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 420),
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Container(
                decoration: BoxDecoration(gradient: _carteDegradeOr, borderRadius: BorderRadius.circular(16)),
                padding: const EdgeInsets.all(1),
                child: Container(
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(colors: [_carteNuit2, _carteFond], begin: Alignment.topCenter, end: Alignment.bottomCenter),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  padding: const EdgeInsets.all(20),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Container(
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(color: _carteNuit, borderRadius: BorderRadius.circular(11), border: Border.all(color: _carteOrClair.withOpacity(0.5))),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.asset('assets/cp_monogram.png', fit: BoxFit.cover, filterQuality: FilterQuality.high, errorBuilder: (_, __, ___) => const Center(child: Text('CP', style: TextStyle(color: _carteOrClair, fontWeight: FontWeight.w800, fontSize: 13)))),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text('CARTE DE MEMBRE', style: _carteTitre(size: 14)),
                          const SizedBox(height: 2),
                          Text(isEn ? 'Official & Verified' : 'Officiel & Vérifié', style: _carteTexte(size: 10, weight: FontWeight.w600, color: _carteOrClair)),
                        ]),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(color: _carteVert.withOpacity(0.1), borderRadius: BorderRadius.circular(20), border: Border.all(color: _carteVert.withOpacity(0.3))),
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                          Container(width: 6, height: 6, decoration: const BoxDecoration(color: _carteVert, shape: BoxShape.circle)),
                          const SizedBox(width: 6),
                          Text(isEn ? 'Active' : 'Actif', style: _carteTexte(size: 11, weight: FontWeight.w600, color: _carteVert)),
                        ]),
                      ),
                    ]),
                    const SizedBox(height: 20),
                    Row(children: [
                      Container(
                        width: 64,
                        height: 64,
                        decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), border: Border.all(color: _carteOrClair.withOpacity(0.4))),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(11),
                          child: photo != null
                              ? Image(image: photo, fit: BoxFit.cover, filterQuality: FilterQuality.high)
                              : Container(color: _carteCarte, child: const Icon(Icons.person_outlined, color: _carteOrClair, size: 32)),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          // Carte 125, 10 nov. 2026 : le nom
                          // s'affiche en majuscules sur la carte,
                          // même pour un membre inscrit avant,
                          // dont le nom est stocké en casse mixte.
                          Text(m.name.toUpperCase(), style: _carteTexte(size: 18, weight: FontWeight.w800)),
                          const SizedBox(height: 4),
                          Text.rich(TextSpan(style: _carteTexte(size: 12, color: _carteTexteDoux), children: [
                            TextSpan(text: isEn ? 'Member number: ' : 'Matricule : '),
                            TextSpan(text: m.matricule, style: _carteTexte(size: 12, weight: FontWeight.w700, color: _carteOrClair)),
                          ])),
                          const SizedBox(height: 4),
                          Text.rich(TextSpan(style: _carteTexte(size: 11, color: _carteTexteDoux), children: [
                            if (m.etab.isNotEmpty) TextSpan(text: m.etab),
                            if (m.etab.isNotEmpty) const TextSpan(text: '  •  '),
                            TextSpan(text: isEn ? 'Member since: ' : 'Membre depuis : '),
                            TextSpan(text: '$annee', style: _carteTexte(size: 11, weight: FontWeight.w700, color: Colors.white)),
                          ])),
                        ]),
                      ),
                    ]),
                    const SizedBox(height: 20),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(color: _carteFond.withOpacity(0.9), borderRadius: BorderRadius.circular(12), border: Border.all(color: _carteLigne)),
                      child: Row(children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)),
                          child: QrImageView(data: m.matricule, size: 64, backgroundColor: Colors.white),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text(isEn ? 'Scan for attendance' : 'Scannez pour la présence', style: _carteTexte(size: 12, weight: FontWeight.w700)),
                            const SizedBox(height: 2),
                            Text(
                              isEn ? 'Show this QR code at reception during services and events.' : 'Présentez ce QR Code à l’accueil lors des assemblées et événements.',
                              style: _carteTexte(size: 11, color: _carteTexteDoux),
                            ),
                          ]),
                        ),
                      ]),
                    ),
                  ]),
                ),
              ),
            ),
          ),
        ),
      );
    });
  }
}

// Modification depuis le Profil seulement, sur ses propres
// donnees : annee d'adhesion, numero de telephone, mot de passe en
// session connectee. L'ancienne page ModifierInfosPage reste
// inchangee, avec ses champs non modifiables. L'annee cree un champ
// separe annee_adhesion, sans jamais modifier inscrit_le, qui sert
// a la carte anniversaire. Le telephone, une fois valide par le
// serveur, devient l'identifiant de connexion, la connexion serveur
// acceptant deja le telephone ou l'e-mail. Le mot de passe exige le
// mot de passe actuel, verifie par hachage argon2id cote serveur,
// plus la confirmation, jamais en clair, jamais journalise.
class NouvelleModifierInfosPage extends StatefulWidget {
  const NouvelleModifierInfosPage({super.key, required this.member});
  final Member member;

  @override
  State<NouvelleModifierInfosPage> createState() => _NouvelleModifierInfosPageState();
}

class _NouvelleModifierInfosPageState extends State<NouvelleModifierInfosPage> {
  late final TextEditingController _annee;
  late final TextEditingController _telephone;
  // Correctif carte 127, 11 nov. 2026 : le menu manquait
  // dans cette page, le pays restait « À confirmer ».
  String? _pays;
  final _actuel = TextEditingController();
  final _nouveau = TextEditingController();
  final _confirmation = TextEditingController();
  bool _saving = false;
  bool _savingMdp = false;
  String? _erreur;

  InputDecoration _dec() => InputDecoration(
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: _cnLigne)),
        enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: _cnLigne)),
        filled: true,
        fillColor: _cnNuit2,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      );

  @override
  void initState() {
    super.initState();
    _annee = TextEditingController(text: '${widget.member.anneeAffichee}');
    _telephone = TextEditingController(text: widget.member.telephone);
    _pays = app.paysResidence.isEmpty ? null : paysResidenceCanonique(app.paysResidence);
  }

  @override
  void dispose() {
    _annee.dispose();
    _telephone.dispose();
    _actuel.dispose();
    _nouveau.dispose();
    _confirmation.dispose();
    super.dispose();
  }

  Future<void> _enregistrerInfos() async {
    if (_saving) return;
    final annee = int.tryParse(_annee.text.trim());
    final tel = _telephone.text.trim();
    if (annee == null || annee < 1900 || annee > DateTime.now().year) {
      setState(() => _erreur = tr('Année d’adhésion invalide : entre 1900 et l’année en cours.'));
      return;
    }
    if (tel.isEmpty || tel.length < 6 || tel.length > 20) {
      setState(() => _erreur = tr('Numéro de téléphone invalide.'));
      return;
    }
    setState(() {
      _saving = true;
      _erreur = null;
    });
    try {
      var ok = true;
      if (annee != widget.member.anneeAffichee) ok = await api.updateAnneeAdhesion(annee) && ok;
      if (tel != widget.member.telephone) ok = await api.updateTelephone(tel) && ok;
      if (!ok) {
        if (mounted) setState(() => _erreur = tr('Enregistrement impossible : ce numéro est peut-être déjà utilisé, ou le serveur est injoignable.'));
        return;
      }
      // Pays de résidence, correctif carte 127, 11 nov. 2026 :
      // gardé en local, envoi au serveur tenté, sans jamais
      // bloquer la modification, comme dans l'ancienne page.
      final nouveauPays = _pays ?? '';
      if (nouveauPays != app.paysResidence) {
        app.setPaysResidence(nouveauPays);
        final paysSauve = await api.updatePaysResidence(nouveauPays);
        if (!paysSauve && mounted) {
          toast(context, tr('Pays de résidence gardé sur cet appareil seulement : envoi au serveur impossible, il ne suivra pas après déconnexion.'));
        }
      }
      app.updateLocalProfile(anneeAdhesion: annee, telephone: tel);
      unawaited(app.syncServerProfile());
      if (mounted) {
        toast(context, tr('Informations mises à jour.'));
        Navigator.of(context).pop();
      }
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _changerMotDePasse() async {
    if (_savingMdp) return;
    if (_nouveau.text != _confirmation.text) {
      setState(() => _erreur = tr('La confirmation ne correspond pas au nouveau mot de passe.'));
      return;
    }
    if (_nouveau.text.length < 8 || _nouveau.text.length > 128) {
      setState(() => _erreur = tr('Le nouveau mot de passe doit compter entre 8 et 128 caractères.'));
      return;
    }
    setState(() {
      _savingMdp = true;
      _erreur = null;
    });
    try {
      final ok = await api.changeMotDePasseConnecte(_actuel.text, _nouveau.text, _confirmation.text);
      if (!ok) {
        if (mounted) setState(() => _erreur = tr('Mot de passe non modifié : vérifiez votre mot de passe actuel, puis réessayez.'));
        return;
      }
      if (mounted) {
        toast(context, tr('Mot de passe modifié.'));
        _actuel.clear();
        _nouveau.clear();
        _confirmation.clear();
      }
    } finally {
      if (mounted) setState(() => _savingMdp = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.member;
    return Scaffold(
      backgroundColor: _cnFond,
      appBar: AppBar(backgroundColor: _cnNuit, foregroundColor: Colors.white, title: Text(tr('Modifier mes infos'), style: _cnTitre(size: 13))),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 420),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(m.name, style: _cnTexte(size: 16, weight: FontWeight.w800)),
              const SizedBox(height: 4),
              Text(m.matricule, style: _cnTexte(size: 12, color: _cnOrClair, weight: FontWeight.w700)),
              const SizedBox(height: 24),
              Text(tr('Année d’adhésion'), style: _cnTexte(weight: FontWeight.w700)),
              const SizedBox(height: 8),
              TextField(controller: _annee, keyboardType: TextInputType.number, style: _cnTexte(), decoration: _dec()),
              const SizedBox(height: 8),
              Text(tr('Elle s’affiche dans « Membre depuis » sur votre carte, sans changer votre date d’inscription.'), style: _cnTexte(size: 12, color: _cnTexteDoux)),
              const SizedBox(height: 20),
              Text(tr('Numéro de téléphone'), style: _cnTexte(weight: FontWeight.w700)),
              const SizedBox(height: 8),
              TextField(controller: _telephone, keyboardType: TextInputType.phone, style: _cnTexte(), decoration: _dec()),
              const SizedBox(height: 8),
              Text(tr('Ce numéro devient votre identifiant de connexion, avec votre matricule. Il doit être unique.'), style: _cnTexte(size: 12, color: _cnTexteDoux)),
              const SizedBox(height: 20),
              Text(tr('Pays de résidence'), style: _cnTexte(weight: FontWeight.w700)),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                value: _pays,
                items: [
                  for (final p in kPaysResidence) DropdownMenuItem(value: p, child: Text(p, style: _cnTexte())),
                  // Correctif carte 127 : la valeur actuelle est
                  // gardée même si elle n'est plus dans la liste,
                  // comme dans l'ancienne page, carte 127.
                  if (_pays != null && _pays!.isNotEmpty && !kPaysResidence.contains(_pays)) DropdownMenuItem(value: _pays, child: Text(_pays!, style: _cnTexte())),
                ],
                onChanged: (v) => setState(() => _pays = v),
                decoration: _dec(),
                dropdownColor: _cnNuit2,
                style: _cnTexte(),
                icon: const Icon(Icons.unfold_more_outlined, color: Colors.white),
              ),
              const SizedBox(height: 8),
              Text(tr('Les offres d’emploi et de formation s’afficheront selon ce pays, avec un filtre Tous les pays pour voir les autres.'), style: _cnTexte(size: 12, color: _cnTexteDoux)),
              const SizedBox(height: 20),
              if (_erreur != null) ...[
                Text(_erreur!, style: _cnTexte(size: 13, color: Colors.red.shade300)),
                const SizedBox(height: 16),
              ],
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton(
                  style: FilledButton.styleFrom(backgroundColor: _cnOr, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                  onPressed: _saving ? null : _enregistrerInfos,
                  child: Text(_saving ? tr('Enregistrement…') : tr('Enregistrer'), style: _cnTexte(weight: FontWeight.w800)),
                ),
              ),
              const SizedBox(height: 32),
              Text(tr('Mot de passe'), style: _cnTexte(weight: FontWeight.w700)),
              const SizedBox(height: 8),
              TextField(controller: _actuel, obscureText: true, style: _cnTexte(), decoration: _dec().copyWith(hintText: tr('Mot de passe actuel'), hintStyle: _cnTexte(color: _cnTexteDoux))),
              const SizedBox(height: 12),
              TextField(controller: _nouveau, obscureText: true, style: _cnTexte(), decoration: _dec().copyWith(hintText: tr('Nouveau mot de passe'), hintStyle: _cnTexte(color: _cnTexteDoux))),
              const SizedBox(height: 12),
              TextField(controller: _confirmation, obscureText: true, style: _cnTexte(), decoration: _dec().copyWith(hintText: tr('Confirmer le nouveau mot de passe'), hintStyle: _cnTexte(color: _cnTexteDoux))),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(foregroundColor: Colors.white, side: const BorderSide(color: _cnLigne), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                  onPressed: _savingMdp ? null : _changerMotDePasse,
                  child: Text(_savingMdp ? tr('Enregistrement…') : tr('Changer mon mot de passe'), style: _cnTexte(weight: FontWeight.w700)),
                ),
              ),
            ]),
          ),
        ),
      ),
    );
  }
}
