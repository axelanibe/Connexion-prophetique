// Ecrans membre en chargement differe, phase 2, 31 oct. 2026 :
// ces ecrans sont rarement ouverts (Plus, facture, lecteur, mot de
// passe force, rapport de bug, historique), ils sont charges a la
// demande par lib/main.dart (import differe, porte goMembre), jamais
// au demarrage. Meme modele que lib/admin_pages.dart en phase 1.
// Ce fichier importe lib/main.dart pour les aides partagees
// (couleurs, textes, navigation, modeles) ; le cycle import differe
// / import direct est accepte par Dart, comme en phase 1.
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:share_plus/share_plus.dart';

import 'api.dart';
import 'bug_reports.dart';
import 'link_view.dart';
import 'i18n.dart';
import 'main.dart';
import 'text_size.dart';
import 'visite_guidee.dart';

class TextSizePage extends StatelessWidget {
  const TextSizePage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic(tr('Taille du texte'), [
        // Présentation photo, 1er nov. 2026 : cartes avec pastille
        // Aa, nom du niveau, exemple à cette taille, coche sur le
        // niveau choisi, et carte Aperçu en bas. Les niveaux et les
        // facteurs ne changent pas. Depuis le 1er nov. 2026 le reglage
        // s'applique a toute l'application : l'exemple de chaque carte
        // est donc divise par le facteur courant, sinon il serait
        // agrandi deux fois par le reglage global.
        Text(tr('Choisissez la taille du texte de toute l’application. Le réglage s’applique tout de suite et reste gardé sur cet appareil, pour vos prochaines ouvertures.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: Cp.s2),
        ListenableBuilder(
          listenable: textSize,
          builder: (c, _) => Column(children: [
            for (var i = 0; i < TextSize.factors.length; i++) ...[
              if (i > 0) const SizedBox(height: Cp.s1),
              InkWell(
                borderRadius: BorderRadius.circular(24),
                onTap: () => textSize.setLevel(i),
                child: Container(
                  padding: const EdgeInsets.all(Cp.s2),
                  decoration: BoxDecoration(
                    color: textSize.level == i ? Cp.verseTint : Colors.white,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: textSize.level == i ? Cp.gold : Cp.line, width: textSize.level == i ? 2 : 1),
                  ),
                  child: Row(children: [
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(16)),
                      child: const Center(child: Text('Aa', style: TextStyle(color: Cp.gold, fontSize: 22, fontWeight: FontWeight.w800))),
                    ),
                    const SizedBox(width: Cp.s1),
                    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(textSizeLevelName(i), style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy, fontSize: 18)),
                      const SizedBox(height: 2),
                      Text(tr('Exemple de texte à cette taille.'), style: TextStyle(fontSize: 16 * TextSize.factors[i] / textSize.factor, height: 1.5, color: Cp.ink)),
                    ])),
                    if (textSize.level == i) const Icon(Icons.check_outlined, color: Cp.goldDeep),
                  ]),
                ),
              ),
            ],
          ]),
        ),
        const SizedBox(height: Cp.s2),
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
          child: Text(tr('Aperçu : la Bible, les enseignements, les annonces et tous les écrans suivent la taille choisie ici.'), style: t.bodyMedium),
        ),
      ]);
    });
  }
}

