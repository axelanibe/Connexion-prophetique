// Info Emploi ou formation, absences et demandes à la structure,
// cartes 63, 64 et 65, 6 nov. 2026.
//
// Modèle suivi : ~/workspace/user/files/Bureau___Connexion_Prophe_tique.html,
// modèle de Claude IA pour le Bureau, fourni par Axel. Repris
// exactement, dans l'esprit : les listes PAYS, TYPES, DEM_TYPES
// et STATUTS (voir lib/app_models.dart), les deux onglets du
// Bureau Demandes et Offres publiées, les chiffres clés en haut,
// les filtres par statut, type et urgence, la carte de demande
// avec objet, nom du membre, type, date, pays, dates d'absence,
// description, sélecteur de statut et note interne Bureau
// uniquement, la carte urgente marquée en rouge, le bouton
// Valider et publier d'une Proposition d'opportunité qui ouvre
// la publication préremplie et passe la demande à Validée,
// le bouton Publier une offre et le retrait avec confirmation.
// Adapté, pas copié : le thème sombre ardoise du modèle
// (fond #070d24, cartes #0b1433, Inter, Playfair) n'est pas
// repris, l'application garde sa palette bleu nuit #0B1F3A,
// or #D4A72C, fond papier #F5F6FA, titres courts, chiffres et
// icônes d'abord. Les données ne viennent pas du modèle :
// aucune offre, aucune demande préremplie, listes vides au
// départ. La base de données du modèle (collections
// 'demandes' et 'offres') n'existe pas dans l'application :
// stockage local d'abord, comme les enseignements, en
// attendant le serveur, voir les limites dans le manifeste.
// Demandes privées, jamais publiées. Aucun montant, aucune
// règle de paiement, aucun périmètre changé.
import 'package:flutter/material.dart';
import 'i18n.dart';
import 'main.dart';

InputDecoration _decEmploi(String label) => InputDecoration(
      labelText: label,
      filled: true,
      fillColor: Cp.card,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
    );

String _dateCourte(String iso) {
  if (iso.isEmpty) return '';
  final parts = iso.split('-');
  if (parts.length != 3) return iso;
  return '${parts[2]}/${parts[1]}/${parts[0]}';
}

Future<bool> _confirmer(BuildContext c, String titre, String message) async {
  final ok = await showDialog<bool>(
    context: c,
    builder: (ctx) => AlertDialog(
      title: Text(titre),
      content: Text(message),
      actions: [
        TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
        FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Retirer'))),
      ],
    ),
  );
  return ok == true;
}

/// Couleurs de statut, adaptées au thème clair de l'application.
/// Le modèle mettait ces mêmes six statuts en pastilles sur fond
/// sombre ; ici les pastilles sont claires, texte foncé, même sens.
(Color, Color) _couleursStatut(String statut) {
  switch (statut) {
    case 'En cours':
      return (const Color(0xFFFDF4D8), Cp.goldDeep);
    case 'Traitée':
    case 'Validée':
      return (const Color(0xFFDCFCE7), const Color(0xFF166534));
    case 'En attente de validation':
      return (const Color(0xFFE0E7FF), const Color(0xFF3730A3));
    case 'Refusée':
      return (const Color(0xFFFEE2E2), const Color(0xFF991B1B));
    case 'Reçue':
    default:
      return (const Color(0xFFE8EAF0), Cp.navy);
  }
}

Widget _pastilleStatut(String statut) {
  final couleurs = _couleursStatut(statut);
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: couleurs.$1, borderRadius: BorderRadius.circular(999)),
    child: Text(statut, style: TextStyle(color: couleurs.$2, fontSize: 11, fontWeight: FontWeight.w800)),
  );
}

Widget _ligneMeta(IconData icone, String texte) => Padding(
      padding: const EdgeInsets.only(top: 2),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Icon(icone, size: 16, color: Cp.inkMuted),
        const SizedBox(width: 6),
        Expanded(child: Text(texte, style: const TextStyle(color: Cp.inkMuted, fontSize: 13, height: 1.4))),
      ]),
    );

// ───────────────────────────────────────────────────────────────────
// Carte 63 : Info Emploi ou formation
// ───────────────────────────────────────────────────────────────────

class OffresEmploiPage extends StatefulWidget {
  const OffresEmploiPage({super.key});

  @override
  State<OffresEmploiPage> createState() => _OffresEmploiPageState();
}

class _OffresEmploiPageState extends State<OffresEmploiPage> {
  String _typeFiltre = 'tous';
  // Filtre pays, carte 64 : par défaut le pays du membre quand
  // il est renseigné, jamais mélangé ; Tous les pays pour voir
  // les autres. Sans pays renseigné, Tous les pays par défaut.
  late String _paysFiltre;

  @override
  void initState() {
    super.initState();
    _paysFiltre = app.paysResidence.isEmpty ? 'tous' : app.paysResidence;
  }

