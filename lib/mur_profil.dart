// Profil d'un membre du mur, mur v2 tranche 4, 25 nov. 2026 :
// en-tête bleu nuit avec photo, nom, fonction, établissement
// et présentation, compteurs (publications, réactions reçues,
// abonnés, abonnements), bouton Suivre ou Suivi, onglets
// Publications et À propos. À propos : présentation,
// établissement, fonction, membre depuis. Toucher un compteur
// ouvre la liste correspondante, les publications ouvrent
// l'onglet. Jamais le matricule sur ce profil, comme sur la
// planche. Le bouton Suivre est caché sur mon propre profil.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';
import 'mur_detail.dart';
import 'mur_membres.dart';

import 'messagerie_screens.dart' deferred as messagerie;

/// Fonction affichée : sans fonction précise, la carte
/// montre Membre, comme décidé pour la carte de membre.
String fonctionAfficheeProfil(String fonction) {
  final propre = fonction.trim();
  if (propre.isEmpty || propre.toLowerCase() == 'aucun') return tr('Membre');
  return propre;
}

/// Un membre du mur, tel que renvoyé par GET /mur/membres/:id.
class ProfilMur {
  ProfilMur({
    required this.id,
    this.nomComplet = '',
    this.fonction = '',
    this.etablissementNom = '',
    this.photo,
    this.presentation = '',
    this.inscritLe,
    this.nbPublications = 0,
    this.nbReactions = 0,
    this.nbAbonnes = 0,
    this.nbAbonnements = 0,
    this.suiviParMoi = false,
    this.estMoi = false,
  });

  factory ProfilMur.fromJson(Map<String, dynamic> j) {
    int nombre(Object? v) => v is int ? v : int.tryParse((v ?? '').toString()) ?? 0;
    return ProfilMur(
      id: (j['id'] ?? '').toString(),
      nomComplet: (j['nom_complet'] ?? '').toString(),
      fonction: (j['fonction'] ?? '').toString(),
      etablissementNom: (j['etablissement_nom'] ?? '').toString(),
      photo: j['photo'] as String?,
      presentation: (j['presentation'] ?? '').toString(),
      inscritLe: j['inscrit_le'] == null ? null : DateTime.tryParse(j['inscrit_le'].toString()),
      nbPublications: nombre(j['nb_publications']),
      nbReactions: nombre(j['nb_reactions']),
      nbAbonnes: nombre(j['nb_abonnes']),
      nbAbonnements: nombre(j['nb_abonnements']),
      suiviParMoi: j['suivi_par_moi'] == true,
      estMoi: j['est_moi'] == true,
    );
  }

  final String id;
  final String nomComplet;
  final String fonction;
  final String etablissementNom;
  final String? photo;
  final String presentation;
  final DateTime? inscritLe;
  final int nbPublications;
  final int nbReactions;
  final int nbAbonnes;
  final int nbAbonnements;
  final bool suiviParMoi;
  final bool estMoi;

  ProfilMur avecSuivi(bool suivi) => ProfilMur(
        id: id,
        nomComplet: nomComplet,
        fonction: fonction,
        etablissementNom: etablissementNom,
        photo: photo,
        presentation: presentation,
        inscritLe: inscritLe,
        nbPublications: nbPublications,
        nbReactions: nbReactions,
        nbAbonnes: nbAbonnes + (suivi ? 1 : -1),
        nbAbonnements: nbAbonnements,
        suiviParMoi: suivi,
        estMoi: estMoi,
      );
}

/// Un membre d'une liste d'abonnés ou d'abonnements : nom et
/// établissement seulement, sans photo en liste.
class MembreSuivi {
  MembreSuivi({required this.id, this.nomComplet = '', this.etablissementNom = ''});

  factory MembreSuivi.fromJson(Map<String, dynamic> j) => MembreSuivi(
        id: (j['id'] ?? '').toString(),
        nomComplet: (j['nom_complet'] ?? '').toString(),
        etablissementNom: (j['etablissement_nom'] ?? '').toString(),
      );

  final String id;
  final String nomComplet;
  final String etablissementNom;
}

class MurProfilPage extends StatefulWidget {
  const MurProfilPage({super.key, required this.membreId, this.client});

  final String membreId;
  final ApiClient? client;

  @override
  State<MurProfilPage> createState() => _MurProfilPageState();
}

class _MurProfilPageState extends State<MurProfilPage> {
  ApiClient get _client => widget.client ?? api;

  bool _charge = false;
  bool _erreur = false;
  bool _actionEnCours = false;
  bool _chargePlus = false;
  int _onglet = 0;
  ProfilMur? _profil;
  List<PublicationMur> _publications = [];
  String? _suivante;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger({bool pageSuivante = false}) async {
    if (pageSuivante) {
      if (_suivante == null) return;
      setState(() => _chargePlus = true);
    }
    try {
      final data = await _client.fetchProfilMur(widget.membreId, avant: pageSuivante ? _suivante : null);
      if (!mounted) return;
      final membre = (data['membre'] as Map<String, dynamic>?);
      final pubs = ((data['publications'] as List?) ?? [])
          .whereType<Map<String, dynamic>>()
          .map(PublicationMur.fromJson)
          .toList();
      setState(() {
        _charge = true;
        _erreur = false;
        _chargePlus = false;
        if (membre != null) _profil = ProfilMur.fromJson(membre);
        _publications = pageSuivante ? [..._publications, ...pubs] : pubs;
        _suivante = (data['suivante'] as String?)?.isEmpty == true ? null : data['suivante'] as String?;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _charge = true;
        _erreur = true;
        _chargePlus = false;
      });
    }
  }

