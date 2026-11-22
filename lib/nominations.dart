// Nominations et bureaux, 21 nov. 2026 : page Nominations,
// administrateur général seul. Liste, création, modification et
// révocation des nominations, pour la structure, un établissement
// ou une activité. Le catalogue des fonctions vient du serveur,
// comme la page Administrateurs, jamais d'une liste locale.
// Les erreurs du serveur s'affichent telles quelles, jamais
// remplacées par un texte inventé.
import 'dart:async';

import 'package:flutter/material.dart';

import 'api.dart';
import 'app_models.dart';
import 'i18n.dart';
import 'main.dart';

class NominationsPage extends StatefulWidget {
  const NominationsPage({super.key});
  @override
  State<NominationsPage> createState() => _NominationsPageState();
}

class _NominationsPageState extends State<NominationsPage> {
  List<Map<String, dynamic>> _nominations = [];
  List<Map<String, dynamic>> _fonctions = [];
  List<Map<String, dynamic>> _membres = [];
  List<Map<String, dynamic>> _evenements = [];
  bool _loading = true;
  bool _cataloguesCharges = false;
  String? _erreur;
  String _porteeFiltre = '';
  String _etablissementFiltre = '';
  String _evenementFiltre = '';
  bool _activesSeulement = true;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final liste = await api.fetchNominationsAdmin(
        portee: _porteeFiltre.isEmpty ? null : _porteeFiltre,
        etablissementId: _etablissementFiltre.isEmpty ? null : _etablissementFiltre,
        evenementId: _evenementFiltre.isEmpty ? null : _evenementFiltre,
        actives: _activesSeulement ? true : null,
      );
      if (!_cataloguesCharges) {
        final fonctions = await api.fetchFonctionsAdmin();
        final membres = await api.fetchAdminMembres(inclureSansEtablissement: true);
        final evenements = await api.fetchEvenements();
        if (!mounted) return;
        setState(() {
          _fonctions = fonctions;
          _membres = membres;
          _evenements = evenements;
          _cataloguesCharges = true;
        });
      }
      if (!mounted) return;
      setState(() {
        _nominations = liste;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  Widget _pastilleStatut(Map<String, dynamic> n) {
    final statut = nominationStatut(n);
    final couleur = statut == 'active'
        ? const Color(0xFFE7F6EC)
        : statut == 'a_venir'
            ? const Color(0xFFFFF3E0)
            : const Color(0xFFFDECEA);
    final texte = statut == 'active'
        ? Cp.ok
        : statut == 'a_venir'
            ? const Color(0xFFB47B17)
            : Cp.danger;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(color: couleur, borderRadius: BorderRadius.circular(999)),
      child: Text(
        nominationStatutLabel(n),
        style: TextStyle(color: texte, fontWeight: FontWeight.w700, fontSize: 13),
      ),
    );
  }

  Future<void> _revoquer(Map<String, dynamic> n) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Révoquer cette nomination ?')),
        content: Text('${(n['nom_complet'] ?? '').toString()} · ${(n['fonction_libelle'] ?? '').toString()}'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Révoquer'))),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await api.revoquerNomination((n['id'] ?? '').toString());
      if (!mounted) return;
      toast(context, tr('Nomination révoquée.'));
      _charger();
    } catch (e) {
      if (!mounted) return;
      toast(context, e.toString());
    }
  }

