// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// Notifications de la cloche, à partir de GET /notifications :
// Toutes, Mentions (type mur_mention), Activité (les autres
// types du mur). Un toucher ouvre le détail de la publication
// ou le profil du suiveur, selon le lien.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../print_doc.dart';
import 'carte_publication.dart';
import 'modeles_connexion.dart';
import 'modeles_t18.dart';
import 'palette.dart';

enum _FiltreNotifications { toutes, mentions, activite }

class PageNotificationsConnexion extends StatefulWidget {
  const PageNotificationsConnexion({
    super.key,
    required this.service,
    this.onOuvrirPublication,
    this.onOuvrirProfil,
    this.onOuvrirCotisation,
  });
  final ServiceConnexion service;
  final ValueChanged<String>? onOuvrirPublication;
  final ValueChanged<String>? onOuvrirProfil;

  /// Ouvre le paiement de la cotisation, depuis le rappel
  /// de cotisation, correction de suivi 27 nov. 2026.
  final VoidCallback? onOuvrirCotisation;

  @override
  State<PageNotificationsConnexion> createState() =>
      _PageNotificationsConnexionState();
}

class _PageNotificationsConnexionState
    extends State<PageNotificationsConnexion> {
  List<NotificationConnexion> _notifications = [];
  bool _chargement = true;
  String? _erreur;
  _FiltreNotifications _filtre = _FiltreNotifications.toutes;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final liste = await widget.service.chargerNotifications();
      if (!mounted) return;
      setState(() {
        _notifications = liste;
        _chargement = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur =
            'Les notifications ne peuvent pas être chargées pour le moment.';
      });
    }
  }

  List<NotificationConnexion> get _filtrees {
    return switch (_filtre) {
      _FiltreNotifications.toutes => _notifications,
      _FiltreNotifications.mentions =>
        _notifications.where((n) => n.estMention).toList(),
      _FiltreNotifications.activite =>
        _notifications.where((n) => n.estMur && !n.estMention).toList(),
    };
  }

  Future<void> _ouvrir(NotificationConnexion n) async {
    try {
      await widget.service.marquerNotificationLue(n.id);
    } catch (_) {}
    if (!mounted) return;
    setState(() {
      _notifications = _notifications
          .map((x) => x.id == n.id
              ? NotificationConnexion(
                  id: x.id,
                  type: x.type,
                  titre: x.titre,
                  message: x.message,
                  lienType: x.lienType,
                  lienId: x.lienId,
                  lue: true,
                  creeLe: x.creeLe,
                )
              : x)
          .toList();
    });
    if (n.lienType == 'mur_publication' && n.lienId.isNotEmpty) {
      widget.onOuvrirPublication?.call(n.lienId);
    } else if (n.lienType == 'mur_profil' && n.lienId.isNotEmpty) {
      widget.onOuvrirProfil?.call(n.lienId);
    } else if (n.lienType == 'paiement' && n.lienId.isNotEmpty) {
      await _ouvrirPaiement(n);
    } else if (n.lienType == 'cotisation') {
      widget.onOuvrirCotisation?.call();
    }
  }

  /// Détail d'un paiement, correctif global 27 nov. 2026 : la
  /// cotisation soldée s'ouvre depuis la notification, style
  /// Facebook, avec sa facture quand elle est confirmée.
  Future<void> _ouvrirPaiement(NotificationConnexion n) async {
    final ligne = await widget.service.chargerPaiement(n.lienId);
    if (!mounted) return;
    if (ligne == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Ce paiement ne peut pas être ouvert.'),
        ),
      );
      return;
    }
    final p = PaiementAdmin.depuisJson(ligne);
    final telecharger = p.statut == 'confirme';
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(n.titre),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(n.message),
              const SizedBox(height: 12),
              Text('${p.libelle} · ${formaterFcfa(p.montantFcfa)}'),
              Text('Statut : ${p.libelleStatut}'),
              if (p.reference.isNotEmpty) Text('Référence : ${p.reference}'),
              if (p.creeLe != null)
                Text('Le ${formaterDateConnexion(p.creeLe)}'),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Fermer'),
          ),
          if (telecharger)
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Facture'),
            ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    final octets = await widget.service.telechargerFacture(p.reference);
    if (!mounted) return;
    if (octets == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Facture indisponible pour le moment.'),
        ),
      );
      return;
    }
    await downloadBytesFile(
      'facture-${p.reference}.pdf',
      octets,
      'application/pdf',
    );
  }

  Future<void> _toutMarquerLu() async {
    try {
      await widget.service.toutMarquerLu();
    } catch (_) {
      return;
    }
    if (!mounted) return;
    setState(() {
      _notifications = _notifications
          .map((x) => NotificationConnexion(
                id: x.id,
                type: x.type,
                titre: x.titre,
                message: x.message,
                lienType: x.lienType,
                lienId: x.lienId,
                lue: true,
                creeLe: x.creeLe,
              ))
          .toList();
    });
  }

  /// Heure relative, standard des grands réseaux : minutes,
  /// heures, puis date.
  String _heureRelative(DateTime? date) {
    if (date == null) return '';
    final ecart = DateTime.now().difference(date);
    if (ecart.inMinutes < 1) return 'À l’instant';
    if (ecart.inMinutes < 60) return 'il y a ${ecart.inMinutes} min';
    if (ecart.inHours < 24) return 'il y a ${ecart.inHours} h';
    return formaterDateConnexion(date);
  }

  /// Groupe de date d'une notification : aujourd'hui, hier,
  /// puis la date.
  String _groupeDate(DateTime? date) {
    if (date == null) return '';
    final maintenant = DateTime.now();
    final jour = DateTime(date.year, date.month, date.day);
    final aujourdHui =
        DateTime(maintenant.year, maintenant.month, maintenant.day);
    if (jour == aujourdHui) return 'Aujourd’hui';
    if (jour == aujourdHui.subtract(const Duration(days: 1))) {
      return 'Hier';
    }
    return formaterDateConnexion(date);
  }

  @override
  Widget build(BuildContext context) {
    final filtrees = _filtrees;
    final groupes = <String, List<NotificationConnexion>>{};
    for (final n in filtrees) {
      groupes.putIfAbsent(_groupeDate(n.creeLe), () => []).add(n);
    }
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(LucideIcons.chevronLeft,
              color: PaletteNouvelle.bleuNuit),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text(
          'Notifications',
          style: TextStyle(
              color: PaletteNouvelle.bleuNuit, fontWeight: FontWeight.w800),
        ),
        actions: [
          TextButton(
            onPressed: _toutMarquerLu,
            child: const Text('Tout marquer lu',
                style: TextStyle(color: PaletteNouvelle.bleuNuit)),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 12, 4),
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final (filtre, libelle) in [
                  (_FiltreNotifications.toutes, 'Toutes'),
                  (_FiltreNotifications.mentions, 'Mentions'),
                  (_FiltreNotifications.activite, 'Activité'),
                ])
                  ChoiceChip(
                    label: Text(libelle),
                    selected: _filtre == filtre,
                    selectedColor: PaletteNouvelle.bleuNuit,
                    labelStyle: TextStyle(
                      color: _filtre == filtre
                          ? Colors.white
                          : PaletteNouvelle.bleuNuit,
                      fontWeight: FontWeight.w700,
                    ),
                    onSelected: (_) => setState(() => _filtre = filtre),
                  ),
              ],
            ),
          ),
          Expanded(
            child: _chargement
                ? const Center(
                    child: CircularProgressIndicator(
                        color: PaletteNouvelle.bleuNuit))
                : _erreur != null
                    ? Center(
                        child: Padding(
                          padding: const EdgeInsets.all(24),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                _erreur!,
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 12),
                              FilledButton(
                                style: FilledButton.styleFrom(
                                  backgroundColor: PaletteNouvelle.bleuNuit,
                                ),
                                onPressed: () {
                                  setState(() {
                                    _chargement = true;
                                    _erreur = null;
                                  });
                                  _charger();
                                },
                                child: const Text('Réessayer'),
                              ),
                            ],
                          ),
                        ),
                      )
                    : filtrees.isEmpty
                        ? const Center(
                            child: Text('Aucune notification pour le moment.'))
                        : ListView(
                            padding:
                                EdgeInsets.fromLTRB(0, 8, 0, 24 + MediaQuery.paddingOf(context).bottom),
                            children: [
                              for (final entree in groupes.entries) ...[
                                Padding(
                                  padding: const EdgeInsets.fromLTRB(
                                      16, 12, 16, 4),
                                  child: Text(
                                    entree.key,
                                    style: const TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.w800,
                                      color: Colors.black54,
                                    ),
                                  ),
                                ),
                                for (final n in entree.value)
                                  _LigneNotification(
                                    notification: n,
                                    heure: _heureRelative(n.creeLe),
                                    onTap: () => _ouvrir(n),
                                  ),
                              ],
                            ],
                          ),
          ),
        ],
      ),
    );
  }
}

