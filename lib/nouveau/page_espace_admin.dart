// Pages de l'Espace Structure, tranche T18, 27 nov. 2026.
// Lot 1 et lot 2 ensemble. Chaque page est une vraie page dans
// la coquille de l'application. Le vote et la validation passent
// par le serveur, jamais en local. Le scanner de marquage des
// espèces et l'impression HTML des badges ne sont pas
// reconstruits dans cette tranche.
import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

import '../notif_settings.dart';
import '../print_doc.dart';
import '../push_notifications.dart';
import 'modeles_profil.dart';
import 'modeles_t14.dart';
import 'modeles_t18.dart';
import 'modeles_t9.dart';
import 'page_chronogramme.dart';
import 'page_scanner_presence.dart';
import 'palette.dart';
import 'service_t14.dart';
import 'service_t18.dart';

void _message(BuildContext context, String texte) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(texte)),
  );
}

Future<bool> _confirmer(
  BuildContext context,
  String titre,
  String texte,
) async {
  final ok = await showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(titre),
      content: Text(texte),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(false),
          child: const Text('Annuler'),
        ),
        FilledButton(
          onPressed: () => Navigator.of(context).pop(true),
          child: const Text('Confirmer'),
        ),
      ],
    ),
  );
  return ok == true;
}

/// Page admin dans la coquille : barre de titre, fond papier.
class PageAdmin extends StatelessWidget {
  const PageAdmin({required this.titre, required this.enfant});
  final String titre;
  final Widget enfant;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      // Correction de suivi, 27 nov. 2026 : le thème met le
      // titre en blanc, foregroundColor ne le change pas, il
      // faut un style explicite bleu nuit sur le titre.
      appBar: AppBar(
        title: Text(
          titre,
          style: const TextStyle(color: PaletteNouvelle.bleuNuit),
        ),
        backgroundColor: Colors.white,
        foregroundColor: PaletteNouvelle.bleuNuit,
      ),
      body: enfant,
    );
  }
}

class _Ligne extends StatelessWidget {
  const _Ligne({
    required this.titre,
    this.sousTitre,
    this.trailing,
    this.onTap,
  });
  final String titre;
  final String? sousTitre;
  final Widget? trailing;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        title: Text(
          titre,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle:
            sousTitre == null || sousTitre!.isEmpty ? null : Text(sousTitre!),
        trailing: trailing,
        onTap: onTap,
      ),
    );
  }
}

class _Vide extends StatelessWidget {
  const _Vide(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Text(
        texte,
        style: const TextStyle(fontSize: 14, color: Colors.black54),
      ),
    );
  }
}

class _TitreBloc extends StatelessWidget {
  const _TitreBloc(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20, bottom: 8),
      child: Row(
        children: [
          Container(
            width: 18,
            height: 4,
            decoration: BoxDecoration(
              color: PaletteNouvelle.or,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 8),
          Text(
            texte,
            style: const TextStyle(
              fontFamily: 'Cinzel',
              fontSize: 17,
              fontWeight: FontWeight.w700,
              color: PaletteNouvelle.bleuNuit,
            ),
          ),
        ],
      ),
    );
  }
}

/// Choix d'un membre par matricule ou nom, dans les formulaires
/// administrateurs.
Future<MembreAdmin?> _choisirMembre(
  BuildContext context,
  ServiceT18 service,
) async {
  final recherche = TextEditingController();
  MembreAdmin? choix;
  await showDialog<void>(
    context: context,
    builder: (context) => StatefulBuilder(
      builder: (context, setEtat) => AlertDialog(
        title: const Text('Choisir un membre'),
        content: SizedBox(
          width: double.maxFinite,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: recherche,
                autofocus: true,
                decoration: const InputDecoration(
                  labelText: 'Matricule ou nom',
                  prefixIcon: Icon(Icons.search),
                ),
                onChanged: (_) => setEtat(() {}),
              ),
              const SizedBox(height: 8),
              Flexible(
                child: ListView(
                  shrinkWrap: true,
                  children: [
                    for (final m in service.membresAdmin.where((m) {
                      final q = recherche.text.trim().toLowerCase();
                      if (q.isEmpty) return true;
                      return m.matricule.toLowerCase().contains(q) ||
                          m.nomComplet.toLowerCase().contains(q);
                    }).take(20))
                      ListTile(
                        title: Text(m.nomComplet),
                        subtitle: Text(m.matricule),
                        onTap: () {
                          choix = m;
                          Navigator.of(context).pop();
                        },
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Annuler'),
          ),
        ],
      ),
    ),
  );
  return choix;
}

/// Personne choisie dans un formulaire administrateur : membre
/// de l'application ou personne hors système.
class PersonneChoisie {
  const PersonneChoisie({
    required this.id,
    required this.nom,
    required this.externe,
    this.estNouvelle = false,
  });
  final String id;
  final String nom;
  final bool externe;
  final bool estNouvelle;
}

/// Choix d'une personne par nom : d'abord les membres, puis les
/// personnes hors système, avec un bouton pour créer une nouvelle
/// fiche hors système. `avecRole` ajoute le choix du rôle admin
/// dans le formulaire de création, pour la page Administrateurs.
Future<PersonneChoisie?> _choisirPersonne(
  BuildContext context,
  ServiceT18 service, {
  bool avecRole = false,
}) async {
  await service.chargerPersonnesExternes();
  await service.chargerMembresAdmin();
  final recherche = TextEditingController();
  PersonneChoisie? choix;
  await showDialog<void>(
    context: context,
    builder: (context) => StatefulBuilder(
      builder: (context, setEtat) => AlertDialog(
        title: const Text('Choisir une personne'),
        content: SizedBox(
          width: double.maxFinite,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: recherche,
                autofocus: true,
                decoration: const InputDecoration(
                  labelText: 'Nom ou matricule',
                  prefixIcon: Icon(Icons.search),
                ),
                onChanged: (_) => setEtat(() {}),
              ),
              const SizedBox(height: 8),
              Flexible(
                child: ListView(
                  shrinkWrap: true,
                  children: [
                    for (final m in service.membresAdmin.where((m) {
                      final q = recherche.text.trim().toLowerCase();
                      if (q.isEmpty) return true;
                      return m.matricule.toLowerCase().contains(q) ||
                          m.nomComplet.toLowerCase().contains(q);
                    }).take(20))
                      ListTile(
                        title: Text(m.nomComplet),
                        subtitle: Text(m.matricule),
                        onTap: () {
                          choix = PersonneChoisie(
                            id: m.id,
                            nom: m.nomComplet,
                            externe: false,
                          );
                          Navigator.of(context).pop();
                        },
                      ),
                    for (final p in service.personnesExternes.where((p) {
                      final q = recherche.text.trim().toLowerCase();
                      if (q.isEmpty) return true;
                      return p.nomComplet.toLowerCase().contains(q) ||
                          p.fonction.toLowerCase().contains(q) ||
                          p.contact.toLowerCase().contains(q);
                    }).take(20))
                      ListTile(
                        title: Text(p.nomComplet),
                        subtitle: Text(
                          [p.fonction, 'Hors système']
                              .where((e) => e.isNotEmpty)
                              .join(' · '),
                        ),
                        onTap: () {
                          choix = PersonneChoisie(
                            id: p.id,
                            nom: p.nomComplet,
                            externe: true,
                          );
                          Navigator.of(context).pop();
                        },
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () async {
              final creee = await _creerPersonneExterne(
                context,
                service,
                avecRole: avecRole,
              );
              if (creee != null) {
                choix = PersonneChoisie(
                  id: creee.id,
                  nom: creee.nomComplet,
                  externe: true,
                  estNouvelle: true,
                );
                if (context.mounted) Navigator.of(context).pop();
              }
            },
            child: const Text('Nouvelle personne'),
          ),
        ],
      ),
    ),
  );
  return choix;
}

/// Formulaire pro d'une fiche personne hors système : nom,
/// fonction, contact, établissement. `avecRole` ajoute le rôle
/// admin désigné, pour la page Administrateurs.
Future<PersonneExterne?> _creerPersonneExterne(
  BuildContext context,
  ServiceT18 service, {
  bool avecRole = false,
}) async {
  final nom = TextEditingController();
  final fonction = TextEditingController();
  final contact = TextEditingController();
  String? etablissementId;
  String role = 'admin_etablissement';
  final ok = await showDialog<bool>(
    context: context,
    builder: (context) => StatefulBuilder(
      builder: (context, setEtat) => AlertDialog(
        title: const Text('Nouvelle personne hors système'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: nom,
                autofocus: true,
                decoration: const InputDecoration(
                  labelText: 'Nom complet',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: fonction,
                decoration: const InputDecoration(
                  labelText: 'Fonction (facultatif)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: contact,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  labelText: 'Contact (facultatif)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 8),
              DropdownButtonFormField<String?>(
                value: etablissementId,
                isExpanded: true,
                decoration: const InputDecoration(
                  labelText: 'Établissement (facultatif)',
                  border: OutlineInputBorder(),
                ),
                items: [
                  const DropdownMenuItem(
                    value: null,
                    child: Text('Structure'),
                  ),
                  for (final e in service.etablissements)
                    DropdownMenuItem(value: e.id, child: Text(e.nom)),
                ],
                onChanged: (v) => setEtat(() => etablissementId = v),
              ),
              if (avecRole) ...[
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: role,
                  isExpanded: true,
                  decoration: const InputDecoration(
                    labelText: 'Rôle',
                    border: OutlineInputBorder(),
                  ),
                  items: const [
                    DropdownMenuItem(
                      value: 'admin_etablissement',
                      child: Text('Administrateur d’établissement'),
                    ),
                    DropdownMenuItem(
                      value: 'admin_general',
                      child: Text('Administrateur général'),
                    ),
                  ],
                  onChanged: (v) => setEtat(() => role = v ?? role),
                ),
              ],
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Créer'),
          ),
        ],
      ),
    ),
  );
  if (ok != true) return null;
  if (nom.text.trim().isEmpty) {
    _message(context, 'Le nom est obligatoire.');
    return null;
  }
  if (avecRole && role == 'admin_etablissement' && etablissementId == null) {
    _message(context, 'Choisissez un établissement.');
    return null;
  }
  final creee = await service.creerPersonneExterne({
    'nom_complet': nom.text.trim(),
    if (fonction.text.trim().isNotEmpty) 'fonction': fonction.text.trim(),
    if (contact.text.trim().isNotEmpty) 'contact': contact.text.trim(),
    if (etablissementId != null) 'etablissement_id': etablissementId,
    if (avecRole) 'role_admin': role,
  });
  if (creee == null && context.mounted) {
    _message(context, 'Création impossible.');
  }
  return creee;
}

/// Choix d'une date, affichée ensuite au format jour/mois/année.
Future<DateTime?> _choisirDate(
  BuildContext context,
  DateTime initial,
) =>
    showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(2019),
      lastDate: DateTime(2100),
    );

// ------------------------------------------------------------------
// Lot 1
// ------------------------------------------------------------------

/// 1. Comptabilité complète.
class PageComptabiliteAdmin extends StatefulWidget {
  const PageComptabiliteAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageComptabiliteAdmin> createState() => _PageComptabiliteAdminState();
}

class _PageComptabiliteAdminState extends State<PageComptabiliteAdmin> {
  var _charge = false;
  String? _filtreStatut;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    // Correction de suivi, 27 nov. 2026 : la lecture groupée
    // apporte le Flux financier, les chiffres vivent seulement
    // dans l'Espace structure.
    await widget.service.chargerTableauDeBord();
    await widget.service.chargerPaiementsEnAttente();
    await widget.service.chargerTotauxPaiements();
    await widget.service.chargerPaiementsTous(statut: _filtreStatut);
    if (mounted) setState(() => _charge = true);
  }

  /// Flux financier du mois, correction de suivi 27 nov. 2026 :
  /// les chiffres ne vivent plus ici, seulement dans l'Espace
  /// structure. Vert pour les entrées, rouge pour les dépenses,
  /// par établissement.
  List<Widget> _fluxFinancier(
    ServiceT18 service,
    ComptabiliteAdmin? compta,
  ) {
    final enfants = <Widget>[];
    if (compta != null) {
      final totaux = compta.totaux;
      final entrees = (totaux['entrees'] as num?)?.toInt() ?? 0;
      final depenses = (totaux['depenses'] as num?)?.toInt() ?? 0;
      final solde = (totaux['solde'] as num?)?.toInt() ?? 0;
      final max = entrees > depenses ? entrees : depenses;
      enfants.add(const _TitreBloc('Flux financier'));
      enfants.add(
        _BarreFlux(
          libelle: 'Entrées',
          montant: entrees,
          max: max,
          couleur: const Color(0xFF15803D),
        ),
      );
      enfants.add(
        _BarreFlux(
          libelle: 'Dépenses',
          montant: depenses,
          max: max,
          couleur: const Color(0xFFB91C1C),
        ),
      );
      enfants.add(
        _Ligne(titre: 'Solde', sousTitre: formaterFcfa(solde)),
      );
      final parEtab = <String, (int, int)>{};
      for (final ligne in compta.lignes) {
        final nom = (ligne['etablissement'] ?? '').toString().trim();
        final cle = nom.isEmpty ? 'Structure' : nom;
        final montant = (ligne['montant_fcfa'] as num?)?.toInt() ?? 0;
        final (e, d) = parEtab[cle] ?? (0, 0);
        parEtab[cle] = ligne['categorie'] == 'depense'
            ? (e, d + montant)
            : (e + montant, d);
      }
      if (parEtab.length > 1) {
        enfants.add(const _TitreBloc('Par établissement'));
        for (final entree in parEtab.entries) {
          enfants.add(
            _Ligne(
              titre: entree.key,
              sousTitre:
                  'Entrées ${formaterFcfa(entree.value.$1)} · Dépenses ${formaterFcfa(entree.value.$2)}',
            ),
          );
        }
      }
    }
    return enfants;
  }

  Future<void> _valider(PaiementAdmin p) async {
    final reference = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Valider ce paiement'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${p.libelle} · ${formaterFcfa(p.montantFcfa)}'
              '${p.nomMembre.isNotEmpty ? ' · ${p.nomMembre}' : ''}',
            ),
            const SizedBox(height: 12),
            TextField(
              controller: reference,
              decoration: const InputDecoration(
                labelText: 'Référence Wave (facultatif)',
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'La facture est émise par le serveur après validation.',
              style: TextStyle(fontSize: 13, color: Colors.black54),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Valider'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    final valide = await widget.service.validerPaiement(
      p.id,
      waveTransactionId:
          reference.text.trim().isEmpty ? null : reference.text.trim(),
    );
    if (!mounted) return;
    _message(
      context,
      valide ? 'Paiement validé.' : 'Validation impossible.',
    );
    if (valide) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    final compta = service.comptabilite;
    final totaux = service.totauxPaiements;
    return PageAdmin(
      titre: 'Comptabilité',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _charger,
              child: ListView(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
                children: [
                  ..._fluxFinancier(service, compta),
                  const _TitreBloc('À valider'),
                  if (service.paiementsEnAttente.isEmpty)
                    const _Vide('Aucun paiement en attente.')
                  else
                    for (final p in service.paiementsEnAttente)
                      _Ligne(
                        titre: '${p.libelle} · ${formaterFcfa(p.montantFcfa)}',
                        sousTitre: [
                          if (p.nomMembre.isNotEmpty) p.nomMembre,
                          if (p.matricule.isNotEmpty) p.matricule,
                          if (p.moyen.isNotEmpty) p.moyen,
                          if (p.creeLe != null) afficherDate(p.creeLe!),
                        ].join(' · '),
                        trailing: FilledButton(
                          onPressed: () => _valider(p),
                          child: const Text('Valider'),
                        ),
                      ),
                  const _TitreBloc('Totaux'),
                  _Ligne(
                    titre: 'Confirmé',
                    sousTitre: formaterFcfa(
                      (totaux['total_confirme'] as num?)?.toInt() ?? 0,
                    ),
                  ),
                  _Ligne(
                    titre: 'En attente',
                    sousTitre: formaterFcfa(
                      (totaux['total_en_attente'] as num?)?.toInt() ?? 0,
                    ),
                  ),
                  if (compta != null) ...[
                    const _TitreBloc('Cotisations du mois'),
                    if (compta.parCategorie.isEmpty)
                      const _Vide('Aucune ligne ce mois-ci.')
                    else
                      for (final (categorie, montant) in compta.parCategorie)
                        _Ligne(
                          titre: categorie,
                          sousTitre: formaterFcfa(montant),
                        ),
                  ],
                  const _TitreBloc('Historique'),
                  Wrap(
                    spacing: 8,
                    children: [
                      for (final (valeur, libelle) in [
                        (null, 'Tous'),
                        ('en_attente', 'En attente'),
                        ('confirme', 'Confirmés'),
                        ('refuse', 'Refusés'),
                      ])
                        ChoiceChip(
                          label: Text(libelle),
                          selected: _filtreStatut == valeur,
                          onSelected: (_) {
                            _filtreStatut = valeur;
                            _charger();
                          },
                        ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  if (service.paiementsTous.isEmpty)
                    const _Vide('Aucun paiement dans cet état.')
                  else
                    for (final p in service.paiementsTous)
                      _Ligne(
                        titre: '${p.libelle} · ${formaterFcfa(p.montantFcfa)}',
                        sousTitre: [
                          p.libelleStatut,
                          if (p.nomMembre.isNotEmpty) p.nomMembre,
                          if (p.reference.isNotEmpty) p.reference,
                        ].join(' · '),
                      ),
                  const SizedBox(height: 16),
                  FilledButton.icon(
                    onPressed: () => Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => PageScannerPresence(service: service),
                      ),
                    ),
                    icon: const Icon(Icons.qr_code_scanner_outlined),
                    label: const Text('Scanner un QR'),
                  ),
                ],
              ),
            ),
    );
  }
}

/// Détail des cotisations et paiements, correction de suivi
/// 27 nov. 2026 : la carte Cotisations du tableau de bord
/// ouvre ce vrai détail, au lieu de filtrer l'historique
/// sur place.
class PageDetailCotisationsAdmin extends StatefulWidget {
  const PageDetailCotisationsAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageDetailCotisationsAdmin> createState() =>
      _PageDetailCotisationsAdminState();
}

class _PageDetailCotisationsAdminState
    extends State<PageDetailCotisationsAdmin> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerPaiementsCotisations();
    if (mounted) setState(() => _charge = true);
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    final totaux = service.totauxCotisations;
    return PageAdmin(
      titre: 'Cotisations',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _charger,
              child: ListView(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
                children: [
                  const _TitreBloc('Totaux'),
                  _Ligne(
                    titre: 'Confirmé',
                    sousTitre: formaterFcfa(
                      (totaux['total_confirme'] as num?)?.toInt() ?? 0,
                    ),
                  ),
                  _Ligne(
                    titre: 'En attente',
                    sousTitre: formaterFcfa(
                      (totaux['total_en_attente'] as num?)?.toInt() ?? 0,
                    ),
                  ),
                  const _TitreBloc('Paiements'),
                  if (service.paiementsCotisations.isEmpty)
                    const _Vide('Aucune cotisation.')
                  else
                    for (final p in service.paiementsCotisations)
                      _Ligne(
                        titre:
                            '${p.libelle} · ${formaterFcfa(p.montantFcfa)}',
                        sousTitre: [
                          p.libelleStatut,
                          if (p.nomMembre.isNotEmpty) p.nomMembre,
                          if (p.matricule.isNotEmpty) p.matricule,
                          if (p.creeLe != null) afficherDate(p.creeLe!),
                        ].join(' · '),
                      ),
                ],
              ),
            ),
    );
  }
}

