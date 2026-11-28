// Page Camps, tranche T20.
// La page du camp ne montre ni badge ni bouton de
// téléchargement, seulement « S'inscrire », comme la
// maquette : une carte par camp avec son nom, ses dates et
// son lieu, puis la section « Retraites en cours ». Le
// badge du camp, lui, vit dans la Galerie. L'inscription
// passe par POST /evenements/:id/inscription ; pour un camp
// payant, le pass reste masqué tant que la totalité n'est
// pas payée, et la page propose alors le versement suivant.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../api.dart';
import 'modeles_t9.dart';
import 'page_accueil.dart' show ActiviteAVenir;
import 'page_chronogramme.dart';
import 'page_verification_paiement.dart';
import 'paiement_carte.dart'
    show choisirMoyenPaiementFeuille, fcfa, ouvrirUrlPaiement;
import 'palette.dart';
import 'service_t9.dart';

class PageCamps extends StatefulWidget {
  const PageCamps({
    super.key,
    required this.activites,
    required this.service,
    this.evenementInitialId,
    this.onInitialConsomme,
    this.onVoirBadge,
  });

  /// Camps et retraites de l'accueil, avec leurs identifiants
  /// serveur, déjà triés par date, terminés écartés.
  final List<ActiviteAVenir> activites;

  /// Service T9, pour les inscriptions du membre.
  final ServiceT9 service;

  /// Événement à ouvrir directement en détail, quand on
  /// arrive depuis une carte d'Activités à venir.
  final String? evenementInitialId;

  /// Appelé une fois, après l'ouverture initiale, pour que
  /// la racine oublie l'événement demandé.
  final VoidCallback? onInitialConsomme;

  /// Ouvre la Galerie, pour voir le badge du camp.
  final VoidCallback? onVoirBadge;

  @override
  State<PageCamps> createState() => _PageCampsState();
}

class _PageCampsState extends State<PageCamps> {
  ActiviteAVenir? _selection;
  var _charge = false;
  var _occupe = false;

  @override
  void initState() {
    super.initState();
    final initial = widget.evenementInitialId;
    if (initial != null && initial.isNotEmpty) {
      for (final a in widget.activites) {
        if (a.evenementId == initial) _selection = a;
      }
      WidgetsBinding.instance.addPostFrameCallback(
        (_) => widget.onInitialConsomme?.call(),
      );
    }
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerGalerie();
    if (mounted) setState(() => _charge = true);
  }

  InscriptionBadge? _inscriptionPour(String evenementId) {
    for (final i in widget.service.inscriptions) {
      if (i.evenementId == evenementId) return i;
    }
    return null;
  }

  void _dire(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  Future<void> _sinscrire(ActiviteAVenir activite) async {
    if (_occupe) return;
    if (!api.isConnected) {
      _dire('Serveur injoignable. Vérifiez votre connexion, puis réessayez.');
      return;
    }
    if (activite.evenementId.isEmpty) {
      _dire('Inscription impossible pour le moment.');
      return;
    }
    setState(() => _occupe = true);
    try {
      await api.registerForEvent(activite.evenementId);
      await widget.service.chargerGalerie();
      if (!mounted) return;
      setState(() => _occupe = false);
      _dire('Inscription notée.');
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() => _occupe = false);
      _dire(e.message);
    } catch (_) {
      if (!mounted) return;
      setState(() => _occupe = false);
      _dire('Serveur injoignable. Inscription non enregistrée.');
    }
  }

