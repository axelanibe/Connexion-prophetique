// Fiche membre côté Bureau, tranche T14, 26 nov. 2026.
// Détail d'un membre pour l'administration (GET
// /admin/membres/:id), avec Corriger, nom, date de naissance,
// établissement, carte 108, et validation et suspension de
// l'adhésion sur la même fiche, carte 110. Le matricule ne
// change jamais, la carte déjà validée reste valide. Routes
// déjà dans lib/api.dart, aucun ajout serveur.
import 'package:flutter/material.dart';

import '../app_models.dart';
import 'modeles_profil.dart' show afficherDate;
import 'modeles_t14.dart';
import 'modeles_t15.dart';
import 'page_carte.dart';
import 'palette.dart';
import 'service_t14.dart';

class PageFicheMembreAdmin extends StatefulWidget {
  const PageFicheMembreAdmin({
    super.key,
    required this.service,
    required this.membreId,
    this.nomInitial = '',
  });
  final ServiceT14 service;
  final String membreId;
  final String nomInitial;

  @override
  State<PageFicheMembreAdmin> createState() => _PageFicheMembreAdminState();
}

class _PageFicheMembreAdminState extends State<PageFicheMembreAdmin> {
  var _charge = false;
  MembreAdmin? _detail;
  var _occupe = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerEtablissements();
    final detail =
        await widget.service.chargerDetailMembre(widget.membreId);
    if (mounted) {
      setState(() {
        _detail = detail;
        _charge = true;
      });
    }
  }

  void _toast(String message) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  Future<void> _corriger() async {
    final detail = _detail;
    if (detail == null) return;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => CorrigerMembreDialog(
        nomInitial: detail.nomComplet,
        naissanceInitiale: detail.dateNaissance,
        etablissementIdInitial: detail.etablissementId,
        etablissementInitial: detail.etablissement,
        etablissements: widget.service.etablissements,
        onEnregistrer: ({
          required String nom,
          String? naissanceIso,
          String? etablissementId,
        }) =>
            widget.service.corrigerMembre(
          membreId: widget.membreId,
          nomComplet: nom,
          dateNaissance: naissanceIso,
          etablissementId: etablissementId,
        ),
      ),
    );
    if (ok != true || !mounted) return;
    _toast('Informations corrigées.');
    setState(() => _charge = false);
    await _charger();
  }

  Future<void> _validerAdhesion() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: const Text('Valider l’adhésion ?'),
        content: const Text(
            'Le certificat PDF sera créé et envoyé par e-mail au membre.'),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(c, false),
              child: const Text('Annuler')),
          FilledButton(
              onPressed: () => Navigator.pop(c, true),
              child: const Text('Valider')),
        ],
      ),
    );
    if (ok != true) return;
    setState(() => _occupe = true);
    final fait = await widget.service.validerAdhesion(widget.membreId);
    if (!mounted) return;
    setState(() => _occupe = false);
    if (fait) {
      _toast('Adhésion validée. Certificat émis.');
      setState(() => _charge = false);
      await _charger();
    } else {
      _toast('Action impossible. Vérifiez votre connexion.');
    }
  }

  Future<void> _suspendreAdhesion() async {
    final motif = await showDialog<String>(
      context: context,
      builder: (c) => const _SuspendreDialog(),
    );
    if (motif == null) return;
    if (motif.length < 3) {
      _toast('Indiquez un motif d’au moins 3 caractères.');
      return;
    }
    setState(() => _occupe = true);
    final fait =
        await widget.service.suspendreAdhesion(widget.membreId, motif);
    if (!mounted) return;
    setState(() => _occupe = false);
    if (fait) {
      _toast('Adhésion suspendue. Certificat révoqué.');
      setState(() => _charge = false);
      await _charger();
    } else {
      _toast('Action impossible. Vérifiez votre connexion.');
    }
  }

  /// Carte du membre, correction de suivi 27 nov. 2026 :
  /// la carte du membre, avec ses vraies données, depuis
  /// sa fiche. L'état vient de son adhésion.
  void _voirCarte(MembreAdmin detail) {
    final membre = Member(
      detail.nomComplet,
      detail.matricule,
      detail.etablissement,
      DateTime.tryParse(detail.inscritLe) ?? DateTime.now(),
      fonction: detail.fonction,
      photoData: detail.photo ?? '',
      validUntilOverride: DateTime.tryParse(detail.valideJusqua),
      telephone: detail.telephone,
      email: detail.email,
      statutAdhesion: detail.statutAdhesion,
    );
    final etat = switch (detail.statutAdhesion) {
      'validee' => EtatCarte.validee,
      'en_attente' => EtatCarte.enAttente,
      _ => EtatCarte.verrouillee,
    };
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => _PageCarteMembre(membre: membre, etat: etat),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final detail = _detail;
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text(
          'Fiche membre',
          style: TextStyle(color: PaletteNouvelle.bleuNuit),
        ),
        iconTheme: const IconThemeData(color: PaletteNouvelle.bleuNuit),
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : detail == null
              ? Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Text('Membre introuvable.'),
                      const SizedBox(height: 12),
                      OutlinedButton(
                        onPressed: () {
                          setState(() => _charge = false);
                          _charger();
                        },
                        child: const Text('Réessayer'),
                      ),
                    ],
                  ),
                )
              : ListView(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
                  children: [
                    Text(
                      detail.nomComplet,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.w800,
                        color: PaletteNouvelle.bleuNuit,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      [
                        detail.matricule,
                        if (detail.fonction.isNotEmpty) detail.fonction,
                        if (detail.etablissement.isNotEmpty)
                          detail.etablissement,
                      ].join(' · '),
                      style:
                          const TextStyle(color: Colors.grey, fontSize: 14),
                    ),
                    if (detail.validiteTexte.isNotEmpty) ...[
                      const SizedBox(height: 4),
                      Text(
                        'Valide jusqu’au ${detail.validiteTexte}',
                        style: const TextStyle(
                            color: Colors.grey, fontSize: 14),
                      ),
                    ],
                    const SizedBox(height: 16),
                    if (detail.telephone.isNotEmpty ||
                        detail.email.isNotEmpty)
                      Card(
                        color: Colors.white,
                        margin: const EdgeInsets.only(bottom: 16),
                        child: Column(
                          children: [
                            if (detail.telephone.isNotEmpty)
                              ListTile(
                                leading: const Icon(Icons.phone_outlined,
                                    color: PaletteNouvelle.bleuNuit),
                                title: const Text('Téléphone'),
                                subtitle: Text(detail.telephone),
                              ),
                            if (detail.email.isNotEmpty)
                              ListTile(
                                leading: const Icon(Icons.email_outlined,
                                    color: PaletteNouvelle.bleuNuit),
                                title: const Text('E-mail'),
                                subtitle: Text(detail.email),
                              ),
                          ],
                        ),
                      ),
                    Card(
                      color: Colors.white,
                      margin: const EdgeInsets.only(bottom: 16),
                      child: ListTile(
                        leading: const Icon(Icons.payments_outlined,
                            color: PaletteNouvelle.bleuNuit),
                        title: const Text('Cotisation'),
                        subtitle: Text(detail.libelleCotisation),
                      ),
                    ),
                    Card(
                      color: Colors.white,
                      margin: const EdgeInsets.only(bottom: 16),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Adhésion',
                              style: TextStyle(fontWeight: FontWeight.w700),
                            ),
                            const SizedBox(height: 4),
                            Text(detail.libelleAdhesion),
                            const SizedBox(height: 12),
                            Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: [
                                if (!detail.adhesionValidee)
                                  FilledButton.icon(
                                    onPressed: _occupe
                                        ? null
                                        : _validerAdhesion,
                                    icon: const Icon(
                                        Icons.verified_outlined),
                                    label:
                                        const Text('Valider l’adhésion'),
                                  ),
                                if (detail.adhesionValidee)
                                  OutlinedButton.icon(
                                    onPressed: _occupe
                                        ? null
                                        : _suspendreAdhesion,
                                    icon:
                                        const Icon(Icons.block_outlined),
                                    label: const Text('Suspendre'),
                                  ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        OutlinedButton.icon(
                          onPressed: _corriger,
                          icon: const Icon(Icons.edit_outlined),
                          label: const Text('Corriger'),
                        ),
                        OutlinedButton.icon(
                          onPressed: () => _voirCarte(detail),
                          icon: const Icon(Icons.badge_outlined),
                          label: const Text('Voir la carte'),
                        ),
                      ],
                    ),
                  ],
                ),
    );
  }
}

