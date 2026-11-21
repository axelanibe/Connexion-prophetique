// Page Sauvegarde, 20 nov. 2026 : toute l'application,
// journal, enregistrements et réglages, chiffrée avec un mot
// de passe, sur le Google Drive du membre. Chargée à la
// demande depuis main.dart, même modèle que differe_membre.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';
import 'sauvegarde_app.dart';

/// Page Sauvegarde : compte Google, mot de passe, dernière
/// sauvegarde, sauvegarde immédiate et restauration.
class SauvegardePage extends StatefulWidget {
  final SauvegardeApp sauvegarde;

  SauvegardePage({super.key, SauvegardeApp? sauvegarde})
      : sauvegarde =
            sauvegarde ??
            SauvegardeApp(
              appliquerLangue: app.setLang,
              // Conversations éphémères, 21 nov. 2026, carte 3 :
              // leur réglage entre dans le manifeste, jamais le
              // contenu des messages.
              chargerConversationsEphemeres:
                  () => api.fetchConversationsMessagerie(),
            );

  @override
  State<SauvegardePage> createState() => _SauvegardePageState();
}

class _SauvegardePageState extends State<SauvegardePage> {
  final _motDePasse = TextEditingController();
  bool _mdpVisible = false;
  bool _enCours = false;
  String? _compte;
  DateTime? _derniere;
  int? _taille;
  bool _aCle = false;
  bool _distanteExiste = false;