  /// Paiement d'un versement de camp, même circuit que la
  /// carte : moyens du serveur, prestataire, puis page de
  /// vérification. La référence en attente est réutilisée
  /// telle quelle, sans doublon ; sinon le serveur crée le
  /// versement suivant.
  Future<void> _payerVersement(
    ActiviteAVenir activite,
    InscriptionBadge inscription,
  ) async {
    if (_occupe) return;
    if (!api.isConnected) {
      _dire('Serveur injoignable. Vérifiez votre connexion, puis réessayez.');
      return;
    }
    setState(() => _occupe = true);
    String? reference = inscription.versementEnAttenteReference.isEmpty
        ? null
        : inscription.versementEnAttenteReference;
    var montant = inscription.versementEnAttenteMontant;
    try {
      if (reference == null) {
        final cree = await api.createVersementCamp(activite.evenementId);
        reference = (cree['reference'] ?? '').toString();
        if (reference.isEmpty) reference = null;
        final m = cree['montant_fcfa'];
        if (m is num) montant = m.toInt();
      }
      if (reference == null || montant <= 0) {
        if (mounted) {
          setState(() => _occupe = false);
          _dire('Paiement impossible pour le moment. Réessaie plus tard.');
        }
        return;
      }
      final method = await choisirMoyenPaiementFeuille(
        context,
        nomMembre: widget.service.membre?.name ?? '',
        moyens: null,
      );
      if (method == null) {
        if (mounted) setState(() => _occupe = false);
        return;
      }
      final paye = await api.payerPaiement(reference, method);
      final url = (paye['url'] ?? '').toString();
      if (url.isNotEmpty) {
        final ok = await ouvrirUrlPaiement(url);
        if (!ok && mounted) {
          _dire(
              'Impossible d’ouvrir la page de paiement. Vérifiez votre connexion.');
        }
      } else if (method == 'mtn' && mounted) {
        _dire('Validez le paiement sur votre téléphone MTN MoMo.');
      }
      if (!mounted) return;
      setState(() => _occupe = false);
      await Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => PageVerificationPaiement(
            reference: reference!,
            montant: montant,
            moyen: method,
          ),
        ),
      );
      await widget.service.chargerGalerie();
      if (mounted) setState(() {});
    } catch (_) {
      if (mounted) {
        setState(() => _occupe = false);
        _dire('Paiement impossible pour le moment. Réessaie plus tard.');
      }
    }
  }

  /// Don de camp, 31 oct. 2026 : formulaire nom, numéro ou
  /// e-mail, message facultatif. Le serveur résout le
  /// bénéficiaire et renvoie le montant exact, puis le paiement
  /// suit le même circuit que le versement.
  Future<void> _offrirCamp(ActiviteAVenir activite) async {
    if (_occupe) return;
    if (!api.isConnected) {
      _dire('Serveur injoignable. Vérifiez votre connexion, puis réessayez.');
      return;
    }
    final nomCtrl = TextEditingController();
    final contactCtrl = TextEditingController();
    final messageCtrl = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Offrir ce camp'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Tarif : ${fcfa(activite.tarifFcfa)}',
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 8),
              const Text(
                'Si la personne est déjà inscrite, le don couvre son reste à payer.',
              ),
              const SizedBox(height: 12),
              TextField(
                controller: nomCtrl,
                decoration: const InputDecoration(
                  labelText: 'Nom du bénéficiaire',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: contactCtrl,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  labelText: 'Numéro ou e-mail du bénéficiaire',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: messageCtrl,
                maxLines: 3,
                decoration: const InputDecoration(
                  labelText: 'Message pour le bénéficiaire (facultatif)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Le bénéficiaire recevra son pass dès que la structure aura validé votre paiement.',
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Continuer vers le paiement'),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    final nom = nomCtrl.text.trim();
    final contact = contactCtrl.text.trim();
    if (nom.length < 2 || contact.length < 6) {
      _dire('Indiquez le nom et le numéro ou l’e-mail du bénéficiaire.');
      return;
    }
    setState(() => _occupe = true);
    try {
      final cree = await api.createDonCamp(
        activite.evenementId,
        nom,
        contact,
        messageCtrl.text.trim(),
      );
      final reference = (cree['reference'] ?? '').toString();
      final m = cree['montant_fcfa'];
      final montant = m is num ? m.toInt() : activite.tarifFcfa;
      if (reference.isEmpty || montant <= 0) {
        if (mounted) {
          setState(() => _occupe = false);
          _dire('Don impossible pour le moment. Réessaie plus tard.');
        }
        return;
      }
      final method = await choisirMoyenPaiementFeuille(
        context,
        nomMembre: widget.service.membre?.name ?? '',
        moyens: null,
      );
      if (method == null) {
        if (mounted) setState(() => _occupe = false);
        return;
      }
      final paye = await api.payerPaiement(reference, method);
      final url = (paye['url'] ?? '').toString();
      if (url.isNotEmpty) {
        final ouvert = await ouvrirUrlPaiement(url);
        if (!ouvert && mounted) {
          _dire(
            'Impossible d’ouvrir la page de paiement. Vérifiez votre connexion.',
          );
        }
      } else if (method == 'mtn' && mounted) {
        _dire('Validez le paiement sur votre téléphone MTN MoMo.');
      }
      if (!mounted) return;
      setState(() => _occupe = false);
      await Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => PageVerificationPaiement(
            reference: reference,
            montant: montant,
            moyen: method,
          ),
        ),
      );
      await widget.service.chargerGalerie();
      if (mounted) setState(() {});
    } on ApiException catch (e) {
      if (mounted) {
        setState(() => _occupe = false);
        _dire(e.message);
      }
    } catch (_) {
      if (mounted) {
        setState(() => _occupe = false);
        _dire('Serveur injoignable. Don non enregistré.');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final selection = _selection;
    if (selection != null)
      return _DetailCamp(
        activite: selection,
        inscription: _inscriptionPour(selection.evenementId),
        charge: _charge,
        occupe: _occupe,
        onRetour: () => setState(() => _selection = null),
        onSinscrire: () => _sinscrire(selection),
        onPayerVersement: (inscription) =>
            _payerVersement(selection, inscription),
        onOffrir: () => _offrirCamp(selection),
        onVoirBadge: widget.onVoirBadge,
        onVoirProgramme: () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => PageChronogrammeLecture(
              evenementId: selection.evenementId,
              titre: selection.titre,
            ),
          ),
        ),
      );
    final camps = widget.activites.where((a) => a.type != 'retraite').toList();
    final retraites =
        widget.activites.where((a) => a.type == 'retraite').toList();
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        const Text(
          'Camps',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w800,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 12),
        if (camps.isEmpty && retraites.isEmpty)
          const Card(
            color: Colors.white,
            margin: EdgeInsets.zero,
            child: ListTile(
              title: Text('Aucun camp ni retraite pour le moment.'),
            ),
          )
        else ...[
          for (final camp in camps) ...[
            _CarteCamp(
              activite: camp,
              onTap: () => setState(() => _selection = camp),
            ),
            const SizedBox(height: 12),
          ],
          if (retraites.isNotEmpty) ...[
            const _TitreSection('Retraites en cours'),
            const SizedBox(height: 12),
            for (var i = 0; i < retraites.length; i++) ...[
              if (i > 0) const SizedBox(height: 12),
              _CarteRetraite(
                activite: retraites[i],
                onTap: () => setState(() => _selection = retraites[i]),
              ),
            ],
          ],
        ],
      ],
    );
  }
}