  List<OffreEmploi> get _visibles {
    var liste = _paysFiltre == 'tous' ? app.offresEmploi : app.offresPourPays(_paysFiltre);
    if (_typeFiltre != 'tous') liste = liste.where((o) => o.type == _typeFiltre).toList();
    return liste;
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return live((c) => basic(tr('Info Emploi ou formation'), [
          if (app.isAdminGeneral)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  icon: const Icon(Icons.add),
                  label: Text(tr('Publier une offre')),
                  onPressed: () async {
                    final publiee = await Navigator.of(c).push<bool>(
                      MaterialPageRoute(builder: (_) => const FormulaireOffrePage()),
                    );
                    if (publiee == true && mounted) setState(() {});
                  },
                ),
              ),
            ),
          // Filtre pays, carte 64, repris du modèle par l'esprit :
          // le modèle filtrait par pays dans sa liste, ici le
          // filtre vaut Mon pays ou Tous les pays, jamais mélangé
          // par défaut.
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(children: [
              for (final p in <String>[
                if (app.paysResidence.isNotEmpty) app.paysResidence,
                'tous',
                ...kPaysResidence.where((p) => p != app.paysResidence),
              ])
                Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(p == 'tous'
                        ? tr('Tous les pays')
                        : p == app.paysResidence
                            ? '${tr('Mon pays')} ($p)'
                            : p),
                    selected: _paysFiltre == p,
                    onSelected: (_) => setState(() => _paysFiltre = p),
                  ),
                ),
            ]),
          ),
          const SizedBox(height: Cp.s1),
          // Types d'offre, modèle Bureau, cinq types exacts :
          // Emploi, Stage, Formation, Bourse, Bénévolat.
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(children: [
              for (final f in <(String, String)>[
                ('tous', 'Tous'),
                for (final type in kTypesOffre) (type, type),
              ])
                Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(tr(f.$2)),
                    selected: _typeFiltre == f.$1,
                    onSelected: (_) => setState(() => _typeFiltre = f.$1),
                  ),
                ),
            ]),
          ),
          const SizedBox(height: Cp.s1),
          if (app.offresEmploi.isEmpty)
            EmptyNote(
              icon: Icons.work_outline,
              text: tr('Aucune offre publiée pour le moment. La structure publie les offres depuis le Bureau, elles apparaissent ici selon votre pays.'),
            )
          else if (_visibles.isEmpty)
            EmptyNote(
              icon: Icons.work_outline,
              text: tr('Aucune offre pour ce filtre pour le moment. Essayez Tous les pays ou un autre type.'),
            )
          else
            ...[
              for (final o in _visibles)
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(Cp.s2),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Row(children: [
                          Expanded(child: Text(o.titre, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(color: const Color(0xFFFDF4D8), borderRadius: BorderRadius.circular(999)),
                            child: Text(o.type, style: const TextStyle(color: Cp.goldDeep, fontSize: 11, fontWeight: FontWeight.w800)),
                          ),
                        ]),
                        if (o.organisme.isNotEmpty) ...[const SizedBox(height: 2), Text(o.organisme, style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700))],
                        const SizedBox(height: 4),
                        _ligneMeta(Icons.public_outlined, o.pays),
                        if (o.ville.isNotEmpty) _ligneMeta(Icons.place_outlined, o.ville),
                        if (o.dateLimite.isNotEmpty) _ligneMeta(Icons.event_outlined, '${tr('Date limite')} : ${_dateCourte(o.dateLimite)}'),
                        if (o.publieeLe.isNotEmpty) _ligneMeta(Icons.calendar_month_outlined, '${tr('Publiée le')} ${_dateCourte(o.publieeLe)}'),
                        if (o.description.isNotEmpty) ...[
                          const SizedBox(height: 6),
                          Text(o.description, style: t.bodyMedium),
                        ],
                        if (o.contact.isNotEmpty) ...[
                          const SizedBox(height: 6),
                          _ligneMeta(Icons.contact_mail_outlined, o.contact),
                        ],
                      ]),
                    ),
                  ),
                ),
            ],
        ]));
  }
}

/// Formulaire de publication d'une offre, carte 63, côté
/// structure seulement. Champs du modèle Bureau : pays, type,
/// titre, lieu, description, date de publication ; champs de
/// la demande d'Axel gardés en plus : organisme, ville,
/// date limite, contact. La date de publication est la date
/// du jour, remplie seule, jamais saisie. Quand il vient
/// d'une Proposition d'opportunité, le formulaire est
/// prérempli avec son titre, sa description et son pays, et
/// la publication passe la demande à Validée.
class FormulaireOffrePage extends StatefulWidget {
  const FormulaireOffrePage({super.key, this.proposition});
  final DemandeMembre? proposition;

  @override
  State<FormulaireOffrePage> createState() => _FormulaireOffrePageState();
}

