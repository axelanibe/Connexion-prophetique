// Vérification d'e-mail à l'inscription et double authentification,
// MO-25, analyse de sécurité du 22 nov. 2026.
//
// Écrans ouverts depuis le formulaire de connexion et d'inscription
// de main.dart, et section Double authentification de la page
// Paramètres, pour les administrateurs. Aucune donnée n'est
// inventée : les routes sont celles du serveur, /auth/verifier-email,
// /auth/renvoyer-code-verification, /auth/connexion-2fa, et pour la
// gestion /auth/double-authentification/activer, confirmer, desactiver.

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';

import 'api.dart';
import 'i18n.dart';

const _bleuNuit = Color(0xFF0F1C2E);

void _message(BuildContext context, String texte) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(texte)));
}

/// Champ de saisie d'un code à 6 chiffres, chiffres seulement.
class _ChampCode extends StatelessWidget {
  const _ChampCode({required this.controleur, required this.intitule});
  final TextEditingController controleur;
  final String intitule;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controleur,
      keyboardType: TextInputType.number,
      inputFormatters: [
        FilteringTextInputFormatter.digitsOnly,
        LengthLimitingTextInputFormatter(6),
      ],
      decoration: InputDecoration(
        labelText: intitule,
        hintText: '123456',
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }
}

/// Écran de vérification d'e-mail après inscription : quand POST
/// /auth/inscription renvoie 202 avec verification_requise, cet
/// écran demande le code à 6 chiffres, appelle
/// POST /auth/verifier-email, puis rend vrai à la fermeture, les
/// jetons étant enregistrés par l'API. Un bouton renvoie le code.
class VerificationEmailPage extends StatefulWidget {
  const VerificationEmailPage({super.key, required this.email});
  final String email;

  @override
  State<VerificationEmailPage> createState() => _VerificationEmailPageState();
}

class _VerificationEmailPageState extends State<VerificationEmailPage> {
  final _code = TextEditingController();
  bool _occupe = false;
  String? _erreur;

  @override
  void dispose() {
    _code.dispose();
    super.dispose();
  }

  Future<void> _valider() async {
    if (_code.text.length != 6) {
      setState(() => _erreur = tr('Saisissez le code à 6 chiffres reçu.'));
      return;
    }
    setState(() {
      _occupe = true;
      _erreur = null;
    });
    try {
      await api.verifierEmail(email: widget.email, code: _code.text);
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } on ApiException catch (e) {
      if (mounted) setState(() => _erreur = e.message);
    } catch (_) {
      if (mounted) setState(() => _erreur = tr('Vérification impossible. Vérifiez votre connexion, puis réessayez.'));
    } finally {
      if (mounted) setState(() => _occupe = false);
    }
  }

  Future<void> _renvoyer() async {
    setState(() => _erreur = null);
    try {
      await api.renvoyerCodeVerification(widget.email);
      if (mounted) _message(context, tr('Code renvoyé.'));
    } on ApiException catch (e) {
      if (mounted) setState(() => _erreur = e.message);
    } catch (_) {
      if (mounted) setState(() => _erreur = tr('Renvoi impossible. Vérifiez votre connexion, puis réessayez.'));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: _bleuNuit,
        foregroundColor: Colors.white,
        title: Text(tr('Vérifiez votre e-mail')),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              tr('Un code à 6 chiffres a été envoyé à ${widget.email}. Saisissez-le pour terminer votre inscription.'),
            ),
            const SizedBox(height: 16),
            _ChampCode(controleur: _code, intitule: tr('Code de vérification')),
            if (_erreur != null) ...[
              const SizedBox(height: 8),
              Text(_erreur!, style: const TextStyle(color: Colors.red)),
            ],
            const SizedBox(height: 16),
            FilledButton(
              onPressed: _occupe ? null : _valider,
              child: Text(_occupe ? tr('Vérification…') : tr('Vérifier')),
            ),
            const SizedBox(height: 8),
            TextButton(
              onPressed: _occupe ? null : _renvoyer,
              child: Text(tr('Renvoyer le code')),
            ),
          ],
        ),
      ),
    );
  }
}

/// Écran de double authentification à la connexion : quand POST
/// /auth/connexion renvoie double_authentification_requise, cet
/// écran demande le code à 6 chiffres, appelle
/// POST /auth/connexion-2fa, puis rend vrai à la fermeture, les
/// jetons étant enregistrés par l'API.
class Connexion2faPage extends StatefulWidget {
  const Connexion2faPage({super.key, required this.identifiant});
  final String identifiant;

  @override
  State<Connexion2faPage> createState() => _Connexion2faPageState();
}

class _Connexion2faPageState extends State<Connexion2faPage> {
  final _code = TextEditingController();
  bool _occupe = false;
  String? _erreur;

  @override
  void dispose() {
    _code.dispose();
    super.dispose();
  }

