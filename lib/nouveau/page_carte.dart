// Nouvelle page Ma carte, tranche T8, 26 nov. 2026.
// Carte premium bleu nuit et or, d'après le fichier d'Axel
// du 26 nov. 12 h 52 : effet 3D au toucher, brillance dorée,
// anneau doré, badge d'état sur la carte, matricule tronqué
// tant qu'elle n'est pas payée, surcouche de verrouillage
// dans la carte. Visuel seul, correction d'Axel du 26 nov.
// 12 h 46 : aucun toucher ne mène à une modification ni à
// Mon profil, qui reste atteint par la photo de l'en-tête
// ou l'entrée Mon profil du tiroir. Trois états, lus dans
// GET /moi/paiements et statut_adhesion : verrouillée,
// en attente de validation, validée. Les onglets segmentés
// montrent l'état réel venu du serveur, ils ne le changent
// pas. Le toucher sur la carte non payée bascule l'aperçu
// déverrouillé, jamais une modification. Les données du
// fichier d'Axel, nom, matricule, téléphone, sont une démo,
// les vraies données viennent du serveur.
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../app_models.dart';
import 'avatar_membre.dart';
import 'modeles_profil.dart';
import 'modeles_t15.dart';
import 'palette.dart';
import 'service_profil.dart';

/// Données d'affichage d'un état de carte, pastille, badge
/// et surcouche, d'après le fichier d'Axel.
typedef _DonneesEtatCarte = ({
  IconData iconeBadge,
  String badge,
  IconData iconeBande,
  String titreBande,
  String sousTitreBande,
  String pastilleBande,
  String pastilleEtat,
  Color pointEtat,
});

_DonneesEtatCarte _donneesPour(
    EtatCarte etat, bool apercu, String matricule) {
  return switch (etat) {
    EtatCarte.verrouillee when apercu => (
        iconeBadge: Icons.lock_open,
        badge: 'Aperçu',
        iconeBande: Icons.lock_open,
        titreBande: 'Prête à activer',
        sousTitreBande: 'Aperçu déverrouillé • Validez à 1 000 FCFA',
        pastilleBande: 'Activer',
        pastilleEtat: 'Non payée',
        pointEtat: PaletteNouvelle.or,
      ),
    EtatCarte.verrouillee => (
        iconeBadge: Icons.lock,
        badge: 'Verrouillée',
        iconeBande: Icons.lock,
        titreBande: 'Carte verrouillée',
        sousTitreBande:
            'Touchez pour prévisualiser • Activez à 1 000 FCFA',
        pastilleBande: 'Prête à activer',
        pastilleEtat: 'Non payée',
        pointEtat: PaletteNouvelle.or,
      ),
    EtatCarte.enAttente => (
        iconeBadge: Icons.schedule,
        badge: 'Vérification',
        iconeBande: Icons.schedule,
        titreBande: 'Paiement en cours de vérification',
        sousTitreBande: 'Réception confirmée • Finalisation imminente',
        pastilleBande: 'En attente',
        pastilleEtat: 'En attente',
        pointEtat: const Color(0xFFF59E0B),
      ),
    EtatCarte.validee => (
        iconeBadge: Icons.check_circle,
        badge: 'Active',
        iconeBande: Icons.verified_user,
        titreBande: 'Carte active & vérifiée',
        sousTitreBande:
            'ID complet $matricule • Accès membre débloqué',
        pastilleBande: 'Validée',
        pastilleEtat: 'Validée',
        pointEtat: const Color(0xFF10B981),
      ),
  };
}

/// Matricule affiché : tronqué tant que la carte n'est pas
/// payée, complet ensuite, comme dans le fichier d'Axel.
String matriculeAffiche(String matricule, EtatCarte etat) {
  if (etat != EtatCarte.verrouillee) return matricule;
  if (matricule.length <= 9) return matricule;
  return '${matricule.substring(0, 9)}...';
}

/// Données du bloc contextuel sous la carte, par état.
typedef _DonneesContexte = ({
  IconData icone,
  String titre,
  String description,
  String? secondaire,
});

_DonneesContexte _donneesContexte(EtatCarte etat, bool apercu) {
  return switch (etat) {
    EtatCarte.verrouillee => (
        icone: Icons.auto_awesome,
        titre: 'Accès membre officiel Connexion Prophétique',
        description: 'Activation unique à 1 000 FCFA • Badge numérique & QR',
        secondaire: apercu ? 'Masquer' : 'Aperçu',
      ),
    EtatCarte.enAttente => (
        icone: Icons.badge,
        titre: 'Dossier de carte en cours de validation',
        description: 'Votre reçu 1 000 FCFA est pris en compte',
        secondaire: 'Mes paiements',
      ),
    EtatCarte.validee => (
        icone: Icons.verified,
        titre: 'Avantages membre actifs',
        description:
            'Identification rapide, événements & ressources exclusives',
        secondaire: null,
      ),
  };
}