class _FormulaireOffrePageState extends State<FormulaireOffrePage> {
  late final TextEditingController _titre;
  late final TextEditingController _organisme;
  late final TextEditingController _ville;
  late final TextEditingController _description;
  late final TextEditingController _contact;
  late String _type;
  late String _pays;
  DateTime? _dateLimite;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    final p = widget.proposition;
    _titre = TextEditingController(text: p?.objet ?? '');
    _organisme = TextEditingController(text: p?.organisme ?? '');
    _ville = TextEditingController(text: p?.lieu ?? '');
    _description = TextEditingController(text: p?.description ?? '');
    _contact = TextEditingController(text: p?.contact ?? '');
    _type = p != null && kTypesOffre.contains(p.typeOffrePropose) ? p.typeOffrePropose : 'Emploi';
    _pays = p != null && kPaysResidence.contains(p.pays) ? p.pays : (app.paysResidence.isNotEmpty ? app.paysResidence : 'Côte d’Ivoire');
  }

  @override
  void dispose() {
    _titre.dispose();
    _organisme.dispose();
    _ville.dispose();
    _description.dispose();
    _contact.dispose();
    super.dispose();
  }

  void _publier() {
    final titre = _titre.text.trim();
    if (titre.isEmpty) {
      setState(() => _erreur = tr('Le titre est requis.'));
      return;
    }
    final offre = OffreEmploi(
      id: 'offre-${DateTime.now().millisecondsSinceEpoch}',
      titre: titre,
      type: _type,
      pays: _pays,
      organisme: _organisme.text.trim(),
      ville: _ville.text.trim(),
      dateLimite: _dateLimite == null ? '' : formatDateIso(_dateLimite!),
      description: _description.text.trim(),
      contact: _contact.text.trim(),
      publieeLe: formatDateIso(DateTime.now()),
    );
    final proposition = widget.proposition;
    if (proposition != null) {
      app.validerProposition(proposition, offre);
      toast(context, tr('Offre publiée, proposition validée.'));
    } else {
      app.ajouterOffre(offre);
      toast(context, tr('Offre publiée.'));
    }
    Navigator.of(context).pop(true);
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(widget.proposition != null ? tr('Valider et publier une proposition') : tr('Nouvelle offre'), [
      if (widget.proposition != null) ...[
        Text(tr('L’offre reprend le titre, la description et le pays de la proposition. La demande passera à Validée quand l’offre sera publiée.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        const SizedBox(height: Cp.s2),
      ],
      DropdownButtonFormField<String>(
        value: _pays,
        items: [for (final p in kPaysResidence) DropdownMenuItem(value: p, child: Text(p))],
        onChanged: (v) => setState(() => _pays = v ?? _pays),
        decoration: _decEmploi(tr('Pays')),
      ),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<String>(
        value: _type,
        items: [for (final type in kTypesOffre) DropdownMenuItem(value: type, child: Text(type))],
        onChanged: (v) => setState(() => _type = v ?? _type),
        decoration: _decEmploi(tr('Type')),
      ),
      const SizedBox(height: Cp.s2),
      TextField(controller: _titre, textCapitalization: TextCapitalization.sentences, decoration: _decEmploi(tr('Titre'))),
      const SizedBox(height: Cp.s2),
      TextField(controller: _organisme, textCapitalization: TextCapitalization.words, decoration: _decEmploi(tr('Organisme'))),
      const SizedBox(height: Cp.s2),
      TextField(controller: _ville, textCapitalization: TextCapitalization.words, decoration: _decEmploi(tr('Ville / lieu'))),
      const SizedBox(height: Cp.s2),
      TextField(controller: _description, maxLines: 4, textCapitalization: TextCapitalization.sentences, decoration: _decEmploi(tr('Description courte'))),
      const SizedBox(height: Cp.s2),
      TextField(controller: _contact, decoration: _decEmploi(tr('Contact'))),
      const SizedBox(height: Cp.s2),
      Card(
        child: ListTile(
          title: Text(_dateLimite == null ? tr('Date limite') : _dateCourte(formatDateIso(_dateLimite!))),
          subtitle: Text(tr('Facultative.')),
          trailing: Row(mainAxisSize: MainAxisSize.min, children: [
            if (_dateLimite != null)
              IconButton(tooltip: tr('Effacer'), icon: const Icon(Icons.clear_outlined), onPressed: () => setState(() => _dateLimite = null)),
            const Icon(Icons.calendar_month_outlined),
          ]),
          onTap: () async {
            final now = DateTime.now();
            final picked = await showDatePicker(context: context, initialDate: _dateLimite ?? now, firstDate: now, lastDate: DateTime(now.year + 2, now.month, now.day));
            if (picked != null) setState(() => _dateLimite = picked);
          },
        ),
      ),
      const SizedBox(height: Cp.s2),
      Text(tr('Publiée le : aujourd’hui, remplie seule.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
      if (_erreur != null) ...[
        const SizedBox(height: Cp.s2),
        Text(_erreur!, style: const TextStyle(color: Cp.danger)),
      ],
      const SizedBox(height: Cp.s2),
      SizedBox(
        height: 52,
        child: FilledButton.icon(onPressed: _publier, icon: const Icon(Icons.publish_outlined), label: Text(tr('Publier'))),
      ),
    ]);
  }
}

// ───────────────────────────────────────────────────────────────────
// Carte 65 : signaler une absence ou faire une demande, côté membre
// ───────────────────────────────────────────────────────────────────

class MesDemandesPage extends StatefulWidget {
  const MesDemandesPage({super.key});

  @override
  State<MesDemandesPage> createState() => _MesDemandesPageState();
}

class _MesDemandesPageState extends State<MesDemandesPage> {
  @override
  Widget build(BuildContext context) {
    final m = app.member;
    final miennes = m == null ? const <DemandeMembre>[] : app.demandesMembres.where((d) => d.matricule == m.matricule).toList();
    return live((c) => basic(tr('Mes absences et demandes'), [
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              icon: const Icon(Icons.add),
              label: Text(tr('Nouvelle demande')),
              onPressed: m == null
                  ? () => toast(c, tr('Connectez-vous pour envoyer une demande.'))
                  : () async {
                      final envoyee = await Navigator.of(c).push<bool>(
                        MaterialPageRoute(builder: (_) => const FormulaireDemandePage()),
                      );
                      if (envoyee == true && mounted) setState(() {});
                    },
            ),
          ),
          const SizedBox(height: Cp.s1),
          Text(
            tr('Vos demandes sont privées : vous seul et la structure les voyez. En attendant le serveur, elles sont gardées sur cet appareil.'),
            style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted),
          ),
          const SizedBox(height: Cp.s1),
          if (m == null)
            EmptyNote(icon: Icons.assignment_outlined, text: tr('Connectez-vous pour voir vos demandes.'))
          else if (miennes.isEmpty)
            EmptyNote(icon: Icons.assignment_outlined, text: tr('Aucune demande pour le moment. Signalez une absence ou faites une demande à la structure.'))
          else
            ...[
              for (final d in miennes)
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _CarteDemandeMembre(demande: d),
                ),
            ],
        ]));
  }
}

