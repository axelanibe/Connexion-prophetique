// Nouvelle page Mon profil, tranche T8, 26 nov. 2026.
// Bloc photo en haut, grand avatar et Changer la photo,
// champs modifiables avant Enregistrer : Nom, Établissement,
// Fonction, Date de naissance, Téléphone, E-mail, Ville de
// résidence, Pays de résidence. Toucher sur la carte ouvre
// cette page avec Retour vers la carte. Le nom modifié se
// répercute sur la carte, initiales comprises, comme
// l'établissement. Données par l'API existante ; nom, e-mail
// et ville n'ont aucune route serveur, ils restent sur
// l'appareil, la page le dit.
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../app_models.dart';
import 'avatar_membre.dart';
import 'modeles_profil.dart';
import 'palette.dart';
import 'service_profil.dart';

class PageMonProfilNouvelle extends StatefulWidget {
  const PageMonProfilNouvelle({
    super.key,
    this.service,
    this.depuisCarte = false,
    this.onVoirCarte,
    this.onRetourCarte,
    this.choisirPhoto,
  });
  final ServiceProfil? service;

  /// Vrai quand la page est ouverte depuis la carte : un
  /// bouton Retour vers la carte s'affiche en haut.
  final bool depuisCarte;

  /// Ouverture de Ma carte, branchée à la bascule T11.
  final VoidCallback? onVoirCarte;

  /// Retour vers la carte, branché à la bascule T11.
  final VoidCallback? onRetourCarte;

  /// Choix de la photo, injecté pour les tests. Par défaut
  /// la galerie, comme l'ancien profil.
  final Future<PhotoChoisie?> Function()? choisirPhoto;

  @override
  State<PageMonProfilNouvelle> createState() => _PageMonProfilNouvelleState();
}

class _PageMonProfilNouvelleState extends State<PageMonProfilNouvelle> {
  late final ServiceProfil _service;
  var _charge = false;
  var _initialise = false;
  var _enregistrement = false;
  final _nom = TextEditingController();
  final _telephone = TextEditingController();
  final _email = TextEditingController();
  final _ville = TextEditingController();
  final _etabTexte = TextEditingController();
  String? _fonction;
  String? _etab;
  String? _pays;
  DateTime? _naissance;

  @override
  void initState() {
    super.initState();
    _service = widget.service ?? ServiceProfilReel();
    _charger();
  }

  Future<void> _charger() async {
    await _service.charger();
    if (mounted) setState(() => _charge = true);
  }

  void _remplir() {
    final m = _service.membre;
    if (m == null || _initialise) return;
    _initialise = true;
    _nom.text = m.name;
    _telephone.text = m.telephone;
    _email.text = _service.email;
    _ville.text = _service.ville;
    _fonction = m.fonction.isEmpty ? null : m.fonction;
    _naissance = m.dateNaissance;
    _pays = _service.pays.isEmpty ? null : _service.pays;
    if (_service.etablissements.isEmpty) {
      _etabTexte.text = m.etab;
      _etab = null;
    } else {
      _etab = m.etab.isEmpty ? 'Autre' : m.etab;
    }
  }

  @override
  void dispose() {
    _nom.dispose();
    _telephone.dispose();
    _email.dispose();
    _ville.dispose();
    _etabTexte.dispose();
    super.dispose();
  }

  void _dire(String message) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  Future<PhotoChoisie?> _choisirPhotoParDefaut() async {
    final picked = await ImagePicker().pickImage(
      source: ImageSource.gallery,
      maxWidth: 800,
      maxHeight: 800,
      imageQuality: 80,
    );
    if (picked == null) return null;
    final type = (picked.mimeType ?? '').toLowerCase();
    final mime = type.contains('png')
        ? 'png'
        : type.contains('webp')
            ? 'webp'
            : 'jpeg';
    return (octets: await picked.readAsBytes(), mime: mime);
  }

  Future<void> _changerPhoto() async {
    final photo = await (widget.choisirPhoto ?? _choisirPhotoParDefaut)();
    if (photo == null) return;
    final ok = await _service.changerPhoto(photo);
    if (!mounted) return;
    if (ok) {
      setState(() {});
      _dire('Photo mise à jour.');
    } else {
      _dire('Photo non enregistrée, vérifiez votre connexion.');
    }
  }