/// Correction du nom d'un membre, carte 108 : nom complet, date
/// de naissance et établissement, dans le détail d'un membre côté
/// administrateur. Le matricule ne change jamais, il n'apparaît
/// pas ici. Le nom est vérifié avant l'envoi, règle des deux mots
/// de la carte 101, enregistré en majuscules, carte 125, et la
/// date est gardée en ISO AAAA-MM-JJ, null pour effacer.
class CorrigerMembreDialog extends StatefulWidget {
  const CorrigerMembreDialog({
    super.key,
    required this.nomInitial,
    required this.naissanceInitiale,
    required this.etablissementIdInitial,
    required this.etablissementInitial,
    required this.etablissements,
    required this.onEnregistrer,
  });
  final String nomInitial;
  final String naissanceInitiale;
  final String etablissementIdInitial;
  final String etablissementInitial;
  final List<EtablissementChoix> etablissements;
  final Future<bool> Function({
    required String nom,
    String? naissanceIso,
    String? etablissementId,
  }) onEnregistrer;

  @override
  State<CorrigerMembreDialog> createState() => _CorrigerMembreDialogState();
}

class _CorrigerMembreDialogState extends State<CorrigerMembreDialog> {
  late final TextEditingController _nomCtrl;
  DateTime? _naissance;
  String _etablissementId = '';
  bool _enregistrement = false;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _nomCtrl = TextEditingController(text: widget.nomInitial);
    _naissance = dateIsoVersDate(widget.naissanceInitiale);
    _etablissementId = widget.etablissementIdInitial;
  }

  @override
  void dispose() {
    _nomCtrl.dispose();
    super.dispose();
  }

  List<DropdownMenuItem<String>> get _etablissementItems {
    final items = <DropdownMenuItem<String>>[
      const DropdownMenuItem(
          value: '', child: Text('Aucun établissement')),
    ];
    final etabs = widget.etablissements;
    if (_etablissementId.isNotEmpty &&
        !etabs.any((e) => e.id == _etablissementId)) {
      items.add(DropdownMenuItem(
          value: _etablissementId,
          child: Text(widget.etablissementInitial)));
    }
    for (final e in etabs) {
      items.add(DropdownMenuItem(value: e.id, child: Text(e.nom)));
    }
    return items;
  }

  Future<void> _choisirDate() async {
    final maintenant = DateTime.now();
    final choisie = await showDatePicker(
      context: context,
      initialDate: _naissance ??
          DateTime(
              maintenant.year - 30, maintenant.month, maintenant.day),
      firstDate: DateTime(1900),
      lastDate: maintenant,
    );
    if (choisie != null) setState(() => _naissance = choisie);
  }

  Future<void> _enregistrer() async {
    final nom = nomMajuscules(_nomCtrl.text);
    if (!nomDeuxMots(nom)) {
      setState(() => _erreur = 'Écris ton prénom et ton nom.');
      return;
    }
    setState(() {
      _erreur = null;
      _enregistrement = true;
    });
    final ok = await widget.onEnregistrer(
      nom: nom,
      naissanceIso:
          _naissance == null ? null : isoDepuisDate(_naissance!),
      etablissementId: _etablissementId.isEmpty ? null : _etablissementId,
    );
    if (!mounted) return;
    if (ok) {
      Navigator.pop(context, true);
    } else {
      setState(() {
        _erreur = 'Enregistrement impossible pour le moment.';
        _enregistrement = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Corriger les informations'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              key: const ValueKey('corriger-membre-nom'),
              controller: _nomCtrl,
              textCapitalization: TextCapitalization.characters,
              decoration:
                  const InputDecoration(labelText: 'Nom complet'),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const Expanded(child: Text('Date de naissance')),
                TextButton(
                  onPressed: _choisirDate,
                  child: Text(_naissance == null
                      ? 'Non renseignée'
                      : afficherDate(_naissance!)),
                ),
                if (_naissance != null)
                  IconButton(
                    tooltip: 'Effacer',
                    onPressed: () => setState(() => _naissance = null),
                    icon: const Icon(Icons.clear),
                  ),
              ],
            ),
            DropdownButtonFormField<String>(
              value: _etablissementId,
              isExpanded: true,
              decoration:
                  const InputDecoration(labelText: 'Établissement'),
              items: _etablissementItems,
              onChanged: (v) =>
                  setState(() => _etablissementId = v ?? ''),
            ),
            if (_erreur != null) ...[
              const SizedBox(height: 8),
              Text(
                _erreur!,
                style: Theme.of(context)
                    .textTheme
                    .bodyMedium
                    ?.copyWith(color: PaletteNouvelle.rougeBadge),
              ),
            ],
          ],
        ),
      ),
      actions: [
        TextButton(
            onPressed: _enregistrement
                ? null
                : () => Navigator.pop(context, false),
            child: const Text('Annuler')),
        FilledButton(
            onPressed: _enregistrement ? null : _enregistrer,
            child: const Text('Enregistrer')),
      ],
    );
  }
}