/// Grille des 6 chiffres du tableau de bord, chaque carte
/// s'ouvre au toucher sur le détail rattaché.
class GrilleChiffresAdmin extends StatelessWidget {
  const GrilleChiffresAdmin({required this.chiffres, required this.onOuvrir});
  final List<ChiffreAdmin> chiffres;
  final void Function(int index) onOuvrir;

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 8,
        crossAxisSpacing: 8,
        childAspectRatio: 1.8,
      ),
      itemCount: chiffres.length,
      itemBuilder: (context, index) {
        final c = chiffres[index];
        return Card(
          color: Colors.white,
          margin: EdgeInsets.zero,
          child: InkWell(
            onTap: () => onOuvrir(index),
            borderRadius: BorderRadius.circular(12),
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    c.valeur,
                    style: const TextStyle(
                      fontFamily: 'Cinzel',
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      color: PaletteNouvelle.bleuNuit,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    c.libelle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: Colors.black54,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

/// Barre du flux financier : libellé, montant en couleur,
/// barre proportionnelle au plus grand des deux.
class _BarreFlux extends StatelessWidget {
  const _BarreFlux({
    required this.libelle,
    required this.montant,
    required this.max,
    required this.couleur,
  });
  final String libelle;
  final int montant;
  final int max;
  final Color couleur;

  @override
  Widget build(BuildContext context) {
    final ratio = max <= 0 ? 0.0 : montant / max;
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                libelle,
                style: const TextStyle(fontWeight: FontWeight.w600),
              ),
              Text(
                formaterFcfa(montant),
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  color: couleur,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: ratio,
              minHeight: 8,
              backgroundColor: Colors.black12,
              valueColor: AlwaysStoppedAnimation(couleur),
            ),
          ),
        ],
      ),
    );
  }
}

/// 2. Publier une actualité, un seul outil, correction de
/// suivi 27 nov. 2026 : texte, audio ou vidéo selon le choix,
/// établissement, programmation. L'audio revient, il existait
/// dans la version précédente.
class PagePublierActualite extends StatefulWidget {
  const PagePublierActualite({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PagePublierActualite> createState() => _PagePublierActualiteState();
}

class _PagePublierActualiteState extends State<PagePublierActualite> {
  final _titre = TextEditingController();
  final _texte = TextEditingController();
  final _lien = TextEditingController();
  String _mode = 'texte';
  String? _etablissementId;
  DateTime? _programmeeLe;
  List<int>? _audioOctets;
  String? _audioNom;
  var _enCours = false;

  @override
  void initState() {
    super.initState();
    widget.service.chargerEtablissements();
  }

  @override
  void dispose() {
    _titre.dispose();
    _texte.dispose();
    _lien.dispose();
    super.dispose();
  }

  Future<void> _choisirAudio() async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: const ['mp3', 'm4a', 'wav', 'aac', 'ogg'],
      withData: true,
    );
    if (result == null || result.files.isEmpty || !mounted) return;
    final fichier = result.files.single;
    final octets = fichier.bytes;
    if (octets == null || octets.isEmpty) {
      _message(context, 'Impossible de lire ce fichier.');
      return;
    }
    setState(() {
      _audioOctets = octets;
      _audioNom = fichier.name;
    });
  }