/// Carte d'une demande vue par son auteur : objet, type, date,
/// pays, dates d'absence, description et statut. Jamais la
/// note interne du Bureau, jamais les demandes des autres.
class _CarteDemandeMembre extends StatelessWidget {
  const _CarteDemandeMembre({required this.demande});
  final DemandeMembre demande;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final d = demande;
    return Card(
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(color: d.estUrgente ? Cp.danger : Colors.transparent, width: 1),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Expanded(child: Text(d.objet, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
              const SizedBox(width: 8),
              _pastilleStatut(d.statut),
            ]),
            const SizedBox(height: 4),
            _ligneMeta(Icons.category_outlined, d.type),
            _ligneMeta(Icons.calendar_month_outlined, _dateCourte(d.date)),
            if (d.pays.isNotEmpty) _ligneMeta(Icons.public_outlined, d.pays),
            if (d.estAbsence && d.debut.isNotEmpty) _ligneMeta(Icons.event_outlined, d.fin.isEmpty || d.fin == d.debut ? '${tr('Du')} ${_dateCourte(d.debut)}' : '${tr('Du')} ${_dateCourte(d.debut)} ${tr('au')} ${_dateCourte(d.fin)}'),
            if (d.estAbsence && d.activite.isNotEmpty) _ligneMeta(Icons.group_outlined, d.activite),
            if (d.estUrgente) ...[
              const SizedBox(height: 4),
              Text(tr('Urgente'), style: const TextStyle(color: Cp.danger, fontWeight: FontWeight.w800, fontSize: 13)),
            ],
            if (d.description.isNotEmpty) ...[
              const SizedBox(height: 6),
              Text(d.description, style: t.bodyMedium),
            ],
          ]),
        ),
      ),
    );
  }
}

/// Formulaire d'une demande, carte 65. Deux choix du membre :
/// Signaler mon absence, avec activité, dates et motif court,
/// ou Faire une demande, avec type, titre et description.
/// La Proposition d'opportunité part en En attente de
/// validation, jamais publiée directement ; les autres
/// demandes naissent Reçues. Urgence Normale par défaut.
class FormulaireDemandePage extends StatefulWidget {
  const FormulaireDemandePage({super.key});

  @override
  State<FormulaireDemandePage> createState() => _FormulaireDemandePageState();
}

