// Établissements, tranche T18, 27 nov. 2026.
// Disposition de l'ancienne version, décision d'Axel du
// 26 nov. 17 h 01 : le bureau est dans son établissement.
// Les compteurs viennent du serveur, jamais de données en dur.
import 'package:flutter/material.dart';

import 'modeles_profil.dart';
import 'modeles_t18.dart';
import 'palette.dart';
import 'service_t18.dart';

/// Page « Nos établissements ».
class PageEtablissements extends StatefulWidget {
  const PageEtablissements({
    super.key,
    required this.service,
    this.onOuvrirStructure,
    this.poussee = false,
  });

  final ServiceT18 service;

  /// Ouverture de la vue Structure, pour la carte pointillée.
  final VoidCallback? onOuvrirStructure;

  /// Vrai quand la page est poussée depuis une autre page :
  /// une AppBar avec flèche retour s'affiche alors. En
  /// destination, le chevron de la coquille suffit, pas de
  /// double barre, et la barre du bas reste visible.
  final bool poussee;

  @override
  State<PageEtablissements> createState() => _PageEtablissementsState();
}

class _PageEtablissementsState extends State<PageEtablissements> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerEtablissements();
    await widget.service.chargerAccesAdmin();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _ajouter() async {
    final nom = await _demanderNom(context, 'Ajouter un établissement');
    if (nom == null || nom.trim().isEmpty) return;
    final ok = await widget.service.creerEtablissement(nom.trim());
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          ok ? 'Établissement ajouté.' : 'Ajout impossible, réessaie.',
        ),
      ),
    );
  }

  Future<void> _renommer(EtablissementAdmin e) async {
    final nom = await _demanderNom(
      context,
      'Renommer l’établissement',
      initial: e.nom,
    );
    if (nom == null || nom.trim().isEmpty || nom.trim() == e.nom) return;
    final ok = await widget.service.renommerEtablissement(e.id, nom.trim());
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          ok ? 'Établissement renommé.' : 'Renommage impossible.',
        ),
      ),
    );
  }

  Future<void> _definirMien(EtablissementAdmin e) async {
    final ok = await widget.service.definirMonEtablissement(e.id);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          ok
              ? 'Ton établissement est ${e.nom}.'
              : 'Impossible de définir ton établissement.',
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final etablissements = widget.service.etablissements;
    final contenu = ListView(
      padding: const EdgeInsets.fromLTRB(20, 24, 20, 32),
      children: [
        const Text(
          'Chaque établissement a ses activités, événements et '
          'actualités.',
          style: TextStyle(fontSize: 15, color: Colors.black54),
        ),
        if (widget.service.accesAdmin) ...[
          const SizedBox(height: 16),
          FilledButton.icon(
            onPressed: _ajouter,
            icon: const Icon(Icons.add),
            label: const Text('Ajouter un établissement'),
          ),
        ],
        const SizedBox(height: 20),
        if (!_charge)
          const Center(child: CircularProgressIndicator())
        else if (etablissements.isEmpty)
          const Text(
            'Aucun établissement pour le moment.',
            style: TextStyle(fontSize: 15, color: Colors.black54),
          )
        else
          LayoutBuilder(
            builder: (context, contraintes) {
              if (contraintes.maxWidth >= 720) {
                return GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 300 / 280,
                  ),
                  itemCount: etablissements.length,
                  itemBuilder: (context, index) => _CarteEtablissement(
                    etablissement: etablissements[index],
                    service: widget.service,
                    onRenommer: () => _renommer(etablissements[index]),
                    onDefinirMien: () => _definirMien(etablissements[index]),
                  ),
                );
              }
              return ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: etablissements.length,
                separatorBuilder: (_, __) => const SizedBox(height: 12),
                itemBuilder: (context, index) => _CarteEtablissement(
                  etablissement: etablissements[index],
                  service: widget.service,
                  etireBouton: false,
                  onRenommer: () => _renommer(etablissements[index]),
                  onDefinirMien: () => _definirMien(etablissements[index]),
                ),
              );
            },
          ),
        const SizedBox(height: 16),
        _CarteStructure(onTap: widget.onOuvrirStructure),
      ],
    );
    if (!widget.poussee) return contenu;
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        title: const Text(
          'Nos établissements',
          style: TextStyle(color: PaletteNouvelle.bleuNuit),
        ),
        backgroundColor: Colors.white,
        foregroundColor: PaletteNouvelle.bleuNuit,
      ),
      body: contenu,
    );
  }
}