  Future<void> _basculerSuivi() async {
    final profil = _profil;
    if (profil == null || _actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      if (profil.suiviParMoi) {
        await _client.nePlusSuivre(profil.id);
      } else {
        await _client.suivreMembre(profil.id);
      }
      if (!mounted) return;
      setState(() {
        _profil = profil.avecSuivi(!profil.suiviParMoi);
        _actionEnCours = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      toast(context, tr('Impossible de modifier le suivi.'));
    }
  }

  Future<void> _supprimer(PublicationMur p) async {
    if (!await confirmerSuppressionMur(context) || !mounted) return;
    try {
      await _client.supprimerPublicationMur(p.id);
      await _charger();
      if (mounted) toast(context, tr('Publication supprimée.'));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de supprimer la publication.'));
    }
  }

  Future<void> _supprimerVideo(PublicationMur p) async {
    if (!await confirmerSuppressionVideoMur(context) || !mounted) return;
    try {
      await _client.supprimerVideoMur(p.id);
      await _charger();
      if (mounted) toast(context, tr('Vidéo supprimée.'));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de supprimer la vidéo.'));
    }
  }

  Future<void> _basculerEnregistrement(PublicationMur p) async {
    try {
      if (p.enregistre) {
        await _client.retirerEnregistrement(p.id);
      } else {
        await _client.enregistrerPublication(p.id);
      }
      await _charger();
    } catch (_) {
      if (mounted) toast(context, tr('Impossible d’enregistrer.'));
    }
  }

  Future<void> _signaler(PublicationMur p) async {
    await messagerie.loadLibrary();
    if (!mounted) return;
    await messagerie.ouvrirFeuilleSignalement(
      context,
      apiClient: _client,
      cibleType: 'mur_publication',
      cibleId: p.id,
      contenuFige: p.texte,
    );
  }

  Future<void> _ouvrirDetail(PublicationMur p) async {
    await Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => MurDetailPage(publicationId: p.id, publicationInitiale: p, client: _client),
    ));
    if (!mounted) return;
    await _charger();
  }