/// Titre de section, comme sur l'accueil.
class _TitreSection extends StatelessWidget {
  const _TitreSection(this.titre);
  final String titre;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          titre,
          style: const TextStyle(
            color: PaletteNouvelle.bleuNuit,
            fontSize: 17,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 6),
        Container(
          width: 28,
          height: 3,
          decoration: BoxDecoration(
            color: PaletteNouvelle.or,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
      ],
    );
  }
}

/// Carte d'un camp, maquette : nom, dates et lieu, bouton
/// « S'inscrire » en or. Le toucher ouvre le détail.
class _CarteCamp extends StatelessWidget {
  const _CarteCamp({required this.activite, this.onTap});
  final ActiviteAVenir activite;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFFE3E7EE)),
          boxShadow: [
            BoxShadow(
              color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.06),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              activite.titre,
              style: const TextStyle(
                color: PaletteNouvelle.bleuNuit,
                fontSize: 18,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              _ligneDatesLieu(activite),
              style: const TextStyle(color: Colors.grey, fontSize: 14),
            ),
            const SizedBox(height: 12),
            Align(
              alignment: Alignment.centerRight,
              child: FilledButton.icon(
                onPressed: onTap,
                style: FilledButton.styleFrom(
                  backgroundColor: PaletteNouvelle.or,
                  foregroundColor: PaletteNouvelle.bleuNuit,
                ),
                icon: const Icon(LucideIcons.arrowRight, size: 16),
                label: const Text('S’inscrire'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Carte d'une retraite, comme sur l'accueil : bleu nuit.
class _CarteRetraite extends StatelessWidget {
  const _CarteRetraite({required this.activite, this.onTap});
  final ActiviteAVenir activite;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: const Color(0xFF081627),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'RETRAITE',
              style: TextStyle(
                color: PaletteNouvelle.or,
                fontSize: 11,
                fontWeight: FontWeight.w700,
                letterSpacing: 1,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              activite.titre,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 17,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              _ligneDatesLieu(activite),
              style: const TextStyle(color: Colors.white70, fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }
}

String _ligneDatesLieu(ActiviteAVenir a) {
  final debut = a.dateDebut;
  final dates = debut == null ? 'Dates à confirmer' : _dateCourte(debut);
  final lieu = a.lieu.isEmpty ? 'Lieu à confirmer' : a.lieu;
  return '$dates · $lieu';
}

String _dateCourte(DateTime d) {
  const mois = [
    'janv.',
    'févr.',
    'mars',
    'avr.',
    'mai',
    'juin',
    'juil.',
    'août',
    'sept.',
    'oct.',
    'nov.',
    'déc.',
  ];
  return '${d.day} ${mois[d.month - 1]} ${d.year}';
}

/// Détail d'un camp ou d'une retraite : dates, lieu,
/// description, tarif, inscrits, et l'action selon l'état
/// de l'inscription. La page ne montre ni badge ni bouton
/// de téléchargement, seulement « S'inscrire ».
class _DetailCamp extends StatelessWidget {
  const _DetailCamp({
    required this.activite,
    required this.inscription,
    required this.charge,
    required this.occupe,
    this.onRetour,
    this.onSinscrire,
    this.onPayerVersement,
    this.onOffrir,
    this.onVoirBadge,
    this.onVoirProgramme,
  });
  final ActiviteAVenir activite;
  final InscriptionBadge? inscription;
  final bool charge;
  final bool occupe;
  final VoidCallback? onRetour;
  final VoidCallback? onSinscrire;
  final ValueChanged<InscriptionBadge>? onPayerVersement;
  final VoidCallback? onOffrir;
  final VoidCallback? onVoirBadge;
  final VoidCallback? onVoirProgramme;

  @override
  Widget build(BuildContext context) {
    final a = activite;
    final inscrite = inscription;
    final dejaInscrit = inscrite != null;
    final badgeVisible = inscrite?.passVisible ?? false;
    final versementEnAttente = (inscrite?.versementEnAttenteMontant ?? 0) > 0;
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        Align(
          alignment: Alignment.centerLeft,
          child: TextButton.icon(
            onPressed: onRetour,
            icon: const Icon(LucideIcons.chevronLeft, size: 18),
            label: const Text('Retour aux camps'),
          ),
        ),
        Text(
          a.titre,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w800,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          _ligneDatesLieu(a),
          style: const TextStyle(color: Colors.grey, fontSize: 14),
        ),
        if (a.description.isNotEmpty) ...[
          const SizedBox(height: 12),
          Text(
            a.description,
            style: const TextStyle(
              color: PaletteNouvelle.bleuNuit,
              fontSize: 15,
              height: 1.4,
            ),
          ),
        ],
        if (a.tarifFcfa > 0) ...[
          const SizedBox(height: 12),
          Text(
            'Tarif : ${fcfa(a.tarifFcfa)}',
            style: const TextStyle(
              color: PaletteNouvelle.bleuNuit,
              fontSize: 15,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
        if (a.nombrePlaces > 0) ...[
          const SizedBox(height: 4),
          Text(
            '${a.inscrits} inscrits · ${a.nombrePlaces} places',
            style: const TextStyle(color: Colors.grey, fontSize: 14),
          ),
        ],
        const SizedBox(height: 20),
        if (!charge)
          const Center(child: CircularProgressIndicator())
        else if (!dejaInscrit)
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              onPressed: occupe ? null : onSinscrire,
              style: FilledButton.styleFrom(
                backgroundColor: PaletteNouvelle.or,
                foregroundColor: PaletteNouvelle.bleuNuit,
              ),
              icon: const Icon(LucideIcons.arrowRight, size: 18),
              label: const Text('S’inscrire'),
            ),
          )
        else if (badgeVisible)
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              onPressed: onVoirBadge,
              style: FilledButton.styleFrom(
                backgroundColor: PaletteNouvelle.bleuNuit,
              ),
              icon: const Icon(LucideIcons.badgeCheck, size: 18),
              label: const Text('Voir mon badge'),
            ),
          )
        else ...[
          const Card(
            color: Colors.white,
            margin: EdgeInsets.zero,
            child: ListTile(
              title: Text('Inscription notée.'),
              subtitle: Text(
                'Badge disponible après le paiement complet.',
              ),
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              onPressed: occupe ? null : () => onPayerVersement?.call(inscrite),
              style: FilledButton.styleFrom(
                backgroundColor: PaletteNouvelle.orFonce,
                foregroundColor: Colors.white,
              ),
              icon: const Icon(LucideIcons.wallet, size: 18),
              label: Text(
                versementEnAttente
                    ? 'Payer le versement n°${inscrite.versementEnAttenteNumero} : ${fcfa(inscrite.versementEnAttenteMontant)}'
                    : 'Payer le versement suivant',
              ),
            ),
          ),
        ],
        if (a.evenementId.isNotEmpty && a.tarifFcfa > 0) ...[
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: OutlinedButton.icon(
              onPressed: occupe ? null : onOffrir,
              style: OutlinedButton.styleFrom(
                foregroundColor: PaletteNouvelle.bleuNuit,
                side: const BorderSide(
                  color: PaletteNouvelle.bleuNuit,
                ),
              ),
              icon: const Icon(LucideIcons.gift, size: 18),
              label: const Text('Offrir ce camp'),
            ),
          ),
        ],
        if (dejaInscrit) ...[
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: OutlinedButton.icon(
              onPressed: onVoirProgramme,
              style: OutlinedButton.styleFrom(
                foregroundColor: PaletteNouvelle.bleuNuit,
                side: const BorderSide(
                  color: PaletteNouvelle.bleuNuit,
                ),
              ),
              icon: const Icon(LucideIcons.calendarDays, size: 18),
              label: const Text('Voir le programme'),
            ),
          ),
        ],
      ],
    );
  }
}
