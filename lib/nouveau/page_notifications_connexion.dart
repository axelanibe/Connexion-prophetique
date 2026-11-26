// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// Notifications de la cloche, à partir de GET /notifications :
// Toutes, Mentions (type mur_mention), Activité (les autres
// types du mur). Un toucher ouvre le détail de la publication
// ou le profil du suiveur, selon le lien.
import 'package:flutter/material.dart';

import 'carte_publication.dart';
import 'modeles_connexion.dart';
import 'palette.dart';

enum _FiltreNotifications { toutes, mentions, activite }

class PageNotificationsConnexion extends StatefulWidget {
  const PageNotificationsConnexion({
    super.key,
    required this.service,
    this.onOuvrirPublication,
    this.onOuvrirProfil,
  });
  final ServiceConnexion service;
  final ValueChanged<String>? onOuvrirPublication;
  final ValueChanged<String>? onOuvrirProfil;

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
    }
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

  @override
  Widget build(BuildContext context) {
    final filtrees = _filtrees;
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: PaletteNouvelle.bleuNuit),
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
                            child: Text(_erreur!, textAlign: TextAlign.center)))
                    : filtrees.isEmpty
                        ? const Center(
                            child: Text('Aucune notification pour le moment.'))
                        : ListView(
                            padding: const EdgeInsets.fromLTRB(12, 8, 12, 24),
                            children: [
                              for (final n in filtrees)
                                _CarteNotification(
                                    notification: n, onTap: () => _ouvrir(n)),
                            ],
                          ),
          ),
        ],
      ),
    );
  }
}

class _CarteNotification extends StatelessWidget {
  const _CarteNotification({required this.notification, required this.onTap});
  final NotificationConnexion notification;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final n = notification;
    final date = formaterDateConnexion(n.creeLe);
    final icone = switch (n.type) {
      'mur_mention' => Icons.alternate_email_outlined,
      'mur_reaction' => Icons.thumb_up_outlined,
      'mur_suivi' => Icons.person_add_outlined,
      _ => Icons.comment_outlined,
    };
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: n.lue ? Colors.white : const Color(0xFFFFF8E6),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE3E7EE)),
      ),
      child: ListTile(
        leading: Icon(icone, color: PaletteNouvelle.bleuNuit),
        title: Text(n.titre,
            style: const TextStyle(
                fontWeight: FontWeight.w700, color: PaletteNouvelle.bleuNuit)),
        subtitle: Text(n.message),
        trailing: date.isEmpty
            ? null
            : Text(date,
                style: const TextStyle(color: Colors.grey, fontSize: 12)),
        onTap: onTap,
      ),
    );
  }
}