  Future<void> _ouvrirListe(String titre, Future<Map<String, dynamic>> appel) async {
    List<MembreSuivi> membres = [];
    try {
      final data = await appel;
      membres = ((data['membres'] as List?) ?? []).whereType<Map<String, dynamic>>().map(MembreSuivi.fromJson).toList();
    } catch (_) {
      if (!mounted) return;
      toast(context, tr('Impossible de charger la liste.'));
      return;
    }
    if (!mounted) return;
    await Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => MurListeMembresPage(titre: titre, membres: membres, client: _client),
    ));
  }

  Widget _compteur(String libelle, int nombre, VoidCallback? onTap) {
    final contenu = Column(children: [
      Text('$nombre', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 18)),
      const SizedBox(height: 2),
      Text(libelle, style: const TextStyle(color: Colors.white70, fontSize: 12)),
    ]);
    if (onTap == null) return Expanded(child: contenu);
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: contenu,
      ),
    );
  }

  Widget _boutonOnglet(String libelle, int index) {
    final actif = _onglet == index;
    return Expanded(
      child: TextButton(
        onPressed: () => setState(() => _onglet = index),
        style: TextButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 10),
          shape: const RoundedRectangleBorder(),
        ),
        child: Text(
          libelle,
          style: TextStyle(
            color: actif ? Cp.navy : Cp.inkMuted,
            fontWeight: actif ? FontWeight.w800 : FontWeight.w600,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final profil = _profil;
    if (!_charge) {
      return basic(tr('Profil'), const [Center(child: CircularProgressIndicator())], fond: Container(color: Cp.card));
    }
    if (_erreur || profil == null) {
      return basic(
        tr('Profil'),
        [
          Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Text(tr('Impossible de charger ce profil.'), textAlign: TextAlign.center),
            ),
          ),
        ],
        fond: Container(color: Cp.card),
        onRefresh: _charger,
      );
    }
    final photoOctets = octetsPhotoMur(profil.photo);
    final enfants = <Widget>[
      Container(
        width: double.infinity,
        decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusCard)),
        padding: const EdgeInsets.all(16),
        child: Column(children: [
          photoOctets != null
              ? CircleAvatar(radius: 36, backgroundImage: MemoryImage(photoOctets))
              : const CircleAvatar(
                  radius: 36,
                  backgroundColor: Colors.white24,
                  child: Icon(Icons.person_outlined, color: Cp.gold, size: 40),
                ),
          const SizedBox(height: 10),
          Text(
            profil.nomComplet,
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 20),
          ),
          const SizedBox(height: 2),
          Text(
            [fonctionAfficheeProfil(profil.fonction), profil.etablissementNom].where((s) => s.isNotEmpty).join(' · '),
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white70, fontSize: 14),
          ),
          if (profil.presentation.isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(profil.presentation, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white, fontSize: 14)),
          ],
          const SizedBox(height: 14),
          Row(children: [
            _compteur(tr('Publications'), profil.nbPublications, () => setState(() => _onglet = 0)),
            _compteur(tr('Réactions'), profil.nbReactions, null),
            _compteur(tr('Abonnés'), profil.nbAbonnes, () => _ouvrirListe(tr('Abonnés'), _client.fetchAbonnes(profil.id))),
            _compteur(tr('Abonnements'), profil.nbAbonnements, () => _ouvrirListe(tr('Abonnements'), _client.fetchAbonnements(profil.id))),
          ]),
          if (!profil.estMoi) ...[
            const SizedBox(height: 14),
            SizedBox(
              width: double.infinity,
              child: profil.suiviParMoi
                  ? OutlinedButton(
                      onPressed: _actionEnCours ? null : _basculerSuivi,
                      style: OutlinedButton.styleFrom(foregroundColor: Colors.white, side: const BorderSide(color: Colors.white)),
                      child: Text(tr('Suivi')),
                    )
                  : ElevatedButton(
                      onPressed: _actionEnCours ? null : _basculerSuivi,
                      style: ElevatedButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
                      child: Text(tr('Suivre')),
                    ),
            ),
          ],
        ]),
      ),
      const SizedBox(height: Cp.s2),
      Row(children: [
        _boutonOnglet(tr('Publications'), 0),
        _boutonOnglet(tr('À propos'), 1),
      ]),
      Container(height: 2, color: Cp.line),
      const SizedBox(height: Cp.s2),
      if (_onglet == 0) ...[
        if (_publications.isEmpty)
          EmptyNote(icon: Icons.people_outlined, text: tr('Aucune publication pour le moment.')),
        for (final p in _publications) ...[
          CartePublicationMur(
            publication: p,
            photoAuteur: profil.photo,
            onSupprimer: () => _supprimer(p),
            onSupprimerVideo: () => _supprimerVideo(p),
            onPartager: () => partagerPublicationMur(context, p),
            onBasculerEnregistrement: () => _basculerEnregistrement(p),
            onSignaler: () => _signaler(p),
            onOuvrir: () => _ouvrirDetail(p),
          ),
          const SizedBox(height: Cp.s1),
        ],
        if (_suivante != null)
          Padding(
            padding: const EdgeInsets.only(top: Cp.s1),
            child: _chargePlus
                ? const Center(child: CircularProgressIndicator())
                : OutlinedButton(
                    onPressed: () => _charger(pageSuivante: true),
                    child: Text(tr('Afficher plus')),
                  ),
          ),
      ] else ...[
        _LigneAPropos(libelle: tr('Présentation'), valeur: profil.presentation),
        _LigneAPropos(libelle: tr('Établissement'), valeur: profil.etablissementNom),
        _LigneAPropos(libelle: tr('Fonction'), valeur: fonctionAfficheeProfil(profil.fonction)),
        _LigneAPropos(libelle: tr('Membre depuis'), valeur: dateCourteMurPublication(profil.inscritLe)),
      ],
    ];
    return basic(profil.nomComplet, enfants, fond: Container(color: Cp.card), onRefresh: _charger);
  }
}

class _LigneAPropos extends StatelessWidget {
  const _LigneAPropos({required this.libelle, required this.valeur});

  final String libelle;
  final String valeur;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(libelle, style: const TextStyle(color: Cp.inkMuted, fontWeight: FontWeight.w700, fontSize: 13)),
        const SizedBox(height: 2),
        Text(valeur.isEmpty ? '—' : valeur, style: const TextStyle(fontSize: 15)),
      ]),
    );
  }
}

/// Liste d'abonnés ou d'abonnements : nom et établissement,
/// toucher un membre ouvre son profil.
class MurListeMembresPage extends StatelessWidget {
  const MurListeMembresPage({super.key, required this.titre, required this.membres, this.client});

  final String titre;
  final List<MembreSuivi> membres;
  final ApiClient? client;

  @override
  Widget build(BuildContext context) {
    if (membres.isEmpty) {
      return basic(
        titre,
        [EmptyNote(icon: Icons.people_outlined, text: tr('Aucun membre pour le moment.'))],
        fond: Container(color: Cp.card),
      );
    }
    return basic(
      titre,
      [
        for (final m in membres)
          ListTile(
            title: Text(m.nomComplet, style: const TextStyle(fontWeight: FontWeight.w700)),
            subtitle: m.etablissementNom.isEmpty ? null : Text(m.etablissementNom),
            trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
            onTap: () => Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => MurProfilPage(membreId: m.id, client: client ?? api),
            )),
          ),
      ],
      fond: Container(color: Cp.card),
    );
  }
}