  Future<void> _publier() async {
    if (_titre.text.trim().isEmpty) {
      _message(context, 'Le titre est obligatoire.');
      return;
    }
    if (_mode == 'texte' && _texte.text.trim().isEmpty) {
      _message(context, 'Le texte est obligatoire.');
      return;
    }
    if (_mode == 'audio' &&
        _audioOctets == null &&
        _lien.text.trim().isEmpty) {
      _message(context, 'Choisis un fichier audio ou un lien.');
      return;
    }
    if (_mode == 'video' && _lien.text.trim().isEmpty) {
      _message(context, 'Le lien de la vidéo est obligatoire.');
      return;
    }
    setState(() => _enCours = true);
    var ok = false;
    if (_mode == 'texte') {
      ok = await widget.service.publierActualite(
        titre: _titre.text.trim(),
        texte: _texte.text.trim(),
        etablissementId: _etablissementId,
        programmeeLe: _programmeeLe,
      );
    } else if (_mode == 'audio') {
      String? audioId;
      if (_audioOctets != null) {
        audioId = await widget.service.televerserAudio(
          _audioOctets!,
          _audioNom ?? 'annonce-audio',
        );
        if (audioId == null) {
          if (mounted) {
            setState(() => _enCours = false);
            _message(context, 'Téléversement de l’audio impossible.');
          }
          return;
        }
      }
      ok = await widget.service.publierAnnonceAudio(
        titre: _titre.text.trim(),
        texte: _texte.text.trim().isEmpty ? null : _texte.text.trim(),
        audioId: audioId,
        lienAudio:
            _lien.text.trim().isEmpty ? null : _lien.text.trim(),
        etablissementId: _etablissementId,
        programmeeLe: _programmeeLe,
      );
    } else {
      ok = await widget.service.publierCarteVideo(
        titre: _titre.text.trim(),
        explication:
            _texte.text.trim().isEmpty ? null : _texte.text.trim(),
        lienVideo: _lien.text.trim(),
        etablissementId: _etablissementId,
        programmeeLe: _programmeeLe,
      );
    }
    if (!mounted) return;
    setState(() => _enCours = false);
    _message(
      context,
      ok ? 'Actualité publiée.' : 'Publication impossible.',
    );
    if (ok) Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return PageAdmin(
      titre: 'Publier une actualité',
      enfant: ListView(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
        children: [
          SegmentedButton<String>(
            segments: const [
              ButtonSegment(value: 'texte', label: Text('Texte')),
              ButtonSegment(value: 'audio', label: Text('Audio')),
              ButtonSegment(value: 'video', label: Text('Vidéo')),
            ],
            selected: {_mode},
            onSelectionChanged: (v) => setState(() {
              _mode = v.first;
            }),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _titre,
            decoration: const InputDecoration(
              labelText: 'Titre',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _texte,
            maxLines: _mode == 'video' ? 3 : 6,
            decoration: InputDecoration(
              labelText: _mode == 'video'
                  ? 'Explication (facultatif)'
                  : _mode == 'audio'
                      ? 'Texte (facultatif)'
                      : 'Texte',
              border: const OutlineInputBorder(),
            ),
          ),
          if (_mode == 'audio') ...[
            const SizedBox(height: 12),
            OutlinedButton.icon(
              onPressed: _choisirAudio,
              icon: const Icon(Icons.audio_file_outlined),
              label: Text(
                _audioNom ?? 'Choisir un fichier audio',
              ),
            ),
            if (_audioNom != null)
              TextButton(
                onPressed: () => setState(() {
                  _audioOctets = null;
                  _audioNom = null;
                }),
                child: const Text('Retirer le fichier'),
              ),
            const SizedBox(height: 12),
            TextField(
              controller: _lien,
              decoration: const InputDecoration(
                labelText: 'Lien audio (facultatif, sans fichier)',
                border: OutlineInputBorder(),
              ),
            ),
          ],
          if (_mode == 'video') ...[
            const SizedBox(height: 12),
            TextField(
              controller: _lien,
              decoration: const InputDecoration(
                labelText: 'Lien de la vidéo',
                border: OutlineInputBorder(),
              ),
            ),
          ],
          const SizedBox(height: 12),
          DropdownButtonFormField<String?>(
            value: _etablissementId,
            decoration: const InputDecoration(
              labelText: 'Établissement (facultatif)',
              border: OutlineInputBorder(),
            ),
            items: [
              const DropdownMenuItem(value: null, child: Text('Structure')),
              for (final e in widget.service.etablissements)
                DropdownMenuItem(value: e.id, child: Text(e.nom)),
            ],
            onChanged: (v) => setState(() => _etablissementId = v),
          ),
          const SizedBox(height: 12),
          ListTile(
            contentPadding: EdgeInsets.zero,
            title: const Text('Programmation'),
            subtitle: Text(
              _programmeeLe == null
                  ? 'Publication immédiate'
                  : 'Programmée pour le ${afficherDate(_programmeeLe!)}',
            ),
            trailing: _programmeeLe == null
                ? TextButton(
                    onPressed: () async {
                      final d = await _choisirDate(
                        context,
                        DateTime.now(),
                      );
                      if (d != null) {
                        setState(() => _programmeeLe = d);
                      }
                    },
                    child: const Text('Programmer'),
                  )
                : TextButton(
                    onPressed: () => setState(() => _programmeeLe = null),
                    child: const Text('Retirer'),
                  ),
          ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: _enCours ? null : _publier,
            child: Text(_enCours ? 'Publication…' : 'Publier'),
          ),
        ],
      ),
    );
  }
}

/// 3. Actualités : liste, modification, suppression.
class PageActualitesAdmin extends StatefulWidget {
  const PageActualitesAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageActualitesAdmin> createState() => _PageActualitesAdminState();
}

class _PageActualitesAdminState extends State<PageActualitesAdmin> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerActualitesAdmin();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _modifier(ActualiteAdmin a) async {
    final titre = TextEditingController(text: a.titre);
    final texte = TextEditingController(text: a.texte);
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Modifier l’actualité'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titre,
              decoration: const InputDecoration(labelText: 'Titre'),
            ),
            TextField(
              controller: texte,
              maxLines: 4,
              decoration: const InputDecoration(labelText: 'Texte'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Enregistrer'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    final modifie = await widget.service.modifierActualite(
      a.id,
      titre: titre.text.trim(),
      texte: texte.text.trim(),
    );
    if (!mounted) return;
    _message(
      context,
      modifie ? 'Actualité modifiée.' : 'Modification impossible.',
    );
    if (modifie) setState(() {});
  }

  Future<void> _supprimer(ActualiteAdmin a) async {
    final ok = await _confirmer(
      context,
      'Retirer cette actualité',
      '« ${a.titre} » ne sera plus visible.',
    );
    if (!ok) return;
    final supprime = await widget.service.supprimerActualite(a.id);
    if (!mounted) return;
    _message(
      context,
      supprime ? 'Actualité retirée.' : 'Suppression impossible.',
    );
    if (supprime) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final actualites = widget.service.actualitesAdmin;
    return PageAdmin(
      titre: 'Actualités',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : actualites.isEmpty
              ? const Center(child: _Vide('Aucune actualité.'))
              : ListView.builder(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
                  itemCount: actualites.length,
                  itemBuilder: (context, index) {
                    final a = actualites[index];
                    return _Ligne(
                      titre: a.titre,
                      sousTitre: [
                        if (a.estProgrammee)
                          'Programmée pour le ${afficherDate(a.programmeeLe!)}'
                        else if (a.publieeLe != null)
                          afficherDate(a.publieeLe!),
                        a.texte,
                      ].join(' · '),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit_outlined),
                            onPressed: () => _modifier(a),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete_outlined),
                            onPressed: () => _supprimer(a),
                          ),
                        ],
                      ),
                    );
                  },
                ),
    );
  }
}

/// Choix du camp, partagé par Inscriptions et Badges.
class _ChoixCamp extends StatelessWidget {
  const _ChoixCamp({
    required this.service,
    required this.campId,
    required this.onChoisir,
  });
  final ServiceT18 service;
  final String? campId;
  final ValueChanged<String?> onChoisir;

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<String>(
      value: campId,
      decoration: const InputDecoration(
        labelText: 'Camp',
        border: OutlineInputBorder(),
      ),
      items: [
        for (final e in service.evenements)
          DropdownMenuItem(
            value: e.id,
            child: Text(
              e.dateDebut == null
                  ? e.nom
                  : '${e.nom} · ${afficherDate(e.dateDebut!)}',
            ),
          ),
      ],
      onChanged: onChoisir,
    );
  }
}

/// 5. Inscriptions à un camp, avec suivi des versements.
class PageInscriptionsCamp extends StatefulWidget {
  const PageInscriptionsCamp({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageInscriptionsCamp> createState() => _PageInscriptionsCampState();
}

class _PageInscriptionsCampState extends State<PageInscriptionsCamp> {
  var _charge = false;
  String? _campId;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerEvenements();
    _campId ??= EvenementAdmin.prochain(widget.service.evenements)?.id;
    if (_campId != null) {
      await widget.service.chargerInscriptions(_campId!);
      await widget.service.chargerSuiviVersements(_campId!);
    }
    if (mounted) setState(() => _charge = true);
  }

  /// Inscription au camp, correction de suivi 27 nov. 2026 :
  /// le formulaire KAIROS 2027, 5 sections, pour un membre
  /// sans téléphone ou une personne hors système. Le téléphone
  /// du campeur n'est pas obligatoire, le contact d'urgence
  /// l'est.
  Future<void> _inscrire() async {
    if (_campId == null) {
      _message(context, 'Choisissez un camp.');
      return;
    }
    final personne = await _choisirPersonne(context, widget.service);
    if (personne == null || !mounted) return;
    final inscrit = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (_) => PageInscriptionCamp(
          service: widget.service,
          campId: _campId!,
          personne: personne,
        ),
      ),
    );
    if (inscrit == true && mounted) _charger();
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    final suivi = service.suiviVersements;
    return PageAdmin(
      titre: 'Inscriptions au camp',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                _ChoixCamp(
                  service: service,
                  campId: _campId,
                  onChoisir: (v) {
                    _campId = v;
                    _charger();
                  },
                ),
                FilledButton.icon(
                  onPressed: _inscrire,
                  icon: const Icon(Icons.person_add_outlined),
                  label: const Text('Inscrire une personne'),
                ),
                const SizedBox(height: 8),
                OutlinedButton.icon(
                  onPressed: _campId == null
                      ? null
                      : () {
                          final camp = service.evenements
                              .where((e) => e.id == _campId)
                              .firstOrNull;
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) => PageChronogrammeAdmin(
                                service: service,
                                evenementId: _campId!,
                                nomCamp: camp?.nom ?? '',
                              ),
                            ),
                          );
                        },
                  icon: const Icon(Icons.calendar_month_outlined),
                  label: const Text('Programme du camp'),
                ),
                const _TitreBloc('Versements'),
                _Ligne(
                  titre: 'Total payé',
                  sousTitre: formaterFcfa(suivi.totalPaye),
                ),
                _Ligne(
                  titre: 'Reste à payer',
                  sousTitre: formaterFcfa(suivi.totalRestant),
                ),
                _Ligne(
                  titre: 'Pass débloqués',
                  sousTitre: '${suivi.passDebloques}',
                ),
                const _TitreBloc('Inscrits'),
                if (service.inscriptionsCamp.isEmpty)
                  const _Vide('Aucune inscription pour ce camp.')
                else
                  for (final i in service.inscriptionsCamp)
                    _Ligne(
                      titre: i.nomComplet,
                      sousTitre: [
                        if (i.matricule.isNotEmpty) i.matricule,
                        if (i.badgeId.isNotEmpty) i.badgeId,
                        if (i.inscritLe != null) afficherDate(i.inscritLe!),
                        if (i.passVisible) 'Pass visible',
                        if (i.contactParent.isNotEmpty)
                          'Parent : ${i.contactParent}',
                      ].join(' · '),
                    ),
              ],
            ),
    );
  }
}

/// Formulaire d'inscription au camp, correction de suivi
/// 27 nov. 2026 : les 5 sections du formulaire KAIROS 2027
/// d'Axel. Le nom vient de la personne choisie, le téléphone
/// du campeur n'est pas obligatoire, le contact d'urgence
/// l'est, nom et téléphone. Le médical est confidentiel.
class PageInscriptionCamp extends StatefulWidget {
  const PageInscriptionCamp({
    super.key,
    required this.service,
    required this.campId,
    required this.personne,
  });
  final ServiceT18 service;
  final String campId;
  final PersonneChoisie personne;

  @override
  State<PageInscriptionCamp> createState() => _PageInscriptionCampState();
}

class _PageInscriptionCampState extends State<PageInscriptionCamp> {
  final _age = TextEditingController();
  final _telephone = TextEditingController();
  final _email = TextEditingController();
  final _residence = TextEditingController();
  final _niveauEtude = TextEditingController();
  final _profession = TextEditingController();
  final _structure = TextEditingController();
  final _precisionsMedicales = TextEditingController();
  final _allergies = TextEditingController();
  final _besoinsMedicaux = TextEditingController();
  final _urgenceNom = TextEditingController();
  final _urgenceTelephone = TextEditingController();
  final _observations = TextEditingController();
  String? _sexe;
  String? _antecedents;
  String? _urgenceLien;
  var _consentement = false;
  var _enCours = false;