  Future<void> _modifier(Map<String, dynamic> n) async {
    var fonctionCode = (n['fonction_code'] ?? '').toString();
    DateTime? debut = DateTime.tryParse((n['debute_le'] ?? '').toString());
    DateTime? fin = DateTime.tryParse((n['finit_le'] ?? '').toString());
    var enCours = false;
    String? erreur;
    final sauve = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setDialog) => AlertDialog(
          title: Text(tr('Modifier la nomination')),
          content: SingleChildScrollView(
            child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.stretch, children: [
              Text('${(n['nom_complet'] ?? '').toString()} · ${(n['matricule'] ?? '').toString()}', style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
              const SizedBox(height: Cp.s1),
              DropdownButtonFormField<String>(
                value: fonctionCode.isEmpty ? null : fonctionCode,
                decoration: InputDecoration(labelText: tr('Fonction')),
                items: [
                  for (final f in _fonctions)
                    DropdownMenuItem(value: (f['code'] ?? '').toString(), child: Text((f['libelle'] ?? f['code'] ?? '').toString())),
                ],
                onChanged: (v) => setDialog(() => fonctionCode = v ?? ''),
              ),
              const SizedBox(height: Cp.s1),
              ListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(tr('Début')),
                subtitle: Text(debut == null ? tr('Non renseigné') : dateIsoCourte(birthIso(debut!))),
                trailing: const Icon(Icons.calendar_month_outlined, color: Cp.navy),
                onTap: () async {
                  final choisi = await showDatePicker(context: ctx, initialDate: debut ?? DateTime.now(), firstDate: DateTime(2000), lastDate: DateTime(2100));
                  if (choisi != null) setDialog(() => debut = choisi);
                },
              ),
              ListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(tr('Fin')),
                subtitle: Text(fin == null ? tr('Sans fin') : dateIsoCourte(birthIso(fin!))),
                trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                  if (fin != null)
                    IconButton(tooltip: tr('Effacer'), icon: const Icon(Icons.clear_outlined), onPressed: () => setDialog(() => fin = null)),
                  const Icon(Icons.calendar_month_outlined, color: Cp.navy),
                ]),
                onTap: () async {
                  final choisi = await showDatePicker(context: ctx, initialDate: fin ?? DateTime.now(), firstDate: DateTime(2000), lastDate: DateTime(2100));
                  if (choisi != null) setDialog(() => fin = choisi);
                },
              ),
              if (erreur != null) Text(erreur!, style: const TextStyle(color: Cp.danger)),
            ]),
          ),
          actions: [
            TextButton(onPressed: enCours ? null : () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(
              onPressed: enCours
                  ? null
                  : () async {
                      if (fonctionCode.isEmpty) {
                        setDialog(() => erreur = tr('Choisis une fonction.'));
                        return;
                      }
                      setDialog(() {
                        enCours = true;
                        erreur = null;
                      });
                      try {
                        await api.modifierNomination((n['id'] ?? '').toString(), {
                          'fonction_code': fonctionCode,
                          'debute_le': debut == null ? null : birthIso(debut!),
                          'finit_le': fin == null ? null : birthIso(fin!),
                        });
                        if (ctx.mounted) Navigator.pop(ctx, true);
                      } catch (e) {
                        setDialog(() {
                          enCours = false;
                          erreur = e.toString();
                        });
                      }
                    },
              child: Text(enCours ? tr('En cours…') : tr('Enregistrer')),
            ),
          ],
        ),
      ),
    );
    if (sauve == true && mounted) {
      toast(context, tr('Nomination modifiée.'));
      _charger();
    }
  }

  Future<void> _creer() async {
    var recherche = '';
    Map<String, dynamic>? membreChoisi;
    var fonctionCode = '';
    var portee = 'structure';
    var etablissementId = '';
    var evenementId = '';
    DateTime? debut;
    DateTime? fin;
    var enCours = false;
    String? erreur;
    final cree = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setDialog) {
          final query = recherche.trim().toLowerCase();
          final correspondances = query.isEmpty
              ? const <Map<String, dynamic>>[]
              : _membres
                  .where((m) => ((m['nom_complet'] ?? '').toString().toLowerCase().contains(query)) || ((m['matricule'] ?? '').toString().toLowerCase().contains(query)))
                  .take(8)
                  .toList();
          return AlertDialog(
            title: Text(tr('Nommer un responsable')),
            content: SingleChildScrollView(
              child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.stretch, children: [
                TextField(
                  decoration: InputDecoration(labelText: tr('Membre, nom ou matricule')),
                  onChanged: (v) => setDialog(() {
                    recherche = v;
                    membreChoisi = null;
                  }),
                ),
                if (correspondances.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  for (final m in correspondances)
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text((m['nom_complet'] ?? '').toString()),
                      subtitle: Text((m['matricule'] ?? '').toString()),
                      onTap: () => setDialog(() {
                        membreChoisi = m;
                        recherche = (m['nom_complet'] ?? '').toString();
                      }),
                    ),
                ],
                if (membreChoisi != null) ...[
                  const SizedBox(height: 4),
                  Text('${(membreChoisi!['nom_complet'] ?? '').toString()} · ${(membreChoisi!['matricule'] ?? '').toString()}', style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
                ],
                const SizedBox(height: Cp.s1),
                DropdownButtonFormField<String>(
                  value: fonctionCode.isEmpty ? null : fonctionCode,
                  decoration: InputDecoration(labelText: tr('Fonction')),
                  items: [
                    for (final f in _fonctions)
                      DropdownMenuItem(value: (f['code'] ?? '').toString(), child: Text((f['libelle'] ?? f['code'] ?? '').toString())),
                  ],
                  onChanged: (v) => setDialog(() => fonctionCode = v ?? ''),
                ),
                const SizedBox(height: Cp.s1),
                DropdownButtonFormField<String>(
                  value: portee,
                  decoration: InputDecoration(labelText: tr('Portée')),
                  items: [
                    DropdownMenuItem(value: 'structure', child: Text(tr('Toute la structure'))),
                    DropdownMenuItem(value: 'etablissement', child: Text(tr('Établissement'))),
                    DropdownMenuItem(value: 'activite', child: Text(tr('Activité'))),
                  ],
                  onChanged: (v) => setDialog(() {
                    portee = v ?? 'structure';
                    etablissementId = '';
                    evenementId = '';
                  }),
                ),
                if (portee == 'etablissement') ...[
                  const SizedBox(height: Cp.s1),
                  DropdownButtonFormField<String>(
                    value: etablissementId.isEmpty ? null : etablissementId,
                    decoration: InputDecoration(labelText: tr('Établissement')),
                    items: [
                      for (final e in app.etabs.where((e) => e.id.isNotEmpty))
                        DropdownMenuItem(value: e.id, child: Text(etabDisplayName(e.name))),
                    ],
                    onChanged: (v) => setDialog(() => etablissementId = v ?? ''),
                  ),
                ],
                if (portee == 'activite') ...[
                  const SizedBox(height: Cp.s1),
                  DropdownButtonFormField<String>(
                    value: evenementId.isEmpty ? null : evenementId,
                    decoration: InputDecoration(labelText: tr('Activité')),
                    items: [
                      for (final e in _evenements)
                        DropdownMenuItem(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
                    ],
                    onChanged: (v) => setDialog(() => evenementId = v ?? ''),
                  ),
                ],
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(tr('Début')),
                  subtitle: Text(debut == null ? tr('Aujourd’hui') : dateIsoCourte(birthIso(debut!))),
                  trailing: const Icon(Icons.calendar_month_outlined, color: Cp.navy),
                  onTap: () async {
                    final choisi = await showDatePicker(context: ctx, initialDate: debut ?? DateTime.now(), firstDate: DateTime(2000), lastDate: DateTime(2100));
                    if (choisi != null) setDialog(() => debut = choisi);
                  },
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(tr('Fin')),
                  subtitle: Text(fin == null ? tr('Sans fin') : dateIsoCourte(birthIso(fin!))),
                  trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                    if (fin != null)
                      IconButton(tooltip: tr('Effacer'), icon: const Icon(Icons.clear_outlined), onPressed: () => setDialog(() => fin = null)),
                    const Icon(Icons.calendar_month_outlined, color: Cp.navy),
                  ]),
                  onTap: () async {
                    final choisi = await showDatePicker(context: ctx, initialDate: fin ?? DateTime.now(), firstDate: DateTime(2000), lastDate: DateTime(2100));
                    if (choisi != null) setDialog(() => fin = choisi);
                  },
                ),
                if (erreur != null) Text(erreur!, style: const TextStyle(color: Cp.danger)),
              ]),
            ),
            actions: [
              TextButton(onPressed: enCours ? null : () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
              FilledButton(
                onPressed: enCours
                    ? null
                    : () async {
                        if (membreChoisi == null) {
                          setDialog(() => erreur = tr('Choisis un membre.'));
                          return;
                        }
                        if (fonctionCode.isEmpty) {
                          setDialog(() => erreur = tr('Choisis une fonction.'));
                          return;
                        }
                        if (portee == 'etablissement' && etablissementId.isEmpty) {
                          setDialog(() => erreur = tr('Choisis un établissement.'));
                          return;
                        }
                        if (portee == 'activite' && evenementId.isEmpty) {
                          setDialog(() => erreur = tr('Choisis une activité.'));
                          return;
                        }
                        setDialog(() {
                          enCours = true;
                          erreur = null;
                        });
                        try {
                          await api.creerNomination({
                            'membre_id': (membreChoisi!['id'] ?? '').toString(),
                            'portee': portee,
                            'fonction_code': fonctionCode,
                            if (portee == 'etablissement') 'etablissement_id': etablissementId,
                            if (portee == 'activite') 'evenement_id': evenementId,
                            if (debut != null) 'debute_le': birthIso(debut!),
                            if (fin != null) 'finit_le': birthIso(fin!),
                          });
                          if (ctx.mounted) Navigator.pop(ctx, true);
                        } catch (e) {
                          setDialog(() {
                            enCours = false;
                            erreur = e.toString();
                          });
                        }
                      },
                child: Text(enCours ? tr('En cours…') : tr('Nommer')),
              ),
            ],
          );
        },
      ),
    );
    if (cree == true && mounted) {
      toast(context, tr('Nomination créée.'));
      _charger();
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!app.isAdminGeneral) {
      return basic(tr('Nominations'), [
        EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé à l’administrateur général.')),
      ]);
    }
    final t = Theme.of(context).textTheme;
    final etabsFiltre = app.etabs.where((e) => e.id.isNotEmpty).toList();
    return basic(tr('Nominations'), [
      Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(tr('Nominations'), style: t.titleLarge?.copyWith(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: 4),
          Text(tr('Nommer une fonction pour la structure, un établissement ou une activité.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 15)),
        ])),
        const SizedBox(width: 12),
        goldButton(icon: Icons.add_outlined, label: tr('Nommer'), onPressed: _creer),
      ]),
      const SizedBox(height: Cp.s1),
      DropdownButtonFormField<String>(
        value: _porteeFiltre,
        decoration: InputDecoration(labelText: tr('Portée')),
        items: [
          DropdownMenuItem(value: '', child: Text(tr('Toutes les portées'))),
          DropdownMenuItem(value: 'structure', child: Text(tr('Toute la structure'))),
          DropdownMenuItem(value: 'etablissement', child: Text(tr('Établissement'))),
          DropdownMenuItem(value: 'activite', child: Text(tr('Activité'))),
        ],
        onChanged: (v) {
          setState(() {
            _porteeFiltre = v ?? '';
            _etablissementFiltre = '';
            _evenementFiltre = '';
          });
          _charger();
        },
      ),
      if (_porteeFiltre.isEmpty || _porteeFiltre == 'etablissement') ...[
        const SizedBox(height: Cp.s1),
        DropdownButtonFormField<String>(
          value: _etablissementFiltre,
          decoration: InputDecoration(labelText: tr('Établissement')),
          items: [
            DropdownMenuItem(value: '', child: Text(tr('Tous les établissements'))),
            for (final e in etabsFiltre) DropdownMenuItem(value: e.id, child: Text(etabDisplayName(e.name))),
          ],
          onChanged: (v) {
            setState(() => _etablissementFiltre = v ?? '');
            _charger();
          },
        ),
      ],
      if (_porteeFiltre.isEmpty || _porteeFiltre == 'activite') ...[
        const SizedBox(height: Cp.s1),
        DropdownButtonFormField<String>(
          value: _evenementFiltre,
          decoration: InputDecoration(labelText: tr('Activité')),
          items: [
            DropdownMenuItem(value: '', child: Text(tr('Toutes les activités'))),
            for (final e in _evenements) DropdownMenuItem(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) {
            setState(() => _evenementFiltre = v ?? '');
            _charger();
          },
        ),
      ],
      const SizedBox(height: Cp.s1),
      Row(children: [
        Expanded(
          child: OutlinedButton.icon(
            onPressed: () {
              setState(() => _activesSeulement = !_activesSeulement);
              _charger();
            },
            icon: Icon(_activesSeulement ? Icons.check_box_outlined : Icons.check_box_outline_blank_outlined),
            label: Text(tr('Actives seulement')),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: OutlinedButton.icon(
            onPressed: _charger,
            icon: const Icon(Icons.refresh_outlined),
            label: Text(tr('Actualiser')),
          ),
        ),
      ]),
      const SizedBox(height: Cp.s1),
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_erreur != null)
        EmptyNote(icon: Icons.error_outline, text: _erreur!)
      else if (_nominations.isEmpty)
        EmptyNote(icon: Icons.badge_outlined, text: tr('Aucune nomination pour ces filtres.'))
      else
        for (final n in _nominations) ...[
          Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(child: Text((n['fonction_libelle'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                  _pastilleStatut(n),
                ]),
                const SizedBox(height: 2),
                Text('${(n['nom_complet'] ?? '').toString()} · ${(n['matricule'] ?? '').toString()}', style: t.bodyMedium),
                const SizedBox(height: 2),
                Text('${nominationPorteeLabel(n)} · ${nominationDatesLabel(n)}', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                if (((n['membre_etablissement'] ?? '').toString()).isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Text('${tr('Établissement du membre')} : ${(n['membre_etablissement'] ?? '').toString()}', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                ],
                if (nominationStatut(n) != 'expiree' && nominationStatut(n) != 'revoquee') ...[
                  const SizedBox(height: Cp.s1),
                  Row(children: [
                    OutlinedButton(onPressed: () => _modifier(n), child: Text(tr('Modifier'))),
                    const SizedBox(width: 8),
                    TextButton(onPressed: () => _revoquer(n), child: Text(tr('Révoquer'), style: const TextStyle(color: Cp.danger))),
                  ]),
                ],
              ]),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ],
    ], onRefresh: _charger);
  }
}
