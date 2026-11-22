// Réactions « Amen » sur méditations et enseignements, 21 nov.
// 2026, tranche 6 de l'audit du 17 nov. : un Amen par membre et
// par cible, bascule possible (retirer son Amen). La cible est
// une méditation, identifiée par sa référence livre:chapitre:
// verset dans la Bible embarquée, ou un enseignement, identifié
// par son identifiant serveur. Les enseignements sans
// identifiant serveur, locaux seulement, n'ont pas de Amen :
// sans identité serveur, le compte ne vaudrait rien d'un
// téléphone à l'autre.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);

/// Identifiant de cible d'une méditation : livre, chapitre et
/// verset, même numérotation que la Bible embarquée.
String cibleIdMeditation(int livre, int chapitre, int verset) => '$livre:$chapitre:$verset';

/// Identifiant de cible d'un enseignement : son identifiant
/// serveur, vide quand l'enseignement est local seulement.
String cibleIdEnseignement(String serverId) => serverId;

/// Compte d'Amens d'une cible, avec mon Amen ou non.
class CompteAmen {
  CompteAmen({required this.cibleType, required this.cibleId, this.nombre = 0, this.aDitAmen = false});

  factory CompteAmen.fromJson(Map<String, dynamic> j) {
    final brut = j['nombre'];
    final nombre = brut is int ? brut : int.tryParse((brut ?? '').toString()) ?? 0;
    return CompteAmen(
      cibleType: (j['cible_type'] ?? '').toString(),
      cibleId: (j['cible_id'] ?? '').toString(),
      nombre: nombre,
      aDitAmen: j['a_dit_amen'] == true,
    );
  }

  final String cibleType;
  final String cibleId;
  final int nombre;
  final bool aDitAmen;
}

/// Comptes depuis la réponse du serveur, dans l'ordre renvoyé.
List<CompteAmen> comptesAmensDepuisReponse(Map<String, dynamic> data) {
  final lignes = data['comptes'];
  if (lignes is! List) return const [];
  return lignes.whereType<Map<String, dynamic>>().map(CompteAmen.fromJson).toList();
}

/// Bouton Amen avec compteur : « Amen » et le nombre, fond or
/// quand j'ai dit Amen. Un toucher dit Amen, un deuxième le
/// retire. Le compte initial, quand la page l'a déjà chargé en
/// lot, évite un appel par carte ; sinon le bouton charge son
/// propre compte.
class AmenButton extends StatefulWidget {
  const AmenButton({super.key, required this.cibleType, required this.cibleId, this.client, this.initial});

  final String cibleType;
  final String cibleId;

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Compte déjà connu, sinon null et le bouton le charge.
  final CompteAmen? initial;

  @override
  State<AmenButton> createState() => _AmenButtonState();
}

class _AmenButtonState extends State<AmenButton> {
  int _nombre = 0;
  bool _dit = false;
  bool _enCours = false;

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    final initial = widget.initial;
    if (initial != null) {
      _nombre = initial.nombre;
      _dit = initial.aDitAmen;
    } else {
      _charger();
    }
  }

  @override
  void didUpdateWidget(covariant AmenButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    final initial = widget.initial;
    if (initial != null && (initial.nombre != _nombre || initial.aDitAmen != _dit)) {
      setState(() {
        _nombre = initial.nombre;
        _dit = initial.aDitAmen;
      });
    }
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchCompteAmen(widget.cibleType, widget.cibleId);
      if (!mounted) return;
      final compte = CompteAmen.fromJson(data);
      setState(() {
        _nombre = compte.nombre;
        _dit = compte.aDitAmen;
      });
    } catch (_) {
      // Compte indisponible : le bouton reste à zéro, sans
      // bloquer la carte, le toucher réessaiera.
    }
  }

  Future<void> _basculer() async {
    if (_enCours) return;
    setState(() => _enCours = true);
    try {
      final data = _dit
          ? await _client.retirerAmen(widget.cibleType, widget.cibleId)
          : await _client.direAmen(widget.cibleType, widget.cibleId);
      if (!mounted) return;
      final amen = data['amen'];
      if (amen is Map<String, dynamic>) {
        final compte = CompteAmen.fromJson(amen);
        setState(() {
          _nombre = compte.nombre;
          _dit = compte.aDitAmen;
        });
      } else {
        setState(() {
          _nombre = (_nombre + (_dit ? -1 : 1)).clamp(0, 1 << 30);
          _dit = !_dit;
        });
      }
    } catch (e) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString())));
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final label = _nombre > 0 ? '${tr('Amen')} · $_nombre' : tr('Amen');
    return OutlinedButton.icon(
      onPressed: _enCours ? null : _basculer,
      icon: Icon(_dit ? Icons.volunteer_activism : Icons.volunteer_activism_outlined, size: 18, color: _nuit),
      label: Text(label, style: const TextStyle(color: _nuit, fontWeight: FontWeight.w700, fontSize: 13)),
      style: OutlinedButton.styleFrom(
        minimumSize: const Size(0, 40),
        padding: const EdgeInsets.symmetric(horizontal: 10),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        backgroundColor: _dit ? _or : Colors.white,
        side: BorderSide(color: _dit ? _or : const Color(0xFFD8DEE8)),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }
}
