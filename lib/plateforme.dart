// Abonnement Plateforme, carte 83, 7 nov. 2026.
//
// Une personne qui veut mettre ses enseignements sur la plateforme
// choisit la fonction « Plateforme » à l'inscription : aucun
// établissement ne lui est proposé, et elle souscrit à l'abonnement
// unique, 100 000 FCFA par an, paiement unique au moment de
// l'inscription, validation manuelle par la structure après
// contrôle Wave, comme pour la carte, jamais automatique.
// Les enseignements sont gratuits pour les membres, y compris les
// membres gratuits. Un enseignement déjà publié reste en ligne
// même après la fin de la période de validité, 12 mois ; pour
// mettre de nouveaux contenus, il faut renouveler, sinon le
// bouton Publier est bloqué. Publication en deux temps : l'auteur
// publie de son côté, en attente de validation, rien ne s'affiche
// chez tout le monde tant que la structure n'a pas validé, puis
// seulement après validation l'enseignement apparaît dans les
// Enseignements, pour tout le monde, gratuit.
// Stockage local d'abord, comme les offres et demandes des
// cartes 63 à 65, en attendant le serveur : les tables et routes
// sont dans server-production/src/plateforme.js, les routes dans
// server.js, les tests dans tests/plateforme.test.js, mais tant
// que le serveur n'a pas redéployé ces routes, un enseignement
// ou un abonnement créé sur un appareil n'est visible que sur
// cet appareil, jamais sur un autre. Aucun montant, aucune règle
// de paiement n'est inventée : 100 000 FCFA par an, 12 mois.
import 'package:flutter/material.dart';
import 'api.dart';
import 'i18n.dart';
import 'main.dart';

InputDecoration _decPlateforme(String label) => InputDecoration(
      labelText: label,
      filled: true,
      fillColor: Cp.card,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
    );

String _dateCourtePlateforme(DateTime? d) {
  if (d == null) return '—';
  return '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';
}

(Color, Color) _couleursStatutPlateforme(String statut) {
  switch (statut) {
    case 'Publié':
    case 'Actif':
      return (const Color(0xFFDCFCE7), const Color(0xFF166534));
    case 'En attente de validation':
    case 'En attente':
      return (const Color(0xFFE0E7FF), const Color(0xFF3730A3));
    case 'Refusé':
    case 'Expiré':
      return (const Color(0xFFFEE2E2), const Color(0xFF991B1B));
    default:
      return (const Color(0xFFE8EAF0), Cp.navy);
  }
}

Widget _pastillePlateforme(String statut) {
  final couleurs = _couleursStatutPlateforme(statut);
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: couleurs.$1, borderRadius: BorderRadius.circular(999)),
    child: Text(statut, style: TextStyle(color: couleurs.$2, fontSize: 11, fontWeight: FontWeight.w800)),
  );
}