/// Demande un nom dans un dialogue, pour ajouter ou renommer.
Future<String?> _demanderNom(
  BuildContext context,
  String titre, {
  String? initial,
}) async {
  final controle = TextEditingController(text: initial ?? '');
  return showDialog<String>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(titre),
      content: TextField(
        controller: controle,
        autofocus: true,
        decoration: const InputDecoration(
          labelText: 'Nom de l’établissement',
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Annuler'),
        ),
        FilledButton(
          onPressed: () => Navigator.of(context).pop(controle.text),
          child: const Text('Enregistrer'),
        ),
      ],
    ),
  );
}

class _CarteEtablissement extends StatelessWidget {
  const _CarteEtablissement({
    required this.etablissement,
    required this.service,
    required this.onRenommer,
    required this.onDefinirMien,
    this.etireBouton = true,
  });

  final EtablissementAdmin etablissement;
  final ServiceT18 service;
  final VoidCallback onRenommer;
  final VoidCallback onDefinirMien;

  /// Vrai sur grand écran, grille à cellules uniformes : le
  /// bouton est plaqué en bas de la carte. Faux en liste
  /// verticale, la carte prend la hauteur de son contenu,
  /// sans vide ni débordement.
  final bool etireBouton;

  void _ouvrir(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => PageFicheEtablissement(
          service: service,
          etablissement: etablissement,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color:
              etablissement.estMien ? PaletteNouvelle.or : Colors.transparent,
          width: 2,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const CircleAvatar(
                  backgroundColor: PaletteNouvelle.bleuNuit,
                  child: Icon(
                    Icons.school_outlined,
                    color: PaletteNouvelle.or,
                  ),
                ),
                const SizedBox(width: 8),
                if (etablissement.estMien)
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
                      'MON ÉTABLISSEMENT',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: PaletteNouvelle.bleuNuit,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              etablissement.nom,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                fontFamily: 'Cinzel',
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: PaletteNouvelle.bleuNuit,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              etablissement.compteurs,
              style: const TextStyle(fontSize: 13, color: Colors.black54),
            ),
            if (etireBouton) const Spacer() else const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: () => _ouvrir(context),
                style: FilledButton.styleFrom(
                  backgroundColor: PaletteNouvelle.or,
                  foregroundColor: PaletteNouvelle.bleuNuit,
                ),
                child: const Text('Voir les activités'),
              ),
            ),
            if (service.accesAdmin) ...[
              const SizedBox(height: 4),
              Wrap(
                spacing: 4,
                children: [
                  TextButton(
                    onPressed: onRenommer,
                    child: const Text('Renommer'),
                  ),
                  if (!etablissement.estMien)
                    TextButton(
                      onPressed: onDefinirMien,
                      child: const Text('Mon établissement'),
                    ),
                ],
              ),
            ] else if (!etablissement.estMien) ...[
              const SizedBox(height: 4),
              TextButton(
                onPressed: onDefinirMien,
                child: const Text('Définir comme mon établissement'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// Carte pointillée « Structure (tous) ».
class _CarteStructure extends StatelessWidget {
  const _CarteStructure({this.onTap});
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: CustomPaint(
        painter: _BordurePointillee(
          color: PaletteNouvelle.bleuNuit,
          rayon: 16,
        ),
        child: const SizedBox(
          height: 96,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.account_balance_outlined,
                color: PaletteNouvelle.bleuNuit,
              ),
              SizedBox(width: 10),
              Text(
                'Structure (tous)',
                style: TextStyle(
                  fontFamily: 'Cinzel',
                  fontSize: 17,
                  fontWeight: FontWeight.w700,
                  color: PaletteNouvelle.bleuNuit,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Bordure pointillée, pour la carte « Structure (tous) ».
class _BordurePointillee extends CustomPainter {
  const _BordurePointillee({required this.color, required this.rayon});
  final Color color;
  final double rayon;

  @override
  void paint(Canvas canvas, Size size) {
    final peinture = Paint()
      ..color = color
      ..strokeWidth = 1.5
      ..style = PaintingStyle.stroke;
    final rect = RRect.fromRectAndRadius(
      Offset.zero & size,
      Radius.circular(rayon),
    );
    const trait = 6.0;
    const espace = 4.0;
    final chemin = Path()..addRRect(rect);
    final mesures = chemin.computeMetrics();
    for (final mesure in mesures) {
      var distance = 0.0;
      while (distance < mesure.length) {
        final fin = (distance + trait).clamp(0.0, mesure.length);
        canvas.drawPath(
          mesure.extractPath(distance, fin),
          peinture,
        );
        distance += trait + espace;
      }
    }
  }

  @override
  bool shouldRepaint(_BordurePointillee ancien) =>
      ancien.color != color || ancien.rayon != rayon;
}

/// Fiche d'un établissement : actualités, activités,
/// programme à venir, responsables, mes attestations.
class PageFicheEtablissement extends StatefulWidget {
  const PageFicheEtablissement({
    super.key,
    required this.service,
    required this.etablissement,
  });

  final ServiceT18 service;
  final EtablissementAdmin etablissement;

  @override
  State<PageFicheEtablissement> createState() => _PageFicheEtablissementState();
}

class _PageFicheEtablissementState extends State<PageFicheEtablissement> {
  var _charge = false;
  final _titreActivite = TextEditingController();

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _titreActivite.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await widget.service.chargerFicheEtablissement(
      widget.etablissement.id,
    );
    await widget.service.chargerEvenements();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _publierActivite() async {
    final titre = _titreActivite.text.trim();
    if (titre.isEmpty) return;
    final ok = await widget.service.publierActiviteEtablissement(
      widget.etablissement.id,
      titre,
    );
    if (!mounted) return;
    if (ok) _titreActivite.clear();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          ok ? 'Activité publiée.' : 'Publication impossible.',
        ),
      ),
    );
  }

  /// Prochain camp de l'établissement, sinon de la structure,
  /// sinon « À confirmer ».
  EvenementAdmin? _prochainCamp() {
    final tous = widget.service.evenements;
    final ici = tous
        .where((e) => e.etablissementId == widget.etablissement.id)
        .toList();
    return EvenementAdmin.prochain(ici.isNotEmpty ? ici : tous);
  }

  @override
  Widget build(BuildContext context) {
    final fiche = widget.service.ficheEtablissement;
    final prochain = _prochainCamp();
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        title: Text(
          widget.etablissement.nom,
          style: const TextStyle(color: PaletteNouvelle.bleuNuit),
        ),
        backgroundColor: Colors.white,
        foregroundColor: PaletteNouvelle.bleuNuit,
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
              children: [
                const _TitreSectionFiche('Actualités'),
                const SizedBox(height: 10),
                if (fiche == null || fiche.actualites.isEmpty)
                  const Text(
                    'Aucune actualité pour cet établissement.',
                    style: TextStyle(fontSize: 14, color: Colors.black54),
                  )
                else
                  for (final actu in fiche.actualites)
                    _LigneFiche(
                      titre: actu.titre,
                      sousTitre: actu.texte,
                    ),
                const SizedBox(height: 24),
                const _TitreSectionFiche('Activités'),
                const SizedBox(height: 10),
                if (fiche == null || fiche.activites.isEmpty)
                  const Text(
                    'Aucune activité pour cet établissement.',
                    style: TextStyle(fontSize: 14, color: Colors.black54),
                  )
                else
                  for (final activite in fiche.activites)
                    _LigneFiche(
                      titre: activite.titre,
                      sousTitre: activite.description,
                    ),
                if (widget.service.accesAdmin) ...[
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _titreActivite,
                          decoration: const InputDecoration(
                            labelText: 'Nouvelle activité',
                            border: OutlineInputBorder(),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      FilledButton(
                        onPressed: _publierActivite,
                        child: const Text('Publier'),
                      ),
                    ],
                  ),
                ],
                const SizedBox(height: 24),
                const _TitreSectionFiche('Programme à venir'),
                const SizedBox(height: 10),
                _LigneFiche(
                  titre: prochain?.nom ?? 'À confirmer',
                  sousTitre: prochain == null
                      ? ''
                      : [
                          if (prochain.dateDebut != null)
                            afficherDate(prochain.dateDebut!),
                          if (prochain.lieu.isNotEmpty) prochain.lieu,
                        ].join(' · '),
                ),
                const SizedBox(height: 24),
                const _TitreSectionFiche('Responsables'),
                const SizedBox(height: 10),
                if (fiche == null ||
                    (fiche.bureau.isEmpty && fiche.nominations.isEmpty))
                  const Text(
                    'Aucun responsable pour cet établissement.',
                    style: TextStyle(fontSize: 14, color: Colors.black54),
                  )
                else ...[
                  for (final m in fiche.bureau)
                    _LigneFiche(
                      titre: (m['nom'] ?? '').toString(),
                      sousTitre: (m['fonction'] ?? '').toString(),
                    ),
                  for (final n in fiche.nominations)
                    _LigneFiche(
                      titre: n.nomComplet,
                      sousTitre: '${n.fonctionLibelle} · ${n.porteeLibelle}',
                    ),
                ],
                if (widget.service.accesAdmin) ...[
                  const SizedBox(height: 12),
                  OutlinedButton.icon(
                    onPressed: () => _ajouterResponsable(context),
                    icon: const Icon(Icons.person_add_outlined),
                    label: const Text('Ajouter un responsable'),
                  ),
                ],
                const SizedBox(height: 24),
                const _TitreSectionFiche('Mes attestations'),
                const SizedBox(height: 10),
                if (fiche == null || fiche.mesAttestations.isEmpty)
                  const Text(
                    'Aucune attestation.',
                    style: TextStyle(fontSize: 14, color: Colors.black54),
                  )
                else
                  for (final a in fiche.mesAttestations)
                    _LigneFiche(
                      titre: a.type,
                      sousTitre: a.reference,
                    ),
              ],
            ),
    );
  }

  Future<void> _ajouterResponsable(BuildContext context) async {
    final nom = TextEditingController();
    final fonction = TextEditingController();
    final contact = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Ajouter un responsable'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nom,
              decoration: const InputDecoration(labelText: 'Nom'),
            ),
            TextField(
              controller: fonction,
              decoration: const InputDecoration(labelText: 'Fonction'),
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
    );
    if (ok != true) return;
    if (nom.text.trim().isEmpty || fonction.text.trim().isEmpty) return;
    final ajoute = await widget.service.ajouterResponsable(
      nom: nom.text.trim(),
      fonction: fonction.text.trim(),
      contact: contact.text.trim().isEmpty ? null : contact.text.trim(),
      etablissementId: widget.etablissement.id,
    );
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          ajoute ? 'Responsable ajouté.' : 'Ajout impossible.',
        ),
      ),
    );
  }
}

class _TitreSectionFiche extends StatelessWidget {
  const _TitreSectionFiche(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Row(
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
            fontSize: 18,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
      ],
    );
  }
}

class _LigneFiche extends StatelessWidget {
  const _LigneFiche({required this.titre, required this.sousTitre});
  final String titre;
  final String sousTitre;

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
        subtitle: sousTitre.isEmpty ? null : Text(sousTitre),
      ),
    );
  }
}