  /// Longueur du mot de passe avant la dernière frappe, pour ne
  /// lancer la restauration automatique qu'au passage à 8
  /// caractères, 21 nov. 2026, carte 3.
  int _longueurMdpPrecedente = 0;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _motDePasse.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    final compte = await widget.sauvegarde.compteLie();
    final aCle = await widget.sauvegarde.aUneCle();
    final derniere = await widget.sauvegarde.derniereSauvegarde();
    final taille = await widget.sauvegarde.tailleDerniereSauvegarde();
    // Sauvegarde distante connue dès la liaison, 21 nov. 2026,
    // carte 3 : pas besoin d'interroger Drive une seconde fois.
    final distante =
        widget.sauvegarde.distanteConnue ??
        await widget.sauvegarde.verifierDistante();
    if (!mounted) return;
    setState(() {
      _compte = compte;
      _aCle = aCle;
      _derniere = derniere;
      _taille = taille;
      _distanteExiste = distante != null;
    });
  }

  Future<void> _lier() async {
    setState(() => _enCours = true);
    final compte = await widget.sauvegarde.lierCompte();
    if (!mounted) return;
    setState(() => _enCours = false);
    toast(context, compte == null ? tr('Connexion Google annulée.') : tr('Compte Google lié.'));
    await _charger();
  }

  Future<void> _dissocier() async {
    setState(() => _enCours = true);
    await widget.sauvegarde.dissocier();
    if (!mounted) return;
    setState(() => _enCours = false);
    toast(context, tr('Compte Google dissocié.'));
    await _charger();
  }

  Future<void> _definirMotDePasse() async {
    final mdp = _motDePasse.text;
    if (mdp.length < SauvegardeApp.longueurMinMotDePasse) {
      toast(context, tr('Mot de passe trop court, 8 caractères minimum.'));
      return;
    }
    setState(() => _enCours = true);
    final ok = await widget.sauvegarde.definirMotDePasse(mdp);
    if (!mounted) return;
    setState(() => _enCours = false);
    if (ok) {
      _motDePasse.clear();
      toast(context, tr('Mot de passe enregistré.'));
    } else {
      toast(context, tr('Mot de passe impossible à enregistrer. Réessayez.'));
    }
    await _charger();
  }

  Future<void> _sauvegarder() async {
    setState(() => _enCours = true);
    final ok = await widget.sauvegarde.sauvegarderMaintenant();
    if (!mounted) return;
    setState(() => _enCours = false);
    toast(context, ok ? tr('Sauvegarde terminée.') : tr('Sauvegarde impossible. Vérifiez votre connexion, puis réessayez.'));
    await _charger();
  }

  Future<void> _restaurer() async {
    final mdp = _motDePasse.text;
    if (mdp.isEmpty) {
      toast(context, tr('Saisissez votre mot de passe de sauvegarde.'));
      return;
    }
    setState(() => _enCours = true);
    final ok = await widget.sauvegarde.restaurer(mdp);
    if (!mounted) return;
    setState(() => _enCours = false);
    toast(context, ok ? tr('Restauration terminée.') : tr('Restauration impossible. Vérifiez le mot de passe, puis réessayez.'));
    await _charger();
  }

  /// Restauration automatique, 21 nov. 2026, carte 3 : dès que le
  /// mot de passe est saisi (8 caractères) et qu'une sauvegarde
  /// distante existe, sans clé locale, la restauration se lance
  /// seule, une seule fois au passage à 8 caractères. Avec une
  /// clé locale, le champ sert à changer le mot de passe, jamais
  /// à restaurer. Un échec ne relance rien, le bouton Restaurer
  /// reste disponible.
  Future<void> _motDePasseChange(String valeur) async {
    final longueur = valeur.length;
    final avant = _longueurMdpPrecedente;
    _longueurMdpPrecedente = longueur;
    if (avant >= SauvegardeApp.longueurMinMotDePasse) return;
    if (longueur < SauvegardeApp.longueurMinMotDePasse) return;
    if (!_distanteExiste || _aCle || _enCours) return;
    await _restaurer();
  }

  String _tailleTexte(int octets) {
    if (octets >= 1024 * 1024) return '${(octets / 1048576).toStringAsFixed(1)} Mo';
    if (octets >= 1024) return '${(octets / 1024).toStringAsFixed(1)} Ko';
    return '$octets o';
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final peutSauvegarder = _compte != null && _aCle && !_enCours;
    return basic(tr('Sauvegarde'), [
      Text(tr('Compte Google'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: 4),
      Text(
        _compte ?? tr('Aucun compte lié'),
        style: t.bodyMedium,
      ),
      const SizedBox(height: Cp.s1),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: _compte == null
            ? FilledButton(
                onPressed: _enCours ? null : _lier,
                child: Text(tr('Lier mon compte Google')),
              )
            : OutlinedButton(
                onPressed: _enCours ? null : _dissocier,
                child: Text(tr('Dissocier')),
              ),
      ),
      const SizedBox(height: Cp.s3),
      Text(tr('Mot de passe de sauvegarde'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: 4),
      TextField(
        controller: _motDePasse,
        obscureText: !_mdpVisible,
        onChanged: _motDePasseChange,
        decoration: InputDecoration(
          labelText: tr('Mot de passe'),
          border: const OutlineInputBorder(),
          suffixIcon: IconButton(
            icon: Icon(_mdpVisible ? Icons.visibility_off_outlined : Icons.visibility_outlined),
            onPressed: () => setState(() => _mdpVisible = !_mdpVisible),
          ),
        ),
      ),
      const SizedBox(height: 4),
      Text(
        tr('8 caractères minimum. Sans lui, aucune restauration sur un autre téléphone.'),
        style: t.bodyMedium?.copyWith(color: Cp.inkMuted),
      ),
      const SizedBox(height: Cp.s1),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _enCours ? null : _definirMotDePasse,
          child: Text(_aCle ? tr('Modifier le mot de passe') : tr('Définir le mot de passe')),
        ),
      ),
      const SizedBox(height: Cp.s3),
      Text(tr('Dernière sauvegarde'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: 4),
      Text(
        _derniere == null
            ? tr('Aucune sauvegarde')
            : '${dateFr(_derniere!)}${_taille == null ? '' : ' · ${_tailleTexte(_taille!)}'}',
        style: t.bodyMedium,
      ),
      const SizedBox(height: Cp.s1),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: peutSauvegarder ? _sauvegarder : null,
          child: Text(tr('Sauvegarder maintenant')),
        ),
      ),
      if (_distanteExiste) ...[
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton(
            onPressed: _enCours ? null : _restaurer,
            child: Text(tr('Restaurer')),
          ),
        ),
      ],
      const SizedBox(height: Cp.s3),
      Text(
        tr('Sauvegarde automatique chaque jour quand l’application s’ouvre, journal, enregistrements et réglages chiffrés sur votre Google Drive.'),
        style: t.bodyMedium?.copyWith(color: Cp.inkMuted),
      ),
    ]);
  }
}
