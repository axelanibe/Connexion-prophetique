// Mot de passe forcé après une connexion avec un mot de passe
// temporaire, tranche T11 : extrait de l’ancien
// lib/differe_membre.dart, supprimé avec l’ancienne interface.
// Seule cette page survit, pour le flux de connexion.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';

class ForcedPasswordPage extends StatefulWidget {
  const ForcedPasswordPage({super.key});
  @override
  State<ForcedPasswordPage> createState() => _ForcedPasswordPageState();
}

class _ForcedPasswordPageState extends State<ForcedPasswordPage> {
  final _nouveau = TextEditingController();
  final _confirm = TextEditingController();
  bool _show = false;
  bool _busy = false;
  String? _error;

  @override
  void dispose() {
    _nouveau.dispose();
    _confirm.dispose();
    super.dispose();
  }

  InputDecoration _dec(String label) => InputDecoration(
        labelText: label,
        filled: true,
        fillColor: Cp.card,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
      );

  Future<void> _submit() async {
    final nouveau = _nouveau.text;
    if (nouveau.length < 8) {
      setState(() => _error = tr('Le nouveau mot de passe doit avoir au moins 8 caractères.'));
      return;
    }
    if (nouveau != _confirm.text) {
      setState(() => _error = tr('Les deux mots de passe ne correspondent pas.'));
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await api.changePasswordForced(nouveau);
      if (mounted) Navigator.of(context).pop(true);
    } on ApiException catch (e) {
      if (mounted) {
        setState(() {
          _busy = false;
          _error = e.message;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _busy = false;
          _error = tr('Serveur injoignable. Vérifiez votre connexion, puis réessayez.');
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return PopScope(
      canPop: false,
      child: basic(tr('Nouveau mot de passe'), [
        Text(tr('Tu t’es connecté avec un mot de passe temporaire. Choisis un nouveau mot de passe pour continuer. L’ancien ne fonctionne plus.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _nouveau,
          obscureText: !_show,
          decoration: _dec(tr('Nouveau mot de passe (au moins 8 caractères)')).copyWith(
            suffixIcon: IconButton(
              icon: Icon(_show ? Icons.visibility_off_outlined : Icons.visibility_outlined),
              onPressed: () => setState(() => _show = !_show),
            ),
          ),
        ),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _confirm,
          obscureText: !_show,
          decoration: _dec(tr('Confirmer le nouveau mot de passe')),
        ),
        if (_error != null) ...[
          const SizedBox(height: Cp.s1),
          Text(_error!, style: const TextStyle(color: Cp.danger)),
        ],
        const SizedBox(height: Cp.s3),
        SizedBox(
          height: 56,
          child: FilledButton(
            onPressed: _busy ? null : _submit,
            child: Text(_busy ? tr('En cours…') : tr('Choisir ce mot de passe')),
          ),
        ),
        const SizedBox(height: Cp.s1),
        TextButton(
          onPressed: () async {
            app.logout();
            if (mounted) Navigator.of(context).pop(false);
          },
          child: Text(tr('Se déconnecter')),
        ),
      ]),
    );
  }
}