/// Carte d'état de l'abonnement, réutilisée par la page
/// Abonnement et par Mes enseignements : statut, dates, jours
/// restants, rappel de renouvellement quand la fin approche
/// ou quand la période est finie. Les enseignements déjà
/// publiés restent en ligne après la fin, seul le bouton
/// Publier est bloqué, jamais retiré d'office.
Widget _carteAbonnement(BuildContext c) {
  final abo = app.abonnementPlateforme;
  final actif = app.abonnementActif;
  final expire = app.abonnementExpire;
  final enAttente = abo.statut == 'En attente';
  return Card(
    child: Padding(
      padding: const EdgeInsets.all(Cp.s2),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          const Icon(Icons.workspace_premium_outlined, color: Cp.goldDeep),
          const SizedBox(width: Cp.s1),
          Expanded(child: Text(tr('Abonnement Plateforme'), style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          _pastillePlateforme(actif ? 'Actif' : expire ? 'Expiré' : abo.statut),
        ]),
        const SizedBox(height: Cp.s1),
        Text(tr('100 000 FCFA par an, pour mettre vos enseignements en ligne. Vos enseignements sont gratuits pour les membres, y compris les membres gratuits.'), style: Theme.of(c).textTheme.bodyMedium),
        const SizedBox(height: Cp.s1),
        if (abo.dateDebut != null) Text(isEn ? 'From ${_dateCourtePlateforme(abo.dateDebut)} to ${_dateCourtePlateforme(abo.dateFin)}' : 'Du ${_dateCourtePlateforme(abo.dateDebut)} au ${_dateCourtePlateforme(abo.dateFin)}', style: Theme.of(c).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
        if (actif) Text(isEn ? '${abo.joursRestants} days left' : '${abo.joursRestants} jours restants', style: Theme.of(c).textTheme.bodyMedium),
        if (actif && abo.joursRestants <= 30) Text(tr('Votre abonnement se termine bientôt : renouvelez pour continuer à publier de nouveaux contenus.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
        if (expire) Text(tr('Votre période est terminée. Vos enseignements déjà publiés restent en ligne, mais pour mettre de nouveaux contenus, renouvelez votre abonnement.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.danger, fontWeight: FontWeight.w700)),
        if (enAttente) Text(tr('Paiement en attente de validation par la structure, après contrôle de son compte Wave. Vous pourrez publier dès que la structure l’aura validé.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
        if (abo.statut == 'Aucun') Text(tr('Aucun abonnement pour le moment. Souscrivez pour publier vos enseignements.'), style: Theme.of(c).textTheme.bodyMedium),
      ]),
    ),
  );
}

// ───────────────────────────────────────────────────────────────────
// Abonnement : souscrire et renouveler, 100 000 FCFA par an
// ───────────────────────────────────────────────────────────────────

class PlateformeAbonnementPage extends StatefulWidget {
  const PlateformeAbonnementPage({super.key});
  @override
  State<PlateformeAbonnementPage> createState() => _PlateformeAbonnementPageState();
}

class _PlateformeAbonnementPageState extends State<PlateformeAbonnementPage> {
  bool _busy = false;

  Future<void> _souscrire() async {
    if (_busy) return;
    setState(() => _busy = true);
    try {
      // Paiement unique, 100 000 FCFA, par startPayment, comme
      // pour la carte : demande en attente, Wave, Orange Money
      // ou PayPal, jamais payée sur seul lien ou seule capture.
      // La validation par la structure active l'abonnement
      // pour 12 mois, voir AppState.confirm.
      final r = await startPayment(context, 'plateforme', kPlateformeMontantAnnuel);
      if (r != null && mounted) {
        app.setAbonnementPlateforme(AbonnementPlateforme(statut: 'En attente', referencePaiement: r.ref));
        toast(context, tr('Demande créée, en attente de validation par la structure.'));
      }
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final actif = app.abonnementActif;
    return live((c) => basic(tr('Abonnement Plateforme'), [
          _carteAbonnement(c),
          const SizedBox(height: Cp.s2),
          Text(tr('Ce que l’abonnement permet'), style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text(tr('Publier vos enseignements, en audio ou en texte, depuis votre espace Mes enseignements. Chaque enseignement est relu par la structure avant d’apparaître pour tout le monde. Vos enseignements publiés restent en ligne même après la fin de votre période, seuls les nouveaux contenus demandent un abonnement actif.'), style: Theme.of(c).textTheme.bodyMedium),
          const SizedBox(height: Cp.s2),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              onPressed: _busy ? null : _souscrire,
              icon: const Icon(Icons.payment_outlined),
              label: Text(_busy ? tr('Ouverture du paiement…') : (actif ? tr('Renouveler : 100 000 FCFA par an') : tr('Souscrire : 100 000 FCFA par an'))),
            ),
          ),
          const SizedBox(height: Cp.s1),
          Text(tr('La demande reste en attente tant que la structure n’a pas validé votre paiement après contrôle de son compte. Aucune confirmation automatique.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ]));
  }
}

// ───────────────────────────────────────────────────────────────────
// Devenir partenaire, carte 93, 8 nov. 2026 : le même parcours
// Plateforme que le choix à l'inscription, pour un membre déjà
// inscrit, sans refaire une inscription et sans créer un
// deuxième compte. La fonction passe à « Plateforme » sur le
// compte actuel, par POST /moi/fonction, puis la personne
// souscrit à l'abonnement, comme à l'inscription. L'établissement
// déjà sur le compte, s'il y en a un, n'est pas retiré ici : la
// fonction seule change, la carte garde son établissement.
// Visible seulement pour un membre connecté qui n'est pas déjà
// Plateforme, voir devenirPartenaireVisible, entrée dans Plus.
bool devenirPartenaireVisible({required bool connecte, required String fonction}) =>
    connecte && fonction != 'Plateforme';

class DevenirPartenairePage extends StatefulWidget {
  const DevenirPartenairePage({super.key});
  @override
  State<DevenirPartenairePage> createState() => _DevenirPartenairePageState();
}

class _DevenirPartenairePageState extends State<DevenirPartenairePage> {
  bool _busy = false;

  Future<void> _devenir() async {
    if (_busy) return;
    if (app.member == null) {
      toast(context, tr('Connectez-vous pour devenir partenaire.'));
      return;
    }
    setState(() => _busy = true);
    try {
      // La fonction est gardée côté serveur, comme la photo :
      // sans ce passage, le serveur refuserait la publication
      // d'enseignements, qui exige la fonction Plateforme.
      final ok = await api.updateFonction('Plateforme');
      if (!ok) {
        if (mounted) toast(context, tr('Impossible de changer votre fonction pour le moment. Vérifiez votre connexion, puis réessayez.'));
        return;
      }
      app.updateLocalProfile(fonction: 'Plateforme');
      if (!mounted) return;
      toast(context, tr('Vous êtes partenaire. Souscrivez à l’abonnement pour publier vos enseignements.'));
      goPlateforme(context, () => const PlateformeAbonnementPage());
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Devenir partenaire'), [
          if (app.member == null)
            Text(tr('Connectez-vous pour devenir partenaire.'), style: Theme.of(c).textTheme.bodyMedium)
          else ...[
            _carteAbonnement(c),
            const SizedBox(height: Cp.s2),
            Text(tr('Devenir partenaire, c’est publier vos enseignements sur la plateforme, pour tous les membres. Vos enseignements restent gratuits pour les membres, y compris les membres gratuits.'), style: Theme.of(c).textTheme.bodyMedium),
            const SizedBox(height: Cp.s1),
            Text(tr('Aucun nouveau compte n’est créé : c’est votre compte actuel qui devient partenaire. Votre établissement, s’il y en a un, reste sur votre carte.'), style: Theme.of(c).textTheme.bodyMedium),
            const SizedBox(height: Cp.s2),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: _busy ? null : _devenir,
                icon: const Icon(Icons.workspace_premium_outlined),
                label: Text(_busy ? tr('Ouverture du paiement…') : tr('Devenir partenaire : 100 000 FCFA par an')),
              ),
            ),
            const SizedBox(height: Cp.s1),
            Text(tr('Après ce choix, vous souscrivez à l’abonnement. La structure le valide après contrôle de son compte Wave. Vous pourrez publier dès qu’il sera validé.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ],
        ]));
  }
}

// ───────────────────────────────────────────────────────────────────
// Mes enseignements : l'espace de l'auteur Plateforme
// ───────────────────────────────────────────────────────────────────

class MesEnseignementsPage extends StatefulWidget {
  const MesEnseignementsPage({super.key});
  @override
  State<MesEnseignementsPage> createState() => _MesEnseignementsPageState();
}

class _MesEnseignementsPageState extends State<MesEnseignementsPage> {
  String _filtre = 'tous';

  List<EnseignementPlateforme> get _visibles {
    final m = app.member;
    final miens = app.enseignementsPlateforme.where((e) => m == null || e.matricule == m.matricule).toList();
    if (_filtre == 'tous') return miens;
    return miens.where((e) => e.statut == _filtre).toList();
  }

  void _publier() {
    if (!app.abonnementActif) {
      // Bouton bloqué quand l'abonnement n'est pas actif :
      // la période est finie, ou le paiement attend encore
      // sa validation. Les enseignements déjà publiés ne
      // sont jamais retirés pour autant.
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(tr('Abonnement requis')),
          content: Text(app.abonnementPlateforme.statut == 'En attente'
              ? tr('Votre paiement est en attente de validation par la structure. Vous pourrez publier dès qu’il sera validé.')
              : tr('Votre période d’abonnement est terminée. Vos enseignements déjà publiés restent en ligne, mais pour mettre de nouveaux contenus, renouvelez votre abonnement de 100 000 FCFA par an.')),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer'))),
            FilledButton(onPressed: () {
              Navigator.pop(ctx);
              goPlateforme(context, () => const PlateformeAbonnementPage());
            }, child: Text(tr('Voir l’abonnement'))),
          ],
        ),
      );
      return;
    }
    goPlateforme(context, () => const NouvelEnseignementPlateformePage());
  }

  Future<void> _retirer(EnseignementPlateforme e) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Retirer cet enseignement ?')),
        content: Text(e.statut == 'Publié' ? tr('Il disparaîtra des Enseignements pour tous les membres.') : tr('Il disparaîtra de votre liste.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Retirer'))),
        ],
      ),
    );
    if (ok != true) return;
    app.retirerEnseignementPlateforme(e);
    toast(context, tr('Enseignement retiré.'));
  }

  @override
  Widget build(BuildContext context) {
    final counts = <String, int>{for (final s in kStatutsEnseignementPlateforme) s: app.enseignementsPlateforme.where((e) => e.statut == s).length};
    return live((c) => basic(tr('Mes enseignements'), [
          _carteAbonnement(c),
          const SizedBox(height: Cp.s2),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              onPressed: _publier,
              icon: const Icon(Icons.add),
              label: Text(tr('Publier un enseignement')),
            ),
          ),
          const SizedBox(height: Cp.s1),
          Text(tr('Votre enseignement part en attente de validation. Rien ne s’affiche chez tout le monde tant que la structure ne l’a pas validé.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
          const SizedBox(height: Cp.s2),
          // Filtre en déroulant fermé, précision d'Axel du
          // 7 nov. 2026 : les filtres affichés en entier qui
          // chargent l'écran passent en déroulant fermé, qui
          // s'ouvre au toucher, avec le choix visible. Contenus,
          // ordre et règles inchangés.
          DropdownButtonFormField<String>(
            value: _filtre,
            items: [
              for (final f in const [('tous', 'Tous'), ('Brouillon', 'Brouillons'), ('En attente de validation', 'En attente'), ('Publié', 'Publiés'), ('Refusé', 'Refusés')])
                DropdownMenuItem(value: f.$1, child: Text(f.$1 == 'tous' ? tr(f.$2) : '${tr(f.$2)} (${counts[f.$1] ?? 0})')),
            ],
            onChanged: (v) => setState(() => _filtre = v ?? 'tous'),
            decoration: _decPlateforme(tr('Filtrer par statut')),
          ),
          const SizedBox(height: Cp.s1),
          if (_visibles.isEmpty)
            EmptyNote(icon: Icons.headphones_outlined, text: tr('Aucun enseignement ici pour le moment. Publiez votre premier enseignement, il partira en attente de validation.'))
          else
            for (final e in _visibles)
              Card(
                child: ListTile(
                  leading: Icon(e.format == 'Texte' ? Icons.article_outlined : Icons.headphones_outlined, color: Cp.navy),
                  title: Text(e.titre, style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
                  subtitle: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(e.auteur, style: const TextStyle(color: Cp.inkMuted)),
                    if (e.description.isNotEmpty) Text(e.description, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Cp.inkMuted)),
                    Row(children: [
                      _pastillePlateforme(e.statut),
                      const SizedBox(width: 8),
                      Text(isEn ? '${e.vues} views' : '${e.vues} vues', style: const TextStyle(color: Cp.inkMuted, fontSize: 12)),
                    ]),
                    if (e.statut == 'Refusé' && e.motifRefus.isNotEmpty) Text('${tr('Motif')} : ${e.motifRefus}', style: const TextStyle(color: Cp.danger, fontSize: 12)),
                  ]),
                  trailing: PopupMenuButton<String>(
                    icon: const Icon(Icons.more_vert, color: Cp.navy),
                    onSelected: (v) async {
                      if (v == 'voir') {
                        app.compterVuePlateforme(e);
                        if (e.format == 'Texte' && e.texte.isNotEmpty) {
                          showDialog(context: context, builder: (ctx) => AlertDialog(title: Text(e.titre), content: SingleChildScrollView(child: Text(e.texte)), actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer')))]));
                        } else if (e.lienAudio.isNotEmpty) {
                          toast(context, tr('Audio : ') + e.lienAudio);
                        }
                      }
                      if (v == 'brouillon' && e.statut == 'Refusé') app.changerStatutEnseignementPlateforme(e, 'Brouillon');
                      if (v == 'envoyer' && (e.statut == 'Brouillon' || e.statut == 'Refusé')) app.changerStatutEnseignementPlateforme(e, 'En attente de validation');
                      if (v == 'retirer') await _retirer(e);
                    },
                    itemBuilder: (_) => [
                      PopupMenuItem(value: 'voir', child: Text(tr('Voir'))),
                      if (e.statut == 'Refusé') PopupMenuItem(value: 'brouillon', child: Text(tr('Repasser en brouillon'))),
                      if (e.statut == 'Brouillon' || e.statut == 'Refusé') PopupMenuItem(value: 'envoyer', child: Text(tr('Envoyer pour validation'))),
                      PopupMenuItem(value: 'retirer', child: Text(tr('Retirer'))),
                    ],
                  ),
                ),
              ),
        ]));
  }
}

class NouvelEnseignementPlateformePage extends StatefulWidget {
  const NouvelEnseignementPlateformePage({super.key});
  @override
  State<NouvelEnseignementPlateformePage> createState() => _NouvelEnseignementPlateformePageState();
}

class _NouvelEnseignementPlateformePageState extends State<NouvelEnseignementPlateformePage> {
  final _titre = TextEditingController();
  final _description = TextEditingController();
  final _lienAudio = TextEditingController();
  final _texte = TextEditingController();
  String _format = 'Audio';
  String? _erreur;

  void _enregistrer({required bool envoyer}) {
    final m = app.member;
    if (m == null) {
      setState(() => _erreur = tr('Connectez-vous pour publier un enseignement.'));
      return;
    }
    final titre = _titre.text.trim();
    if (titre.isEmpty) {
      setState(() => _erreur = tr('Le titre est requis.'));
      return;
    }
    if (_format == 'Audio' && _lienAudio.text.trim().isEmpty) {
      setState(() => _erreur = tr('Ajoutez un lien audio, ou choisissez le format Texte.'));
      return;
    }
    if (_format == 'Texte' && _texte.text.trim().isEmpty) {
      setState(() => _erreur = tr('Écrivez le texte de l’enseignement.'));
      return;
    }
    final e = EnseignementPlateforme(
      id: 'plateforme-${DateTime.now().millisecondsSinceEpoch}',
      matricule: m.matricule,
      auteur: m.name,
      titre: titre,
      description: _description.text.trim(),
      format: _format,
      lienAudio: _lienAudio.text.trim(),
      texte: _texte.text.trim(),
      statut: envoyer ? 'En attente de validation' : 'Brouillon',
    );
    app.ajouterEnseignementPlateforme(e);
    toast(context, envoyer ? tr('Enseignement envoyé pour validation. Il apparaîtra pour tout le monde une fois validé par la structure.') : tr('Brouillon enregistré.'));
    Navigator.of(context).pop(true);
  }

  @override
  Widget build(BuildContext context) {
    return basic(tr('Publier un enseignement'), [
      TextField(controller: _titre, textCapitalization: TextCapitalization.sentences, decoration: _decPlateforme(tr('Titre'))),
      const SizedBox(height: Cp.s2),
      TextField(controller: _description, maxLines: 3, textCapitalization: TextCapitalization.sentences, decoration: _decPlateforme(tr('Description'))),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<String>(
        value: _format,
        items: [for (final f in const ['Audio', 'Texte']) DropdownMenuItem(value: f, child: Text(f))],
        onChanged: (v) => setState(() => _format = v ?? _format),
        decoration: _decPlateforme(tr('Format')),
      ),
      const SizedBox(height: Cp.s2),
      if (_format == 'Audio') TextField(controller: _lienAudio, keyboardType: TextInputType.url, decoration: _decPlateforme(tr('Lien audio'))),
      if (_format == 'Texte') TextField(controller: _texte, maxLines: 8, textCapitalization: TextCapitalization.sentences, decoration: _decPlateforme(tr('Texte de l’enseignement'))),
      const SizedBox(height: Cp.s1),
      Text(tr('Gratuit pour les membres, y compris les membres gratuits. La structure relit chaque enseignement avant de le publier pour tout le monde.'), style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
      if (_erreur != null) ...[const SizedBox(height: Cp.s1), Text(_erreur!, style: const TextStyle(color: Cp.danger))],
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(onPressed: () => _enregistrer(envoyer: true), child: Text(tr('Envoyer pour validation'))),
      ),
      const SizedBox(height: Cp.s1),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: OutlinedButton(onPressed: () => _enregistrer(envoyer: false), child: Text(tr('Enregistrer en brouillon'))),
      ),
    ]);
  }
}