  @override
  void dispose() {
    _age.dispose();
    _telephone.dispose();
    _email.dispose();
    _residence.dispose();
    _niveauEtude.dispose();
    _profession.dispose();
    _structure.dispose();
    _precisionsMedicales.dispose();
    _allergies.dispose();
    _besoinsMedicaux.dispose();
    _urgenceNom.dispose();
    _urgenceTelephone.dispose();
    _observations.dispose();
    super.dispose();
  }

  Future<void> _inscrire() async {
    if (_urgenceNom.text.trim().isEmpty ||
        _urgenceTelephone.text.trim().isEmpty) {
      _message(context, 'Le contact d’urgence est obligatoire.');
      return;
    }
    if (!_consentement) {
      _message(context, 'Le consentement est obligatoire.');
      return;
    }
    final age = int.tryParse(_age.text.trim());
    if (_age.text.trim().isNotEmpty && age == null) {
      _message(context, 'L’âge doit être un nombre.');
      return;
    }
    setState(() => _enCours = true);
    final inscrite = await widget.service.inscrireAuCampAdmin(
      widget.campId,
      {
        if (!widget.personne.externe) 'membre_id': widget.personne.id,
        if (widget.personne.externe)
          'personne_externe_id': widget.personne.id,
        if (age != null) 'age': age,
        if (_sexe != null) 'sexe': _sexe,
        if (_telephone.text.trim().isNotEmpty)
          'telephone': _telephone.text.trim(),
        if (_email.text.trim().isNotEmpty) 'email': _email.text.trim(),
        if (_residence.text.trim().isNotEmpty)
          'residence': _residence.text.trim(),
        if (_niveauEtude.text.trim().isNotEmpty)
          'niveau_etude': _niveauEtude.text.trim(),
        if (_profession.text.trim().isNotEmpty)
          'profession': _profession.text.trim(),
        if (_structure.text.trim().isNotEmpty)
          'structure_appartenance': _structure.text.trim(),
        if (_antecedents != null) 'antecedents_medicaux': _antecedents,
        if (_precisionsMedicales.text.trim().isNotEmpty)
          'precisions_medicales': _precisionsMedicales.text.trim(),
        if (_allergies.text.trim().isNotEmpty)
          'allergies': _allergies.text.trim(),
        if (_besoinsMedicaux.text.trim().isNotEmpty)
          'besoins_medicaux': _besoinsMedicaux.text.trim(),
        'contact_urgence_nom': _urgenceNom.text.trim(),
        if (_urgenceLien != null) 'contact_urgence_lien': _urgenceLien,
        'contact_urgence_telephone': _urgenceTelephone.text.trim(),
        if (_observations.text.trim().isNotEmpty)
          'observations': _observations.text.trim(),
      },
    );
    if (!mounted) return;
    setState(() => _enCours = false);
    if (inscrite == null) {
      _message(context, 'Inscription impossible.');
      return;
    }
    final badgeId = (inscrite['badge_id'] ?? '').toString();
    _message(
      context,
      badgeId.isEmpty
          ? '${widget.personne.nom} inscrit(e) au camp.'
          : '${widget.personne.nom} inscrit(e) au camp. Badge $badgeId.',
    );
    Navigator.of(context).pop(true);
  }

  Widget _champ(
    TextEditingController controleur,
    String libelle, {
    TextInputType clavier = TextInputType.text,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: TextField(
        controller: controleur,
        keyboardType: clavier,
        decoration: InputDecoration(
          labelText: libelle,
          border: const OutlineInputBorder(),
        ),
      ),
    );
  }

  Widget _choix(
    String libelle,
    String? valeur,
    List<String> options,
    ValueChanged<String?> onChoisir,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: DropdownButtonFormField<String>(
        value: valeur,
        decoration: InputDecoration(
          labelText: libelle,
          border: const OutlineInputBorder(),
        ),
        items: [
          for (final o in options) DropdownMenuItem(value: o, child: Text(o)),
        ],
        onChanged: onChoisir,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return PageAdmin(
      titre: 'Inscrire ${widget.personne.nom}',
      enfant: ListView(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
        children: [
          const _TitreBloc('01 · Informations personnelles'),
          _champ(_age, 'Âge', clavier: TextInputType.number),
          _choix('Sexe', _sexe, const ['Femme', 'Homme'],
              (v) => setState(() => _sexe = v)),
          _champ(_telephone, 'Téléphone (facultatif)',
              clavier: TextInputType.phone),
          _champ(_email, 'E-mail', clavier: TextInputType.emailAddress),
          _champ(_residence, 'Lieu de résidence'),
          const _TitreBloc('02 · Études et situation professionnelle'),
          _champ(_niveauEtude, 'Niveau d’étude'),
          _champ(_profession, 'Profession / fonction'),
          _champ(_structure, 'Église / structure d’appartenance'),
          const _TitreBloc('03 · Informations médicales, confidentielles'),
          _choix(
            'Antécédents médicaux',
            _antecedents,
            const ['Oui', 'Non', 'Ne souhaite pas répondre'],
            (v) => setState(() => _antecedents = v),
          ),
          if (_antecedents == 'Oui')
            _champ(_precisionsMedicales, 'Précisions'),
          _champ(_allergies, 'Allergies'),
          _champ(_besoinsMedicaux, 'Autres besoins'),
          const _TitreBloc('04 · Contact en cas d’urgence'),
          _champ(_urgenceNom, 'Nom du contact *'),
          _choix(
            'Lien',
            _urgenceLien,
            const [
              'Père',
              'Mère',
              'Conjoint(e)',
              'Frère-Sœur',
              'Parent-Tuteur',
              'Ami(e)',
              'Autre',
            ],
            (v) => setState(() => _urgenceLien = v),
          ),
          _champ(_urgenceTelephone, 'Téléphone du contact *',
              clavier: TextInputType.phone),
          const _TitreBloc('05 · Observations'),
          TextField(
            controller: _observations,
            maxLines: 3,
            decoration: const InputDecoration(
              labelText: 'Observations',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          CheckboxListTile(
            contentPadding: EdgeInsets.zero,
            value: _consentement,
            onChanged: (v) => setState(() => _consentement = v ?? false),
            title: const Text(
              'Je confirme l’exactitude de ces informations et l’usage confidentiel des informations médicales.',
              style: TextStyle(fontSize: 13),
            ),
          ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: _enCours ? null : _inscrire,
            child: Text(_enCours ? 'Inscription…' : 'Inscrire au camp'),
          ),
        ],
      ),
    );
  }
}

/// 6. Badges d'un camp : pass visible par inscrit.
/// L'impression HTML des badges de l'ancienne version n'est pas
/// reconstruite dans cette tranche.
class PageBadgesCamp extends StatefulWidget {
  const PageBadgesCamp({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageBadgesCamp> createState() => _PageBadgesCampState();
}

class _PageBadgesCampState extends State<PageBadgesCamp> {
  var _charge = false;
  String? _campId;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerEvenements();
    _campId ??= EvenementAdmin.prochain(widget.service.evenements)?.id;
    if (_campId != null) {
      await widget.service.chargerInscriptions(_campId!);
    }
    if (mounted) setState(() => _charge = true);
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    return PageAdmin(
      titre: 'Badges du camp',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                _ChoixCamp(
                  service: service,
                  campId: _campId,
                  onChoisir: (v) {
                    _campId = v;
                    _charger();
                  },
                ),
                const SizedBox(height: 12),
                if (service.inscriptionsCamp.isEmpty)
                  const _Vide('Aucune inscription pour ce camp.')
                else
                  for (final i in service.inscriptionsCamp)
                    _Ligne(
                      titre: i.nomComplet,
                      sousTitre: [
                        if (i.badgeId.isNotEmpty) i.badgeId,
                        if (i.matricule.isNotEmpty) i.matricule,
                      ].join(' · '),
                      trailing: Chip(
                        label: Text(
                          i.passVisible ? 'Pass visible' : 'Pass masqué',
                        ),
                        backgroundColor: i.passVisible
                            ? PaletteNouvelle.or
                            : Colors.grey.shade200,
                      ),
                    ),
              ],
            ),
    );
  }
}

/// 7. Présences, groupées par activité.
class PagePresencesAdmin extends StatefulWidget {
  const PagePresencesAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PagePresencesAdmin> createState() => _PagePresencesAdminState();
}

class _PagePresencesAdminState extends State<PagePresencesAdmin> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerPresences();
    await widget.service.chargerEvenements();
    if (mounted) setState(() => _charge = true);
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    final noms = {
      for (final e in service.evenements) e.id: e.nom,
    };
    final parActivite = <String, List<PresenceLigne>>{};
    for (final p in service.presences) {
      parActivite.putIfAbsent(p.activiteId, () => []).add(p);
    }
    return PageAdmin(
      titre: 'Présences',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : parActivite.isEmpty
              ? const Center(child: _Vide('Aucune présence scannée.'))
              : ListView(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
                  children: [
                    for (final entree in parActivite.entries)
                      _Ligne(
                        titre: noms[entree.key] ?? 'Activité',
                        sousTitre: '${entree.value.length} présence(s)',
                        trailing: const Icon(Icons.chevron_right),
                        onTap: () => Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => PagePresencesActiviteDetail(
                              service: service,
                              activiteId: entree.key,
                              nom: noms[entree.key] ?? 'Activité',
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
    );
  }
}

/// Détail des présences d'une activité, avec son taux.
class PagePresencesActiviteDetail extends StatefulWidget {
  const PagePresencesActiviteDetail({
    super.key,
    required this.service,
    required this.activiteId,
    required this.nom,
  });
  final ServiceT18 service;
  final String activiteId;
  final String nom;

  @override
  State<PagePresencesActiviteDetail> createState() =>
      _PagePresencesActiviteDetailState();
}

class _PagePresencesActiviteDetailState
    extends State<PagePresencesActiviteDetail> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerPresencesActivite(
      widget.activiteId,
      widget.nom,
    );
    if (mounted) setState(() => _charge = true);
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    final taux = service.tauxPresence;
    return PageAdmin(
      titre: widget.nom,
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                if (taux != null)
                  _Ligne(
                    titre: 'Taux de présence',
                    sousTitre: taux.taux == null
                        ? '${taux.presents} / ${taux.inscrits}'
                        : '${taux.presents} / ${taux.inscrits} · '
                            '${(taux.taux! * 100).round()} %',
                  ),
                FilledButton.icon(
                  onPressed: () async {
                    await Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => PageScannerPresence(
                          service: service,
                          activiteId: widget.activiteId,
                          activiteNom: widget.nom,
                        ),
                      ),
                    );
                    _charger();
                  },
                  icon: const Icon(Icons.qr_code_scanner_outlined),
                  label: const Text('Scanner un QR'),
                ),
                const SizedBox(height: 8),
                if (service.presencesActivite.isEmpty)
                  const _Vide('Aucune présence sur cette activité.')
                else
                  for (final e in service.presencesActivite)
                    _Ligne(
                      titre: e.nomComplet,
                      sousTitre: [
                        e.matricule,
                        e.statut,
                        if (e.scanneLe != null) afficherDate(e.scanneLe!),
                      ].join(' · '),
                    ),
              ],
            ),
    );
  }
}

/// 8. Documents de la structure.
class PageDocumentsAdmin extends StatefulWidget {
  const PageDocumentsAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageDocumentsAdmin> createState() => _PageDocumentsAdminState();
}

