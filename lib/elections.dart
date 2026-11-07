// Page Élections pour les membres, carte 76, 7 nov. 2026.
// La fonctionnalité n'apparaît qu'au moment des élections : la
// tuile de l'onglet Structure n'existe que pendant la période
// décidée par la structure, et cette page recharge l'élection
// actuelle à l'ouverture, pour ne jamais voter sur une élection
// fermée entre-temps. Un vote par membre, imposé côté serveur,
// le vote est définitif et ne peut pas être modifié. Pendant le
// vote, aucun résultat n'est affiché : ni total, ni voix par
// candidat, le serveur n'en renvoie aucun aux membres.
// Écran en chargement différé, comme les écrans d'administration :
// lib/main.dart l'ouvre par goElections, jamais au démarrage.
// Ce fichier importe lib/main.dart pour les aides partagées
// (couleurs, textes, navigation, modèles) ; le cycle import
// différé / import direct est accepté par Dart, comme pour
// lib/admin_pages.dart.
import 'package:flutter/material.dart';
import 'main.dart';
import 'api.dart';
import 'i18n.dart';
import 'ux_global.dart';

/// Page de vote d'une élection en cours, pour les membres.
class ElectionsPage extends StatefulWidget {
  const ElectionsPage({super.key});
  @override
  State<ElectionsPage> createState() => _ElectionsPageState();
}

class _ElectionsPageState extends State<ElectionsPage> {
  late Future<Map<String, dynamic>> _futur;
  String? _choisi;

  @override
  void initState() {
    super.initState();
    _futur = api.fetchElectionActuelle();
  }

  void _recharger() => setState(() {
        _choisi = null;
        _futur = api.fetchElectionActuelle();
      });

  Map? _candidatParId(List candidats, String id) {
    for (final cand in candidats) {
      if (cand is Map && (cand['id'] ?? '').toString() == id) return cand;
    }
    return null;
  }