/// Ligne de notification, standard des grands réseaux :
/// avatar avec initiales, nom en gras et action, heure
/// relative, pastille or quand non lue, fond blanc, gris
/// clair quand lue.
class _LigneNotification extends StatelessWidget {
  const _LigneNotification({
    required this.notification,
    required this.heure,
    required this.onTap,
  });
  final NotificationConnexion notification;
  final String heure;
  final VoidCallback onTap;

  String _initiales(String titre) {
    final mots = titre
        .trim()
        .split(RegExp(r'\s+'))
        .where((m) => m.isNotEmpty)
        .toList();
    if (mots.isEmpty) return '?';
    if (mots.length == 1) return mots.first[0].toUpperCase();
    return (mots[0][0] + mots[1][0]).toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    final n = notification;
    return InkWell(
      onTap: onTap,
      child: Container(
        color: n.lue ? const Color(0xFFFBFBFC) : Colors.white,
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              radius: 22,
              backgroundColor: n.estMention
                  ? PaletteNouvelle.or
                  : PaletteNouvelle.bleuNuit,
              child: Text(
                _initiales(n.titre),
                style: TextStyle(
                  color: n.estMention
                      ? PaletteNouvelle.bleuNuit
                      : PaletteNouvelle.or,
                  fontWeight: FontWeight.w800,
                  fontSize: 15,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text.rich(
                    TextSpan(
                      children: [
                        TextSpan(
                          text: n.titre,
                          style: const TextStyle(
                            fontWeight: FontWeight.w800,
                            color: PaletteNouvelle.bleuNuit,
                          ),
                        ),
                        if (n.message.isNotEmpty)
                          TextSpan(text: ' ${n.message}'),
                      ],
                    ),
                    style: const TextStyle(fontSize: 14, height: 1.45),
                  ),
                  if (heure.isNotEmpty) ...[
                    const SizedBox(height: 3),
                    Text(
                      heure,
                      style: const TextStyle(
                        color: Colors.grey,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            if (!n.lue)
              Container(
                width: 9,
                height: 9,
                margin: const EdgeInsets.only(top: 6, left: 8),
                decoration: const BoxDecoration(
                  color: PaletteNouvelle.or,
                  shape: BoxShape.circle,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