class _PageDocumentsAdminState extends State<PageDocumentsAdmin> {
  var _charge = false;
  final _titre = TextEditingController();
  final _lien = TextEditingController();
  List<int>? _octets;
  String? _nomFichier;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _titre.dispose();
    _lien.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await widget.service.chargerDocuments();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _choisirFichier() async {
    try {
      final choix = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: const ['pdf', 'docx', 'xlsx', 'pptx'],
        withData: true,
      );
      final f = choix?.files.single;
      final octets = f?.bytes;
      if (octets == null || octets.isEmpty) return;
      setState(() {
        _octets = octets;
        _nomFichier = f!.name;
      });
    } catch (_) {
      if (mounted) _message(context, 'Choix du fichier impossible.');
    }
  }

  Future<void> _publier() async {
    if (_titre.text.trim().isEmpty) {
      _message(context, 'Le titre est obligatoire.');
      return;
    }
    String? fichierId;
    if (_octets != null) {
      fichierId = await widget.service.televerserDocument(
        _octets!,
        _nomFichier ?? 'document',
      );
      if (fichierId == null) {
        if (mounted) _message(context, 'Envoi du fichier impossible.');
        return;
      }
    }
    final ok = await widget.service.publierDocument(
      titre: _titre.text.trim(),
      lien: _lien.text.trim().isEmpty ? null : _lien.text.trim(),
      fichierId: fichierId,
    );
    if (!mounted) return;
    if (ok) {
      _titre.clear();
      _lien.clear();
      setState(() {
        _octets = null;
        _nomFichier = null;
      });
    }
    _message(context, ok ? 'Document publié.' : 'Publication impossible.');
    if (ok) setState(() {});
  }

  Future<void> _supprimer(DocumentStructure d) async {
    final ok = await _confirmer(
      context,
      'Retirer ce document',
      '« ${d.titre} » ne sera plus visible.',
    );
    if (!ok) return;
    final supprime = await widget.service.supprimerDocument(d.id);
    if (!mounted) return;
    _message(
      context,
      supprime ? 'Document retiré.' : 'Suppression impossible.',
    );
    if (supprime) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final documents = widget.service.documents;
    return PageAdmin(
      titre: 'Documents',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                TextField(
                  controller: _titre,
                  decoration: const InputDecoration(
                    labelText: 'Titre du document',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _lien,
                  decoration: const InputDecoration(
                    labelText: 'Lien (facultatif)',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                OutlinedButton.icon(
                  onPressed: _choisirFichier,
                  icon: const Icon(Icons.attach_file),
                  label: const Text('Choisir un fichier'),
                ),
                if (_nomFichier != null)
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.description_outlined),
                    title: Text(_nomFichier!),
                    trailing: IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => setState(() {
                        _octets = null;
                        _nomFichier = null;
                      }),
                    ),
                  ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: _publier,
                  child: const Text('Publier le document'),
                ),
                const SizedBox(height: 12),
                if (documents.isEmpty)
                  const _Vide('Aucun document.')
                else
                  for (final d in documents)
                    _Ligne(
                      titre: d.titre,
                      trailing: IconButton(
                        icon: const Icon(Icons.delete_outlined),
                        onPressed: () => _supprimer(d),
                      ),
                    ),
              ],
            ),
    );
  }
}

/// 9. Attestations : liste, délivrance, annulation, PDF.
class PageAttestationsAdmin extends StatefulWidget {
  const PageAttestationsAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageAttestationsAdmin> createState() => _PageAttestationsAdminState();
}

class _PageAttestationsAdminState extends State<PageAttestationsAdmin> {
  var _charge = false;
  String _type = 'participation';
  final _activite = TextEditingController();

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _activite.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await widget.service.chargerAttestations();
    await widget.service.chargerMembresAdmin();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _delivrer() async {
    if (_activite.text.trim().isEmpty) {
      _message(context, 'L’activité est obligatoire.');
      return;
    }
    final membre = await _choisirMembre(context, widget.service);
    if (membre == null) return;
    final ok = await widget.service.creerAttestation(
      membreId: membre.id,
      type: _type,
      activite: _activite.text.trim(),
    );
    if (!mounted) return;
    _message(
      context,
      ok ? 'Attestation délivrée.' : 'Délivrance impossible.',
    );
    if (ok) setState(() {});
  }

  Future<void> _annuler(AttestationAdmin a) async {
    final ok = await _confirmer(
      context,
      'Annuler cette attestation',
      'L’annulation est enregistrée, l’attestation reste visible '
          'comme annulée.',
    );
    if (!ok) return;
    final annulee = await widget.service.annulerAttestation(a.id);
    if (!mounted) return;
    _message(
      context,
      annulee ? 'Attestation annulée.' : 'Annulation impossible.',
    );
    if (annulee) setState(() {});
  }

  Future<void> _telechargerPdf(AttestationAdmin a) async {
    final octets = await widget.service.telechargerAttestationPdf(a.id);
    if (!mounted) return;
    if (octets == null) {
      _message(context, 'PDF indisponible pour le moment.');
      return;
    }
    await downloadBytesFile(
      'attestation-${a.reference}.pdf',
      octets,
      'application/pdf',
    );
    if (!mounted) return;
    _message(context, 'PDF téléchargé.');
  }

  @override
  Widget build(BuildContext context) {
    final attestations = widget.service.attestations;
    return PageAdmin(
      titre: 'Attestations',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                const _TitreBloc('Délivrer une attestation'),
                DropdownButtonFormField<String>(
                  value: _type,
                  decoration: const InputDecoration(
                    labelText: 'Type',
                    border: OutlineInputBorder(),
                  ),
                  items: const [
                    DropdownMenuItem(
                      value: 'participation',
                      child: Text('Participation'),
                    ),
                    DropdownMenuItem(
                      value: 'benevolat',
                      child: Text('Bénévolat'),
                    ),
                  ],
                  onChanged: (v) =>
                      setState(() => _type = v ?? 'participation'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _activite,
                  decoration: const InputDecoration(
                    labelText: 'Activité',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: _delivrer,
                  child: const Text('Choisir le membre et délivrer'),
                ),
                const _TitreBloc('Attestations délivrées'),
                if (attestations.isEmpty)
                  const _Vide('Aucune attestation.')
                else
                  for (final a in attestations)
                    _Ligne(
                      titre: '${a.type} · ${a.reference}',
                      sousTitre: [
                        if (a.membreNom.isNotEmpty) a.membreNom,
                        if (a.delivreLe != null) afficherDate(a.delivreLe!),
                        if (a.annulee) 'Annulée',
                      ].join(' · '),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.download_outlined),
                            onPressed: () => _telechargerPdf(a),
                          ),
                          if (!a.annulee)
                            IconButton(
                              icon: const Icon(Icons.cancel_outlined),
                              onPressed: () => _annuler(a),
                            ),
                        ],
                      ),
                    ),
              ],
            ),
    );
  }
}

/// 10. Journal d'audit, 200 dernières lignes.
class PageAuditAdmin extends StatefulWidget {
  const PageAuditAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageAuditAdmin> createState() => _PageAuditAdminState();
}

class _PageAuditAdminState extends State<PageAuditAdmin> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerAudit();
    if (mounted) setState(() => _charge = true);
  }

  @override
  Widget build(BuildContext context) {
    final audit = widget.service.audit;
    return PageAdmin(
      titre: 'Journal d’audit',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : audit.isEmpty
              ? const Center(child: _Vide('Aucune ligne d’audit.'))
              : ListView.builder(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
                  itemCount: audit.length,
                  itemBuilder: (context, index) {
                    final l = audit[index];
                    return _Ligne(
                      titre: l.action,
                      sousTitre: [
                        l.entite,
                        if (l.acteurNom.isNotEmpty) l.acteurNom,
                        if (l.horodatage != null) afficherDate(l.horodatage!),
                        if (l.details.isNotEmpty) l.details,
                      ].join(' · '),
                    );
                  },
                ),
    );
  }
}

/// 11. Exports complets, en CSV.
class PageExportsAdmin extends StatefulWidget {
  const PageExportsAdmin({
    super.key,
    required this.service,
    required this.serviceT14,
  });
  final ServiceT18 service;
  final ServiceT14 serviceT14;

  @override
  State<PageExportsAdmin> createState() => _PageExportsAdminState();
}

class _PageExportsAdminState extends State<PageExportsAdmin> {
  String? _campId;
  var _charge = false;
  String _format = 'csv';

  @override
  void initState() {
    super.initState();
    widget.service.chargerEvenements().then((_) {
      if (mounted) setState(() => _charge = true);
    });
  }

  Future<void> _telecharger(String nom, String csv) async {
    await downloadBytesFile(nom, utf8.encode(csv), 'text/csv');
    if (!mounted) return;
    _message(context, '$nom téléchargé.');
  }

  Future<void> _telechargerFichier(String sujet, String nom,
      {String? evenementId}) async {
    final octets = await widget.service.telechargerExport(
      sujet,
      format: _format,
      evenementId: evenementId,
    );
    if (octets == null) {
      if (mounted) _message(context, 'Téléchargement impossible.');
      return;
    }
    final mime = _format == 'pdf'
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    await downloadBytesFile(nom, octets, mime);
    if (mounted) _message(context, '$nom téléchargé.');
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    return PageAdmin(
      titre: 'Exports complets',
      enfant: ListView(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
        children: [
          DropdownButtonFormField<String>(
            value: _format,
            isExpanded: true,
            decoration: const InputDecoration(
              labelText: 'Format',
              border: OutlineInputBorder(),
            ),
            items: const [
              DropdownMenuItem(value: 'csv', child: Text('CSV')),
              DropdownMenuItem(
                value: 'xlsx',
                child: Text('Excel (.xlsx)'),
              ),
              DropdownMenuItem(value: 'pdf', child: Text('PDF')),
            ],
            onChanged: (v) => setState(() => _format = v ?? 'csv'),
          ),
          const SizedBox(height: 8),
          _Ligne(
            titre: 'Membres',
            sousTitre: 'Nom, matricule, fonction, rôle, établissement.',
            trailing: FilledButton(
              onPressed: () async {
                if (_format == 'csv') {
                  await widget.serviceT14.chargerMembresAdmin();
                  await _telecharger(
                    'membres.csv',
                    service.exporterMembresCsv(
                      widget.serviceT14.membresAdmin,
                    ),
                  );
                } else {
                  await _telechargerFichier('membres', 'membres.$_format');
                }
              },
              child: const Text('Télécharger'),
            ),
          ),
          _Ligne(
            titre: 'Paiements',
            sousTitre: 'Référence, type, montant, statut, moyen, membre.',
            trailing: FilledButton(
              onPressed: () async {
                if (_format == 'csv') {
                  await service.chargerPaiementsTous();
                  await _telecharger(
                    'paiements.csv',
                    service.exporterPaiementsCsv(),
                  );
                } else {
                  await _telechargerFichier(
                    'paiements',
                    'paiements.$_format',
                  );
                }
              },
              child: const Text('Télécharger'),
            ),
          ),
          _Ligne(
            titre: 'Présences',
            sousTitre: 'Toutes les présences scannées.',
            trailing: FilledButton(
              onPressed: () async {
                if (_format == 'csv') {
                  await service.chargerPresences();
                  await _telecharger(
                    'presences.csv',
                    service.exporterPresencesCsv(),
                  );
                } else {
                  await _telechargerFichier(
                    'presences',
                    'presences.$_format',
                  );
                }
              },
              child: const Text('Télécharger'),
            ),
          ),
          const _TitreBloc('Inscriptions par camp'),
          if (!_charge)
            const Center(child: CircularProgressIndicator())
          else ...[
            _ChoixCamp(
              service: service,
              campId: _campId,
              onChoisir: (v) => setState(() => _campId = v),
            ),
            const SizedBox(height: 8),
            FilledButton(
              onPressed: _campId == null
                  ? null
                  : () async {
                      if (_format == 'csv') {
                        await service.chargerInscriptions(_campId!);
                        await _telecharger(
                          'inscriptions.csv',
                          service.exporterInscriptionsCsv(),
                        );
                      } else {
                        await _telechargerFichier(
                          'inscriptions',
                          'inscriptions.$_format',
                          evenementId: _campId!,
                        );
                      }
                    },
              child: const Text('Télécharger les inscriptions'),
            ),
          ],
        ],
      ),
    );
  }
}

// ------------------------------------------------------------------
// Lot 2
// ------------------------------------------------------------------