  Future<void> _valider() async {
    if (_code.text.length != 6) {
      setState(() => _erreur = tr('Saisissez le code à 6 chiffres.'));
      return;
    }
    setState(() {
      _occupe = true;
      _erreur = null;
    });
    try {
      await api.connexion2fa(identifiant: widget.identifiant, code: _code.text);
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } on ApiException catch (e) {
      if (mounted) setState(() => _erreur = e.message);
    } catch (_) {
      if (mounted) setState(() => _erreur = tr('Vérification impossible. Vérifiez votre connexion, puis réessayez.'));
    } finally {
      if (mounted) setState(() => _occupe = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: _bleuNuit,
        foregroundColor: Colors.white,
        title: Text(tr('Double authentification')),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(tr('Saisissez le code à 6 chiffres de votre application d’authentification.')),
            const SizedBox(height: 16),
            _ChampCode(controleur: _code, intitule: tr('Code à 6 chiffres')),
            if (_erreur != null) ...[
              const SizedBox(height: 8),
              Text(_erreur!, style: const TextStyle(color: Colors.red)),
            ],
            const SizedBox(height: 16),
            FilledButton(
              onPressed: _occupe ? null : _valider,
              child: Text(_occupe ? tr('Vérification…') : tr('Se connecter')),
            ),
          ],
        ),
      ),
    );
  }
}

/// Section Double authentification des Paramètres, pour les
/// administrateurs. Activation : le serveur renvoie otpauth_url,
/// affiché en QR à scanner dans une application d'authentification,
/// puis le code confirme l'activation. Désactivation : par code.
class SectionDoubleAuthentification extends StatefulWidget {
  const SectionDoubleAuthentification({super.key});

  @override
  State<SectionDoubleAuthentification> createState() =>
      _SectionDoubleAuthentificationState();
}

class _SectionDoubleAuthentificationState
    extends State<SectionDoubleAuthentification> {
  final _codeActivation = TextEditingController();
  final _codeDesactivation = TextEditingController();
  String? _qrUrl;
  bool _occupe = false;
  bool _activee = false;
  String? _message;

  @override
  void dispose() {
    _codeActivation.dispose();
    _codeDesactivation.dispose();
    super.dispose();
  }

  Future<void> _demanderActivation() async {
    setState(() {
      _occupe = true;
      _message = null;
    });
    try {
      final reponse = await api.demanderActivation2fa();
      final url = reponse['otpauth_url'];
      if (!mounted) return;
      setState(() {
        _qrUrl = url is String && url.isNotEmpty ? url : null;
        _message = _qrUrl == null
            ? tr('Activation demandée, mais aucun QR reçu. Réessayez.')
            : null;
      });
    } on ApiException catch (e) {
      if (mounted) setState(() => _message = e.message);
    } catch (_) {
      if (mounted) {
        setState(() => _message = tr('Activation impossible. Vérifiez votre connexion, puis réessayez.'));
      }
    } finally {
      if (mounted) setState(() => _occupe = false);
    }
  }

  Future<void> _confirmerActivation() async {
    if (_codeActivation.text.length != 6) {
      setState(() => _message = tr('Saisissez le code à 6 chiffres.'));
      return;
    }
    setState(() {
      _occupe = true;
      _message = null;
    });
    try {
      await api.confirmerActivation2fa(_codeActivation.text);
      if (!mounted) return;
      setState(() {
        _activee = true;
        _qrUrl = null;
        _message = tr('Double authentification activée.');
      });
    } on ApiException catch (e) {
      if (mounted) setState(() => _message = e.message);
    } catch (_) {
      if (mounted) {
        setState(() => _message = tr('Confirmation impossible. Vérifiez votre connexion, puis réessayez.'));
      }
    } finally {
      if (mounted) setState(() => _occupe = false);
    }
  }

  Future<void> _desactiver() async {
    if (_codeDesactivation.text.length != 6) {
      setState(() => _message = tr('Saisissez le code à 6 chiffres.'));
      return;
    }
    setState(() {
      _occupe = true;
      _message = null;
    });
    try {
      await api.desactiver2fa(_codeDesactivation.text);
      if (!mounted) return;
      setState(() {
        _activee = false;
        _message = tr('Double authentification désactivée.');
      });
    } on ApiException catch (e) {
      if (mounted) setState(() => _message = e.message);
    } catch (_) {
      if (mounted) {
        setState(() => _message = tr('Désactivation impossible. Vérifiez votre connexion, puis réessayez.'));
      }
    } finally {
      if (mounted) setState(() => _occupe = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          tr('Double authentification'),
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w800,
                color: _bleuNuit,
              ),
        ),
        const SizedBox(height: 4),
        Text(
          _activee
              ? tr('La double authentification est activée sur ce compte.')
              : tr('Protège la connexion des administrateurs par un code à 6 chiffres, en plus du mot de passe.'),
        ),
        const SizedBox(height: 8),
        if (_qrUrl == null && !_activee)
          FilledButton(
            onPressed: _occupe ? null : _demanderActivation,
            child: Text(tr('Activer la double authentification')),
          ),
        if (_qrUrl != null) ...[
          const SizedBox(height: 8),
          Text(tr('Scannez ce QR avec votre application d’authentification, puis saisissez le code affiché.')),
          const SizedBox(height: 8),
          Center(child: QrImageView(data: _qrUrl!, size: 200, backgroundColor: Colors.white)),
          const SizedBox(height: 8),
          _ChampCode(controleur: _codeActivation, intitule: tr('Code à 6 chiffres')),
          const SizedBox(height: 8),
          FilledButton(
            onPressed: _occupe ? null : _confirmerActivation,
            child: Text(tr('Confirmer l’activation')),
          ),
        ],
        const SizedBox(height: 8),
        _ChampCode(controleur: _codeDesactivation, intitule: tr('Code à 6 chiffres')),
        const SizedBox(height: 8),
        OutlinedButton(
          onPressed: _occupe ? null : _desactiver,
          child: Text(tr('Désactiver la double authentification')),
        ),
        if (_message != null) ...[
          const SizedBox(height: 8),
          Text(_message!),
        ],
      ],
    );
  }
}