// Pages Plus, modèle web : À propos et Aide. Contenu limité aux
// faits déjà décidés (nom, devise, fonctions, politique publiée),
// sans membre, date, lieu ou tarif inventé.
class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('À propos'), [
      Text('CONNEXION PROPHETIQUE', style: t.titleLarge),
      const SizedBox(height: Cp.s1),
      Text(tr('Former pour mieux servir'), style: TextStyle(color: Color(0xFF8A6A12), fontSize: 16, fontWeight: FontWeight.w700)),
      const SizedBox(height: Cp.s2),
      // Qui sommes-nous, texte fourni par Axel le 27 oct. 2026,
      // en français, avec traduction anglaise fidèle en anglais.
      // L'adresse e-mail de contact n'est pas imprimée ici, car
      // le texte d'Axel portait des points d'interrogation devant
      // une adresse différente de celle déjà utilisée dans
      // l'application : la confirmation est en attente, et le
      // bouton ci-dessous utilise l'adresse déjà en place.
      Text(isEn ? 'Who are we?' : 'Qui sommes-nous ?', style: t.titleMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'Founded in 2019 in Côte d’Ivoire, Connexion Prophétique is a Christian non-profit association committed to the moral, spiritual and social guidance of young people. Inspired by strong Christian values, the association works for lasting change within vulnerable communities.'
          : 'Créée en 2019 en Côte d’Ivoire, Connexion Prophétique est une association chrétienne à but non lucratif engagée dans l’encadrement moral, spirituel et social de la jeunesse. Inspirée par des valeurs chrétiennes fortes, l’association œuvre en faveur d’un changement durable au sein des communautés vulnérables.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Text(isEn ? 'Our main missions' : 'Nos missions principales', style: t.titleMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'Connexion Prophétique carries out its work around three priority areas:'
          : 'Connexion Prophétique déploie ses actions autour de trois axes prioritaires :',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'Spiritual training and awareness: we promote Christian values and moral education, to prevent behavioural and social drift among young people.'
          : 'La formation spirituelle et la sensibilisation : nous promouvons les valeurs chrétiennes et l’éducation morale afin de prévenir les dérives comportementales et sociales chez les jeunes.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'The fight against pregnancy in schools: through prevention campaigns, listening sessions and educational support, we work to protect young girls and keep them in school.'
          : 'La lutte contre les grossesses en milieu scolaire : par des campagnes de prévention, des séances d’écoute et un accompagnement éducatif, nous œuvrons pour la protection et la continuité de la scolarité des jeunes filles.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'The reintegration of young people facing dependency: through rehabilitation programmes, vocational training and psychospiritual support, we help young people leave drug addiction and find an active place in society again.'
          : 'La réinsertion des jeunes en situation de dépendance : grâce à des programmes de réhabilitation, de formation professionnelle et de soutien psychospirituel, nous aidons les jeunes à sortir de la toxicomanie et à retrouver une place active dans la société.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'In addition, the association puts children from disadvantaged backgrounds through school, to offer them an alternative to the street, delinquency and exploitation in all its forms.'
          : 'En outre, l’association scolarise des enfants issus de milieux défavorisés afin de leur offrir une alternative à la rue, à la délinquance et à l’exploitation sous toutes ses formes.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Text(isEn ? 'Get involved with us' : 'Engagez-vous à nos côtés', style: t.titleMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'We believe lasting change is possible through solidarity and collective commitment. You can support this initiative with a contribution of any kind, financial, material, or voluntary, by writing to us at the address below.'
          : 'Nous croyons qu’un changement durable est possible grâce à la solidarité et à l’engagement collectif. Vous pouvez soutenir cette initiative en apportant votre contribution, quelle qu’en soit la nature (financière, matérielle, ou bénévole), en nous écrivant à l’adresse suivante :',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => openUrl(context, 'mailto:$kStructureEmail?subject=${Uri.encodeComponent('Soutien - CONNEXION PROPHETIQUE')}'),
          icon: const Icon(Icons.mail_outline),
          label: Text(tr('Écrire à la structure')),
        ),
      ),
      const SizedBox(height: Cp.s3),
      Text(isEn ? 'Bible, camps, member card and spiritual life. The app works online, with sync, and offline, with content already loaded on the device.' : 'Bible, camps, carte de membre et vie spirituelle. L’application fonctionne connectée, avec synchronisation, et déconnectée, avec les contenus déjà chargés sur l’appareil.', style: t.bodyMedium),
      const SizedBox(height: Cp.s3),
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => go(context, LinkViewPage(title: tr('Politique de confidentialité'), url: 'https://connexion-prophetique-site.onrender.com/privacy.html')),
          icon: const Icon(Icons.privacy_tip_outlined),
          label: Text(tr('Politique de confidentialité')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => go(context, const AidePage()),
          icon: const Icon(Icons.help_outline),
          label: Text(tr('Aide')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      // Relecture de la présentation après inscription, 3 nov. 2026 :
      // la même page que juste après une première inscription, sans
      // changer les autres boutons ni leurs destinations.
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => go(context, const PresentationApresInscriptionPage(revoir: true)),
          icon: const Icon(Icons.play_circle_outlined),
          label: Text(tr('Revoir la présentation')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      // Revoir la visite guidée, carte 90, 7 nov. 2026 : on
      // revient d'abord à l'application, puis la visite se lance
      // au-dessus de l'onglet, étape par étape.
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () {
            demandeVisiteGuidee.value++;
            Navigator.of(context).popUntil((r) => r.isFirst);
          },
          icon: const Icon(Icons.explore_outlined),
          label: Text(tr('Revoir la visite guidée')),
        ),
      ),
    ]);
  }
}