/// Administrateurs : désignés et rôles.
class PageAdministrateurs extends StatefulWidget {
  const PageAdministrateurs({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageAdministrateurs> createState() => _PageAdministrateursState();
}

const _rolesAdmin = [
  ('admin_general', 'Administrateur général'),
  ('admin_etablissement', 'Administrateur d’établissement'),
  ('membre', 'Membre'),
];

class _PageAdministrateursState extends State<PageAdministrateurs> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerAdministrateurs();
    await widget.service.chargerMembresAdmin();
    await widget.service.chargerEtablissements();
    await widget.service.chargerPersonnesExternes();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _retirerExterne(PersonneExterne p) async {
    final ok = await _confirmer(
      context,
      'Retirer ce rôle',
      '${p.nomComplet} ne gèrera plus l’application. Sa fiche reste.',
    );
    if (!ok) return;
    final retire = await widget.service.modifierPersonneExterne(
      p.id,
      {'role_admin': null},
    );
    if (!mounted) return;
    _message(
      context,
      retire ? 'Rôle retiré.' : 'Retrait impossible.',
    );
    if (retire) setState(() {});
  }

  String _libelleRole(String role) => _rolesAdmin
      .firstWhere(
        (r) => r.$1 == role,
        orElse: () => (role, role),
      )
      .$2;

  Future<void> _definirRole() async {
    final personne = await _choisirPersonne(
      context,
      widget.service,
      avecRole: true,
    );
    if (personne == null) return;
    if (personne.externe) {
      // Personne hors système : la fiche vient d'être créée avec
      // son rôle, ou il faut désigner le rôle d'une fiche existante.
      if (personne.estNouvelle) {
        if (!mounted) return;
        _message(context, 'Administrateur désigné.');
        setState(() {});
        return;
      }
      String role = 'admin_etablissement';
      String? etablissementId;
      final ok = await showDialog<bool>(
        context: context,
        builder: (context) => StatefulBuilder(
          builder: (context, setEtat) => AlertDialog(
            title: Text('Rôle de ${personne.nom}'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DropdownButtonFormField<String>(
                  value: role,
                  isExpanded: true,
                  decoration: const InputDecoration(
                    labelText: 'Rôle',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    for (final (valeur, libelle) in _rolesAdmin)
                      DropdownMenuItem(
                        value: valeur,
                        child: Text(libelle),
                      ),
                  ],
                  onChanged: (v) => setEtat(() => role = v ?? role),
                ),
                if (role == 'admin_etablissement') ...[
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String?>(
                    value: etablissementId,
                    isExpanded: true,
                    decoration: const InputDecoration(
                      labelText: 'Établissement',
                      border: OutlineInputBorder(),
                    ),
                    items: [
                      for (final e in widget.service.etablissements)
                        DropdownMenuItem(
                          value: e.id,
                          child: Text(e.nom),
                        ),
                    ],
                    onChanged: (v) => setEtat(() => etablissementId = v),
                  ),
                ],
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(false),
                child: const Text('Annuler'),
              ),
              FilledButton(
                onPressed: () => Navigator.of(context).pop(true),
                child: const Text('Enregistrer'),
              ),
            ],
          ),
        ),
      );
      if (ok != true) return;
      final defini = await widget.service.modifierPersonneExterne(
        personne.id,
        {
          'role_admin': role,
          if (etablissementId != null) 'etablissement_id': etablissementId,
        },
      );
      if (!mounted) return;
      _message(context, defini ? 'Rôle défini.' : 'Définition impossible.');
      if (defini) setState(() {});
      return;
    }
    MembreAdmin? membre;
    for (final m in widget.service.membresAdmin) {
      if (m.id == personne.id) membre = m;
    }
    if (membre == null) return;
    final membreChoisi = membre;
    String role = 'admin_etablissement';
    String? etablissementId;
    String fonctionAdmin = '';
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: Text('Rôle de ${membreChoisi.nomComplet}'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              DropdownButtonFormField<String>(
                value: role,
                isExpanded: true,
                decoration: const InputDecoration(
                  labelText: 'Rôle',
                  border: OutlineInputBorder(),
                ),
                items: [
                  for (final (valeur, libelle) in _rolesAdmin)
                    DropdownMenuItem(
                      value: valeur,
                      child: Text(libelle),
                    ),
                ],
                onChanged: (v) => setEtat(() => role = v ?? role),
              ),
              if (role == 'admin_etablissement') ...[
                const SizedBox(height: 8),
                DropdownButtonFormField<String?>(
                  value: etablissementId,
                  isExpanded: true,
                  decoration: const InputDecoration(
                    labelText: 'Établissement',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    for (final e in widget.service.etablissements)
                      DropdownMenuItem(
                        value: e.id,
                        child: Text(e.nom),
                      ),
                  ],
                  onChanged: (v) => setEtat(() => etablissementId = v),
                ),
              ],
              const SizedBox(height: 8),
              TextField(
                decoration: const InputDecoration(
                  labelText: 'Fonction admin (facultatif)',
                  border: OutlineInputBorder(),
                ),
                onChanged: (v) => fonctionAdmin = v,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Enregistrer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    final defini = await widget.service.definirRole(
      membre.id,
      role,
      etablissementId: etablissementId,
      fonctionAdmin: fonctionAdmin.trim().isEmpty ? null : fonctionAdmin.trim(),
    );
    if (!mounted) return;
    _message(context, defini ? 'Rôle défini.' : 'Définition impossible.');
    if (defini) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final administrateurs = widget.service.administrateurs;
    final externes = widget.service.personnesExternes
        .where((p) => p.roleAdmin.isNotEmpty)
        .toList();
    return PageAdmin(
      titre: 'Administrateurs',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                FilledButton.icon(
                  onPressed: _definirRole,
                  icon: const Icon(Icons.person_add_outlined),
                  label: const Text('Définir un rôle'),
                ),
                const SizedBox(height: 12),
                if (administrateurs.isEmpty && externes.isEmpty)
                  const _Vide('Aucun administrateur désigné.')
                else ...[
                  for (final m in administrateurs)
                    _Ligne(
                      titre: m.nomComplet,
                      sousTitre: [
                        _libelleRole(m.roleCompte),
                        m.matricule,
                        if (m.etablissement.isNotEmpty) m.etablissement,
                      ].join(' · '),
                    ),
                  if (externes.isNotEmpty) ...[
                    const _TitreBloc('Hors système'),
                    for (final p in externes)
                      _Ligne(
                        titre: p.nomComplet,
                        sousTitre: [
                          p.roleAdminLibelle,
                          if (p.fonction.isNotEmpty) p.fonction,
                          if (p.etablissementNom.isNotEmpty) p.etablissementNom,
                          'Hors système',
                        ].join(' · '),
                        trailing: TextButton(
                          onPressed: () => _retirerExterne(p),
                          child: const Text('Retirer'),
                        ),
                      ),
                  ],
                ],
              ],
            ),
    );
  }
}

/// Libellés des fonctions, les 11 fonctions de l'application
/// sans « Aucun ».
const _libellesFonction = {
  'president': 'Président',
  'secretaire': 'Secrétaire',
  'tresorier': 'Trésorier',
  'chantre': 'Chantre',
  'organisateur': 'Organisateur',
  'responsable': 'Responsable',
  'leader': 'Leader',
  'pca': 'PCA',
  'coordinateur': 'Coordinateur',
  'membre': 'Membre',
};

/// Nominations.
class PageNominationsAdmin extends StatefulWidget {
  const PageNominationsAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageNominationsAdmin> createState() => _PageNominationsAdminState();
}

class _PageNominationsAdminState extends State<PageNominationsAdmin> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerNominations();
    await widget.service.chargerMembresAdmin();
    await widget.service.chargerEtablissements();
    await widget.service.chargerEvenements();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _creer() async {
    final personne = await _choisirPersonne(context, widget.service);
    if (personne == null) return;
    String fonction = 'responsable';
    String portee = 'structure';
    String? etablissementId;
    String? evenementId;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: Text('Nommer ${personne.nom}'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              DropdownButtonFormField<String>(
                value: fonction,
                decoration: const InputDecoration(
                  labelText: 'Fonction',
                  border: OutlineInputBorder(),
                ),
                items: [
                  for (final code in codesFonctionNomination)
                    DropdownMenuItem(
                      value: code,
                      child: Text(_libellesFonction[code] ?? code),
                    ),
                ],
                onChanged: (v) => setEtat(() => fonction = v ?? fonction),
              ),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                value: portee,
                decoration: const InputDecoration(
                  labelText: 'Portée',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(
                    value: 'structure',
                    child: Text('Structure'),
                  ),
                  DropdownMenuItem(
                    value: 'etablissement',
                    child: Text('Établissement'),
                  ),
                  DropdownMenuItem(
                    value: 'activite',
                    child: Text('Activité'),
                  ),
                ],
                onChanged: (v) => setEtat(() {
                  portee = v ?? portee;
                  etablissementId = null;
                  evenementId = null;
                }),
              ),
              if (portee == 'etablissement') ...[
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: etablissementId,
                  decoration: const InputDecoration(
                    labelText: 'Établissement',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    for (final e in widget.service.etablissements)
                      DropdownMenuItem(value: e.id, child: Text(e.nom)),
                  ],
                  onChanged: (v) => setEtat(() => etablissementId = v),
                ),
              ],
              if (portee == 'activite') ...[
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: evenementId,
                  decoration: const InputDecoration(
                    labelText: 'Activité',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    for (final e in widget.service.evenements)
                      DropdownMenuItem(value: e.id, child: Text(e.nom)),
                  ],
                  onChanged: (v) => setEtat(() => evenementId = v),
                ),
              ],
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Nommer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    final cree = await widget.service.creerNomination(
      membreId: personne.externe ? null : personne.id,
      personneExterneId: personne.externe ? personne.id : null,
      fonctionCode: fonction,
      portee: portee,
      etablissementId: etablissementId,
      evenementId: evenementId,
    );
    if (!mounted) return;
    _message(context, cree ? 'Nomination créée.' : 'Création impossible.');
    if (cree) setState(() {});
  }

  Future<void> _revoquer(NominationAdmin n) async {
    final ok = await _confirmer(
      context,
      'Révoquer cette nomination',
      '${n.nomComplet} · ${n.fonctionLibelle} · ${n.porteeLibelle}',
    );
    if (!ok) return;
    final revoquee = await widget.service.revoquerNomination(n.id);
    if (!mounted) return;
    _message(
      context,
      revoquee ? 'Nomination révoquée.' : 'Révocation impossible.',
    );
    if (revoquee) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final nominations = widget.service.nominations;
    return PageAdmin(
      titre: 'Nominations',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                FilledButton.icon(
                  onPressed: _creer,
                  icon: const Icon(Icons.person_add_outlined),
                  label: const Text('Nouvelle nomination'),
                ),
                const SizedBox(height: 12),
                if (nominations.isEmpty)
                  const _Vide('Aucune nomination.')
                else
                  for (final n in nominations)
                    _Ligne(
                      titre: n.nomComplet,
                      sousTitre: [
                        n.fonctionLibelle,
                        n.porteeLibelle,
                        if (n.matricule.isNotEmpty) n.matricule,
                        if (n.estExterne) 'Hors système',
                      ].join(' · '),
                      trailing: TextButton(
                        onPressed: () => _revoquer(n),
                        child: const Text('Révoquer'),
                      ),
                    ),
              ],
            ),
    );
  }
}

/// Élections, avec vote côté serveur.
class PageElectionsAdmin extends StatefulWidget {
  const PageElectionsAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageElectionsAdmin> createState() => _PageElectionsAdminState();
}