  Future<void> _voter(Map election, Map candidat) async {
    final nom = (candidat['nom'] ?? '').toString();
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Confirmer votre vote')),
        content: Text('${tr('Voter pour')} $nom ? ${tr('Un seul vote par membre, il ne peut pas être modifié.')}'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Voter'))),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      await api.voterElection((election['id'] ?? '').toString(), (candidat['id'] ?? '').toString());
      if (!mounted) return;
      toast(context, tr('Votre vote est enregistré.'));
      _recharger();
    } catch (e) {
      if (!mounted) return;
      toast(context, e is ApiException ? e.message : tr('Impossible d’enregistrer votre vote. Vérifiez votre connexion, puis réessayez.'));
      _recharger();
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Élections'), [
      FutureBuilder<Map<String, dynamic>>(
        future: _futur,
        builder: (c, snap) {
          if (snap.connectionState == ConnectionState.waiting) {
            return const Padding(padding: EdgeInsets.all(24), child: UxShimmerList(itemCount: 3));
          }
          if (snap.hasError) {
            return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(tr('Impossible de charger l’élection. Vérifiez votre connexion, puis réessayez.'), style: t.bodyMedium),
              const SizedBox(height: Cp.s2),
              SizedBox(height: 52, child: OutlinedButton(onPressed: _recharger, child: Text(tr('Réessayer')))),
            ]);
          }
          final election = (snap.data?['election'] as Map<String, dynamic>?);
          if (election == null) {
            return EmptyNote(
              icon: Icons.check_circle_outlined,
              text: tr('Aucune élection en cours. La fonctionnalité Élections n’apparaît que pendant la période décidée par la structure.'),
            );
          }
          final candidats = (election['candidats'] as List?) ?? [];
          final aVote = election['a_vote'] == true;
          final monCandidatId = (election['mon_candidat_id'] ?? '').toString();
          final debut = DateTime.tryParse((election['date_debut'] ?? '').toString());
          final fin = DateTime.tryParse((election['date_fin'] ?? '').toString());
          final monCandidat = monCandidatId.isEmpty ? null : _candidatParId(candidats, monCandidatId);
          return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(Cp.s2),
              decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusCard)),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text((election['titre'] ?? '').toString(), style: t.titleLarge?.copyWith(color: Colors.white, fontWeight: FontWeight.w800)),
                if ((election['poste'] ?? '').toString().isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text((election['poste'] ?? '').toString(), style: t.titleMedium?.copyWith(color: Cp.gold)),
                ],
                if ((election['description'] ?? '').toString().isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text((election['description'] ?? '').toString(), style: t.bodyMedium?.copyWith(color: Colors.white)),
                ],
                if (debut != null && fin != null) ...[
                  const SizedBox(height: 8),
                  Text('${tr('Du')} ${formatDateHeure(debut)}', style: t.bodyMedium?.copyWith(color: Colors.white)),
                  Text('${tr('Au')} ${formatDateHeure(fin)}', style: t.bodyMedium?.copyWith(color: Colors.white)),
                ],
              ]),
            ),
            const SizedBox(height: Cp.s2),
            if (aVote)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(Cp.s2),
                decoration: BoxDecoration(
                  color: Cp.gold.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(Cp.radiusCard),
                  border: Border.all(color: Cp.gold),
                ),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(tr('Votre vote est enregistré.'), style: t.titleMedium),
                  if (monCandidat != null) ...[
                    const SizedBox(height: 4),
                    Text('${tr('Vous avez voté pour')} ${(monCandidat['nom'] ?? '').toString()}.', style: t.bodyMedium),
                  ],
                  const SizedBox(height: 4),
                  Text(tr('Un seul vote par membre, il ne peut pas être modifié.'), style: t.bodyMedium),
                ]),
              )
            else
              Text(tr('Choisissez un candidat, puis touchez Voter. Un seul vote par membre.'), style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
            if (candidats.isEmpty)
              Text(tr('Aucun candidat pour le moment.'), style: t.bodyMedium)
            else
              for (final cand in candidats.whereType<Map>()) ...[
                Builder(builder: (_) {
                  final id = (cand['id'] ?? '').toString();
                  final nom = (cand['nom'] ?? '').toString();
                  final fonction = (cand['fonction'] ?? '').toString();
                  final selectionne = _choisi == id;
                  return Container(
                    width: double.infinity,
                    margin: const EdgeInsets.only(bottom: Cp.s1),
                    decoration: BoxDecoration(
                      color: selectionne ? Cp.gold.withValues(alpha: 0.12) : Cp.card,
                      borderRadius: BorderRadius.circular(Cp.radiusCard),
                      border: Border.all(color: selectionne ? Cp.gold : Cp.line),
                    ),
                    child: RadioListTile<String>(
                      value: id,
                      groupValue: aVote ? monCandidatId : _choisi,
                      onChanged: aVote ? null : (v) => setState(() => _choisi = v),
                      title: Text(nom, style: t.titleMedium),
                      subtitle: fonction.isNotEmpty ? Text(fonction, style: t.bodyMedium) : null,
                      activeColor: Cp.goldDeep,
                    ),
                  );
                }),
              ],
            const SizedBox(height: Cp.s1),
            Text(tr('Les résultats ne sont pas affichés pendant le vote.'), style: t.bodyMedium),
            if (!aVote) ...[
              const SizedBox(height: Cp.s2),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton(
                  onPressed: _choisi == null
                      ? null
                      : () {
                          final candidat = _choisi == null ? null : _candidatParId(candidats, _choisi!);
                          if (candidat != null) _voter(election, candidat);
                        },
                  child: Text(tr('Voter')),
                ),
              ),
            ],
          ]);
        },
      ),
    ], actions: [IconButton(icon: const Icon(Icons.refresh), onPressed: _recharger, tooltip: tr('Réessayer'))]);
  }
}