// ───────────────────────────────────────────────────────────────────
// Administration : valider les enseignements, voir les abonnements
// ───────────────────────────────────────────────────────────────────

class AdminPlateformePage extends StatefulWidget {
  const AdminPlateformePage({super.key});
  @override
  State<AdminPlateformePage> createState() => _AdminPlateformePageState();
}

class _AdminPlateformePageState extends State<AdminPlateformePage> {
  Future<void> _refuser(EnseignementPlateforme e) async {
    final motifC = TextEditingController();
    final motif = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Refuser cet enseignement ?')),
        content: TextField(controller: motifC, maxLines: 3, decoration: _decPlateforme(tr('Motif du refus'))),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, motifC.text.trim()), child: Text(tr('Refuser'))),
        ],
      ),
    );
    if (motif == null) return;
    if (motif.isEmpty) {
      toast(context, tr('Indiquez le motif du refus.'));
      return;
    }
    app.refuserEnseignementPlateforme(e, motif);
    toast(context, tr('Enseignement refusé, l’auteur voit le motif.'));
  }

  @override
  Widget build(BuildContext context) {
    final enAttente = app.enseignementsPlateforme.where((e) => e.statut == 'En attente de validation').toList();
    final publies = app.enseignementsPlateforme.where((e) => e.statut == 'Publié').length;
    final demandes = app.requests.where((r) => r.kind == 'plateforme').toList();
    final actifs = app.requests.where((r) => r.kind == 'plateforme' && r.confirmed).length;
    return live((c) => basic(tr('Enseignements Plateforme'), [
          Row(children: [
            Expanded(child: Card(child: Padding(padding: const EdgeInsets.all(Cp.s2), child: Column(children: [Text('$publies', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy)), Text(tr('Publiés'), style: Theme.of(c).textTheme.bodyMedium)])))),
            const SizedBox(width: Cp.s1),
            Expanded(child: Card(child: Padding(padding: const EdgeInsets.all(Cp.s2), child: Column(children: [Text('${enAttente.length}', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy)), Text(tr('En attente'), style: Theme.of(c).textTheme.bodyMedium)])))),
            const SizedBox(width: Cp.s1),
            Expanded(child: Card(child: Padding(padding: const EdgeInsets.all(Cp.s2), child: Column(children: [Text('$actifs', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy)), Text(tr('Abonnements validés'), style: Theme.of(c).textTheme.bodyMedium)])))),
          ]),
          const SizedBox(height: Cp.s2),
          // File de validation en déroulant fermé, précision
          // d'Axel du 7 nov. 2026 : la liste affichée en entier
          // chargeait l'écran, elle s'ouvre au toucher, avec le
          // nombre visible dans le titre. Contenus et règles
          // inchangés.
          ExpansionTile(
            initiallyExpanded: false,
            title: Text('${tr('En attente de validation')} (${enAttente.length})', style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            children: [
              if (enAttente.isEmpty)
                EmptyNote(icon: Icons.check_circle_outlined, text: tr('Aucun enseignement en attente. Quand un auteur Plateforme envoie un enseignement, il apparaît ici.'))
              else
                for (final e in enAttente)
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(Cp.s2),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Row(children: [Expanded(child: Text(e.titre, style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy))), _pastillePlateforme(e.statut)]),
                        Text('${e.auteur} · ${e.matricule}', style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
                        if (e.description.isNotEmpty) Text(e.description, style: Theme.of(c).textTheme.bodyMedium),
                        Text(e.format == 'Texte' ? tr('Texte') : tr('Audio'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
                        const SizedBox(height: Cp.s1),
                        Row(children: [
                          Expanded(child: FilledButton.icon(onPressed: () {
                            app.validerEnseignementPlateforme(e);
                            toast(context, tr('Enseignement publié pour tout le monde, gratuit pour les membres.'));
                          }, icon: const Icon(Icons.check_outlined), label: Text(tr('Valider et publier')))),
                          const SizedBox(width: Cp.s1),
                          Expanded(child: OutlinedButton.icon(onPressed: () => _refuser(e), icon: const Icon(Icons.close_outlined), label: Text(tr('Refuser')))),
                        ]),
                      ]),
                    ),
                  ),
            ],
          ),
          const SizedBox(height: Cp.s2),
          // Abonnements en déroulant fermé, même précision :
          // la liste affichée en entier chargeait l'écran.
          ExpansionTile(
            initiallyExpanded: false,
            title: Text('${tr('Abonnements')} (${demandes.length})', style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            children: [
              Text(tr('Les paiements d’abonnement se valident dans la Comptabilité, après contrôle du compte Wave, comme pour la carte. Une fois validé, l’abonnement s’active pour 12 mois.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
              if (demandes.isEmpty)
                EmptyNote(icon: Icons.workspace_premium_outlined, text: tr('Aucune demande d’abonnement pour le moment.'))
              else
                for (final r in demandes)
                  Card(
                    child: ListTile(
                      leading: const Icon(Icons.workspace_premium_outlined, color: Cp.navy),
                      title: Text('${r.memberName} · ${r.matricule}', style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
                      subtitle: Text('${fcfa(r.amount)} · ${r.confirmed ? tr('Validé') : r.refused ? tr('Refusé') : tr('En attente')} · ${r.ref}', style: const TextStyle(color: Cp.inkMuted)),
                    ),
                  ),
            ],
          ),
        ]));
  }
}