class _PageElectionsAdminState extends State<PageElectionsAdmin> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerElections();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _creer() async {
    final titre = TextEditingController();
    final description = TextEditingController();
    final poste = TextEditingController();
    final matricule = TextEditingController();
    DateTime debut = DateTime.now();
    DateTime fin = DateTime.now().add(const Duration(days: 7));
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: const Text('Nouvelle élection'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: titre,
                  decoration: const InputDecoration(labelText: 'Titre'),
                ),
                TextField(
                  controller: description,
                  decoration: const InputDecoration(
                    labelText: 'Description (facultatif)',
                  ),
                ),
                TextField(
                  controller: poste,
                  decoration: const InputDecoration(
                    labelText: 'Poste (facultatif)',
                  ),
                ),
                TextField(
                  controller: matricule,
                  decoration: const InputDecoration(
                    labelText: 'Matricule du premier candidat',
                  ),
                ),
                const SizedBox(height: 8),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Début'),
                  subtitle: Text(afficherDate(debut)),
                  trailing: TextButton(
                    onPressed: () async {
                      final d = await _choisirDate(context, debut);
                      if (d != null) setEtat(() => debut = d);
                    },
                    child: const Text('Choisir'),
                  ),
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Fin'),
                  subtitle: Text(afficherDate(fin)),
                  trailing: TextButton(
                    onPressed: () async {
                      final d = await _choisirDate(context, fin);
                      if (d != null) setEtat(() => fin = d);
                    },
                    child: const Text('Choisir'),
                  ),
                ),
                const Text(
                  'Une seule élection à la fois : la période ne doit '
                  'chevaucher aucune autre élection.',
                  style: TextStyle(fontSize: 13, color: Colors.black54),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Créer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    if (titre.text.trim().isEmpty || matricule.text.trim().isEmpty) {
      _message(context, 'Titre et premier candidat sont obligatoires.');
      return;
    }
    final cree = await widget.service.creerElection(
      titre: titre.text.trim(),
      description:
          description.text.trim().isEmpty ? null : description.text.trim(),
      poste: poste.text.trim().isEmpty ? null : poste.text.trim(),
      debut: debut,
      fin: fin,
      matriculesCandidats: [matricule.text.trim()],
    );
    if (!mounted) return;
    _message(
      context,
      cree ? 'Élection créée.' : 'Création impossible.',
    );
    if (cree) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final elections = widget.service.elections;
    return PageAdmin(
      titre: 'Élections',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                FilledButton.icon(
                  onPressed: _creer,
                  icon: const Icon(Icons.how_to_vote_outlined),
                  label: const Text('Nouvelle élection'),
                ),
                const SizedBox(height: 12),
                if (elections.isEmpty)
                  const _Vide('Aucune élection.')
                else
                  for (final e in elections)
                    _Ligne(
                      titre: e.titre,
                      sousTitre: [
                        if (e.poste.isNotEmpty) e.poste,
                        if (e.dateDebut != null)
                          'Du ${afficherDate(e.dateDebut!)}',
                        if (e.dateFin != null) 'au ${afficherDate(e.dateFin!)}',
                        e.enCours ? 'En cours' : 'Terminée',
                        '${e.nbVotes} voix',
                      ].join(' · '),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () => Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => PageElectionDetail(
                            service: widget.service,
                            electionId: e.id,
                          ),
                        ),
                      ),
                    ),
              ],
            ),
    );
  }
}

/// Détail d'une élection : candidats, vote, résultats.
class PageElectionDetail extends StatefulWidget {
  const PageElectionDetail({
    super.key,
    required this.service,
    required this.electionId,
  });
  final ServiceT18 service;
  final String electionId;

  @override
  State<PageElectionDetail> createState() => _PageElectionDetailState();
}

class _PageElectionDetailState extends State<PageElectionDetail> {
  var _charge = false;
  Map<String, dynamic>? _resultats;
  final _matricule = TextEditingController();

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _matricule.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await widget.service.chargerElection(widget.electionId);
    _resultats =
        await widget.service.chargerResultatsElection(widget.electionId);
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _ajouterCandidat() async {
    if (_matricule.text.trim().isEmpty) return;
    final ok = await widget.service.ajouterCandidat(
      widget.electionId,
      _matricule.text.trim(),
    );
    if (!mounted) return;
    if (ok) _matricule.clear();
    _message(
      context,
      ok ? 'Candidat ajouté.' : 'Ajout impossible.',
    );
    if (ok) setState(() {});
  }

  Future<void> _voter(CandidatElection c) async {
    final ok = await _confirmer(
      context,
      'Voter pour ${c.nomComplet}',
      'Ton vote est enregistré par le serveur, un seul vote '
          'par membre.',
    );
    if (!ok) return;
    final vote = await widget.service.voterElection(
      widget.electionId,
      c.id,
    );
    if (!mounted) return;
    _message(
      context,
      vote ? 'Vote enregistré.' : 'Vote impossible.',
    );
    if (vote) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    final election = service.electionDetail;
    final resultats = _resultats == null
        ? null
        : (_resultats!['resultats'] as List?) ?? const [];
    return PageAdmin(
      titre: election?.titre ?? 'Élection',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : election == null
              ? const Center(child: _Vide('Élection introuvable.'))
              : ListView(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
                  children: [
                    if (election.description.isNotEmpty)
                      Text(
                        election.description,
                        style: const TextStyle(fontSize: 15, height: 1.5),
                      ),
                    const _TitreBloc('Candidats'),
                    if (service.candidatsElection.isEmpty)
                      const _Vide('Aucun candidat.')
                    else
                      for (final c in service.candidatsElection)
                        _Ligne(
                          titre: c.nomComplet,
                          sousTitre: [
                            c.matricule,
                            '${c.nbVotes} voix',
                          ].join(' · '),
                          trailing: election.enCours
                              ? FilledButton(
                                  onPressed: () => _voter(c),
                                  child: const Text('Voter'),
                                )
                              : null,
                        ),
                    if (election.enCours) ...[
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              controller: _matricule,
                              decoration: const InputDecoration(
                                labelText: 'Matricule d’un candidat',
                                border: OutlineInputBorder(),
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          FilledButton(
                            onPressed: _ajouterCandidat,
                            child: const Text('Ajouter'),
                          ),
                        ],
                      ),
                    ],
                    const _TitreBloc('Résultats'),
                    if (resultats == null)
                      const _Vide(
                        'Les résultats seront disponibles après la '
                        'fin de l’élection.',
                      )
                    else if (resultats.isEmpty)
                      const _Vide('Aucun vote pour le moment.')
                    else
                      for (final r in resultats)
                        if (r is Map<String, dynamic>)
                          _Ligne(
                            titre: (r['nom'] ?? '').toString(),
                            sousTitre:
                                '${(r['voix'] as num?)?.toInt() ?? 0} voix',
                          ),
                  ],
                ),
    );
  }
}

/// Liens parent-enfant, AVEC validation obligatoire.
/// Le fichier d'Axel les créait sans validation : c'est corrigé
/// ici, un lien en attente ne devient actif qu'après validation.
class PageLiensAdmin extends StatefulWidget {
  const PageLiensAdmin({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageLiensAdmin> createState() => _PageLiensAdminState();
}

class _PageLiensAdminState extends State<PageLiensAdmin> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerLiensEnAttente();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _valider(LienAdmin l) async {
    final ok = await widget.service.validerLien(l.id);
    if (!mounted) return;
    _message(context, ok ? 'Lien validé.' : 'Validation impossible.');
    if (ok) setState(() {});
  }

  Future<void> _rejeter(LienAdmin l) async {
    final ok = await _confirmer(
      context,
      'Rejeter ce lien',
      '${l.parentNom} · ${l.enfantNom} (${l.enfantMatricule})',
    );
    if (!ok) return;
    final rejete = await widget.service.rejeterLien(l.id);
    if (!mounted) return;
    _message(context, rejete ? 'Lien rejeté.' : 'Rejet impossible.');
    if (rejete) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final liens = widget.service.liensEnAttente;
    return PageAdmin(
      titre: 'Liens parent-enfant',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : liens.isEmpty
              ? const Center(
                  child: _Vide('Aucun lien en attente de validation.'),
                )
              : ListView(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
                  children: [
                    for (final l in liens)
                      _Ligne(
                        titre: l.enfantNom,
                        sousTitre: [
                          l.parentNom,
                          l.enfantMatricule,
                          if (l.creeLe != null) afficherDate(l.creeLe!),
                        ].join(' · '),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            FilledButton(
                              onPressed: () => _valider(l),
                              child: const Text('Valider'),
                            ),
                            const SizedBox(width: 4),
                            TextButton(
                              onPressed: () => _rejeter(l),
                              child: const Text('Rejeter'),
                            ),
                          ],
                        ),
                      ),
                  ],
                ),
    );
  }
}

/// Département scolaire.
class PageDepartementScolaire extends StatefulWidget {
  const PageDepartementScolaire({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageDepartementScolaire> createState() =>
      _PageDepartementScolaireState();
}

class _PageDepartementScolaireState extends State<PageDepartementScolaire> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerSuivisScolaires();
    await widget.service.chargerMembresAdmin();
    if (mounted) setState(() => _charge = true);
  }

  double? _moyenne(String texte) {
    if (texte.trim().isEmpty) return null;
    final v = double.tryParse(texte.trim().replaceAll(',', '.'));
    if (v == null || v < 0 || v > 20) return null;
    return v;
  }