class AidePage extends StatelessWidget {
  const AidePage({super.key});

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Aide'), [
      Text(tr('Utiliser l’application'), style: t.titleLarge),
      const SizedBox(height: Cp.s1),
      Text(tr('Consultez la Bible, les camps et les livres en mode visiteur. Créez un compte gratuitement pour utiliser l’application comme membre. La carte de membre se crée avec un paiement unique de 1 000 FCFA par Wave ou par PayPal pour la diaspora, non obligatoire pour utiliser l’application. Un don ou un achat reste en attente tant que le moyen choisi n’a pas confirmé, ou tant que la structure n’a pas validé après contrôle de son compte.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s3),
      SizedBox(
        height: 52,
        child: FilledButton.icon(
          onPressed: () => openUrl(context, 'mailto:$kStructureEmail?subject=${Uri.encodeComponent('Aide - CONNEXION PROPHETIQUE')}'),
          icon: const Icon(Icons.mail_outline),
          label: Text(tr('Écrire à la structure')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      // Relecture de la présentation après inscription, 3 nov. 2026 :
      // la même page que juste après une première inscription.
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => go(context, const PresentationApresInscriptionPage(revoir: true)),
          icon: const Icon(Icons.play_circle_outlined),
          label: Text(tr('Revoir la présentation')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      // Revoir la visite guidée, carte 90, 7 nov. 2026 : on
      // revient d'abord à l'application, puis la visite se lance
      // au-dessus de l'onglet, étape par étape.
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () {
            demandeVisiteGuidee.value++;
            Navigator.of(context).popUntil((r) => r.isFirst);
          },
          icon: const Icon(Icons.explore_outlined),
          label: Text(tr('Revoir la visite guidée')),
        ),
      ),
    ]);
  }
}

class ReaderPage extends StatelessWidget {
  const ReaderPage({super.key, required this.book});
  final Book book;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final purchased = app.hasPurchasedBook(book);
    return basic(book.title, [
      if (!purchased)
        EmptyNote(icon: Icons.lock_outline, text: tr('Ce livre est verrouillé. Il s’ouvre après la confirmation du paiement.'))
      else ...[
        Text(book.title, style: t.titleLarge),
        const SizedBox(height: 4),
        Text(book.author, style: t.bodyMedium),
        const SizedBox(height: Cp.s3),
        SizedBox(
          width: double.infinity,
          height: 56,
          child: FilledButton.icon(
            onPressed: () => openPurchasedBook(context, book, book.title),
            icon: const Icon(Icons.auto_stories_outlined),
            label: Text(tr('Ouvrir le livre')),
          ),
        ),
      ],
    ]);
  }
}

class InvoicePage extends StatefulWidget {
  const InvoicePage({super.key, required this.request});
  final PayRequest request;

  @override
  State<InvoicePage> createState() => _InvoicePageState();
}

class _InvoicePageState extends State<InvoicePage> {
  final _invoiceKey = GlobalKey();
  bool _downloading = false;
  bool _downloadingPng = false;

  // Reçu en PNG, 27 oct. 2026 : la facture détaillée affichée
  // est capturée en image PNG, téléchargée dans Téléchargements,
  // comme la carte. Le PDF serveur reste disponible à côté,
  // quand la demande a été créée côté serveur : les reçus
  // existent donc en PDF et en PNG, après confirmation seulement.
  Future<void> _downloadPng() async {
    setState(() => _downloadingPng = true);
    try {
      final boundary = _invoiceKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
      if (boundary == null) {
        if (mounted) toast(context, tr('La facture n’est pas encore affichée.'));
        return;
      }
      final image = await boundary.toImage(pixelRatio: 3);
      final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
      final png = bytes?.buffer.asUint8List();
      if (png == null || png.isEmpty) {
        if (mounted) toast(context, tr('Impossible de créer l’image du reçu.'));
        return;
      }
      final file = await saveToDownloads(png, 'recu-${widget.request.ref}.png');
      if (mounted) toast(context, 'Reçu téléchargé : recu-${widget.request.ref}.png');
      await Share.shareXFiles([XFile(file.path)], text: 'Reçu ${widget.request.ref} — CONNEXION PROPHETIQUE');
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de télécharger le reçu en PNG.'));
    } finally {
      if (mounted) setState(() => _downloadingPng = false);
    }
  }