/// Pastille d'état en haut de la page : point coloré et
/// libellé, Non payée, En attente, Validée.
class PastilleEtatCarte extends StatelessWidget {
  const PastilleEtatCarte({super.key, required this.etat});
  final EtatCarte etat;

  @override
  Widget build(BuildContext context) {
    final donnees = _donneesPour(etat, false, '');
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: donnees.pointEtat,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            donnees.pastilleEtat,
            style: const TextStyle(
              color: PaletteNouvelle.bleuNuit,
              fontSize: 11,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

/// Onglets segmentés Non payée, En attente, Validée.
/// Ils montrent l'état réel venu du serveur, ils ne le
/// changent pas : aucun toucher ne change l'état.
class ControleSegmenteEtat extends StatelessWidget {
  const ControleSegmenteEtat({super.key, required this.etat});
  final EtatCarte etat;

  @override
  Widget build(BuildContext context) {
    const labels = ['Non payée', 'En attente', 'Validée'];
    final index = switch (etat) {
      EtatCarte.verrouillee => 0,
      EtatCarte.enAttente => 1,
      EtatCarte.validee => 2,
    };
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.06),
            blurRadius: 20,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Row(
        children: [
          for (var i = 0; i < 3; i++)
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 8),
                decoration: BoxDecoration(
                  color: i == index
                      ? PaletteNouvelle.bleuNuit
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  labels[i],
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: i == index ? Colors.white : Colors.grey,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

/// Carte premium, d'après le fichier d'Axel : dégradé bleu
/// nuit, anneau doré décoratif, brillance dorée qui suit le
/// doigt, effet 3D au toucher, badge d'état, surcouche de
/// verrouillage dans la carte, QR en bas à droite, Membre
/// depuis en bas à gauche. Visuel seul, le toucher est géré
/// par la page, jamais une modification.
class CartePremium extends StatefulWidget {
  const CartePremium({
    super.key,
    required this.membre,
    required this.etat,
    required this.apercuDebloque,
    this.onTap,
  });
  final Member membre;
  final EtatCarte etat;
  final bool apercuDebloque;
  final VoidCallback? onTap;

  @override
  State<CartePremium> createState() => _CartePremiumState();
}

class _CartePremiumState extends State<CartePremium> {
  var _rotateX = 0.0;
  var _rotateY = 0.0;
  var _brillance = const Offset(0.75, 0.20);
  var _touche = false;

  void _surMouvement(PointerMoveEvent e) {
    final box = context.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return;
    final local = box.globalToLocal(e.position);
    final px = (local.dx / box.size.width).clamp(0.0, 1.0);
    final py = (local.dy / box.size.height).clamp(0.0, 1.0);
    setState(() {
      _rotateY = (px - 0.5) * 0.24;
      _rotateX = (0.5 - py) * 0.24;
      _brillance = Offset(px, py);
      _touche = true;
    });
  }

  void _reinitialiser() {
    setState(() {
      _rotateX = 0;
      _rotateY = 0;
      _brillance = const Offset(0.75, 0.20);
      _touche = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.membre;
    final donnees =
        _donneesPour(widget.etat, widget.apercuDebloque, m.matricule);
    return AnimatedContainer(
      duration: const Duration(milliseconds: 220),
      curve: Curves.easeOut,
      transform: Matrix4.identity()
        ..setEntry(3, 2, 0.001)
        ..rotateX(_rotateX)
        ..rotateY(_rotateY)
        ..scale(_touche ? 1.012 : 1.0),
      child: Listener(
        onPointerMove: _surMouvement,
        onPointerUp: (_) => _reinitialiser(),
        onPointerCancel: (_) => _reinitialiser(),
        child: MouseRegion(
          onExit: (_) => _reinitialiser(),
          child: GestureDetector(
            onTap: widget.onTap,
            behavior: HitTestBehavior.opaque,
            child: Container(
              constraints: const BoxConstraints(minHeight: 212),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(26),
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Color(0xFF0B1F3A),
                    Color(0xFF162844),
                    Color(0xFF0A1424),
                  ],
                ),
                border: Border.all(
                  color: PaletteNouvelle.or.withValues(alpha: 0.25),
                ),
                boxShadow: [
                  BoxShadow(
                    color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.34),
                    blurRadius: 42,
                    offset: const Offset(0, 22),
                  ),
                ],
              ),
              child: Stack(
                children: [
                  Positioned(
                    right: -48,
                    top: -48,
                    child: Container(
                      width: 176,
                      height: 176,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color:
                              PaletteNouvelle.or.withValues(alpha: 0.12),
                          width: 14,
                        ),
                      ),
                    ),
                  ),
                  Positioned.fill(
                    child: IgnorePointer(
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(26),
                          gradient: RadialGradient(
                            center: Alignment(
                              _brillance.dx * 2 - 1,
                              _brillance.dy * 2 - 1,
                            ),
                            radius: 0.9,
                            colors: [
                              PaletteNouvelle.or.withValues(alpha: 0.24),
                              Colors.white.withValues(alpha: 0.07),
                              Colors.transparent,
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            width: 48,
                            height: 48,
                            decoration: BoxDecoration(
                              color: PaletteNouvelle.or
                                  .withValues(alpha: 0.18),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: PaletteNouvelle.or
                                    .withValues(alpha: 0.45),
                              ),
                            ),
                            child: Center(
                              child: Text(
                                initialesDe(m.name),
                                style: const TextStyle(
                                  color: PaletteNouvelle.or,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  m.name,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  matriculeAffiche(
                                      m.matricule, widget.etat),
                                  style: const TextStyle(
                                    color: PaletteNouvelle.or,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  etablissementCarte(m),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    color: Colors.white70,
                                    fontSize: 11,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.12),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: PaletteNouvelle.or
                                    .withValues(alpha: 0.25),
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(donnees.iconeBadge,
                                    color: PaletteNouvelle.or, size: 12),
                                const SizedBox(width: 4),
                                Text(
                                  donnees.badge.toUpperCase(),
                                  style: const TextStyle(
                                    color: PaletteNouvelle.or,
                                    fontSize: 10,
                                    fontWeight: FontWeight.w800,
                                    letterSpacing: 1,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      Container(
                        margin: const EdgeInsets.symmetric(vertical: 12),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF0B1F3A)
                              .withValues(alpha: 0.75),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color:
                                PaletteNouvelle.or.withValues(alpha: 0.30),
                          ),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 32,
                              height: 32,
                              decoration: const BoxDecoration(
                                color: Color(0xFFD4A72C),
                                shape: BoxShape.circle,
                              ),
                              child: Icon(
                                donnees.iconeBande,
                                color: PaletteNouvelle.bleuNuit,
                                size: 16,
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Column(
                                crossAxisAlignment:
                                    CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    donnees.titreBande,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w800,
                                    ),
                                  ),
                                  Text(
                                    donnees.sousTitreBande,
                                    style: const TextStyle(
                                      color: Colors.white70,
                                      fontSize: 11,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: PaletteNouvelle.or,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                donnees.pastilleBande,
                                style: const TextStyle(
                                  color: PaletteNouvelle.bleuNuit,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Membre depuis ${m.anneeAffichee}',
                                style: const TextStyle(
                                  color: Colors.white70,
                                  fontSize: 11,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              const SizedBox(height: 2),
                              const Text(
                                'CONNEXION PROPHÉTIQUE',
                                style: TextStyle(
                                  fontFamily: 'Cinzel',
                                  color: PaletteNouvelle.or,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w700,
                                  letterSpacing: 2,
                                ),
                              ),
                            ],
                          ),
                          Container(
                            width: 56,
                            height: 56,
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: QrImageView(data: m.matricule, size: 44),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Bloc contextuel sous la carte, par état, avec son bouton
/// secondaire quand il a une vraie action.
class BlocContexteCarte extends StatelessWidget {
  const BlocContexteCarte({
    super.key,
    required this.etat,
    required this.apercuDebloque,
    this.onSecondaire,
  });
  final EtatCarte etat;
  final bool apercuDebloque;
  final VoidCallback? onSecondaire;

  @override
  Widget build(BuildContext context) {
    final donnees = _donneesContexte(etat, apercuDebloque);
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.06),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: PaletteNouvelle.or.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(donnees.icone,
                color: PaletteNouvelle.or, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  donnees.titre,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: PaletteNouvelle.bleuNuit,
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  donnees.description,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Colors.grey,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          if (donnees.secondaire != null) ...[
            const SizedBox(width: 8),
            TextButton(
              onPressed: onSecondaire,
              style: TextButton.styleFrom(
                backgroundColor: PaletteNouvelle.papier,
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
              child: Text(
                donnees.secondaire!,
                style: const TextStyle(
                  color: PaletteNouvelle.bleuNuit,
                  fontSize: 11,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// Bouton principal doré, dégradé or comme dans le fichier
/// d'Axel.
class _BoutonOr extends StatelessWidget {
  const _BoutonOr({
    required this.label,
    required this.icone,
    required this.onPressed,
  });
  final String label;
  final IconData icone;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [
            PaletteNouvelle.or,
            Color(0xFFDDB34E),
            Color(0xFFC5962E),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: PaletteNouvelle.or.withValues(alpha: 0.52),
            blurRadius: 26,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(16),
          child: Padding(
            padding:
                const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icone, color: PaletteNouvelle.bleuNuit, size: 18),
                const SizedBox(width: 8),
                Text(
                  label,
                  style: const TextStyle(
                    color: PaletteNouvelle.bleuNuit,
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class PageCarteNouvelle extends StatefulWidget {
  const PageCarteNouvelle({
    super.key,
    this.service,
    this.onCreerCarte,
    this.onVoirPaiements,
  });
  final ServiceProfil? service;

  /// Paiement Wave de 1 000 FCFA, branché à la bascule T11,
  /// par la feuille de paiement.
  final VoidCallback? onCreerCarte;

  /// Mes paiements, depuis le bloc contextuel en attente.
  final VoidCallback? onVoirPaiements;

  @override
  State<PageCarteNouvelle> createState() => _PageCarteNouvelleState();
}

class _PageCarteNouvelleState extends State<PageCarteNouvelle> {
  late final ServiceProfil _service;
  var _charge = false;
  var _apercuDebloque = false;

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

  void _basculerApercu() =>
      setState(() => _apercuDebloque = !_apercuDebloque);

  void _surToucherCarte() {
    final m = _service.membre;
    if (m == null) return;
    switch (_service.etatCarte) {
      case EtatCarte.verrouillee:
        _basculerApercu();
      case EtatCarte.validee:
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Carte ${m.matricule} prête à être présentée'),
          ),
        );
      case EtatCarte.enAttente:
        break;
    }
  }

  void _partagerIdentifiant(String matricule) {
    _copierIdentifiant(matricule);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Identifiant $matricule copié')),
    );
  }

  /// Copie lancée sans attendre : dans les tests, le canal
  /// presse-papiers ne répond jamais, le toast ne doit pas
  /// attendre derrière. L'erreur est avalée ici, jamais
  /// remontée sans gestion.
  Future<void> _copierIdentifiant(String matricule) async {
    try {
      await Clipboard.setData(ClipboardData(text: matricule));
    } catch (_) {
      // Presse-papiers indisponible, le matricule reste
      // visible sur la carte.
    }
  }

  Widget _boutonPrincipal(EtatCarte etat, Member m) {
    return switch (etat) {
      EtatCarte.verrouillee => _service.carteEnAttente
          ? const OutlinedButton(
              onPressed: null,
              child: Text('Création en attente'),
            )
          : _BoutonOr(
              label: 'Créer ma carte • 1 000 FCFA',
              icone: Icons.credit_card,
              onPressed: widget.onCreerCarte,
            ),
      EtatCarte.enAttente => const OutlinedButton(
          onPressed: null,
          child: Text('Création en attente'),
        ),
      EtatCarte.validee => _BoutonOr(
          label: 'Partager mon identifiant membre',
          icone: Icons.share,
          onPressed: () => _partagerIdentifiant(m.matricule),
        ),
    };
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final m = _service.membre;
    if (m == null) {
      return const Center(
          child: Text('Connectez-vous pour voir votre carte.'));
    }
    final etat = _service.etatCarte;
    return SingleChildScrollView(
      padding: EdgeInsets.fromLTRB(20, 20, 20, 24 + MediaQuery.paddingOf(context).bottom),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Ma carte',
                style: TextStyle(
                  color: PaletteNouvelle.bleuNuit,
                  fontSize: 24,
                  fontWeight: FontWeight.w800,
                ),
              ),
              PastilleEtatCarte(etat: etat),
            ],
          ),
          const SizedBox(height: 14),
          ControleSegmenteEtat(etat: etat),
          const SizedBox(height: 20),
          CartePremium(
            membre: m,
            etat: etat,
            apercuDebloque: _apercuDebloque,
            onTap: _surToucherCarte,
          ),
          const SizedBox(height: 16),
          BlocContexteCarte(
            etat: etat,
            apercuDebloque: _apercuDebloque,
            onSecondaire: switch (etat) {
              EtatCarte.verrouillee => _basculerApercu,
              EtatCarte.enAttente => widget.onVoirPaiements,
              EtatCarte.validee => null,
            },
          ),
          const SizedBox(height: 16),
          _boutonPrincipal(etat, m),
          const SizedBox(height: 12),
          const Text(
            'Visuel seul, la carte ne se modifie pas ici. Pour changer vos informations, ouvrez Mon profil depuis l’en-tête.',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey, fontSize: 12),
          ),
        ],
      ),
    );
  }
}