  Future<void> _creer() async {
    final personne = await _choisirPersonne(context, widget.service);
    if (personne == null) return;
    String classe = '6e';
    final annee = TextEditingController(
      text: '${DateTime.now().year}-${DateTime.now().year + 1}',
    );
    final t1 = TextEditingController();
    final t2 = TextEditingController();
    final t3 = TextEditingController();
    var examen = false;
    String typeExamen = 'bepc';
    String resultat = 'admis';
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: Text('Suivi de ${personne.nom}'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DropdownButtonFormField<String>(
                  value: classe,
                  decoration: const InputDecoration(
                    labelText: 'Classe',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    for (final c in classesScolaires)
                      DropdownMenuItem(value: c, child: Text(c)),
                  ],
                  onChanged: (v) => setEtat(() => classe = v ?? classe),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: annee,
                  decoration: const InputDecoration(
                    labelText: 'Année scolaire',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    for (final (controle, libelle) in [
                      (t1, 'T1'),
                      (t2, 'T2'),
                      (t3, 'T3'),
                    ])
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.only(right: 6),
                          child: TextField(
                            controller: controle,
                            keyboardType: const TextInputType.numberWithOptions(
                              decimal: true,
                            ),
                            decoration: InputDecoration(
                              labelText: libelle,
                              border: const OutlineInputBorder(),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
                CheckboxListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Examen'),
                  value: examen,
                  onChanged: (v) => setEtat(() => examen = v ?? false),
                ),
                if (examen) ...[
                  DropdownButtonFormField<String>(
                    value: typeExamen,
                    decoration: const InputDecoration(
                      labelText: 'Type d’examen',
                      border: OutlineInputBorder(),
                    ),
                    items: const [
                      DropdownMenuItem(value: 'bepc', child: Text('BEPC')),
                      DropdownMenuItem(value: 'bac', child: Text('BAC')),
                      DropdownMenuItem(value: 'autre', child: Text('Autre')),
                    ],
                    onChanged: (v) =>
                        setEtat(() => typeExamen = v ?? typeExamen),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    value: resultat,
                    decoration: const InputDecoration(
                      labelText: 'Résultat',
                      border: OutlineInputBorder(),
                    ),
                    items: const [
                      DropdownMenuItem(value: 'admis', child: Text('Admis')),
                      DropdownMenuItem(
                        value: 'ajourne',
                        child: Text('Ajourné'),
                      ),
                    ],
                    onChanged: (v) => setEtat(() => resultat = v ?? resultat),
                  ),
                ],
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Enregistrer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    final cree = await widget.service.creerSuiviScolaire({
      if (!personne.externe) 'membre_id': personne.id,
      if (personne.externe) 'personne_externe_id': personne.id,
      'classe': classe,
      'annee_scolaire': annee.text.trim(),
      'moyenne_t1': _moyenne(t1.text),
      'moyenne_t2': _moyenne(t2.text),
      'moyenne_t3': _moyenne(t3.text),
      'examen': examen,
      if (examen) 'type_examen': typeExamen,
      if (examen) 'resultat_examen': resultat,
    });
    if (!mounted) return;
    _message(
        context, cree ? 'Suivi enregistré.' : 'Enregistrement impossible.');
    if (cree) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final suivis = widget.service.suivisScolaires;
    return PageAdmin(
      titre: 'Département scolaire',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                FilledButton.icon(
                  onPressed: _creer,
                  icon: const Icon(Icons.school_outlined),
                  label: const Text('Nouveau suivi'),
                ),
                const SizedBox(height: 12),
                if (suivis.isEmpty)
                  const _Vide('Aucun suivi scolaire.')
                else
                  for (final s in suivis)
                    _Ligne(
                      titre: s.membreNom,
                      sousTitre: [
                        s.classe,
                        s.anneeScolaire,
                        if (s.moyenneAnnuelle != null)
                          'Moyenne annuelle : ${s.moyenneAnnuelle}',
                        if (s.examen)
                          'Examen ${s.typeExamen} : ${s.resultatExamen}',
                        if (s.estExterne) 'Hors système',
                      ].join(' · '),
                    ),
              ],
            ),
    );
  }
}

/// Tremplin professionnel, côté Bureau. Pas de route serveur :
/// les offres sont stockées sur cet appareil, comme dans le
/// service T9, en attendant une tranche serveur.
class PageTremplinBureau extends StatefulWidget {
  const PageTremplinBureau({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageTremplinBureau> createState() => _PageTremplinBureauState();
}

class _PageTremplinBureauState extends State<PageTremplinBureau> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerOffresLocales();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _ajouter() async {
    final titre = TextEditingController();
    final organisme = TextEditingController();
    final ville = TextEditingController();
    final contact = TextEditingController();
    String type = 'emploi';
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: const Text('Nouvelle offre'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titre,
                decoration: const InputDecoration(labelText: 'Titre'),
              ),
              DropdownButtonFormField<String>(
                value: type,
                decoration: const InputDecoration(labelText: 'Type'),
                items: const [
                  DropdownMenuItem(value: 'emploi', child: Text('Emploi')),
                  DropdownMenuItem(value: 'stage', child: Text('Stage')),
                  DropdownMenuItem(
                    value: 'formation',
                    child: Text('Formation'),
                  ),
                ],
                onChanged: (v) => setEtat(() => type = v ?? type),
              ),
              TextField(
                controller: organisme,
                decoration: const InputDecoration(
                  labelText: 'Organisme (facultatif)',
                ),
              ),
              TextField(
                controller: ville,
                decoration: const InputDecoration(
                  labelText: 'Ville (facultatif)',
                ),
              ),
              TextField(
                controller: contact,
                decoration: const InputDecoration(
                  labelText: 'Contact (facultatif)',
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Ajouter'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    if (titre.text.trim().isEmpty) {
      _message(context, 'Le titre est obligatoire.');
      return;
    }
    final ajoute = await widget.service.ajouterOffreLocale(
      OffreOpportunite(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        titre: titre.text.trim(),
        type: type,
        pays: 'Côte d’Ivoire',
        organisme: organisme.text.trim(),
        ville: ville.text.trim(),
        contact: contact.text.trim(),
      ),
    );
    if (!mounted) return;
    _message(context, ajoute ? 'Offre ajoutée.' : 'Ajout impossible.');
    if (ajoute) setState(() {});
  }

  Future<void> _retirer(OffreOpportunite o) async {
    final ok = await _confirmer(
      context,
      'Retirer cette offre',
      '« ${o.titre} » ne sera plus visible.',
    );
    if (!ok) return;
    final retire = await widget.service.retirerOffreLocale(o.id);
    if (!mounted) return;
    _message(context, retire ? 'Offre retirée.' : 'Retrait impossible.');
    if (retire) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final offres = widget.service.offresLocales;
    return PageAdmin(
      titre: 'Tremplin professionnel',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                const Text(
                  'Les offres sont stockées sur cet appareil, en '
                  'attendant une route serveur.',
                  style: TextStyle(fontSize: 13, color: Colors.black54),
                ),
                const SizedBox(height: 12),
                FilledButton.icon(
                  onPressed: _ajouter,
                  icon: const Icon(Icons.work_outline),
                  label: const Text('Nouvelle offre'),
                ),
                const SizedBox(height: 12),
                if (offres.isEmpty)
                  const _Vide('Aucune offre pour le moment.')
                else
                  for (final o in offres)
                    _Ligne(
                      titre: o.titre,
                      sousTitre: [
                        o.type,
                        if (o.organisme.isNotEmpty) o.organisme,
                        if (o.ville.isNotEmpty) o.ville,
                      ].join(' · '),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete_outlined),
                        onPressed: () => _retirer(o),
                      ),
                    ),
              ],
            ),
    );
  }
}

/// Planning des responsables.
class PagePlanningResponsables extends StatefulWidget {
  const PagePlanningResponsables({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PagePlanningResponsables> createState() =>
      _PagePlanningResponsablesState();
}

class _PagePlanningResponsablesState extends State<PagePlanningResponsables> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerPlannings();
    await widget.service.chargerMembresAdmin();
    await widget.service.chargerEvenements();
    if (mounted) setState(() => _charge = true);
  }

  String _dateIso(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-'
      '${d.day.toString().padLeft(2, '0')}';

  Future<void> _creer() async {
    final personne = await _choisirPersonne(context, widget.service);
    if (personne == null) return;
    final activite = TextEditingController();
    final heureDebut = TextEditingController();
    final heureFin = TextEditingController();
    final roleService = TextEditingController();
    DateTime date = DateTime.now();
    String? evenementId;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: Text('Créneau pour ${personne.nom}'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: activite,
                  decoration: const InputDecoration(labelText: 'Activité'),
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Date'),
                  subtitle: Text(afficherDate(date)),
                  trailing: TextButton(
                    onPressed: () async {
                      final d = await _choisirDate(context, date);
                      if (d != null) setEtat(() => date = d);
                    },
                    child: const Text('Choisir'),
                  ),
                ),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: heureDebut,
                        decoration: const InputDecoration(
                          labelText: 'Début (HH:MM)',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        controller: heureFin,
                        decoration: const InputDecoration(
                          labelText: 'Fin (HH:MM)',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: roleService,
                  decoration: const InputDecoration(
                    labelText: 'Rôle de service (facultatif)',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String?>(
                  value: evenementId,
                  decoration: const InputDecoration(
                    labelText: 'Événement (facultatif)',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    const DropdownMenuItem(
                      value: null,
                      child: Text('Aucun'),
                    ),
                    for (final e in widget.service.evenements)
                      DropdownMenuItem(value: e.id, child: Text(e.nom)),
                  ],
                  onChanged: (v) => setEtat(() => evenementId = v),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Créer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    if (activite.text.trim().isEmpty) {
      _message(context, 'L’activité est obligatoire.');
      return;
    }
    final cree = await widget.service.creerPlanning({
      if (!personne.externe) 'membre_id': personne.id,
      if (personne.externe) 'personne_externe_id': personne.id,
      'activite': activite.text.trim(),
      'date': _dateIso(date),
      if (heureDebut.text.trim().isNotEmpty)
        'heure_debut': heureDebut.text.trim(),
      if (heureFin.text.trim().isNotEmpty) 'heure_fin': heureFin.text.trim(),
      if (roleService.text.trim().isNotEmpty)
        'role_service': roleService.text.trim(),
      if (evenementId != null) 'evenement_id': evenementId,
    });
    if (!mounted) return;
    _message(context, cree ? 'Créneau créé.' : 'Création impossible.');
    if (cree) setState(() {});
  }

  Future<void> _modifier(PlanningResponsable p) async {
    final activite = TextEditingController(text: p.titre);
    final heureDebut = TextEditingController(text: p.heureDebut);
    final heureFin = TextEditingController(text: p.heureFin);
    final roleService = TextEditingController(text: p.roleService);
    DateTime date = p.date ?? DateTime.now();
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: const Text('Modifier le créneau'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: activite,
                decoration: const InputDecoration(labelText: 'Activité'),
              ),
              ListTile(
                contentPadding: EdgeInsets.zero,
                title: const Text('Date'),
                subtitle: Text(afficherDate(date)),
                trailing: TextButton(
                  onPressed: () async {
                    final d = await _choisirDate(context, date);
                    if (d != null) setEtat(() => date = d);
                  },
                  child: const Text('Choisir'),
                ),
              ),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: heureDebut,
                      decoration: const InputDecoration(
                        labelText: 'Début (HH:MM)',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: TextField(
                      controller: heureFin,
                      decoration: const InputDecoration(
                        labelText: 'Fin (HH:MM)',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              TextField(
                controller: roleService,
                decoration: const InputDecoration(
                  labelText: 'Rôle de service (facultatif)',
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Enregistrer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    final modifie = await widget.service.modifierPlanning(p.id, {
      if (p.membreId.isNotEmpty) 'membre_id': p.membreId,
      if (p.personneExterneId.isNotEmpty)
        'personne_externe_id': p.personneExterneId,
      'activite': activite.text.trim(),
      'date': _dateIso(date),
      if (heureDebut.text.trim().isNotEmpty)
        'heure_debut': heureDebut.text.trim(),
      if (heureFin.text.trim().isNotEmpty) 'heure_fin': heureFin.text.trim(),
      if (roleService.text.trim().isNotEmpty)
        'role_service': roleService.text.trim(),
    });
    if (!mounted) return;
    _message(
      context,
      modifie ? 'Créneau modifié.' : 'Modification impossible.',
    );
    if (modifie) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final plannings = widget.service.plannings;
    return PageAdmin(
      titre: 'Planning des responsables',
      enfant: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
              children: [
                FilledButton.icon(
                  onPressed: _creer,
                  icon: const Icon(Icons.calendar_month_outlined),
                  label: const Text('Nouveau créneau'),
                ),
                const SizedBox(height: 12),
                if (plannings.isEmpty)
                  const _Vide('Aucun créneau planifié.')
                else
                  for (final p in plannings)
                    _Ligne(
                      titre: p.titre,
                      sousTitre: [
                        p.membreNom,
                        if (p.date != null) afficherDate(p.date!),
                        if (p.heureDebut.isNotEmpty) p.heureDebut,
                        if (p.heureFin.isNotEmpty) '– ${p.heureFin}',
                        if (p.roleService.isNotEmpty) p.roleService,
                        if (p.estExterne) 'Hors système',
                      ].join(' · '),
                      trailing:
                          p.membreId.isEmpty && p.personneExterneId.isEmpty
                              ? null
                              : IconButton(
                                  icon: const Icon(Icons.edit_outlined),
                                  onPressed: () => _modifier(p),
                                ),
                    ),
              ],
            ),
    );
  }
}

/// Réglages des notifications : les 15 catégories locales, avec
/// leurs libellés. Le réglage est gardé sur l'appareil et envoyé
/// avec le jeton FCM, pour que le serveur filtre avant d'envoyer.
class PageReglagesNotifications extends StatefulWidget {
  const PageReglagesNotifications({super.key});

  @override
  State<PageReglagesNotifications> createState() =>
      _PageReglagesNotificationsState();
}

class _PageReglagesNotificationsState extends State<PageReglagesNotifications> {
  @override
  void initState() {
    super.initState();
    notifSettings.load();
    notifSettings.addListener(_rafraichir);
  }

  @override
  void dispose() {
    notifSettings.removeListener(_rafraichir);
    super.dispose();
  }

  void _rafraichir() {
    if (mounted) setState(() {});
  }

  Future<void> _basculer(String type, bool valeur) async {
    await notifSettings.setCategory(type, valeur);
    await PushNotifications.instance.syncCategories();
  }

  @override
  Widget build(BuildContext context) {
    return PageAdmin(
      titre: 'Réglages des notifications',
      enfant: ListView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
        children: [
          const Text(
            'Les catégories désactivées ne sont plus envoyées par '
            'le serveur.',
            style: TextStyle(fontSize: 13, color: Colors.black54),
          ),
          const SizedBox(height: 12),
          for (final type in NotifSettings.types)
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: SwitchListTile(
                title: Text(notifSettings.label(type)),
                value: notifSettings.enabled(type),
                onChanged: (v) => _basculer(type, v),
              ),
            ),
        ],
      ),
    );
  }
}
