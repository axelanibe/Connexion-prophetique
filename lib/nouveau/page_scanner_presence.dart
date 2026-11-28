// Pointage par scan QR, correctif global 27 nov. 2026.
// Le QR de la carte porte le matricule. Deux gestes : marquer
// la présence sur une activité, ou régler en espèces la
// cotisation du mois, 1 000 FCFA, mois en cours côté serveur.
// Sans caméra, la saisie manuelle du matricule suffit.
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

import 'palette.dart';
import 'service_t18.dart';

class PageScannerPresence extends StatefulWidget {
  const PageScannerPresence({
    super.key,
    required this.service,
    this.activiteId,
    this.activiteNom,
    this.avecCamera = true,
  });
  final ServiceT18 service;

  /// Activité pointée, null depuis la Comptabilité : seule la
  /// cotisation espèces est alors proposée.
  final String? activiteId;
  final String? activiteNom;

  /// Faux en test, la caméra n'y existe pas.
  final bool avecCamera;

  @override
  State<PageScannerPresence> createState() => _PageScannerPresenceState();
}

class _PageScannerPresenceState extends State<PageScannerPresence> {
  MobileScannerController? _controleur;
  final _matricule = TextEditingController();
  var _scanne = false;
  var _enCours = false;
  String? _confirmation;

  @override
  void initState() {
    super.initState();
    if (widget.avecCamera) {
      _controleur = MobileScannerController(
        detectionSpeed: DetectionSpeed.noDuplicates,
      );
    }
  }

  @override
  void dispose() {
    _controleur?.dispose();
    _matricule.dispose();
    super.dispose();
  }

  void _surDetection(BarcodeCapture capture) {
    final code = capture.barcodes.firstOrNull?.rawValue;
    if (code == null || code.isEmpty || _scanne) return;
    _controleur?.stop();
    setState(() {
      _scanne = true;
      _matricule.text = code;
      _confirmation = null;
    });
  }

  void _message(String texte) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(texte)),
    );
  }

  Future<void> _agir(Future<bool> Function() action, String succes) async {
    final matricule = _matricule.text.trim();
    if (matricule.isEmpty) {
      _message('Scanne un QR ou saisis un matricule.');
      return;
    }
    if (_enCours) return;
    setState(() => _enCours = true);
    final ok = await action();
    if (!mounted) return;
    setState(() {
      _enCours = false;
      _confirmation = ok ? succes : null;
    });
    if (!ok) _message('Impossible pour le moment.');
  }

  void _autre() {
    setState(() {
      _scanne = false;
      _matricule.clear();
      _confirmation = null;
    });
    _controleur?.start();
  }

  @override
  Widget build(BuildContext context) {
    final controleur = _controleur;
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        title: Text(
          widget.activiteNom == null
              ? 'Scanner un QR'
              : 'Scanner : ${widget.activiteNom}',
        ),
        backgroundColor: Colors.white,
        foregroundColor: PaletteNouvelle.bleuNuit,
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
        children: [
          if (controleur != null)
            AspectRatio(
              aspectRatio: 1,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: MobileScanner(
                  controller: controleur,
                  onDetect: _surDetection,
                ),
              ),
            ),
          const SizedBox(height: 16),
          TextField(
            controller: _matricule,
            decoration: const InputDecoration(
              labelText: 'Matricule',
              border: OutlineInputBorder(),
            ),
            onChanged: (_) {
              if (_confirmation != null) {
                setState(() => _confirmation = null);
              }
            },
          ),
          const SizedBox(height: 12),
          if (_confirmation != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Text(
                _confirmation!,
                style: const TextStyle(
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF15803D),
                ),
              ),
            ),
          if (widget.activiteId != null)
            FilledButton.icon(
              onPressed: _enCours
                  ? null
                  : () => _agir(
                        () => widget.service.scannerPresence(
                          widget.activiteId!,
                          _matricule.text.trim(),
                        ),
                        'Présence marquée.',
                      ),
              icon: const Icon(Icons.check_circle_outlined),
              label: const Text('Marquer la présence'),
            ),
          if (widget.activiteId != null) const SizedBox(height: 8),
          OutlinedButton.icon(
            onPressed: _enCours
                ? null
                : () => _agir(
                      () => widget.service.marquerEspeces(
                        _matricule.text.trim(),
                      ),
                      'Cotisation espèces enregistrée, 1 000 FCFA.',
                    ),
            icon: const Icon(Icons.payments_outlined),
            label: const Text('Cotisation espèces · 1 000 FCFA'),
          ),
          const SizedBox(height: 8),
          TextButton.icon(
            onPressed: _autre,
            icon: const Icon(Icons.qr_code_scanner_outlined),
            label: const Text('Scanner un autre'),
          ),
        ],
      ),
    );
  }
}