class _FormulaireDemandePageState extends State<FormulaireDemandePage> {
  late final TextEditingController _objet;
  late final TextEditingController _description;
  late final TextEditingController _activiteLibre;
  late final TextEditingController _lieu;
  late final TextEditingController _organisme;
  late final TextEditingController _contact;
  String _type = 'Absence';
  String _urgence = 'Normale';
  String _pays = '';
  String _activite = '';
  String _typeOffrePropose = 'Emploi';
  DateTime? _debut;
  DateTime? _fin;
  String? _erreur;

  List<String> get _activites {
    final liste = <String>[
      for (final camp in app.camps) camp.name,
      for (final etab in app.etabs)
        for (final a in etab.activities) '${etab.name} : ${a.title}',
    ];
    return [...liste, 'Autre activité'];
  }

  @override
  void initState() {
    super.initState();
    _objet = TextEditingController();
    _description = TextEditingController();
    _activiteLibre = TextEditingController();
    _lieu = TextEditingController();
    _organisme = TextEditingController();
    _contact = TextEditingController();
    _pays = app.paysResidence;
    _activite = _activites.isNotEmpty ? _activites.first : 'Autre activité';
  }

  @override
  void dispose() {
    _objet.dispose();
    _description.dispose();
    _activiteLibre.dispose();
    _lieu.dispose();
    _organisme.dispose();
    _contact.dispose();
    super.dispose();
  }

  Future<DateTime?> _choisirDate(DateTime? initial) async {
    final now = DateTime.now();
    return showDatePicker(
      context: context,
      initialDate: initial ?? now,
      firstDate: DateTime(now.year - 1, now.month, now.day),
      lastDate: DateTime(now.year + 2, now.month, now.day),
    );
  }