  Future<void> _downloadPdf() async {
    final r = widget.request;
    if (!r.confirmed) return;
    if (!api.isConnected) {
      toast(context, tr('La facture PDF du serveur demande une connexion et une demande créée côté serveur.'));
      return;
    }
    setState(() => _downloading = true);
    try {
      final bytes = await api.downloadFacture(r.ref);
      // Téléchargement réel depuis le 27 oct. 2026 : la facture PDF du
      // serveur est écrite dans Téléchargements (et non plus dans un
      // dossier temporaire qui disparaît), avec confirmation du nom,
      // puis proposée en partage. La facture n'existe qu'après
      // confirmation vérifiée du paiement, règle inchangée.
      final file = await saveToDownloads(bytes, 'facture-${r.ref}.pdf');
      if (mounted) toast(context, 'Facture téléchargée : facture-${r.ref}.pdf');
      await Share.shareXFiles([XFile(file.path)], text: 'Facture ${r.ref} — CONNEXION PROPHETIQUE');
    } catch (_) {
      if (mounted) {
        toast(context, tr('Facture PDF indisponible pour cette demande (demande locale ou non confirmée côté serveur). La facture détaillée ci-dessous reste affichée.'));
      }
    } finally {
      if (mounted) setState(() => _downloading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final r = widget.request;
    if (!r.confirmed) {
      return basic(tr('Facture'), [EmptyNote(icon: Icons.receipt_long_outlined, text: tr('La facture n’existe qu’après confirmation du paiement.'))]);
    }
    return basic(tr('Facture'), [
      RepaintBoundary(
        key: _invoiceKey,
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(isEn ? 'Invoice F-${r.ref}' : 'Facture F-${r.ref}', style: t.titleMedium),
            const SizedBox(height: 4),
            Text(isEn ? 'Date: ${dateFr(r.confirmedAt ?? r.date)}' : 'Date : ${dateFr(r.confirmedAt ?? r.date)}', style: t.bodyMedium),
            Text(isEn ? 'Customer: ${r.memberName} (${r.matricule})' : 'Client : ${r.memberName} (${r.matricule})', style: t.bodyMedium),
            Text(isEn ? 'Method: ${r.method}${r.currency.isEmpty ? '' : ' (${r.currency})'}' : 'Moyen : ${r.method}${r.currency.isEmpty ? '' : ' (${r.currency})'}', style: t.bodyMedium),
            const Divider(height: Cp.s3),
            if (r.items.isEmpty)
              Text(r.kind == 'don' ? tr('Contribution (don)') : r.kind == 'cotisation' ? tr('Cotisation mensuelle') : r.kind == 'carte' ? tr('Création de carte de membre (paiement unique)') : r.kind == 'camp' ? campRequestLabel(r) : tr('Paiement'), style: t.labelLarge)
            else
              for (final i in r.items)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Row(children: [
                    Expanded(child: Text('${i.title} — ${i.author}', style: t.labelLarge)),
                    Text(fcfa(i.price), style: t.labelLarge),
                  ]),
                ),
            const Divider(height: Cp.s3),
            Row(children: [
              Expanded(child: Text(tr('Total payé'), style: t.titleMedium)),
              Text(fcfa(r.amount), style: t.titleMedium),
            ]),
          ]),
        ),
      ),
      ),
      const SizedBox(height: Cp.s2),
      // Facture PDF du serveur, après confirmation seulement, et
      // reçu en PNG, capturé depuis la facture détaillée ci-dessus.
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton.icon(
          onPressed: _downloading ? null : _downloadPdf,
          icon: const Icon(Icons.picture_as_pdf_outlined),
          label: Text(_downloading ? tr('Préparation…') : tr('Télécharger la facture (PDF)')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: OutlinedButton.icon(
          onPressed: _downloadingPng ? null : _downloadPng,
          icon: const Icon(Icons.image_outlined),
          label: Text(_downloadingPng ? tr('Préparation…') : tr('Télécharger le reçu (PNG)')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('La facture PDF est générée côté serveur après confirmation vérifiée. Pour une demande locale, non créée côté serveur, le PDF serveur n’existe pas : la facture détaillée ci-dessus, téléchargeable en PNG, fait foi.'), style: t.bodyMedium),
    ]);
  }
}