  Future<void> _choisirNaissance() async {
    final maintenant = DateTime.now();
    final choisie = await showDatePicker(
      context: context,
      initialDate: _naissance ?? DateTime(maintenant.year - 30, maintenant.month, maintenant.day),
      firstDate: DateTime(1900),
      lastDate: maintenant,
    );
    if (choisie != null) setState(() => _naissance = choisie);
  }

  /// Changement d'e-mail avec vérification, T11 : le code est
  /// envoyé à la nouvelle adresse avant le changement. Sans
  /// envoi (SMTP non configuré, e-mail déjà pris), rien ne
  /// change et la page le dit ; sans code validé, l'ancien
  /// e-mail est gardé.
  Future<bool> _changerEmail(String nouvelEmail) async {
    final envoye =
        await _service.demanderChangementEmail(nouvelEmail);
    if (!mounted) return false;
    if (!envoye) {
      _dire('Envoi impossible pour le moment. Vérifie l’adresse, puis réessaie.');
      return false;
    }
    var code = '';
    var erreur = '';
    final confirme = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) => StatefulBuilder(builder: (ctx, setS) {
        return Padding(
          padding: EdgeInsets.fromLTRB(
              16, 16, 16, MediaQuery.of(ctx).viewInsets.bottom + 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Vérifie ton nouvel e-mail',
                  style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w800,
                      color: PaletteNouvelle.bleuNuit)),
              const SizedBox(height: 8),
              Text('Un code à 6 chiffres a été envoyé à $nouvelEmail.',
                  style: const TextStyle(color: Colors.black87)),
              const SizedBox(height: 12),
              TextField(
                keyboardType: TextInputType.number,
                maxLength: 6,
                onChanged: (v) => code = v,
                decoration: _dec(hint: 'Code à 6 chiffres'),
              ),
              if (erreur.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Text(erreur,
                      style: const TextStyle(color: Colors.red)),
                ),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: FilledButton(
                  style: FilledButton.styleFrom(
                      backgroundColor: PaletteNouvelle.bleuNuit),
                  onPressed: () async {
                    final ok = await _service.confirmerChangementEmail(
                        nouvelEmail, code.trim());
                    if (!ctx.mounted) return;
                    if (ok) {
                      Navigator.pop(ctx, true);
                    } else {
                      setS(() =>
                          erreur = 'Code invalide ou expiré. Vérifie le code reçu.');
                    }
                  },
                  child: const Text('Confirmer'),
                ),
              ),
            ],
          ),
        );
      }),
    );
    if (confirme == true && mounted) {
      setState(() {});
      _dire('E-mail modifié.');
      return true;
    }
    return false;
  }

  Future<void> _enregistrer() async {
    if (_enregistrement) return;
    setState(() => _enregistrement = true);
    try {
      final etab = _service.etablissements.isEmpty
          ? _etabTexte.text.trim()
          : (_etab ?? 'Autre');
      if (_email.text.trim() != _service.email) {
        final change = await _changerEmail(_email.text.trim());
        if (!mounted) return;
        if (!change) {
          setState(() => _email.text = _service.email);
          return;
        }
      }
      final resultat = await _service.enregistrer(ModifsProfil(
        nom: _nom.text.trim(),
        etablissement: etab,
        fonction: _fonction ?? '',
        dateNaissance: _naissance,
        telephone: _telephone.text.trim(),
        email: _email.text.trim(),
        ville: _ville.text.trim(),
        pays: _pays ?? '',
      ));
      if (!mounted) return;
      setState(() {});
      if (!resultat.reussi) {
        _dire('Certains champs n’ont pas pu être envoyés au serveur.');
      } else if (resultat.gardeLocalSeulement) {
        _dire('Informations mises à jour. Nom ou ville gardés sur cet appareil seulement.');
      } else {
        _dire('Informations mises à jour.');
      }
    } finally {
      if (mounted) setState(() => _enregistrement = false);
    }
  }

  InputDecoration _dec({String? hint}) => InputDecoration(
        hintText: hint,
        filled: true,
        fillColor: Colors.white,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
        ),
      );

  Widget _champ(String label, Widget child) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label,
              style: const TextStyle(
                  fontWeight: FontWeight.w700,
                  color: PaletteNouvelle.bleuNuit)),
          const SizedBox(height: 6),
          child,
          const SizedBox(height: 14),
        ],
      );

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final m = _service.membre;
    if (m == null) {
      return const Center(
          child: Text('Connectez-vous pour voir votre profil.'));
    }
    _remplir();
    final etabs = <String>{
      ..._service.etablissements,
      'Bureau national',
      'Autre',
      if (_etab != null && _etab!.isNotEmpty) _etab!,
    }.toList();
    final paysItems = <String>{
      ...kPaysResidence,
      if (_pays != null && _pays!.isNotEmpty) _pays!,
    }.toList();
    final fonctionItems = <String>{
      ...fonctionsMembre,
      if (_fonction != null && _fonction!.isNotEmpty) _fonction!,
    }.toList();
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
      children: [
        if (widget.depuisCarte)
          Align(
            alignment: Alignment.centerLeft,
            child: TextButton.icon(
              key: const ValueKey('retourCarte'),
              onPressed: widget.onRetourCarte,
              icon: const Icon(Icons.arrow_back,
                  color: PaletteNouvelle.bleuNuit),
              label: const Text('Retour vers la carte',
                  style: TextStyle(color: PaletteNouvelle.bleuNuit)),
            ),
          ),
        Center(
          child: Column(
            children: [
              AvatarMembre(m, radius: 48),
              const SizedBox(height: 8),
              OutlinedButton.icon(
                onPressed: _changerPhoto,
                icon: const Icon(Icons.photo_camera_outlined,
                    color: PaletteNouvelle.bleuNuit),
                label: const Text('Changer la photo',
                    style: TextStyle(color: PaletteNouvelle.bleuNuit)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        _champ(
            'Nom',
            TextField(
                key: const ValueKey('champNom'),
                controller: _nom,
                decoration: _dec(hint: 'Nom et prénom'))),
        _champ(
          'Établissement',
          _service.etablissements.isEmpty
              ? TextField(
                  controller: _etabTexte,
                  decoration: _dec(hint: 'Établissement'))
              : DropdownButtonFormField<String>(
                  value: _etab,
                  items: [
                    for (final e in etabs)
                      DropdownMenuItem(value: e, child: Text(e)),
                  ],
                  onChanged: (v) => setState(() => _etab = v),
                  decoration: _dec(),
                ),
        ),
        _champ(
          'Fonction',
          DropdownButtonFormField<String>(
            value: _fonction,
            items: [
              for (final f in fonctionItems)
                DropdownMenuItem(value: f, child: Text(f)),
            ],
            onChanged: (v) => setState(() => _fonction = v),
            decoration: _dec(),
          ),
        ),
        _champ(
          'Date de naissance',
          InkWell(
            key: const ValueKey('champNaissance'),
            onTap: _choisirNaissance,
            child: InputDecorator(
              decoration: _dec(),
              child: Text(
                _naissance == null
                    ? 'À renseigner'
                    : afficherDate(_naissance!),
                style: TextStyle(
                    color: _naissance == null
                        ? Colors.grey
                        : PaletteNouvelle.bleuNuit),
              ),
            ),
          ),
        ),
        _champ(
            'Téléphone',
            TextField(
                controller: _telephone,
                keyboardType: TextInputType.phone,
                decoration: _dec(hint: 'Numéro de téléphone'))),
        _champ(
            'E-mail',
            TextField(
                controller: _email,
                keyboardType: TextInputType.emailAddress,
                decoration: _dec(hint: 'Adresse e-mail'))),
        _champ(
            'Ville de résidence',
            TextField(
                controller: _ville, decoration: _dec(hint: 'Ville'))),
        _champ(
          'Pays de résidence',
          DropdownButtonFormField<String>(
            value: _pays,
            items: [
              for (final p in paysItems)
                DropdownMenuItem(value: p, child: Text(p)),
            ],
            onChanged: (v) => setState(() => _pays = v),
            decoration: _dec(),
          ),
        ),
        FilledButton(
          onPressed: _enregistrement ? null : _enregistrer,
          style: FilledButton.styleFrom(
            backgroundColor: PaletteNouvelle.bleuNuit,
            padding: const EdgeInsets.symmetric(vertical: 14),
          ),
          child: Text(_enregistrement ? 'Enregistrement…' : 'Enregistrer'),
        ),
        const SizedBox(height: 12),
        OutlinedButton(
          key: const ValueKey('boutonCarte'),
          onPressed: widget.onVoirCarte,
          child: const Text('Ma carte',
              style: TextStyle(color: PaletteNouvelle.bleuNuit)),
        ),
      ],
    );
  }
}