  void _envoyer() {
    final m = app.member;
    if (m == null) {
      setState(() => _erreur = tr('Connectez-vous pour envoyer une demande.'));
      return;
    }
    final objet = _objet.text.trim();
    if (objet.isEmpty) {
      setState(() => _erreur = tr('L’objet est requis.'));
      return;
    }
    final estAbsence = _type == 'Absence';
    if (estAbsence && _debut == null) {
      setState(() => _erreur = tr('Choisissez la date de début de votre absence.'));
      return;
    }
    final activite = _activite == 'Autre activité' ? _activiteLibre.text.trim() : _activite;
    final estProposition = _type.startsWith('Proposition');
    final demande = DemandeMembre(
      id: 'demande-${DateTime.now().millisecondsSinceEpoch}',
      matricule: m.matricule,
      nomMembre: m.name,
      etablissement: m.etab,
      type: _type,
      objet: objet,
      description: _description.text.trim(),
      pays: _pays,
      urgence: _urgence,
      // Modèle Bureau : une proposition part en En attente
      // de validation, une autre demande naît Reçue.
      statut: estProposition ? 'En attente de validation' : 'Reçue',
      date: formatDateIso(DateTime.now()),
      activite: estAbsence ? activite : '',
      debut: estAbsence && _debut != null ? formatDateIso(_debut!) : '',
      fin: estAbsence && _fin != null ? formatDateIso(_fin!) : '',
      typeOffrePropose: estProposition ? _typeOffrePropose : '',
      lieu: estProposition ? _lieu.text.trim() : '',
      organisme: estProposition ? _organisme.text.trim() : '',
      contact: estProposition ? _contact.text.trim() : '',
    );
    app.ajouterDemande(demande);
    toast(context, tr('Demande enregistrée.'));
    Navigator.of(context).pop(true);
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final estAbsence = _type == 'Absence';
    final estProposition = _type.startsWith('Proposition');
    return basic(tr('Nouvelle demande'), [
      DropdownButtonFormField<String>(
        value: _type,
        items: [for (final type in kTypesDemande) DropdownMenuItem(value: type, child: Text(type))],
        onChanged: (v) => setState(() => _type = v ?? _type),
        decoration: _decEmploi(tr('Type de demande')),
      ),
      const SizedBox(height: Cp.s2),
      TextField(controller: _objet, textCapitalization: TextCapitalization.sentences, decoration: _decEmploi(tr('Objet'))),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<String>(
        value: _urgence,
        items: [for (final u in kUrgencesDemande) DropdownMenuItem(value: u, child: Text(u))],
        onChanged: (v) => setState(() => _urgence = v ?? _urgence),
        decoration: _decEmploi(tr('Urgence')),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('Une demande urgente est marquée en rouge pour la structure.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<String>(
        value: _pays.isEmpty ? null : _pays,
        items: [for (final p in kPaysResidence) DropdownMenuItem(value: p, child: Text(p))],
        onChanged: (v) => setState(() => _pays = v ?? ''),
        decoration: _decEmploi(tr('Pays')),
      ),
      if (estAbsence) ...[
        const SizedBox(height: Cp.s2),
        DropdownButtonFormField<String>(
          value: _activite,
          items: [for (final a in _activites) DropdownMenuItem(value: a, child: Text(a))],
          onChanged: (v) => setState(() => _activite = v ?? _activite),
          decoration: _decEmploi(tr('Activité')),
        ),
        if (_activite == 'Autre activité') ...[
          const SizedBox(height: Cp.s2),
          TextField(controller: _activiteLibre, decoration: _decEmploi(tr('Précisez l’activité'))),
        ],
        const SizedBox(height: Cp.s2),
        Card(
          child: ListTile(
            title: Text(_debut == null ? tr('Date de début') : _dateCourte(formatDateIso(_debut!))),
            trailing: const Icon(Icons.calendar_month_outlined),
            onTap: () async {
              final picked = await _choisirDate(_debut);
              if (picked != null) setState(() => _debut = picked);
            },
          ),
        ),
        const SizedBox(height: Cp.s2),
        Card(
          child: ListTile(
            title: Text(_fin == null ? tr('Date de fin') : _dateCourte(formatDateIso(_fin!))),
            subtitle: Text(tr('Facultative, même jour si vide.')),
            trailing: Row(mainAxisSize: MainAxisSize.min, children: [
              if (_fin != null)
                IconButton(tooltip: tr('Effacer'), icon: const Icon(Icons.clear_outlined), onPressed: () => setState(() => _fin = null)),
              const Icon(Icons.calendar_month_outlined),
            ]),
            onTap: () async {
              final picked = await _choisirDate(_fin ?? _debut);
              if (picked != null) setState(() => _fin = picked);
            },
          ),
        ),
      ],
      if (estProposition) ...[
        const SizedBox(height: Cp.s2),
        Text(tr('Votre proposition part en En attente de validation. La structure la valide avant de la publier, elle n’apparaît jamais directement dans les offres.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        const SizedBox(height: Cp.s2),
        DropdownButtonFormField<String>(
          value: _typeOffrePropose,
          items: [for (final type in kTypesOffre) DropdownMenuItem(value: type, child: Text(type))],
          onChanged: (v) => setState(() => _typeOffrePropose = v ?? _typeOffrePropose),
          decoration: _decEmploi(tr('Type d’offre proposé')),
        ),
        const SizedBox(height: Cp.s2),
        TextField(controller: _lieu, decoration: _decEmploi(tr('Lieu'))),
        const SizedBox(height: Cp.s2),
        TextField(controller: _organisme, decoration: _decEmploi(tr('Organisme'))),
        const SizedBox(height: Cp.s2),
        TextField(controller: _contact, decoration: _decEmploi(tr('Contact'))),
      ],
      const SizedBox(height: Cp.s2),
      TextField(
        controller: _description,
        maxLines: 4,
        textCapitalization: TextCapitalization.sentences,
        decoration: _decEmploi(estAbsence ? tr('Motif court') : tr('Description')),
      ),
      if (_erreur != null) ...[
        const SizedBox(height: Cp.s2),
        Text(_erreur!, style: const TextStyle(color: Cp.danger)),
      ],
      const SizedBox(height: Cp.s2),
      SizedBox(
        height: 52,
        child: FilledButton.icon(onPressed: _envoyer, icon: const Icon(Icons.send_outlined), label: Text(tr('Envoyer à la structure'))),
      ),
    ]);
  }
}

// ───────────────────────────────────────────────────────────────────
// Bureau, Espace Structure : Demandes et Offres publiées, modèle Bureau
// ───────────────────────────────────────────────────────────────────

class BureauEmploiPage extends StatefulWidget {
  const BureauEmploiPage({super.key});

  @override
  State<BureauEmploiPage> createState() => _BureauEmploiPageState();
}

class _BureauEmploiPageState extends State<BureauEmploiPage> {
  bool _ongletDemandes = true;
  String _filtreStatut = '';
  String _filtreType = '';
  String _filtreUrgence = '';

  List<DemandeMembre> get _demandesFiltrees {
    return app.demandesPourAdmin().where((d) {
      if (_filtreStatut.isNotEmpty && d.statut != _filtreStatut) return false;
      if (_filtreType.isNotEmpty && d.type != _filtreType) return false;
      if (_filtreUrgence.isNotEmpty && d.urgence != _filtreUrgence) return false;
      return true;
    }).toList();
  }

  Widget _chiffre(String valeur, String libelle, Color couleurValeur) => Expanded(
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
          decoration: BoxDecoration(color: Cp.card, borderRadius: BorderRadius.circular(Cp.radiusCard), border: Border.all(color: Cp.line)),
          child: Column(children: [
            Text(valeur, style: TextStyle(color: couleurValeur, fontSize: 26, fontWeight: FontWeight.w800, height: 1.1)),
            const SizedBox(height: 4),
            Text(libelle, textAlign: TextAlign.center, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Cp.inkMuted, fontSize: 12, fontWeight: FontWeight.w700)),
          ]),
        ),
      );

  @override
  Widget build(BuildContext context) {
    if (!app.isAdmin) {
      return basic(tr('Emploi et demandes'), [
        Text(tr('Accès réservé aux administrateurs de la structure.'), style: Theme.of(context).textTheme.bodyMedium),
      ]);
    }
    final visibles = app.demandesPourAdmin();
    final aTraiter = visibles.where((d) => d.statut == 'Reçue' || d.statut == 'En cours').length;
    final propositions = visibles.where((d) => d.statut == 'En attente de validation').length;
    return live((c) => basic(tr('Emploi et demandes'), [
          SegmentedButton<bool>(
            segments: [
              ButtonSegment(value: true, label: Text(tr('Demandes'))),
              ButtonSegment(value: false, label: Text(tr('Offres publiées'))),
            ],
            selected: {_ongletDemandes},
            onSelectionChanged: (s) => setState(() => _ongletDemandes = s.first),
          ),
          const SizedBox(height: Cp.s2),
          if (_ongletDemandes) ...[
            Row(children: [
              _chiffre('$aTraiter', tr('à traiter'), Cp.goldDeep),
              const SizedBox(width: 8),
              _chiffre('$propositions', tr('propositions'), Cp.navy),
              const SizedBox(width: 8),
              _chiffre('${visibles.length}', tr('au total'), Cp.navy),
            ]),
            const SizedBox(height: Cp.s2),
            Row(children: [
              Expanded(
                child: DropdownButtonFormField<String>(
                  value: _filtreStatut.isEmpty ? null : _filtreStatut,
                  items: [
                    DropdownMenuItem(value: '', child: Text(tr('Tout statut'))),
                    for (final s in kStatutsDemande) DropdownMenuItem(value: s, child: Text(s)),
                  ],
                  onChanged: (v) => setState(() => _filtreStatut = v ?? ''),
                  decoration: _decEmploi(tr('Statut')),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: DropdownButtonFormField<String>(
                  value: _filtreType.isEmpty ? null : _filtreType,
                  items: [
                    DropdownMenuItem(value: '', child: Text(tr('Tout type'))),
                    for (final type in kTypesDemande) DropdownMenuItem(value: type, child: Text(type)),
                  ],
                  onChanged: (v) => setState(() => _filtreType = v ?? ''),
                  decoration: _decEmploi(tr('Type')),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: DropdownButtonFormField<String>(
                  value: _filtreUrgence.isEmpty ? null : _filtreUrgence,
                  items: [
                    DropdownMenuItem(value: '', child: Text(tr('Toute urgence'))),
                    for (final u in kUrgencesDemande) DropdownMenuItem(value: u, child: Text(u)),
                  ],
                  onChanged: (v) => setState(() => _filtreUrgence = v ?? ''),
                  decoration: _decEmploi(tr('Urgence')),
                ),
              ),
            ]),
            const SizedBox(height: Cp.s2),
            Text(
              tr('En attendant le serveur, seules les demandes enregistrées sur cet appareil sont visibles ici.'),
              style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted),
            ),
            const SizedBox(height: Cp.s1),
            if (visibles.isEmpty)
              EmptyNote(icon: Icons.assignment_outlined, text: tr('Aucune demande reçue pour le moment.'))
            else if (_demandesFiltrees.isEmpty)
              EmptyNote(icon: Icons.assignment_outlined, text: tr('Aucune demande ne correspond à ces filtres.'))
            else
              ...[
                for (final d in _demandesFiltrees)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: _CarteDemandeBureau(
                      demande: d,
                      onChange: () => setState(() {}),
                    ),
                  ),
              ],
          ] else ...[
            if (app.isAdminGeneral)
              Padding(
                padding: const EdgeInsets.only(bottom: Cp.s1),
                child: SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton.icon(
                    icon: const Icon(Icons.add),
                    label: Text(tr('Publier une offre')),
                    onPressed: () async {
                      final publiee = await Navigator.of(c).push<bool>(
                        MaterialPageRoute(builder: (_) => const FormulaireOffrePage()),
                      );
                      if (publiee == true && mounted) setState(() {});
                    },
                  ),
                ),
              ),
            if (app.offresEmploi.isEmpty)
              EmptyNote(icon: Icons.work_outline, text: tr('Aucune offre publiée.'))
            else
              ...[
                for (final o in app.offresEmploi)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Card(
                      child: Padding(
                        padding: const EdgeInsets.all(Cp.s2),
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Row(children: [
                            Expanded(child: Text(o.titre, style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(color: const Color(0xFFFDF4D8), borderRadius: BorderRadius.circular(999)),
                              child: Text(o.type, style: const TextStyle(color: Cp.goldDeep, fontSize: 11, fontWeight: FontWeight.w800)),
                            ),
                          ]),
                          const SizedBox(height: 4),
                          _ligneMeta(Icons.public_outlined, o.pays),
                          if (o.ville.isNotEmpty) _ligneMeta(Icons.place_outlined, o.ville),
                          if (o.publieeLe.isNotEmpty) _ligneMeta(Icons.calendar_month_outlined, '${tr('Publiée le')} ${_dateCourte(o.publieeLe)}'),
                          if (o.description.isNotEmpty) ...[
                            const SizedBox(height: 6),
                            Text(o.description, style: Theme.of(c).textTheme.bodyMedium),
                          ],
                          if (app.isAdminGeneral) ...[
                            const SizedBox(height: 8),
                            Align(
                              alignment: Alignment.centerRight,
                              child: TextButton(
                                onPressed: () async {
                                  final ok = await _confirmer(c, tr('Retirer cette offre ?'), tr('L’offre disparaîtra de la liste publiée.'));
                                  if (ok) {
                                    app.retirerOffre(o);
                                    setState(() {});
                                    toast(c, tr('Offre retirée.'));
                                  }
                                },
                                child: Text(tr('Retirer'), style: const TextStyle(color: Cp.danger)),
                              ),
                            ),
                          ],
                        ]),
                      ),
                    ),
                  ),
              ],
          ],
        ]));
  }
}