// Changement forcé, 29 oct. 2026 : après une connexion avec un
// temporaire, le membre choisit un nouveau mot de passe avant tout
// autre usage. L'écran bloque le retour en arrière, seule la
// déconnexion permet de le quitter sans changer.
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

// ═══════════════════════════════════════════════════════════════════
// RAPPORTS DE BUG, 29 oct. 2026
// ═══════════════════════════════════════════════════════════════════

// Page « Signaler un problème », depuis l'onglet Plus, pour tout le
// monde, visiteur comme membre. Le membre décrit le bug, le contexte
// technique part tout seul : version, appareil, système, écran. Ne
// jamais taper ici de mot de passe, de numéro ou d'adresse e-mail :
// le message est nettoyé avant l'envoi, mais la description reste ce
// que le membre a écrit. Sans connexion, le rapport est gardé sur
// l'appareil et part à la prochaine connexion.
class BugReportPage extends StatefulWidget {
  const BugReportPage({super.key});
  @override
  State<BugReportPage> createState() => _BugReportPageState();
}

class _BugReportPageState extends State<BugReportPage> {
  final _description = TextEditingController();
  bool _sending = false;

  @override
  void dispose() {
    _description.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic(tr('Signaler un problème'), [
        Text(isEn ? 'Describe what went wrong, in a few words. The app version, device, system and current screen are sent automatically, nothing else.' : 'Décrivez ce qui ne marche pas, en quelques mots. La version de l’application, l’appareil, le système et l’écran courant partent tout seuls, rien d’autre.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _description,
          maxLines: 5,
          decoration: InputDecoration(
            hintText: isEn ? 'What happened? (optional)' : 'Que s’est-il passé ? (facultatif)',
            border: const OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: Cp.s1),
        Text(isEn ? 'Never type a password, a phone number or an email address here.' : 'Ne tapez jamais ici de mot de passe, de numéro de téléphone ou d’adresse e-mail.', style: t.bodyMedium?.copyWith(color: Cp.danger)),
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          child: FilledButton(
            onPressed: _sending
                ? null
                : () async {
                    setState(() => _sending = true);
                    final sent = await BugReports.instance.reportManual(_description.text);
                    if (!mounted) return;
                    setState(() => _sending = false);
                    toast(c, sent ? tr('Rapport envoyé. Merci.') : tr('Rapport gardé sur l’appareil, il partira à la prochaine connexion.'));
                    if (sent) Navigator.of(c).pop();
                  },
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
            child: Text(_sending ? tr('Envoi…') : tr('Envoyer le rapport')),
          ),
        ),
      ]);
    });
  }
}

// Historique unifié du membre connecté.
class TransactionHistoryPage extends StatefulWidget {
  const TransactionHistoryPage({super.key});

  @override
  State<TransactionHistoryPage> createState() => _TransactionHistoryPageState();
}

