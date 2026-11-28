// Page Élections pour un membre, salve 28 nov. 2026 : l'élection
// en cours, les scores des candidats en direct, vote unique et
// privé, on ne voit que les chiffres. Le serveur renvoie les
// totaux, jamais qui a voté pour qui. Hors période, la page dit
// simplement qu'aucune élection n'est en cours.
import 'package:flutter/material.dart';

import 'modeles_t18.dart';
import 'palette.dart';
import 'service_t18.dart';

class PageElectionMembre extends StatefulWidget {
  const PageElectionMembre({super.key, required this.service});
  final ServiceT18 service;

  @override
  State<PageElectionMembre> createState() => _PageElectionMembreState();
}

class _PageElectionMembreState extends State<PageElectionMembre> {
  var _charge = false;
  var _enEchec = false;
  var _voteEnCours = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() => _enEchec = false);
    try {
      await widget.service.chargerElectionActuelle();
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _charge = true;
        _enEchec = true;
      });
      return;
    }
    if (mounted) {
      setState(() {
        _charge = true;
        _enEchec = false;
      });
    }
  }

  void _message(String texte) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(texte)),
    );
  }

  Future<void> _voter(ElectionMembre election, CandidatMembre c) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Voter pour ${c.nom}'),
        content: const Text(
          'Ton vote est enregistré par le serveur, un seul vote par membre, privé.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Voter'),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    setState(() => _voteEnCours = true);
    final vote = await widget.service.voterElection(election.id, c.id);
    await widget.service.chargerElectionActuelle();
    if (!mounted) return;
    setState(() => _voteEnCours = false);
    final actuelle = widget.service.electionActuelle;
    if (vote) {
      _message('Vote enregistré.');
    } else if (actuelle?.aVote == true) {
      _message('Tu as déjà voté pour cette élection.');
    } else {
      _message('Vote impossible pour le moment.');
    }
  }

  @override
  Widget build(BuildContext context) {
    final election = widget.service.electionActuelle;
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        const Text(
          'Élections',
          style: TextStyle(
            fontFamily: 'Cinzel',
            fontSize: 28,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 12),
        if (!_charge)
          const Center(child: CircularProgressIndicator())
        else if (_enEchec)
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  'L’élection ne peut pas être chargée pour le moment.',
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),
                FilledButton(
                  onPressed: _charger,
                  child: const Text('Réessayer'),
                ),
              ],
            ),
          )
        else if (election == null)
          const Center(
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 24),
              child: Text('Aucune élection en cours.'),
            ),
          )
        else ...[
          Card(
            color: Colors.white,
            margin: EdgeInsets.zero,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    election.titre,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w800,
                      color: PaletteNouvelle.bleuNuit,
                    ),
                  ),
                  if (election.poste.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(election.poste),
                  ],
                  if (election.description.isNotEmpty) ...[
                    const SizedBox(height: 8),
                    Text(election.description),
                  ],
                  const SizedBox(height: 8),
                  Text(
                    [
                      if (election.dateDebut != null)
                        'Du ${election.dateDebut!.day}/${election.dateDebut!.month}/${election.dateDebut!.year}',
                      if (election.dateFin != null)
                        'au ${election.dateFin!.day}/${election.dateFin!.month}/${election.dateFin!.year}',
                      '${election.totalVoix} voix',
                    ].join(' · '),
                    style: const TextStyle(color: Colors.black54),
                  ),
                  if (election.aVote) ...[
                    const SizedBox(height: 12),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: PaletteNouvelle.or.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: PaletteNouvelle.or.withValues(alpha: 0.4),
                        ),
                      ),
                      child: Text(
                        election.nomMonCandidat == null
                            ? 'Ton vote est enregistré.'
                            : 'Ton vote : ${election.nomMonCandidat}.',
                        style: const TextStyle(fontWeight: FontWeight.w700),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              const Expanded(
                child: Text(
                  'Scores en direct',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit,
                  ),
                ),
              ),
              TextButton.icon(
                onPressed: _charger,
                icon: const Icon(Icons.refresh_outlined, size: 18),
                label: const Text('Actualiser'),
              ),
            ],
          ),
          const SizedBox(height: 8),
          if (election.candidats.isEmpty)
            const Text('Aucun candidat pour le moment.')
          else
            for (final c in election.candidats)
              _LigneCandidat(
                candidat: c,
                total: election.totalVoix,
                estMonChoix: election.monCandidatId == c.id,
                peutVoter: election.enCours && !election.aVote,
                voteEnCours: _voteEnCours,
                onVoter: () => _voter(election, c),
              ),
        ],
      ],
    );
  }
}

/// Un candidat avec ses voix en direct, barre proportionnelle
/// et bouton Voter quand le membre n'a pas encore voté.
class _LigneCandidat extends StatelessWidget {
  const _LigneCandidat({
    required this.candidat,
    required this.total,
    required this.estMonChoix,
    required this.peutVoter,
    required this.voteEnCours,
    required this.onVoter,
  });
  final CandidatMembre candidat;
  final int total;
  final bool estMonChoix;
  final bool peutVoter;
  final bool voteEnCours;
  final VoidCallback onVoter;

  @override
  Widget build(BuildContext context) {
    final ratio = total <= 0 ? 0.0 : candidat.voix / total;
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    candidat.nom,
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      color: PaletteNouvelle.bleuNuit,
                    ),
                  ),
                ),
                if (estMonChoix)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: PaletteNouvelle.or,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      'TON VOTE',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: PaletteNouvelle.bleuNuit,
                      ),
                    ),
                  ),
                const SizedBox(width: 8),
                Text(
                  '${candidat.voix} voix',
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
              ],
            ),
            if (candidat.fonction.isNotEmpty) ...[
              const SizedBox(height: 2),
              Text(
                candidat.fonction,
                style: const TextStyle(color: Colors.black54, fontSize: 13),
              ),
            ],
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: ratio,
                minHeight: 8,
                backgroundColor: Colors.black12,
                valueColor: const AlwaysStoppedAnimation(PaletteNouvelle.or),
              ),
            ),
            if (peutVoter) ...[
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: FilledButton(
                  onPressed: voteEnCours ? null : onVoter,
                  child: const Text('Voter'),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