/// Carte d'une demande vue par le Bureau, modèle Bureau :
/// objet, nom du membre, type, date, pays, dates d'absence,
/// description, sélecteur de statut, note interne Bureau
/// uniquement, et bouton Valider et publier pour une
/// Proposition d'opportunité non encore validée.
class _CarteDemandeBureau extends StatefulWidget {
  const _CarteDemandeBureau({required this.demande, required this.onChange});
  final DemandeMembre demande;
  final VoidCallback onChange;

  @override
  State<_CarteDemandeBureau> createState() => _CarteDemandeBureauState();
}

class _CarteDemandeBureauState extends State<_CarteDemandeBureau> {
  late final TextEditingController _note;

  @override
  void initState() {
    super.initState();
    _note = TextEditingController(text: widget.demande.noteInterne);
  }

  @override
  void dispose() {
    _note.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final d = widget.demande;
    return Card(
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(color: d.estUrgente ? Cp.danger : Colors.transparent, width: 1),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Expanded(child: Text(d.objet, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
              const SizedBox(width: 8),
              _pastilleStatut(d.statut),
            ]),
            const SizedBox(height: 4),
            Text(
              '${d.nomMembre} · ${d.type} · ${_dateCourte(d.date)}${d.estUrgente ? ' · ${tr('Urgente')}' : ''}',
              style: t.bodyMedium?.copyWith(color: Cp.inkMuted),
            ),
            if (d.pays.isNotEmpty) ...[const SizedBox(height: 2), Text('${tr('Pays')} : ${d.pays}', style: t.bodyMedium)],
            if (d.estAbsence && d.debut.isNotEmpty) ...[
              const SizedBox(height: 2),
              Text(
                d.fin.isEmpty || d.fin == d.debut ? '${tr('Du')} ${_dateCourte(d.debut)}' : '${tr('Du')} ${_dateCourte(d.debut)} ${tr('au')} ${_dateCourte(d.fin)}',
                style: t.bodyMedium,
              ),
            ],
            if (d.estAbsence && d.activite.isNotEmpty) ...[const SizedBox(height: 2), Text('${tr('Activité')} : ${d.activite}', style: t.bodyMedium)],
            if (d.description.isNotEmpty) ...[
              const SizedBox(height: 6),
              Text(d.description, style: t.bodyMedium),
            ],
            const SizedBox(height: Cp.s2),
            Row(children: [
              Expanded(
                child: DropdownButtonFormField<String>(
                  value: d.statut,
                  items: [for (final s in kStatutsDemande) DropdownMenuItem(value: s, child: Text(s))],
                  onChanged: (v) {
                    if (v == null) return;
                    app.changerStatutDemande(d, v);
                    widget.onChange();
                  },
                  decoration: _decEmploi(tr('Statut')),
                ),
              ),
              if (d.estProposition && d.statut != 'Validée') ...[
                const SizedBox(width: 8),
                FilledButton(
                  onPressed: () async {
                    final publiee = await Navigator.of(context).push<bool>(
                      MaterialPageRoute(builder: (_) => FormulaireOffrePage(proposition: d)),
                    );
                    if (publiee == true) widget.onChange();
                  },
                  child: Text(tr('Valider et publier')),
                ),
              ],
            ]),
            const SizedBox(height: Cp.s2),
            Text(tr('Note interne (Bureau uniquement)'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 4),
            TextField(controller: _note, maxLines: 2, decoration: _decEmploi(tr('Note interne'))),
            const SizedBox(height: 8),
            Align(
              alignment: Alignment.centerRight,
              child: OutlinedButton(
                onPressed: () {
                  app.enregistrerNoteDemande(d, _note.text.trim());
                  toast(context, tr('Note enregistrée.'));
                },
                child: Text(tr('Enregistrer la note')),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}