class _TransactionHistoryPageState extends State<TransactionHistoryPage> {
  List<Map<String, dynamic>> _rows = [];
  bool _loading = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    if (kIsWeb) {
      setState(() => _loading = false);
      return;
    }
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final rows = await api.fetchMyPayments();
      if (!mounted) return;
      setState(() {
        _rows = rows;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _erreur = tr('Impossible de charger l’historique.');
        _loading = false;
      });
    }
  }

  Future<void> _ouvrirFiche(BuildContext c, Map<String, dynamic> row) async {
    await showModalBottomSheet<void>(
      context: c,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (sheetCtx) => TransactionDetailSheet(
        row: row,
        isAdmin: false,
        onFacture: row['statut'] == 'confirme'
            ? () {
                Navigator.of(sheetCtx).pop();
                go(c, InvoicePage(request: payRequestFromRow(row, isAdmin: false)));
              }
            : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      return basic(tr('Historique des transactions'), [
        EmptyNote(icon: Icons.smartphone_outlined, text: tr('Disponible sur téléphone seulement.')),
      ]);
    }
    return basic(tr('Historique des transactions'), [
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.receipt_long_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_rows.isEmpty)
        EmptyNote(icon: Icons.receipt_long_outlined, text: tr('Aucune opération pour le moment.'))
      else
        for (final row in _rows)
          Padding(
            padding: const EdgeInsets.only(bottom: Cp.s1),
            child: carteOperation(context, row, isAdmin: false, onTap: () => _ouvrirFiche(context, row)),
          ),
    ], actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

// ───────────────────────── Département scolaire, vue membre,
// 2 nov. 2026, tranche 2 ─────────────────────────
// Lecture seule de ses propres moyennes, jamais celles des autres
// membres, jamais une modification depuis ici : la saisie reste
// réservée aux responsables, dans l'Espace structure.
double? _mesMoyenne(dynamic v) {
  if (v == null) return null;
  if (v is num) return v.toDouble();
  return double.tryParse(v.toString());
}

String _mesMoyenneTexte(dynamic v) {
  final d = _mesMoyenne(v);
  if (d == null) return '';
  if (d == d.truncateToDouble()) return '${d.toInt()}';
  return d.toStringAsFixed(2);
}

String _mesClasse(Map<String, dynamic> r) {
  if ((r['classe'] ?? '').toString() == 'Autre' && (r['classe_libre'] ?? '').toString().isNotEmpty) return (r['classe_libre'] ?? '').toString();
  return (r['classe'] ?? '').toString();
}

String _mesTypeLabel(String? v) {
  switch (v) {
    case 'bepc':
      return 'BEPC';
    case 'bac':
      return 'BAC';
    case 'autre':
      return tr('Autre');
    default:
      return '';
  }
}

String _mesResultatLabel(String? v) {
  switch (v) {
    case 'admis':
      return tr('Admis');
    case 'ajourne':
      return tr('Ajourné');
    default:
      return '';
  }
}

bool _mesAlerte(Map<String, dynamic> r) {
  for (final v in [r['moyenne_t1'], r['moyenne_t2'], r['moyenne_t3']]) {
    final d = _mesMoyenne(v);
    if (d != null && d < 10) return true;
  }
  return false;
}

class MesResultatsScolairesPage extends StatefulWidget {
  const MesResultatsScolairesPage({super.key});
  @override
  State<MesResultatsScolairesPage> createState() => _MesResultatsScolairesPageState();
}

class _MesResultatsScolairesPageState extends State<MesResultatsScolairesPage> {
  List<Map<String, dynamic>> _suivis = [];
  bool _loading = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final suivis = await api.fetchMesSuivisScolaires();
      if (!mounted) return;
      setState(() {
        _suivis = suivis;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Mes résultats scolaires'), [
      Text(tr('Ces moyennes sont saisies par un responsable de la structure, elles ne se modifient pas ici. Seules vos propres moyennes sont affichées.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.school_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_suivis.isEmpty)
        EmptyNote(icon: Icons.school_outlined, text: tr('Aucune moyenne enregistrée pour le moment.'))
      else
        for (final r in _suivis) ...[
          Container(
            margin: const EdgeInsets.only(bottom: Cp.s1),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(child: Text('${_mesClasse(r)} · ${(r['annee_scolaire'] ?? '').toString()}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                  if (_mesAlerte(r))
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: const Color(0xFFFFF3E0), borderRadius: BorderRadius.circular(999)),
                      child: Text(tr('À accompagner'), style: const TextStyle(color: Color(0xFF8A6A12), fontWeight: FontWeight.w700, fontSize: 13)),
                    ),
                ]),
                const SizedBox(height: 4),
                if ((r['etablissement'] ?? '').toString().isNotEmpty) Text((r['etablissement'] ?? '').toString(), style: t.bodyMedium),
                Text('${tr('Trimestre 1')} : ${_mesMoyenneTexte(r['moyenne_t1']).isEmpty ? tr('Non noté') : _mesMoyenneTexte(r['moyenne_t1'])} · ${tr('Trimestre 2')} : ${_mesMoyenneTexte(r['moyenne_t2']).isEmpty ? tr('Non noté') : _mesMoyenneTexte(r['moyenne_t2'])} · ${tr('Trimestre 3')} : ${_mesMoyenneTexte(r['moyenne_t3']).isEmpty ? tr('Non noté') : _mesMoyenneTexte(r['moyenne_t3'])}', style: t.bodyMedium),
                if (_mesMoyenne(r['moyenne_annuelle']) != null) Text('${tr('Moyenne annuelle')} : ${_mesMoyenneTexte(r['moyenne_annuelle'])}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
                if ((r['examen'] ?? false) == true) Text('${tr('Classe d’examen')}${_mesTypeLabel((r['type_examen'] ?? '').toString().isEmpty ? null : (r['type_examen'] ?? '').toString()).isEmpty ? '' : ' · ${_mesTypeLabel((r['type_examen'] ?? '').toString())}'}${_mesResultatLabel((r['resultat_examen'] ?? '').toString().isEmpty ? null : (r['resultat_examen'] ?? '').toString()).isEmpty ? '' : ' · ${_mesResultatLabel((r['resultat_examen'] ?? '').toString())}'}', style: t.bodyMedium),
              ]),
            ),
          ),
        ],
    ], actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

// Espace parent, 8 nov. 2026 : tableau de bord « Mes enfants » —
// présence de chaque enfant lié et validé aux dernières activités,
// et ses moyennes. Le lien se demande par le matricule de la carte
// de l'enfant, puis un responsable le valide. Sans lien validé,
// l'enfant n'apparaît pas ici.
String _enfantDateCourte(String? iso) {
  if (iso == null || iso.isEmpty) return '';
  final parts = iso.split('T').first.split('-');
  if (parts.length != 3) return iso;
  return '${parts[2]}/${parts[1]}/${parts[0]}';
}

String _lienStatutLabel(String statut) {
  switch (statut) {
    case 'valide':
      return tr('Validé');
    case 'rejete':
      return tr('Refusé');
    default:
      return tr('En attente');
  }
}

class MesEnfantsPage extends StatefulWidget {
  const MesEnfantsPage({super.key});
  @override
  State<MesEnfantsPage> createState() => _MesEnfantsPageState();
}

class _MesEnfantsPageState extends State<MesEnfantsPage> {
  List<Map<String, dynamic>> _enfants = [];
  List<Map<String, dynamic>> _liens = [];
  bool _loading = true;
  String? _erreur;
  final _matricule = TextEditingController();
  Map<String, dynamic>? _trouve;
  bool _recherche = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _matricule.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final enfants = await api.fetchMesEnfants();
      final liens = await api.fetchMesLiensParentEnfant();
      if (!mounted) return;
      setState(() {
        _enfants = enfants;
        _liens = liens;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  Future<void> _rechercher() async {
    final m = _matricule.text.trim();
    if (m.length < 3) {
      toast(context, tr('Saisissez le matricule de la carte de votre enfant.'));
      return;
    }
    setState(() {
      _recherche = true;
      _trouve = null;
    });
    try {
      final trouve = await api.chercherMembreParMatricule(m);
      if (!mounted) return;
      setState(() {
        _trouve = trouve;
        _recherche = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _recherche = false);
      toast(context, '$e');
    }
  }

  Future<void> _demanderLien() async {
    final id = (_trouve?['id'] ?? '').toString();
    if (id.isEmpty) return;
    try {
      await api.demanderLienParentEnfant(id);
      if (!mounted) return;
      toast(context, tr('Demande envoyée. Un responsable doit la valider.'));
      setState(() {
        _trouve = null;
        _matricule.clear();
      });
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Future<void> _retirerLien(String id) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Retirer ce lien ?')),
        content: Text(tr('Vous ne verrez plus la présence ni les moyennes de cet enfant.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Retirer'))),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await api.retirerLienParentEnfant(id);
      if (!mounted) return;
      toast(context, tr('Lien retiré.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Widget _statutPresenceChip(String statut) {
    final present = statut == 'present';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: present ? const Color(0xFFE7F6EC) : const Color(0xFFFDECEA),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        present ? tr('Présent') : tr('Absent'),
        style: TextStyle(color: present ? Cp.ok : const Color(0xFFB42318), fontWeight: FontWeight.w700, fontSize: 13),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Présence de vos enfants aux activités et leurs moyennes. Un enfant n’apparaît ici que lorsque le lien est validé par un responsable.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Container(
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Lier un enfant'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 4),
            Text(tr('Saisissez le matricule de sa carte de membre, vérifiez son nom, puis envoyez la demande.'), style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
            TextField(
              controller: _matricule,
              textCapitalization: TextCapitalization.characters,
              decoration: InputDecoration(
                labelText: tr('Matricule de l’enfant'),
                border: const OutlineInputBorder(),
              ),
              onSubmitted: (_) => _rechercher(),
            ),
            const SizedBox(height: Cp.s1),
            FilledButton.icon(
              onPressed: _recherche ? null : _rechercher,
              icon: const Icon(Icons.search_outlined),
              label: Text(tr('Rechercher')),
            ),
            if (_trouve != null) ...[
              const SizedBox(height: Cp.s1),
              Row(children: [
                Expanded(child: Text('${(_trouve!['nom_complet'] ?? '').toString()} · ${(_trouve!['matricule'] ?? '').toString()}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                FilledButton.icon(
                  onPressed: _demanderLien,
                  icon: const Icon(Icons.link_outlined),
                  label: Text(tr('Demander à lier')),
                ),
              ]),
            ],
          ]),
        ),
      ),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: CircularProgressIndicator()));
    } else if (_erreur != null) {
      children.addAll([
        EmptyNote(icon: Icons.people_outlined, text: _erreur!),
        const SizedBox(height: Cp.s1),
        FilledButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
      ]);
    } else {
      if (_liens.isNotEmpty) {
        children.add(Text(tr('Mes liens'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)));
        children.add(const SizedBox(height: Cp.s1));
        for (final l in _liens) {
          final statut = (l['statut'] ?? '').toString();
          children.addAll([
            Card(
              child: ListTile(
                title: Text('${(l['enfant_nom'] ?? '').toString()} · ${(l['enfant_matricule'] ?? '').toString()}', style: t.labelLarge),
                subtitle: Text(_lienStatutLabel(statut), style: t.bodyMedium),
                trailing: IconButton(
                  tooltip: tr('Retirer ce lien'),
                  icon: const Icon(Icons.delete_outline),
                  onPressed: () => _retirerLien((l['id'] ?? '').toString()),
                ),
              ),
            ),
            const SizedBox(height: Cp.s1),
          ]);
        }
      }
      if (_enfants.isEmpty) {
        children.add(EmptyNote(icon: Icons.people_outlined, text: tr('Aucun enfant lié pour le moment. Liez un enfant ci-dessus, puis attendez la validation d’un responsable.')));
      } else {
        for (final e in _enfants) {
          final presences = ((e['presences'] as List?) ?? []).map((p) => p as Map<String, dynamic>).toList();
          final suivis = ((e['suivis'] as List?) ?? []).map((s) => s as Map<String, dynamic>).toList();
          children.addAll([
            Container(
              margin: const EdgeInsets.only(bottom: Cp.s1),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text((e['nom_complet'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                  Text((e['matricule'] ?? '').toString(), style: t.bodyMedium),
                  const SizedBox(height: Cp.s1),
                  Text(tr('Dernières activités'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                  const SizedBox(height: 4),
                  if (presences.isEmpty)
                    Text(tr('Aucune activité récente.'), style: t.bodyMedium)
                  else
                    for (final p in presences)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 4),
                        child: Row(children: [
                          Expanded(child: Text('${_enfantDateCourte((p['date'] ?? '').toString())} · ${(p['nom'] ?? '').toString()}', style: t.bodyMedium)),
                          _statutPresenceChip((p['statut'] ?? '').toString()),
                        ]),
                      ),
                  const SizedBox(height: Cp.s1),
                  Text(tr('Moyennes'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                  const SizedBox(height: 4),
                  if (suivis.isEmpty)
                    Text(tr('Aucune moyenne enregistrée pour le moment.'), style: t.bodyMedium)
                  else
                    for (final r in suivis) ...[
                      Row(children: [
                        Expanded(child: Text('${_mesClasse(r)} · ${(r['annee_scolaire'] ?? '').toString()}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700))),
                        if (_mesAlerte(r))
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(color: const Color(0xFFFFF3E0), borderRadius: BorderRadius.circular(999)),
                            child: Text(tr('À accompagner'), style: const TextStyle(color: Color(0xFF8A6A12), fontWeight: FontWeight.w700, fontSize: 13)),
                          ),
                      ]),
                      Text('${tr('Trimestre 1')} : ${_mesMoyenneTexte(r['moyenne_t1']).isEmpty ? tr('Non noté') : _mesMoyenneTexte(r['moyenne_t1'])} · ${tr('Trimestre 2')} : ${_mesMoyenneTexte(r['moyenne_t2']).isEmpty ? tr('Non noté') : _mesMoyenneTexte(r['moyenne_t2'])} · ${tr('Trimestre 3')} : ${_mesMoyenneTexte(r['moyenne_t3']).isEmpty ? tr('Non noté') : _mesMoyenneTexte(r['moyenne_t3'])}', style: t.bodyMedium),
                      if (_mesMoyenne(r['moyenne_annuelle']) != null) Text('${tr('Moyenne annuelle')} : ${_mesMoyenneTexte(r['moyenne_annuelle'])}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
                      const SizedBox(height: 4),
                    ],
                ]),
              ),
            ),
          ]);
        }
      }
    }
    return basic(tr('Mes enfants'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}