/// Dialogue de suspension, carte 110 : le contrôleur du champ
/// motif appartient au dialogue lui-même.
class _SuspendreDialog extends StatefulWidget {
  const _SuspendreDialog();

  @override
  State<_SuspendreDialog> createState() => _SuspendreDialogState();
}

class _SuspendreDialogState extends State<_SuspendreDialog> {
  final _motifCtrl = TextEditingController();

  @override
  void dispose() {
    _motifCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Suspendre l’adhésion ?'),
      content: TextField(
        controller: _motifCtrl,
        maxLength: 300,
        decoration:
            const InputDecoration(labelText: 'Motif (obligatoire)'),
      ),
      actions: [
        TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Annuler')),
        FilledButton(
            onPressed: () => Navigator.pop(context, _motifCtrl.text.trim()),
            child: const Text('Suspendre')),
      ],
    );
  }
}

/// Carte d'un membre, vue par le Bureau, correction de
/// suivi 27 nov. 2026. Visuel seul, sans modification.
class _PageCarteMembre extends StatelessWidget {
  const _PageCarteMembre({required this.membre, required this.etat});
  final Member membre;
  final EtatCarte etat;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text(
          'Carte de ${membre.name}',
          style: const TextStyle(color: PaletteNouvelle.bleuNuit),
        ),
        iconTheme: const IconThemeData(color: PaletteNouvelle.bleuNuit),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: CartePremium(
            membre: membre,
            etat: etat,
            apercuDebloque: false,
          ),
        ),
      ),
    );
  }
}
