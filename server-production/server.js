// ═══════════════════════════════════════════════════════════════════
//  CONNEXION PROPHÉTIQUE — API (Node.js 20+ / Fastify 5 / PostgreSQL)
//  « Former pour mieux servir »
//
//  Un seul fichier. Base de données : schema.sql, appliqué au démarrage
//  si la base est encore vide (première mise en ligne), puis jamais
//  retouché. Sans cela, /sante répond mais toutes les autres routes
//  échouent, faute de tables.
//  Variables d'environnement : voir .env.example
//
//  Règles d'architecture appliquées :
//   • Wave Business direct : aucun agrégateur.
//   • Un paiement n'est « confirmé » que par :
//       (a) webhook Wave signé dont l'identifiant de transaction ET le montant
//           correspondent à ceux déclarés par le membre, ou
//       (b) validation explicite de la structure (qui a contrôlé son compte Wave).
//     Jamais sur un simple retour de navigateur, un numéro saisi ou une capture.
//   • Montant calculé côté serveur (jamais pris du client pour un achat).
//   • Facture et fichier du livre : seulement après confirmation.
//   • Secrets (Wave, JWT, base) : variables d'environnement serveur uniquement.
//   • Fichiers téléversés : type réel vérifié depuis les octets.
//   • Sujets de prière : route /prieres authentifiée, envoi par e-mail
//     depuis le serveur, aucun stockage, aucun journal du contenu.
//
//  Webhook Wave (docs.wave.com/webhook) :
//   • en-tête Wave-Signature : t=<timestamp>,v1=<hmac>
//   • hmac = HMAC-SHA256(secret, timestamp + corps brut), comparaison à temps constant
//   • rejet au-delà de 5 minutes (anti-rejeu), idempotence par l'id d'événement
// ═══════════════════════════════════════════════════════════════════

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';
import websocket from '@fastify/websocket';
import pg from 'pg';
import argon2 from 'argon2';
import { z } from 'zod';
import { fileTypeFromFile, fileTypeFromBuffer } from 'file-type';
import PDFDocument from 'pdfkit';
import { timingSafeEqual } from 'node:crypto';
import crypto from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { waveUrl, verifyWaveSignature, hasDuplicatePendingAmount } from './src/wave.js';
import { listeMoyens, prestataireDisponible, idPrestataireValide, libellePrestataire, creerPaiementPrestataire, verifierPaiementPrestataire, referenceWebhook } from './src/prestataires_paiement.js';
import { envoyerSujetPriere, envoyerCodeReinitialisation, envoyerCodeVerification, envoyerAnniversaire, envoyerCertificatParEmail, envoyerAttestationParEmail, envoyerRecuParEmail, envoyerCarteParEmail, envoyerMessageContact, smtpConfigure } from './src/email.js';
import { ipClientCalculee, rafraichirPlagesCloudflare } from './src/ip_cloudflare.js';
import { genererSecret2fa, urlOtpAuth, verifierCodeTotp, chiffrerSecret2fa, dechiffrerSecret2fa } from './src/double_authentification.js';
import { tauxChangePlausible } from './src/taux_paypal.js';
import { validerMessageContact } from './src/contact.js';
import { anniversaireReference, estAnniversaireAujourdhui, formaterDateIntegration } from './src/anniversaires.js';
import { genererAttestationPdf, urlVerificationAttestation, etatAttestation, pageVerificationAttestationHtml } from './src/generer_attestation_pdf.js';
import { genererXlsx, genererPdfExport } from './src/exports.js';
import { DEFAULT_DESIGN_CONFIG, mergeDesignConfig, migPaletteDesign, validateDesignPatch } from './src/design.js';
import { VERSION_CONFIG } from './src/config_version.js';
import { etagPourContenu, etagCorrespond } from './src/etag.js';
import { analyserBureauImport, mapperFonctionBureau, deciderLienBureau } from './src/bureau_import.js';
import { analyserMembresImport } from './src/membres_import.js';
import { fcmServiceAccount, fcmAccessToken, fcmSendOne, normaliserCategoriesPush } from './src/fcm.js';
import { electionStatut, electionEstOuverte, resultatsVisiblesPourMembre, validerCreationElection, formaterElectionMembre } from './src/elections.js';
import { PLATEFORME_MONTANT_ANNUEL, dateFinAbonnement, abonnementStatut, peutPublierPlateforme, validerCreationEnseignementPlateforme, formaterEnseignementPlateformeMembre } from './src/plateforme.js';
import { validerSuppressionPropreCompte, validerAnnulationSuppression, dateEffacementDefinitif, suppressionAnnulable } from './src/suppression_compte.js';
import { purgerComptesEchus, effacerCompteDefinitivement } from './src/effacement_compte.js';
import { validerSignatureAdmin, normaliserMatriculeSignature, decoderSignaturePng, LIMITE_SIGNATURE_OCTETS } from './src/signature_admin.js';
import { nomCompletDeuxMots, nomCompletMajuscules, texteMajuscules, restaurerZeroIvoirien, normaliserPaysResidence } from './src/telephone_nom.js';
import { correctionMembreSchema, correctionMembreAutorisee, correctionMembreDetails } from './src/correction_membre.js';
import { lieuPays } from './src/pays_evenement.js';
import { genererCertificatPdf } from './src/generer_certificat_pdf.js';
import { genererCartePdf } from './src/generer_carte_pdf.js';
import { signatureValide } from './src/certificats.js';
import { SQL_CONVERSATIONS_LISTE, SQL_PARTICIPANTS_CONVERSATION, formaterConversationListe, TAILLE_MAX_MESSAGE_VOCAL_OCTETS, cleMessageVocal, validerMessageVocal, libelleMessageVocal, formaterMessageAudio, estTypeEvenementGroupe, SQL_GROUPE_EVENEMENT, SQL_CREER_GROUPE_EVENEMENT, SQL_AJOUTER_INSCRITS_GROUPE, SQL_FAVORI_BASCULER, ephemereValide, conversationEphemereAutorisee, dateExpirationEphemere, notificationNouveauMessage, SQL_MESSAGES_EPHEMERES_EXPIRES, planifierPurgeMessagesEphemeres, peutModifierMessage, peutSupprimerMessage, masquerMessageSupprime, MOTIFS_AIDE, STATUTS_AIDE, motifAideValide, statutAideValide, titreDemandeAide, libelleStatutAide, peutEnvoyerDansAide, peutRouvrirAide, peutChangerStatutAide, formaterDemandeAide } from './src/messagerie.js';
import { registerCertificatRoutes } from './src/routes_certificats.js';
// Appels audio et vidéo, 16 nov. 2026 : constantes et aides pures,
// registre des sockets de signalisation.
import {
  TYPES_APPEL,
  TYPES_SIGNAL_APPEL,
  statutApresSignal,
  appelExpire,
  appelObsolete,
  estAppelManque,
  configIce,
  normaliserContenuSignal,
} from './src/appels.js';
import { RegistreSocketsAppels } from './src/appels_ws.js';

// Stories de 24 heures, 17 nov. 2026 : aides pures et signature
// SigV4 pour R2, sans accès base, testées sans serveur.
import {
  DUREE_STORY_HEURES,
  DUREE_URL_SIGNEE_SECONDES,
  TAILLE_MAX_PHOTO_OCTETS,
  TAILLE_MAX_VIDEO_OCTETS,
  TAILLE_MAX_AUDIO_OCTETS,
  MIMES_VIDEO,
  configR2,
  cleStory,
  cleR2Valide,
  dateExpirationStory,
  validerPublication,
  validerEnregistrementStory,
  trouverDoublonRecent,
  urlSigneeR2,
  urlMediaStory,
  envoyerObjetR2,
  lireObjetR2,
  supprimerObjetR2,
  formaterStoryPublique,
} from './src/stories.js';

// Témoignages, 17 nov. 2026 : aides pures, sans accès base,
// testées sans serveur, comme les stories. Compositeur unique,
// 21 nov. 2026 : texte seul, photo et audio en plus de la vidéo.
import {
  TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS,
  LONGUEUR_MAX_TEXTE_TEMOIGNAGE,
  statutTemoignageValide,
  cleTemoignage,
  validerTemoignage,
  formaterTemoignagePublic,
} from './src/temoignages.js';

// Mur des membres, carte 174, refonte totale tranche 2,
// carte 176, 24 nov. 2026 : aides pures, sans accès base,
// testées sans serveur, comme les témoignages.
import {
  CATEGORIES_MUR,
  LONGUEUR_MAX_TEXTE_MUR,
  TAILLE_MAX_PHOTO_MUR_OCTETS,
  LIMITE_MUR_PUBLICATIONS,
  cleMurVideo,
  validerPublicationMur,
  formaterPublicationMur,
  formaterProfilMur,
  formaterMembreSuivi,
} from './src/mur.js';

// Chaîne de prière en direct, 21 nov. 2026, tranche 1 : aides
// pures, sans accès base, testées sans serveur, comme les
// stories et les témoignages.
import {
  NB_CRENEAUX,
  normaliserHeure,
  normaliserJour,
  jourPasse,
  validerEngagement,
  chaineComplete,
  compterCouverts,
} from './src/chaine_priere.js';

// Programme du camp et planification des cellules, 21 nov.
// 2026 : aides pures, sans accès base, testées sans serveur,
// comme la chaîne de prière.
import {
  ROLES_CELLULE,
  TYPES_CRENEAU_MODELE,
  libelleJourSemaine,
  normaliserHeure as normaliserHeureCamp,
  lundiDeLaSemaine,
  appliquerModeleChronogramme,
  validerEntreeChronogramme,
  validerCellule,
  validerAssignation,
  validerException,
  prochaineOccurrence,
  appliquerExceptionCellule,
} from './src/camp_planning.js';

// Défis de prière 7 jours, Carnet de Promesses et demandes de
// prière avec suivi, 21 nov. 2026, tranches 1 à 3 de l'audit
// du 17 nov. : aides pures, sans accès base, testées sans
// serveur, comme la chaîne de prière.
import {
  NB_JOURS_DEFI,
  normaliserJourDefi,
  validerDefi,
  validerJourDefi,
  jourCourantDefi,
  dateFinDefi,
  joursValidesUniques,
  compterJoursValides,
  formaterDefiPublic,
} from './src/defis_priere.js';
import {
  validerPromesse,
  formaterPromesse,
} from './src/promesses.js';
import {
  validerDemandePriere,
  validerSuiviDemandePriere,
  formaterDemandePriere,
} from './src/demandes_priere.js';

// Parrainage jusqu'au baptême et culte en direct avec replay
// chapitré, 21 nov. 2026, tranches 4 et 5 de l'audit du 17
// nov. : aides pures, sans accès base, testées sans serveur,
// comme la chaîne de prière et les défis.
import {
  validerParrainage,
  validerBapteme,
  formaterParrainage,
} from './src/parrainages.js';
import {
  validerCulte,
  validerCulteModif,
  validerChapitreCulte,
  normaliserDebutSecondes,
  formaterCulteDirect,
  formaterChapitreCulte,
} from './src/cultes_direct.js';

// Réactions « Amen » sur méditations et enseignements, et
// entraide entre membres, 21 nov. 2026, tranches 6 et 7 de
// l'audit du 17 nov. : aides pures, sans accès base, testées
// sans serveur, comme la chaîne de prière et les défis.
import {
  validerAmen,
  formaterCompteAmen,
} from './src/amens.js';
import {
  validerEntraide,
  validerStatutEntraide,
  formaterEntraide,
} from './src/entraide.js';

// Présence au culte, tranches 2 à 5, 21 nov. 2026 : temps forts
// du camp, J'aime et commentaires, Mon mur, verset en storie
// par POST /stories, sans route nouvelle. Aides pures, sans
// accès base, testées sans serveur, comme les Amens.
import {
  CIBLES_AIME,
  TYPES_REACTION,
  LIMITE_PAR_KIND_MUR,
  LIMITE_MUR,
  validerTempsFort,
  validerAime,
  validerCommentaire,
  normaliserMentions,
  refusReponse,
  formaterTempsFort,
  formaterCompteAime,
  formaterCommentaire,
  formaterElementMur,
  trierElementsMur,
} from './src/presence_culte.js';

// ───────────────────────── Configuration ─────────────────────────
const env = process.env;
const need = (k) => {
  if (!env[k]) throw new Error(`Variable d'environnement manquante : ${k}`);
  return env[k];
};

const CFG = {
  port: Number(env.PORT || 3000),
  databaseUrl: need('DATABASE_URL'),
  databaseSsl: env.DATABASE_SSL === 'true',
  jwtSecret: need('JWT_SECRET'),
  corsOrigins: (env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
  uploadDir: path.resolve(env.UPLOAD_DIR || './uploads'),
  // Lien Wave Business de la structure (fourni par Wave). Le serveur y ajoute ?amount=
  wavePayUrl: env.WAVE_PAYMENT_LINK || '',
  // Secret de signature du webhook (affiché une seule fois par Wave à l'enregistrement).
  waveWebhookSecret: env.WAVE_WEBHOOK_SECRET || '',
  // Restreint le webhook aux IP publiées par Wave (voir docs.wave.com/webhook). Nécessite trustProxy correct.
  waveEnforceIp: env.WAVE_ENFORCE_IP === 'true',
  // Prestataires de paiement, T16, 26 nov. 2026 : chaque
  // prestataire se branche par ses variables seules, jamais
  // de secret en dur. Sans elles, le prestataire est inactif.
  // MTN MoMo Collections : clé d'abonnement, identifiant et
  // clé de l'utilisateur API ; environnement sandbox par
  // défaut, production sur https://proxy.momoapi.mtn.com.
  mtnMomoSubscriptionKey: env.MTN_MOMO_SUBSCRIPTION_KEY || '',
  mtnMomoApiUser: env.MTN_MOMO_API_USER_ID || '',
  mtnMomoApiKey: env.MTN_MOMO_API_KEY || '',
  mtnMomoEnvironnement: env.MTN_MOMO_ENVIRONNEMENT || 'sandbox',
  mtnMomoBase: env.MTN_MOMO_API_BASE || '',
  // Orange Money Web Payment : identifiant, secret et clé
  // marchand, portail developer.orange.com.
  orangeClientId: env.ORANGE_MONEY_CLIENT_ID || '',
  orangeClientSecret: env.ORANGE_MONEY_CLIENT_SECRET || '',
  orangeMerchantKey: env.ORANGE_MONEY_MERCHANT_KEY || '',
  orangeApiBase: env.ORANGE_MONEY_API_BASE || 'https://api.orange.com',
  // CinetPay, carte bancaire : clé API et identifiant du site,
  // portail CinetPay. Le checkout ne montre que la carte.
  cinetpayApiKey: env.CINETPAY_API_KEY || '',
  cinetpaySiteId: env.CINETPAY_SITE_ID || '',
  cinetpayApiBase: env.CINETPAY_API_BASE || 'https://api-checkout.cinetpay.com',
  // PayPal API, 27 oct. 2026 : identifiant et secret passent
  // uniquement par variables d'environnement, jamais dans le code,
  // jamais dans un dépôt public. Sans ces deux variables, les
  // routes PayPal API répondent 503 et l'application retombe sur
  // le lien de don PayPal. Base par défaut production, ou sandbox
  // si PAYPAL_MODE=sandbox, ou base explicite PAYPAL_API_BASE.
  paypalClientId: env.PAYPAL_CLIENT_ID || '',
  paypalClientSecret: env.PAYPAL_CLIENT_SECRET || '',
  // PAIRE_SECRET, 22 nov. 2026 (MO-9) : secret dédié au
  // chiffrement des paires rejouables de la fenêtre de grâce.
  // Repli : dérivation depuis JWT_SECRET, avec avertissement au
  // démarrage, pour ne pas casser les paires en cours.
  paireSecret: env.PAIRE_SECRET || '',
  paypalApiBase:
    env.PAYPAL_API_BASE ||
    (env.PAYPAL_MODE === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'),
  // Adresse publique de l'API, pour le retour PayPal après approbation.
  // Par défaut, l'adresse Render de production ; à surcharger si besoin.
  publicBaseUrl: env.PUBLIC_BASE_URL || 'https://connexion-prophetique.onrender.com',
};
if (CFG.jwtSecret.length < 32) throw new Error('JWT_SECRET doit contenir au moins 32 caractères.');

// Certificats d'adhésion, carte 110, 8 nov. 2026 : secret dédié
// aux signatures HMAC des QR, au moins 32 caractères, saisi par
// Axel dans Render, jamais en chat, distinct de JWT_SECRET pour
// que sa rotation n'invalide pas les QR déjà imprimés. Sans ce
// secret, le serveur démarre quand même et les routes certificats
// répondent indisponible, jamais 500 : jamais de throw ici.
const CERT_SECRET = process.env.CERT_SECRET || '';

// Fonctions de membre, 28 oct. 2026 : la même liste que le
// formulaire d'inscription, choix unique, sans texte libre.
// Le serveur refuse toute autre valeur, pour que la fonction
// affichée sur la carte soit toujours une de ces fonctions.
// Carte 93, 8 nov. 2026 : « Plateforme » en tête, comme dans
// l'application depuis la carte 83, sinon l'inscription et le
// passage en partenaire d'un membre existant étaient refusés
// ici, 400, alors que l'application les proposait.
const FONCTIONS_MEMBRE = ['Plateforme', 'Président', 'Secrétaire', 'Trésorier', 'Chantre', 'Organisateur', 'Responsable', 'Leader', 'PCA', 'Coordinateur', 'Membre', 'Membre Actif', 'Intercesseur', 'Ancien', 'Diacre', 'Nouveau membre', 'Aucun'];

// Fonctions clés d'administrateur, carte 75, 7 nov. 2026 : comme les
// rôles d'une page Facebook, plusieurs fonctions sous le même rôle
// admin_etablissement, avec des droits différents. Le rôle reste la
// porte d'entrée (contenuG), la fonction clé ne fait que restreindre
// l'écriture, jamais la lecture du périmètre, et jamais élargir.
// Un administrateur d'établissement sans fonction clé (fonction_admin
// NULL) garde tout ce que contenuG lui donnait déjà, comme avant,
// pour ne rien casser aux comptes existants. Seul l'administrateur
// général nomme, change ou retire une fonction clé, par la route
// POST /admin/membres/:id/role. Les droits ci-dessous reprennent
// exactement le partage déjà présent dans ce fichier entre adminG
// (général seul) et contenuG (général + établissement) : rien
// n'est inventé au-delà. Enseignements, livres, camps, bureau,
// comptabilité validée, refus de paiement, audit et nomination
// restent réservés à l'administrateur général, pour toutes les
// fonctions clés, sans exception.
const FONCTIONS_ADMIN = [
  { code: 'moderateur', libelle: 'Modérateur', ordre: 1, description: 'Accueil et vie des membres de son établissement.', droits: ['Marquer une présence, au scan ou à la main', 'Annuler une présence', 'Proposer une place en liste d’attente de camp', 'Noter un contact avec un nouveau membre', 'Importer des membres de son établissement', 'Lire les membres, présences, inscriptions et attestations de son établissement'], permissions: ['camp.lire', 'camp.inscriptions'] },
  { code: 'editeur', libelle: 'Éditeur', ordre: 2, description: 'Publier pour son établissement.', droits: ['Publier une actualité pour son établissement', 'Publier un document', 'Créer ou modifier un rapport d’activité', 'Créer une activité de son établissement', 'Téléverser une image', 'Lire les membres, présences, inscriptions et attestations de son établissement'], permissions: ['camp.lire', 'rapports.lire'] },
  { code: 'responsable', libelle: 'Responsable', ordre: 3, description: 'Coordonner son établissement, sans toucher à l’argent.', droits: ['Tout ce que font Modérateur et Éditeur', 'Créer ou modifier un planning de responsable', 'Créer ou modifier du matériel', 'Créer ou modifier un suivi scolaire', 'Délivrer une attestation', 'Lire la comptabilité de son établissement'], permissions: ['camp.lire', 'camp.inscriptions', 'suivi.lire', 'suivi.ecrire', 'finances.lire', 'rapports.lire'] },
  { code: 'tresorier', libelle: 'Trésorier', ordre: 4, description: 'Argent de son établissement seulement.', droits: ['Valider un paiement en attente, après contrôle du compte', 'Enregistrer une cotisation, 1 000 FCFA, mois en cours', 'Lire la comptabilité, les paiements et le suivi des versements de son établissement'], permissions: ['finances.lire', 'finances.valider'] },
  { code: 'directeur_camp', libelle: 'Directeur de camp', ordre: 5, description: 'Dirige une activité, camp, retraite ou formation, du début à la fin.', droits: ['Lire son activité et ses inscriptions', 'Gérer les inscriptions de son activité', 'Lire les rapports de son activité'], permissions: ['camp.lire', 'camp.inscriptions', 'rapports.lire'] },
  { code: 'tresorier_activite', libelle: 'Trésorier d’activité', ordre: 6, description: 'Argent de son activité seulement.', droits: ['Lire les finances de son activité', 'Valider un paiement de son activité, après contrôle'], permissions: ['finances.lire', 'finances.valider'] },
  { code: 'responsable_suivi', libelle: 'Responsable du suivi éducatif', ordre: 7, description: 'Suit les membres inscrits à son activité.', droits: ['Lire le suivi éducatif des inscrits de son activité', 'Écrire le suivi éducatif des inscrits de son activité'], permissions: ['suivi.lire', 'suivi.ecrire'] },
  { code: 'direction', libelle: 'Direction générale', ordre: 8, description: 'Dirige la grande structure, au-dessus des établissements.', droits: ['Toutes les permissions, sur toute la structure'], permissions: ['camp.lire', 'camp.inscriptions', 'finances.lire', 'finances.valider', 'suivi.lire', 'suivi.ecrire', 'rapports.lire', 'membres.inscrire'] },
  { code: 'secretariat', libelle: 'Secrétariat général', ordre: 9, description: 'Secrétariat de la grande structure.', droits: ['Enregistrer des membres', 'Lire les activités et leurs inscriptions', 'Lire le suivi éducatif', 'Lire les rapports'], permissions: ['camp.lire', 'camp.inscriptions', 'suivi.lire', 'rapports.lire', 'membres.inscrire'] },
  { code: 'tresorerie', libelle: 'Trésorerie générale', ordre: 10, description: 'Argent de la grande structure.', droits: ['Lire les finances de la structure', 'Valider un paiement, après contrôle', 'Lire les rapports'], permissions: ['finances.lire', 'finances.valider', 'rapports.lire'] },
  { code: 'coordination', libelle: 'Coordination générale', ordre: 11, description: 'Coordonne les activités de la grande structure.', droits: ['Lire les activités et leurs inscriptions', 'Lire et écrire le suivi éducatif', 'Lire les rapports'], permissions: ['camp.lire', 'camp.inscriptions', 'suivi.lire', 'suivi.ecrire', 'rapports.lire'] },
  { code: 'administration', libelle: 'Administration', ordre: 12, description: 'Administration de la grande structure.', droits: ['Lire les activités', 'Lire les rapports'], permissions: ['camp.lire', 'rapports.lire'] },
  { code: 'communication', libelle: 'Communication', ordre: 13, description: 'Communication de la grande structure.', droits: ['Lire les activités', 'Lire les rapports'], permissions: ['camp.lire', 'rapports.lire'] },
  { code: 'dirigeant_cellule', libelle: 'Dirigeant de cellule', ordre: 14, description: 'Dirige une cellule, dans son établissement.', droits: ['Lire son activité et ses inscriptions', 'Lire le suivi éducatif'], permissions: ['camp.lire', 'camp.inscriptions', 'suivi.lire'] },
  { code: 'fonction_personnalisee', libelle: 'Fonction personnalisée', ordre: 15, description: 'Fonction définie par l’administrateur, sans permission par défaut.', droits: ['Aucune permission par défaut, à définir'], permissions: [] },
];
const CODES_FONCTION_ADMIN = FONCTIONS_ADMIN.map((f) => f.code);

const WAVE_IPS = [
  '104.155.43.220', '34.140.23.175', '34.22.138.147', '34.76.157.22', '34.78.253.137',
  '34.79.119.200', '35.189.207.30', '35.195.255.192', '35.205.122.113', '35.205.190.121',
  '35.233.61.130', '35.240.61.196', '35.240.75.65', '35.241.190.127', '35.241.219.1',
];

// ───────────────────────── Base de données ─────────────────────────
// B-21, 22 nov. 2026 : TLS PostgreSQL. Sur Render, l'hôte
// interne de la base est un nom court sans point (dpg-...-a),
// joignable seulement depuis le réseau privé Render, avec un
// certificat auto-signé : la vérification y est désactivée, comme
// avant. Sur un hôte public (adresse DNS complète, par exemple
// dpg-....oregon-postgres.render.com), la vérification du
// certificat est activée. En cas de doute (hôte illisible), on
// vérifie : le choix sûr par défaut.
function hoteBaseInterneRender() {
  try {
    const hote = new URL(CFG.databaseUrl).hostname.toLowerCase();
    if (hote === 'localhost' || hote === '127.0.0.1' || hote === '::1') return true;
    if (/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/.test(hote)) return true;
    if (!hote.includes('.')) return true; // nom court Render interne
    if (hote.endsWith('.local') || hote.endsWith('.internal')) return true;
    return false;
  } catch (_) {
    return false;
  }
}
const pool = new pg.Pool({
  connectionString: CFG.databaseUrl,
  ssl: CFG.databaseSsl ? { rejectUnauthorized: !hoteBaseInterneRender() } : undefined,
  max: 10,
});
const q = (text, params) => pool.query(text, params);

async function tx(fn) {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const r = await fn(c);
    await c.query('COMMIT');
    return r;
  } catch (e) {
    await c.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    c.release();
  }
}

// ───────────────────────── Outils ─────────────────────────
const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

// Paire rejouable, 21 nov. 2026 : la paire émise par une rotation
// est chiffrée (AES-256-GCM) et gardée 60 secondes sur la ligne du
// jeton révoqué, pour qu'une réponse perdue pendant un
// redéploiement ne tue pas la session. Un déchiffrement en échec
// (rotation du secret) vaut 401, jamais 500.
// MO-9, 22 nov. 2026 : la clé vient de PAIRE_SECRET quand la
// variable est renseignée ; sinon, repli sur la dérivation depuis
// JWT_SECRET, avec avertissement au démarrage (voir plus bas,
// après la création de l'application). Sa rotation invalide les
// paires stockées, traitées en 401.
const _clePaire = crypto.createHash('sha256').update(CFG.paireSecret || CFG.jwtSecret).digest();
// MO-25 (c), 22 nov. 2026 : clé de chiffrement des secrets 2FA,
// dérivée de JWT_SECRET et du séparateur '2fa', distincte de la
// clé des paires rejouables.
const _cle2fa = crypto.createHash('sha256').update(CFG.jwtSecret).update('2fa').digest();
function chiffrerPaire(paire) {
  const iv = crypto.randomBytes(12);
  const chiffreur = crypto.createCipheriv('aes-256-gcm', _clePaire, iv);
  const chiffre = Buffer.concat([chiffreur.update(JSON.stringify(paire), 'utf8'), chiffreur.final()]);
  return Buffer.concat([iv, chiffreur.getAuthTag(), chiffre]).toString('base64');
}
function dechiffrerPaire(texte) {
  const buf = Buffer.from(texte, 'base64');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const chiffre = buf.subarray(28);
  const dechiffreur = crypto.createDecipheriv('aes-256-gcm', _clePaire, iv);
  dechiffreur.setAuthTag(tag);
  return JSON.parse(Buffer.concat([dechiffreur.update(chiffre), dechiffreur.final()]).toString('utf8'));
}
const httpError = (status, message) => Object.assign(new Error(message), { statusCode: status });
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined));

// Les clés viennent toujours de schémas zod fixes (jamais du client) : pas d'injection possible.
const insertSql = (table, obj) => {
  const k = Object.keys(obj);
  return [`INSERT INTO ${table} (${k.join(', ')}) VALUES (${k.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`, k.map((x) => obj[x])];
};
const updateSql = (table, id, obj) => {
  const k = Object.keys(obj);
  return [`UPDATE ${table} SET ${k.map((x, i) => `${x} = $${i + 1}`).join(', ')} WHERE id = $${k.length + 1} RETURNING *`, [...k.map((x) => obj[x]), id]];
};

const audit = (c, req, action, entite, entiteId, details) =>
  c.query(
    'INSERT INTO journal_audit (utilisateur_id, action, entite, entite_id, details, adresse_ip) VALUES ($1,$2,$3,$4,$5,$6)',
    [req?.user?.sub ?? null, action, entite, entiteId ?? null, details ? JSON.stringify(details) : null, req?.ip ?? null],
  );

const newRef = (prefix) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

// B-23, 22 nov. 2026 : le nom de fichier servi en
// Content-Disposition est nettoyé des guillemets, retours chariot
// et caractères de contrôle, pour qu'un nom d'origine ne puisse
// pas injecter un en-tête. Un nom vidé par le nettoyage devient
// 'fichier'.
const nomFichierSur = (nom) =>
  String(nom ?? '').replace(/["\r\n\x00-\x1f\x7f]/g, '').trim() || 'fichier';

// Envoi de fichier avec prise en charge de Range (lecture audio en continu).
async function sendFile(req, reply, key, mime, { inline = true, filename } = {}) {
  const file = path.resolve(CFG.uploadDir, key);
  if (!file.startsWith(CFG.uploadDir + path.sep)) throw httpError(400, 'Chemin invalide.');
  let st;
  try {
    st = await fsp.stat(file);
  } catch {
    throw httpError(404, 'Fichier introuvable.');
  }
  reply.header('Content-Type', mime).header('Accept-Ranges', 'bytes');
  if (filename) {
    reply.header('Content-Disposition', `${inline ? 'inline' : 'attachment'}; filename="${nomFichierSur(filename)}"`);
  }
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : st.size - Number(range[2]);
    let end = range[1] && range[2] ? Number(range[2]) : st.size - 1;
    start = Math.max(0, start);
    end = Math.min(end, st.size - 1);
    if (start > end) return reply.code(416).header('Content-Range', `bytes */${st.size}`).send();
    return reply
      .code(206)
      .header('Content-Range', `bytes ${start}-${end}/${st.size}`)
      .header('Content-Length', end - start + 1)
      .send(fs.createReadStream(file, { start, end }));
  }
  return reply.header('Content-Length', st.size).send(fs.createReadStream(file));
}

// Envoi d'un fichier gardé dans la base, avec Range comme pour le disque.
async function sendBuffer(req, reply, buf, mime, { inline = true, filename } = {}) {
  reply.header('Content-Type', mime).header('Accept-Ranges', 'bytes');
  if (filename) {
    reply.header('Content-Disposition', `${inline ? 'inline' : 'attachment'}; filename="${nomFichierSur(filename)}"`);
  }
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : buf.length - Number(range[2]);
    let end = range[1] && range[2] ? Number(range[2]) : buf.length - 1;
    start = Math.max(0, start);
    end = Math.min(end, buf.length - 1);
    if (start > end) return reply.code(416).header('Content-Range', `bytes */${buf.length}`).send();
    return reply
      .code(206)
      .header('Content-Range', `bytes ${start}-${end}/${buf.length}`)
      .header('Content-Length', end - start + 1)
      .send(buf.subarray(start, end + 1));
  }
  return reply.header('Content-Length', buf.length).send(buf);
}

// ───────────────────────── Commande : créer un administrateur ─────────────────────────
//   node server.js create-admin email@exemple.com
//   Mot de passe : variable d'environnement CREATE_ADMIN_PASSWORD,
//   ou invite interactive. B-13, 22 nov. 2026 : plus jamais en
//   argument de ligne de commande, visible dans l'historique shell
//   et la liste des processus. La saisie interactive n'affiche rien.
async function demanderMotDePasseInvite() {
  process.stdout.write('Mot de passe (10 caractères minimum) : ');
  const stdin = process.stdin;
  stdin.setRawMode(true);
  return new Promise((resolve) => {
    let mot = '';
    const onData = (b) => {
      const s = b.toString('utf8');
      if (s === '\r' || s === '\n') {
        stdin.setRawMode(false);
        stdin.removeListener('data', onData);
        process.stdout.write('\n');
        resolve(mot);
      } else if (s === '\u0003') {
        process.exit(1);
      } else if (s === '\u007f') {
        mot = mot.slice(0, -1);
      } else {
        mot += s;
      }
    };
    stdin.on('data', onData);
  });
}
if (process.argv[2] === 'create-admin') {
  const [email] = process.argv.slice(3);
  let password = process.env.CREATE_ADMIN_PASSWORD || '';
  if (!password) {
    if (!process.stdin.isTTY) {
      console.error('Mot de passe manquant : définis CREATE_ADMIN_PASSWORD ou lance la commande dans un terminal.');
      process.exit(1);
    }
    password = await demanderMotDePasseInvite();
  }
  if (!email || password.length < 10) {
    console.error('Usage : node server.js create-admin <email> (mot de passe de 10 caractères minimum, par CREATE_ADMIN_PASSWORD ou invite interactive)');
    process.exit(1);
  }
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  const r = await q(
    "INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,'admin_general') RETURNING id",
    [email.trim().toLowerCase(), hash],
  );
  console.log(`Administrateur général créé : ${r.rows[0].id}`);
  await pool.end();
  process.exit(0);
}

// ───────────────────────── Serveur ─────────────────────────
// trustProxy: 1, 1er nov. 2026, CORRIGÉ le 21 nov. 2026 : dans
// Fastify 5, un nombre ne fait rien, la fonction de confiance
// refuse tout, donc req.ip reste l'adresse du pair immédiat
// (le répartiteur Render), la même pour tout le monde. La
// limite globale de 120/min était donc partagée par tous les
// utilisateurs, et la tempête du 21 nov. la saturait. L'adresse
// réelle vient de CF-Connecting-IP, posée par Cloudflare
// (devant Render). C-1, 22 nov. 2026 : on ne fait confiance à
// cet en-tête que si le pair est une IP Cloudflare publiée, voir
// ipClient ci-dessous et src/ip_cloudflare.js ; sinon, repli sur
// req.ip. `true` reste exclu, un client forgerait
// X-Forwarded-For pour contourner les limites.
// H-4, 22 nov. 2026 : le journal ne consigne jamais req.url en
// clair, l'URL du WebSocket y porterait ?jeton= ; l'en-tête
// Authorization est masqué aussi.
const app = Fastify({ logger: { redact: ['req.url', 'req.headers.authorization'] }, trustProxy: 1, bodyLimit: 1_048_576 });

// On garde le corps brut : indispensable à la signature du webhook Wave.
app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
  req.rawBody = body;
  if (!body) return done(null, {});
  try {
    done(null, JSON.parse(body));
  } catch {
    done(httpError(400, 'JSON invalide.'));
  }
});

await app.register(helmet);
// Adresse réelle du client, 21 nov. 2026, corrigée le 22 nov.
// 2026 (C-1) : CF-Connecting-IP, posée par Cloudflare avec
// l'adresse vue sur la connexion, n'est crue que si la connexion
// TCP vient d'une IP Cloudflare publiée (le pair), sinon elle est
// ignorée : l'origine Render est joignable directement, un
// client pouvait la forger. Sans l'en-tête, ou sans pair
// Cloudflare (tests locaux, appel direct), repli sur req.ip.
function ipClient(req) {
  return ipClientCalculee({
    pair: req.socket?.remoteAddress,
    enTeteCf: req.headers['cf-connecting-ip'],
    ipRepli: req.ip,
  });
}
// Plages Cloudflare rafraîchies au démarrage et toutes les 6
// heures ; en cas d'échec, la copie de secours reste en vigueur.
rafraichirPlagesCloudflare().then((ok) => {
  if (!ok) app.log.warn('Plages Cloudflare non rafraîchies : copie de secours en vigueur.');
}).catch(() => {});
setInterval(() => { rafraichirPlagesCloudflare().catch(() => {}); }, 6 * 60 * 60 * 1000).unref();
if (!CFG.paireSecret) {
  app.log.warn('PAIRE_SECRET absent : la clé des paires rejouables est dérivée de JWT_SECRET, renseigne PAIRE_SECRET pour une rotation indépendante.');
}
// CORS, correctif 27 oct. 2026 : sans origine autorisée, le navigateur
// bloque les appels de la version web vers l'API, même quand le serveur
// répond 200. Le bouton Réessayer de l'accueil semblait donc ne rien
// faire, alors que la synchronisation échouait avant même d'atteindre
// le serveur. Par défaut, les origines connues de la structure sont
// autorisées ; CORS_ORIGINS dans Render, si renseignée, les remplace.
// L'application téléphone, native, n'est pas concernée par CORS.
const corsOrigins = CFG.corsOrigins.length > 0 ? CFG.corsOrigins : [
  'https://connexion-prophetique-site.onrender.com',
  'https://www.connexionprophetique.com',
  'https://connexionprophetique.com',
];
await app.register(cors, { origin: corsOrigins });
// B-4, 22 nov. 2026 : message de limite en français, délai en
// secondes tiré du contexte (ttl), jamais du texte anglais.
await app.register(rateLimit, {
  max: 120,
  timeWindow: '1 minute',
  keyGenerator: (req) => ipClient(req),
  errorResponseBuilder: (req, context) => ({
    statusCode: 429,
    error: 'Trop de requêtes.',
    message: `Trop de requêtes. Réessaie dans ${Math.max(1, Math.ceil((context.ttl ?? 60000) / 1000))} secondes.`,
  }),
});
await app.register(multipart, { limits: { fileSize: 100 * 1024 * 1024, files: 1 } });
// H-1, 22 nov. 2026 : algorithme HS256 explicite, à la signature
// comme à la vérification, au lieu du défaut du plugin.
await app.register(jwt, { secret: CFG.jwtSecret, sign: { algorithm: 'HS256' }, verify: { algorithms: ['HS256'] } });
// Appels audio et vidéo, 16 nov. 2026 : WebSocket de signalisation
// sur le même service Render, route /messagerie/ws. Le média
// WebRTC reste direct entre les téléphones, le serveur ne relaye
// que des petits messages JSON.
await app.register(websocket);

app.setErrorHandler((err, req, reply) => {
  if (err instanceof z.ZodError) {
    // B-2, 22 nov. 2026 : plus de détail des champs, les noms de
    // champs et les règles de validation ne sont pas renvoyés.
    return reply.code(400).send({ erreur: 'Données invalides.' });
  }
  // MO-14, 22 nov. 2026 : 409 générique, sans préciser e-mail ou
  // téléphone, pour ne pas révéler l'existence d'un compte.
  if (err.code === '23505') return reply.code(409).send({ erreur: 'Impossible de créer ce compte avec ces informations.' });
  // B-1, 22 nov. 2026 : message générique pour P0001, les
  // messages des déclencheurs de schema.sql ne parviennent plus
  // au client.
  if (err.code === 'P0001') return reply.code(422).send({ erreur: 'Données refusées par la base.' });
  if (err.code === '23514' || err.code === '23503') return reply.code(422).send({ erreur: 'Données refusées par la base.' });
  const status = err.statusCode && err.statusCode < 500 ? err.statusCode : 500;
  if (status === 500) req.log.error(err);
  return reply.code(status).send({ erreur: status === 500 ? 'Erreur interne.' : err.message });
});

// B-3, 22 nov. 2026 : 404 générique, sans nommer la route
// demandée, pour ne pas distinguer une route existante d'une
// route inexistante.
app.setNotFoundHandler((req, reply) => reply.code(404).send({ erreur: 'Introuvable.' }));

// Protection de route : jeton valide + rôle autorisé.
// H-1, 22 nov. 2026 : sur les routes admin seulement (gardes
// dont la liste n'inclut pas 'membre'), le rôle est relu en base
// à chaque appel, avec l'établissement administré et la fonction
// clé. Un écart entre le jeton et la base, rétrogradation,
// révocation de nomination ou changement de mot de passe, donne
// 401 au lieu de laisser l'ancien jeton vivre 15 minutes. Les
// routes membre gardent le rôle du jeton, sans requête en base.
const guard = (...allowed) => async (req, reply) => {
  try {
    await req.jwtVerify();
  } catch {
    return reply.code(401).send({ erreur: 'Authentification requise.' });
  }
  if (allowed.length && !allowed.includes(req.user.role)) {
    return reply.code(403).send({ erreur: 'Accès refusé.' });
  }
  if (!allowed.includes('membre')) {
    const ligne = (
      await q('SELECT role, etablissement_admin_id, fonction_admin FROM utilisateurs WHERE id = $1', [req.user.sub])
    ).rows[0];
    if (!ligne || ligne.role !== req.user.role) {
      return reply.code(401).send({ erreur: 'Authentification requise.' });
    }
    req.user.role = ligne.role;
    req.user.eid = ligne.etablissement_admin_id ?? null;
    req.user.fad = ligne.fonction_admin ?? null;
  }
};
const adminG = guard('admin_general');
// Courriel d'anniversaire automatique, clé validée le 4 nov. 2026.
// Sur la seule route POST /admin/anniversaires/envoyer, en plus du
// jeton adminG, un en-tête x-anniversaire-key égal à la variable
// d'environnement ANNIVERSAIRES_AUTO_KEY autorise l'appel, pour le
// workflow quotidien GitHub Actions. Variable vide = refusé, jamais
// de valeur par défaut, jamais de clé en clair dans le code. Si
// l'en-tête est présent, seul ce chemin est essayé : une clé fausse
// donne 401, sans repli vers le jeton. Sans en-tête, adminG
// s'applique tel quel, donc la route manuelle de l'administrateur
// général est inchangée. Comparaison à temps constant, sans
// révéler si la longueur est la bonne.
const anniversaireAutoG = async (req, reply) => {
  const fournie = req.headers['x-anniversaire-key'];
  if (fournie === undefined) return adminG(req, reply);
  const attendue = process.env.ANNIVERSAIRES_AUTO_KEY;
  if (!attendue || typeof fournie !== 'string') {
    return reply.code(401).send({ erreur: 'Authentification requise.' });
  }
  const a = Buffer.from(fournie);
  const b = Buffer.from(attendue);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return reply.code(401).send({ erreur: 'Authentification requise.' });
  }
};
// Un administrateur général, ou d'établissement, qui possède aussi un
// profil membre, doit pouvoir récupérer son profil et utiliser
// l'application comme membre, sinon sa connexion échoue après
// /auth/connexion avec « Accès refusé » sur /moi. Correctif 27 oct. 2026.
const membreG = guard('membre', 'admin_general', 'admin_etablissement');
// Admin d'établissement : uniquement son établissement. Admin général : tous.
// Déclaré ici, avant les routes qui l'utilisent : une déclaration plus bas
// plantait le démarrage (accès avant initialisation) et bloquait tous les
// déploiements Render depuis les fiches santé.
const contenuG = guard('admin_general', 'admin_etablissement');
// Fonction clé, carte 75 : un administrateur général passe toujours,
// un administrateur d'établissement sans fonction clé passe toujours
// (plein, comportement d'avant), un administrateur avec une fonction
// clé ne passe que pour les actions listées dans FONCTIONS_ADMIN.
// Un jeton émis avant la nomination n'a pas de fad : il est traité
// comme plein jusqu'au prochain jeton, au plus 15 minutes, comme
// pour un changement de rôle. La lecture n'est jamais restreinte ici.
const fonctionAdminAutorisee = (req, ...codes) => {
  if (req.user.role === 'admin_general') return true;
  if (req.user.role !== 'admin_etablissement') return false;
  const f = req.user.fad ?? null;
  if (f == null || f === '') return true;
  return codes.includes(f);
};
const exigerFonctionAdmin = (req, ...codes) => {
  if (!fonctionAdminAutorisee(req, ...codes)) throw httpError(403, 'Cette fonction clé ne permet pas cette action.');
};

// Nominations, carte 126 tranche 3 : garde par activité. Un
// administrateur général passe toujours. Un administrateur sans
// aucune nomination active garde le comportement d'avant (plein),
// comme pour la fonction clé. Dès qu'il a une nomination active,
// l'accès est limité à ce que ses nominations accordent : la
// permission demandée, pour la grande structure ou pour l'activité
// demandée. Une nomination est active quand elle n'est pas
// révoquée, que son début est atteint et que sa fin n'est pas
// dépassée : une nomination anticipée, début dans le futur, ne
// donne encore rien. Plusieurs nominations se cumulent, et
// plusieurs personnes peuvent porter la même fonction pour une
// activité. La règle ne vit qu'ici, lue une fois par appel.
// exigerNomination est la garde, activitesPourPermission est la
// portée pour les listes, null veut dire tout, tableau vide rien.
// Carte 126 tranche 4 : la nomination devient obligatoire pour
// les camps, décision d'Axel le 10 nov. 2026. Sur une route de
// camp, obligatoire vrai, un administrateur sans aucune nomination
// active est refusé, 403, au lieu du comportement d'avant. Les
// autres périmètres gardent la compatibilité : import de membres,
// routes de structure et listes.
const nominationsActives = async (req) => {
  if (!req.user.mid) return [];
  return (await q(
    `SELECT n.portee, n.evenement_id, n.etablissement_id, f.permissions
     FROM nominations n JOIN fonctions_admin f ON f.code = n.fonction_code
     WHERE n.membre_id = $1 AND NOT n.revoque
       AND n.debute_le <= now() AND (n.finit_le IS NULL OR n.finit_le > now())`,
    [req.user.mid],
  )).rows;
};
// Nominations et bureaux, 21 nov. 2026 : la portée établissement.
// Une nomination d'établissement accorde la permission pour les
// membres et les objets de cet établissement, comme la fonction
// clé pour admin_etablissement. L'établissement du contexte vient
// de l'activité demandée ou du membre visé, jamais deviné.
const nominationAccorde = (actives, permission, { evenementIds = null, etablissementId = null } = {}) => actives.some((n) => {
  const permissions = Array.isArray(n.permissions) ? n.permissions : [];
  if (!permissions.includes(permission)) return false;
  if (n.portee === 'structure') return true;
  if (n.portee === 'activite') {
    if (evenementIds == null) return false;
    return evenementIds.includes(n.evenement_id);
  }
  if (n.portee === 'etablissement') {
    if (etablissementId == null) return false;
    return etablissementId === n.etablissement_id;
  }
  return false;
});
const exigerNomination = async (req, permission, { evenementId, membreId, obligatoire } = {}) => {
  if (req.user.role === 'admin_general') return;
  const actives = await nominationsActives(req);
  if (!actives.length) {
    if (obligatoire) throw httpError(403, 'Une nomination est requise pour cette action.');
    return;
  }
  let evenementIds = null;
  let etablissementId = null;
  if (evenementId != null) {
    evenementIds = Array.isArray(evenementId) ? evenementId : [evenementId];
    const ev = (await q('SELECT etablissement_id FROM evenements WHERE id = $1', [evenementIds[0]])).rows[0];
    etablissementId = ev?.etablissement_id ?? null;
  } else if (membreId != null) {
    evenementIds = (await q('SELECT evenement_id FROM inscriptions WHERE membre_id = $1', [membreId])).rows.map((r) => r.evenement_id);
    const m = (await q('SELECT etablissement_id FROM membres WHERE id = $1', [membreId])).rows[0];
    etablissementId = m?.etablissement_id ?? null;
  }
  if (!nominationAccorde(actives, permission, { evenementIds, etablissementId })) throw httpError(403, 'Cette nomination ne permet pas cette action.');
};
const activitesPourPermission = async (req, permission) => {
  if (req.user.role === 'admin_general') return null;
  const actives = await nominationsActives(req);
  if (!actives.length) return null;
  const ids = [];
  const etablissements = [];
  for (const n of actives) {
    const permissions = Array.isArray(n.permissions) ? n.permissions : [];
    if (!permissions.includes(permission)) continue;
    if (n.portee === 'structure') return null;
    if (n.evenement_id && !ids.includes(n.evenement_id)) ids.push(n.evenement_id);
    if (n.etablissement_id && !etablissements.includes(n.etablissement_id)) etablissements.push(n.etablissement_id);
  }
  // Nominations et bureaux, 21 nov. 2026 : une nomination
  // d'établissement porte sur les activités de cet établissement.
  // Les listes passent par les activités, comme pour la portée
  // activité : un objet sans activité liée, suivi ou paiement,
  // reste hors de la liste restreinte, comme aujourd'hui pour
  // une nomination d'activité ; les routes de détail, elles,
  // accordent l'accès par l'établissement directement.
  if (etablissements.length) {
    const lignes = (await q('SELECT id FROM evenements WHERE etablissement_id = ANY($1::uuid[])', [etablissements])).rows;
    for (const l of lignes) if (!ids.includes(l.id)) ids.push(l.id);
  }
  return ids;
};

// Certificats d'adhésion, carte 110, 8 nov. 2026 : envoi du PDF
// archivé au membre, après le commit de la validation. Appelée
// après le commit pour qu'un échec SMTP ne bloque jamais la
// validation : le membre peut toujours télécharger son PDF depuis
// son profil. Aucun nom ni adresse n'est journalisé, même en cas
// d'échec, comme pour les sujets de prière. Carte 121, 10 nov.
// 2026 : renvoie vrai si le courriel est parti, faux sinon, pour
// que la route de renvoi par le membre dise la vérité.
async function envoyerCertificat(cert) {
  const row = (await q(
    `SELECT c.id, c.numero, c.nom_complet, c.pdf, u.email
       FROM certificats c
       JOIN membres m ON m.id = c.membre_id
       JOIN utilisateurs u ON u.id = m.utilisateur_id
      WHERE c.id = $1`, [cert.id])).rows[0];
  if (!row?.email) {
    app.log.warn({ numero: row?.numero }, 'Certificat non envoyé : aucune adresse e-mail.');
    return false;
  }
  try {
    await envoyerCertificatParEmail({
      destinataire: row.email, nom: row.nom_complet, numero: row.numero, pdf: row.pdf,
    });
    await q('UPDATE certificats SET envoye_le = now() WHERE id = $1', [row.id]);
    return true;
  } catch (e) {
    // Pas d'adresse ni de contenu dans le journal : le membre peut toujours télécharger son PDF.
    app.log.error({ code: e.code, numero: row.numero }, 'Envoi du certificat impossible.');
    return false;
  }
}

// Certificats d'adhésion, carte 110 : sans CERT_SECRET, les routes
// répondent indisponible, 503, jamais 500, et le serveur démarre
// quand même. Le secret se saisit dans Render, jamais en chat.
if (!CERT_SECRET || CERT_SECRET.length < 32) {
  app.log.warn('CERT_SECRET absent ou trop court : les routes certificats répondent indisponible.');
}
registerCertificatRoutes(app, {
  z, q, tx, guard, audit, httpError, membreG,
  genererPdf: genererCertificatPdf,
  envoyerCertificat,
  publicBaseUrl: CFG.publicBaseUrl,
  certSecret: CERT_SECRET,
});

// ───────────────────────── Authentification ─────────────────────────
const DUMMY_HASH = await argon2.hash('mot-de-passe-factice', { type: argon2.argon2id });

async function issueTokens(c, u, familleCreeLe = null) {
  const m = (await c.query('SELECT id FROM membres WHERE utilisateur_id = $1', [u.id])).rows[0];
  const access = app.jwt.sign(
    { sub: u.id, role: u.role, mid: m?.id ?? null, eid: u.etablissement_admin_id ?? null, fad: u.fonction_admin ?? null },
    { expiresIn: '15m' },
  );
  const refresh = crypto.randomBytes(32).toString('hex');
  // MO-1, 22 nov. 2026 : famille_cree_le porte la création de la
  // famille de jetons, transmise à chaque rotation, pour la borne
  // absolue de 90 jours ; une rotation seule ne la rafraîchit pas.
  await c.query(
    "INSERT INTO jetons_rafraichissement (utilisateur_id, empreinte, expire_le, famille_cree_le) VALUES ($1,$2, now() + interval '30 days', $3)",
    [u.id, sha256(refresh), familleCreeLe ?? new Date()],
  );
  return { access, refresh };
}

const authLimit = { config: { rateLimit: { max: 10, timeWindow: '1 minute', keyGenerator: (req) => ipClient(req) } } };

// Renouvellement de session, 21 nov. 2026 : la limite de
// /auth/rafraichir est par empreinte du jeton présenté, pas par
// adresse IP. Derrière un opérateur mobile, des centaines
// d'utilisateurs partagent une même adresse IP : avec une clé par
// IP, dix renouvellements d'un seul appareil bloquaient tout le
// monde pendant une minute. L'empreinte est celle déjà stockée en
// base (sha256 du jeton), jamais le jeton en clair. Sans jeton
// dans le corps, repli sur l'adresse réelle du client
// (ipClient), pour que les requêtes mal formées restent
// limitées. Le crochet est preHandler, pour que le corps JSON
// soit déjà lu quand la clé est calculée.
// La limite globale de 120 par minute, par adresse réelle du
// client (ipClient), reste telle quelle. La rotation à usage
// unique ne change pas.
const limiteRafraichir = {
  config: {
    rateLimit: {
      max: 10,
      timeWindow: '1 minute',
      hook: 'preHandler',
      keyGenerator: (req) => {
        const refresh = req.body?.refresh;
        if (typeof refresh === 'string' && refresh.length > 0) return `rafraichir:${sha256(refresh)}`;
        return ipClient(req);
      },
    },
  },
};

// Mot de passe temporaire, 29 oct. 2026 : réinitialisation assistée
// par l'administrateur général, sans e-mail ni SMS. Le temporaire
// remplace l'ancien mot de passe (empreinte argon2id, jamais en
// clair), il est valable 24 heures, et la première connexion avec
// lui impose un changement. Alphabet lisible au téléphone, sans 0,
// O, 1 ni I, pour éviter les confusions à la dictée.
const ALPHABET_TEMPORAIRE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function genererMotDePasseTemporaire() {
  const groupes = [];
  for (let g = 0; g < 3; g++) {
    let groupe = '';
    for (let i = 0; i < 4; i++) groupe += ALPHABET_TEMPORAIRE[crypto.randomInt(ALPHABET_TEMPORAIRE.length)];
    groupes.push(groupe);
  }
  return groupes.join('-');
}

// Normalisation serveur, 27 oct. 2026, en miroir de l'application :
// espaces, tirets, points et parenthèses retirés, 00 initial
// remplacé par +, 0 de tronc après +225 retiré, pour que les
// anciennes applications, qui envoyaient +225074..., retrouvent
// le même compte que +225749..., sans créer de doublon. Un e-mail
// passe tel quel, sans être touché.
function normalizePhoneServer(raw) {
  if (!raw || raw.includes('@')) return raw;
  let v = String(raw).trim().replace(/[\s\-.\(\)]/g, '');
  if (v.startsWith('00')) v = `+${v.slice(2)}`;
  if (v.startsWith('+2250')) v = `+225${v.slice(5)}`;
  return v;
}

// Correctif numero avec 0 apres +225, 4 nov. 2026 : le numero stocke
// est celui tel que tape, nettoye seulement des espaces, tirets,
// points et parentheses, 00 initial remplace par +, 0 de tronc
// apres +225 CONSERVE. La forme canonique ci-dessus ne sert plus
// qu'a comparer : connexion, unicite et recherches acceptent les
// deux formes, avec et sans 0, sans creer de doublon.
function displayPhoneServer(raw) {
  if (!raw || String(raw).includes('@')) return raw;
  let v = String(raw).trim().replace(/[\s\-.\(\)]/g, '');
  if (v.startsWith('00')) v = `+${v.slice(2)}`;
  if (!v.startsWith('+') && /^\d+$/.test(v)) v = `+225${v}`;
  return v;
}
function phoneVariantsServer(raw) {
  if (!raw || String(raw).includes('@')) return [raw];
  const affiche = displayPhoneServer(raw);
  // Numero local sans indicatif : la forme canonique est +225
  // suivi du numero sans son 0 initial, normalizePhoneServer
  // seul ne le sait pas faire.
  const canonique = !String(raw).trim().replace(/[\s\-.\(\)]/g, '').startsWith('+') && !String(raw).trim().replace(/[\s\-.\(\)]/g, '').startsWith('00')
    ? `+225${affiche.slice(4).replace(/^0/, '')}`
    : normalizePhoneServer(raw);
  return [...new Set([affiche, canonique])];
}

// Nouveau format officiel de matricule, 31 oct. 2026 : CP-AA-NNNN.
// AA = initiales du nom complet (premiere lettre du premier mot et
// premiere lettre du dernier mot, en majuscules, accents retires ;
// nom en un seul mot : lettre doublee). Les initiales sont figees
// a l'attribution : un changement de nom ne change jamais le
// matricule, sinon les QR deja imprimes seraient invalides.
function initialesMatricule(nomComplet) {
  const mots = String(nomComplet ?? '').trim().split(/\s+/).filter(Boolean);
  const lettre = (mot) => (mot ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().charAt(0) || 'X';
  if (mots.length === 0) return 'XX';
  if (mots.length === 1) {
    const l = lettre(mots[0]);
    return l + l;
  }
  return lettre(mots[0]) + lettre(mots[mots.length - 1]);
}

app.post('/auth/inscription', authLimit, async (req, reply) => {
  const b = z
    .object({
      email: z.string().trim().toLowerCase().email().optional(),
      telephone: z.string().trim().min(6).max(20).optional(),
      mot_de_passe: z.string().min(8).max(128),
      nom_complet: z.string().trim().min(2).max(120).refine(nomCompletDeuxMots, { message: 'Nom complet incomplet : écris ton prénom et ton nom.' }).transform(nomCompletMajuscules),
      etablissement_id: z.string().uuid().optional(),
      fonction: z.enum(FONCTIONS_MEMBRE).optional(),
      date_naissance: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      pays_residence: z.string().trim().min(1).max(50).refine((v) => normaliserPaysResidence(v) != null, { message: 'Pays de résidence invalide.' }).transform(texteMajuscules).optional(),
    })
    .refine((v) => v.email || v.telephone, { message: 'Un e-mail ou un téléphone est requis.' })
    .parse(req.body);

  // Date de naissance facultative, 29 oct. 2026 : le format seul ne
  // suffit pas, une date impossible comme 2026-02-30 doit être refusée.
  let dateNaissance = null;
  if (b.date_naissance) {
    const [y, mo, d] = b.date_naissance.split('-').map(Number);
    const dt = new Date(Date.UTC(y, mo - 1, d));
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) {
      throw httpError(400, 'Date de naissance invalide.');
    }
    dateNaissance = b.date_naissance;
  }

  const hash = await argon2.hash(b.mot_de_passe, { type: argon2.argon2id });
  const telephone = displayPhoneServer(b.telephone);
  const out = await tx(async (c) => {
    const u = (
      await c.query(
        "INSERT INTO utilisateurs (email, telephone, mot_de_passe_hash, role, email_verifie) VALUES ($1,$2,$3,'membre',$4) RETURNING id, role, etablissement_admin_id, fonction_admin",
        [b.email ?? null, telephone ?? null, hash, b.email ? false : true],
      )
    ).rows[0];
    // Nouveau format officiel, 31 oct. 2026 : le matricule est
    // calcule ici (initiales + numero suivant de la suite), jamais
    // par le defaut base. nextval est atomique : deux inscriptions
    // simultanees ne recoivent jamais le meme numero.
    const numero = (await c.query("SELECT nextval('seq_matricule_nouveau') AS n")).rows[0].n;
    const matricule = `CP-${initialesMatricule(b.nom_complet)}-${String(numero).padStart(4, '0')}`;
    const m = (
      await c.query(
        'INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction, date_naissance, matricule, pays_residence) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, matricule, nom_complet, valide_jusqua, pays_residence',
        [u.id, b.nom_complet, b.etablissement_id ?? null, b.fonction ?? '', dateNaissance, matricule, b.pays_residence ?? null],
      )
    ).rows[0];
    await audit(c, { user: { sub: u.id }, ip: req.ip }, 'membre.inscrit', 'membres', m.id);
    return { membre: m, utilisateur: u };
  });
  // MO-25 (b), 22 nov. 2026 : avec un e-mail, le compte est créé
  // mais ne reçoit aucun jeton tant que l'e-mail n'est pas vérifié.
  // La vérification se fait par POST /auth/verifier-email, le
  // renvoi par POST /auth/renvoyer-code-verification. Sans e-mail
  // (inscription par téléphone seul), les jetons sont émis comme
  // avant.
  if (b.email) {
    await envoyerCodeVerificationEmail({ id: out.utilisateur.id, email: b.email });
    attacherDonsEnAttente(out.membre.id, b.email ?? null, telephone ?? null).catch((e) => app.log.error(e));
    lierBureauAInscription(out.membre.id, {
      nomComplet: b.nom_complet,
      email: b.email ?? null,
      telephone,
      telephoneNormalise: normalizePhoneServer(telephone),
      etablissementId: b.etablissement_id ?? null,
    }).catch((e) => app.log.error(e));
    return reply.code(202).send({ verification_requise: true, email: b.email });
  }
  const tokens = await tx((c) => issueTokens(c, out.utilisateur));
  const sortie = { membre: out.membre, ...tokens };
  // Don de camp, 31 oct. 2026 : les dons deja valides pour ce
  // contact s'attachent seuls a ce nouveau compte.
  attacherDonsEnAttente(out.membre.id, b.email ?? null, telephone ?? null).catch((e) => app.log.error(e));
  // Lien Bureau, 3 nov. 2026 : comme les dons, en arrière-plan,
  // sans jamais faire échouer l'inscription si le lien échoue.
  // Carte 101, 8 nov. 2026 : la comparaison du Bureau utilise la
  // forme normalisée, sans 0, mais le contact écrit dans
  // bureau_membres garde la forme affichée, avec le 0.
  lierBureauAInscription(out.membre.id, {
    nomComplet: b.nom_complet,
    email: b.email ?? null,
    telephone,
    telephoneNormalise: normalizePhoneServer(telephone),
    etablissementId: b.etablissement_id ?? null,
  }).catch((e) => app.log.error(e));
  return reply.code(201).send(sortie);
});

app.post('/auth/connexion', authLimit, async (req, reply) => {
  const b = z.object({ identifiant: z.string().trim().min(3), mot_de_passe: z.string().min(1) }).parse(req.body);
  const identifiant = b.identifiant;
  const variantesIdentifiant = identifiant.includes('@') ? [identifiant] : phoneVariantsServer(identifiant);
  const u = (
    await q(
      'SELECT id, email, role, etablissement_admin_id, fonction_admin, mot_de_passe_hash, mot_de_passe_temporaire_expire_le, actif, supprime_le, email_verifie, double_authentification_active FROM utilisateurs WHERE (lower(email) = lower($1) OR telephone = $2 OR telephone = $3)',
      [identifiant, variantesIdentifiant[0], variantesIdentifiant[1] ?? variantesIdentifiant[0]],
    )
  ).rows[0];
  // Même coût de calcul si l'utilisateur n'existe pas (pas d'indice sur les comptes).
  const ok = await argon2.verify(u?.mot_de_passe_hash ?? DUMMY_HASH, b.mot_de_passe).catch(() => false);
  if (!u || !ok) throw httpError(401, 'Identifiants incorrects.');
  // Suppression douce, carte 92, 7 nov. 2026 : un compte desactive
  // par sa propre demande ne se reconnecte que pour annuler, tant
  // que les 30 jours ne sont pas passes. La connexion renvoie alors
  // suppression_demandee et supprime_le, et l'application montre
  // seulement le choix Annuler la suppression ou Se deconnecter.
  // Sans demande en cours, ou delai passe, le compte reste inactif.
  let suppressionDemandee = false;
  if (!u.actif) {
    if (u.supprime_le && suppressionAnnulable(u.supprime_le, new Date())) {
      suppressionDemandee = true;
    } else {
      // MO-13, 22 nov. 2026 : un seul message générique, qui ne
      // révèle ni l'existence du compte ni son état.
      throw httpError(401, 'Identifiants incorrects.');
    }
  }
  // Temporaire, 29 oct. 2026 : expiré, aucun jeton n'est émis, le
  // membre doit demander une réémission à l'administrateur général.
  // Non expiré, le drapeau impose le changement forcé côté application.
  const temporaireActif = u.mot_de_passe_temporaire_expire_le != null;
  if (temporaireActif && new Date(u.mot_de_passe_temporaire_expire_le) <= new Date()) {
    throw httpError(401, 'Identifiants incorrects.');
  }
  // MO-25 (b), 22 nov. 2026 : un compte inscrit avec un e-mail ne
  // reçoit pas de jeton tant que l'e-mail n'est pas vérifié. Les
  // comptes d'avant la migration sont vérifiés par défaut.
  if (u.email && u.email_verifie === false) {
    return reply.code(403).send({ erreur: 'Adresse e-mail non vérifiée.', verification_requise: true, email: u.email });
  }
  // MO-25 (c), 22 nov. 2026 : un administrateur avec la double
  // authentification active reçoit un identifiant de second pas,
  // sans jeton ; les jetons arrivent par /auth/connexion-2fa.
  if ((u.role === 'admin_general' || u.role === 'admin_etablissement') && u.double_authentification_active) {
    return reply.code(200).send({ double_authentification_requise: true, identifiant });
  }
  const tokens = await tx((c) => issueTokens(c, u));
  return { ...tokens, mot_de_passe_temporaire: temporaireActif, ...(suppressionDemandee ? { suppression_demandee: true, supprime_le: u.supprime_le } : {}) };
});

// Fenêtre de grâce du renouvellement, 21 nov. 2026 : 60 secondes.
const FENETRE_GRACE_RAFRAICHIR_SECONDES = 60;

app.post('/auth/rafraichir', limiteRafraichir, async (req) => {
  const { refresh } = z.object({ refresh: z.string().length(64) }).parse(req.body);
  const empreinte = sha256(refresh);
  // La transaction ne fait que décider : les révocations qui
  // accompagnent un 401 sont appliquées après, car le 401
  // annulerait la transaction et donc la révocation.
  const sortie = await tx(async (c) => {
    // Verrou sur la ligne du jeton présenté : deux renouvellements
    // simultanés avec le même jeton se sérialisent, un seul tourne.
    // L'âge de la révocation est calculé côté SQL (now()), jamais
    // avec l'horloge de Node.
    const ligne = (
      await c.query(
        `SELECT utilisateur_id, revoque, paire_rejouable, famille_cree_le, cree_le,
                (expire_le > now()) AS valide,
                (revoque_le IS NOT NULL AND now() - revoque_le < interval '${FENETRE_GRACE_RAFRAICHIR_SECONDES} seconds') AS dans_grace
         FROM jetons_rafraichissement WHERE empreinte = $1 FOR UPDATE`,
        [empreinte],
      )
    ).rows[0];
    if (!ligne) throw httpError(401, 'Session expirée. Reconnectez-vous.');
    if (ligne.revoque) {
      // Jeton déjà révoqué par rotation, réponse perdue : dans la
      // fenêtre de grâce, on rend la paire déjà émise, sans créer
      // de nouveau jeton. Hors fenêtre, rejeu possible : toute la
      // famille est révoquée, le membre se reconnecte partout.
      // Un jeton révoqué par déconnexion ou changement de mot de
      // passe n'a pas de paire rejouable : simple 401, sans rien
      // révoquer d'autre.
      if (ligne.paire_rejouable && ligne.dans_grace) {
        // MO-1 : la borne absolue de 90 jours s'applique aussi au
        // rejeu dans la grâce, la paire déjà émise ne prolonge rien.
        const familleCreeLeGrace = ligne.famille_cree_le ?? ligne.cree_le;
        if (familleCreeLeGrace && Date.now() - new Date(familleCreeLeGrace).getTime() > 90 * 24 * 3600 * 1000) {
          return { famille: ligne.utilisateur_id };
        }
        let paire;
        try {
          paire = dechiffrerPaire(ligne.paire_rejouable);
        } catch (_) {
          throw httpError(401, 'Session expirée. Reconnectez-vous.');
        }
        if (!paire || typeof paire.access !== 'string' || typeof paire.refresh !== 'string') {
          throw httpError(401, 'Session expirée. Reconnectez-vous.');
        }
        // Le remplaçant doit être encore valide : si le membre
        // s'est déconnecté entre-temps, la grâce ne ranime rien.
        const remplacant = (
          await c.query(
            'SELECT (expire_le > now()) AS valide FROM jetons_rafraichissement WHERE empreinte = $1 AND NOT revoque',
            [sha256(paire.refresh)],
          )
        ).rows[0];
        if (!remplacant || !remplacant.valide) throw httpError(401, 'Session expirée. Reconnectez-vous.');
        // MO-2, 22 nov. 2026 : le rejeu dans la fenêtre de grâce
        // est consigné dans le journal d'audit, avec l'adresse IP,
        // pour qu'un rejeu depuis une autre adresse laisse une trace.
        await audit(c, { user: { sub: ligne.utilisateur_id }, ip: ipClient(req) }, 'auth.rafraichir.grace_rejeu', 'jetons_rafraichissement', ligne.utilisateur_id, { adresse_ip: ipClient(req) });
        return paire;
      }
      if (ligne.paire_rejouable) return { famille: ligne.utilisateur_id };
      throw httpError(401, 'Session expirée. Reconnectez-vous.');
    }
    if (!ligne.valide) throw httpError(401, 'Session expirée. Reconnectez-vous.');
    // MO-1, 22 nov. 2026 : durée absolue maximale de session, 90
    // jours depuis la création de la famille de jetons. Au-delà,
    // toute la famille est révoquée et le membre se reconnecte.
    // Les jetons d'avant la migration n'ont pas de famille_cree_le :
    // leur propre création fait foi.
    const familleCreeLe = ligne.famille_cree_le ?? ligne.cree_le;
    if (familleCreeLe && Date.now() - new Date(familleCreeLe).getTime() > 90 * 24 * 3600 * 1000) {
      return { famille: ligne.utilisateur_id };
    }
    const u = (
      await c.query('SELECT id, role, etablissement_admin_id, fonction_admin, mot_de_passe_temporaire_expire_le FROM utilisateurs WHERE id = $1 AND actif', [ligne.utilisateur_id])
    ).rows[0];
    if (!u) throw httpError(401, 'Session expirée. Reconnectez-vous.');
    // Temporaire en cours, 29 oct. 2026 : le rafraîchissement est
    // refusé, pour que la session ne survive pas à un changement
    // forcé non effectué. Le jeton présenté est révoqué, sans
    // paire rejouable : le membre se reconnecte avec son
    // temporaire et retombe sur le changement forcé.
    if (u.mot_de_passe_temporaire_expire_le) return { temporaire: true };
    const tokens = await issueTokens(c, u, familleCreeLe);
    await c.query(
      'UPDATE jetons_rafraichissement SET revoque = true, revoque_le = now(), paire_rejouable = $2 WHERE empreinte = $1',
      [empreinte, chiffrerPaire(tokens)],
    );
    return tokens;
  });
  if (sortie && sortie.famille) {
    await q('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1 AND NOT revoque', [sortie.famille]);
    throw httpError(401, 'Session expirée. Reconnectez-vous.');
  }
  if (sortie && sortie.temporaire) {
    await q('UPDATE jetons_rafraichissement SET revoque = true WHERE empreinte = $1', [empreinte]);
    // MO-13, 22 nov. 2026 : message générique, comme pour la
    // connexion, sans préciser le motif du refus.
    throw httpError(401, 'Session expirée. Reconnectez-vous.');
  }
  return sortie;
});

app.post('/auth/deconnexion', async (req) => {
  const { refresh } = z.object({ refresh: z.string().length(64) }).parse(req.body);
  await q('UPDATE jetons_rafraichissement SET revoque = true WHERE empreinte = $1', [sha256(refresh)]);
  return { ok: true };
});

// MO-1, 22 nov. 2026 : déconnexion de tous les appareils, tous
// les jetons de renouvellement de l'utilisateur sont révoqués.
app.post('/auth/deconnecter-tous', { preHandler: membreG }, async (req) => {
  await q('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1 AND NOT revoque', [req.user.sub]);
  return { ok: true };
});

// MO-25 (b), 22 nov. 2026 : code de vérification d'e-mail, 6
// chiffres, 30 minutes, haché en Argon2id, usage unique, 5
// tentatives au plus. L'ancien code encore valide est invalidé
// à chaque nouvel envoi. Sans SMTP configuré, le code est gardé
// et un avertissement est journalisé, sans faire échouer la
// demande : la structure doit configurer SMTP pour l'envoyer.
async function envoyerCodeVerificationEmail(u) {
  await q('UPDATE codes_verification_email SET utilise = true WHERE utilisateur_id = $1 AND NOT utilise', [u.id]);
  const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  const codeHash = await argon2.hash(code, { type: argon2.argon2id });
  await q(
    "INSERT INTO codes_verification_email (utilisateur_id, email, code_hash, expire_le) VALUES ($1,$2,$3, now() + interval '30 minutes')",
    [u.id, u.email, codeHash],
  );
  if (!smtpConfigure()) {
    app.log.warn('SMTP non configuré : code de vérification e-mail non envoyé.');
    return;
  }
  try {
    await envoyerCodeVerification({ email: u.email, code });
  } catch (e) {
    app.log.error({ envoi: 'code_verification', code: e?.code ?? null, responseCode: e?.responseCode ?? null }, 'Échec envoi code vérification.');
  }
}

app.post('/auth/verifier-email', authLimit, async (req) => {
  const b = z.object({ email: z.string().trim().toLowerCase().email(), code: z.string().regex(/^\d{6}$/) }).parse(req.body);
  const u = (await q('SELECT id, role, etablissement_admin_id, fonction_admin FROM utilisateurs WHERE actif AND lower(email) = lower($1)', [b.email])).rows[0];
  if (!u) throw httpError(400, 'Code invalide ou expiré.');
  const ligne = (
    await q(
      `SELECT id, code_hash, tentatives FROM codes_verification_email
       WHERE utilisateur_id = $1 AND NOT utilise AND expire_le > now()
       ORDER BY cree_le DESC LIMIT 1`,
      [u.id],
    )
  ).rows[0];
  if (!ligne) throw httpError(400, 'Code invalide ou expiré.');
  const ok = await argon2.verify(ligne.code_hash, b.code).catch(() => false);
  if (!ok) {
    const tentatives = ligne.tentatives + 1;
    await q('UPDATE codes_verification_email SET tentatives = $2, utilise = $3 WHERE id = $1', [ligne.id, tentatives, tentatives >= 5]);
    throw httpError(400, 'Code invalide ou expiré.');
  }
  // Même forme que la connexion : jetons, plus le drapeau du mot
  // de passe temporaire, faux ici, un compte qui vient de
  // s'inscrire n'en a pas.
  const tokens = await tx(async (c) => {
    await c.query('UPDATE codes_verification_email SET utilise = true WHERE id = $1', [ligne.id]);
    await c.query('UPDATE utilisateurs SET email_verifie = true WHERE id = $1', [u.id]);
    return issueTokens(c, u);
  });
  return { ...tokens, mot_de_passe_temporaire: false };
});

app.post('/auth/renvoyer-code-verification', authLimit, async (req) => {
  const { email } = z.object({ email: z.string().trim().toLowerCase().email() }).parse(req.body);
  // Réponse générique identique, que le compte existe ou non,
  // vérifié ou non : rien n'est révélé.
  const u = (await q('SELECT id, email, email_verifie FROM utilisateurs WHERE actif AND lower(email) = lower($1)', [email])).rows[0];
  if (u && u.email_verifie === false) await envoyerCodeVerificationEmail(u);
  return { ok: true };
});

// MO-25 (c), 22 nov. 2026 : second pas de la connexion d'un
// administrateur avec double authentification active. Le mot de
// passe a déjà été vérifié à /auth/connexion, qui a renvoyé
// l'identifiant ; ici seul le code TOTP est contrôlé.
app.post('/auth/connexion-2fa', authLimit, async (req) => {
  const b = z.object({ identifiant: z.string().trim().min(3), code: z.string().regex(/^\d{6}$/) }).parse(req.body);
  const identifiant = b.identifiant;
  const variantesIdentifiant = identifiant.includes('@') ? [identifiant] : phoneVariantsServer(identifiant);
  const u = (
    await q(
      'SELECT id, role, etablissement_admin_id, fonction_admin, actif, supprime_le, mot_de_passe_temporaire_expire_le, secret_2fa_chiffre, double_authentification_active FROM utilisateurs WHERE (lower(email) = lower($1) OR telephone = $2 OR telephone = $3)',
      [identifiant, variantesIdentifiant[0], variantesIdentifiant[1] ?? variantesIdentifiant[0]],
    )
  ).rows[0];
  if (!u || !u.double_authentification_active || !u.secret_2fa_chiffre) throw httpError(401, 'Identifiants incorrects.');
  if (!u.actif) throw httpError(401, 'Identifiants incorrects.');
  if (u.mot_de_passe_temporaire_expire_le && new Date(u.mot_de_passe_temporaire_expire_le) <= new Date()) {
    throw httpError(401, 'Identifiants incorrects.');
  }
  let secret;
  try {
    secret = dechiffrerSecret2fa(u.secret_2fa_chiffre, _cle2fa);
  } catch (_) {
    throw httpError(401, 'Identifiants incorrects.');
  }
  if (!verifierCodeTotp(secret, b.code)) throw httpError(401, 'Identifiants incorrects.');
  const tokens = await tx((c) => issueTokens(c, u));
  return { ...tokens, mot_de_passe_temporaire: u.mot_de_passe_temporaire_expire_le != null };
});

// Double authentification TOTP des administrateurs, MO-25 (c).
// Activer génère un secret, le chiffre en base en attente, et
// renvoie le secret et l'URL otpauth pour le QR. Confirmer
// vérifie un code et active. Désactiver vérifie un code, puis
// désactive et efface le secret.
app.post('/auth/double-authentification/activer', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  const u = (await q('SELECT id, email FROM utilisateurs WHERE id = $1', [req.user.sub])).rows[0];
  if (!u) throw httpError(401, 'Authentification requise.');
  const secret = genererSecret2fa();
  await q('UPDATE utilisateurs SET secret_2fa_chiffre = $2, double_authentification_active = false WHERE id = $1', [u.id, chiffrerSecret2fa(secret, _cle2fa)]);
  return { secret, otpauth_url: urlOtpAuth(secret, u.email ?? '') };
});

app.post('/auth/double-authentification/confirmer', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  const { code } = z.object({ code: z.string().regex(/^\d{6}$/) }).parse(req.body);
  const u = (await q('SELECT secret_2fa_chiffre FROM utilisateurs WHERE id = $1', [req.user.sub])).rows[0];
  if (!u?.secret_2fa_chiffre) throw httpError(400, 'Active d’abord la double authentification.');
  let secret;
  try {
    secret = dechiffrerSecret2fa(u.secret_2fa_chiffre, _cle2fa);
  } catch (_) {
    throw httpError(400, 'Active d’abord la double authentification.');
  }
  if (!verifierCodeTotp(secret, code)) throw httpError(400, 'Code invalide ou expiré.');
  await q('UPDATE utilisateurs SET double_authentification_active = true WHERE id = $1', [req.user.sub]);
  return { ok: true, double_authentification_active: true };
});

app.post('/auth/double-authentification/desactiver', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  const { code } = z.object({ code: z.string().regex(/^\d{6}$/) }).parse(req.body);
  const u = (await q('SELECT secret_2fa_chiffre FROM utilisateurs WHERE id = $1', [req.user.sub])).rows[0];
  if (!u?.secret_2fa_chiffre) throw httpError(400, 'La double authentification n’est pas activée.');
  let secret;
  try {
    secret = dechiffrerSecret2fa(u.secret_2fa_chiffre, _cle2fa);
  } catch (_) {
    throw httpError(400, 'La double authentification n’est pas activée.');
  }
  if (!verifierCodeTotp(secret, code)) throw httpError(400, 'Code invalide ou expiré.');
  await q('UPDATE utilisateurs SET secret_2fa_chiffre = NULL, double_authentification_active = false WHERE id = $1', [req.user.sub]);
  return { ok: true, double_authentification_active: false };
});

// Réinitialisation autonome du mot de passe par code e-mail, 2 nov.
// 2026 : en plus de la réinitialisation assistée par l'administrateur
// général, qui reste en place. Le code n'est jamais stocké en clair
// (empreinte argon2id, comme un mot de passe), il expire après 30
// minutes, il ne sert qu'une fois, et 5 tentatives ratées l'invalident.
// La réponse de la demande ne révèle jamais si le compte existe : un
// compte inconnu reçoit exactement la même réponse qu'un compte connu.
// Limite anti-abus, MO-25 (a) et B-22, 22 nov. 2026 : 5 demandes par
// e-mail et par heure, comptées en base (table
// demandes_code_reinitialisation), donc conservées après un
// redémarrage ou un redéploiement, comptées même pour un compte
// inconnu, pour ne pas révéler son existence par la limite. Sans
// variables SMTP, la route répond 503, jamais de repli ni d'envoi
// simulé. Le code et le mot de passe ne sont jamais journalisés.
app.post('/auth/mot-de-passe-oublie', authLimit, async (req, reply) => {
  const { email } = z.object({ email: z.string().trim().toLowerCase().email() }).parse(req.body);
  const { rows: [{ nombre }] } = await q(
    "SELECT count(*)::int AS nombre FROM demandes_code_reinitialisation WHERE lower(email) = lower($1) AND cree_le > now() - interval '1 hour'",
    [email],
  );
  if (nombre >= 5) {
    return reply.code(429).send({ erreur: 'Trop de demandes. Réessaie plus tard.' });
  }
  await q('INSERT INTO demandes_code_reinitialisation (email) VALUES ($1)', [email]);
  if (!smtpConfigure()) {
    return reply.code(503).send({ erreur: 'Le service d’envoi n’est pas encore configuré par la structure.' });
  }
  const u = (await q('SELECT id, email FROM utilisateurs WHERE actif AND lower(email) = lower($1)', [email])).rows[0];
  if (!u) return { ok: true };
  await q('UPDATE codes_reinitialisation SET utilise = true WHERE utilisateur_id = $1 AND NOT utilise', [u.id]);
  const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  const codeHash = await argon2.hash(code, { type: argon2.argon2id });
  const ligne = (
    await q(
      "INSERT INTO codes_reinitialisation (utilisateur_id, email, code_hash, expire_le) VALUES ($1,$2,$3, now() + interval '30 minutes') RETURNING id",
      [u.id, u.email, codeHash],
    )
  ).rows[0];
  try {
    await envoyerCodeReinitialisation({ email: u.email, code });
  } catch (e) {
    // Diagnostic seul, 2 nov. 2026 : code d'erreur d'envoi seulement,
    // jamais le code, jamais l'e-mail, jamais un secret, jamais le
    // contenu d'un message. Sert à distinguer authentification,
    // connexion et refus du serveur d'envoi dans les journaux Render.
    req.log.error({ envoi: 'code_reinitialisation', code: e?.code ?? null, responseCode: e?.responseCode ?? null, command: e?.command ?? null }, 'Echec envoi code reinitialisation.');
    await q('UPDATE codes_reinitialisation SET utilise = true WHERE id = $1', [ligne.id]);
    return reply.code(503).send({ erreur: 'L’envoi a échoué. Réessaie plus tard.' });
  }
  return { ok: true };
});

app.post('/auth/reinitialiser-mot-de-passe', authLimit, async (req) => {
  const b = z
    .object({
      email: z.string().trim().toLowerCase().email(),
      code: z.string().regex(/^\d{6}$/),
      mot_de_passe: z.string().min(8).max(128),
    })
    .parse(req.body);
  const u = (await q('SELECT id, role, etablissement_admin_id, fonction_admin FROM utilisateurs WHERE actif AND lower(email) = lower($1)', [b.email])).rows[0];
  if (!u) throw httpError(400, 'Code invalide ou expiré.');
  const ligne = (
    await q(
      `SELECT id, code_hash, tentatives FROM codes_reinitialisation
       WHERE utilisateur_id = $1 AND NOT utilise AND expire_le > now()
       ORDER BY cree_le DESC LIMIT 1`,
      [u.id],
    )
  ).rows[0];
  if (!ligne) throw httpError(400, 'Code invalide ou expiré.');
  const ok = await argon2.verify(ligne.code_hash, b.code).catch(() => false);
  if (!ok) {
    const tentatives = ligne.tentatives + 1;
    await q('UPDATE codes_reinitialisation SET tentatives = $2, utilise = $3 WHERE id = $1', [ligne.id, tentatives, tentatives >= 5]);
    throw httpError(400, 'Code invalide ou expiré.');
  }
  const hash = await argon2.hash(b.mot_de_passe, { type: argon2.argon2id });
  // Connexion automatique, carte 46 : dans la même transaction,
  // après mise à jour du hash, on révoque d'abord tous les anciens
  // jetons, puis on émet les nouveaux. L'ordre compte : émettre
  // avant de révoquer révoquerait le jeton qui vient d'être créé.
  const tokens = await tx(async (c) => {
    await c.query('UPDATE codes_reinitialisation SET utilise = true WHERE id = $1', [ligne.id]);
    await c.query('UPDATE utilisateurs SET mot_de_passe_hash = $2, mot_de_passe_temporaire_expire_le = NULL WHERE id = $1', [u.id, hash]);
    await c.query('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1 AND NOT revoque', [u.id]);
    const nouveaux = await issueTokens(c, u);
    await audit(c, { user: { sub: u.id }, ip: req.ip }, 'motdepasse.reinitialise', 'utilisateurs', u.id, {});
    return nouveaux;
  });
  return { ...tokens, mot_de_passe_temporaire: false };
});

// ───────────────────────── Consultation publique (visiteur) ─────────────────────────
// Racine : l'API seule n'est pas un site web, on évite une erreur 404
// quand l'adresse est ouverte dans un navigateur.
app.get('/', async () => ({ ok: true, service: 'CONNEXION PROPHETIQUE', api: 'https://connexion-prophetique.onrender.com', sante: '/sante' }));

app.get('/sante', async () => {
  await q('SELECT 1');
  return { ok: true };
});

// ───────────────────────── Configuration pilotée par le serveur ──
// Modèle Desjardins, 27 oct. 2026 : les petits réglages de contenu
// (textes d'accueil, libellés de base, messages d'information,
// activation d'une section) se changent côté serveur, sans nouvelle
// APK. L'application lit /config au démarrage et à chaque
// synchronisation, et garde la dernière configuration en local
// comme repli hors ligne. Les valeurs par défaut ci-dessous sont
// exactement les valeurs actuelles de l'application, rien n'est
// inventé : changer une valeur ici ne change aucune fonction, aucun
// prix, aucun paiement, aucun texte biblique.
// La table config_app n'existe que si la base est neuve (schema.sql)
// ou si un premier PUT /admin/config l'a créée, ou si la migration
// documentée dans docs/DEPLOIEMENT.md a été appliquée à la main.
// Tant qu'elle est absente, GET /config renvoie les défauts, jamais
// une erreur : l'application existante continue donc de fonctionner.
const DEFAULT_CONFIG = {
  version: 1,
  accueil_salutation: 'Shalom',
  titre_vie_spirituelle: 'Ma vie spirituelle',
  titre_explorer: 'Explorer',
  titre_rendez_vous: 'Prochains rendez-vous',
  titre_actualites: 'Actualités de la structure',
  message_visiteur: 'Mode visiteur, consultation sans inscription',
  message_hors_ligne: 'Hors ligne : contenus locaux affichés. La synchronisation reprendra en ligne.',
  message_aucune_actualite: 'Aucune actualité pour le moment',
  nav_accueil: 'Accueil',
  nav_bible: 'Bible',
  nav_carte: 'Carte',
  nav_communaute: 'Structure',
  nav_plus: 'Plus',
  // URL du logo, vide par défaut : l'application utilise alors
  // son logo officiel local, redimensionné en en-tête. Si la
  // structure renseigne ici une URL, par exemple un fichier
  // téléversé sur le serveur, l'application l'utilise à la place,
  // sans nouvelle APK, avec repli local en cas d'échec ou hors ligne.
  logo_url: '',
  sections: {
    vie_spirituelle: true,
    explorer: true,
    verset_du_jour: true,
    quiz: true,
    rendez_vous: true,
    actualites: true,
    priere: true,
  },
};
const CONFIG_TEXT_KEYS = [
  'accueil_salutation', 'titre_vie_spirituelle', 'titre_explorer',
  'titre_rendez_vous', 'titre_actualites', 'message_visiteur',
  'message_hors_ligne', 'message_aucune_actualite', 'nav_accueil',
  'nav_bible', 'nav_carte', 'nav_communaute', 'nav_plus',
  'logo_url',
];
const CONFIG_SECTION_KEYS = [
  'vie_spirituelle', 'explorer', 'verset_du_jour', 'quiz',
  'rendez_vous', 'actualites', 'priere',
];
async function readConfig() {
  const merged = { ...DEFAULT_CONFIG, sections: { ...DEFAULT_CONFIG.sections } };
  try {
    const rows = (await q('SELECT cle, valeur FROM config_app')).rows;
    for (const r of rows) {
      if (CONFIG_TEXT_KEYS.includes(r.cle) && typeof r.valeur === 'string') merged[r.cle] = r.valeur;
      if (r.cle === 'sections' && r.valeur && typeof r.valeur === 'object') {
        for (const k of CONFIG_SECTION_KEYS) {
          if (typeof r.valeur[k] === 'boolean') merged.sections[k] = r.valeur[k];
        }
      }
    }
  } catch (e) {
    // Table absente sur une base existante (42P01) ou toute autre
    // erreur de lecture : on renvoie les défauts, on ne casse pas
    // l'application. L'erreur reste journalisée côté serveur.
    if (e?.code !== '42P01') app.log.error(e);
  }
  return { ...merged, source: 'serveur' };
}

app.get('/config', async () => readConfig());

// Modification réservée à l'administrateur général, comme les livres.
// Corps accepté : tout sous-ensemble des clés connues, plus
// éventuellement sections (objet, booléens pour les sections connues).
// Les clés inconnues sont refusées, pour ne pas laisser passer une
// faute de frappe silencieuse. Le premier PUT crée la table si elle
// est absente, ce qui évite une migration forcée sur une base existante.
app.put('/admin/config', { preHandler: adminG }, async (req, reply) => {
  const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : null;
  if (!body) throw httpError(400, 'Corps JSON objet requis.');
  const unknown = Object.keys(body).filter((k) => k !== 'sections' && !CONFIG_TEXT_KEYS.includes(k));
  if (unknown.length) throw httpError(422, `Clés inconnues : ${unknown.join(', ')}.`);
  const updates = {};
  for (const k of CONFIG_TEXT_KEYS) {
    if (body[k] === undefined) continue;
    if (typeof body[k] !== 'string' || body[k].trim().isEmpty || body[k].length > 300) {
      throw httpError(422, `La clé ${k} doit être un texte non vide de 300 caractères maximum.`);
    }
    updates[k] = body[k];
  }
  if (body.sections !== undefined) {
    if (!body.sections || typeof body.sections !== 'object' || Array.isArray(body.sections)) {
      throw httpError(422, 'sections doit être un objet.');
    }
    const secUnknown = Object.keys(body.sections).filter((k) => !CONFIG_SECTION_KEYS.includes(k));
    if (secUnknown.length) throw httpError(422, `Sections inconnues : ${secUnknown.join(', ')}.`);
    const sec = {};
    for (const k of CONFIG_SECTION_KEYS) {
      if (body.sections[k] === undefined) continue;
      if (typeof body.sections[k] !== 'boolean') throw httpError(422, `La section ${k} doit être un booléen.`);
      sec[k] = body.sections[k];
    }
    if (Object.keys(sec).length) updates.sections = sec;
  }
  if (!Object.keys(updates).length) throw httpError(400, 'Aucune clé connue à modifier.');
  await q(`CREATE TABLE IF NOT EXISTS config_app (
    cle text PRIMARY KEY,
    valeur jsonb NOT NULL,
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  for (const [k, v] of Object.entries(updates)) {
    await q(
      `INSERT INTO config_app (cle, valeur, modifie_le) VALUES ($1, $2::jsonb, now())
       ON CONFLICT (cle) DO UPDATE SET valeur = EXCLUDED.valeur, modifie_le = now()`,
      [k, JSON.stringify(v)],
    );
  }
  try {
    await q(
      "INSERT INTO journal_audit (utilisateur_id, action, entite, details) VALUES ($1, 'config.modifie', 'config_app', $2::jsonb)",
      [req.user.sub, JSON.stringify({ cles: Object.keys(updates) })],
    );
  } catch (_) {}
  return reply.code(200).send(await readConfig());
});

// ───────────────────────── Configuration de version (v1) ──────
// GET /api/config : version minimale imposée et lien de mise à jour.
// Les valeurs sont les constantes de src/config_version.js, sans
// table ni interface admin pour cette v1. Route publique, sans
// jeton : l'application la lit avant toute connexion, et hors ligne
// elle garde sa dernière configuration en local. ETag, carte 160,
// 23 nov. 2026 : le contenu ne change qu'au déploiement, le client
// renvoie l'ETag gardé et reçoit 304 quand rien n'a changé.
app.get('/api/config', async (req, reply) => {
  const config = { ...VERSION_CONFIG };
  const etag = etagPourContenu(config);
  if (etagCorrespond(req, etag)) return reply.code(304).send();
  return reply.header('ETag', etag).header('Cache-Control', 'public, max-age=3600').send(config);
});

// ───────────────────────── Configuration design ────────────────
// Carte 47, 6 nov. 2026 : config design parallèle à /config,
// distincte. Couleurs de la palette, titres d'accueil et ordre des
// entrées de la barre du bas. Les défauts sont les valeurs actuelles
// de l'application. Table design_config, une seule ligne id 1.
// Tant que la table est absente, GET /config/design renvoie les
// défauts, jamais une erreur, comme GET /config.
async function readDesignConfig() {
  try {
    const rows = (await q('SELECT valeur FROM design_config WHERE id = 1')).rows;
    if (!rows.length) return mergeDesignConfig(null);
    return mergeDesignConfig(rows[0].valeur);
  } catch (e) {
    // Table absente sur une base existante (42P01) ou toute autre
    // erreur de lecture : on renvoie les défauts, on ne casse pas
    // l'application. L'erreur reste journalisée côté serveur.
    if (e?.code !== '42P01') app.log.error(e);
    return mergeDesignConfig(null);
  }
}

app.get('/config/design', async () => ({ version: 1, source: 'serveur', ...(await readDesignConfig()) }));

// Modification réservée à l'administrateur général, comme /config.
// Corps accepté : tout sous-ensemble des clés connues. Les clés
// inconnues sont refusées 422, les valeurs invalides aussi. Le
// premier PUT crée la table si elle est absente, puis fusionne les
// clés fournies sur la config lue, pour ne jamais perdre les autres.
app.put('/admin/design', { preHandler: adminG }, async (req, reply) => {
  const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : null;
  if (!body) throw httpError(400, 'Corps JSON objet requis.');
  const updates = validateDesignPatch(body);
  await q(`CREATE TABLE IF NOT EXISTS design_config (
    id integer PRIMARY KEY CHECK (id = 1),
    valeur jsonb NOT NULL,
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  const actuelle = await readDesignConfig();
  const { version: _v, source: _s, ...courante } = actuelle;
  const fusion = { ...courante, ...updates };
  await q(
    `INSERT INTO design_config (id, valeur, modifie_le) VALUES (1, $1::jsonb, now())
     ON CONFLICT (id) DO UPDATE SET valeur = EXCLUDED.valeur, modifie_le = now()`,
    [JSON.stringify(fusion)],
  );
  try {
    await q(
      "INSERT INTO journal_audit (utilisateur_id, action, entite, details) VALUES ($1, 'design.modifie', 'design_config', $2::jsonb)",
      [req.user.sub, JSON.stringify({ cles: Object.keys(updates) })],
    );
  } catch (_) {}
  return reply.code(200).send({ version: 1, source: 'serveur', ...(await readDesignConfig()) });
});

app.get('/etablissements', async () => (await q('SELECT id, nom, description, image_id FROM etablissements ORDER BY nom')).rows);

app.get('/etablissements/:id', async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const e = (await q('SELECT id, nom, description, image_id FROM etablissements WHERE id = $1', [id])).rows[0];
  if (!e) throw httpError(404, 'Établissement introuvable.');
  const [activites, actualites] = await Promise.all([
    q('SELECT id, titre, description, image_id FROM activites_etablissement WHERE etablissement_id = $1 ORDER BY cree_le', [id]),
    q('SELECT id, titre, texte, image_id, publiee_le FROM actualites WHERE etablissement_id = $1 AND (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC LIMIT 50', [id]),
  ]);
  return { ...e, activites: activites.rows, actualites: actualites.rows };
});

// Nominations d'un établissement, 21 nov. 2026 : les responsables
// nommés pour cet établissement, visibles par les membres dans
// la fiche établissement, section Responsables. Nom, fonction
// et dates seulement, jamais les permissions ni les identifiants
// internes, jamais le matricule depuis le 22 nov. 2026.
// Session membre exigée, la route n'est plus publique.
// Actives ou à venir seulement, jamais expirées ni révoquées,
// l'effet est immédiat.
app.get('/etablissements/:id/nominations', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const etab = (await q('SELECT id FROM etablissements WHERE id = $1', [id])).rows[0];
  if (!etab) throw httpError(404, 'Établissement introuvable.');
  return (await q(`SELECT n.id, n.portee, n.fonction_code, f.libelle AS fonction_libelle, n.debute_le, n.finit_le, COALESCE(m.nom_complet, pe.nom_complet) AS nom_complet, CASE WHEN n.debute_le > now() THEN 'a_venir' ELSE 'active' END AS statut FROM nominations n JOIN fonctions_admin f ON f.code = n.fonction_code LEFT JOIN membres m ON m.id = n.membre_id LEFT JOIN personnes_externes pe ON pe.id = n.personne_externe_id WHERE n.etablissement_id = $1 AND NOT n.revoque AND (n.finit_le IS NULL OR n.finit_le > now()) ORDER BY n.debute_le`, [id])).rows;
});

app.get('/actualites', async (req, reply) => {
  // Carte 160, 23 nov. 2026 : lecture seule. La notification
  // des actualités programmées est sortie de cette route vers la
  // tâche de fond notifierActualitesProgrammeesDues, au démarrage
  // et toutes les heures. Aucune écriture en base lors d'une
  // lecture. ETag, condensé du contenu renvoyé : quand le client
  // renvoie le même dans If-None-Match, 304 sans corps.
  const { etablissement_id } = z.object({ etablissement_id: z.string().uuid().optional() }).parse(req.query);
  const lignes = (
    await q(
      `SELECT id, etablissement_id, titre, texte, image_id, publiee_le FROM actualites
       WHERE ($1::uuid IS NULL OR etablissement_id = $1) AND (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC LIMIT 100`,
      [etablissement_id ?? null],
    )
  ).rows;
  const etag = etagPourContenu(lignes);
  if (etagCorrespond(req, etag)) return reply.code(304).send();
  return reply.header('ETag', etag).header('Cache-Control', 'public, max-age=60').send(lignes);
});

// Dates, lieu, tarif NULL = « À confirmer » côté application.
// Sécurité, 22 nov. 2026 : salle_visio ne sort plus ici, la
// route publique ne sert plus le nom de salle Jitsi. Il se
// lit par la route authentifiée /evenements/:id/salle-visio,
// pour les inscrits seulement.
app.get('/evenements', async () =>
  (
    await q(
      'SELECT evenements.id, evenements.type, evenements.nom, evenements.date_debut, evenements.date_fin, evenements.dates_texte, evenements.description, evenements.lieu, evenements.pays, evenements.tarif_fcfa, evenements.image_id, evenements.est_kairos, evenements.heure_debut, evenements.nombre_places, evenements.etablissement_id, e.nom AS etablissement_nom, (SELECT COUNT(*)::int FROM inscriptions i WHERE i.evenement_id = evenements.id) AS inscrits FROM evenements LEFT JOIN etablissements e ON e.id = evenements.etablissement_id WHERE evenements.publie ORDER BY date_debut NULLS LAST, nom',
    )
  ).rows);

// Nom de salle Jitsi d'un événement, 22 nov. 2026 : membre
// inscrit ou parent validé d'un inscrit, jamais un visiteur.
// Sans salle, 404, comme sans inscription, sans révéler
// laquelle des deux manque.
app.get('/evenements/:id/salle-visio', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const evenement = (await q('SELECT id, salle_visio FROM evenements WHERE id = $1 AND publie', [id])).rows[0];
  if (!evenement) throw httpError(404, 'Événement introuvable.');
  if (!(await peutVoirChronogramme(req, id))) throw httpError(403, 'La salle en ligne est réservée aux inscrits.');
  if (!evenement.salle_visio) throw httpError(404, 'Aucune salle en ligne pour cet événement.');
  return { evenement_id: evenement.id, salle_visio: evenement.salle_visio };
});

// Le contact n'est renvoyé qu'avec l'accord de la personne.
app.get('/bureau', async (req) => {
  const etablissementId = typeof req.query?.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null;
  return (await q('SELECT b.nom, b.fonction, CASE WHEN b.contact_public THEN b.contact END AS contact, e.nom AS etablissement FROM bureau_membres b LEFT JOIN etablissements e ON e.id = b.etablissement_id WHERE ($1::uuid IS NULL OR b.etablissement_id = $1) ORDER BY b.ordre, b.nom', [etablissementId])).rows;
});

app.get('/enseignements', async () =>
  (await q(`SELECT id, titre, orateur, description, thematique, format, categorie, duree, date_texte, audio_id, lien_audio, publie_le,
                   (SELECT COUNT(*) FROM amens WHERE cible_type = 'enseignement' AND cible_id = enseignements.id::text) AS amens
            FROM enseignements WHERE publie ORDER BY publie_le DESC`)).rows);

// Sélections audio de Parole vivante, T13, 26 nov. 2026 :
// catalogue public en lecture seule, comme les enseignements.
// Aucune écriture en base lors d'une lecture.
app.get('/selections-audio', async () =>
  (await q(`SELECT id, titre, description, audio_ids, ordre, cree_le FROM selections_audio ORDER BY ordre, cree_le`)).rows);

// Annonces audio, 29 oct. 2026 : seules les annonces actives, les
// plus récentes d'abord. L'état d'écoute d'un membre n'est jamais
// enregistré ici : il reste local sur son appareil. Correction de
// suivi, 27 nov. 2026 : une annonce publiée pour un établissement
// ne se voit que par ses membres, comme les documents ; une
// annonce pour toute la structure se voit par tous.
app.get('/annonces-audio', { preHandler: membreG }, async (req) => {
  if (req.user.role === 'admin_general') {
    return (await q('SELECT id, titre, texte, audio_id, lien_audio, publiee_le, etablissement_id FROM annonces_audio WHERE actif AND (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC, id DESC')).rows;
  }
  const m = req.user.mid ? (await q('SELECT etablissement_id FROM membres WHERE id = $1', [req.user.mid])).rows[0] : null;
  const eid = m?.etablissement_id ?? null;
  return (await q('SELECT id, titre, texte, audio_id, lien_audio, publiee_le, etablissement_id FROM annonces_audio WHERE actif AND (programmee_le IS NULL OR programmee_le <= now()) AND (etablissement_id IS NULL OR etablissement_id = $1) ORDER BY publiee_le DESC, id DESC', [eid])).rows;
});

// Catalogue : le fichier du livre n'apparaît JAMAIS ici.
app.get('/livres', async () =>
  (await q('SELECT id, titre, auteur, description, prix_fcfa, format, categorie, couverture_id, cree_le FROM livres WHERE publie ORDER BY titre')).rows);

// Documents institutionnels, 1er nov. 2026, version 1 : titre et lien
// ou fichier téléversé par le mécanisme /admin/fichiers existant.
// Visibilité : toute la communauté quand etablissement_id est nul,
// sinon seuls les membres de cet établissement, et l'administrateur
// général qui voit tout. Un administrateur d'établissement ne publie
// que pour son établissement, jamais pour toute la communauté.
app.get('/documents', { preHandler: membreG }, async (req) => {
  if (req.user.role === 'admin_general') {
    return (await q(`SELECT d.id, d.titre, d.lien, d.fichier_id, d.etablissement_id, e.nom AS etablissement, d.publie_le, f.type_mime_reel AS mime, f.nom_original AS nom_fichier FROM documents d LEFT JOIN etablissements e ON e.id = d.etablissement_id LEFT JOIN fichiers f ON f.id = d.fichier_id ORDER BY d.publie_le DESC`)).rows;
  }
  const m = req.user.mid ? (await q('SELECT etablissement_id FROM membres WHERE id = $1', [req.user.mid])).rows[0] : null;
  const eid = m?.etablissement_id ?? null;
  return (await q(`SELECT d.id, d.titre, d.lien, d.fichier_id, d.etablissement_id, e.nom AS etablissement, d.publie_le, f.type_mime_reel AS mime, f.nom_original AS nom_fichier FROM documents d LEFT JOIN etablissements e ON e.id = d.etablissement_id LEFT JOIN fichiers f ON f.id = d.fichier_id WHERE d.etablissement_id IS NULL OR d.etablissement_id = $1 ORDER BY d.publie_le DESC`, [eid])).rows;
});

app.post('/admin/documents', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const body = z.object({
    titre: z.string().trim().min(1).max(200).transform(texteMajuscules),
    lien: z.string().trim().max(500).optional().nullable(),
    fichier_id: z.string().uuid().optional().nullable(),
    etablissement_id: z.string().uuid().optional().nullable(),
  }).parse(req.body ?? {});
  const lien = (body.lien ?? '').trim();
  if (lien && !/^https?:\/\//.test(lien)) throw httpError(400, 'Le lien doit commencer par http:// ou https://.');
  if (!lien && !body.fichier_id) throw httpError(400, 'Un lien ou un fichier est requis.');
  if (body.fichier_id) {
    const f = (await q('SELECT id FROM fichiers WHERE id = $1 AND verifie', [body.fichier_id])).rows[0];
    if (!f) throw httpError(404, 'Fichier introuvable.');
  }
  let eid = body.etablissement_id ?? null;
  if (eid) {
    const e = (await q('SELECT id FROM etablissements WHERE id = $1', [eid])).rows[0];
    if (!e) throw httpError(404, 'Établissement introuvable.');
  }
  if (req.user.role === 'admin_etablissement') {
    // L'application n'envoie pas l'établissement pour un administrateur
    // d'établissement : le serveur impose le sien, jamais un autre.
    if (eid && eid !== req.user.eid) throw httpError(403, 'Un administrateur d’établissement ne publie que pour son établissement.');
    eid = req.user.eid ?? null;
    if (!eid) throw httpError(403, 'Aucun établissement rattaché à ce compte administrateur.');
  }
  const row = (await q(`INSERT INTO documents (titre, lien, fichier_id, etablissement_id, cree_par) VALUES ($1,$2,$3,$4,$5) RETURNING id, titre, lien, fichier_id, etablissement_id, publie_le`, [body.titre, lien || null, body.fichier_id ?? null, eid, req.user.sub])).rows[0];
  await audit(pool, req, 'document.publie', 'documents', row.id, { titre: row.titre, etablissement_id: eid });
  return reply.code(201).send(row);
});

app.delete('/admin/documents/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const doc = (await q('SELECT id, etablissement_id FROM documents WHERE id = $1', [id])).rows[0];
  if (!doc) throw httpError(404, 'Document introuvable.');
  if (req.user.role === 'admin_etablissement' && doc.etablissement_id !== req.user.eid) throw httpError(403, 'Ce document n’appartient pas à votre établissement.');
  await q('DELETE FROM documents WHERE id = $1', [id]);
  await audit(pool, req, 'document.supprime', 'documents', id, {});
  return { ok: true };
});

app.get('/documents/:id/fichier', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const doc = (await q('SELECT d.fichier_id, d.etablissement_id, d.titre, f.donnees, f.type_mime_reel, f.nom_original FROM documents d LEFT JOIN fichiers f ON f.id = d.fichier_id WHERE d.id = $1 AND f.verifie', [id])).rows[0];
  if (!doc || !doc.fichier_id) throw httpError(404, 'Aucun fichier pour ce document.');
  if (req.user.role !== 'admin_general' && doc.etablissement_id) {
    const m = req.user.mid ? (await q('SELECT etablissement_id FROM membres WHERE id = $1', [req.user.mid])).rows[0] : null;
    // Sécurité, 22 nov. 2026 : motif 404 unique, jamais 403,
    // pour ne pas révéler l'existence du document ni son périmètre.
    if (!m || m.etablissement_id !== doc.etablissement_id) throw httpError(404, 'Aucun fichier pour ce document.');
  }
  reply.header('Cache-Control', 'private, no-store');
  if (doc.donnees) return sendBuffer(req, reply, doc.donnees, doc.type_mime_reel, { inline: true, filename: doc.nom_original || doc.titre });
  throw httpError(404, 'Fichier indisponible.');
});

// Rapports journaliers d'activité, 2 nov. 2026, tranche 1, carte blanche
// d'Axel : un seul formulaire rempli sur place par le secrétaire,
// avec offrande, dépenses et section incident. Règles dures :
// - lecture, création et modification réservées aux administrateurs
//   (contenuG), périmètre strict par établissement ;
// - validation réservée à l'administrateur général (adminG) ;
// - après validation, modification toujours possible par un
//   administrateur du périmètre, journalisée, mais jamais de
//   suppression, comme les paiements : il n'existe donc aucune
//   route DELETE ici, volontairement ;
// - l'incident n'est jamais exposé aux simples membres : toutes ces
//   routes sont en contenuG, et le journal d'audit ne reprend jamais
//   le contenu de l'incident, seulement son existence ;
// - activite_id ne porte pas de clé étrangère : il peut désigner un
//   événement (camp, réunion) ou une activité d'établissement.
// Remplissage automatique : quand le nombre de participants ou la
// liste des présents est absent (null) et qu'une activité est liée,
// le serveur compte les présences scannées avec le statut present
// pour cette activité, dans le périmètre de l'appelant. Un nombre
// envoyé explicitement, même 0, gagne toujours sur le calcul.
const RAPPORT_SELECT = `SELECT r.*, e.nom AS etablissement, m.nom_complet AS auteur_nom FROM rapports_activite r LEFT JOIN etablissements e ON e.id = r.etablissement_id LEFT JOIN membres m ON m.utilisateur_id = r.cree_par`;

const rapportCorps = z.object({
  date_rapport: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  lieu: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),
  activite_id: z.string().uuid().optional().nullable(),
  activite_nom: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),
  orateur: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),
  theme: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),
  nombre_participants: z.number().int().min(0).max(100000).optional().nullable(),
  presents: z.array(z.object({ membre_id: z.string().uuid(), nom_complet: z.string().trim().max(200).transform(texteMajuscules), matricule: z.string().trim().max(50).optional().nullable() })).max(1000).optional().nullable(),
  offrande_montant: z.number().int().min(0).max(1000000000).optional().nullable(),
  offrande_moyen: z.enum(['especes', 'wave', 'orange']).optional().nullable(),
  offrande_compte_par: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),
  depenses: z.array(z.object({ libelle: z.string().trim().min(1).max(200).transform(texteMajuscules), montant: z.number().int().min(0).max(1000000000), categorie: z.enum(['transport', 'materiel', 'autre']) })).max(200).optional().nullable(),
  observations: z.string().trim().max(5000).optional().nullable(),
  incident_type: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),
  incident_description: z.string().trim().max(5000).optional().nullable(),
  incident_personnes: z.string().trim().max(1000).transform(texteMajuscules).optional().nullable(),
  incident_action: z.string().trim().max(2000).optional().nullable(),
  incident_suivi: z.string().trim().max(2000).optional().nullable(),
  etablissement_id: z.string().uuid().optional().nullable(),
});

async function rapportPresencesScannees(activite, perimetre) {
  if (!activite) return { nombre: null, presents: null };
  const inclureSans = perimetre != null && activite.type === 'evenement';
  const rows = (await q(
    `SELECT m.id AS membre_id, m.nom_complet, m.matricule FROM presences p JOIN membres m ON m.id = p.membre_id WHERE p.activite_id = $1 AND p.statut = 'present' AND ($2::uuid IS NULL OR m.etablissement_id = $2 OR ($3::boolean AND m.etablissement_id IS NULL)) ORDER BY m.nom_complet`,
    [activite.id, perimetre, inclureSans],
  )).rows;
  return { nombre: rows.length, presents: rows };
}

async function rapportParId(id) {
  return (await q(`${RAPPORT_SELECT} WHERE r.id = $1`, [id])).rows[0] ?? null;
}

function rapportPerimetre(req) {
  return req.user.role === 'admin_etablissement' ? req.user.eid : null;
}

function rapportControle(row, req) {
  if (!row) throw httpError(404, 'Rapport introuvable.');
  const perimetre = rapportPerimetre(req);
  if (perimetre != null && row.etablissement_id !== perimetre) throw httpError(403, 'Ce rapport n’appartient pas à votre établissement.');
  return row;
}

app.get('/admin/rapports-activite', { preHandler: contenuG }, async (req) => {
  const mois = typeof req.query.mois === 'string' && /^\d{4}-\d{2}$/.test(req.query.mois) ? req.query.mois : null;
  const demande = typeof req.query.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null;
  const filtre = rapportPerimetre(req) ?? demande;
  return (await q(
    `${RAPPORT_SELECT} WHERE to_char(r.date_rapport, 'YYYY-MM') = COALESCE($1, to_char(CURRENT_DATE, 'YYYY-MM')) AND ($2::uuid IS NULL OR r.etablissement_id = $2) ORDER BY r.date_rapport DESC, r.cree_le DESC`,
    [mois, filtre],
  )).rows;
});

app.get('/admin/rapports-activite/:id', { preHandler: contenuG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  return rapportControle(await rapportParId(id), req);
});

app.post('/admin/rapports-activite', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const b = rapportCorps.parse(req.body ?? {});
  const perimetre = rapportPerimetre(req);
  let eid = b.etablissement_id ?? null;
  if (perimetre != null) {
    if (eid && eid !== perimetre) throw httpError(403, 'Un administrateur d’établissement ne crée un rapport que pour son établissement.');
    eid = perimetre;
    if (!eid) throw httpError(403, 'Aucun établissement rattaché à ce compte administrateur.');
  } else if (eid) {
    const e = (await q('SELECT id FROM etablissements WHERE id = $1', [eid])).rows[0];
    if (!e) throw httpError(404, 'Établissement introuvable.');
  }
  let activite = null;
  if (b.activite_id) {
    activite = await resolveActivite(b.activite_id);
    if (!activite) throw httpError(404, 'Activité introuvable.');
    if (perimetre != null && activite.type === 'activite_etablissement' && activite.etablissement_id !== perimetre) throw httpError(403, 'Cette activité n’appartient pas à votre établissement.');
  }
  const scan = (b.nombre_participants == null || b.presents == null) ? await rapportPresencesScannees(activite, perimetre) : { nombre: null, presents: null };
  const row = (await q(
    `INSERT INTO rapports_activite (date_rapport, lieu, activite_id, activite_nom, activite_type, orateur, theme, nombre_participants, presents, offrande_montant, offrande_moyen, offrande_compte_par, depenses, observations, incident_type, incident_description, incident_personnes, incident_action, incident_suivi, etablissement_id, cree_par)
     VALUES (COALESCE($1::date, CURRENT_DATE), $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12, $13::jsonb, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING id`,
    [b.date_rapport ?? null, b.lieu ?? null, b.activite_id ?? null, (b.activite_nom ?? '').trim() || activite?.nom || null, activite?.type ?? 'libre', b.orateur ?? null, b.theme ?? null, b.nombre_participants ?? scan.nombre, JSON.stringify(b.presents ?? scan.presents ?? []), b.offrande_montant ?? 0, b.offrande_moyen ?? null, b.offrande_compte_par ?? null, JSON.stringify(b.depenses ?? []), b.observations ?? null, b.incident_type ?? null, b.incident_description ?? null, b.incident_personnes ?? null, b.incident_action ?? null, b.incident_suivi ?? null, eid, req.user.sub],
  )).rows[0];
  const complet = await rapportParId(row.id);
  await audit(pool, req, 'rapport_activite.cree', 'rapports_activite', row.id, { etablissement_id: eid, date_rapport: complet.date_rapport, statut: 'brouillon', incident: !!complet.incident_type });
  return reply.code(201).send(complet);
});

app.put('/admin/rapports-activite/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = rapportCorps.parse(req.body ?? {});
  const perimetre = rapportPerimetre(req);
  const ancien = rapportControle(await rapportParId(id), req);
  let eid = ancien.etablissement_id;
  if (b.etablissement_id !== undefined) {
    if (perimetre != null && b.etablissement_id !== perimetre) throw httpError(403, 'Un administrateur d’établissement ne déplace pas un rapport hors de son établissement.');
    if (b.etablissement_id) {
      const e = (await q('SELECT id FROM etablissements WHERE id = $1', [b.etablissement_id])).rows[0];
      if (!e) throw httpError(404, 'Établissement introuvable.');
    }
    eid = b.etablissement_id;
  }
  let activite = null;
  let activiteChange = false;
  if (b.activite_id !== undefined) {
    activiteChange = true;
    if (b.activite_id) {
      activite = await resolveActivite(b.activite_id);
      if (!activite) throw httpError(404, 'Activité introuvable.');
      if (perimetre != null && activite.type === 'activite_etablissement' && activite.etablissement_id !== perimetre) throw httpError(403, 'Cette activité n’appartient pas à votre établissement.');
    }
  } else if (ancien.activite_id) {
    activite = await resolveActivite(ancien.activite_id);
  }
  const scan = (b.nombre_participants == null || b.presents == null) ? await rapportPresencesScannees(activite, perimetre) : { nombre: null, presents: null };
  const nombre = b.nombre_participants ?? (activite ? scan.nombre : ancien.nombre_participants);
  const presents = b.presents ?? (activite ? scan.presents : ancien.presents);
  await q(
    `UPDATE rapports_activite SET date_rapport = COALESCE($1::date, date_rapport), lieu = $2, activite_id = $3, activite_nom = $4, activite_type = $5, orateur = $6, theme = $7, nombre_participants = $8, presents = $9::jsonb, offrande_montant = $10, offrande_moyen = $11, offrande_compte_par = $12, depenses = $13::jsonb, observations = $14, incident_type = $15, incident_description = $16, incident_personnes = $17, incident_action = $18, incident_suivi = $19, etablissement_id = $20, modifie_le = now() WHERE id = $21`,
    [b.date_rapport ?? null, b.lieu !== undefined ? b.lieu : ancien.lieu, activiteChange ? (b.activite_id ?? null) : ancien.activite_id, b.activite_nom !== undefined ? ((b.activite_nom ?? '').trim() || activite?.nom || null) : ancien.activite_nom, activiteChange ? (activite?.type ?? 'libre') : ancien.activite_type, b.orateur !== undefined ? b.orateur : ancien.orateur, b.theme !== undefined ? b.theme : ancien.theme, nombre ?? ancien.nombre_participants, JSON.stringify(presents ?? []), b.offrande_montant !== undefined ? b.offrande_montant : ancien.offrande_montant, b.offrande_moyen !== undefined ? b.offrande_moyen : ancien.offrande_moyen, b.offrande_compte_par !== undefined ? b.offrande_compte_par : ancien.offrande_compte_par, JSON.stringify(b.depenses !== undefined ? b.depenses : ancien.depenses ?? []), b.observations !== undefined ? b.observations : ancien.observations, b.incident_type !== undefined ? b.incident_type : ancien.incident_type, b.incident_description !== undefined ? b.incident_description : ancien.incident_description, b.incident_personnes !== undefined ? b.incident_personnes : ancien.incident_personnes, b.incident_action !== undefined ? b.incident_action : ancien.incident_action, b.incident_suivi !== undefined ? b.incident_suivi : ancien.incident_suivi, eid, id],
  );
  const complet = await rapportParId(id);
  await audit(pool, req, 'rapport_activite.modifie', 'rapports_activite', id, { etablissement_id: eid, date_rapport: complet.date_rapport, statut: complet.statut, incident: !!complet.incident_type });
  return complet;
});

app.post('/admin/rapports-activite/:id/valider', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ancien = await rapportParId(id);
  if (!ancien) throw httpError(404, 'Rapport introuvable.');
  if (ancien.statut !== 'valide') {
    await q(`UPDATE rapports_activite SET statut = 'valide', valide_par = $2, valide_le = now(), modifie_le = now() WHERE id = $1`, [id, req.user.sub]);
    await audit(pool, req, 'rapport_activite.valide', 'rapports_activite', id, { etablissement_id: ancien.etablissement_id, date_rapport: ancien.date_rapport, incident: !!ancien.incident_type });
  }
  return rapportParId(id);
});


// ───────────────────────── Comptabilité mensuelle, 2 nov. 2026,
// tranche 1 des 7 propositions validées par Axel ─────────────────────────
// Synthèse pour la trésorerie, pas une copie des exports complets
// ni de l'export des rapports : totaux du mois, ventilation par
// catégorie, et lignes de détail, une par source. Règles dures :
// - lecture réservée aux administrateurs, garde contenuG ;
// - périmètre serveur strict : un administrateur d'établissement
//   est forcé à son établissement, même s'il en envoie un autre,
//   et un administrateur d'établissement sans établissement
//   rattaché ne voit aucune ligne, jamais toutes ;
// - seuls comptent dans les totaux officiels les rapports au
//   statut valide et les paiements au statut confirme, plus les
//   cotisations enregistrées par la structure ; les rapports
//   brouillon sont renvoyés à part, hors totaux officiels ;
// - les paiements passent par la jointure avec membres pour le
//   périmètre, car paiements n'a pas d'établissement direct ;
// - une cotisation enregistrée et un paiement de cotisation
//   confirmé pour le même membre et le même mois restent deux
//   lignes distinctes, jamais fusionnées, avec un compteur de
//   doublons possibles, sans trancher seul ;
// - aucune donnée d'incident, médicale, de prière, de secret, ni
//   d'identifiant de paiement sensible n'est renvoyée ; aucune
//   route de paiement ni règle de validation n'est changée ici.
// Lecture de la comptabilité d'un mois, correction de suivi
// 27 nov. 2026 : extraite de GET /admin/comptabilite pour
// servir aussi la route groupée GET /admin/tableau-de-bord,
// sans dupliquer la lecture. Mêmes données, même périmètre,
// mois courant et sans filtre d'établissement quand les
// paramètres sont nuls.
async function lireComptabilite(req, moisDemande, etabDemande) {
  const mois = moisDemande ?? (await q(`SELECT to_char(CURRENT_DATE, 'YYYY-MM') AS mois`)).rows[0].mois;
  const totauxVides = { entrees: 0, depenses: 0, solde: 0, offrandes_validees: 0, depenses_validees: 0, paiements_confirmes: 0, cotisations_enregistrees: 0, brouillon_offrandes: 0, brouillon_depenses: 0 };
  const parCategorieVide = { don: 0, achat: 0, carte: 0, cotisation: 0, camp: 0, offrande: 0, depense: 0, cotisation_enregistree: 0 };
  if (req.user.role === 'admin_etablissement' && !req.user.eid) {
    return { mois, etablissement_id: null, etablissement: null, totaux: totauxVides, par_categorie: parCategorieVide, doublons_cotisation_possibles: 0, lignes: [], brouillon_lignes: [] };
  }
  const filtre = req.user.role === 'admin_etablissement' ? req.user.eid : etabDemande;
  const debut = `${mois}-01`;
  const dateTexte = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? '').slice(0, 10));
  // Carte 126 tranche 3 : un trésorier d'activité ne voit que les
  // paiements de son activité. Les rapports et les cotisations n'ont
  // pas d'activité, ils sont vides pour lui, jamais filtrés en silence.
  // Carte 126 tranche 4 : un paiement de camp sans evenement_id
  // se rattache par les inscriptions du membre effectif.
  const porteeNomination = await activitesPourPermission(req, 'finances.lire');
  const rapports = porteeNomination === null ? (await q(
    `SELECT r.id, r.date_rapport, r.activite_nom, r.offrande_montant, r.depenses, r.statut, r.cree_le, e.nom AS etablissement FROM rapports_activite r LEFT JOIN etablissements e ON e.id = r.etablissement_id WHERE to_char(r.date_rapport, 'YYYY-MM') = $1 AND ($2::uuid IS NULL OR r.etablissement_id = $2) ORDER BY r.date_rapport DESC, r.cree_le DESC`,
    [mois, filtre],
  )).rows : [];
  const paiements = (await q(
    `SELECT p.id, p.reference, p.type, p.montant_fcfa, p.statut, p.moyen, p.confirme_le, p.evenement_id, m.nom_complet, m.matricule, e.nom AS etablissement, ev.nom AS camp_nom FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id LEFT JOIN etablissements e ON e.id = m.etablissement_id LEFT JOIN evenements ev ON ev.id = p.evenement_id WHERE p.statut = 'confirme' AND to_char(p.confirme_le, 'YYYY-MM') = $1 AND ($2::uuid IS NULL OR m.etablissement_id = $2) AND ($3::uuid[] IS NULL OR p.evenement_id = ANY($3::uuid[]) OR (p.type = 'camp' AND EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = (CASE WHEN p.beneficiaire_contact IS NOT NULL THEN p.beneficiaire_id ELSE p.membre_id END) AND i.evenement_id = ANY($3::uuid[])))) ORDER BY p.confirme_le DESC`,
    [mois, filtre, porteeNomination],
  )).rows;
  const cotisations = porteeNomination === null ? (await q(
    `SELECT c.id, c.mois, c.montant_fcfa, c.moyen, c.cree_le, m.nom_complet, m.matricule, e.nom AS etablissement FROM cotisations c JOIN membres m ON m.id = c.membre_id LEFT JOIN etablissements e ON e.id = m.etablissement_id WHERE c.mois = $1::date AND ($2::uuid IS NULL OR m.etablissement_id = $2) ORDER BY c.cree_le DESC`,
    [debut, filtre],
  )).rows : [];
  const doublons = porteeNomination === null ? (await q(
    `SELECT COUNT(*)::int AS n FROM (SELECT c.membre_id FROM cotisations c JOIN membres m ON m.id = c.membre_id JOIN paiements p ON p.membre_id = c.membre_id WHERE c.mois = $2::date AND p.type = 'cotisation' AND p.statut = 'confirme' AND to_char(p.confirme_le, 'YYYY-MM') = $1 AND ($3::uuid IS NULL OR m.etablissement_id = $3) GROUP BY c.membre_id) s`,
    [mois, debut, filtre],
  )).rows[0]?.n ?? 0 : 0;
  const etabNom = filtre ? (await q('SELECT nom FROM etablissements WHERE id = $1', [filtre])).rows[0]?.nom ?? null : null;
  const lignes = [];
  const brouillonLignes = [];
  const totaux = { ...totauxVides };
  const parCategorie = { ...parCategorieVide };
  const typeLibelle = { don: 'Don', achat: 'Achat', carte: 'Carte', cotisation: 'Cotisation', camp: 'Camp' };
  for (const r of rapports) {
    const valide = r.statut === 'valide';
    const cible = valide ? lignes : brouillonLignes;
    const reference = valide ? 'Validé' : 'Brouillon';
    const activite = (r.activite_nom || '').trim() || 'Activité libre';
    const offrande = Number(r.offrande_montant) || 0;
    if (offrande > 0) {
      cible.push({ date: dateTexte(r.date_rapport), categorie: 'offrande', libelle: activite, source: valide ? 'rapport_valide' : 'rapport_brouillon', etablissement: r.etablissement || '', montant_fcfa: offrande, reference });
      if (valide) { totaux.offrandes_validees += offrande; parCategorie.offrande += offrande; } else { totaux.brouillon_offrandes += offrande; }
    }
    const depenses = Array.isArray(r.depenses) ? r.depenses : [];
    for (const d of depenses) {
      const montant = Number(d?.montant) || 0;
      if (montant <= 0) continue;
      cible.push({ date: dateTexte(r.date_rapport), categorie: 'depense', libelle: (d?.libelle || 'Dépense').toString(), source: valide ? 'rapport_valide' : 'rapport_brouillon', etablissement: r.etablissement || '', montant_fcfa: montant, reference });
      if (valide) { totaux.depenses_validees += montant; parCategorie.depense += montant; } else { totaux.brouillon_depenses += montant; }
    }
  }
  for (const p of paiements) {
    const montant = Number(p.montant_fcfa) || 0;
    const membre = [p.nom_complet, p.matricule].filter(Boolean).join(' ');
    const libelle = p.type === 'camp' ? (p.camp_nom ? `Camp ${p.camp_nom}` : 'Camp') + (membre ? ` · ${membre}` : '') : `${typeLibelle[p.type] || p.type}${membre ? ` · ${membre}` : ''}`;
    lignes.push({ date: dateTexte(p.confirme_le), categorie: p.type, libelle, source: 'paiement', etablissement: p.etablissement || '', montant_fcfa: montant, reference: p.reference || '' });
    totaux.paiements_confirmes += montant;
    if (Object.prototype.hasOwnProperty.call(parCategorie, p.type)) parCategorie[p.type] += montant;
  }
  for (const c of cotisations) {
    const montant = Number(c.montant_fcfa) || 0;
    const membre = [c.nom_complet, c.matricule].filter(Boolean).join(' ');
    lignes.push({ date: dateTexte(c.mois), categorie: 'cotisation', libelle: `Cotisation${membre ? ` · ${membre}` : ''}${c.moyen ? ` · ${c.moyen}` : ''}`, source: 'cotisation', etablissement: c.etablissement || '', montant_fcfa: montant, reference: 'Enregistrée' });
    totaux.cotisations_enregistrees += montant;
    parCategorie.cotisation_enregistree += montant;
  }
  const triLignes = (a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : (a.libelle < b.libelle ? -1 : a.libelle > b.libelle ? 1 : 0));
  lignes.sort(triLignes);
  brouillonLignes.sort(triLignes);
  totaux.entrees = totaux.offrandes_validees + totaux.paiements_confirmes + totaux.cotisations_enregistrees;
  totaux.depenses = totaux.depenses_validees;
  totaux.solde = totaux.entrees - totaux.depenses;
  return { mois, etablissement_id: filtre, etablissement: etabNom, totaux, par_categorie: parCategorie, doublons_cotisation_possibles: doublons, lignes, brouillon_lignes: brouillonLignes };
}

app.get('/admin/comptabilite', { preHandler: contenuG }, async (req) => {
  const moisDemande = typeof req.query.mois === 'string' ? req.query.mois : null;
  if (moisDemande && !/^\d{4}-(0[1-9]|1[0-2])$/.test(moisDemande)) throw httpError(400, 'Mois invalide, format attendu AAAA-MM.');
  const etabDemande = typeof req.query.etablissement_id === 'string' && req.query.etablissement_id !== '' ? req.query.etablissement_id : null;
  if (etabDemande && !/^[0-9a-f-]{36}$/i.test(etabDemande)) throw httpError(400, 'Établissement invalide.');
  return lireComptabilite(req, moisDemande, etabDemande);
});

// Tableau de bord administrateur, correction de suivi
// 27 nov. 2026 : UNE seule lecture groupée remplace les 6
// lectures séquentielles du client, qui se faisaient 429 en
// rafale (limite 120/min par IP) et laissaient des « — ».
// La réponse porte les 6 chiffres et la comptabilité du mois
// en cours, donc le Flux financier, dans le même appel.
// Mêmes périmètres que les routes séparées : l'administrateur
// d'établissement ne voit que son établissement, la portée
// nomination s'applique comme sur les listes. Aucune écriture,
// que des comptes.
app.get('/admin/tableau-de-bord', { preHandler: contenuG }, async (req) => {
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const [comptabilite, membres, presences, cotisations, prochain, liens, demandes, etablissements] = await Promise.all([
    lireComptabilite(req, null, null),
    q(
      `SELECT COUNT(*)::int AS n FROM membres m
       WHERE ($1::uuid IS NULL OR m.etablissement_id = $1)
         AND ($2::uuid[] IS NULL OR EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = m.id AND i.evenement_id = ANY($2::uuid[])))`,
      [perimetre, await activitesPourPermission(req, 'camp.lire')],
    ).then((r) => r.rows[0].n),
    q(
      `SELECT COUNT(*)::int AS n FROM presences p JOIN membres m ON m.id = p.membre_id
       WHERE ($1::uuid IS NULL OR m.etablissement_id = $1)
         AND p.scanne_le >= date_trunc('month', now()) AND p.scanne_le < date_trunc('month', now()) + interval '1 month'`,
      [perimetre],
    ).then((r) => r.rows[0].n),
    q(
      `SELECT COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'confirme'), 0)::int AS total FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
       WHERE p.type = 'cotisation' AND ($1::uuid IS NULL OR m.etablissement_id = $1)
         AND ($2::uuid[] IS NULL OR p.evenement_id = ANY($2::uuid[]) OR (p.type = 'camp' AND EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = (CASE WHEN p.beneficiaire_contact IS NOT NULL THEN p.beneficiaire_id ELSE p.membre_id END) AND i.evenement_id = ANY($2::uuid[]))))`,
      [perimetre, await activitesPourPermission(req, 'finances.lire')],
    ).then((r) => r.rows[0].total),
    (async () => {
      const avenir = (await q(`SELECT id FROM evenements WHERE date_debut IS NULL OR date_debut >= now() ORDER BY COALESCE(date_debut, '2100-01-01') ASC LIMIT 1`)).rows[0];
      if (avenir) return avenir.id;
      return (await q(`SELECT id FROM evenements ORDER BY COALESCE(date_debut, '2000-01-01') DESC LIMIT 1`)).rows[0]?.id ?? null;
    })(),
    req.user.role === 'admin_etablissement' && !req.user.eid
      ? Promise.resolve(0)
      : q(
          `SELECT COUNT(*)::int AS n FROM liens_parent_enfant l JOIN membres e ON e.id = l.enfant_membre_id
       WHERE l.statut = 'en_attente' AND ($1::uuid IS NULL OR e.etablissement_id = $1)`,
          [perimetre],
        ).then((r) => r.rows[0].n),
    // Demandes de prière en attente : le serveur ne connaît
    // pas « en_attente » pour les prières, seulement « ouvert »,
    // « en cours » et « exaucée ». L'ancien comptage client
    // cherchait « en_attente » et ne comptait donc jamais les
    // prières. « Ouvert » est l'équivalent : rien n'a encore
    // été pris en charge par le Bureau.
    q(
      `SELECT COUNT(*)::int AS n FROM demandes_priere d LEFT JOIN membres m ON m.id = d.membre_id
       WHERE d.statut = 'ouvert' AND ($1::text = 'admin_general' OR m.etablissement_id = $2)`,
      [req.user.role, req.user.eid ?? null],
    ).then((r) => r.rows[0].n),
    q(`SELECT COUNT(*)::int AS n FROM etablissements`).then((r) => r.rows[0].n),
  ]);
  const inscriptions = prochain
    ? (await q(
        `SELECT COUNT(*)::int AS n FROM inscriptions i LEFT JOIN membres m ON m.id = i.membre_id LEFT JOIN personnes_externes pe ON pe.id = i.personne_externe_id
         WHERE i.evenement_id = $1 AND ($2::uuid IS NULL OR COALESCE(m.etablissement_id, pe.etablissement_id) = $2 OR ($3::boolean AND COALESCE(m.etablissement_id, pe.etablissement_id) IS NULL))`,
        [prochain, perimetre, req.user.role === 'admin_etablissement'],
      )).rows[0].n
    : 0;
  return {
    chiffres: {
      membres,
      presences,
      cotisations,
      inscriptions,
      demandes: liens + demandes,
      etablissements,
    },
    comptabilite,
  };
});


// ───────────────────────── Département scolaire, 2 nov. 2026,
// tranche 2, carte blanche ─────────────────────────
// Une ligne par membre et par année scolaire, avec une moyenne par
// trimestre de 0 à 20, classe d'examen et résultat en option. La
// moyenne annuelle n'est calculée que quand les trois trimestres
// sont renseignés. Saisie et modification réservées aux
// administrateurs, avec périmètre par établissement ; un membre ne
// voit que ses propres moyennes, par la route /moi dédiée, et ne
// peut jamais en modifier une. Les moyennes ne figurent jamais
// dans les détails du journal d'audit. Aucune route de
// suppression : une fiche erronée se corrige par modification.
const SCOLAIRE_CLASSES = ['CP1', 'CP2', 'CE1', 'CE2', 'CM1', 'CM2', '6e', '5e', '4e', '3e', '2nde', '1ère', 'Terminale', 'Université', 'Formation professionnelle', 'Autre'];
const SCOLAIRE_SELECT = `SELECT s.*, COALESCE(m.nom_complet, pe.nom_complet) AS membre_nom, m.matricule, COALESCE(m.fonction, pe.fonction) AS membre_fonction, e.nom AS etablissement, CASE WHEN s.moyenne_t1 IS NOT NULL AND s.moyenne_t2 IS NOT NULL AND s.moyenne_t3 IS NOT NULL THEN ROUND((s.moyenne_t1 + s.moyenne_t2 + s.moyenne_t3) / 3, 2) ELSE NULL END AS moyenne_annuelle FROM suivis_scolaires s LEFT JOIN membres m ON m.id = s.membre_id LEFT JOIN personnes_externes pe ON pe.id = s.personne_externe_id LEFT JOIN etablissements e ON e.id = s.etablissement_id`;

async function suiviScolaireParId(id) {
  return (await q(`${SCOLAIRE_SELECT} WHERE s.id = $1`, [id])).rows[0] ?? null;
}

function suiviScolaireControle(row, req) {
  if (!row) throw httpError(404, 'Suivi introuvable.');
  if (req.user.role === 'admin_etablissement' && row.etablissement_id !== req.user.eid) throw httpError(403, 'Ce suivi n’appartient pas à votre établissement.');
  return row;
}

const suiviScolaireCorps = z.object({
  membre_id: z.string().uuid().optional().nullable(),
  // Correctif global 27 nov. 2026 : une personne hors système
  // (élève sans compte) peut avoir un suivi scolaire.
  personne_externe_id: z.string().uuid().optional().nullable(),
  classe: z.enum(SCOLAIRE_CLASSES),
  classe_libre: z.string().trim().max(100).transform(texteMajuscules).optional().nullable(),
  annee_scolaire: z.string().trim().min(4).max(20),
  moyenne_t1: z.number().min(0).max(20).optional().nullable(),
  moyenne_t2: z.number().min(0).max(20).optional().nullable(),
  moyenne_t3: z.number().min(0).max(20).optional().nullable(),
  examen: z.boolean().optional(),
  type_examen: z.enum(['bepc', 'bac', 'autre']).optional().nullable(),
  resultat_examen: z.enum(['admis', 'ajourne']).optional().nullable(),
});

app.get('/admin/suivis-scolaires', { preHandler: contenuG }, async (req) => {
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : (typeof req.query.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null);
  const annee = typeof req.query.annee_scolaire === 'string' && req.query.annee_scolaire.trim().length <= 20 ? req.query.annee_scolaire.trim() : null;
  const bureau = req.query.bureau === '1';
  // Carte 126 tranche 3 : un responsable éducatif nommé ne voit
  // que les suivis des membres inscrits à son activité, jamais
  // ceux des autres camps.
  const porteeNomination = await activitesPourPermission(req, 'suivi.lire');
  return (await q(
    `${SCOLAIRE_SELECT} WHERE ($1::uuid IS NULL OR s.etablissement_id = $1) AND ($2::text IS NULL OR s.annee_scolaire = $2) AND ($3::boolean = false OR EXISTS (SELECT 1 FROM bureau_membres b WHERE b.membre_id = s.membre_id)) AND ($4::uuid[] IS NULL OR EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = s.membre_id AND i.evenement_id = ANY($4::uuid[]))) ORDER BY COALESCE(m.nom_complet, pe.nom_complet), s.annee_scolaire DESC`,
    [perimetre, annee, bureau, porteeNomination],
  )).rows;
});

app.get('/admin/suivis-scolaires/:id', { preHandler: contenuG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const row = suiviScolaireControle(await suiviScolaireParId(id), req);
  await exigerNomination(req, 'suivi.lire', { membreId: row.membre_id });
  return row;
});

app.post('/admin/suivis-scolaires', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'responsable');
  const b = suiviScolaireCorps.parse(req.body ?? {});
  if (!b.membre_id && !b.personne_externe_id) throw httpError(400, 'Choisissez un membre ou une personne hors système.');
  if (b.membre_id && b.personne_externe_id) throw httpError(400, 'Choisissez un membre ou une personne hors système, pas les deux.');
  let nomComplet = null; let etablissementId = null;
  if (b.membre_id) {
    const membre = (await q('SELECT id, nom_complet, etablissement_id FROM membres WHERE id = $1', [b.membre_id])).rows[0];
    if (!membre) throw httpError(404, 'Membre introuvable.');
    nomComplet = membre.nom_complet; etablissementId = membre.etablissement_id;
  } else {
    const externe = (await q('SELECT id, nom_complet, etablissement_id FROM personnes_externes WHERE id = $1', [b.personne_externe_id])).rows[0];
    if (!externe) throw httpError(404, 'Personne introuvable.');
    nomComplet = externe.nom_complet; etablissementId = externe.etablissement_id;
  }
  if (req.user.role === 'admin_etablissement' && (etablissementId == null || etablissementId !== req.user.eid)) throw httpError(403, 'Cette personne n’appartient pas à votre établissement.');
  // Carte 126 tranche 3 : un responsable éducatif nommé n'écrit
  // que le suivi des membres inscrits à son activité. Une personne
  // hors système n'a pas d'inscription, donc pas de portée par
  // nomination : seuls les administrateurs la créent.
  if (b.membre_id) await exigerNomination(req, 'suivi.ecrire', { membreId: b.membre_id });
  const examen = b.examen === true;
  const conflit = b.membre_id ? '(membre_id, annee_scolaire)' : '(personne_externe_id, annee_scolaire)';
  const row = (await q(
    `INSERT INTO suivis_scolaires (membre_id, personne_externe_id, etablissement_id, classe, classe_libre, annee_scolaire, moyenne_t1, moyenne_t2, moyenne_t3, examen, type_examen, resultat_examen, cree_par, modifie_par)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $13)
     ON CONFLICT ${conflit} DO UPDATE SET etablissement_id = EXCLUDED.etablissement_id, classe = EXCLUDED.classe, classe_libre = EXCLUDED.classe_libre, moyenne_t1 = EXCLUDED.moyenne_t1, moyenne_t2 = EXCLUDED.moyenne_t2, moyenne_t3 = EXCLUDED.moyenne_t3, examen = EXCLUDED.examen, type_examen = EXCLUDED.type_examen, resultat_examen = EXCLUDED.resultat_examen, modifie_par = EXCLUDED.modifie_par, modifie_le = now()
     RETURNING id`,
    [b.membre_id ?? null, b.personne_externe_id ?? null, etablissementId, b.classe, b.classe === 'Autre' ? (b.classe_libre ?? null) : null, b.annee_scolaire, b.moyenne_t1 ?? null, b.moyenne_t2 ?? null, b.moyenne_t3 ?? null, examen, examen ? (b.type_examen ?? null) : null, examen ? (b.resultat_examen ?? null) : null, req.user.sub],
  )).rows[0];
  const complet = await suiviScolaireParId(row.id);
  await audit(pool, req, 'suivi_scolaire.enregistre', 'suivis_scolaires', row.id, { membre_id: b.membre_id ?? null, personne_externe_id: b.personne_externe_id ?? null, annee_scolaire: b.annee_scolaire, etablissement_id: etablissementId });
  // Notification automatique à l'enfant et au parent, seulement
  // pour un membre : une personne hors système n'a pas de compte
  // ni de lien parent enregistré.
  if (b.membre_id) {
    await notifierMembre(b.membre_id, 'moyenne', 'Vos moyennes ont été mises à jour', `Vos moyennes pour l'année scolaire ${b.annee_scolaire} ont été mises à jour.`, 'suivi_scolaire', row.id);
    await notifierParentsEnfant(b.membre_id, 'moyenne_enfant', `Les moyennes de ${prenomDe(nomComplet)} ont été mises à jour`, `Les moyennes de ${prenomDe(nomComplet)} pour l'année scolaire ${b.annee_scolaire} ont été mises à jour.`, 'suivi_scolaire', row.id);
  }
  return reply.code(201).send(complet);
});

app.put('/admin/suivis-scolaires/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = suiviScolaireCorps.parse(req.body ?? {});
  const ancien = await suiviScolaireParId(id);
  if (!ancien) throw httpError(404, 'Suivi introuvable.');
  if (b.membre_id !== ancien.membre_id || (b.personne_externe_id ?? null) !== (ancien.personne_externe_id ?? null)) throw httpError(400, 'La personne d’un suivi ne se change pas. Créez un suivi pour l’autre personne.');
  let nomComplet = null; let etablissementId = null;
  if (b.membre_id) {
    const membre = (await q('SELECT id, nom_complet, etablissement_id FROM membres WHERE id = $1', [b.membre_id])).rows[0];
    if (!membre) throw httpError(404, 'Membre introuvable.');
    nomComplet = membre.nom_complet; etablissementId = membre.etablissement_id;
  } else {
    const externe = (await q('SELECT id, nom_complet, etablissement_id FROM personnes_externes WHERE id = $1', [b.personne_externe_id])).rows[0];
    if (!externe) throw httpError(404, 'Personne introuvable.');
    nomComplet = externe.nom_complet; etablissementId = externe.etablissement_id;
  }
  if (req.user.role === 'admin_etablissement' && (etablissementId == null || etablissementId !== req.user.eid)) throw httpError(403, 'Cette personne n’appartient pas à votre établissement.');
  // Carte 126 tranche 3 : un responsable éducatif nommé n'écrit
  // que le suivi des membres inscrits à son activité.
  if (b.membre_id) await exigerNomination(req, 'suivi.ecrire', { membreId: b.membre_id });
  if (b.annee_scolaire !== ancien.annee_scolaire) {
    const doublon = (await q(
      b.membre_id
        ? 'SELECT id FROM suivis_scolaires WHERE membre_id = $1 AND annee_scolaire = $2 AND id <> $3'
        : 'SELECT id FROM suivis_scolaires WHERE personne_externe_id = $1 AND annee_scolaire = $2 AND id <> $3',
      [b.membre_id ?? b.personne_externe_id, b.annee_scolaire, id])).rows[0];
    if (doublon) throw httpError(409, 'Un suivi existe déjà pour cette personne et cette année scolaire.');
  }
  const examen = b.examen === true;
  await q(
    `UPDATE suivis_scolaires SET etablissement_id = $1, classe = $2, classe_libre = $3, annee_scolaire = $4, moyenne_t1 = $5, moyenne_t2 = $6, moyenne_t3 = $7, examen = $8, type_examen = $9, resultat_examen = $10, modifie_par = $11, modifie_le = now() WHERE id = $12`,
    [etablissementId, b.classe, b.classe === 'Autre' ? (b.classe_libre ?? null) : null, b.annee_scolaire, b.moyenne_t1 ?? null, b.moyenne_t2 ?? null, b.moyenne_t3 ?? null, examen, examen ? (b.type_examen ?? null) : null, examen ? (b.resultat_examen ?? null) : null, req.user.sub, id],
  );
  await audit(pool, req, 'suivi_scolaire.modifie', 'suivis_scolaires', id, { membre_id: b.membre_id ?? null, personne_externe_id: b.personne_externe_id ?? null, annee_scolaire: b.annee_scolaire, etablissement_id: etablissementId });
  if (b.membre_id) {
    await notifierMembre(b.membre_id, 'moyenne', 'Vos moyennes ont été mises à jour', `Vos moyennes pour l'année scolaire ${b.annee_scolaire} ont été mises à jour.`, 'suivi_scolaire', id);
    await notifierParentsEnfant(b.membre_id, 'moyenne_enfant', `Les moyennes de ${prenomDe(nomComplet)} ont été mises à jour`, `Les moyennes de ${prenomDe(nomComplet)} pour l'année scolaire ${b.annee_scolaire} ont été mises à jour.`, 'suivi_scolaire', id);
  }
  return suiviScolaireParId(id);
});

app.get('/moi/suivis-scolaires', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(404, 'Profil introuvable.');
  return (await q(`${SCOLAIRE_SELECT} WHERE s.membre_id = $1 ORDER BY s.annee_scolaire DESC`, [req.user.mid])).rows;
});

// ───────────────────────── Attestations, 2 nov. 2026,
// tranche 3 des 7 propositions validées ─────────────────────────
// Attestation de bénévolat ou de participation, modèle unique.
// Carte 120, 9 nov. 2026, décidée par Axel : l'attestation est
// un vrai PDF, généré à l'ouverture à partir de ses données,
// modèle du certificat d'adhésion de la carte 110 (vrai PDF, QR
// et page publique de vérification). Le HTML disparaît : les
// routes /html et le gabarit src/attestation.html sont retirés,
// le PDF reprend le contenu exact du modèle approuvé (cartes 42,
// 44 et 95), avec la mention d'annulation rouge quand
// l'attestation est annulée (carte 106), le sceau doré dessiné
// en code, la signature du signataire et le QR de vérification.
// Aucune signature dessinée, aucun tampon officiel prétendu,
// aucun nom de signataire inventé.
// Délivrance explicite par un administrateur du périmètre
// seulement, jamais par le membre lui-même. Suppression
// définitive depuis la carte 120, décidée par Axel : le bouton
// Supprimer, même périmètre que l'annulation, efface la ligne
// et journalise la suppression, contrairement à l'annulation
// non destructive de la carte 106, qui garde l'attestation
// consultable, marquée annulée. Signature depuis la carte 120 :
// l'administrateur signe dans l'application, en dessinant ou
// avec sa signature déjà enregistrée par Ma signature (carte 96),
// la version signée est enregistrée et reste consultable avec
// sa signature. Le journal d'audit garde la trace de chaque
// délivrance, de chaque annulation, de chaque signature et de
// chaque suppression, sans donnée médicale, sans sujet de
// prière, sans secret. Le PDF porte seulement le nom de la
// structure, le titre, le membre, son matricule, son
// établissement s'il est renseigné, l'activité ou le service, les
// dates et le rôle s'ils sont renseignés, la date de délivrance
// et la référence.
const ATTESTATION_SELECT = `SELECT a.*, m.nom_complet AS membre_nom, m.matricule, e.nom AS etablissement, ms.matricule AS signataire_matricule FROM attestations a JOIN membres m ON m.id = a.membre_id LEFT JOIN etablissements e ON e.id = a.etablissement_id LEFT JOIN membres ms ON ms.utilisateur_id = a.delivre_par`;

async function attestationParId(id) {
  return (await q(`${ATTESTATION_SELECT} WHERE a.id = $1`, [id])).rows[0] ?? null;
}

function attestationControle(row, req) {
  if (!row) throw httpError(404, 'Attestation introuvable.');
  if (req.user.role === 'admin_etablissement' && !req.user.eid) throw httpError(403, 'Cette attestation n’appartient pas à votre établissement.');
  if (req.user.role === 'admin_etablissement' && row.etablissement_id !== req.user.eid) throw httpError(403, 'Cette attestation n’appartient pas à votre établissement.');
  return row;
}

async function attestationPdfBytes(a) {
  // Carte 96, 8 nov. 2026 : la signature du signataire, lue en
  // base sur utilisateurs.signature_admin par delivre_par, est
  // posée dans le PDF au moment de l'affichage, pour
  // l'administrateur comme pour le membre qui ouvre sa propre
  // attestation. Carte 120 : la signature signée dans
  // l'application (attestations.signature_attestation) prime sur
  // celle du délivreur. Sans signature, la ligne vide reste,
  // sans jamais bloquer l'ouverture. Une base sans la colonne,
  // avant la migration, donne la même ligne vide, jamais une
  // erreur.
  let signature = a.signature_attestation ?? null;
  try {
    if (!signature && a.delivre_par) {
      signature = (await q('SELECT signature_admin FROM utilisateurs WHERE id = $1', [a.delivre_par])).rows[0]?.signature_admin ?? null;
    }
  } catch (_) {
    signature = null;
  }
  // QR signé quand le secret est présent, comme pour les
  // certificats. Sans CERT_SECRET, le PDF s'ouvre sans QR,
  // jamais en 503 : l'attestation reste consultable, et le
  // pied de page ne promet pas de vérification par QR.
  let url = null;
  if (CERT_SECRET && CERT_SECRET.length >= 32) {
    url = urlVerificationAttestation(CFG.publicBaseUrl, a.reference, a.matricule, CERT_SECRET);
  }
  return genererAttestationPdf({ ...a, url, signature });
}

async function attestationPdfReply(a, reply) {
  const pdf = await attestationPdfBytes(a);
  const matricule = String(a.matricule || '').replace(/[^A-Za-z0-9-]/g, '');
  reply.header('Cache-Control', 'private, no-store');
  reply.header('Content-Disposition', `inline; filename="attestation-${a.type}-${matricule}.pdf"`);
  return reply.type('application/pdf').send(pdf);
}

// Carte 121, 10 nov. 2026 : envoi d'une attestation en PDF par
// e-mail, quand le membre ou la structure choisit « Recevoir par
// mail » au lieu du téléchargement. Le PDF est le même que celui
// du téléchargement, avec sa mention d'annulation, sa signature
// et son QR. Aucune adresse n'est journalisée, comme pour les
// certificats.
async function envoyerAttestation(a) {
  const membre = (await q(
    `SELECT m.nom_complet, u.email FROM membres m
       JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1`, [a.membre_id])).rows[0];
  if (!membre?.email) return false;
  try {
    await envoyerAttestationParEmail({
      destinataire: membre.email, nom: membre.nom_complet,
      reference: a.reference, type: a.type, pdf: await attestationPdfBytes(a),
    });
    return true;
  } catch (e) {
    app.log.error({ code: e.code, reference: a.reference }, 'Envoi de l’attestation impossible.');
    return false;
  }
}

const attestationCorps = z.object({
  membre_id: z.string().uuid(),
  type: z.enum(['benevolat', 'participation']),
  activite: z.string().trim().min(1).max(300).transform(texteMajuscules),
  date_debut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  date_fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  role_service: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),
});

app.get('/admin/attestations', { preHandler: contenuG }, async (req) => {
  if (req.user.role === 'admin_etablissement' && !req.user.eid) return [];
  const filtre = req.user.role === 'admin_etablissement'
    ? req.user.eid
    : (typeof req.query.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null);
  const type = req.query.type === 'benevolat' || req.query.type === 'participation' ? req.query.type : null;
  return (await q(
    `${ATTESTATION_SELECT} WHERE ($1::uuid IS NULL OR a.etablissement_id = $1) AND ($2::text IS NULL OR a.type = $2) ORDER BY a.delivre_le DESC, m.nom_complet`,
    [filtre, type],
  )).rows;
});

app.post('/admin/attestations', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'responsable');
  const b = attestationCorps.parse(req.body ?? {});
  if (b.date_debut && b.date_fin && b.date_fin < b.date_debut) throw httpError(400, 'La date de fin ne peut pas précéder la date de début.');
  const membre = (await q('SELECT id, etablissement_id FROM membres WHERE id = $1', [b.membre_id])).rows[0];
  if (!membre) throw httpError(404, 'Membre introuvable.');
  if (req.user.role === 'admin_etablissement' && (membre.etablissement_id == null || membre.etablissement_id !== req.user.eid)) throw httpError(403, 'Ce membre n’appartient pas à votre établissement.');
  const annee = new Date().getFullYear();
  let row = null;
  for (let tentative = 0; tentative < 5 && !row; tentative++) {
    const compte = Number((await q(`SELECT COUNT(*)::int AS n FROM attestations WHERE reference LIKE $1`, [`ATT-${annee}-%`])).rows[0]?.n ?? 0);
    const reference = `ATT-${annee}-${String(compte + 1 + tentative).padStart(4, '0')}`;
    try {
      row = (await q(
        `INSERT INTO attestations (membre_id, etablissement_id, type, activite, date_debut, date_fin, role_service, reference, delivre_par)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [b.membre_id, membre.etablissement_id, b.type, b.activite, b.date_debut ?? null, b.date_fin ?? null, b.role_service ?? null, reference, req.user.sub],
      )).rows[0];
    } catch (e) {
      if (e.code === '23505') continue;
      throw e;
    }
  }
  if (!row) throw httpError(409, 'Impossible de générer une référence unique, réessayez.');
  const complet = await attestationParId(row.id);
  await audit(pool, req, 'attestation.delivree', 'attestations', row.id, { membre_id: b.membre_id, type: b.type, etablissement_id: membre.etablissement_id });
  return reply.code(201).send(complet);
});

// Carte 106, 9 nov. 2026 : annulation non destructive, décidée
// par Axel. Même périmètre que la délivrance, fonction
// responsable, contrôle par attestationControle, 404 si
// introuvable, 403 hors périmètre. Une attestation déjà annulée
// répond 409, elle n'est jamais annulée deux fois. L'annulation
// marque annulee_le et annulee_par, sans rien effacer : la ligne
// reste consultable, dans les listes comme dans son HTML, avec
// sa mention d'annulation, et le journal d'audit garde la trace.
app.post('/admin/attestations/:id/annuler', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const a = attestationControle(await attestationParId(id), req);
  if (a.annulee_le) throw httpError(409, 'Cette attestation est déjà annulée.');
  await q(`UPDATE attestations SET annulee_le = now(), annulee_par = $2 WHERE id = $1`, [id, req.user.sub]);
  const annulee = await attestationParId(id);
  await audit(pool, req, 'attestation.annulee', 'attestations', id, { membre_id: a.membre_id, type: a.type, etablissement_id: a.etablissement_id });
  return annulee;
});

// Carte 120, 9 nov. 2026 : signature dans l'application,
// décidée par Axel. Même périmètre que l'annulation, fonction
// responsable, contrôle par attestationControle, 404 si
// introuvable, 403 hors périmètre. Une attestation annulée ne
// se signe plus, 409. Le signataire dessine sa signature dans
// l'application, ou réutilise sa signature déjà enregistrée par
// Ma signature (carte 96) : dans ce cas, la signature est lue
// en base sur son propre compte, jamais sur une déclaration. La
// version signée est enregistrée sur l'attestation et le PDF
// l'affiche à la prochaine ouverture.
app.post('/admin/attestations/:id/signer', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const corps = z.object({
    signature: z.string().max(400000).optional().nullable(),
    utiliser_signature_enregistree: z.boolean().optional(),
  }).parse(req.body ?? {});
  const a = attestationControle(await attestationParId(id), req);
  if (a.annulee_le) throw httpError(409, 'Cette attestation est annulée, elle ne peut plus être signée.');
  let signature = null;
  if (corps.utiliser_signature_enregistree) {
    signature = (await q('SELECT signature_admin FROM utilisateurs WHERE id = $1', [req.user.sub])).rows[0]?.signature_admin ?? null;
    if (!signature) throw httpError(409, 'Aucune signature enregistrée. Dessinez-la ou enregistrez-la dans Ma signature.');
  } else if (corps.signature) {
    const octets = decoderSignaturePng(corps.signature);
    if (!octets) throw httpError(400, 'Signature invalide, dessinez-la de nouveau.');
    if (octets.length > LIMITE_SIGNATURE_OCTETS) throw httpError(400, 'Signature trop lourde, dessinez-la de nouveau.');
    signature = corps.signature;
  } else {
    throw httpError(400, 'Fournissez une signature ou choisissez la signature enregistrée.');
  }
  await q(`UPDATE attestations SET signature_attestation = $2 WHERE id = $1`, [id, signature]);
  const signee = await attestationParId(id);
  await audit(pool, req, 'attestation.signee', 'attestations', id, { membre_id: a.membre_id, type: a.type, etablissement_id: a.etablissement_id, reference: a.reference });
  return signee;
});

// Carte 120, 9 nov. 2026 : suppression définitive, décidée par
// Axel. Même périmètre que l'annulation, fonction responsable,
// contrôle par attestationControle, 404 si introuvable, 403
// hors périmètre. Le bouton Supprimer de l'application appelle
// cette route après confirmation. Contrairement à l'annulation,
// la ligne disparaît, sans régénération ni archive ; le journal
// d'audit garde la trace, avec la référence, pour qu'on sache
// ce qui a été supprimé. Aucun DELETE sur une autre table.
app.delete('/admin/attestations/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const a = attestationControle(await attestationParId(id), req);
  await q('DELETE FROM attestations WHERE id = $1', [id]);
  await audit(pool, req, 'attestation.supprimee', 'attestations', id, { membre_id: a.membre_id, type: a.type, etablissement_id: a.etablissement_id, reference: a.reference });
  return { supprime: true, id, reference: a.reference };
});

app.get('/admin/attestations/:id', { preHandler: contenuG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  return attestationControle(await attestationParId(id), req);
});

app.get('/admin/attestations/:id/pdf', { preHandler: contenuG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const a = attestationControle(await attestationParId(id), req);
  return attestationPdfReply(a, reply);
});

app.get('/moi/attestations', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(404, 'Profil introuvable.');
  return (await q(`${ATTESTATION_SELECT} WHERE a.membre_id = $1 ORDER BY a.delivre_le DESC`, [req.user.mid])).rows;
});

app.get('/moi/attestations/:id/pdf', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  if (!req.user.mid) throw httpError(404, 'Profil introuvable.');
  const a = await attestationParId(id);
  if (!a || a.membre_id !== req.user.mid) throw httpError(404, 'Attestation introuvable.');
  return attestationPdfReply(a, reply);
});

// Carte 121, 10 nov. 2026 : le membre reçoit sa propre
// attestation par mail, au lieu de la télécharger. Sans adresse
// e-mail sur son compte, 409. Sans SMTP, 503. Une attestation
// annulée reste envoyable, marquée annulée dans le PDF.
app.post('/moi/attestations/:id/envoyer', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  if (!req.user.mid) throw httpError(404, 'Profil introuvable.');
  const a = await attestationParId(id);
  if (!a || a.membre_id !== req.user.mid) throw httpError(404, 'Attestation introuvable.');
  const ok = await envoyerAttestation(a);
  if (!ok) throw httpError(503, 'Envoi par mail impossible pour le moment.');
  return { envoye: true, reference: a.reference };
});

// Carte 121, 10 nov. 2026 : la structure envoie l'attestation
// par mail au membre, au lieu de la télécharger. Même périmètre
// que les autres routes admin des attestations.
app.post('/admin/attestations/:id/envoyer', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const a = attestationControle(await attestationParId(id), req);
  const ok = await envoyerAttestation(a);
  if (!ok) throw httpError(503, 'Envoi par mail impossible pour le moment.');
  return { envoye: true, reference: a.reference };
});

// Page publique ouverte par le QR code du PDF. Aucune recherche
// libre : référence + matricule + signature obligatoires, même
// signature HMAC que les certificats, même secret dédié
// (CERT_SECRET). Sans ce secret, la vérification répond
// indisponible, 503, jamais 500. Une attestation annulée reste
// vérifiable, marquée annulée (carte 106).
app.get('/attestations/verification/:reference', async (req, reply) => {
  const { reference } = z.object({ reference: z.string().regex(/^ATT-\d{4}-\d{4,}$/) }).parse(req.params);
  const { matricule, signature } = z.object({
    matricule: z.string().regex(/^CP-[A-Z]{2}-\d{4,}$/),
    signature: z.string().regex(/^[a-f0-9]{64}$/),
  }).parse(req.query);
  if (!CERT_SECRET || CERT_SECRET.length < 32) {
    return reply.code(503).type('text/html; charset=utf-8').send(
      '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Vérification indisponible</title></head>' +
      '<body><main><h1>Vérification indisponible</h1><p>La vérification des attestations est indisponible pour le moment.</p></main></body></html>');
  }
  const signatureOk = signatureValide(CERT_SECRET, reference, matricule, signature);
  const row = signatureOk ? (await q(
    `SELECT a.reference, a.type, a.activite, a.delivre_le, a.annulee_le, m.nom_complet
       FROM attestations a JOIN membres m ON m.id = a.membre_id
      WHERE a.reference = $1 AND m.matricule = $2`, [reference, matricule])).rows[0] : null;
  const etat = etatAttestation(row ?? null);
  return reply
    .status(etat === 'introuvable' ? 404 : 200)
    .type('text/html; charset=utf-8')
    .send(pageVerificationAttestationHtml({ etat, attestation: row ?? null }));
});


// ───────────────────────── Planning des responsables, 2 nov. 2026,
// tranche 4 des 7 propositions validées ─────────────────────────
// Un responsable, une activité, un jour, des horaires facultatifs.
// L'avertissement de conflit ne bloque jamais : deux activités du
// même responsable le même jour dont les horaires se chevauchent,
// ou le même jour sans horaires, sont signalées, la création et la
// modification restent possibles. Aucune route de suppression en
// première version. Le journal d'audit ne reprend que membre, date
// et établissement, aucune donnée sensible.
const PLANNING_SELECT = `SELECT p.*, COALESCE(m.nom_complet, pe.nom_complet) AS membre_nom, m.matricule, e.nom AS etablissement, ev.nom AS evenement_nom FROM plannings_responsables p LEFT JOIN membres m ON m.id = p.membre_id LEFT JOIN personnes_externes pe ON pe.id = p.personne_externe_id LEFT JOIN etablissements e ON e.id = p.etablissement_id LEFT JOIN evenements ev ON ev.id = p.evenement_id`;

async function planningParId(id) {
  return (await q(`${PLANNING_SELECT} WHERE p.id = $1`, [id])).rows[0] ?? null;
}

function planningControle(row, req) {
  if (!row) throw httpError(404, 'Planning introuvable.');
  if (req.user.role === 'admin_etablissement' && !req.user.eid) throw httpError(403, 'Ce planning n’appartient pas à votre établissement.');
  if (req.user.role === 'admin_etablissement' && row.etablissement_id !== req.user.eid) throw httpError(403, 'Ce planning n’appartient pas à votre établissement.');
  return row;
}

function planningHeureMinutes(v) {
  if (v == null || v === '') return null;
  const parts = String(v).split(':');
  const h = Number(parts[0]);
  const m = Number(parts[1] ?? 0);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h * 60 + m;
}

function planningEnConflit(a, b) {
  const da = planningHeureMinutes(a.heure_debut);
  const fa = planningHeureMinutes(a.heure_fin);
  const db = planningHeureMinutes(b.heure_debut);
  const fb = planningHeureMinutes(b.heure_fin);
  if (da == null || fa == null || db == null || fb == null) return true;
  return da < fb && fa > db;
}

async function planningConflits(membreId, date, debut, fin, exclureId, personneExterneId = null) {
  const rows = (await q(
    `SELECT id, activite, date, heure_debut, heure_fin FROM plannings_responsables WHERE (($1::uuid IS NOT NULL AND membre_id = $1) OR ($2::uuid IS NOT NULL AND personne_externe_id = $2)) AND date = $3 AND ($4::uuid IS NULL OR id <> $4)`,
    [membreId ?? null, personneExterneId ?? null, date, exclureId ?? null],
  )).rows;
  const candidat = { heure_debut: debut ?? null, heure_fin: fin ?? null };
  return rows.filter((r) => planningEnConflit(candidat, r)).map((r) => ({
    id: r.id,
    activite: r.activite,
    date: r.date instanceof Date ? r.date.toISOString().slice(0, 10) : String(r.date).slice(0, 10),
    heure_debut: r.heure_debut,
    heure_fin: r.heure_fin,
  }));
}

function planningAvecConflits(rows) {
  return rows.map((r) => {
    const date = r.date instanceof Date ? r.date.toISOString().slice(0, 10) : String(r.date).slice(0, 10);
    const conflits = rows.filter((o) => o.id !== r.id && (o.membre_id ?? o.personne_externe_id) === (r.membre_id ?? r.personne_externe_id) && (o.date instanceof Date ? o.date.toISOString().slice(0, 10) : String(o.date).slice(0, 10)) === date && planningEnConflit(r, o)).map((o) => ({
      id: o.id,
      activite: o.activite,
      date,
      heure_debut: o.heure_debut,
      heure_fin: o.heure_fin,
    }));
    return { ...r, conflits };
  });
}

const planningCorps = z.object({
  membre_id: z.string().uuid().optional().nullable(),
  // Correctif global 27 nov. 2026 : une personne hors système
  // peut être planifiée, sans compte application.
  personne_externe_id: z.string().uuid().optional().nullable(),
  activite: z.string().trim().min(1).max(300).transform(texteMajuscules),
  evenement_id: z.string().uuid().optional().nullable(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  heure_debut: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).optional().nullable(),
  heure_fin: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).optional().nullable(),
  role_service: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),
});

app.get('/admin/plannings', { preHandler: contenuG }, async (req) => {
  if (req.user.role === 'admin_etablissement' && !req.user.eid) return [];
  const filtre = req.user.role === 'admin_etablissement'
    ? req.user.eid
    : (typeof req.query.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null);
  const membre = typeof req.query.membre_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.membre_id) ? req.query.membre_id : null;
  const mois = typeof req.query.mois === 'string' && /^\d{4}-\d{2}$/.test(req.query.mois) ? req.query.mois : null;
  const debutMois = mois ? `${mois}-01` : null;
  const annee = mois ? Number(mois.slice(0, 4)) : null;
  const moisNum = mois ? Number(mois.slice(5, 7)) : null;
  const finMois = mois && annee != null && moisNum != null ? `${moisNum === 12 ? annee + 1 : annee}-${String(moisNum === 12 ? 1 : moisNum + 1).padStart(2, '0')}-01` : null;
  const rows = (await q(
    `${PLANNING_SELECT} WHERE ($1::uuid IS NULL OR p.etablissement_id = $1) AND ($2::uuid IS NULL OR p.membre_id = $2) AND ($3::date IS NULL OR p.date >= $3) AND ($4::date IS NULL OR p.date < $4) ORDER BY p.date, p.heure_debut NULLS LAST, COALESCE(m.nom_complet, pe.nom_complet)`,
    [filtre, membre, debutMois, finMois],
  )).rows;
  return planningAvecConflits(rows);
});

app.post('/admin/plannings', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'responsable');
  const b = planningCorps.parse(req.body ?? {});
  if (b.heure_debut && b.heure_fin && planningHeureMinutes(b.heure_fin) < planningHeureMinutes(b.heure_debut)) throw httpError(400, 'L’heure de fin ne peut pas précéder l’heure de début.');
  if (req.user.role === 'admin_etablissement' && !req.user.eid) throw httpError(403, 'Aucun établissement rattaché, création impossible.');
  if (!b.membre_id && !b.personne_externe_id) throw httpError(400, 'Choisissez un membre ou une personne hors système.');
  if (b.membre_id && b.personne_externe_id) throw httpError(400, 'Choisissez un membre ou une personne hors système, pas les deux.');
  let etablissementId = null;
  if (b.membre_id) {
    const membre = (await q('SELECT id, etablissement_id FROM membres WHERE id = $1', [b.membre_id])).rows[0];
    if (!membre) throw httpError(404, 'Membre introuvable.');
    etablissementId = membre.etablissement_id;
  } else {
    const externe = (await q('SELECT id, etablissement_id FROM personnes_externes WHERE id = $1', [b.personne_externe_id])).rows[0];
    if (!externe) throw httpError(404, 'Personne introuvable.');
    etablissementId = externe.etablissement_id;
  }
  if (req.user.role === 'admin_etablissement' && (etablissementId == null || etablissementId !== req.user.eid)) throw httpError(403, 'Cette personne n’appartient pas à votre établissement.');
  if (b.evenement_id) {
    const ev = (await q('SELECT id FROM evenements WHERE id = $1', [b.evenement_id])).rows[0];
    if (!ev) throw httpError(404, 'Événement introuvable.');
  }
  const row = (await q(
    `INSERT INTO plannings_responsables (membre_id, personne_externe_id, etablissement_id, activite, evenement_id, date, heure_debut, heure_fin, role_service, cree_par)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
    [b.membre_id ?? null, b.personne_externe_id ?? null, etablissementId, b.activite, b.evenement_id ?? null, b.date, b.heure_debut ?? null, b.heure_fin ?? null, b.role_service ?? null, req.user.sub],
  )).rows[0];
  const conflits = await planningConflits(b.membre_id ?? null, b.date, b.heure_debut ?? null, b.heure_fin ?? null, row.id, b.personne_externe_id ?? null);
  const complet = await planningParId(row.id);
  await audit(pool, req, 'planning.cree', 'plannings_responsables', row.id, { membre_id: b.membre_id ?? null, personne_externe_id: b.personne_externe_id ?? null, date: b.date, etablissement_id: etablissementId });
  return reply.code(201).send({ ...complet, conflits });
});

app.put('/admin/plannings/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = planningCorps.parse(req.body ?? {});
  if (b.heure_debut && b.heure_fin && planningHeureMinutes(b.heure_fin) < planningHeureMinutes(b.heure_debut)) throw httpError(400, 'L’heure de fin ne peut pas précéder l’heure de début.');
  const ancien = planningControle(await planningParId(id), req);
  if (b.membre_id !== ancien.membre_id || (b.personne_externe_id ?? null) !== (ancien.personne_externe_id ?? null)) throw httpError(400, 'Le responsable d’un planning ne se change pas. Créez un planning pour l’autre responsable.');
  let etablissementId = null;
  if (b.membre_id) {
    const membre = (await q('SELECT id, etablissement_id FROM membres WHERE id = $1', [b.membre_id])).rows[0];
    if (!membre) throw httpError(404, 'Membre introuvable.');
    etablissementId = membre.etablissement_id;
  } else {
    const externe = (await q('SELECT id, etablissement_id FROM personnes_externes WHERE id = $1', [b.personne_externe_id])).rows[0];
    if (!externe) throw httpError(404, 'Personne introuvable.');
    etablissementId = externe.etablissement_id;
  }
  if (req.user.role === 'admin_etablissement' && (etablissementId == null || etablissementId !== req.user.eid)) throw httpError(403, 'Cette personne n’appartient pas à votre établissement.');
  if (b.evenement_id) {
    const ev = (await q('SELECT id FROM evenements WHERE id = $1', [b.evenement_id])).rows[0];
    if (!ev) throw httpError(404, 'Événement introuvable.');
  }
  await q(
    `UPDATE plannings_responsables SET etablissement_id = $1, activite = $2, evenement_id = $3, date = $4, heure_debut = $5, heure_fin = $6, role_service = $7, modifie_le = now() WHERE id = $8`,
    [etablissementId, b.activite, b.evenement_id ?? null, b.date, b.heure_debut ?? null, b.heure_fin ?? null, b.role_service ?? null, id],
  );
  const conflits = await planningConflits(b.membre_id ?? null, b.date, b.heure_debut ?? null, b.heure_fin ?? null, id, b.personne_externe_id ?? null);
  const complet = await planningParId(id);
  await audit(pool, req, 'planning.modifie', 'plannings_responsables', id, { membre_id: b.membre_id ?? null, personne_externe_id: b.personne_externe_id ?? null, date: b.date, etablissement_id: etablissementId });
  return { ...complet, conflits };
});

// ───────────────────────── Suivi des nouveaux membres, 2 nov. 2026,
// tranche 5 des 7 propositions validées ─────────────────────────
// Espace structure seulement, jamais une vue membre. Le statut est
// calculé côté serveur, jamais de date inventée : jours écoulés
// depuis inscrit_le, dernier contact noté ou aucun. Un contact noté
// donne Contacté, aucun contact avec 30 jours ou plus donne Rappel
// 30 jours, aucun contact avec 7 jours ou plus donne Rappel 7 jours,
// sinon En suivi. Les deux rappels sont deux niveaux du même état
// sans contact, pas deux notifications séparées, et aucun e-mail ni
// SMS automatique n'est créé ici. Aucune route de suppression en
// première version, une erreur se corrige en notant un nouveau
// contact. Le journal d'audit ne reprend que membre et date, jamais
// la note.
const NOUVEAU_STATUTS = ['contacte', 'rappel_7', 'rappel_30', 'en_suivi'];

const contactMembreCorps = z.object({
  date_contact: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  canal: z.enum(['appel', 'visite', 'message', 'autre']),
  note: z.string().trim().max(500).optional().nullable(),
});

app.get('/admin/nouveaux-membres', { preHandler: contenuG }, async (req) => {
  if (req.user.role === 'admin_etablissement' && !req.user.eid) return [];
  const filtre = req.user.role === 'admin_etablissement'
    ? req.user.eid
    : (typeof req.query.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null);
  const statut = typeof req.query.statut === 'string' && NOUVEAU_STATUTS.includes(req.query.statut) ? req.query.statut : null;
  const rows = (await q(
    `SELECT * FROM (
       SELECT m.id, m.nom_complet, m.matricule, m.etablissement_id, e.nom AS etablissement,
         m.inscrit_le, (CURRENT_DATE - m.inscrit_le::date) AS jours_ecoules,
         c.dernier_contact,
         CASE WHEN c.dernier_contact IS NOT NULL THEN 'contacte'
              WHEN (CURRENT_DATE - m.inscrit_le::date) >= 30 THEN 'rappel_30'
              WHEN (CURRENT_DATE - m.inscrit_le::date) >= 7 THEN 'rappel_7'
              ELSE 'en_suivi' END AS statut
       FROM membres m
       LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN (SELECT membre_id, MAX(date_contact) AS dernier_contact FROM contacts_membres GROUP BY membre_id) c ON c.membre_id = m.id
     ) s WHERE ($1::uuid IS NULL OR s.etablissement_id = $1) AND ($2::text IS NULL OR s.statut = $2)
     ORDER BY CASE s.statut WHEN 'rappel_30' THEN 0 WHEN 'rappel_7' THEN 1 WHEN 'en_suivi' THEN 2 ELSE 3 END, s.inscrit_le ASC`,
    [filtre, statut],
  )).rows;
  return rows;
});

app.post('/admin/nouveaux-membres/:id/contacts', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = contactMembreCorps.parse(req.body ?? {});
  if (req.user.role === 'admin_etablissement' && !req.user.eid) throw httpError(403, 'Aucun établissement rattaché, notation impossible.');
  const membre = (await q('SELECT id, etablissement_id FROM membres WHERE id = $1', [id])).rows[0];
  if (!membre) throw httpError(404, 'Membre introuvable.');
  if (req.user.role === 'admin_etablissement' && (membre.etablissement_id == null || membre.etablissement_id !== req.user.eid)) throw httpError(403, 'Ce membre n’appartient pas à votre établissement.');
  const row = (await q(
    `INSERT INTO contacts_membres (membre_id, date_contact, canal, note, cree_par) VALUES ($1, $2, $3, $4, $5) RETURNING id, membre_id, date_contact, canal, note, cree_le`,
    [id, b.date_contact, b.canal, b.note ?? null, req.user.sub],
  )).rows[0];
  await audit(pool, req, 'contact_membre.note', 'contacts_membres', row.id, { membre_id: id, date_contact: b.date_contact });
  return reply.code(201).send(row);
});

// ───────────────────────── Liste d'attente de camp, 2 nov. 2026,
// tranche 6 des 7 propositions validées ─────────────────────────
// La liste d'attente n'existe que si l'administration a fixé un
// nombre de places pour le camp, et seulement quand ce nombre est
// atteint. Elle ne crée jamais d'inscription ni de paiement : une
// place proposée reste une proposition, l'inscription normale
// reste à faire par le membre ou la structure ensuite. Aucune
// route de suppression en première version. Le journal d'audit
// ne reprend que camp et membre, jamais d'autre donnée.
app.put('/admin/evenements/:id/capacite', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ nombre_places: z.number().int().positive().nullable() }).parse(req.body ?? {});
  const row = (await q('UPDATE evenements SET nombre_places = $2 WHERE id = $1 RETURNING id, nom, nombre_places', [id, b.nombre_places])).rows[0];
  if (!row) throw httpError(404, 'Camp introuvable.');
  await audit(pool, req, 'evenement.capacite_fixee', 'evenements', id, { evenement_id: id, nombre_places: b.nombre_places });
  return row;
});

app.get('/admin/liste-attente', { preHandler: contenuG }, async (req) => {
  const evenementId = req.query.evenement_id;
  if (typeof evenementId !== 'string' || !/^[0-9a-f-]{36}$/i.test(evenementId)) throw httpError(400, 'evenement_id requis.');
  const camp = (await q(
    `SELECT e.id, e.nom, e.nombre_places, (SELECT COUNT(*)::int FROM inscriptions i WHERE i.evenement_id = e.id) AS inscrits FROM evenements e WHERE e.id = $1`,
    [evenementId],
  )).rows[0];
  if (!camp) throw httpError(404, 'Camp introuvable.');
  if (req.user.role === 'admin_etablissement' && !req.user.eid) return { camp, attente: [] };
  const filtreEtab = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const attente = (await q(
    `SELECT l.id, l.evenement_id, l.membre_id, l.statut, l.cree_le, m.nom_complet, m.matricule, m.etablissement_id, e.nom AS etablissement,
       CASE WHEN l.statut = 'en_attente' THEN (SELECT COUNT(*)::int FROM liste_attente_camps l2 WHERE l2.evenement_id = l.evenement_id AND l2.statut = 'en_attente' AND (l2.cree_le < l.cree_le OR (l2.cree_le = l.cree_le AND l2.id < l.id))) + 1 ELSE NULL END AS position
     FROM liste_attente_camps l JOIN membres m ON m.id = l.membre_id LEFT JOIN etablissements e ON e.id = m.etablissement_id
     WHERE l.evenement_id = $1 AND ($2::uuid IS NULL OR m.etablissement_id = $2) ORDER BY l.cree_le ASC, l.id ASC`,
    [evenementId, filtreEtab],
  )).rows;
  return { camp, attente };
});

app.post('/moi/evenements/:id/liste-attente', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  if (!req.user.mid) throw httpError(403, 'Profil membre requis.');
  const camp = (await q(
    `SELECT e.id, e.nom, e.nombre_places, e.publie, (SELECT COUNT(*)::int FROM inscriptions i WHERE i.evenement_id = e.id) AS inscrits FROM evenements e WHERE e.id = $1`,
    [id],
  )).rows[0];
  if (!camp || !camp.publie) throw httpError(404, 'Camp introuvable.');
  if (camp.nombre_places == null) throw httpError(400, 'Aucun nombre de places fixé pour ce camp.');
  if (camp.inscrits < camp.nombre_places) throw httpError(400, 'Ce camp n’est pas complet.');
  const dejaInscrit = (await q('SELECT id FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2', [id, req.user.mid])).rows[0];
  if (dejaInscrit) throw httpError(409, 'Vous êtes déjà inscrit à ce camp.');
  const row = (await q(
    `INSERT INTO liste_attente_camps (evenement_id, membre_id) VALUES ($1, $2) ON CONFLICT (evenement_id, membre_id) DO NOTHING RETURNING id, evenement_id, membre_id, statut, cree_le`,
    [id, req.user.mid],
  )).rows[0];
  if (!row) throw httpError(409, 'Vous êtes déjà sur la liste d’attente de ce camp.');
  return reply.code(201).send(row);
});

app.post('/admin/liste-attente/:id/proposer', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ligne = (await q('SELECT l.id, l.evenement_id, l.membre_id, l.statut, m.etablissement_id FROM liste_attente_camps l JOIN membres m ON m.id = l.membre_id WHERE l.id = $1', [id])).rows[0];
  if (!ligne) throw httpError(404, 'Demande introuvable.');
  if (req.user.role === 'admin_etablissement' && (req.user.eid == null || ligne.etablissement_id !== req.user.eid)) throw httpError(403, 'Cette demande n’appartient pas à votre établissement.');
  const row = (await q(`UPDATE liste_attente_camps SET statut = 'place_proposee' WHERE id = $1 RETURNING id, evenement_id, membre_id, statut, cree_le`, [id])).rows[0];
  await audit(pool, req, 'liste_attente.place_proposee', 'liste_attente_camps', id, { evenement_id: ligne.evenement_id, membre_id: ligne.membre_id });
  return row;
});

// ───────────────────────── Inventaire du matériel, 2 nov. 2026,
// tranche 7 des 7 propositions validées ─────────────────────────
// Espace structure seulement. Une fiche par matériel, sans valeur
// financière dans cette tranche, sans prix inventé. Aucune route
// de suppression en première version, une erreur se corrige en
// modifiant la fiche. Le journal d'audit ne reprend que nom et
// établissement, aucune donnée sensible.
const MATERIEL_ETATS = ['bon', 'a_reparer', 'hors_service'];

const materielCorps = z.object({
  nom: z.string().trim().min(1).max(300).transform(texteMajuscules),
  categorie: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),
  quantite: z.number().int().nonnegative().optional().nullable(),
  etat: z.enum(['bon', 'a_reparer', 'hors_service']),
  lieu: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),
  etablissement_id: z.string().uuid().optional().nullable(),
});

const MATERIEL_SELECT = `SELECT m.*, e.nom AS etablissement FROM materiels m LEFT JOIN etablissements e ON e.id = m.etablissement_id`;

async function materielParId(id) {
  return (await q(`${MATERIEL_SELECT} WHERE m.id = $1`, [id])).rows[0] ?? null;
}

app.get('/admin/materiels', { preHandler: contenuG }, async (req) => {
  if (req.user.role === 'admin_etablissement' && !req.user.eid) return [];
  const filtre = req.user.role === 'admin_etablissement'
    ? req.user.eid
    : (typeof req.query.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null);
  const etat = typeof req.query.etat === 'string' && MATERIEL_ETATS.includes(req.query.etat) ? req.query.etat : null;
  const rows = (await q(
    `${MATERIEL_SELECT} WHERE ($1::uuid IS NULL OR m.etablissement_id = $1) AND ($2::text IS NULL OR m.etat = $2) ORDER BY m.nom ASC, m.cree_le DESC`,
    [filtre, etat],
  )).rows;
  return rows;
});

app.post('/admin/materiels', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'responsable');
  const b = materielCorps.parse(req.body ?? {});
  if (req.user.role === 'admin_etablissement' && !req.user.eid) throw httpError(403, 'Aucun établissement rattaché, création impossible.');
  let etabId = b.etablissement_id ?? null;
  if (req.user.role === 'admin_etablissement') {
    if (etabId != null && etabId !== req.user.eid) throw httpError(403, 'Ce matériel n’appartient pas à votre établissement.');
    etabId = req.user.eid;
  }
  const row = (await q(
    `INSERT INTO materiels (nom, categorie, quantite, etat, lieu, etablissement_id, cree_par) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [b.nom, b.categorie ?? null, b.quantite ?? null, b.etat, b.lieu ?? null, etabId, req.user.sub],
  )).rows[0];
  await audit(pool, req, 'materiel.cree', 'materiels', row.id, { nom: b.nom, etablissement_id: etabId });
  return reply.code(201).send(row);
});

app.put('/admin/materiels/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = materielCorps.parse(req.body ?? {});
  const ancien = await materielParId(id);
  if (!ancien) throw httpError(404, 'Matériel introuvable.');
  let etabId = b.etablissement_id ?? ancien.etablissement_id ?? null;
  if (req.user.role === 'admin_etablissement') {
    if (!req.user.eid || ancien.etablissement_id == null || ancien.etablissement_id !== req.user.eid) throw httpError(403, 'Ce matériel n’appartient pas à votre établissement.');
    if (b.etablissement_id != null && b.etablissement_id !== req.user.eid) throw httpError(403, 'Ce matériel n’appartient pas à votre établissement.');
    etabId = req.user.eid;
  }
  const row = (await q(
    `UPDATE materiels SET nom = $1, categorie = $2, quantite = $3, etat = $4, lieu = $5, etablissement_id = $6, modifie_le = now() WHERE id = $7 RETURNING *`,
    [b.nom, b.categorie ?? null, b.quantite ?? null, b.etat, b.lieu ?? null, etabId, id],
  )).rows[0];
  await audit(pool, req, 'materiel.modifie', 'materiels', id, { nom: b.nom, etablissement_id: etabId });
  return row;
});

// Images et audio publics (couvertures, photos, enseignements). Jamais de PDF/EPUB ici.
// Sécurité, 22 nov. 2026 : un fichier rattaché à un document
// ne se sert plus sans contrôle. Le document public exige un
// membre authentifié, comme /documents, le document à accès
// restreint exige un membre de son établissement, comme par
// /documents/:id/fichier. Un fichier sans document, image de
// couverture ou d'actualité, reste servi tel quel : le client
// le charge en URL d'image sans en-tête d'autorisation, et
// l'exiger ici casserait toutes les couvertures.
// Le contrôle vit dans la route, pas en preHandler, pour ne
// l'appliquer qu'aux fichiers de documents.
app.get('/fichiers/:id', async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const docs = (await q('SELECT etablissement_id FROM documents WHERE fichier_id = $1', [id])).rows;
  if (docs.length) {
    try {
      await req.jwtVerify();
    } catch {
      return reply.code(401).send({ erreur: 'Authentification requise.' });
    }
    // Visible quand au moins un document qui le référence
    // l'est : document public, ou de l'établissement du membre.
    if (req.user.role !== 'admin_general') {
      const m = req.user.mid ? (await q('SELECT etablissement_id FROM membres WHERE id = $1', [req.user.mid])).rows[0] : null;
      const visible = docs.some((d) => d.etablissement_id == null || d.etablissement_id === m?.etablissement_id);
      if (!visible) throw httpError(404, 'Fichier introuvable.');
    }
  }
  const f = (await q('SELECT cle_stockage, type_mime_reel, donnees FROM fichiers WHERE id = $1 AND verifie', [id])).rows[0];
  if (!f || !/^(image|audio)\//.test(f.type_mime_reel)) throw httpError(404, 'Fichier introuvable.');
  reply.header('Cache-Control', 'private, max-age=86400');
  if (f.donnees) return sendBuffer(req, reply, f.donnees, f.type_mime_reel);
  return sendFile(req, reply, f.cle_stockage, f.type_mime_reel);
});

// Cloche de notifications internes, 29 oct. 2026 : création faite
// au mieux, après la validation de l'action principale et hors
// transaction, pour qu'un échec de notification ne puisse jamais
// faire échouer une validation de paiement ou une publication.
// Chaque échec est journalisé puis ignoré. Les textes viennent du
// serveur, en français, comme les autres messages serveur.
const libellePaiement = (t) =>
  t === 'don' ? 'don' : t === 'achat' ? 'achat' : t === 'carte' ? 'carte de membre' : t === 'cotisation' ? 'cotisation' : t === 'camp' ? 'versement du camp' : t === 'plateforme' ? 'abonnement Plateforme' : 'paiement';
const fcfaTexte = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;

// Plafond : 100 dernières notifications par membre, les plus
// anciennes supprimées à l'insertion.
async function taillerNotifications() {
  try {
    await q(`DELETE FROM notifications n WHERE n.id IN (
      SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY membre_id ORDER BY cree_le DESC, id DESC) AS rn FROM notifications
      ) s WHERE rn > 100)`);
  } catch (e) {
    app.log.error(e);
  }
}
// Prénom du membre, 30 oct. 2026 : premier mot du nom complet,
// exactement comme la salutation de l'accueil dans l'application.
// Chaîne vide si aucun nom utilisable, jamais un texte cassé.
function prenomDe(nomComplet) {
  const nom = (nomComplet ?? '').toString().trim();
  if (!nom) return '';
  return nom.split(/\s+/)[0];
}

// Notifications adressées à un seul membre. Les libellés peuvent
// contenir {prenom}, remplacé par le prénom du membre. Sans prénom,
// les libellés de repli sont utilisés tels quels.
async function notifierMembre(membreId, type, titre, message, lienType, lienId, titreSansPrenom, messageSansPrenom, extra = {}, options = {}) {
  if (!membreId) return;
  try {
    const m = (await q('SELECT nom_complet FROM membres WHERE id = $1', [membreId])).rows[0];
    const prenom = prenomDe(m?.nom_complet);
    const titreFinal = prenom ? titre.replaceAll('{prenom}', prenom) : (titreSansPrenom ?? titre);
    const messageFinal = prenom ? message.replaceAll('{prenom}', prenom) : (messageSansPrenom ?? message);
    await q(
      `INSERT INTO notifications (membre_id, type, titre, message, lien_type, lien_id) VALUES ($1,$2,$3,$4,$5,$6)`,
      [membreId, type, titreFinal, messageFinal, lienType ?? null, lienId ?? null],
    );
    await taillerNotifications();
    // Poussée Android, au mieux, pour ce seul membre, avec le
    // texte personnalisé déjà calculé. Jamais de prière ici, les
    // poussées ne portent que les types de la cloche.
    await envoyerPushMembres([membreId], type, titreFinal, messageFinal, lienType, lienId, extra, options);
  } catch (e) {
    app.log.error(e);
  }
}

// Notification par cloche seulement, mur v2 tranche 3 : même
// insertion que notifierMembre, sans poussée FCM. Pour les
// réactions et les nouveaux suiveurs, que l'auteur voit dans
// l'application sans être dérangé sur son téléphone.
async function notifierClocheSeule(membreId, type, titre, message, lienType, lienId, titreSansPrenom, messageSansPrenom) {
  if (!membreId) return;
  try {
    const m = (await q('SELECT nom_complet FROM membres WHERE id = $1', [membreId])).rows[0];
    const prenom = prenomDe(m?.nom_complet);
    const titreFinal = prenom ? titre.replaceAll('{prenom}', prenom) : (titreSansPrenom ?? titre);
    const messageFinal = prenom ? message.replaceAll('{prenom}', prenom) : (messageSansPrenom ?? message);
    await q(
      `INSERT INTO notifications (membre_id, type, titre, message, lien_type, lien_id) VALUES ($1,$2,$3,$4,$5,$6)`,
      [membreId, type, titreFinal, messageFinal, lienType ?? null, lienId ?? null],
    );
    await taillerNotifications();
  } catch (e) {
    app.log.error(e);
  }
}
// Notifications adressées à tous les membres, personnalisées une
// par une. Les libellés peuvent contenir {prenom}, remplacé par le
// prénom de chaque membre. Sans prénom, les libellés de repli sont
// utilisés tels quels. Une seule requête, aucun changement de type
// ni de déclencheur.
async function notifierTous(type, titre, message, lienType, lienId, titreSansPrenom, messageSansPrenom) {
  try {
    await q(
      `INSERT INTO notifications (membre_id, type, titre, message, lien_type, lien_id)
       SELECT id, $1,
         CASE WHEN btrim(COALESCE(nom_complet, '')) = '' THEN $6 ELSE REPLACE($2, '{prenom}', split_part(btrim(nom_complet), ' ', 1)) END,
         CASE WHEN btrim(COALESCE(nom_complet, '')) = '' THEN $7 ELSE REPLACE($3, '{prenom}', split_part(btrim(nom_complet), ' ', 1)) END,
         $4, $5 FROM membres`,
      [type, titre, message, lienType ?? null, lienId ?? null, titreSansPrenom ?? titre, messageSansPrenom ?? message],
    );
    await taillerNotifications();
    // Poussée Android à tous, au mieux, avec le texte générique
    // sans prénom. Le filtre par catégorie est fait côté serveur
    // à partir des catégories envoyées avec chaque jeton.
    await envoyerPushTous(type, titre, message, lienType, lienId, titreSansPrenom, messageSansPrenom);
  } catch (e) {
    app.log.error(e);
  }
}
// Notifications poussées Android, 2 nov. 2026 : envoi FCM en
// plus de la cloche, jamais à la place. La cloche reste la source
// de vérité, un échec de poussée ne fait jamais échouer
// l'action principale, et un jeton invalide est désactivé sans
// planter l'envoi aux autres. Types déjà émis par le serveur,
// mêmes que les réglages par catégorie dans l'application.
const TYPES_NOTIFICATIONS_CONNUS = [
  'paiement_valide',
  'paiement_refuse',
  'cotisation_rappel',
  'nouveau_camp',
  'nouvel_enseignement',
  'nouvelle_actualite',
  'nouvelle_reunion',
  // Carte 124, 10 nov. 2026 : Espace parent, sinon la poussée
  // Android de ces types est filtrée côté serveur et le parent
  // n'est informé que par la cloche interne.
  'presence_enfant',
  'moyenne',
  'moyenne_enfant',
  // Messagerie et Signalement, 16 nov. 2026 : un nouveau message
  // prévient ses participants, la clôture d'un signalement
  // prévient son rapporteur. La cloche interne reçoit ces types
  // dans tous les cas ; la poussée suit les catégories du jeton.
  'nouveau_message',
  'signalement_cloture',
  // Mur des membres v2, tranche 6, 25 nov. 2026 : commentaire
  // et mention du mur, cloche et poussée. 'mur_reaction' et
  // 'mur_suivi' restent hors de cette liste, cloche seulement,
  // ils ne sont jamais poussés.
  'mur_commentaire',
  'mur_mention',
  // Appels audio et vidéo, 16 nov. 2026 : un appel entrant
  // prévient l'appelé, cloche interne et poussée FCM.
  'appel_entrant',
];

// Texte générique pour une poussée à tous, sans prénom, à partir
// du libellé avec {prenom} ou de son libellé de repli quand il
// existe. Les espaces et la ponctuation en trop sont nettoyés,
// pour ne jamais envoyer « Bonjour , » à un membre sans prénom.
function textePushGenerique(texte, repli) {
  let out = (repli ?? texte ?? '').toString();
  out = out.replaceAll('{prenom}', '').replace(/\s{2,}/g, ' ').trim();
  out = out.replace(/^[,;:]\s*/, '').replace(/\s+([,.;:!?])/g, '$1');
  return out;
}

// Envoi à une liste de jetons déjà filtrés, avec désactivation
// des jetons invalides. Best effort, sans jamais lever vers
// l'appelant, sauf si le compte de service est absent, auquel
// cas l'envoi est simplement ignoré, la cloche suffit.
async function envoyerPushJetons(jetons, type, titre, message, lienType, lienId, extra = {}, options = {}) {
  if (!jetons || jetons.length === 0) return;
  try {
    const compte = fcmServiceAccount();
    if (!compte) return;
    const acces = await fcmAccessToken(compte);
    const invalides = [];
    for (const ligne of jetons) {
      const jeton = ligne?.jeton;
      if (!jeton) continue;
      // Filtre serveur par catégorie : un jeton dont les
      // catégories sont renseignées et n'incluent pas le type ne
      // reçoit rien. Un jeton sans catégories, ancien ou non
      // synchronisé, reçoit tout, comme la cloche. Les catégories
      // sont normalisées, carte 1, 21 nov. 2026 : un jeton déjà
      // stocké avec 'messagerie' reçoit les 'nouveau_message'.
      const cats = normaliserCategoriesPush(ligne?.categories);
      if (cats.length > 0 && !cats.includes(type)) continue;
      try {
        const res = await fcmSendOne(compte, acces, jeton, titre, message, {
          type,
          lien_type: lienType ?? '',
          lien_id: lienId ?? '',
        }, extra, options);
        if (!res.ok && res.invalide) invalides.push(jeton);
      } catch (e) {
        app.log.error(e);
      }
    }
    for (const jeton of invalides) {
      try {
        await q(`UPDATE notification_tokens SET actif = false, modifie_le = now() WHERE jeton = $1`, [jeton]);
      } catch (e) {
        app.log.error(e);
      }
    }
  } catch (e) {
    app.log.error(e);
  }
}

async function envoyerPushMembres(membreIds, type, titre, message, lienType, lienId, extra = {}, options = {}) {
  if (!membreIds || membreIds.length === 0) return;
  try {
    const rows = (
      await q(
        `SELECT jeton, categories FROM notification_tokens WHERE actif = true AND membre_id = ANY($1::uuid[])`,
        [membreIds],
      )
    ).rows;
    await envoyerPushJetons(rows, type, titre, message, lienType, lienId, extra, options);
  } catch (e) {
    app.log.error(e);
  }
}

async function envoyerPushTous(type, titre, message, lienType, lienId, titreSansPrenom, messageSansPrenom) {
  try {
    const rows = (
      await q(`SELECT jeton, categories FROM notification_tokens WHERE actif = true`)
    ).rows;
    await envoyerPushJetons(
      rows,
      type,
      textePushGenerique(titre, titreSansPrenom),
      textePushGenerique(message, messageSansPrenom),
      lienType,
      lienId,
    );
  } catch (e) {
    app.log.error(e);
  }
}

// Don de camp, 31 oct. 2026 : le beneficiaire effectif d'un paiement
// de camp, celui qui offre pour un don, le membre lui-meme sinon.
function beneficiaireEffectif(paiement) {
  if (!paiement) return null;
  if (paiement.beneficiaire_contact) return paiement.beneficiaire_id ?? null;
  return paiement.membre_id ?? null;
}

// Don de camp, 31 oct. 2026 : rattache un don deja valide a un
// beneficiaire qui vient d'etre identifie (creation de compte ou
// validation tardive). Cree son inscription si elle manque, puis
// lui annonce le don dans sa cloche. Best effort : un echec ici
// ne doit jamais faire echouer la validation ou l'inscription.
async function annoncerDon(paiement, beneficiaireId) {
  try {
    if (!paiement || !paiement.evenement_id || !beneficiaireId) return;
    const ev = (await q('SELECT id, nom, type, tarif_fcfa FROM evenements WHERE id = $1', [paiement.evenement_id])).rows[0];
    if (!ev) return;
    await q(
      'INSERT INTO inscriptions (evenement_id, membre_id, versements_requis) VALUES ($1,$2,$3) ON CONFLICT (evenement_id, membre_id) DO NOTHING',
      [paiement.evenement_id, beneficiaireId, (ev.tarif_fcfa ?? 0) > 0],
    );
    // Groupe automatique de camp ou de retraite, 18 nov. 2026 :
    // le bénéficiaire du don offert entre aussi dans le groupe.
    if (estTypeEvenementGroupe(ev.type)) {
      await assurerGroupeEvenement(paiement.evenement_id, ev.nom, beneficiaireId);
    }
    const donateur = (await q('SELECT nom_complet FROM membres WHERE id = $1', [paiement.membre_id])).rows[0];
    const nomDonateur = donateur?.nom_complet ?? 'Un membre';
    const messageDon = paiement.message_don ? ` Message de ${nomDonateur} : « ${paiement.message_don} »` : '';
    await notifierMembre(
      beneficiaireId,
      'camp_rappel',
      'Camp offert, entièrement payé',
      `Bonjour {prenom}, ${nomDonateur} vous a offert le camp ${ev.nom}. Votre pass est maintenant disponible dans vos inscriptions.${messageDon}`,
      'camp',
      paiement.evenement_id,
      'Camp offert, entièrement payé',
      `${nomDonateur} vous a offert le camp ${ev.nom}. Votre pass est maintenant disponible dans vos inscriptions.${messageDon}`,
    );
  } catch (e) {
    app.log.error(e);
  }
}

// Groupe automatique de camp ou de retraite, 18 nov. 2026 : le
// groupe au nom de l'événement est créé s'il n'existe pas
// encore, avec tous ses inscrits actuels, puis la nouvelle
// inscription y entre. Best effort : un échec ici ne doit
// jamais faire échouer l'inscription, le groupe sera créé ou
// complété à la prochaine inscription.
async function assurerGroupeEvenement(evenementId, titre, membreId) {
  try {
    await tx(async (c) => {
      let g = (await c.query(SQL_GROUPE_EVENEMENT, [evenementId])).rows[0];
      if (!g) {
        const cree = (await c.query(SQL_CREER_GROUPE_EVENEMENT, [titre, membreId, evenementId])).rows[0];
        g = cree ?? (await c.query(SQL_GROUPE_EVENEMENT, [evenementId])).rows[0];
        if (!g) return;
        await audit(c, null, 'messagerie.conversation_creee', 'conversations', g.id, { type: 'groupe_structure', evenement_id: evenementId, automatique: true });
      }
      await c.query(SQL_AJOUTER_INSCRITS_GROUPE, [g.id, evenementId]);
    });
  } catch (e) {
    app.log.warn({ err: e, evenement_id: evenementId }, 'Groupe automatique de camp : création reportée à la prochaine inscription');
  }
}

// Don de camp, 31 oct. 2026 : resolution d'un beneficiaire deja
// membre par le contact saisi, sans exposer ses donnees.
async function resoudreBeneficiaire(contact) {
  if (!contact) return null;
  const normalise = contact.includes('@') ? contact.trim().toLowerCase() : normalizePhoneServer(contact);
  const variantes = contact.includes('@') ? [normalise] : phoneVariantsServer(contact);
  const row = (await q(
    `SELECT m.id FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id
     WHERE u.email = $1 OR u.telephone = $2 OR u.telephone = $3`,
    [normalise, variantes[0], variantes[1] ?? variantes[0]],
  )).rows[0];
  return row?.id ?? null;
}

// Don de camp, 31 oct. 2026 : a la creation d'un compte, les dons
// deja valides pour ce contact (e-mail ou telephone, normalises
// comme a l'inscription) s'attachent seuls au nouveau membre :
// inscription creee, pass debloque par le montant paye,
// notification dans sa cloche. Best effort, jamais bloquant.
// Lien automatique Bureau à l'inscription, 3 nov. 2026.
// Appelé après la création du membre, sans jamais faire échouer
// l'inscription : toute erreur est journalisée, jamais remontée.
// Règles strictes, décision dans deciderLienBureau : nom complet
// normalisé exactement égal à une entrée sans membre lié, prénoms
// seuls jamais liés, et si l'entrée a un contact, ce contact doit
// correspondre au téléphone normalisé ou à l'e-mail de
// l'inscription. En cas de lien : membre_id rempli, contact de
// l'entrée actualisé avec le téléphone ou l'e-mail de
// l'inscription, établissement ISPAM mis sur le membre seulement
// s'il n'en a pas choisi. La fonction de Bureau reste sur la
// page Bureau : la fonction choisie par le membre à son
// inscription n'est jamais écrasée. Le journal ne contient que
// l'identifiant du membre et la fonction de Bureau, jamais un
// contact.
async function lierBureauAInscription(membreId, { nomComplet, email, telephone, telephoneNormalise, etablissementId }) {
  try {
    const entrees = (
      await q(
        'SELECT id, nom, fonction, contact FROM bureau_membres WHERE membre_id IS NULL ORDER BY ordre, cree_le',
      )
    ).rows;
    const emailNormalise = email ? email.trim().toLowerCase() : null;
    for (const entree of entrees) {
      const contactBrut = (entree.contact ?? '').trim();
      const contactNormalise = !contactBrut
        ? ''
        : contactBrut.includes('@')
          ? contactBrut.toLowerCase()
          : normalizePhoneServer(contactBrut);
      const decision = deciderLienBureau(
        { nom: entree.nom, contactNormalise },
        { nomComplet, emailNormalise, telephoneNormalise: telephoneNormalise ?? normalizePhoneServer(telephone ?? '') },
      );
      if (!decision.lier) continue;
      const nouveauContact = telephone ?? email ?? entree.contact;
      const lie = await tx(async (c) => {
        const misAJour = (
          await c.query(
            'UPDATE bureau_membres SET membre_id = $1, contact = $2 WHERE id = $3 AND membre_id IS NULL RETURNING id',
            [membreId, nouveauContact, entree.id],
          )
        ).rows[0];
        // Course avec une autre inscription du même nom : la
        // clause membre_id IS NULL a déjà tranché, on s'arrête.
        if (!misAJour) return false;
        if (!etablissementId) {
          const ispam = (
            await c.query(
              "SELECT id FROM etablissements WHERE lower(nom) IN ('ispam', 'groupe scolaire ispam') ORDER BY nom LIMIT 1",
            )
          ).rows[0];
          if (ispam) {
            await c.query('UPDATE membres SET etablissement_id = $1 WHERE id = $2 AND etablissement_id IS NULL', [
              ispam.id,
              membreId,
            ]);
          }
        }
        const utilisateur = (
          await c.query('SELECT utilisateur_id FROM membres WHERE id = $1', [membreId])
        ).rows[0];
        await audit(
          c,
          { user: { sub: utilisateur?.utilisateur_id ?? null }, ip: null },
          'bureau.lie_inscription',
          'bureau_membres',
          entree.id,
          { membre_id: membreId, fonction: entree.fonction },
        );
        return true;
      });
      if (lie) return;
    }
  } catch (e) {
    app.log.error(e);
  }
}

async function attacherDonsEnAttente(membreId, email, telephone) {
  try {
    const contacts = [email ?? null, ...(telephone && !telephone.includes('@') ? phoneVariantsServer(telephone) : [telephone])].filter((v) => v);
    if (contacts.length === 0) return;
    const rows = (await q(
      `SELECT p.* FROM paiements p WHERE p.type = 'camp' AND p.statut = 'confirme'
       AND p.beneficiaire_id IS NULL AND p.beneficiaire_contact IS NOT NULL AND p.beneficiaire_contact = ANY($1)`,
      [contacts],
    )).rows;
    for (const row of rows) {
      await q('UPDATE paiements SET beneficiaire_id = $1 WHERE id = $2 AND beneficiaire_id IS NULL', [membreId, row.id]);
      await annoncerDon({ ...row, beneficiaire_id: membreId }, membreId);
    }
  } catch (e) {
    app.log.error(e);
  }
}

// Carte 122, 10 nov. 2026 : envoi automatique du reçu et de la
// nouvelle carte de membre après validation du paiement, quel que
// soit son type (carte, cotisation, camp, don, livre, Plateforme).
// Le reçu part pour chaque paiement validé, la nouvelle carte quand
// le paiement concerne la carte. Appelée après la confirmation, au
// mieux : un échec SMTP ne bloque jamais la validation, le reçu
// reste téléchargeable dans l'historique de paiement et la carte
// visible sur la page Carte. Aucune adresse n'est journalisée.
// Un seul envoi par paiement validé : cette fonction n'est appelée
// que quand la confirmation a eu lieu, et la ligne est relue par
// identifiant, pour ne pas dépendre des champs transmis par
// l'appelant (le webhook ne transmet ni la référence ni le
// bénéficiaire). La facture est attendue ici, pour ne jamais
// envoyer un reçu sans son PDF : ensureInvoice est idempotente.
async function envoyerRecuEtCarte(paiement) {
  if (!paiement?.id) return false;
  const p = (await q('SELECT * FROM paiements WHERE id = $1', [paiement.id])).rows[0];
  if (!p || p.statut !== 'confirme') return false;
  try {
    await ensureInvoice(p.id);
    const facture = (await q(
      'SELECT fi.cle_stockage FROM factures fa JOIN fichiers fi ON fi.id = fa.fichier_id WHERE fa.paiement_id = $1',
      [p.id],
    )).rows[0];
    if (!facture) {
      app.log.warn({ reference: p.reference }, 'Reçu non envoyé : facture introuvable.');
      return false;
    }
    const membre = (await q(
      `SELECT m.nom_complet, m.matricule, u.email FROM membres m
         JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1`,
      [p.membre_id],
    )).rows[0];
    if (!membre?.email) {
      app.log.warn({ reference: p.reference }, 'Reçu non envoyé : aucune adresse e-mail.');
      return false;
    }
    const pdf = await fsp.readFile(path.join(CFG.uploadDir, facture.cle_stockage));
    const estDon = p.type === 'camp' && (p.beneficiaire_id || p.beneficiaire_contact);
    const libelle = estDon ? 'don de camp' : libellePaiement(p.type);
    await envoyerRecuParEmail({
      destinataire: membre.email, nom: membre.nom_complet, reference: p.reference,
      libelle, montant: fcfaTexte(p.montant_fcfa), pdf,
    });
    if (p.type === 'carte') {
      try {
        const cartePdf = await genererCartePdfPourMembre(p.membre_id);
        if (cartePdf) {
          await envoyerCarteParEmail({
            destinataire: membre.email, nom: membre.nom_complet, matricule: membre.matricule, pdf: cartePdf,
          });
        }
      } catch (e) {
        app.log.error({ code: e.code, reference: p.reference }, 'Envoi de la carte impossible.');
      }
    }
    return true;
  } catch (e) {
    app.log.error({ code: e.code, reference: p.reference }, 'Envoi du reçu impossible.');
    return false;
  }
}

// Carte de membre en PDF pour un membre, avec ses données actuelles :
// une correction de nom se retrouve dans la carte envoyée. Sans membre,
// rien n'est généré.
async function genererCartePdfPourMembre(membreId) {
  const m = (await q(
    `SELECT m.nom_complet, m.matricule, m.inscrit_le, m.annee_adhesion, m.valide_jusqua, m.photo_donnees,
            e.nom AS etablissement FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id WHERE m.id = $1`,
    [membreId],
  )).rows[0];
  if (!m) return null;
  return genererCartePdf({
    nomComplet: m.nom_complet, matricule: m.matricule, etablissement: m.etablissement ?? '',
    anneeAdhesion: m.annee_adhesion ?? new Date(m.inscrit_le).getFullYear(),
    valideJusqua: m.valide_jusqua, photoDataUrl: m.photo_donnees ?? null,
  });
}

async function notifierPaiementValide(paiement) {
  if (!paiement) return;
  // Don de camp, 31 oct. 2026 : si le beneficiaire n'etait pas
  // encore connu a la creation du don, une validation tardive
  // (apres sa creation de compte) le rattache maintenant.
  if (paiement.type === 'camp' && paiement.beneficiaire_contact && !paiement.beneficiaire_id) {
    const trouve = await resoudreBeneficiaire(paiement.beneficiaire_contact);
    if (trouve) {
      await q('UPDATE paiements SET beneficiaire_id = $1 WHERE id = $2 AND beneficiaire_id IS NULL', [trouve, paiement.id]);
      paiement = { ...paiement, beneficiaire_id: trouve };
    }
  }
  const estDon = paiement.type === 'camp' && (paiement.beneficiaire_id || paiement.beneficiaire_contact);
  const libelle = estDon ? 'don de camp' : libellePaiement(paiement.type);
  await notifierMembre(
    paiement.membre_id,
    'paiement_valide',
    'Paiement validé',
    `Bonjour {prenom}, votre ${libelle} de ${fcfaTexte(paiement.montant_fcfa)} a été validé par la structure.`,
    'paiement',
    paiement.id,
    undefined,
    `Votre ${libelle} de ${fcfaTexte(paiement.montant_fcfa)} a été validé par la structure.`,
  );
  // Paiement du camp en 6 fois, 31 oct. 2026 : après chaque
  // versement validé, un rappel personnalisé dit ce qu'il reste à
  // payer et combien de versements restent, ou que le pass est
  // débloqué quand la totalité est atteinte. La totalité se mesure
  // au montant payé, pas au seul compte de 6 versements, pour
  // qu'un paiement en une fois ou un don débloque aussi le pass.
  if (paiement.type === 'camp' && paiement.evenement_id) {
    const cible = beneficiaireEffectif(paiement);
    const prog = cible ? await progressionCamp(cible, paiement.evenement_id) : null;
    if (prog) {
      if (estDon && paiement.beneficiaire_id) {
        await annoncerDon(paiement, paiement.beneficiaire_id);
      } else if (prog.restant <= 0) {
        if (!estDon) {
          await notifierMembre(
            paiement.membre_id,
            'camp_rappel',
            'Camp entièrement payé',
            `Bonjour {prenom}, votre camp ${prog.camp_nom} est entièrement payé. Votre pass est maintenant disponible dans vos inscriptions.`,
            'camp',
            paiement.evenement_id,
            'Camp entièrement payé',
            `Votre camp ${prog.camp_nom} est entièrement payé. Votre pass est maintenant disponible dans vos inscriptions.`,
          );
        }
      } else {
        const restants = 6 - prog.valides;
        await notifierMembre(
          cible,
          'camp_rappel',
          'Versement du camp validé',
          `Bonjour {prenom}, votre versement pour ${prog.camp_nom} est validé. Il vous reste ${fcfaTexte(prog.restant)} à payer, soit ${restants} versement${restants > 1 ? 's' : ''} sur 6.`,
          'camp',
          paiement.evenement_id,
          'Versement du camp validé',
          `Votre versement pour ${prog.camp_nom} est validé. Il vous reste ${fcfaTexte(prog.restant)} à payer, soit ${restants} versement${restants > 1 ? 's' : ''} sur 6.`,
        );
      }
    }
  }
  // Carte 122, 10 nov. 2026 : le reçu part par courriel, et la
  // nouvelle carte quand le paiement concerne la carte. Cette
  // fonction est appelée par les quatre chemins de confirmation
  // (validation structure, rapprochement Wave, webhook Wave,
  // PayPal), donc un seul point d'envoi les couvre tous. Au mieux,
  // sans attendre : un envoi lent ne retarde ni la validation ni
  // la réponse rapide du webhook, et un échec SMTP ne remet
  // jamais en cause la confirmation.
  envoyerRecuEtCarte(paiement).catch((e) => app.log.error(e));
}

// Paiement du camp en 6 fois, 31 oct. 2026 : montant d'un versement.
// Les 5 premiers prennent la part entière, le 6e prend le reste,
// pour que 6 versements validés égalent exactement le tarif.
function montantVersement(tarif, numero) {
  if (numero >= 6) return tarif - 5 * Math.floor(tarif / 6);
  return Math.floor(tarif / 6);
}

// Progression d'un membre pour un camp : versements validés
// (numéros distincts), montant payé, montant restant, versement
// suivant et son montant, versement en attente éventuel.
async function progressionCamp(membreId, evenementId) {
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1', [evenementId])).rows[0];
  if (!ev) return null;
  const tarif = ev.tarif_fcfa ?? 0;
  const agg = (await q(
    `SELECT COUNT(DISTINCT numero_versement) FILTER (WHERE statut = 'confirme')::int AS valides,
            COALESCE(SUM(montant_fcfa) FILTER (WHERE statut = 'confirme'), 0)::int AS paye
     FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp'`,
    [membreId, evenementId],
  )).rows[0];
  const valides = agg?.valides ?? 0;
  const paye = agg?.paye ?? 0;
  const suivant = valides >= 6 ? null : valides + 1;
  const enAttente = (await q(
    `SELECT reference, montant_fcfa, numero_versement FROM paiements
     WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'en_attente'
     ORDER BY cree_le DESC LIMIT 1`,
    [membreId, evenementId],
  )).rows[0] ?? null;
  return {
    camp_nom: ev.nom, tarif, paye,
    restant: Math.max(0, tarif - paye),
    valides, suivant,
    montant_suivant: suivant == null ? null : montantVersement(tarif, suivant),
    en_attente: enAttente ? { reference: enAttente.reference, montant_fcfa: enAttente.montant_fcfa, numero_versement: enAttente.numero_versement } : null,
  };
}

// Rappel de cotisation mensuelle, 29 oct. 2026 : un seul rappel
// par membre et par mois, à partir du 15, jamais rétroactif, qui
// disparaît seul dès que la cotisation du mois est soldée. Soldée
// veut dire : un paiement de cotisation confirmé pour le mois en
// cours, ou une cotisation enregistrée par la structure pour ce
// mois (espèces, via /admin/cotisations). Une demande en attente
// ne solde jamais. Appelée à chaque lecture de la cloche, donc à
// chaque ouverture et synchronisation de l'application.
async function entretenirRappelCotisation(membreId) {
  if (!membreId) return;
  try {
    // Nettoyage : les rappels des mois passés ne comptent jamais.
    await q(`DELETE FROM notifications WHERE membre_id = $1 AND type = 'cotisation_rappel'
             AND date_trunc('month', cree_le) < date_trunc('month', CURRENT_DATE)`, [membreId]);
    const solde = (
      await q(
        `SELECT 1 FROM paiements WHERE membre_id = $1 AND type = 'cotisation' AND statut = 'confirme'
           AND date_trunc('month', COALESCE(confirme_le, cree_le)) = date_trunc('month', CURRENT_DATE)
         UNION ALL
         SELECT 1 FROM cotisations WHERE membre_id = $1 AND mois = date_trunc('month', CURRENT_DATE)::date
         LIMIT 1`,
        [membreId],
      )
    ).rows[0];
    if (solde) {
      // Réglé : le rappel du mois disparaît seul.
      await q(`DELETE FROM notifications WHERE membre_id = $1 AND type = 'cotisation_rappel'
               AND date_trunc('month', cree_le) = date_trunc('month', CURRENT_DATE)`, [membreId]);
      return;
    }
    const jour = (await q(`SELECT EXTRACT(DAY FROM CURRENT_DATE)::int AS j`)).rows[0]?.j ?? 1;
    if (jour < 15) return;
    const deja = (
      await q(
        `SELECT 1 FROM notifications WHERE membre_id = $1 AND type = 'cotisation_rappel'
           AND date_trunc('month', cree_le) = date_trunc('month', CURRENT_DATE) LIMIT 1`,
        [membreId],
      )
    ).rows[0];
    if (deja) return;
    const membre = (await q('SELECT nom_complet FROM membres WHERE id = $1', [membreId])).rows[0];
    const prenom = prenomDe(membre?.nom_complet);
    const messageRappel = prenom
      ? `Bonjour ${prenom}, votre cotisation du mois n’est pas encore réglée. Réglez-la pour rester à jour.`
      : 'Votre cotisation du mois n’est pas encore réglée. Réglez-la pour rester à jour.';
    await q(
      `INSERT INTO notifications (membre_id, type, titre, message, lien_type, lien_id)
       VALUES ($1, 'cotisation_rappel', 'Rappel, cotisation mensuelle', $2, 'cotisation', NULL)`,
      [membreId, messageRappel],
    );
  } catch (e) {
    app.log.error(e);
  }
}

// Rappel mensuel des versements de camp, 31 oct. 2026 : même
// précédent que la cotisation, un seul rappel par camp et par
// mois, généré quand l'application tourne, jamais poussé si elle
// est fermée. Tant que le solde reste, le membre reçoit chaque
// mois un rappel personnalisé (montant restant, versements
// restants). Les rappels s'arrêtent 12 jours avant le début du
// camp, ce qui donne le 10 août 2027 pour un camp commençant le
// 22 août ; sans date de début utilisable, ils continuent tant
// que le solde reste. L'échéance arrête seulement les rappels :
// aucun paiement n'est jamais bloqué après elle, un versement
// tardif débloque toujours le pass dès que la totalité est
// atteinte. Appelée à chaque lecture de la cloche, comme le
// rappel de cotisation.
async function entretenirRappelsCamp(membreId) {
  if (!membreId) return;
  try {
    const plans = (await q(
      `SELECT i.evenement_id, e.nom, e.date_debut, e.tarif_fcfa,
              (SELECT COUNT(DISTINCT numero_versement) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme')::int AS valides,
              (SELECT COALESCE(SUM(montant_fcfa), 0) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme')::int AS paye
       FROM inscriptions i JOIN evenements e ON e.id = i.evenement_id
       WHERE i.membre_id = $1 AND i.versements_requis
         AND (e.date_debut IS NULL OR CURRENT_DATE <= e.date_debut - INTERVAL '12 days')`,
      [membreId],
    )).rows;
    for (const plan of plans) {
      const valides = plan.valides ?? 0;
      const tarif = plan.tarif_fcfa ?? 0;
      const restant = Math.max(0, tarif - (plan.paye ?? 0));
      if (restant <= 0) continue;
      const restants = 6 - valides;
      // Un seul rappel par camp et par mois, quel que soit son
      // déclencheur (plan, validation ou mensuel).
      const deja = (await q(
        `SELECT 1 FROM notifications WHERE membre_id = $1 AND lien_type = 'camp' AND lien_id = $2 AND type IN ('camp_rappel', 'camp_rappel_mensuel')
           AND date_trunc('month', cree_le) = date_trunc('month', CURRENT_DATE) LIMIT 1`,
        [membreId, plan.evenement_id],
      )).rows[0];
      if (deja) continue;
      await notifierMembre(
        membreId,
        'camp_rappel_mensuel',
        'Rappel, paiement du camp',
        `Bonjour {prenom}, il vous reste ${fcfaTexte(restant)} à payer pour ${plan.nom}, soit ${restants} versement${restants > 1 ? 's' : ''} sur 6.`,
        'camp',
        plan.evenement_id,
        'Rappel, paiement du camp',
        `Il vous reste ${fcfaTexte(restant)} à payer pour ${plan.nom}, soit ${restants} versement${restants > 1 ? 's' : ''} sur 6.`,
      );
    }
  } catch (e) {
    app.log.error(e);
  }
}

// ───────────────────────── Espace membre ─────────────────────────
app.get('/moi', { preHandler: membreG }, async (req) => {
  const r = (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet, m.valide_jusqua, m.inscrit_le, m.annee_adhesion, m.statut_adhesion, m.pays_residence, m.ville, e.nom AS etablissement, m.photo_donnees AS photo, m.fonction AS fonction,
              to_char(m.date_naissance, 'YYYY-MM-DD') AS date_naissance, u.telephone AS telephone, u.email AS email, m.fuseau AS fuseau, m.fuseau_decalage_min AS fuseau_decalage_min, u.supprime_le AS supprime_le,
              (SELECT max(mois) FROM cotisations c WHERE c.membre_id = m.id) AS derniere_cotisation
       FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id LEFT JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1`,
      [req.user.mid],
    )
  ).rows[0];
  if (!r) throw httpError(404, 'Profil introuvable.');
  return r;
});

// Presence : chaque ouverture ou synchronisation de l'application
// signale l'activite du membre. Sans ce signal, le serveur ne saurait
// pas qui est en ligne, car il n'y a ni WebSocket ni notification poussee.
app.post('/moi/activite', { preHandler: membreG }, async (req) => {
  await q('UPDATE membres SET derniere_activite = now() WHERE id = $1', [req.user.mid ?? null]);
  return { ok: true };
});

// Fuseau par membre, 4 nov. 2026, décidé par Axel : chaque personne
// qui se connecte est alignée sur le fuseau de son pays de
// connexion, pas sur un fuseau fixe. L'appareil envoie seulement
// son nom de fuseau et son décalage courant en minutes, jamais
// une position GPS, jamais un pays deviné. Les dates restent en
// UTC en base ; la conversion se fait à l'usage, par exemple pour
// le courriel d'anniversaire. Un décalage hors plage est refusé,
// un fuseau vide donne un repli UTC, jamais un fuseau inventé.
app.post('/moi/fuseau', { preHandler: membreG }, async (req) => {
  const b = z.object({
    fuseau: z.string().max(80).optional().default(''),
    decalage_minutes: z.number().int().min(-840).max(840).optional().default(0),
  }).parse(req.body ?? {});
  await q('UPDATE membres SET fuseau = $2, fuseau_decalage_min = $3 WHERE id = $1', [req.user.mid, String(b.fuseau).slice(0, 80), b.decalage_minutes]);
  return { ok: true, fuseau: b.fuseau, decalage_minutes: b.decalage_minutes };
});

// Photo de profil du membre, 28 oct. 2026 : avant, la photo
// n'existait que sur le téléphone, dans un chemin local, donc elle
// disparaissait à la déconnexion, et la déconnexion efface le
// profil local. Ici la photo est gardée côté serveur, dans la base,
// pas dans un fichier du serveur, car le disque Render s'efface à
// chaque redéploiement. À la connexion, /moi renvoie la photo, et
// l'application l'affiche au même moment que le compte. Taille
// limitée : la photo est réduite côté application avant l'envoi,
// et le serveur refuse toute image de plus de 700 Ko décodée, ou
// qui n'est pas JPEG, PNG ou WebP, d'après ses premiers octets.
app.post('/moi/photo', { preHandler: membreG }, async (req) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const photo = body.photo;
  if (photo === null || photo === '') {
    await q('UPDATE membres SET photo_donnees = NULL WHERE id = $1', [req.user.mid]);
    return { ok: true, photo: null };
  }
  if (typeof photo !== 'string') throw httpError(400, 'Photo invalide.');
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=\r\n]+)$/.exec(photo);
  if (!m) throw httpError(400, 'Photo invalide : image JPEG, PNG ou WebP attendue.');
  let bytes;
  try {
    bytes = Buffer.from(m[2], 'base64');
  } catch {
    throw httpError(400, 'Photo invalide.');
  }
  if (bytes.length === 0 || bytes.length > 700 * 1024) throw httpError(413, 'Photo trop volumineuse.');
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const isWebp = bytes.length > 11 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  if (!isJpeg && !isPng && !isWebp) throw httpError(415, 'Type de photo non autorisé.');
  await q('UPDATE membres SET photo_donnees = $2 WHERE id = $1', [req.user.mid, photo]);
  return { ok: true, photo };
});

// Signature de l'administrateur, carte 96, 8 nov. 2026 : la
// carte 95 la gardait en local seulement, sur l'appareil qui
// l'avait dessinée. Ici elle est gardée côté serveur, en base,
// sur utilisateurs.signature_admin, rattachée au compte qui
// l'a dessinée, avec sa date de mise à jour, pour suivre
// l'administrateur sur tous ses appareils et apparaître sur
// l'attestation ouverte par le membre lui-même. Une signature
// par administrateur, jamais celle d'un autre : les routes
// d'écriture lisent seulement req.user.sub, jamais un matricule
// du corps ni de l'URL. L'image n'est jamais reprise dans le
// journal d'audit, seulement l'action, sans donnée d'image.
// Signature visuelle, pour les documents internes, pas une
// signature électronique certifiée, comme pour la carte 95.
app.get('/moi/signature', { preHandler: contenuG }, async (req) => {
  const r = (await q('SELECT signature_admin AS signature, signature_admin_le FROM utilisateurs WHERE id = $1', [req.user.sub])).rows[0];
  return { signature: r?.signature ?? null, signature_admin_le: r?.signature_admin_le ?? null };
});

app.post('/moi/signature', { preHandler: contenuG }, async (req) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const refus = validerSignatureAdmin({ signature: body.signature, role: req.user.role });
  if (refus) throw httpError(refus.statut, refus.message);
  const r = (await q(
    'UPDATE utilisateurs SET signature_admin = $2, signature_admin_le = now() WHERE id = $1 RETURNING signature_admin_le',
    [req.user.sub, String(body.signature).trim()],
  )).rows[0];
  if (!r) throw httpError(404, 'Profil introuvable.');
  await audit(pool, req, 'signature_admin.enregistree', 'utilisateurs', req.user.sub, {});
  return { ok: true, signature_admin_le: r.signature_admin_le };
});

app.delete('/moi/signature', { preHandler: contenuG }, async (req) => {
  const r = (await q(
    'UPDATE utilisateurs SET signature_admin = NULL, signature_admin_le = NULL WHERE id = $1 RETURNING id',
    [req.user.sub],
  )).rows[0];
  if (!r) throw httpError(404, 'Profil introuvable.');
  await audit(pool, req, 'signature_admin.supprimee', 'utilisateurs', req.user.sub, {});
  return { ok: true, signature: null };
});

// Lecture de la signature d'un signataire, pour l'affichage d'un
// document : le matricule est celui du signataire, retrouvé par
// membres.utilisateur_id. Garde limitée au signataire du document :
// un administrateur lit n'importe quel signataire, un membre
// seulement celui qui lui a délivré une attestation, vérifié en
// base sur attestations.delivre_par, jamais sur une déclaration
// de l'appelant. Hors de ces deux cas, 404, sans révéler si la
// signature existe. Sert de repli côté application quand le HTML
// du serveur arrive encore avec sa ligne vide.
app.get('/moi/signatures/:matricule', { preHandler: membreG }, async (req) => {
  const matricule = normaliserMatriculeSignature(req.params?.matricule);
  if (!matricule) throw httpError(404, 'Signature introuvable.');
  const signataire = (await q(
    'SELECT u.id, u.signature_admin AS signature FROM utilisateurs u JOIN membres m ON m.utilisateur_id = u.id WHERE m.matricule = $1',
    [matricule],
  )).rows[0];
  if (!signataire) throw httpError(404, 'Signature introuvable.');
  const estAdmin = req.user.role === 'admin_general' || req.user.role === 'admin_etablissement';
  if (!estAdmin) {
    if (!req.user.mid) throw httpError(404, 'Signature introuvable.');
    const delivree = (await q(
      'SELECT 1 FROM attestations WHERE membre_id = $1 AND delivre_par = $2 LIMIT 1',
      [req.user.mid, signataire.id],
    )).rows[0];
    if (!delivree) throw httpError(404, 'Signature introuvable.');
  }
  return { signature: signataire.signature ?? null };
});

// Fonction du membre, 28 oct. 2026 : comme la photo, elle est
// gardée côté serveur, dans la base, pour survivre à la
// déconnexion, qui efface le profil local. Avant, elle n'existait
// que sur l'appareil, donc après déconnexion puis reconnexion,
// la carte retombait sur « Membre », sans fonction.
app.post('/moi/fonction', { preHandler: membreG }, async (req) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const fonction = body.fonction;
  if (typeof fonction !== 'string' || !FONCTIONS_MEMBRE.includes(fonction)) {
    throw httpError(400, 'Fonction invalide : choisissez une fonction dans la liste.');
  }
  await q('UPDATE membres SET fonction = $2 WHERE id = $1', [req.user.mid, fonction]);
  return { ok: true, fonction };
});

// Nom et ville du membre, T11, 26 nov. 2026 : décidés par Axel le
// même jour, le nom et la ville sont désormais persistés côté
// serveur, même patron que la fonction ou le pays de résidence,
// au lieu d'être gardés sur l'appareil seulement. Le nom suit la
// même règle qu'à l'inscription : prénom et nom, en majuscules.
// La ville est gardée telle que saisie, sans liste fermée.
app.post('/moi/nom', { preHandler: membreG }, async (req) => {
  const b = z.object({ nom_complet: z.string().trim().min(2).max(120).refine(nomCompletDeuxMots, { message: 'Nom complet incomplet : écris ton prénom et ton nom.' }).transform(nomCompletMajuscules) }).parse(req.body);
  await q('UPDATE membres SET nom_complet = $2 WHERE id = $1', [req.user.mid, b.nom_complet]);
  return { ok: true, nom_complet: b.nom_complet };
});

app.post('/moi/ville', { preHandler: membreG }, async (req) => {
  const b = z.object({ ville: z.string().trim().min(1).max(100) }).parse(req.body);
  await q('UPDATE membres SET ville = $2 WHERE id = $1', [req.user.mid, b.ville]);
  return { ok: true, ville: b.ville };
});

// Changement d'e-mail avec vérification, T11, 26 nov. 2026 :
// décidée par Axel le même jour, la nouvelle adresse reçoit un
// code à 6 chiffres avant le changement, même patron que la
// vérification d'e-mail à l'inscription : code haché en Argon2id,
// 30 minutes, usage unique, 5 tentatives au plus. Sans SMTP
// configuré, la demande répond 503, jamais de repli ni d'envoi
// simulé. Le changement ne révoque pas les sessions, comme le
// téléphone, et l'e-mail confirmé est marqué vérifié.
app.post('/moi/email/demander', { preHandler: membreG }, async (req, reply) => {
  const { email } = z.object({ email: z.string().trim().toLowerCase().email() }).parse(req.body);
  const conflit = (await q('SELECT id FROM utilisateurs WHERE lower(email) = lower($1) AND id <> $2 LIMIT 1', [email, req.user.sub])).rows[0];
  if (conflit) throw httpError(409, 'Cet e-mail est déjà associé à un autre compte.');
  if (!smtpConfigure()) {
    return reply.code(503).send({ erreur: 'Le service d’envoi n’est pas encore configuré par la structure.' });
  }
  await q('UPDATE codes_changement_email SET utilise = true WHERE utilisateur_id = $1 AND NOT utilise', [req.user.sub]);
  const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  const codeHash = await argon2.hash(code, { type: argon2.argon2id });
  const ligne = (
    await q(
      "INSERT INTO codes_changement_email (utilisateur_id, email, code_hash, expire_le) VALUES ($1,$2,$3, now() + interval '30 minutes') RETURNING id",
      [req.user.sub, email, codeHash],
    )
  ).rows[0];
  try {
    await envoyerCodeVerification({ email, code });
  } catch (e) {
    req.log.error({ envoi: 'code_changement_email', code: e?.code ?? null, responseCode: e?.responseCode ?? null }, 'Échec envoi code changement e-mail.');
    await q('UPDATE codes_changement_email SET utilise = true WHERE id = $1', [ligne.id]);
    return reply.code(503).send({ erreur: 'L’envoi a échoué. Réessaie plus tard.' });
  }
  return { ok: true };
});

app.post('/moi/email/confirmer', { preHandler: membreG }, async (req) => {
  const b = z.object({ email: z.string().trim().toLowerCase().email(), code: z.string().regex(/^\d{6}$/) }).parse(req.body);
  const ligne = (
    await q(
      `SELECT id, code_hash, tentatives FROM codes_changement_email
       WHERE utilisateur_id = $1 AND lower(email) = lower($2) AND NOT utilise AND expire_le > now()
       ORDER BY cree_le DESC LIMIT 1`,
      [req.user.sub, b.email],
    )
  ).rows[0];
  if (!ligne) throw httpError(400, 'Code invalide ou expiré.');
  const ok = await argon2.verify(ligne.code_hash, b.code).catch(() => false);
  if (!ok) {
    const tentatives = ligne.tentatives + 1;
    await q('UPDATE codes_changement_email SET tentatives = $2, utilise = $3 WHERE id = $1', [ligne.id, tentatives, tentatives >= 5]);
    throw httpError(400, 'Code invalide ou expiré.');
  }
  await tx(async (c) => {
    const conflit = (await c.query('SELECT id FROM utilisateurs WHERE lower(email) = lower($1) AND id <> $2 LIMIT 1', [b.email, req.user.sub])).rows[0];
    if (conflit) throw httpError(409, 'Cet e-mail est déjà associé à un autre compte.');
    await c.query('UPDATE codes_changement_email SET utilise = true WHERE id = $1', [ligne.id]);
    await c.query('UPDATE utilisateurs SET email = $2, email_verifie = true WHERE id = $1', [req.user.sub, b.email]);
    await audit(c, req, 'email.change', 'utilisateurs', req.user.sub, {});
  });
  return { ok: true, email: b.email };
});

// Établissement affilié du membre, carte 129, 11 nov. 2026 :
// le membre le choisit depuis Modifier mes infos, bureau
// national compris, sans validation par la structure, la
// modification s'applique tout de suite. Le nom est résolu
// côté serveur, comme à l'import, le nom étant unique.
// Null, vide ou « Autre » veut dire sans établissement,
// sans identifiant serveur, comme à l'inscription. Ne touche
// ni au matricule, ni aux certificats, ni aux attestations.
// Nominations et bureaux, 21 nov. 2026 : son entrée au Bureau
// suit l'établissement choisi, comme après une correction par
// l'administrateur. Ses nominations ne bougent pas.
app.post('/moi/etablissement', { preHandler: membreG }, async (req) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const brut = body.etablissement_id ?? body.etablissement ?? null;
  if (brut === null || brut === '' || (typeof brut === 'string' && brut.trim().toLowerCase() === 'autre')) {
    await q('UPDATE membres SET etablissement_id = NULL WHERE id = $1', [req.user.mid]);
    await q('UPDATE bureau_membres SET etablissement_id = NULL WHERE membre_id = $1', [req.user.mid]);
    return { ok: true, etablissement_id: null, etablissement: null };
  }
  if (typeof brut !== 'string') throw httpError(400, 'Établissement invalide.');
  const parId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(brut);
  const trouve = parId
    ? (await q('SELECT id, nom FROM etablissements WHERE id = $1', [brut])).rows[0]
    : (await q('SELECT id, nom FROM etablissements WHERE lower(nom) = lower($1)', [brut.trim()])).rows[0];
  if (!trouve) throw httpError(400, 'Établissement invalide.');
  await q('UPDATE membres SET etablissement_id = $2 WHERE id = $1', [req.user.mid, trouve.id]);
  await q('UPDATE bureau_membres SET etablissement_id = $2 WHERE membre_id = $1', [req.user.mid, trouve.id]);
  return { ok: true, etablissement_id: trouve.id, etablissement: trouve.nom };
});

// Date de naissance du membre, 29 oct. 2026 : modifiable par le
// membre lui-même, jamais obligatoire, effaçable en envoyant null
// ou une chaîne vide. Même validation de date réelle qu'à
// l'inscription, pour refuser une date impossible.
app.post('/moi/date-naissance', { preHandler: membreG }, async (req) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const raw = body.date_naissance;
  if (raw === null || raw === '') {
    await q('UPDATE membres SET date_naissance = NULL WHERE id = $1', [req.user.mid]);
    return { ok: true, date_naissance: null };
  }
  if (typeof raw !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) throw httpError(400, 'Date de naissance invalide.');
  const [y, mo, d] = raw.split('-').map(Number);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) throw httpError(400, 'Date de naissance invalide.');
  await q('UPDATE membres SET date_naissance = $2 WHERE id = $1', [req.user.mid, raw]);
  return { ok: true, date_naissance: raw };
});

// Changement forcé, 29 oct. 2026 : seuls les membres connectés avec
// un temporaire actif peuvent l'utiliser, et le temporaire expire
// après 24 heures. Après le changement, le temporaire disparaît et
// les autres sessions sont révoquées (carte 46) ; la session en
// cours reste valide jusqu'à l'expiration de son jeton d'accès
// (15 min), puis le membre se reconnecte avec son nouveau mot
// de passe, le rafraîchissement étant révoqué.
app.post('/moi/mot-de-passe', { preHandler: membreG }, async (req) => {
  const b = z.object({ mot_de_passe: z.string().min(8).max(128) }).parse(req.body);
  await tx(async (c) => {
    const u = (
      await c.query('SELECT mot_de_passe_temporaire_expire_le FROM utilisateurs WHERE id = $1', [req.user.sub])
    ).rows[0];
    if (!u?.mot_de_passe_temporaire_expire_le) throw httpError(403, 'Aucun changement de mot de passe requis.');
    if (new Date(u.mot_de_passe_temporaire_expire_le) <= new Date()) {
      throw httpError(401, 'Ce mot de passe temporaire a expiré. Contacte la structure pour en recevoir un nouveau.');
    }
    const hash = await argon2.hash(b.mot_de_passe, { type: argon2.argon2id });
    await c.query('UPDATE utilisateurs SET mot_de_passe_hash = $2, mot_de_passe_temporaire_expire_le = NULL WHERE id = $1', [req.user.sub, hash]);
    // Carte 46 : comme la réinitialisation par code, toutes les
    // sessions existantes sont révoquées. La session en cours reste
    // valide jusqu'à l'expiration de son jeton d'accès (15 min).
    await c.query('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1 AND NOT revoque', [req.user.sub]);
    await audit(c, req, 'motdepasse.change', 'membres', req.user.mid);
  });
  return { ok: true };
});

// Tranche carte, 4 nov. 2026 : modifications depuis le NOUVEAU
// modele seulement, membre sur ses propres donnees. Trois routes,
// toutes gardees membreG, jamais de secret expose, jamais de mot de
// passe en clair ni journalise, jamais de modification de schema.sql :
// la colonne annee_adhesion arrive par migration de demarrage.
// (a) Annee d'adhesion : champ separe, sans jamais modifier
// inscrit_le, qui sert a la carte anniversaire. L'application
// affiche cette annee dans Membre depuis, sinon l'annee d'inscription.
// (b) Telephone : controle serveur d'unicite, conflit 409 sans
// reveler le titulaire. Le nouveau numero devient l'identifiant de
// connexion, car /auth/connexion accepte deja telephone ou e-mail.
// (c) Mot de passe en session connectee : mot de passe actuel
// verifie par hachage argon2id, confirmation controlee, nouveau
// hache argon2id. Ne touche ni au parcours de reinitialisation par
// courriel, ni a la route de changement force /moi/mot-de-passe,
// qui reste reservee aux temporaires actifs. Un changement reussi
// ici efface aussi un eventuel temporaire, puisque le membre vient
// de prouver son mot de passe actuel en session.
app.post('/moi/annee-adhesion', { preHandler: membreG }, async (req) => {
  const b = z.object({ annee_adhesion: z.number().int().min(1900).max(2100) }).parse(req.body);
  if (b.annee_adhesion > new Date().getFullYear()) throw httpError(400, 'Année d’adhésion invalide.');
  await q('UPDATE membres SET annee_adhesion = $2 WHERE id = $1', [req.user.mid, b.annee_adhesion]);
  return { ok: true, annee_adhesion: b.annee_adhesion };
});

// Pays de résidence du membre, carte 127, 10 nov. 2026 : le membre
// le définit depuis Modifier mes infos, dans la liste fermée,
// jamais en texte libre. Enregistré en majuscules, carte 125.
app.post('/moi/pays-residence', { preHandler: membreG }, async (req) => {
  const b = z.object({ pays_residence: z.string().trim().min(1).max(50) }).parse(req.body);
  const pays = normaliserPaysResidence(b.pays_residence);
  if (!pays) throw httpError(400, 'Pays de résidence invalide.');
  await q('UPDATE membres SET pays_residence = $2 WHERE id = $1', [req.user.mid, pays]);
  return { ok: true, pays_residence: pays };
});

app.post('/moi/telephone', { preHandler: membreG }, async (req) => {
  const b = z.object({ telephone: z.string().trim().min(6).max(20) }).parse(req.body);
  const telephone = displayPhoneServer(b.telephone);
  const variantesTelephone = phoneVariantsServer(b.telephone);
  const conflit = (await q('SELECT id FROM utilisateurs WHERE (telephone = $1 OR telephone = $2) AND id <> $3 LIMIT 1', [variantesTelephone[0], variantesTelephone[1] ?? variantesTelephone[0], req.user.sub])).rows[0];
  if (conflit) throw httpError(409, 'Ce numéro est déjà associé à un autre compte.');
  await tx(async (c) => {
    await c.query('UPDATE utilisateurs SET telephone = $2 WHERE id = $1', [req.user.sub, telephone]);
    await audit(c, req, 'telephone.change', 'membres', req.user.mid, {});
  });
  return { ok: true, telephone };
});

app.post('/moi/mot-de-passe-connecte', { preHandler: membreG }, async (req) => {
  const b = z.object({ mot_de_passe_actuel: z.string().min(1).max(128), mot_de_passe: z.string().min(8).max(128), confirmation: z.string().min(8).max(128) }).parse(req.body);
  if (b.mot_de_passe !== b.confirmation) throw httpError(400, 'La confirmation ne correspond pas au nouveau mot de passe.');
  await tx(async (c) => {
    const u = (await c.query('SELECT mot_de_passe_hash FROM utilisateurs WHERE id = $1', [req.user.sub])).rows[0];
    if (!u?.mot_de_passe_hash) throw httpError(403, 'Changement de mot de passe impossible pour ce compte.');
    const ok = await argon2.verify(u.mot_de_passe_hash, b.mot_de_passe_actuel).catch(() => false);
    if (!ok) throw httpError(401, 'Mot de passe actuel incorrect.');
    const hash = await argon2.hash(b.mot_de_passe, { type: argon2.argon2id });
    await c.query('UPDATE utilisateurs SET mot_de_passe_hash = $2, mot_de_passe_temporaire_expire_le = NULL WHERE id = $1', [req.user.sub, hash]);
    // Carte 46 : comme la réinitialisation par code, toutes les
    // sessions existantes sont révoquées. La session en cours reste
    // valide jusqu'à l'expiration de son jeton d'accès (15 min),
    // le membre doit ensuite se reconnecter avec son nouveau
    // mot de passe.
    await c.query('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1 AND NOT revoque', [req.user.sub]);
    await audit(c, req, 'motdepasse.change', 'membres', req.user.mid, {});
  });
  return { ok: true };
});

// Suppression de son propre compte, carte 92, 7 nov. 2026,
// suppression douce, effacement immediat abandonne : le membre
// demande lui-meme, mot de passe verifie par argon2, jamais pour
// un autre membre, car l'identite vient seulement de req.user.sub
// et req.user.mid, jamais d'un id dans l'URL ou le corps. La
// demande desactive le compte (actif = false, deja en base) et
// fixe supprime_le a +30 jours, par migration de demarrage, sans
// toucher a schema.sql. Les jetons de rafraichissement sont
// revoques, donc la seule rentree est une nouvelle connexion,
// qui ne sert qu'a annuler. Rien n'est efface ici : ni membre,
// ni photo, ni bureau, ni paiements, ni audit. L'effacement
// definitif apres 30 jours est construit dans
// src/effacement_compte.js, purge au demarrage puis toutes les
// 24 heures, plus la route manuelle
// POST /admin/comptes/effacer-echus, avec les memes regles que
// la route admin, paiements et audit conserves, affiches compte
// supprime, matricule jamais reutilise, numero et e-mail liberes
// seulement alors. La route admin DELETE /admin/membres/:id
// reste un effacement immediat, comme avant, elle n'est pas
// touchee dans son comportement, elle partage seulement le
// corps de la suppression avec la purge.
app.delete('/moi/compte', { preHandler: membreG }, async (req) => {
  const b = z.object({ mot_de_passe: z.string().min(1).max(128) }).parse(req.body);
  const supprimeLe = dateEffacementDefinitif(new Date());
  const m = await tx(async (c) => {
    const row = (
      await c.query(
        'SELECT m.id, m.matricule, m.nom_complet, u.role, u.mot_de_passe_hash, u.actif, u.supprime_le FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1',
        [req.user.mid],
      )
    ).rows[0];
    if (!row) throw httpError(404, 'Profil introuvable.');
    const motDePasseVerifie = row.mot_de_passe_hash
      ? await argon2.verify(row.mot_de_passe_hash, b.mot_de_passe).catch(() => false)
      : false;
    let autresAdminsGeneraux = 0;
    if (row.role === 'admin_general') {
      autresAdminsGeneraux = (
        await c.query("SELECT COUNT(*)::int AS n FROM utilisateurs WHERE role = 'admin_general' AND id <> $1", [req.user.sub])
      ).rows[0].n;
    }
    const refus = validerSuppressionPropreCompte({
      role: row.role,
      autresAdminsGeneraux,
      motDePasseVerifie,
      aHash: Boolean(row.mot_de_passe_hash),
      suppressionDejaDemandee: Boolean(row.supprime_le),
    });
    if (refus) throw httpError(refus.statut, refus.message);
    await audit(c, req, 'membre.suppression_demandee', 'membres', row.id, { matricule: row.matricule, nom_complet: row.nom_complet, supprime_le: supprimeLe });
    await c.query('UPDATE utilisateurs SET actif = false, supprime_le = $2 WHERE id = $1', [req.user.sub, supprimeLe]);
    await c.query('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1', [req.user.sub]);
    return row;
  });
  return { suppression_demandee: true, supprime_le: supprimeLe, matricule: m.matricule, nom_complet: m.nom_complet };
});

// Annulation de la suppression demandee, carte 92 : garde
// membreG, seulement si une suppression a ete demandee et si
// les 30 jours ne sont pas passes. Le compte est reactive
// (actif = true) et la date est effacee. Apres le delai, plus
// d'annulation possible, la route refuse, 409.
app.post('/moi/compte/annuler', { preHandler: membreG }, async (req) => {
  const r = await tx(async (c) => {
    const row = (
      await c.query('SELECT m.id, m.matricule, m.nom_complet, u.supprime_le FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1', [req.user.mid])
    ).rows[0];
    if (!row) throw httpError(404, 'Profil introuvable.');
    const refus = validerAnnulationSuppression({ supprimeLe: row.supprime_le, maintenant: new Date() });
    if (refus) throw httpError(refus.statut, refus.message);
    await audit(c, req, 'membre.suppression_annulee', 'membres', row.id, { matricule: row.matricule, nom_complet: row.nom_complet });
    await c.query('UPDATE utilisateurs SET actif = true, supprime_le = NULL WHERE id = $1', [req.user.sub]);
    return row;
  });
  return { annulee: true, matricule: r.matricule, nom_complet: r.nom_complet };
});

// Sujets de prière envoyés directement par le serveur, 31 oct. 2026 :
// le membre écrit son sujet dans l’application, le serveur l’envoie par
// e-mail à la structure, sans passer par la messagerie du membre.
// Règles dures : aucun enregistrement en base, aucune ligne dans le
// journal d’audit, aucune trace du contenu, du nom ou du contact dans
// un journal persistant. L’envoi reste en ligne seulement.
// Protection minimale contre l’abus : 5 sujets par compte et par heure,
// en mémoire seulement (donc par instance), sans aucune persistance.
// Sans variables SMTP, la route répond 503, jamais de repli ni d’envoi
// simulé ; un échec d’envoi répond 503 aussi, sans exposer le détail.
const prieresParHeure = new Map();
app.post('/prieres', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({ sujet: z.string().trim().min(1).max(2000) }).parse(req.body);
  if (!smtpConfigure()) {
    return reply.code(503).send({ erreur: 'Le service d’envoi n’est pas encore configuré par la structure.' });
  }
  const maintenant = Date.now();
  const recents = (prieresParHeure.get(req.user.sub) ?? []).filter((t) => maintenant - t < 3600000);
  if (recents.length >= 5) {
    return reply.code(429).send({ erreur: 'Trop de sujets envoyés. Réessaie plus tard.' });
  }
  recents.push(maintenant);
  prieresParHeure.set(req.user.sub, recents);
  const profil =
    (
      await q(
        `SELECT m.nom_complet, u.telephone, u.email FROM membres m
         JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1`,
        [req.user.mid],
      )
    ).rows[0] ??
    (
      await q('SELECT telephone, email FROM utilisateurs WHERE id = $1', [req.user.sub])
    ).rows[0];
  if (!profil) throw httpError(404, 'Profil introuvable.');
  const contact = [profil.telephone, profil.email].filter(Boolean).join(' / ') || 'Non renseigné';
  try {
    await envoyerSujetPriere({ nom: profil.nom_complet ?? null, contact, sujet: b.sujet });
  } catch (e) {
    // Même diagnostic seul que pour le code, sans contenu, sans nom,
    // sans contact, sans secret.
    req.log.error({ envoi: 'sujet_priere', code: e?.code ?? null, responseCode: e?.responseCode ?? null, command: e?.command ?? null }, 'Echec envoi sujet priere.');
    return reply.code(503).send({ erreur: 'L’envoi a échoué. Réessaie plus tard.' });
  }
  return { ok: true };
});

// Formulaire de contact de la vitrine, audit de lancement, 22 nov. 2026 :
// route publique, sans compte. Validation stricte, champ piège anti-spam
// (un robot le remplit, un humain ne le voit pas) : piège rempli, succès
// sans envoi, pour ne pas révéler le piège. Limites : 10 par minute par
// adresse IP, puis 5 par heure et par adresse IP, en mémoire seulement.
// Sans variables SMTP, 503, sans repli ni envoi simulé. Aucun contenu,
// aucun nom, aucune adresse n'est journalisé, ni en base, ni dans un
// journal ; le message part seulement par e-mail vers support@.
const contactsParHeure = new Map();
app.post('/contact', { config: { rateLimit: { max: 10, timeWindow: '1 minute', keyGenerator: (req) => ipClient(req) } } }, async (req, reply) => {
  const b = validerMessageContact(req.body);
  if ((b.site ?? '').trim() !== '') return { ok: true };
  if (!smtpConfigure()) {
    return reply.code(503).send({ erreur: 'Le service d’envoi n’est pas encore configuré par la structure.' });
  }
  const maintenant = Date.now();
  const cle = ipClient(req);
  const recents = (contactsParHeure.get(cle) ?? []).filter((t) => maintenant - t < 3600000);
  if (recents.length >= 5) {
    return reply.code(429).send({ erreur: 'Trop de messages envoyés. Réessaie plus tard.' });
  }
  recents.push(maintenant);
  contactsParHeure.set(cle, recents);
  try {
    await envoyerMessageContact({ nom: b.nom, email: b.email, telephone: b.telephone || null, sujet: b.sujet, message: b.message, actus: b.actus });
  } catch (e) {
    req.log.error({ envoi: 'message_contact', code: e?.code ?? null, responseCode: e?.responseCode ?? null, command: e?.command ?? null }, 'Echec envoi message contact.');
    return reply.code(503).send({ erreur: 'L’envoi a échoué. Réessaie plus tard.' });
  }
  return { ok: true };
});

app.post('/evenements/:id/inscription', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ev = (await q('SELECT id, nom, type, est_kairos, tarif_fcfa FROM evenements WHERE id = $1 AND publie', [id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  // Paiement du camp en 6 fois, 31 oct. 2026 : une inscription
  // créée pour un camp au tarif supérieur à 0 exige les 6
  // versements, et son pass reste masqué jusque-là. Une inscription
  // créée avant ce déploiement garde versements_requis à faux,
  // donc son pass reste visible comme avant, sans retrait.
  const r = (
    await q(
      `WITH ins AS (
         INSERT INTO inscriptions (evenement_id, membre_id, versements_requis) VALUES ($1,$2,$3)
         ON CONFLICT (evenement_id, membre_id) DO NOTHING RETURNING code_pass, inscrit_le, versements_requis)
       SELECT code_pass, inscrit_le, versements_requis, true AS nouveau FROM ins
       UNION ALL SELECT code_pass, inscrit_le, versements_requis, false AS nouveau FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2 LIMIT 1`,
      [id, req.user.mid, (ev.tarif_fcfa ?? 0) > 0],
    )
  ).rows[0];
  // Groupe automatique de camp ou de retraite, 18 nov. 2026 :
  // une nouvelle inscription ouvre le groupe de l'événement
  // et y fait entrer la personne inscrite.
  if (r.nouveau && estTypeEvenementGroupe(ev.type)) {
    await assurerGroupeEvenement(id, ev.nom, req.user.mid);
  }
  const m = (await q('SELECT nom_complet, matricule FROM membres WHERE id = $1', [req.user.mid])).rows[0];
  let versements = null;
  if (r.versements_requis) {
    const prog = await progressionCamp(req.user.mid, id);
    versements = { ...prog, requis: true };
    // Plan rappelé dans la cloche à l'inscription, puis après
    // chaque versement validé, et chaque mois par l'entretien de
    // la cloche tant que le solde reste (voir
    // entretenirRappelsCamp).
    if (r.nouveau) {
      const tarif = ev.tarif_fcfa ?? 0;
      await notifierMembre(
        req.user.mid,
        'camp_rappel',
        'Paiement du camp en 6 fois',
        `Bonjour {prenom}, votre inscription à ${ev.nom} est enregistrée. Votre pass sera généré quand les 6 versements seront payés, soit ${fcfaTexte(montantVersement(tarif, 1))} par versement, ${fcfaTexte(tarif)} au total. Il vous reste ${fcfaTexte(tarif)} à payer.`,
        'camp',
        id,
        'Paiement du camp en 6 fois',
        `Votre inscription à ${ev.nom} est enregistrée. Votre pass sera généré quand les 6 versements seront payés, soit ${fcfaTexte(montantVersement(tarif, 1))} par versement, ${fcfaTexte(tarif)} au total. Il vous reste ${fcfaTexte(tarif)} à payer.`,
      );
    }
  }
  // Camp National Kairos : le pass est aussi le badge (nom, matricule, QR), visible tout de suite.
  return reply.code(201).send({ evenement: ev.nom, badge: ev.est_kairos, code_pass: r.code_pass, inscrit_le: r.inscrit_le, versements, ...m });
});

app.get('/moi/inscriptions', { preHandler: membreG }, async (req) =>
  (
    await q(
      `SELECT i.code_pass, i.inscrit_le, i.versements_requis, e.id AS evenement_id, e.nom, e.date_debut, e.lieu, e.est_kairos, e.tarif_fcfa,
              i.badge_numero, i.age, i.niveau_etude, i.structure_appartenance,
              CASE WHEN e.est_kairos AND i.badge_numero IS NOT NULL THEN 'KP' || COALESCE(EXTRACT(YEAR FROM e.date_debut), EXTRACT(YEAR FROM CURRENT_DATE))::int::text || '-' || LPAD(i.badge_numero::text, 4, '0') END AS badge_id,
              (SELECT COUNT(DISTINCT numero_versement) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme')::int AS versements_valides,
              (SELECT COALESCE(SUM(montant_fcfa), 0) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme')::int AS montant_paye,
              (NOT i.versements_requis OR (SELECT COALESCE(SUM(montant_fcfa), 0) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme') >= e.tarif_fcfa) AS pass_visible,
              (SELECT reference FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1) AS versement_en_attente_reference,
              (SELECT montant_fcfa FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1) AS versement_en_attente_montant,
              (SELECT numero_versement FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1) AS versement_en_attente_numero
       FROM inscriptions i JOIN evenements e ON e.id = i.evenement_id WHERE i.membre_id = $1 ORDER BY i.inscrit_le DESC`,
      [req.user.mid],
    )
  ).rows);

// ───────────────────────── Paiements Wave (membre) ─────────────────────────
function requireWaveLink() {
  if (!CFG.wavePayUrl) throw httpError(503, 'Le paiement Wave n\u2019est pas encore configuré par la structure.');
}

const paiementReponse = (p) => ({
  reference: p.reference,
  type: p.type,
  montant_fcfa: p.montant_fcfa,
  statut: p.statut,
  wave_url: waveUrl(CFG.wavePayUrl, p.montant_fcfa),
  message:
    p.statut === 'en_attente'
      ? 'En attente de confirmation Wave. La facture arrive après confirmation vérifiée.'
      : undefined,
});

// ───────────────────────── Prestataires de paiement (membre) ─────────────────────────
// T16, 26 nov. 2026 : une seule interface pour tous les moyens
// de la carte. La feuille lit les moyens disponibles sur
// GET /paiements/moyens ; la création passe par
// POST /paiements/:reference/payer, qui appelle le prestataire
// choisi. Un moyen sans identifiants n'est pas proposé comme
// disponible, et sa création répond 503. Aucun paiement n'est
// confirmé sur une affirmation du client : seule une
// vérification côté serveur confirme, par /etat, par le retour
// du prestataire ou par son webhook.
app.get('/paiements/moyens', { preHandler: membreG }, async () => listeMoyens(CFG));

app.post('/paiements/:reference/payer', { preHandler: membreG }, async (req, reply) => {
  const { reference } = z.object({ reference: z.string().min(5).max(40) }).parse(req.params);
  const b = z.object({ moyen: z.string().trim() }).parse(req.body);
  if (!idPrestataireValide(b.moyen)) throw httpError(400, 'Moyen de paiement inconnu.');
  if (!prestataireDisponible(b.moyen, CFG)) {
    return reply.code(503).send({ erreur: `Le paiement ${libellePrestataire(b.moyen)} n’est pas encore configuré par la structure.` });
  }
  const p = (
    await q('SELECT * FROM paiements WHERE reference = $1 AND membre_id = $2', [reference, req.user.mid])
  ).rows[0];
  if (!p) throw httpError(404, 'Demande introuvable.');
  if (p.statut !== 'en_attente') throw httpError(409, 'Cette demande n’est plus en attente.');
  const membre = (
    await q('SELECT m.nom_complet, u.telephone FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1', [req.user.mid])
  ).rows[0];
  const urls = {
    retour: `${CFG.publicBaseUrl}/paiements/retour?moyen=${b.moyen}&reference=${reference}`,
    annule: `${CFG.publicBaseUrl}/paiements/annule?moyen=${b.moyen}&reference=${reference}`,
    notification: `${CFG.publicBaseUrl}/webhooks/${b.moyen}`,
  };
  let cree;
  try {
    cree = await creerPaiementPrestataire(b.moyen, CFG, {
      reference: p.reference,
      montantFcfa: p.montant_fcfa,
      nomMembre: membre?.nom_complet ?? '',
      telephone: membre?.telephone ?? '',
      urls,
    });
  } catch (e) {
    throw httpError(e?.statutHttp ?? 502, e?.message || 'Paiement impossible pour le moment.');
  }
  await tx(async (c) => {
    await c.query('UPDATE paiements SET prestataire = $1, prestataire_reference = $2 WHERE id = $3', [b.moyen, cree.referencePrestataire, p.id]);
    await audit(c, req, 'paiement.prestataire', 'paiements', p.id, { moyen: b.moyen });
  });
  return reply.code(201).send({ reference: p.reference, moyen: b.moyen, url: cree.url });
});

// Vérifie un paiement en attente chez son prestataire et le
// confirme sur un succès vérifié seulement. Retourne le statut
// vérifié : confirme, en attente, refuse, ou inconnu quand la
// vérification est impossible.
async function verifierEtConfirmerPrestataire(p) {
  if (!p || p.statut !== 'en_attente' || !p.prestataire || p.prestataire === 'wave' || !p.prestataire_reference) return 'inconnu';
  let statut = 'en_attente';
  try {
    statut = await verifierPaiementPrestataire(p.prestataire, CFG, {
      reference: p.reference,
      referencePrestataire: p.prestataire_reference,
      montantFcfa: p.montant_fcfa,
    });
  } catch (e) {
    app.log.error(e);
    return 'inconnu';
  }
  if (statut !== 'confirme') return statut;
  const done = await tx(async (c) => confirmPayment(c, p.id, p.prestataire, null, null, p.prestataire));
  if (done) {
    queueMicrotask(() => ensureInvoice(p.id).catch((e) => app.log.error(e)));
    await notifierPaiementValide(done);
  }
  return statut;
}

// État d'une demande, avec vérification chez le prestataire
// quand elle est en attente : c'est le retour de l'application
// après le checkout, comme pour PayPal.
app.get('/paiements/:reference/etat', { preHandler: membreG }, async (req) => {
  const { reference } = z.object({ reference: z.string().min(5).max(40) }).parse(req.params);
  let p = (
    await q('SELECT * FROM paiements WHERE reference = $1 AND membre_id = $2', [reference, req.user.mid])
  ).rows[0];
  if (!p) throw httpError(404, 'Demande introuvable.');
  const prestataireStatut = await verifierEtConfirmerPrestataire(p);
  if (prestataireStatut === 'confirme') {
    p = (
      await q('SELECT * FROM paiements WHERE reference = $1 AND membre_id = $2', [reference, req.user.mid])
    ).rows[0];
  }
  return {
    reference: p.reference,
    type: p.type,
    montant_fcfa: p.montant_fcfa,
    statut: p.statut,
    moyen: p.moyen,
    prestataire: p.prestataire,
    prestataire_statut: prestataireStatut,
  };
});

// Retour d'un prestataire après le checkout : la page vérifie
// chez le prestataire et montre le résultat, comme pour PayPal.
// Un retour ne confirme jamais seul.
app.get('/paiements/retour', async (req, reply) => {
  const moyen = String(req.query.moyen || '');
  const reference = String(req.query.reference || '');
  if (!idPrestataireValide(moyen) || !reference) {
    return reply.code(400).type('text/html').send('<h1>Paiement introuvable.</h1><p>Retournez dans l’application et réessayez.</p>');
  }
  const p = (
    await q("SELECT * FROM paiements WHERE reference = $1 AND statut = 'en_attente'", [reference])
  ).rows[0];
  if (p) await verifierEtConfirmerPrestataire(p);
  const confirme = (
    await q("SELECT statut FROM paiements WHERE reference = $1", [reference])
  ).rows[0]?.statut === 'confirme';
  if (confirme) {
    return reply.type('text/html').send(`<h1>Paiement confirmé</h1><p>Référence ${reference} : ${p?.montant_fcfa ?? ''} FCFA. Retournez dans l’application, puis vérifiez votre paiement : il doit apparaître confirmé, avec sa facture.</p>`);
  }
  return reply.type('text/html').send('<h1>Paiement non confirmé</h1><p>La demande reste en attente, et la structure peut la vérifier. Retournez dans l’application.</p>');
});

app.get('/paiements/annule', async (req, reply) => {
  return reply.type('text/html').send('<h1>Paiement annulé</h1><p>Retournez dans l’application, la demande reste en attente, vous pouvez choisir un autre moyen.</p>');
});

// ───────────────────────── PayPal API : retour sur les achats ─────────────────────────
// Grâce à l'API PayPal, et non plus au seul lien de don, le serveur
// crée une commande PayPal pour une demande déjà créée, le membre
// l'approuve dans PayPal, PayPal renvoie vers le serveur, le serveur
// capture la commande, vérifie devise et montant, puis confirme la
// demande, comme pour Wave. La demande passe donc de « en attente »
// à « confirmée » avec un retour vérifié, et la facture peut suivre.
// Aucun secret n'est lu ailleurs que dans CFG, donc dans les variables
// d'environnement. Le franc CFA est arrimé à l'euro, taux fixe
// 1 EUR = 655,957 FCFA : le montant en euros est exact. Pour les
// autres devises, le taux du jour est lu sur un service public de
// taux de change, au moment de la création ; si ce service est
// injoignable, la création échoue en 503 et l'application retombe
// sur le lien de don, plutôt que d'inventer un taux.
function requirePaypal() {
  if (!CFG.paypalClientId || !CFG.paypalClientSecret) {
    throw httpError(503, 'PayPal API non configuré par la structure.');
  }
}

async function paypalToken() {
  const basic = Buffer.from(`${CFG.paypalClientId}:${CFG.paypalClientSecret}`).toString('base64');
  const res = await fetch(`${CFG.paypalApiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw httpError(502, 'PayPal : impossible d’obtenir un jeton d’accès.');
  const data = await res.json();
  if (!data.access_token) throw httpError(502, 'PayPal : jeton d’accès introuvable.');
  return data.access_token;
}

async function paypalConvertFcfa(amountFcfa, currency) {
  if (currency === 'EUR') return (amountFcfa / 655.957).toFixed(2);
  const res = await fetch('https://open.er-api.com/v6/latest/XOF', { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw httpError(503, 'Taux de change du jour injoignable, réessayez plus tard.');
  const data = await res.json();
  const rate = data?.rates?.[currency];
  if (!rate || typeof rate !== 'number' || rate <= 0) {
    throw httpError(400, 'Devise non proposée par le service de taux de change.');
  }
  // B-17, 22 nov. 2026 : borne de vraisemblance sur le taux, voir
  // src/taux_paypal.js. Un taux hors fourchette, service corrompu
  // ou réponse falsifiée, est rejeté au lieu de fausser le montant.
  if (!tauxChangePlausible(currency, rate)) {
    throw httpError(502, 'Taux de change invraisemblable, réessayez plus tard.');
  }
  return (amountFcfa * rate).toFixed(2);
}

async function paypalCall(token, path, method, body) {
  const res = await fetch(`${CFG.paypalApiBase}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data?.details?.[0]?.description || data?.message || 'Appel PayPal refusé.';
    throw httpError(502, `PayPal : ${detail}`);
  }
  return data;
}

// Création d'une commande PayPal pour une demande existante, en attente.
// Retourne l'URL d'approbation à ouvrir dans PayPal, et la commande
// enregistrée en base, pour que la capture puisse la retrouver.
app.post('/paiements/paypal/creer', { preHandler: membreG }, async (req, reply) => {
  requirePaypal();
  const b = z.object({ reference: z.string().min(5).max(40), devise: z.string().trim().toUpperCase().length(3) }).parse(req.body);
  const allowed = ['EUR', 'USD', 'GBP', 'CAD', 'CHF'];
  if (!allowed.includes(b.devise)) throw httpError(400, 'Devise PayPal non proposée.');
  const p = (
    await q('SELECT * FROM paiements WHERE reference = $1 AND membre_id = $2', [b.reference, req.user.mid])
  ).rows[0];
  if (!p) throw httpError(404, 'Demande introuvable.');
  if (p.statut !== 'en_attente') throw httpError(409, 'Cette demande n’est plus en attente.');
  const montantDevise = await paypalConvertFcfa(p.montant_fcfa, b.devise);
  const token = await paypalToken();
  // B-18, 22 nov. 2026 : la commande est liée à la session qui la
  // crée, utilisateur et secret de retour. Le secret, aléatoire,
  // part dans l'URL de retour et doit être présenté à la capture :
  // connaître le seul identifiant de commande PayPal ne suffit
  // plus à déclencher une capture. PayPal ajoute ses propres
  // paramètres (token, PayerID) avec & quand l'URL porte déjà une
  // requête.
  const retourSecret = crypto.randomBytes(32).toString('hex');
  const order = await paypalCall(token, '/v2/checkout/orders', 'POST', {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: p.reference,
        description: `CONNEXION PROPHETIQUE - ${p.type} ${p.reference}`,
        amount: { currency_code: b.devise, value: montantDevise },
      },
    ],
    application_context: {
      return_url: `${CFG.publicBaseUrl}/paiements/paypal/retour?retour=${retourSecret}`,
      cancel_url: `${CFG.publicBaseUrl}/paiements/paypal/annule`,
    },
  });
  const approve = (order.links || []).find((l) => l.rel === 'approve');
  if (!order.id || !approve?.href) throw httpError(502, 'PayPal : URL d’approbation introuvable.');
  await q(
    `INSERT INTO paypal_commandes (paiement_id, commande_id, devise, montant_devise, statut, utilisateur_id, retour_secret_hash)
     VALUES ($1,$2,$3,$4,'creee',$5,$6)
     ON CONFLICT (commande_id) DO NOTHING`,
    [p.id, order.id, b.devise, montantDevise, req.user.sub, sha256(retourSecret)],
  );
  return reply.code(201).send({
    reference: p.reference,
    montant_fcfa: p.montant_fcfa,
    devise: b.devise,
    montant_devise: montantDevise,
    commande_id: order.id,
    url_approbation: approve.href,
  });
});

// Retour PayPal après approbation : capture, vérification, confirmation.
// Ce retour ne confirme jamais sur le seul paramètre token : il capture
// chez PayPal, puis compare devise et montant capturés avec ceux
// enregistrés à la création, avant toute confirmation.
app.get('/paiements/paypal/retour', async (req, reply) => {
  const token = String(req.query.token || '');
  if (!token) return reply.code(400).type('text/html').send('<h1>Commande PayPal introuvable.</h1><p>Retournez dans l’application et réessayez.</p>');
  try {
    requirePaypal();
    const cmd = (
      await q('SELECT pc.*, p.reference, p.statut, p.montant_fcfa FROM paypal_commandes pc JOIN paiements p ON p.id = pc.paiement_id WHERE pc.commande_id = $1', [token])
    ).rows[0];
    if (!cmd) return reply.code(404).type('text/html').send('<h1>Commande PayPal introuvable.</h1><p>Retournez dans l’application et réessayez.</p>');
    // B-18 : le retour doit présenter le secret lié à la création
    // de la commande. Les commandes d'avant la migration, sans
    // secret enregistré, gardent l'ancien comportement.
    if (cmd.retour_secret_hash) {
      const retourFourni = String(req.query.retour || '');
      const attendu = Buffer.from(cmd.retour_secret_hash);
      const fourni = Buffer.from(sha256(retourFourni));
      if (!retourFourni || attendu.length !== fourni.length || !timingSafeEqual(attendu, fourni)) {
        return reply.code(404).type('text/html').send('<h1>Commande PayPal introuvable.</h1><p>Retournez dans l’application et réessayez.</p>');
      }
    }
    if (cmd.statut === 'capturee') {
      return reply.type('text/html').send(`<h1>Paiement confirmé</h1><p>Référence ${cmd.reference} : ${cmd.montant_fcfa} FCFA, via PayPal ${cmd.devise} ${cmd.montant_devise}.</p><p>Retournez dans l’application, puis vérifiez votre paiement : il doit apparaître confirmé, avec sa facture.</p>`);
    }
    const access = await paypalToken();
    const captured = await paypalCall(access, `/v2/checkout/orders/${token}/capture`, 'POST', {});
    const unit = captured.purchase_units?.[0];
    const capture = unit?.payments?.captures?.[0];
    const capturedAmount = capture?.amount?.value;
    const capturedCurrency = capture?.amount?.currency_code;
    const completed = capture?.status === 'COMPLETED';
    if (!completed || capturedCurrency !== cmd.devise || capturedAmount !== cmd.montant_devise) {
      await q(`UPDATE paypal_commandes SET statut = 'refusee' WHERE commande_id = $1`, [token]);
      return reply.type('text/html').send(`<h1>Paiement non confirmé</h1><p>Le montant ou la devise capturés ne correspondent pas à la commande ${cmd.reference}. Retournez dans l’application, la demande reste en attente, et la structure peut la vérifier.</p>`);
    }
    const done = await tx(async (c) => {
      const paiement = await confirmPayment(c, cmd.paiement_id, 'paypal', null, token);
      if (paiement) {
        await c.query(`UPDATE paypal_commandes SET statut = 'capturee' WHERE commande_id = $1`, [token]);
      }
      return paiement;
    });
    if (done) {
      queueMicrotask(() => ensureInvoice(cmd.paiement_id).catch((e) => app.log.error(e)));
      await notifierPaiementValide(done);
    }
    return reply.type('text/html').send(`<h1>Paiement confirmé</h1><p>Référence ${cmd.reference} : ${cmd.montant_fcfa} FCFA, via PayPal ${cmd.devise} ${cmd.montant_devise}.</p><p>Retournez dans l’application, puis vérifiez votre paiement : il doit apparaître confirmé, avec sa facture.</p>`);
  } catch (e) {
    app.log.error(e);
    return reply.code(500).type('text/html').send('<h1>Paiement non confirmé</h1><p>La capture PayPal a échoué. Retournez dans l’application, la demande reste en attente.</p>');
  }
});

app.get('/paiements/paypal/annule', async (req, reply) => {
  return reply.type('text/html').send('<h1>Paiement annulé dans PayPal</h1><p>Retournez dans l’application, la demande reste en attente, vous pouvez choisir un autre moyen.</p>');
});

// Retour d'état PayPal pour une demande, consulté par l'application
// après le retour du navigateur : si le serveur a confirmé, l'app
// marque sa demande locale comme confirmée, avec facture.
app.get('/paiements/paypal/etat/:reference', { preHandler: membreG }, async (req) => {
  const { reference } = z.object({ reference: z.string().min(5).max(40) }).parse(req.params);
  const p = (
    await q('SELECT reference, type, montant_fcfa, statut FROM paiements WHERE reference = $1 AND membre_id = $2', [reference, req.user.mid])
  ).rows[0];
  if (!p) throw httpError(404, 'Demande introuvable.');
  return p;
});

app.post('/paiements/don', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({ montant_fcfa: z.number().int().min(1).max(10_000_000) }).parse(req.body);
  const p = await tx(async (c) => {
    const r = (
      await c.query(
        "INSERT INTO paiements (reference, type, membre_id, montant_fcfa) VALUES ($1,'don',$2,$3) RETURNING *",
        [newRef('DON'), req.user.mid, b.montant_fcfa],
      )
    ).rows[0];
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'don', montant: r.montant_fcfa });
    return r;
  });
  return reply.code(201).send(paiementReponse(p));
});

// Cotisation et carte, 28 oct. 2026 : comme le don, mais avec un
// type distinct, pour que l'administrateur voie exactement ce que
// le membre a payé, et ne confonde pas une cotisation ou une carte
// avec un don. Montant fixe de 1 000 FCFA, comme dans l'application,
// refusé côté serveur si le montant diffère, pour ne pas valider
// une carte ou une cotisation à un autre montant.
for (const [route, type, prefix] of [['cotisation', 'cotisation', 'COT'], ['carte', 'carte', 'CARTE']]) {
  app.post(`/paiements/${route}`, { preHandler: membreG }, async (req, reply) => {
      const b = z.object({ montant_fcfa: z.number().int() }).parse(req.body);
    if (b.montant_fcfa !== 1000) throw httpError(400, 'Le montant de la carte et de la cotisation est de 1 000 FCFA.');
    const p = await tx(async (c) => {
      const r = (
        await c.query(
          `INSERT INTO paiements (reference, type, membre_id, montant_fcfa) VALUES ($1,$2,$3,$4) RETURNING *`,
          [newRef(prefix), type, req.user.mid, b.montant_fcfa],
        )
      ).rows[0];
      await audit(c, req, 'paiement.cree', 'paiements', r.id, { type, montant: r.montant_fcfa });
      return r;
    });
    return reply.code(201).send(paiementReponse(p));
  });
}

// Abonnement Plateforme, carte 83, 7 nov. 2026 : 100 000 FCFA
// par an, montant fixe refusé côté serveur s'il diffère, comme
// pour la carte et la cotisation. La demande reste en attente
// tant que la structure ne l'a pas validée après contrôle de
// son compte Wave ; c'est la validation qui active l'abonnement
// pour 12 mois, voir confirmPayment.
app.post('/paiements/plateforme', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({ montant_fcfa: z.number().int() }).parse(req.body);
  if (b.montant_fcfa !== PLATEFORME_MONTANT_ANNUEL) throw httpError(400, 'Le montant de l’abonnement Plateforme est de 100 000 FCFA par an.');
  const p = await tx(async (c) => {
    const r = (
      await c.query(
        `INSERT INTO paiements (reference, type, membre_id, montant_fcfa) VALUES ($1,'plateforme',$2,$3) RETURNING *`,
        [newRef('PLT'), req.user.mid, b.montant_fcfa],
      )
    ).rows[0];
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'plateforme', montant: r.montant_fcfa });
    return r;
  });
  return reply.code(201).send(paiementReponse(p));
});

app.post('/paiements/achat', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({ livre_ids: z.array(z.string().uuid()).min(1).max(20) }).parse(req.body);
  const ids = [...new Set(b.livre_ids)];
  const p = await tx(async (c) => {
    const livres = (await c.query('SELECT id, titre, auteur, prix_fcfa FROM livres WHERE publie AND id = ANY($1)', [ids])).rows;
    if (livres.length !== ids.length) throw httpError(404, 'Un des livres demandés est introuvable.');
    const deja = (await c.query('SELECT livre_id FROM v_acces_livres WHERE membre_id = $1 AND livre_id = ANY($2)', [req.user.mid, ids])).rows;
    if (deja.length) throw httpError(409, 'Un des livres est déjà acheté.');
    const total = livres.reduce((s, l) => s + l.prix_fcfa, 0); // montant calculé côté serveur
    const r = (
      await c.query(
        "INSERT INTO paiements (reference, type, membre_id, montant_fcfa) VALUES ($1,'achat',$2,$3) RETURNING *",
        [newRef('ACH'), req.user.mid, total],
      )
    ).rows[0];
    for (const l of livres) {
      await c.query(
        'INSERT INTO achats_lignes (paiement_id, livre_id, titre_copie, auteur_copie, prix_copie_fcfa) VALUES ($1,$2,$3,$4,$5)',
        [r.id, l.id, l.titre, l.auteur, l.prix_fcfa],
      );
    }
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'achat', montant: total, livres: ids });
    return r;
  });
  return reply.code(201).send(paiementReponse(p));
});

// Versement d'un camp, 31 oct. 2026 : le membre paie le versement
// suivant de son plan, jamais un montant choisi. Le serveur calcule
// le numéro et le montant exact depuis le tarif du camp et les
// versements déjà validés. Une demande en attente pour ce versement
// est renvoyée telle quelle, sans doublon. Comme toute demande, elle
// reste en attente tant que la structure ne l'a pas validée après
// contrôle de son compte, jamais payée sur seul lien ou numéro.
app.post('/paiements/camp', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({ evenement_id: z.string().uuid() }).parse(req.body);
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1 AND publie', [b.evenement_id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  const tarif = ev.tarif_fcfa ?? 0;
  if (tarif <= 0) throw httpError(400, 'Ce camp ne demande pas de versements.');
  const inscrit = (await q('SELECT inscrit_le FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2', [b.evenement_id, req.user.mid])).rows[0];
  if (!inscrit) throw httpError(409, 'Inscrivez-vous d’abord à ce camp avant de payer un versement.');
  const p = await tx(async (c) => {
    const valides = (await c.query(
      `SELECT COUNT(DISTINCT numero_versement)::int AS n FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'confirme'`,
      [req.user.mid, b.evenement_id],
    )).rows[0]?.n ?? 0;
    const paye = (await c.query(
      `SELECT COALESCE(SUM(montant_fcfa), 0)::int AS s FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'confirme'`,
      [req.user.mid, b.evenement_id],
    )).rows[0]?.s ?? 0;
    if (paye >= tarif) throw httpError(409, 'Ce camp est déjà entièrement payé.');
    const suivant = valides + 1;
    const deja = (await c.query(
      `SELECT * FROM paiements WHERE membre_id = $1 AND evenement_id = $2 AND type = 'camp' AND numero_versement = $3 AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1`,
      [req.user.mid, b.evenement_id, suivant],
    )).rows[0];
    if (deja) return { row: deja, cree: false };
    const montant = montantVersement(tarif, suivant);
    // Mois cible, 31 oct. 2026, préparation de l'automatique sans
    // activation : le versement numéro N vise le N-ième mois à
    // compter du mois d'inscription. Abidjan est à UTC+0 toute
    // l'année, le mois UTC est donc le mois local.
    const base = inscrit.inscrit_le ? new Date(inscrit.inscrit_le) : new Date();
    const cible = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + (suivant - 1), 1));
    const moisCible = Number.isNaN(cible.getTime()) ? null : cible.toISOString().slice(0, 10);
    const r = (await c.query(
      `INSERT INTO paiements (reference, type, membre_id, montant_fcfa, evenement_id, numero_versement, mois_cible) VALUES ($1,'camp',$2,$3,$4,$5,$6) RETURNING *`,
      [newRef('CAMP'), req.user.mid, montant, b.evenement_id, suivant, moisCible],
    )).rows[0];
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'camp', montant, evenement_id: b.evenement_id, numero_versement: suivant, mois_cible: moisCible });
    return { row: r, cree: true };
  });
  const rep = paiementReponse(p.row);
  rep.evenement_id = b.evenement_id;
  rep.numero_versement = p.row.numero_versement;
  rep.camp_nom = ev.nom;
  rep.mois_cible = p.row.mois_cible ?? null;
  return reply.code(p.cree ? 201 : 200).send(rep);
});

// Paiement du camp en une fois, 31 oct. 2026 : le solde complet en
// une seule demande ordinaire du circuit existant, sans numero de
// versement. Le pass se debloque a la validation, comme au 6e
// versement, parce que la visibilite se mesure au montant paye.
app.post('/paiements/camp/total', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({ evenement_id: z.string().uuid() }).parse(req.body);
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1 AND publie', [b.evenement_id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  const tarif = ev.tarif_fcfa ?? 0;
  if (tarif <= 0) throw httpError(400, 'Ce camp ne demande pas de paiement en une fois.');
  const inscrit = (await q('SELECT inscrit_le, versements_requis FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2', [b.evenement_id, req.user.mid])).rows[0];
  if (!inscrit) throw httpError(409, 'Inscrivez-vous d’abord à ce camp avant de payer.');
  if (!inscrit.versements_requis) throw httpError(409, 'Ce camp est déjà accessible sans paiement.');
  const p = await tx(async (c) => {
    const paye = (await c.query(
      `SELECT COALESCE(SUM(montant_fcfa), 0)::int AS s FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'confirme'`,
      [req.user.mid, b.evenement_id],
    )).rows[0]?.s ?? 0;
    if (paye >= tarif) throw httpError(409, 'Ce camp est déjà entièrement payé.');
    const enAttente = (await c.query(
      `SELECT * FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1`,
      [req.user.mid, b.evenement_id],
    )).rows[0];
    if (enAttente) {
      if (enAttente.numero_versement == null) return { row: enAttente, cree: false };
      throw httpError(409, 'Un versement est déjà en attente de validation pour ce camp.');
    }
    const montant = tarif - paye;
    const r = (await c.query(
      `INSERT INTO paiements (reference, type, membre_id, montant_fcfa, evenement_id) VALUES ($1,'camp',$2,$3,$4) RETURNING *`,
      [newRef('CAMP'), req.user.mid, montant, b.evenement_id],
    )).rows[0];
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'camp', montant, evenement_id: b.evenement_id, total: true });
    return { row: r, cree: true };
  });
  const rep = paiementReponse(p.row);
  rep.evenement_id = b.evenement_id;
  rep.camp_nom = ev.nom;
  rep.total = true;
  return reply.code(p.cree ? 201 : 200).send(rep);
});

// Don de camp ou de retraite, 31 oct. 2026 : celui qui offre paie,
// le beneficiaire recoit le pass. Le beneficiaire est resolu en
// interne par son numero ou son e-mail, sans endpoint public de
// recherche, et la reponse ne dit que si le don est attache tout
// de suite ou en attente, jamais de matricule ni d'etablissement.
// Un don couvre le reste a payer du beneficiaire deja inscrit, le
// tarif complet sinon. Un don pour une personne deja entierement
// payee, ou deja en acces libre, est refuse clairement.
app.post('/dons/camp', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({
    evenement_id: z.string().uuid(),
    beneficiaire_nom: z.string().trim().min(2).max(120).transform(texteMajuscules),
    beneficiaire_contact: z.string().trim().min(6).max(120),
    message: z.string().trim().max(500).optional(),
  }).refine((v) => !v.beneficiaire_contact.includes('@') || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.beneficiaire_contact), { message: 'E-mail invalide.' }).parse(req.body);
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1 AND publie', [b.evenement_id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  const tarif = ev.tarif_fcfa ?? 0;
  if (tarif <= 0) throw httpError(400, 'Ce camp ne peut pas être offert, son tarif n’est pas fixé.');
  const contact = b.beneficiaire_contact.includes('@') ? b.beneficiaire_contact.trim().toLowerCase() : normalizePhoneServer(b.beneficiaire_contact);
  const beneficiaireId = await resoudreBeneficiaire(b.beneficiaire_contact);
  if (beneficiaireId && beneficiaireId === req.user.mid) throw httpError(409, 'Vous ne pouvez pas vous offrir un camp à vous-même, utilisez le paiement en une fois.');
  const p = await tx(async (c) => {
    let paye = 0;
    if (beneficiaireId) {
      const insc = (await c.query('SELECT versements_requis FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2', [b.evenement_id, beneficiaireId])).rows[0];
      if (insc && !insc.versements_requis) throw httpError(409, 'Cette personne a déjà accès à ce camp.');
      paye = (await c.query(
        `SELECT COALESCE(SUM(montant_fcfa), 0)::int AS s FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'confirme'`,
        [beneficiaireId, b.evenement_id],
      )).rows[0]?.s ?? 0;
      if (paye >= tarif) throw httpError(409, 'Ce camp est déjà entièrement payé pour cette personne.');
    }
    const deja = (await c.query(
      `SELECT * FROM paiements WHERE membre_id = $1 AND evenement_id = $2 AND type = 'camp' AND beneficiaire_contact = $3 AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1`,
      [req.user.mid, b.evenement_id, contact],
    )).rows[0];
    if (deja) return { row: deja, cree: false, attache: !!beneficiaireId };
    const montant = beneficiaireId ? Math.max(1, tarif - paye) : tarif;
    const r = (await c.query(
      `INSERT INTO paiements (reference, type, membre_id, montant_fcfa, evenement_id, beneficiaire_id, beneficiaire_nom, beneficiaire_contact, message_don) VALUES ($1,'camp',$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [newRef('CAMP'), req.user.mid, montant, b.evenement_id, beneficiaireId ?? null, b.beneficiaire_nom, contact, b.message ?? null],
    )).rows[0];
    await audit(c, req, 'don.camp.cree', 'paiements', r.id, { type: 'camp', montant, evenement_id: b.evenement_id, beneficiaire_id: beneficiaireId ?? null, beneficiaire_contact: contact });
    return { row: r, cree: true, attache: !!beneficiaireId };
  });
  const rep = paiementReponse(p.row);
  rep.evenement_id = b.evenement_id;
  rep.camp_nom = ev.nom;
  rep.beneficiaire_nom = b.beneficiaire_nom;
  rep.attache = p.attache;
  return reply.code(p.cree ? 201 : 200).send(rep);
});

// Le membre déclare l'identifiant de transaction Wave de son reçu.
// Un identifiant déjà utilisé est refusé dès la déclaration (contrainte UNIQUE).
// Cela ne confirme RIEN : seule la correspondance avec le webhook signé, ou la structure, confirme.
app.post('/paiements/:reference/declarer', { preHandler: membreG }, async (req) => {
  const { reference } = z.object({ reference: z.string().min(5).max(40) }).parse(req.params);
  const b = z.object({ wave_transaction_id: z.string().trim().min(6).max(64) }).parse(req.body);
  return tx(async (c) => {
    const p = (
      await c.query('SELECT * FROM paiements WHERE reference = $1 AND membre_id = $2 FOR UPDATE', [reference, req.user.mid])
    ).rows[0];
    if (!p) throw httpError(404, 'Demande introuvable.');
    if (p.statut !== 'en_attente') throw httpError(409, 'Cette demande n\u2019est plus en attente.');
    try {
      await c.query('SAVEPOINT decl');
      await c.query('UPDATE paiements SET wave_transaction_id = $1 WHERE id = $2', [b.wave_transaction_id, p.id]);
    } catch (e) {
      if (e.code === '23505') {
        await c.query('ROLLBACK TO SAVEPOINT decl');
        throw httpError(409, 'Cet identifiant de transaction a déjà été utilisé.');
      }
      throw e;
    }
    // Le webhook est peut-être déjà arrivé : on rapproche (identifiant ET montant identiques).
    const ev = (
      await c.query(
        `SELECT id, charge FROM evenements_wave
         WHERE signature_ok AND NOT traite AND charge->>'type' = 'merchant.payment_received' AND charge->'data'->>'id' = $1 LIMIT 1`,
        [b.wave_transaction_id],
      )
    ).rows[0];
    let statut = 'en_attente';
    if (ev && Number(ev.charge.data.amount) === p.montant_fcfa && ev.charge.data.currency === 'XOF') {
      const done = await confirmPayment(c, p.id, 'webhook', null, null);
      if (done) {
        statut = 'confirme';
        await c.query('UPDATE evenements_wave SET traite = true, paiement_id = $1 WHERE id = $2', [p.id, ev.id]);
        await audit(c, req, 'paiement.confirme_webhook', 'paiements', p.id, { evenement: ev.id });
      }
    } else {
      await audit(c, req, 'paiement.declare', 'paiements', p.id, { wave_transaction_id: b.wave_transaction_id });
    }
    if (statut === 'confirme') queueMicrotask(() => ensureInvoice(p.id).catch((e) => app.log.error(e)));
    // Avertissement, sans confirmation automatique : si un autre paiement
    // en attente partage ce montant, le rapprochement reste manuel, avec
    // identifiant, date et expéditeur, puis validation de la structure.
    const autres = (await c.query("SELECT montant_fcfa FROM paiements WHERE statut = 'en_attente' AND id <> $1", [p.id])).rows.map((r) => r.montant_fcfa);
    const doublon = hasDuplicatePendingAmount([...autres, p.montant_fcfa], p.montant_fcfa);
    return {
      reference: p.reference,
      statut,
      doublon_montant: doublon,
      message: doublon
        ? 'Plusieurs demandes en attente partagent ce montant : rapprochement manuel requis, jamais de confirmation sur le montant seul.'
        : undefined,
    };
  });
});

app.get('/moi/paiements', { preHandler: membreG }, async (req) =>
  (
    await q(
      `SELECT p.id, p.reference, p.type, p.montant_fcfa, p.statut, p.moyen, p.cree_le, p.confirme_le, p.refuse_le,
              p.evenement_id, p.numero_versement, p.mois_cible, ev.nom AS camp_nom,
              p.beneficiaire_id, p.beneficiaire_nom, p.message_don,
              gm.nom_complet AS donateur_nom,
              CASE WHEN p.beneficiaire_id = $1 THEN 'recu' WHEN p.beneficiaire_id IS NOT NULL THEN 'offert' ELSE NULL END AS role_don,
              cm.nom_complet AS confirme_par_nom, rm.nom_complet AS refuse_par_nom,
              COALESCE((SELECT json_agg(json_build_object('livre_id', l.livre_id, 'titre', l.titre_copie, 'auteur', l.auteur_copie, 'prix_fcfa', l.prix_copie_fcfa))
                        FROM achats_lignes l WHERE l.paiement_id = p.id), '[]') AS lignes
       FROM paiements p
       LEFT JOIN membres gm ON gm.id = p.membre_id
       LEFT JOIN membres cm ON cm.utilisateur_id = p.confirme_par
       LEFT JOIN membres rm ON rm.utilisateur_id = p.refuse_par
       LEFT JOIN evenements ev ON ev.id = p.evenement_id
       WHERE (p.membre_id = $1 OR p.beneficiaire_id = $1) ORDER BY p.cree_le DESC LIMIT 100`,
      [req.user.mid],
    )
  ).rows);

app.get('/moi/achats', { preHandler: membreG }, async (req) =>
  (
    await q(
      `SELECT l.id, l.titre, l.auteur, l.description, l.format, l.categorie FROM v_acces_livres a
       JOIN livres l ON l.id = a.livre_id WHERE a.membre_id = $1 ORDER BY l.titre`,
      [req.user.mid],
    )
  ).rows);

// Fichier du livre : renvoyé uniquement si l'achat est confirmé.
app.get('/livres/:id/fichier', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ok = (await q('SELECT peut_lire_livre($1,$2) AS ok', [req.user.mid, id])).rows[0].ok;
  if (!ok) throw httpError(403, 'Livre verrouillé : achat non confirmé.');
  const f = (
    await q('SELECT f.cle_stockage, f.type_mime_reel, f.donnees, l.titre FROM livres l JOIN fichiers f ON f.id = l.fichier_id WHERE l.id = $1 AND f.verifie', [id])
  ).rows[0];
  if (!f) throw httpError(404, 'La structure n\u2019a pas encore fourni le fichier de ce livre.');
  reply.header('Cache-Control', 'private, no-store');
  if (f.donnees) return sendBuffer(req, reply, f.donnees, f.type_mime_reel, { inline: true, filename: `${f.titre}` });
  return sendFile(req, reply, f.cle_stockage, f.type_mime_reel, { inline: true, filename: `${f.titre}` });
});

// ───────────────────────── Confirmation et facture ─────────────────────────
// Unique point de passage vers le statut « confirmé ».
async function confirmPayment(c, id, mode, byUser, txId, moyen) {
  // Paiement du camp en 6 fois, 31 oct. 2026 : un même versement ne
  // peut jamais être validé deux fois, quel que soit le chemin de
  // confirmation (validation structure, webhook ou rapprochement).
  const cible = (await c.query(
    'SELECT type, membre_id, beneficiaire_id, beneficiaire_contact, evenement_id, numero_versement FROM paiements WHERE id = $1 AND statut = $2',
    [id, 'en_attente'],
  )).rows[0];
  if (!cible) return null;
  if (cible.type === 'camp' && cible.evenement_id && cible.numero_versement) {
    const doublon = (await c.query(
      `SELECT 1 FROM paiements WHERE membre_id = $1 AND evenement_id = $2 AND numero_versement = $3 AND statut = 'confirme' AND id <> $4`,
      [cible.membre_id, cible.evenement_id, cible.numero_versement, id],
    )).rows[0];
    if (doublon) return null;
  }
  // Don de camp, 31 oct. 2026 : un paiement sans numero (total en
  // une fois ou don) ne peut pas etre confirme deux fois pour le
  // meme beneficiaire et le meme camp, meme par deux lignes
  // differentes creees avant toute validation.
  if (cible.type === 'camp' && cible.evenement_id && !cible.numero_versement) {
    const cibleBenef = cible.beneficiaire_contact ? cible.beneficiaire_id : cible.membre_id;
    if (cibleBenef) {
      const doublonTotal = (await c.query(
        `SELECT 1 FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND numero_versement IS NULL AND statut = 'confirme' AND id <> $3`,
        [cibleBenef, cible.evenement_id, id],
      )).rows[0];
      if (doublonTotal) return null;
    }
  }
  const r = await c.query(
    `UPDATE paiements SET statut = 'confirme', mode_confirmation = $2, confirme_le = now(), confirme_par = $3,
            wave_transaction_id = COALESCE($4, wave_transaction_id),
            moyen = COALESCE($5, moyen)
     WHERE id = $1 AND statut = 'en_attente' RETURNING *`,
    [id, mode, byUser, txId ?? null, moyen ?? null],
  );
  const row = r.rows[0] ?? null;
  // Carte 83 : la validation d'un paiement Plateforme active
  // l'abonnement pour 12 mois, à partir de la validation,
  // jamais à partir du paiement. Un renouvellement crée une
  // nouvelle ligne ; la lecture prend toujours la plus récente.
  if (row && row.type === 'plateforme') {
    const debut = new Date();
    await c.query(
      'INSERT INTO plateforme_abonnements (membre_id, paiement_id, statut, date_debut, date_fin) VALUES ($1,$2,$3,$4,$5)',
      [row.membre_id, row.id, 'Actif', debut.toISOString(), dateFinAbonnement(debut).toISOString()],
    );
  }
  return row;
}

function writeInvoicePdf(file, p, lignes) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const out = fs.createWriteStream(file);
    out.on('finish', resolve);
    out.on('error', reject);
    doc.pipe(out);
    const f = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
    doc.fillColor('#0B1F3A').fontSize(22).text('Connexion Prophétique');
    doc.fontSize(10).fillColor('#55607A').text('Former pour mieux servir');
    doc.moveDown(1.5).fillColor('#0B1F3A').fontSize(16).text(`Facture F-${p.reference}`);
    doc.fontSize(10).fillColor('#000000')
      .text(`Date : ${new Date(p.confirme_le).toLocaleDateString('fr-FR')}`)
      .text(`Client : ${p.nom_complet} (${p.matricule})`)
      .text(`Paiement : ${p.mode_confirmation === 'paypal' ? 'PayPal' : 'Wave'}, confirmé`);
    doc.moveDown();
    if (lignes.length === 0) {
      doc.fontSize(11).text(p.type === 'don' ? 'Contribution (don)' : p.type === 'carte' ? 'Carte de membre' : p.type === 'cotisation' ? 'Cotisation mensuelle' : p.type === 'camp' ? (p.beneficiaire_nom ? `Don de camp${p.camp_nom ? `, ${p.camp_nom}` : ''}, pour ${p.beneficiaire_nom}` : p.numero_versement ? `Versement du camp${p.camp_nom ? `, ${p.camp_nom}` : ''}, versement ${p.numero_versement} sur 6` : `Paiement du camp en une fois${p.camp_nom ? `, ${p.camp_nom}` : ''}`) : 'Paiement');
    } else {
      for (const l of lignes) doc.fontSize(11).text(`${l.titre_copie} — ${l.auteur_copie}      ${f(l.prix_copie_fcfa)}`);
    }
    doc.moveDown().fontSize(13).text(`Total payé : ${f(p.montant_fcfa)}`);
    doc.end();
  });
}

// Idempotente : une seule facture par paiement, jamais avant confirmation.
async function ensureInvoice(paiementId) {
  if ((await q('SELECT 1 FROM factures WHERE paiement_id = $1', [paiementId])).rows[0]) return;
  const p = (
    await q(
      `SELECT p.*, m.nom_complet, m.matricule, ev.nom AS camp_nom FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
       LEFT JOIN evenements ev ON ev.id = p.evenement_id
       WHERE p.id = $1 AND p.statut = 'confirme'`,
      [paiementId],
    )
  ).rows[0];
  if (!p) return;
  const lignes = (await q('SELECT titre_copie, auteur_copie, prix_copie_fcfa FROM achats_lignes WHERE paiement_id = $1', [paiementId])).rows;
  const key = `factures/${p.reference}.pdf`;
  const file = path.join(CFG.uploadDir, key);
  await fsp.mkdir(path.dirname(file), { recursive: true });
  await writeInvoicePdf(file, p, lignes);
  const st = await fsp.stat(file);
  const hash = sha256(await fsp.readFile(file));
  await tx(async (c) => {
    const f = (
      await c.query(
        `INSERT INTO fichiers (cle_stockage, nom_original, type_mime_reel, taille_octets, sha256, verifie)
         VALUES ($1,$2,'application/pdf',$3,$4,true)
         ON CONFLICT (cle_stockage) DO UPDATE SET sha256 = EXCLUDED.sha256 RETURNING id`,
        [key, `${p.reference}.pdf`, st.size, hash],
      )
    ).rows[0];
    await c.query('INSERT INTO factures (numero, paiement_id, fichier_id) VALUES ($1,$2,$3) ON CONFLICT (paiement_id) DO NOTHING', [
      `F-${p.reference}`,
      p.id,
      f.id,
    ]);
  });
}

app.get('/moi/paiements/:reference/facture', { preHandler: membreG }, async (req, reply) => {
  const { reference } = z.object({ reference: z.string().min(5).max(40) }).parse(req.params);
  const p = (await q('SELECT id, statut FROM paiements WHERE reference = $1 AND membre_id = $2', [reference, req.user.mid])).rows[0];
  if (!p) throw httpError(404, 'Demande introuvable.');
  if (p.statut !== 'confirme') throw httpError(409, 'Aucune facture avant la confirmation du paiement.');
  await ensureInvoice(p.id);
  const f = (
    await q('SELECT fi.cle_stockage, fa.numero FROM factures fa JOIN fichiers fi ON fi.id = fa.fichier_id WHERE fa.paiement_id = $1', [p.id])
  ).rows[0];
  if (!f) throw httpError(404, 'Facture indisponible.');
  reply.header('Cache-Control', 'private, no-store');
  return sendFile(req, reply, f.cle_stockage, 'application/pdf', { inline: false, filename: `${f.numero}.pdf` });
});

// ───────────────────────── Webhook Wave ─────────────────────────

app.post('/webhooks/wave', { config: { rateLimit: { max: 300, timeWindow: '1 minute' } } }, async (req, reply) => {
  if (!CFG.waveWebhookSecret) return reply.code(503).send({ erreur: 'Webhook non configuré.' });
  if (CFG.waveEnforceIp && !WAVE_IPS.includes(String(ipClient(req)).replace(/^::ffff:/, ''))) {
    return reply.code(403).send({ erreur: 'Origine non autorisée.' });
  }
  if (!verifyWaveSignature(req.headers['wave-signature'], req.rawBody, CFG.waveWebhookSecret)) {
    return reply.code(401).send({ erreur: 'Signature invalide.' });
  }
  const ev = req.body;
  if (!ev || typeof ev.id !== 'string' || typeof ev.type !== 'string') return reply.code(400).send({ erreur: 'Événement invalide.' });

  const confirmedId = await tx(async (c) => {
    // Idempotence : Wave peut renvoyer le même événement plusieurs fois.
    const ins = (
      await c.query(
        'INSERT INTO evenements_wave (evenement_ext, signature_ok, charge) VALUES ($1, true, $2) ON CONFLICT (evenement_ext) DO NOTHING RETURNING id',
        [ev.id, JSON.stringify(ev)],
      )
    ).rows[0];
    if (!ins) return null;

    let paiement = null;
    const d = ev.data ?? {};
    const amount = Number(d.amount);

    if (ev.type === 'merchant.payment_received' && d.currency === 'XOF' && Number.isInteger(amount)) {
      // Rapprochement strict : identifiant de transaction déclaré par le membre ET même montant.
      const p = (
        await c.query(
          "SELECT id FROM paiements WHERE wave_transaction_id = $1 AND statut = 'en_attente' AND montant_fcfa = $2 FOR UPDATE",
          [d.id, amount],
        )
      ).rows[0];
      if (p) paiement = await confirmPayment(c, p.id, 'webhook', null, null);
    } else if (ev.type === 'checkout.session.completed' && d.payment_status === 'succeeded' && d.currency === 'XOF' && d.client_reference) {
      // Utilisable si la structure passe plus tard par l'API Checkout (client_reference = notre référence).
      const p = (
        await c.query(
          "SELECT id FROM paiements WHERE reference = $1 AND statut = 'en_attente' AND montant_fcfa = $2 FOR UPDATE",
          [d.client_reference, amount],
        )
      ).rows[0];
      const used = d.transaction_id
        ? (await c.query('SELECT 1 FROM paiements WHERE wave_transaction_id = $1', [d.transaction_id])).rows[0]
        : null;
      if (p && !used) paiement = await confirmPayment(c, p.id, 'webhook', null, d.transaction_id ?? null);
    } else if (ev.type === 'test.test_event') {
      await c.query('UPDATE evenements_wave SET traite = true WHERE id = $1', [ins.id]);
    }

    if (paiement) {
      await c.query('UPDATE evenements_wave SET traite = true, paiement_id = $1 WHERE id = $2', [paiement.id, ins.id]);
      await audit(c, null, 'paiement.confirme_webhook', 'paiements', paiement.id, { evenement: ev.id });
      return paiement.id;
    }
    // Sinon l'événement reste « non rapproché » : la structure le traite depuis son espace.
    return null;
  });

  if (confirmedId) {
    ensureInvoice(confirmedId).catch((e) => app.log.error(e));
    const p = (await q('SELECT id, membre_id, type, montant_fcfa FROM paiements WHERE id = $1', [confirmedId])).rows[0];
    await notifierPaiementValide(p);
  }
  return { ok: true }; // 2xx rapide, sinon Wave retente
});

// ───────────────────────── Webhooks MTN, Orange, CinetPay ─────────────────────────
// T16, 26 nov. 2026 : comme pour Orange, la notification ne
// prouve rien seule, elle sert seulement à retrouver le
// paiement. La confirmation passe toujours par la vérification
// côté serveur, montant et devise exacts. 2xx rapide, sinon
// le prestataire retente.
for (const idWebhook of ['mtn', 'orange', 'cinetpay']) {
  app.post(`/webhooks/${idWebhook}`, { config: { rateLimit: { max: 300, timeWindow: '1 minute' } } }, async (req, reply) => {
    if (!prestataireDisponible(idWebhook, CFG)) {
      return reply.code(503).send({ erreur: 'Prestataire non configuré.' });
    }
    const reference = referenceWebhook(idWebhook, req.body);
    if (!reference) return reply.code(400).send({ erreur: 'Référence introuvable.' });
    const p = (
      await q("SELECT * FROM paiements WHERE reference = $1 AND statut = 'en_attente'", [reference])
    ).rows[0];
    if (p && p.prestataire === idWebhook) await verifierEtConfirmerPrestataire(p);
    return { ok: true };
  });
}

// ───────────────────────── Quiz Bible ─────────────────────────
// Pas de répétition tant que toutes les questions n'ont pas été passées (cycles).
app.get('/quiz/prochaine', { preHandler: membreG }, async (req) => {
  const { n } = z.object({ n: z.coerce.number().int().min(1).max(20).default(5) }).parse(req.query);
  const cur = (await q('SELECT COALESCE(max(cycle),1) AS c FROM quiz_vus WHERE membre_id = $1', [req.user.mid])).rows[0].c;
  const pick = (cycle) =>
    q(
      `SELECT qq.id, qq.enonce, qp.nom AS personnage, qp.testament FROM quiz_questions qq
       JOIN quiz_personnages qp ON qp.id = qq.personnage_id
       WHERE qq.actif AND NOT EXISTS (SELECT 1 FROM quiz_vus v WHERE v.membre_id = $1 AND v.question_id = qq.id AND v.cycle = $2)
       ORDER BY random() LIMIT $3`,
      [req.user.mid, cycle, n],
    );
  let r = await pick(cur);
  if (r.rows.length === 0) r = await pick(cur + 1); // tout est passé : nouveau cycle
  const ids = r.rows.map((x) => x.id);
  const choix = ids.length
    ? (await q('SELECT id, question_id, position, libelle FROM quiz_choix WHERE question_id = ANY($1) ORDER BY position', [ids])).rows
    : [];
  // La bonne réponse n'est jamais envoyée avant que le membre ait répondu.
  return r.rows.map((x) => ({ ...x, choix: choix.filter((c) => c.question_id === x.id).map(({ id, position, libelle }) => ({ id, position, libelle })) }));
});

app.post('/quiz/repondre', { preHandler: membreG }, async (req) => {
  const b = z.object({ question_id: z.string().uuid(), choix_id: z.string().uuid() }).parse(req.body);
  return tx(async (c) => {
    const bonne = (
      await c.query(
        `SELECT ch.id AS bonne_id, qq.reference_verset, qq.explication FROM quiz_choix ch
         JOIN quiz_questions qq ON qq.id = ch.question_id WHERE ch.question_id = $1 AND ch.est_correct`,
        [b.question_id],
      )
    ).rows[0];
    if (!bonne) throw httpError(404, 'Question introuvable.');
    const cur = (await c.query('SELECT COALESCE(max(cycle),1) AS c FROM quiz_vus WHERE membre_id = $1', [req.user.mid])).rows[0].c;
    const dejaVue = (await c.query('SELECT 1 FROM quiz_vus WHERE membre_id=$1 AND question_id=$2 AND cycle=$3', [req.user.mid, b.question_id, cur])).rows[0];
    await c.query('INSERT INTO quiz_vus (membre_id, question_id, cycle) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING', [
      req.user.mid,
      b.question_id,
      dejaVue ? cur + 1 : cur,
    ]);
    return {
      correct: bonne.bonne_id === b.choix_id,
      bonne_reponse_id: bonne.bonne_id,
      reference: bonne.reference_verset,
      explication: bonne.explication,
    };
  });
});

// ───────────────────────── Défi quiz hebdomadaire ─────────────────────────
// Défi entre établissements, 31 oct. 2026 : une seule participation
// comptée par membre et par semaine, du lundi 00 h 00 au dimanche
// 23 h 59, heure d'Abidjan (UTC+0 toute l'année, donc la semaine UTC
// est la semaine locale). La première partie terminée de la semaine
// compte, les suivantes restent du jeu libre. Les scores sont déclarés
// par le client en fin de partie, le contenu du quiz étant local ;
// le serveur garantit une seule participation par semaine et calcule
// les moyennes, il ne corrige pas les réponses lui-même.
function lundiSemaine(d = new Date()) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const decalage = (t.getUTCDay() + 6) % 7; // lundi = 0
  t.setUTCDate(t.getUTCDate() - decalage);
  return t.toISOString().slice(0, 10);
}

app.post('/defi/participer', { preHandler: membreG }, async (req) => {
  const b = z.object({ score: z.number().int().min(0), total: z.number().int().min(1).max(50) }).parse(req.body);
  if (b.score > b.total) throw httpError(400, 'Score invalide.');
  const semaine = lundiSemaine();
  const r = await q(
    `INSERT INTO quiz_defi (membre_id, semaine, score, total) VALUES ($1,$2,$3,$4)
     ON CONFLICT (membre_id, semaine) DO NOTHING RETURNING *`,
    [req.user.mid, semaine, b.score, b.total],
  );
  const ligne =
    r.rows[0] ?? (await q('SELECT * FROM quiz_defi WHERE membre_id = $1 AND semaine = $2', [req.user.mid, semaine])).rows[0];
  return { semaine, score: ligne.score, total: ligne.total, joue_le: ligne.joue_le, comptee: r.rows.length > 0, deja_comptee: r.rows.length === 0 };
});

app.get('/defi/moi', { preHandler: membreG }, async (req) => {
  const semaine = lundiSemaine();
  const ligne = (await q('SELECT * FROM quiz_defi WHERE membre_id = $1 AND semaine = $2', [req.user.mid, semaine])).rows[0];
  return { semaine, participation: ligne ?? null };
});

app.get('/defi/classement', { preHandler: membreG }, async (req) => {
  const semaine = lundiSemaine();
  const [classement, moi] = await Promise.all([
    q(
      `SELECT e.id AS etablissement_id, e.nom AS etablissement_nom,
              ROUND(AVG(d.score)::numeric, 2) AS moyenne,
              COUNT(*)::int AS participants
       FROM quiz_defi d
       JOIN membres m ON m.id = d.membre_id
       JOIN etablissements e ON e.id = m.etablissement_id
       WHERE d.semaine = $1
       GROUP BY e.id, e.nom
       ORDER BY moyenne DESC, participants DESC, e.nom ASC`,
      [semaine],
    ),
    q(
      `SELECT m.etablissement_id, e.nom AS etablissement_nom, d.score, d.total, d.joue_le
       FROM membres m
       LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN quiz_defi d ON d.membre_id = m.id AND d.semaine = $2
       WHERE m.id = $1`,
      [req.user.mid, semaine],
    ),
  ]);
  const m = moi.rows[0];
  return {
    semaine,
    classement: classement.rows,
    membre: {
      etablissement_id: m?.etablissement_id ?? null,
      etablissement_nom: m?.etablissement_nom ?? null,
      score: m?.score ?? null,
      total: m?.total ?? null,
      joue_le: m?.joue_le ?? null,
    },
  };
});


// ───────────────────────── Élections, carte 76, 7 nov. 2026 ─────────────────────────
// Une élection se crée par la structure, avec dates de début et de
// fin, candidats membres, un vote par membre. Hors période, la
// fonctionnalité n'apparaît pas aux membres : GET /elections/actuelle
// renvoie alors { election: null }, sans titre, sans candidat, sans
// date. Pendant le vote, aucun résultat n'est renvoyé aux membres :
// ni total, ni voix par candidat. Les résultats membres ne sont
// lisibles qu'après la fin, par GET /elections/:id/resultats ; la
// structure les lit à tout moment par GET /admin/elections/:id.
// Le choix de chacun n'est jamais renvoyé par aucune route : seuls
// les totaux le sont. La table election_votes garde membre_id pour
// imposer un seul vote par membre (contrainte unique), et l'audit
// d'un vote ne porte que l'identifiant de l'élection, jamais le
// candidat choisi. Une seule élection à la fois : la création refuse
// toute période qui chevauche une élection existante. Aucune route
// de suppression, comme pour les rapports et les attestations : une
// élection se clôt plus tôt en avançant sa date de fin (PUT admin).

app.get('/elections/actuelle', { preHandler: membreG }, async (req) => {
  const el = (
    await q(
      `SELECT id, titre, description, poste, date_debut, date_fin FROM elections
       WHERE date_debut <= now() AND date_fin >= now() ORDER BY date_fin ASC LIMIT 1`,
    )
  ).rows[0];
  if (!el) return { election: null };
  const candidats = (
    await q('SELECT id, nom, fonction, ordre FROM election_candidats WHERE election_id = $1 ORDER BY ordre ASC, nom ASC', [el.id])
  ).rows;
  const vote = req.user.mid
    ? (await q('SELECT candidat_id FROM election_votes WHERE election_id = $1 AND membre_id = $2', [el.id, req.user.mid])).rows[0]
    : null;
  return { election: formaterElectionMembre(el, candidats, vote?.candidat_id ?? null) };
});

app.post('/elections/:id/voter', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ candidat_id: z.string().uuid() }).parse(req.body);
  if (!req.user.mid) throw httpError(403, 'Un profil de membre est requis pour voter.');
  return tx(async (c) => {
    const el = (await c.query('SELECT id, date_debut, date_fin FROM elections WHERE id = $1 FOR UPDATE', [id])).rows[0];
    if (!el) throw httpError(404, 'Élection introuvable.');
    if (!electionEstOuverte(el)) throw httpError(400, 'Cette élection n’est pas ouverte au vote.');
    const cand = (
      await c.query('SELECT id, nom FROM election_candidats WHERE id = $1 AND election_id = $2', [b.candidat_id, id])
    ).rows[0];
    if (!cand) throw httpError(404, 'Candidat introuvable pour cette élection.');
    const deja = (await c.query('SELECT id FROM election_votes WHERE election_id = $1 AND membre_id = $2', [id, req.user.mid])).rows[0];
    if (deja) throw httpError(409, 'Vous avez déjà voté pour cette élection.');
    const vote = (
      await c.query('INSERT INTO election_votes (election_id, membre_id, candidat_id) VALUES ($1,$2,$3) RETURNING id, election_id, candidat_id, vote_le', [
        id,
        req.user.mid,
        b.candidat_id,
      ])
    ).rows[0];
    await audit(c, req, 'election.vote', 'election_votes', vote.id, { election_id: id });
    return { vote: { id: vote.id, election_id: id, candidat_id: vote.candidat_id, vote_le: vote.vote_le }, candidat_nom: cand.nom };
  });
});

app.get('/elections/:id/resultats', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const el = (await q('SELECT id, titre, poste, date_debut, date_fin FROM elections WHERE id = $1', [id])).rows[0];
  if (!el) throw httpError(404, 'Élection introuvable.');
  if (!resultatsVisiblesPourMembre(el)) throw httpError(404, 'Les résultats seront disponibles après la fin de l’élection.');
  const resultats = (
    await q(
      `SELECT c.id AS candidat_id, c.nom, c.fonction, c.ordre, COUNT(v.id)::int AS voix
       FROM election_candidats c LEFT JOIN election_votes v ON v.candidat_id = c.id
       WHERE c.election_id = $1 GROUP BY c.id ORDER BY voix DESC, c.ordre ASC, c.nom ASC`,
      [id],
    )
  ).rows;
  const total = resultats.reduce((s, r) => s + (r.voix || 0), 0);
  return { election: { ...el, statut: 'terminee' }, total_voix: total, resultats };
});

// ───────────────────────── Élections : administration ─────────────────────────
// Création réservée à l'administrateur général. Les candidats sont
// désignés par matricule (celui de leur carte de membre) et résolus
// côté serveur, jamais par un nom tapé librement : le nom et la
// fonction affichés sont ceux du membre, au moment de la création.
app.post('/admin/elections', { preHandler: adminG }, async (req, reply) => {
  const b = z
    .object({
      titre: z.string().trim().min(1).max(200).transform(texteMajuscules),
      description: z.string().trim().max(2000).optional().default(''),
      poste: z.string().trim().max(120).transform(texteMajuscules).optional().default(''),
      date_debut: z.string().datetime({ offset: true }),
      date_fin: z.string().datetime({ offset: true }),
      candidats: z.array(z.object({ matricule: z.string().trim().min(1).max(20) })).min(1).max(50),
    })
    .parse(req.body);
  const erreurs = validerCreationElection(b);
  if (erreurs.length) throw httpError(422, erreurs.join(' '));
  return tx(async (c) => {
    const chev = (
      await c.query('SELECT id, titre FROM elections WHERE date_debut < $2 AND date_fin > $1 LIMIT 1', [b.date_debut, b.date_fin])
    ).rows[0];
    if (chev) throw httpError(409, `Cette période chevauche l’élection « ${chev.titre} ». Une seule élection à la fois.`);
    const el = (
      await c.query(
        'INSERT INTO elections (titre, description, poste, date_debut, date_fin, cree_par) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, titre, description, poste, date_debut, date_fin, cree_le',
        [b.titre, b.description || null, b.poste || null, b.date_debut, b.date_fin, req.user.sub],
      )
    ).rows[0];
    const candidats = [];
    for (let i = 0; i < b.candidats.length; i++) {
      const mat = b.candidats[i].matricule;
      const m = (await c.query('SELECT id, nom_complet, fonction FROM membres WHERE matricule = $1', [mat])).rows[0];
      if (!m) throw httpError(422, `Matricule inconnu : ${mat}.`);
      const cand = (
        await c.query(
          'INSERT INTO election_candidats (election_id, membre_id, nom, fonction, ordre) VALUES ($1,$2,$3,$4,$5) RETURNING id, nom, fonction, ordre',
          [el.id, m.id, m.nom_complet, m.fonction ?? '', i + 1],
        )
      ).rows[0];
      candidats.push(cand);
    }
    await audit(c, req, 'election.creee', 'elections', el.id, { election_id: el.id, titre: el.titre, candidats: candidats.length });
    return reply.code(201).send({ ...el, statut: electionStatut(el), candidats });
  });
});

app.get('/admin/elections', { preHandler: adminG }, async () => {
  const rows = (
    await q(
      `SELECT e.*,
              (SELECT COUNT(*)::int FROM election_candidats c WHERE c.election_id = e.id) AS nb_candidats,
              (SELECT COUNT(*)::int FROM election_votes v WHERE v.election_id = e.id) AS nb_votes
       FROM elections e ORDER BY e.date_debut DESC`,
    )
  ).rows;
  return rows.map((r) => ({ ...r, statut: electionStatut(r) }));
});

app.get('/admin/elections/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const el = (await q('SELECT * FROM elections WHERE id = $1', [id])).rows[0];
  if (!el) throw httpError(404, 'Élection introuvable.');
  const candidats = (
    await q(
      `SELECT c.id, c.nom, c.fonction, c.ordre, c.membre_id, m.matricule, COUNT(v.id)::int AS voix
       FROM election_candidats c LEFT JOIN membres m ON m.id = c.membre_id
       LEFT JOIN election_votes v ON v.candidat_id = c.id
       WHERE c.election_id = $1 GROUP BY c.id, m.matricule ORDER BY c.ordre ASC, c.nom ASC`,
      [id],
    )
  ).rows;
  const total = candidats.reduce((s, r) => s + (r.voix || 0), 0);
  return { ...el, statut: electionStatut(el), candidats, total_voix: total };
});

app.post('/admin/elections/:id/candidats', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z
    .object({ matricule: z.string().trim().min(1).max(20).optional(), membre_id: z.string().uuid().optional() })
    .refine((v) => (v.matricule ? 1 : 0) + (v.membre_id ? 1 : 0) === 1, { message: 'Un matricule ou un identifiant de membre est requis.' })
    .parse(req.body);
  return tx(async (c) => {
    const el = (await c.query('SELECT id, date_debut FROM elections WHERE id = $1 FOR UPDATE', [id])).rows[0];
    if (!el) throw httpError(404, 'Élection introuvable.');
    if (new Date(el.date_debut) <= new Date()) throw httpError(400, 'L’élection a déjà commencé, les candidats ne peuvent plus être ajoutés.');
    const m = b.membre_id
      ? (await c.query('SELECT id, nom_complet, fonction FROM membres WHERE id = $1', [b.membre_id])).rows[0]
      : (await c.query('SELECT id, nom_complet, fonction FROM membres WHERE matricule = $1', [b.matricule])).rows[0];
    if (!m) throw httpError(422, b.matricule ? `Matricule inconnu : ${b.matricule}.` : 'Membre introuvable.');
    const deja = (await c.query('SELECT id FROM election_candidats WHERE election_id = $1 AND membre_id = $2', [id, m.id])).rows[0];
    if (deja) throw httpError(409, 'Ce membre est déjà candidat pour cette élection.');
    const ordre = (await c.query('SELECT COALESCE(MAX(ordre), 0) + 1 AS n FROM election_candidats WHERE election_id = $1', [id])).rows[0].n;
    const cand = (
      await c.query(
        'INSERT INTO election_candidats (election_id, membre_id, nom, fonction, ordre) VALUES ($1,$2,$3,$4,$5) RETURNING id, nom, fonction, ordre',
        [id, m.id, m.nom_complet, m.fonction ?? '', ordre],
      )
    ).rows[0];
    await audit(c, req, 'election.candidat_ajoute', 'election_candidats', cand.id, { election_id: id, membre_id: m.id });
    return reply.code(201).send(cand);
  });
});

app.put('/admin/elections/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z
    .object({
      titre: z.string().trim().min(1).max(200).transform(texteMajuscules).optional(),
      description: z.string().trim().max(2000).nullable().optional(),
      poste: z.string().trim().max(120).transform(texteMajuscules).nullable().optional(),
      date_debut: z.string().datetime({ offset: true }).optional(),
      date_fin: z.string().datetime({ offset: true }).optional(),
    })
    .refine((v) => Object.keys(v).length > 0, { message: 'Aucune modification fournie.' })
    .parse(req.body);
  return tx(async (c) => {
    const el = (await c.query('SELECT * FROM elections WHERE id = $1 FOR UPDATE', [id])).rows[0];
    if (!el) throw httpError(404, 'Élection introuvable.');
    const statut = electionStatut(el);
    if (statut === 'terminee') throw httpError(400, 'Élection terminée, elle ne peut plus être modifiée.');
    if (statut === 'en_cours') {
      const autres = Object.keys(b).filter((k) => k !== 'date_fin');
      if (autres.length) throw httpError(400, 'Après le début, seule la date de fin peut être modifiée, pour clore l’élection plus tôt.');
      if (b.date_fin && !(new Date(b.date_fin) > new Date(el.date_debut))) throw httpError(422, 'La date de fin doit être après la date de début.');
    } else {
      const debut = b.date_debut ?? el.date_debut;
      const fin = b.date_fin ?? el.date_fin;
      if (!(new Date(fin) > new Date(debut))) throw httpError(422, 'La date de fin doit être après la date de début.');
      const chev = (
        await c.query('SELECT id, titre FROM elections WHERE id <> $3 AND date_debut < $2 AND date_fin > $1 LIMIT 1', [debut, fin, id])
      ).rows[0];
      if (chev) throw httpError(409, `Cette période chevauche l’élection « ${chev.titre} ». Une seule élection à la fois.`);
    }
    const champs = clean({
      titre: b.titre,
      description: b.description === undefined ? undefined : b.description,
      poste: b.poste === undefined ? undefined : b.poste,
      date_debut: b.date_debut,
      date_fin: b.date_fin,
    });
    const [sql, params] = updateSql('elections', id, champs);
    const maj = (await c.query(sql, params)).rows[0];
    await audit(c, req, 'election.modifiee', 'elections', id, { election_id: id, champs: Object.keys(champs) });
    return { ...maj, statut: electionStatut(maj) };
  });
});

// ───────────────────────── Plateforme, carte 83, 7 nov. 2026 ─────────────────────────
// Abonnement unique, 100 000 FCFA par an, pour mettre ses
// enseignements sur la plateforme. Publication en deux temps :
// l'auteur envoie pour validation, rien ne s'affiche chez tout
// le monde tant que la structure n'a pas validé. Un enseignement
// déjà publié reste en ligne même après la fin de la période,
// seuls les nouveaux contenus exigent un abonnement actif.
// Les enseignements sont gratuits pour les membres, y compris
// les membres gratuits : aucun prix n'est jamais demandé ici.
app.get('/plateforme/abonnement', { preHandler: membreG }, async (req) => {
  const abo = (await q(
    `SELECT id, statut, date_debut, date_fin, cree_le FROM plateforme_abonnements WHERE membre_id = $1 ORDER BY date_fin DESC NULLS LAST, cree_le DESC LIMIT 1`,
    [req.user.mid],
  )).rows[0];
  if (!abo) return { statut: 'Aucun' };
  return { ...abo, statut: abonnementStatut(abo) };
});

app.post('/plateforme/enseignements', { preHandler: membreG }, async (req, reply) => {
  const erreurs = validerCreationEnseignementPlateforme(req.body);
  if (erreurs.length) throw httpError(400, erreurs[0]);
  const b = clean(z.object({
    titre: z.string().trim().min(1).max(200).transform(texteMajuscules),
    orateur: z.string().trim().max(200).transform(texteMajuscules).optional(),
    description: z.string().trim().max(2000).optional(),
    format: z.enum(['Audio', 'Texte']).default('Audio'),
    lien_audio: z.string().trim().max(1000).optional(),
    texte: z.string().trim().max(10000).optional(),
  }).parse(req.body));
  return tx(async (c) => {
    const membre = (await c.query('SELECT nom_complet, fonction FROM membres WHERE id = $1', [req.user.mid])).rows[0];
    if (!membre || membre.fonction !== 'Plateforme') throw httpError(403, 'La fonction Plateforme est requise pour publier un enseignement.');
    const abo = (await c.query(
      `SELECT statut, date_debut, date_fin FROM plateforme_abonnements WHERE membre_id = $1 ORDER BY date_fin DESC NULLS LAST, cree_le DESC LIMIT 1`,
      [req.user.mid],
    )).rows[0];
    if (!peutPublierPlateforme(abo)) throw httpError(403, 'Abonnement Plateforme requis : renouvelez votre abonnement de 100 000 FCFA par an pour mettre de nouveaux contenus en ligne. Vos enseignements déjà publiés restent en ligne.');
    const [sql, params] = insertSql('plateforme_enseignements', {
      auteur_id: req.user.mid,
      titre: b.titre,
      orateur: b.orateur || membre.nom_complet,
      description: b.description ?? null,
      format: b.format,
      lien_audio: b.format === 'Audio' ? (b.lien_audio ?? null) : null,
      texte: b.format === 'Texte' ? (b.texte ?? null) : null,
      statut: 'En attente de validation',
    });
    const row = (await c.query(sql, params)).rows[0];
    await audit(c, req, 'plateforme.enseignement_envoye', 'plateforme_enseignements', row.id, { titre: row.titre });
    return reply.code(201).send(row);
  });
});

app.get('/plateforme/mes-enseignements', { preHandler: membreG }, async (req) => {
  const statut = req.query?.statut ? String(req.query.statut) : null;
  return (await q(
    `SELECT id, titre, orateur, description, format, lien_audio, texte, statut, motif_refus, vues, cree_le, publie_le
     FROM plateforme_enseignements WHERE auteur_id = $1 AND ($2::text IS NULL OR statut = $2) ORDER BY cree_le DESC LIMIT 200`,
    [req.user.mid, statut],
  )).rows;
});

app.get('/admin/plateforme/abonnements', { preHandler: adminG }, async () => {
  const rows = (await q(
    `SELECT a.id, a.statut, a.date_debut, a.date_fin, a.cree_le, m.nom_complet, m.matricule,
            (SELECT COUNT(*)::int FROM plateforme_enseignements e WHERE e.auteur_id = a.membre_id AND e.statut = 'Publié') AS nb_publies,
            (SELECT COUNT(*)::int FROM plateforme_enseignements e WHERE e.auteur_id = a.membre_id AND e.statut = 'En attente de validation') AS nb_en_attente
     FROM plateforme_abonnements a LEFT JOIN membres m ON m.id = a.membre_id ORDER BY a.cree_le DESC LIMIT 200`,
  )).rows;
  return rows.map((r) => ({ ...r, statut: abonnementStatut(r) }));
});

app.get('/admin/plateforme/enseignements', { preHandler: adminG }, async (req) => {
  const statut = req.query?.statut ? String(req.query.statut) : null;
  return (await q(
    `SELECT e.*, m.nom_complet AS auteur_nom, m.matricule FROM plateforme_enseignements e
     LEFT JOIN membres m ON m.id = e.auteur_id
     WHERE ($1::text IS NULL OR e.statut = $1) ORDER BY e.cree_le DESC LIMIT 200`,
    [statut],
  )).rows;
});

app.post('/admin/plateforme/enseignements/:id/valider', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  return tx(async (c) => {
    const e = (await c.query('SELECT * FROM plateforme_enseignements WHERE id = $1 FOR UPDATE', [id])).rows[0];
    if (!e) throw httpError(404, 'Enseignement introuvable.');
    if (e.statut === 'Publié') throw httpError(409, 'Enseignement déjà publié.');
    const maj = (await c.query(
      `UPDATE plateforme_enseignements SET statut = 'Publié', publie_le = now() WHERE id = $1 RETURNING *`,
      [id],
    )).rows[0];
    // L'enseignement rejoint le catalogue public, gratuit pour
    // tous les membres, comme un enseignement de la structure.
    const [sql, params] = insertSql('enseignements', {
      titre: maj.titre,
      orateur: maj.orateur,
      description: maj.description,
      thematique: 'Plateforme',
      format: maj.format,
      lien_audio: maj.format === 'Audio' ? maj.lien_audio : null,
      texte: maj.format === 'Texte' ? maj.texte : null,
      publie: true,
    });
    const publie = (await c.query(sql, params)).rows[0];
    await audit(c, req, 'plateforme.enseignement_valide', 'plateforme_enseignements', id, { titre: maj.titre });
    await notifierTous('nouvel_enseignement', '{prenom}, un enseignement pour vous', `« ${maj.titre} », par ${maj.orateur}. Retrouvez-le dans les enseignements.`, 'enseignement', publie.id, 'Un enseignement pour vous');
    return reply.code(200).send(maj);
  });
});

app.post('/admin/plateforme/enseignements/:id/refuser', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ motif: z.string().trim().min(1).max(500) }).parse(req.body);
  return tx(async (c) => {
    const maj = (await c.query(
      `UPDATE plateforme_enseignements SET statut = 'Refusé', motif_refus = $2 WHERE id = $1 AND statut <> 'Publié' RETURNING *`,
      [id, b.motif],
    )).rows[0];
    if (!maj) throw httpError(404, 'Enseignement introuvable ou déjà publié.');
    await audit(c, req, 'plateforme.enseignement_refuse', 'plateforme_enseignements', id, { titre: maj.titre });
    return maj;
  });
});

// ───────────────────────── Fiches santé de camp, phase 3, 31 oct. 2026 ─────────────────────────
// Une seule fiche par membre et par camp, allégée, chiffrée au repos
// (AES-256-GCM), remplie par le membre tant que le camp n'est pas
// terminé, figée ensuite, supprimée automatiquement 3 mois après la
// fin du camp. Chaque lecture par un administrateur est journalisée,
// sans jamais enregistrer le contenu médical dans le journal. Aucun
// paiement n'est touché par ce chantier. Ce chiffrement protège la
// base et les sauvegardes, pas un administrateur autorisé qui lit
// la fiche : ce n'est pas du chiffrement de bout en bout.
const FICHE_CHAMPS = ['allergies', 'traitement', 'probleme', 'contact_urgence', 'remarque'];
const ficheSchema = z.object(
  Object.fromEntries(FICHE_CHAMPS.map((k) => [k, z.string().trim().max(500).optional()])),
);

// Clé lue uniquement dans l'environnement du serveur, jamais en
// clair dans le code ni dans le dépôt. Format attendu : 32 octets
// encodés en base64. Absente ou invalide, les routes de fiche
// refusent proprement, jamais de repli en clair.
function cleFichesSante() {
  const brut = (process.env.FICHES_SANTE_KEY ?? '').trim();
  if (!brut) return null;
  try {
    const cle = Buffer.from(brut, 'base64');
    return cle.length === 32 ? cle : null;
  } catch {
    return null;
  }
}
function exigerCleFichesSante() {
  const cle = cleFichesSante();
  if (!cle) throw httpError(503, 'La fonction fiches santé attend sa clé côté serveur.');
  return cle;
}
// Un seul contenu chiffré par fiche : vecteur d'initialisation de
// 12 octets, texte chiffré, étiquette d'authentification de 16
// octets, concaténés puis encodés en base64. Les identifiants du
// membre et du camp servent de données associées, pour qu'un
// contenu ne puisse pas être déplacé d'une fiche à une autre.
function chiffrerFiche(cle, membreId, evenementId, champs) {
  const iv = crypto.randomBytes(12);
  const chiffreur = crypto.createCipheriv('aes-256-gcm', cle, iv);
  chiffreur.setAAD(Buffer.from(`${membreId}:${evenementId}`, 'utf8'));
  const chiffre = Buffer.concat([chiffreur.update(JSON.stringify(champs), 'utf8'), chiffreur.final()]);
  return Buffer.concat([iv, chiffre, chiffreur.getAuthTag()]).toString('base64');
}
function dechiffrerFiche(cle, membreId, evenementId, donnees) {
  const buf = Buffer.from(donnees, 'base64');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(buf.length - 16);
  const chiffre = buf.subarray(12, buf.length - 16);
  const dechiffreur = crypto.createDecipheriv('aes-256-gcm', cle, iv);
  dechiffreur.setAAD(Buffer.from(`${membreId}:${evenementId}`, 'utf8'));
  dechiffreur.setAuthTag(tag);
  return JSON.parse(Buffer.concat([dechiffreur.update(chiffre), dechiffreur.final()]).toString('utf8'));
}
// Suppression automatique : 3 mois après la fin du camp. Sans date
// de fin lisible, aucune suppression automatique, jamais de date
// inventée. Balayage au démarrage et à chaque accès aux fiches.
// Les fiches de présence sur place suivent la même règle, car
// elles sont rattachées au camp comme les fiches membres.
async function purgerFichesExpirees() {
  await q(
    `DELETE FROM fiches_sante f USING evenements e WHERE f.evenement_id = e.id AND e.date_fin IS NOT NULL AND e.date_fin < CURRENT_DATE - INTERVAL '3 months'`,
  );
  await q(
    `DELETE FROM fiches_presence f USING evenements e WHERE f.evenement_id = e.id AND e.date_fin IS NOT NULL AND e.date_fin < CURRENT_DATE - INTERVAL '3 months'`,
  );
}
async function campFiche(id) {
  return (await q('SELECT id, nom, date_fin FROM evenements WHERE id = $1', [id])).rows[0] ?? null;
}
const isoJour = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v).slice(0, 10));
const ficheFigee = (camp) => camp.date_fin != null && isoJour(camp.date_fin) < new Date().toISOString().slice(0, 10);
async function membreInscrit(membreId, evenementId) {
  return (await q('SELECT 1 FROM inscriptions WHERE membre_id = $1 AND evenement_id = $2', [membreId, evenementId])).rows[0] != null;
}
// Périmètre administrateur, même règle que les présences pour un
// camp : l'administrateur général voit tout, l'administrateur
// d'établissement voit les membres de son établissement et les
// membres sans établissement.
async function membreFichePerimetre(req, evenementId, membreId) {
  const camp = await campFiche(evenementId);
  if (!camp) throw httpError(404, 'Camp introuvable.');
  const membre = (await q('SELECT id, nom_complet, etablissement_id FROM membres WHERE id = $1', [membreId])).rows[0];
  if (!membre) throw httpError(404, 'Membre introuvable.');
  if (
    req.user.role === 'admin_etablissement' &&
    membre.etablissement_id !== req.user.eid &&
    membre.etablissement_id !== null
  ) {
    throw httpError(403, 'Accès refusé à cet établissement.');
  }
  return { camp, membre };
}

app.get('/moi/fiches-sante/:evenementId', { preHandler: membreG }, async (req) => {
  await purgerFichesExpirees();
  const camp = await campFiche(req.params.evenementId);
  if (!camp) throw httpError(404, 'Camp introuvable.');
  if (!(await membreInscrit(req.user.mid, camp.id))) throw httpError(404, 'Fiche introuvable.');
  const fiche = (await q('SELECT * FROM fiches_sante WHERE membre_id = $1 AND evenement_id = $2', [req.user.mid, camp.id])).rows[0];
  if (!fiche) return { existe: false, fige: ficheFigee(camp), camp_nom: camp.nom };
  const champs = dechiffrerFiche(exigerCleFichesSante(), req.user.mid, camp.id, fiche.donnees_chiffrees);
  return { existe: true, fige: ficheFigee(camp), camp_nom: camp.nom, cree_le: fiche.cree_le, modifie_le: fiche.modifie_le, ...champs };
});

app.post('/moi/fiches-sante/:evenementId', { preHandler: membreG }, async (req) => {
  const cle = exigerCleFichesSante();
  const corps = ficheSchema.parse(req.body ?? {});
  await purgerFichesExpirees();
  const camp = await campFiche(req.params.evenementId);
  if (!camp) throw httpError(404, 'Camp introuvable.');
  if (ficheFigee(camp)) throw httpError(409, 'Le camp est terminé, la fiche est figée.');
  if (!(await membreInscrit(req.user.mid, camp.id))) throw httpError(409, 'Inscription au camp requise.');
  const champs = Object.fromEntries(FICHE_CHAMPS.map((k) => [k, corps[k] ?? '']));
  const donnees = chiffrerFiche(cle, req.user.mid, camp.id, champs);
  await tx(async (c) => {
    await c.query(
      `INSERT INTO fiches_sante (membre_id, evenement_id, donnees_chiffrees) VALUES ($1,$2,$3) ON CONFLICT (membre_id, evenement_id) DO UPDATE SET donnees_chiffrees = EXCLUDED.donnees_chiffrees, modifie_le = now()`,
      [req.user.mid, camp.id, donnees],
    );
    await audit(c, req, 'fiche_sante.enregistree', 'fiches_sante', camp.id, { evenement_id: camp.id });
  });
  return { ok: true };
});

// Suppression immédiate sur demande du membre, à tout moment,
// même après la fin du camp. Seule la trace d'audit de
// l'événement subsiste, sans contenu médical.
app.delete('/moi/fiches-sante/:evenementId', { preHandler: membreG }, async (req) => {
  await purgerFichesExpirees();
  const supprime = await tx(async (c) => {
    const r = await c.query('DELETE FROM fiches_sante WHERE membre_id = $1 AND evenement_id = $2 RETURNING id', [
      req.user.mid,
      req.params.evenementId,
    ]);
    if (r.rows[0]) await audit(c, req, 'fiche_sante.supprimee', 'fiches_sante', req.params.evenementId, { evenement_id: req.params.evenementId });
    return r.rows[0];
  });
  if (!supprime) throw httpError(404, 'Fiche introuvable.');
  return { ok: true };
});

// Liste administrateur : nom du membre et date de remplissage
// seulement, jamais de contenu dans une liste. Les fiches de
// présence sur place du camp s'y ajoutent, car elles sont
// rattachées au camp et non à un établissement : tout
// administrateur contenuG les voit sur la liste du camp.
app.get('/admin/fiches-sante/:evenementId', { preHandler: contenuG }, async (req) => {
  await purgerFichesExpirees();
  const camp = await campFiche(req.params.evenementId);
  if (!camp) throw httpError(404, 'Camp introuvable.');
  // Sécurité, 22 nov. 2026 : même exigence de nomination que
  // le détail, camp.inscriptions obligatoire pour un camp.
  await exigerNomination(req, 'camp.inscriptions', { evenementId: camp.id, obligatoire: true });
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const fiches = (
    await q(
      `SELECT f.membre_id, m.nom_complet, f.cree_le, f.modifie_le FROM fiches_sante f JOIN membres m ON m.id = f.membre_id WHERE f.evenement_id = $1 AND ($2::uuid IS NULL OR m.etablissement_id = $2 OR m.etablissement_id IS NULL) ORDER BY m.nom_complet`,
      [camp.id, perimetre],
    )
  ).rows;
  const presences = (
    await q(
      `SELECT id, nom_complet, contact, cree_le, modifie_le FROM fiches_presence WHERE evenement_id = $1 ORDER BY nom_complet`,
      [camp.id],
    )
  ).rows;
  return { camp_nom: camp.nom, fiches, presences };
});

// Lecture administrateur, journalisée, sans contenu dans le journal.
app.get('/admin/fiches-sante/:evenementId/:membreId', { preHandler: contenuG }, async (req) => {
  const cle = exigerCleFichesSante();
  await purgerFichesExpirees();
  const { camp, membre } = await membreFichePerimetre(req, req.params.evenementId, req.params.membreId);
  // Sécurité, 22 nov. 2026 : le détail exigeait la nomination
  // en principe, le code ne l'appliquait pas. Même exigence
  // que la liste, camp.inscriptions obligatoire pour un camp.
  await exigerNomination(req, 'camp.inscriptions', { evenementId: camp.id, obligatoire: true });
  const fiche = (await q('SELECT * FROM fiches_sante WHERE membre_id = $1 AND evenement_id = $2', [membre.id, camp.id])).rows[0];
  if (!fiche) throw httpError(404, 'Fiche introuvable.');
  const champs = dechiffrerFiche(cle, membre.id, camp.id, fiche.donnees_chiffrees);
  await audit(pool, req, 'fiche_sante.consultee', 'fiches_sante', camp.id, { evenement_id: camp.id, membre_id: membre.id });
  return { camp_nom: camp.nom, nom_complet: membre.nom_complet, cree_le: fiche.cree_le, modifie_le: fiche.modifie_le, ...champs };
});

app.delete('/admin/fiches-sante/:evenementId/:membreId', { preHandler: contenuG }, async (req) => {
  await purgerFichesExpirees();
  const { camp, membre } = await membreFichePerimetre(req, req.params.evenementId, req.params.membreId);
  await exigerNomination(req, 'camp.inscriptions', { evenementId: camp.id, obligatoire: true });
  const supprime = await tx(async (c) => {
    const r = await c.query('DELETE FROM fiches_sante WHERE membre_id = $1 AND evenement_id = $2 RETURNING id', [membre.id, camp.id]);
    if (r.rows[0]) await audit(c, req, 'fiche_sante.supprimee_admin', 'fiches_sante', camp.id, { evenement_id: camp.id, membre_id: membre.id });
    return r.rows[0];
  });
  if (!supprime) throw httpError(404, 'Fiche introuvable.');
  return { ok: true };
});

// ───────────────────────── Fiches de présence sur place, 31 oct. 2026 ─────────────────────────
// Pour les personnes sans compte membre, remplies par la structure
// sur place, depuis la liste des fiches santé d'un camp. Même
// chiffrement AES-256-GCM et même clé que les fiches membres,
// jamais de repli en clair. Données associées : l'identifiant de
// la fiche elle-même, généré côté serveur avant le chiffrement,
// et l'identifiant du camp. Un contenu ne peut donc être déplacé
// ni vers une autre fiche ni vers un autre camp. Aucun compte
// membre, aucune inscription, aucun pass ni badge n'est créé.
// Les fiches sont rattachées au camp seulement, visibles par tout
// administrateur contenuG sur la liste du camp, et supprimées
// automatiquement 3 mois après la fin du camp, comme les fiches
// membres. Aucune présence n'est créée dans la table presences.
const presenceSchema = z.object({
  nom_complet: z.string().trim().min(1).max(200).transform(texteMajuscules),
  contact: z.string().trim().max(200).optional(),
  ...Object.fromEntries(FICHE_CHAMPS.map((k) => [k, z.string().trim().max(500).optional()])),
});
function chiffrerFichePresence(cle, ficheId, evenementId, champs) {
  const iv = crypto.randomBytes(12);
  const chiffreur = crypto.createCipheriv('aes-256-gcm', cle, iv);
  chiffreur.setAAD(Buffer.from(`presence:${ficheId}:${evenementId}`, 'utf8'));
  const chiffre = Buffer.concat([chiffreur.update(JSON.stringify(champs), 'utf8'), chiffreur.final()]);
  return Buffer.concat([iv, chiffre, chiffreur.getAuthTag()]).toString('base64');
}
function dechiffrerFichePresence(cle, ficheId, evenementId, donnees) {
  const buf = Buffer.from(donnees, 'base64');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(buf.length - 16);
  const chiffre = buf.subarray(12, buf.length - 16);
  const dechiffreur = crypto.createDecipheriv('aes-256-gcm', cle, iv);
  dechiffreur.setAAD(Buffer.from(`presence:${ficheId}:${evenementId}`, 'utf8'));
  dechiffreur.setAuthTag(tag);
  return JSON.parse(Buffer.concat([dechiffreur.update(chiffre), dechiffreur.final()]).toString('utf8'));
}

app.post('/admin/fiches-presence/:evenementId', { preHandler: contenuG }, async (req) => {
  const cle = exigerCleFichesSante();
  const corps = presenceSchema.parse(req.body ?? {});
  await purgerFichesExpirees();
  const camp = await campFiche(req.params.evenementId);
  if (!camp) throw httpError(404, 'Camp introuvable.');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: camp.id, obligatoire: true });
  const champs = Object.fromEntries(FICHE_CHAMPS.map((k) => [k, corps[k] ?? '']));
  const id = crypto.randomUUID();
  const donnees = chiffrerFichePresence(cle, id, camp.id, champs);
  await tx(async (c) => {
    await c.query(
      `INSERT INTO fiches_presence (id, evenement_id, nom_complet, contact, donnees_chiffrees) VALUES ($1,$2,$3,$4,$5)`,
      [id, camp.id, corps.nom_complet, corps.contact ?? '', donnees],
    );
    await audit(c, req, 'fiche_presence.creee', 'fiches_presence', camp.id, { evenement_id: camp.id, fiche_presence_id: id });
  });
  return { ok: true, id };
});

// Lecture administrateur d'une fiche de présence, journalisée,
// sans contenu médical dans le journal.
app.get('/admin/fiches-presence/:evenementId/:id', { preHandler: contenuG }, async (req) => {
  const cle = exigerCleFichesSante();
  await purgerFichesExpirees();
  const camp = await campFiche(req.params.evenementId);
  if (!camp) throw httpError(404, 'Camp introuvable.');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: camp.id, obligatoire: true });
  const fiche = (await q('SELECT * FROM fiches_presence WHERE id = $1 AND evenement_id = $2', [req.params.id, camp.id])).rows[0];
  if (!fiche) throw httpError(404, 'Fiche introuvable.');
  const champs = dechiffrerFichePresence(cle, fiche.id, camp.id, fiche.donnees_chiffrees);
  await audit(pool, req, 'fiche_presence.consultee', 'fiches_presence', camp.id, { evenement_id: camp.id, fiche_presence_id: fiche.id });
  return { camp_nom: camp.nom, nom_complet: fiche.nom_complet, contact: fiche.contact, cree_le: fiche.cree_le, modifie_le: fiche.modifie_le, ...champs };
});

app.delete('/admin/fiches-presence/:evenementId/:id', { preHandler: contenuG }, async (req) => {
  await purgerFichesExpirees();
  const camp = await campFiche(req.params.evenementId);
  if (!camp) throw httpError(404, 'Camp introuvable.');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: camp.id, obligatoire: true });
  const supprime = await tx(async (c) => {
    const r = await c.query('DELETE FROM fiches_presence WHERE id = $1 AND evenement_id = $2 RETURNING id', [req.params.id, camp.id]);
    if (r.rows[0]) await audit(c, req, 'fiche_presence.supprimee_admin', 'fiches_presence', camp.id, { evenement_id: camp.id, fiche_presence_id: req.params.id });
    return r.rows[0];
  });
  if (!supprime) throw httpError(404, 'Fiche introuvable.');
  return { ok: true };
});

// ───────────────────────── Espace structure : paiements ─────────────────────────
// Montants en attente présents plus d'une fois : à rapprocher manuellement.
app.get('/admin/paiements/doublons', { preHandler: adminG }, async () =>
  (
    await q(
      `SELECT montant_fcfa, count(*) AS nombre, json_agg(json_build_object('reference', reference, 'nom', m.nom_complet, 'matricule', m.matricule, 'cree_le', p.cree_le) ORDER BY p.cree_le) AS demandes
       FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
       WHERE p.statut = 'en_attente' GROUP BY montant_fcfa HAVING count(*) > 1 ORDER BY montant_fcfa`,
    )
  ).rows);

app.get('/admin/paiements', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  const { statut, matricule, type, etablissement_id, debut, fin } = z.object({
    statut: z.enum(['en_attente', 'confirme', 'refuse', 'annule']).optional(),
    matricule: z.string().max(40).optional(),
    type: z.enum(['don', 'achat', 'carte', 'cotisation', 'camp']).optional(),
    etablissement_id: z.string().uuid().optional(),
    debut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }).parse(req.query);
  // Un administrateur d'établissement qui demanderait un autre
  // établissement est refusé proprement, jamais filtré en silence.
  if (req.user.role === 'admin_etablissement' && etablissement_id && etablissement_id !== req.user.eid) throw httpError(403, 'Accès refusé.');
  // Périmètre serveur : un administrateur d'établissement ne voit que
  // les paiements des membres de son établissement. Un matricule hors
  // périmètre est refusé proprement, jamais filtré en silence.
  if (req.user.role === 'admin_etablissement' && matricule) {
    const m = (await q('SELECT etablissement_id FROM membres WHERE matricule = $1', [matricule])).rows[0];
    if (!m || m.etablissement_id == null || m.etablissement_id !== req.user.eid) throw httpError(403, 'Accès refusé.');
  }
  // Carte 126 tranche 3 : un responsable financier nommé ne voit
  // que les paiements de son activité, jamais ceux des autres camps.
  // Carte 126 tranche 4 : un paiement de camp sans evenement_id
  // se rattache par les inscriptions du membre effectif.
  const porteeNomination = await activitesPourPermission(req, 'finances.lire');
  return (
    await q(
      `SELECT p.id, p.reference, p.type, p.montant_fcfa, p.statut, p.wave_transaction_id, p.moyen, p.cree_le, m.nom_complet, m.matricule,
              p.confirme_le, p.mode_confirmation, p.refuse_le,
              p.evenement_id, p.numero_versement, p.mois_cible, ev.nom AS camp_nom,
              p.beneficiaire_id, p.beneficiaire_nom, p.message_don,
              bm.nom_complet AS beneficiaire_membre_nom, bm.matricule AS beneficiaire_matricule,
              cm.nom_complet AS confirme_par_nom, rm.nom_complet AS refuse_par_nom,
              e.nom AS etablissement_nom
       FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
       LEFT JOIN membres bm ON bm.id = p.beneficiaire_id
       LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN evenements ev ON ev.id = p.evenement_id
       LEFT JOIN membres cm ON cm.utilisateur_id = p.confirme_par
       LEFT JOIN membres rm ON rm.utilisateur_id = p.refuse_par
       WHERE ($1::statut_paiement IS NULL OR p.statut = $1)
         AND ($2::text IS NULL OR m.matricule = $2)
         AND ($3::uuid IS NULL OR m.etablissement_id = $3)
         AND ($4::type_paiement IS NULL OR p.type = $4)
         AND ($5::date IS NULL OR p.cree_le::date >= $5)
         AND ($6::date IS NULL OR p.cree_le::date <= $6)
         AND ($7::uuid[] IS NULL OR p.evenement_id = ANY($7::uuid[]) OR (p.type = 'camp' AND EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = (CASE WHEN p.beneficiaire_contact IS NOT NULL THEN p.beneficiaire_id ELSE p.membre_id END) AND i.evenement_id = ANY($7::uuid[]))))
       ORDER BY p.cree_le DESC LIMIT 200`,
      [statut ?? null, matricule ?? null, req.user.role === 'admin_etablissement' ? req.user.eid : (etablissement_id ?? null), type ?? null, debut ?? null, fin ?? null, porteeNomination],
    )
  ).rows;
});

// Historique des transactions, 30 oct. 2026 : totaux par période,
// mêmes filtres et même périmètre que la liste, sans nouvelle table.
// Route statique, donc prioritaire sur /admin/paiements/:id.
app.get('/admin/paiements/totaux', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  const { type, statut, matricule, etablissement_id, debut, fin } = z.object({
    type: z.enum(['don', 'achat', 'carte', 'cotisation', 'camp']).optional(),
    statut: z.enum(['en_attente', 'confirme', 'refuse', 'annule']).optional(),
    matricule: z.string().max(40).optional(),
    etablissement_id: z.string().uuid().optional(),
    debut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }).parse(req.query);
  if (req.user.role === 'admin_etablissement' && etablissement_id && etablissement_id !== req.user.eid) throw httpError(403, 'Accès refusé.');
  // Carte 126 tranche 3 : mêmes totaux, même périmètre que la
  // liste, un responsable financier nommé ne totalise que son activité.
  // Carte 126 tranche 4 : un paiement de camp sans evenement_id
  // se rattache par les inscriptions du membre effectif.
  const porteeNomination = await activitesPourPermission(req, 'finances.lire');
  const rows = (await q(
    `SELECT COUNT(*) FILTER (WHERE p.statut = 'confirme')::int AS nombre_confirme,
            COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'confirme'), 0)::int AS total_confirme,
            COUNT(*) FILTER (WHERE p.statut = 'en_attente')::int AS nombre_en_attente,
            COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'en_attente'), 0)::int AS total_en_attente,
            COUNT(*) FILTER (WHERE p.statut = 'refuse')::int AS nombre_refuse,
            COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'refuse'), 0)::int AS total_refuse,
            COUNT(*) FILTER (WHERE p.statut = 'annule')::int AS nombre_annule,
            COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'annule'), 0)::int AS total_annule
     FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
     WHERE ($1::type_paiement IS NULL OR p.type = $1)
       AND ($2::statut_paiement IS NULL OR p.statut = $2)
       AND ($3::text IS NULL OR m.matricule = $3)
       AND ($4::uuid IS NULL OR m.etablissement_id = $4)
       AND ($5::date IS NULL OR p.cree_le::date >= $5)
       AND ($6::date IS NULL OR p.cree_le::date <= $6)
       AND ($7::uuid[] IS NULL OR p.evenement_id = ANY($7::uuid[]) OR (p.type = 'camp' AND EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = (CASE WHEN p.beneficiaire_contact IS NOT NULL THEN p.beneficiaire_id ELSE p.membre_id END) AND i.evenement_id = ANY($7::uuid[]))))`,
    [type ?? null, statut ?? null, matricule ?? null, req.user.role === 'admin_etablissement' ? req.user.eid : (etablissement_id ?? null), debut ?? null, fin ?? null, porteeNomination],
  )).rows;
  return rows[0] ?? { nombre_confirme: 0, total_confirme: 0, nombre_en_attente: 0, total_en_attente: 0, nombre_refuse: 0, total_refuse: 0, nombre_annule: 0, total_annule: 0 };
});

// Membres vus recemment : un membre est compte en ligne s'il a signale
// son activite dans les 10 dernieres minutes. Au-dela, il n'apparait plus.
app.get('/admin/en-ligne', { preHandler: adminG }, async () => {
  return (
    await q(
      `SELECT nom_complet, matricule, derniere_activite FROM membres
       WHERE derniere_activite > now() - interval '10 minutes'
       ORDER BY derniere_activite DESC`
    )
  ).rows;
});

// Rapports de bug, 29 oct. 2026 : un membre signale un plantage ou un
// écran qui ne marche pas, depuis l'onglet Plus ou par capture
// automatique d'erreur. Le rapport ne contient jamais de mot de passe,
// de jeton, d'e-mail, de numéro, de donnée de santé, d'information de
// paiement ni de contenu de prière : l'application nettoie le message
// avant l'envoi, et le serveur ne garde que version, appareil,
// système, écran, message technique nettoyé et description tapée.
// Le statut passe de Nouveau à En cours puis Corrigé, avec la version
// qui a apporté le correctif, visible par l'administrateur général.
const rapportBugS = z
  .object({
    version_app: z.string().trim().max(40).optional(),
    modele: z.string().trim().max(200).optional(),
    systeme: z.string().trim().max(200).optional(),
    ecran: z.string().trim().max(200).optional(),
    message_erreur: z.string().trim().max(2000).optional(),
    description: z.string().trim().max(2000).optional(),
  })
  .refine((v) => (v.message_erreur ?? '').length > 0 || (v.description ?? '').length > 0, {
    message: 'Un message d’erreur ou une description est requis.',
  });

app.post('/rapports-bug', { preHandler: membreG }, async (req, reply) => {
  const b = rapportBugS.parse(req.body ?? {});
  const rows = await q(
    `INSERT INTO rapports_bug (membre_id, version_app, modele, systeme, ecran, message_erreur, description, statut)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'Nouveau') RETURNING *`,
    [req.user.mid ?? null, b.version_app ?? '', b.modele ?? '', b.systeme ?? '', b.ecran ?? '', b.message_erreur ?? '', b.description ?? ''],
  );
  return reply.code(201).send(rows.rows[0]);
});

app.get('/admin/rapports-bug', { preHandler: adminG }, async (req) => {
  const { statut } = z.object({ statut: z.enum(['Nouveau', 'En cours', 'Corrigé']).optional() }).parse(req.query);
  return (
    await q(
      `SELECT r.id, r.membre_id, r.version_app, r.modele, r.systeme, r.ecran, r.message_erreur, r.description, r.statut, r.cree_le, r.corrige_version, m.nom_complet, m.matricule
       FROM rapports_bug r LEFT JOIN membres m ON m.id = r.membre_id
       WHERE ($1::text IS NULL OR r.statut = $1)
       ORDER BY r.cree_le DESC LIMIT 200`,
      [statut ?? null],
    )
  ).rows;
});

app.put('/admin/rapports-bug/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ statut: z.enum(['Nouveau', 'En cours', 'Corrigé']), corrige_version: z.string().trim().max(40).optional() }).parse(req.body ?? {});
  const rows = await q(
    `UPDATE rapports_bug SET statut = $2, corrige_version = COALESCE($3, corrige_version) WHERE id = $1 RETURNING *`,
    [id, b.statut, b.corrige_version ?? null],
  );
  if (!rows.rows[0]) throw httpError(404, 'Rapport introuvable.');
  return rows.rows[0];
});

// Lecture réservée à Muse, 29 oct. 2026 : les rapports de bug ne sont
// plus affichés dans l'Espace structure. Cette route en lecture seule
// exige l'en-tête X-Dev-Key, comparé en temps constant à la variable
// d'environnement RAPPORTS_DEV_KEY. Si la variable est absente ou vide,
// la route répond 404, comme si elle n'existait pas. Aucune clé n'est
// écrite en dur : la valeur vient uniquement de l'environnement Render,
// que Axel renseigne lui-même.
app.get('/dev/rapports-bug', async (req) => {
  const key = process.env.RAPPORTS_DEV_KEY ?? '';
  if (!key) throw httpError(404, 'Introuvable.');
  const provided = req.headers['x-dev-key'];
  const a = Buffer.from(typeof provided === 'string' ? provided : '');
  const b = Buffer.from(key);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw httpError(404, 'Introuvable.');
  const { statut } = z.object({ statut: z.enum(['Nouveau', 'En cours', 'Corrigé']).optional() }).parse(req.query);
  return (
    await q(
      `SELECT id, membre_id, version_app, modele, systeme, ecran, message_erreur, description, statut, cree_le, corrige_version
       FROM rapports_bug
       WHERE ($1::text IS NULL OR statut = $1)
       ORDER BY cree_le DESC LIMIT 200`,
      [statut ?? null],
    )
  ).rows;
});

// Détail d'un paiement, avec les lignes d'achat, pour que
// l'administrateur voie quels livres ont été achetés avant de valider.
app.get('/admin/paiements/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const rows = await q(
    `SELECT p.id, p.reference, p.type, p.montant_fcfa, p.statut, p.wave_transaction_id, p.cree_le, m.nom_complet, m.matricule,
            COALESCE((SELECT json_agg(json_build_object('livre_id', l.livre_id, 'titre', l.titre_copie, 'auteur', l.auteur_copie, 'prix_fcfa', l.prix_copie_fcfa))
                      FROM achats_lignes l WHERE l.paiement_id = p.id), '[]') AS lignes
     FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id WHERE p.id = $1`,
    [id],
  );
  if (!rows.rows[0]) throw httpError(404, 'Paiement introuvable.');
  return rows.rows[0];
});

// Validation explicite : la structure a contrôlé son compte Wave.
app.post('/admin/paiements/:id/valider', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  exigerFonctionAdmin(req, 'tresorier', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ wave_transaction_id: z.string().trim().min(6).max(64).optional(), moyen: z.enum(['especes', 'wave', 'orange_money', 'paypal']).optional() }).parse(req.body ?? {});
  const p = await tx(async (c) => {
    // Périmètre serveur, jamais côté application : un administrateur
    // d'établissement ne valide que les paiements de ses membres.
    // Un membre sans établissement n'est validé que par l'admin général.
    const row = (await c.query('SELECT p.type, p.evenement_id, p.membre_id, p.beneficiaire_id, p.beneficiaire_contact, m.etablissement_id FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id WHERE p.id = $1', [id])).rows[0];
    if (!row) throw httpError(409, 'Demande introuvable ou déjà traitée.');
    if (req.user.role === 'admin_etablissement' && (row.etablissement_id == null || row.etablissement_id !== req.user.eid)) throw httpError(403, 'Accès refusé.');
    // Carte 126 tranche 3 : un trésorier d'activité ne valide que
    // les paiements de son activité, un paiement sans activité ne
    // passe que par une nomination de structure. Carte 126
    // tranche 4 : un paiement de camp sans evenement_id se
    // rattache à son activité par les inscriptions du membre
    // effectif, payeur ou bénéficiaire, comme progressionCamp, et
    // la nomination est obligatoire pour un paiement de camp.
    const membreEffectif = row.beneficiaire_contact != null ? row.beneficiaire_id : row.membre_id;
    await exigerNomination(req, 'finances.valider', { evenementId: row.evenement_id, membreId: row.type === 'camp' ? membreEffectif : null, obligatoire: row.type === 'camp' });
    // L'identifiant Wave n'a de sens que pour un règlement Wave ; il
    // n'est jamais conservé sur un règlement par un autre moyen.
    const waveId = b.moyen === 'wave' ? b.wave_transaction_id : (b.moyen == null ? b.wave_transaction_id : null);
    const r = await confirmPayment(c, id, 'validation_structure', req.user.sub, waveId, b.moyen);
    if (!r) throw httpError(409, 'Demande introuvable ou déjà traitée.');
    await audit(c, req, 'paiement.valide', 'paiements', id, { reference: r.reference, montant: r.montant_fcfa, moyen: b.moyen ?? null });
    return r;
  });
  ensureInvoice(p.id).catch((e) => app.log.error(e));
  await notifierPaiementValide(p);
  return { reference: p.reference, statut: p.statut };
});

app.post('/admin/paiements/:id/refuser', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = await tx(async (c) => {
    const row = (await c.query("UPDATE paiements SET statut = 'refuse', refuse_le = now(), refuse_par = $2 WHERE id = $1 AND statut = 'en_attente' RETURNING reference, statut, membre_id, type, montant_fcfa, beneficiaire_id, beneficiaire_nom", [id, req.user.sub])).rows[0];
    if (!row) throw httpError(409, 'Demande introuvable ou déjà traitée.');
    await audit(c, req, 'paiement.refuse', 'paiements', id, { reference: row.reference });
    return row;
  });
  const libelleRefus = (r.beneficiaire_id || r.beneficiaire_nom) ? 'don de camp' : libellePaiement(r.type);
  await notifierMembre(
    r.membre_id,
    'paiement_refuse',
    'Paiement refusé',
    `Bonjour {prenom}, votre ${libelleRefus} de ${fcfaTexte(r.montant_fcfa)} a été refusé par la structure.`,
    'paiement',
    id,
    undefined,
    `Votre ${libelleRefus} de ${fcfaTexte(r.montant_fcfa)} a été refusé par la structure.`,
  );
  return { reference: r.reference, statut: r.statut };
});

// Événements Wave reçus mais non rapprochés (le membre n'a pas encore déclaré sa transaction).
app.get('/admin/wave/non-rapproches', { preHandler: adminG }, async () =>
  (
    await q(
      `SELECT id, charge->'data'->>'id' AS transaction_id, (charge->'data'->>'amount')::int AS montant_fcfa,
              ('****' || RIGHT(charge->'data'->>'sender_mobile', 4)) AS expediteur, charge->'data'->>'when_created' AS date_wave, recu_le
       FROM evenements_wave
       WHERE signature_ok AND NOT traite AND paiement_id IS NULL AND charge->>'type' = 'merchant.payment_received'
       ORDER BY recu_le DESC LIMIT 200`,
    )
  ).rows);

app.post('/admin/wave/:id/rapprocher', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ paiement_id: z.string().uuid() }).parse(req.body);
  const p = await tx(async (c) => {
    const ev = (await c.query('SELECT id, charge FROM evenements_wave WHERE id = $1 AND signature_ok AND NOT traite FOR UPDATE', [id])).rows[0];
    if (!ev) throw httpError(404, 'Événement introuvable ou déjà traité.');
    const pay = (await c.query("SELECT id, montant_fcfa FROM paiements WHERE id = $1 AND statut = 'en_attente' FOR UPDATE", [b.paiement_id])).rows[0];
    if (!pay) throw httpError(404, 'Demande introuvable ou déjà traitée.');
    if (Number(ev.charge.data.amount) !== pay.montant_fcfa) throw httpError(409, 'Les montants ne correspondent pas.');
    const r = await confirmPayment(c, pay.id, 'validation_structure', req.user.sub, ev.charge.data.id);
    await c.query('UPDATE evenements_wave SET traite = true, paiement_id = $1 WHERE id = $2', [pay.id, ev.id]);
    await audit(c, req, 'paiement.rapproche', 'paiements', pay.id, { evenement: ev.id });
    return r;
  });
  ensureInvoice(p.id).catch((e) => app.log.error(e));
  await notifierPaiementValide(p);
  return { reference: p.reference, statut: p.statut };
});

// ───────────────────────── Espace structure : contenus ─────────────────────────
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const txt = z.string().trim().min(1).max(5000);
const opt = (s) => s.nullable().optional();

// Programmation façon Facebook, 30 oct. 2026 : date et heure avec
// décalage, validées comme texte ISO. Le serveur stocke un
// horodatage avec fuseau et compare avec son heure actuelle.
const dateHeure = z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'Date et heure invalides');

// Réunions en ligne, 1er nov. 2026 : heure au format HH:MM ou
// HH:MM:SS, combinée côté application avec date_debut pour
// l'affichage, le badge « en direct » et le rappel local.
const heure = z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/);

// Catégories des livres, T11, 26 nov. 2026 : liste fermée
// validée par Axel le même jour, les livres existants passent en
// « À classer ». La Librairie regroupe ses sections par catégorie.
const CATEGORIES_LIVRE = ['Étude biblique', 'Prière', 'Témoignages', 'Enseignements', 'Jeunesse', 'Vie chrétienne', 'À classer'];

// Catégories des audios de Parole vivante, T13, 26 nov. 2026 :
// liste fermée, même patron que les livres. La première est le
// repli des enseignements existants sans catégorie.
const CATEGORIES_AUDIO = ['Enseignement', 'Podcast', 'Musique'];

const livreS = z.object({
  titre: z.string().trim().min(1).max(200).transform(texteMajuscules),
  auteur: z.string().trim().min(1).max(200).transform(texteMajuscules),
  description: opt(txt),
  prix_fcfa: z.number().int().min(1),
  format: opt(z.string().trim().max(30).transform(texteMajuscules)),
  categorie: opt(z.enum(CATEGORIES_LIVRE)),
  couverture_id: opt(z.string().uuid()),
  fichier_id: opt(z.string().uuid()),
  publie: z.boolean().optional(),
});
const evenementS = z.object({
  // Prochain culte, tranche 1, 19 nov. 2026 : le type 'culte'
  // rejoint 'camp', 'retraite' et 'reunion' (ce dernier masqué
  // côté application depuis le 2 nov. 2026).
  type: z.enum(['camp', 'retraite', 'reunion', 'culte']).optional(),
  nom: z.string().trim().min(1).max(200).transform(texteMajuscules),
  date_debut: opt(date),
  date_fin: opt(date),
  dates_texte: opt(z.string().trim().max(200)),
  description: opt(txt),
  lieu: opt(z.string().trim().max(200).transform(texteMajuscules)),
  // Carte 109, 8 nov. 2026 : pays où se tient l'activité, affiché
  // après le lieu, « Lieu, Pays ». Facultatif, null efface.
  pays: opt(z.string().trim().max(100).transform(texteMajuscules)),
  tarif_fcfa: opt(z.number().int().min(0)),
  image_id: opt(z.string().uuid()),
  est_kairos: z.boolean().optional(), // badge automatique pour le Camp National Kairos
  // Réunion en ligne, 1er nov. 2026 : nom de salle Jitsi
  // (ex. cp-a1b2c3) et heure de début HH:MM.
  salle_visio: opt(z.string().trim().min(3).max(80)),
  heure_debut: opt(heure),
  publie: z.boolean().optional(),
});

// Annonces audio, 29 oct. 2026 : titre requis, texte court
// facultatif, fichier déjà téléversé ou lien audio, jamais les
// deux obligatoires côté serveur (l'application exige l'un ou
// l'autre avant l'envoi). Aucun sujet de prière ici.
const annonceS = z.object({
  titre: z.string().trim().min(1).max(200).transform(texteMajuscules),
  texte: opt(txt),
  audio_id: opt(z.string().uuid()),
  lien_audio: opt(z.string().trim().max(1000)),
  programmee_le: opt(dateHeure),
  etablissement_id: opt(z.string().uuid()),
});

function crud(route, table, schema, label, apresCreation) {
  app.post(`/admin/${route}`, { preHandler: adminG }, async (req, reply) => {
    const body = clean(schema.parse(req.body));
    const [sql, params] = insertSql(table, body);
    const row = await tx(async (c) => {
      const r = (await c.query(sql, params)).rows[0];
      await audit(c, req, `${label}.cree`, table, r.id);
      return r;
    });
    // Notification au mieux, après la création : un échec ici ne
    // remet jamais en cause la publication.
    if (apresCreation) await apresCreation(row);
    return reply.code(201).send(row);
  });
  app.put(`/admin/${route}/:id`, { preHandler: adminG }, async (req) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
    const body = clean(schema.partial().parse(req.body));
    if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
    const [sql, params] = updateSql(table, id, body);
    // Une modification du catalogue ne change ni les achats payés ni leurs factures (copies d'origine).
    const row = await tx(async (c) => {
      const r = (await c.query(sql, params)).rows[0];
      if (!r) throw httpError(404, 'Introuvable.');
      await audit(c, req, `${label}.modifie`, table, id, body);
      return r;
    });
    return row;
  });
}
crud('livres', 'livres', livreS, 'livre');
// Activités, carte 126 tranche 1, 10 nov. 2026 : création et
// modification côté serveur. Avant, seul l'administrateur général
// pouvait publier, via crud() ; désormais un administrateur
// d'établissement peut aussi planifier les activités de son
// établissement, la grande structure restant comme le Canada et les
// établissements comme des provinces. etablissement_id null pour une
// activité de la grande structure, visible partout.
const apresCreationEvenement = async (row) => {
  // Seul un événement publié notifie. Un événement créé non publié
  // reste silencieux.
  if (row.publie === false) return;
  // Réunion en ligne, 1er nov. 2026 : notification dédiée, qui
  // renvoie vers l'espace Réunions plutôt que vers les camps.
  if (row.type === 'reunion') {
    const quand = row.date_debut ? ` le ${row.date_debut}${row.heure_debut ? ` à ${String(row.heure_debut).slice(0, 5)}` : ''}` : '';
    await notifierTous('nouvelle_reunion', `Réunion en ligne : ${row.nom}`, `Bonjour {prenom}, une réunion en ligne est planifiée${quand}. Rejoignez-la depuis l'espace Réunions.`, 'reunion', row.id, undefined, `Une réunion en ligne est planifiée${quand}. Rejoignez-la depuis l'espace Réunions.`);
    return;
  }
  // Prochain culte, tranche 1, 19 nov. 2026 : un culte n'est
  // pas un camp, il ne notifie pas « Nouveau camp ». Silencieux
  // en version 1, la carte sur l'accueil suffit.
  if (row.type === 'culte') return;
  // Carte 109, 8 nov. 2026 : le lieu s'affiche avec son pays,
  // « Lieu, Pays », le lieu seul si l'ancien événement n'a pas
  // de pays, rien si ni lieu ni pays.
  const lieu = lieuPays(row.lieu, row.pays);
  const lieuTexte = lieu ? ` à ${lieu}` : '';
  await notifierTous('nouveau_camp', `Nouveau camp : ${row.nom}`, `Bonjour {prenom}, un nouveau camp est publié${lieuTexte}. Retrouvez-le dans l'onglet Camps.`, 'camp', row.id, undefined, `Un nouveau camp est publié${lieuTexte}. Retrouvez-le dans l'onglet Camps.`);
};

app.post('/admin/evenements', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const b = clean(evenementS.parse(req.body));
  // L'application n'envoie pas etablissement_id : pour un
  // administrateur d'établissement, il est imposé par le jeton,
  // jamais par le corps, sinon il pourrait publier pour un autre
  // établissement. Pour l'administrateur général, null veut dire
  // activité de la grande structure.
  const etablissementId = req.user.role === 'admin_etablissement'
    ? (req.user.eid ?? null)
    : (typeof req.body?.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.body.etablissement_id) ? req.body.etablissement_id : null);
  if (req.user.role === 'admin_etablissement' && !etablissementId) throw httpError(403, 'Votre compte n’est rattaché à aucun établissement.');
  const [sql, params] = insertSql('evenements', { ...b, etablissement_id: etablissementId });
  const row = await tx(async (c) => {
    const r = (await c.query(sql, params)).rows[0];
    await audit(c, req, 'evenement.cree', 'evenements', r.id);
    return r;
  });
  // Notification au mieux, après la création : un échec ici ne
  // remet jamais en cause la publication.
  await apresCreationEvenement(row);
  return reply.code(201).send(row);
});

app.put('/admin/evenements/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const existant = (await q('SELECT id, etablissement_id FROM evenements WHERE id = $1', [id])).rows[0];
  if (!existant) throw httpError(404, 'Introuvable.');
  if (req.user.role === 'admin_etablissement' && existant.etablissement_id !== req.user.eid) throw httpError(403, 'Cette activité n’appartient pas à votre établissement.');
  const body = clean(evenementS.partial().parse(req.body));
  // Seul l'administrateur général peut déplacer une activité vers
  // un autre établissement, ou la rendre générale avec null.
  if (req.user.role === 'admin_general' && req.body != null && 'etablissement_id' in req.body) {
    const v = req.body.etablissement_id;
    if (v !== null && !(typeof v === 'string' && /^[0-9a-f-]{36}$/i.test(v))) throw httpError(400, 'Données invalides.');
    body.etablissement_id = v;
  }
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('evenements', id, body);
  const row = await tx(async (c) => {
    const r = (await c.query(sql, params)).rows[0];
    if (!r) throw httpError(404, 'Introuvable.');
    await audit(c, req, 'evenement.modifie', 'evenements', id, body);
    return r;
  });
  return row;
});

// Annonces audio, 29 oct. 2026 : création et modification par
// l'administrateur général seulement (guard adminG du crud), sans
// notification par cloche en version 1, et sans toucher aux
// enseignements. La suppression est une route dédiée ci-dessous.
crud('annonces-audio', 'annonces_audio', annonceS, 'annonce');

app.post('/admin/etablissements', { preHandler: adminG }, async (req, reply) => {
  const b = clean(z.object({ nom: z.string().trim().min(1).max(120).transform(texteMajuscules), description: opt(txt), image_id: opt(z.string().uuid()) }).parse(req.body));
  const [sql, params] = insertSql('etablissements', b);
  return reply.code(201).send((await q(sql, params)).rows[0]);
});

// Renommage d'un etablissement, 1er nov. 2026 : administrateur
// general seulement, comme la creation. Le nom est la cle affichee
// partout, il n'existait jusqu'ici aucune route de modification.
app.put('/admin/etablissements/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({ nom: z.string().trim().min(1).max(120).transform(texteMajuscules), description: opt(txt), image_id: opt(z.string().uuid()) }).partial().parse(req.body));
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('etablissements', id, body);
  const row = (await q(sql, params)).rows[0];
  if (!row) throw httpError(404, 'Introuvable.');
  return row;
});

const peutGerer = (req, etabId) => req.user.role === 'admin_general' || req.user.eid === etabId;

app.post('/admin/etablissements/:id/activites', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  if (!peutGerer(req, id)) throw httpError(403, 'Accès refusé à cet établissement.');
  const b = clean(z.object({ titre: z.string().trim().min(1).max(200).transform(texteMajuscules), description: opt(txt), image_id: opt(z.string().uuid()) }).parse(req.body));
  const [sql, params] = insertSql('activites_etablissement', { ...b, etablissement_id: id });
  return reply.code(201).send((await q(sql, params)).rows[0]);
});

app.post('/admin/actualites', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const b = clean(
    z.object({ etablissement_id: opt(z.string().uuid()), titre: z.string().trim().min(1).max(200).transform(texteMajuscules), texte: txt, image_id: opt(z.string().uuid()), programmee_le: opt(dateHeure) }).parse(req.body),
  );
  if (req.user.role === 'admin_etablissement' && (!b.etablissement_id || !peutGerer(req, b.etablissement_id))) {
    throw httpError(403, 'Vous ne pouvez publier que pour votre établissement.');
  }
  const [sql, params] = insertSql('actualites', { ...b, auteur_id: req.user.sub });
  const row = (await q(sql, params)).rows[0];
  // Programmation, 30 oct. 2026 : une actualité programmée ne
  // sonne pas à sa création, mais à sa publication, par la tâche
  // de fond horaire notifierActualitesProgrammeesDues, carte 160.
  // Immédiate ou passée, elle sonne comme avant.
  if (!b.programmee_le || new Date(b.programmee_le) <= new Date()) {
    await notifierTous('nouvelle_actualite', 'Nouvelle actualité', `Bonjour {prenom}, ${row.titre}`, 'actualite', row.id, undefined, row.titre);
  }
  return reply.code(201).send(row);
});

app.delete('/admin/enseignements/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = await q('DELETE FROM enseignements WHERE id = $1', [id]);
  if (r.rowCount === 0) throw httpError(404, 'Enseignement introuvable.');
  return { ok: true };
});

app.put('/admin/enseignements/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({ titre: opt(z.string().trim().min(1).max(200).transform(texteMajuscules)), orateur: opt(z.string().trim().max(200).transform(texteMajuscules)), description: opt(txt), thematique: opt(z.string().trim().max(200).transform(texteMajuscules)), format: opt(z.string().trim().max(200)), categorie: opt(z.enum(CATEGORIES_AUDIO)), duree: opt(z.string().trim().max(100)), date_texte: opt(z.string().trim().max(100)), audio_id: opt(z.string().uuid()), lien_audio: opt(z.string().trim().max(1000)) }).partial().parse(req.body));
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('enseignements', id, body);
  const row = (await q(sql, params)).rows[0];
  if (!row) throw httpError(404, 'Introuvable.');
  return row;
});

app.delete('/admin/actualites/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = await q('DELETE FROM actualites WHERE id = $1', [id]);
  if (r.rowCount === 0) throw httpError(404, 'Actualité introuvable.');
  return { ok: true };
});

// Retrait d'une annonce audio, 29 oct. 2026 : l'annonce passe
// inactive et disparaît pour tous les membres, sans effacer la
// ligne ni aucune autre donnée. Administrateur général seulement.
app.delete('/admin/annonces-audio/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const row = await tx(async (c) => {
    const r = (await c.query('UPDATE annonces_audio SET actif = false WHERE id = $1 AND actif RETURNING id', [id])).rows[0];
    if (!r) throw httpError(404, 'Annonce introuvable.');
    await audit(c, req, 'annonce.retiree', 'annonces_audio', id);
    return r;
  });
  return { ok: true };
});

// Modification d'une actualite, reservee a l'administrateur general,
// comme sa suppression. Meme schema partiel que la creation.
app.put('/admin/actualites/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({ titre: opt(z.string().trim().min(1).max(200).transform(texteMajuscules)), texte: opt(txt), image_id: opt(z.string().uuid()), programmee_le: opt(dateHeure) }).partial().parse(req.body));
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('actualites', id, body);
  const row = (await q(sql, params)).rows[0];
  if (!row) throw httpError(404, 'Introuvable.');
  return row;
});

// Listes administrateur, 30 oct. 2026 : contrairement aux lectures
// membres, elles montrent aussi les éléments programmés, avec
// leur date prévue, pour que la structure les voie et les modifie
// avant publication.
app.get('/admin/annonces-audio', { preHandler: adminG }, async () =>
  (await q('SELECT id, titre, texte, audio_id, lien_audio, publiee_le, programmee_le, actif, etablissement_id FROM annonces_audio ORDER BY publiee_le DESC, id DESC')).rows);

app.get('/admin/actualites', { preHandler: contenuG }, async (req) => {
  const general = req.user.role === 'admin_general';
  return (await q(
    `SELECT id, etablissement_id, titre, texte, image_id, publiee_le, programmee_le FROM actualites
     WHERE ($1 OR etablissement_id = $2 OR etablissement_id IS NULL) ORDER BY publiee_le DESC LIMIT 200`,
    [general, req.user.eid ?? null],
  )).rows;
});

app.post('/admin/enseignements', { preHandler: adminG }, async (req, reply) => {
  const b = clean(
    z.object({ titre: z.string().trim().min(1).max(200).transform(texteMajuscules), orateur: opt(z.string().trim().max(200).transform(texteMajuscules)), description: opt(txt), thematique: opt(z.string().trim().max(200).transform(texteMajuscules)), format: opt(z.string().trim().max(200)), categorie: opt(z.enum(CATEGORIES_AUDIO)), duree: opt(z.string().trim().max(100)), date_texte: opt(z.string().trim().max(100)), audio_id: opt(z.string().uuid()), lien_audio: opt(z.string().trim().max(1000)) }).parse(req.body),
  );
  const [sql, params] = insertSql('enseignements', b);
  const row = (await q(sql, params)).rows[0];
  if (row.publie !== false) {
    const parOrateur = row.orateur ? `, par ${row.orateur}` : '';
    await notifierTous('nouvel_enseignement', '{prenom}, un enseignement pour vous', `« ${row.titre} »${parOrateur}. Retrouvez-le dans les enseignements.`, 'enseignement', row.id, 'Un enseignement pour vous');
  }
  return reply.code(201).send(row);
});

// Sélections audio de Parole vivante, T13, 26 nov. 2026 :
// titre requis, liste d'audios par identifiants, dans l'ordre,
// 50 au plus. La sélection ne copie jamais les audios, elle
// ne fait que les ranger. Création et modification par
// l'administrateur général seulement, comme les livres.
const selectionS = z.object({
  titre: z.string().trim().min(1).max(200).transform(texteMajuscules),
  description: opt(txt),
  audio_ids: opt(z.array(z.string().uuid()).max(50)),
  ordre: opt(z.number().int().min(0).max(1000)),
});
crud('selections-audio', 'selections_audio', selectionS, 'selection');

app.delete('/admin/selections-audio/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = await q('DELETE FROM selections_audio WHERE id = $1', [id]);
  if (r.rowCount === 0) throw httpError(404, 'Sélection introuvable.');
  return { ok: true };
});

app.get('/cartes-video', { preHandler: membreG }, async (req) => {
  // Correction de suivi, 27 nov. 2026 : même visibilité que les
  // annonces audio, par établissement, et la programmation est
  // respectée côté membres, comme pour les annonces audio.
  if (req.user.role === 'admin_general') {
    return (await q('SELECT id, titre, explication, lien_video, publiee_le, etablissement_id, programmee_le FROM cartes_video WHERE actif AND (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC, id DESC')).rows;
  }
  const m = req.user.mid ? (await q('SELECT etablissement_id FROM membres WHERE id = $1', [req.user.mid])).rows[0] : null;
  const eid = m?.etablissement_id ?? null;
  return (await q('SELECT id, titre, explication, lien_video, publiee_le, etablissement_id, programmee_le FROM cartes_video WHERE actif AND (programmee_le IS NULL OR programmee_le <= now()) AND (etablissement_id IS NULL OR etablissement_id = $1) ORDER BY publiee_le DESC, id DESC', [eid])).rows;
});

app.get('/admin/cartes-video', { preHandler: adminG }, async () =>
  (await q('SELECT id, titre, explication, lien_video, publiee_le, actif, etablissement_id, programmee_le FROM cartes_video ORDER BY publiee_le DESC, id DESC')).rows);

app.post('/admin/cartes-video', { preHandler: adminG }, async (req, reply) => {
  const b = clean(
    z.object({ titre: z.string().trim().min(1).max(200).transform(texteMajuscules), explication: opt(txt), lien_video: z.string().trim().min(1).max(1000), etablissement_id: opt(z.string().uuid()), programmee_le: opt(dateHeure) }).parse(req.body),
  );
  const [sql, params] = insertSql('cartes_video', b);
  const row = (await q(sql, params)).rows[0];
  return reply.code(201).send(row);
});

app.put('/admin/cartes-video/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({ titre: opt(z.string().trim().min(1).max(200).transform(texteMajuscules)), explication: opt(txt), lien_video: opt(z.string().trim().min(1).max(1000)), etablissement_id: opt(z.string().uuid()), programmee_le: opt(dateHeure) }).partial().parse(req.body));
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('cartes_video', id, body);
  const row = (await q(sql, params)).rows[0];
  if (!row) throw httpError(404, 'Introuvable.');
  return row;
});

// Retrait d'une carte vidéo : la carte passe inactive et
// disparaît pour tous les membres, sans effacer la ligne.
// Administrateur général seulement.
app.delete('/admin/cartes-video/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const row = await tx(async (c) => {
    const r = (await c.query('UPDATE cartes_video SET actif = false WHERE id = $1 AND actif RETURNING id', [id])).rows[0];
    if (!r) throw httpError(404, 'Carte introuvable.');
    await audit(c, req, 'carte_video.retiree', 'cartes_video', id);
    return r;
  });
  return { ok: true };
});

app.post('/admin/bureau', { preHandler: adminG }, async (req, reply) => {
  const b = clean(
    z
      .object({
        nom: z.string().trim().min(1).max(200).transform(texteMajuscules),
        fonction: z.string().trim().min(1).max(200).transform(texteMajuscules),
        contact: opt(z.string().trim().max(200)),
        contact_public: z.boolean().optional(), // seulement avec l'accord de la personne
        ordre: z.number().int().optional(),
        etablissement_id: z.string().uuid().optional().nullable(),
      })
      .parse(req.body),
  );
  if (b.etablissement_id) {
    const e = (await q('SELECT id FROM etablissements WHERE id = $1', [b.etablissement_id])).rows[0];
    if (!e) throw httpError(400, 'Établissement inconnu.');
  }
  const [sql, params] = insertSql('bureau_membres', b);
  return reply.code(201).send((await q(sql, params)).rows[0]);
});

// Liste complète du Bureau, réservée à l'administrateur général :
// l'édition a besoin de l'id et du contact réel, même non public.
// La route publique GET /bureau, elle, ne renvoie ni id ni
// contact non public, et reste inchangée. Nominations et bureaux,
// 21 nov. 2026 : la nomination active de la personne liée, s'il
// y en a une, est renvoyée pour le marqueur discret de la page
// Le Bureau, portée et établissement ou activité, sans les
// permissions. La plus précise d'abord : établissement, puis
// activité, puis structure.
app.get('/admin/bureau', { preHandler: adminG }, async () =>
  (await q(`SELECT b.id, b.nom, b.fonction, b.contact, b.contact_public, b.ordre, b.membre_id, b.etablissement_id, e.nom AS etablissement,
    (SELECT jsonb_build_object('portee', n.portee, 'etablissement', et.nom, 'activite', ev.nom)
     FROM nominations n LEFT JOIN etablissements et ON et.id = n.etablissement_id LEFT JOIN evenements ev ON ev.id = n.evenement_id
     WHERE n.membre_id = b.membre_id AND NOT n.revoque AND n.debute_le <= now() AND (n.finit_le IS NULL OR n.finit_le > now())
     ORDER BY CASE n.portee WHEN 'etablissement' THEN 0 WHEN 'activite' THEN 1 ELSE 2 END, n.debute_le LIMIT 1) AS nomination
    FROM bureau_membres b LEFT JOIN etablissements e ON e.id = b.etablissement_id ORDER BY b.ordre, b.nom`)).rows,
);

// Correction d'un membre du Bureau, 3 nov. 2026 : sans cette route,
// une erreur de nom ou de fonction ne pouvait pas être corrigée,
// l'import ignorant les doublons par nom et fonction. Réservée à
// l'administrateur général, validation identique à la création,
// journal d'audit sans contact, 404 si l'id n'existe pas.
app.patch('/admin/bureau/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = clean(
    z
      .object({
        nom: z.string().trim().min(1).max(200).transform(texteMajuscules),
        fonction: z.string().trim().min(1).max(200).transform(texteMajuscules),
        contact: opt(z.string().trim().max(200)),
        contact_public: z.boolean().optional(),
        ordre: z.number().int().optional(),
        etablissement_id: z.string().uuid().optional().nullable(),
      })
      .parse(req.body),
  );
  if (b.etablissement_id) {
    const e = (await q('SELECT id FROM etablissements WHERE id = $1', [b.etablissement_id])).rows[0];
    if (!e) throw httpError(400, 'Établissement inconnu.');
  }
  const ancien = (await q('SELECT id FROM bureau_membres WHERE id = $1', [id])).rows[0];
  if (!ancien) throw httpError(404, 'Membre du Bureau introuvable.');
  const [sql, params] = updateSql('bureau_membres', id, b);
  const row = (await q(sql, params)).rows[0];
  await audit(pool, req, 'bureau.modifie', 'bureau_membres', id, { nom: b.nom, fonction: b.fonction });
  return reply.send(row);
});

// Retrait d'un membre du Bureau, réservé à l'administrateur
// général, journalisé. Ne supprime jamais le compte membre lié,
// ni ses paiements ni son audit : seule la ligne du Bureau part,
// le membre_id lié reste un membre à part entière.
app.delete('/admin/bureau/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ancien = (await q('SELECT id FROM bureau_membres WHERE id = $1', [id])).rows[0];
  if (!ancien) throw httpError(404, 'Membre du Bureau introuvable.');
  await q('DELETE FROM bureau_membres WHERE id = $1', [id]);
  await audit(pool, req, 'bureau.supprime', 'bureau_membres', id, {});
  return { ok: true };
});

// Déplacement d'un bureau entier, nominations et bureaux,
// 21 nov. 2026 : l'administrateur général déplace toutes les
// entrées du Bureau d'un établissement vers un autre, ou vers
// la Structure quand la destination est nulle, ou depuis la
// Structure quand la source est nulle. Seules les lignes du
// Bureau bougent, les comptes membres ne suivent pas, décision
// d'Axel. Une seule transaction, une entrée d'audit par ligne
// déplacée. 400 si source et destination identiques, 404 si un
// établissement n'existe pas. Une source vide déplace zéro ligne,
// sans erreur.
app.post('/admin/bureau/deplacer', { preHandler: adminG }, async (req) => {
  const body = z.object({
    source_etablissement_id: z.string().uuid().nullable(),
    destination_etablissement_id: z.string().uuid().nullable(),
  }).parse(req.body ?? {});
  if (body.source_etablissement_id === body.destination_etablissement_id) throw httpError(400, 'La source et la destination sont identiques.');
  if (body.source_etablissement_id) {
    const source = (await q('SELECT id FROM etablissements WHERE id = $1', [body.source_etablissement_id])).rows[0];
    if (!source) throw httpError(404, 'Établissement source introuvable.');
  }
  if (body.destination_etablissement_id) {
    const destination = (await q('SELECT id FROM etablissements WHERE id = $1', [body.destination_etablissement_id])).rows[0];
    if (!destination) throw httpError(404, 'Établissement de destination introuvable.');
  }
  const lignes = (await q(
    body.source_etablissement_id
      ? 'SELECT id, nom FROM bureau_membres WHERE etablissement_id = $1 ORDER BY ordre, nom'
      : 'SELECT id, nom FROM bureau_membres WHERE etablissement_id IS NULL ORDER BY ordre, nom',
    body.source_etablissement_id ? [body.source_etablissement_id] : [],
  )).rows;
  const deplaces = await tx(async (c) => {
    const faits = [];
    for (const l of lignes) {
      await c.query('UPDATE bureau_membres SET etablissement_id = $2 WHERE id = $1', [l.id, body.destination_etablissement_id]);
      await audit(c, req, 'bureau.deplace', 'bureau_membres', l.id, { nom: l.nom, source_etablissement_id: body.source_etablissement_id, destination_etablissement_id: body.destination_etablissement_id });
      faits.push(l.id);
    }
    return faits;
  });
  return { ok: true, deplaces: deplaces.length, ids: deplaces };
});

// Import autonome des membres du Bureau, 3 nov. 2026 : la
// structure dépose un Word .docx ou un PDF texte, voit
// l'aperçu, puis valide. Analyse sans création, puis création
// seulement après validation explicite. Réservé à
// l'administrateur général, comme la route /admin/bureau.
// Aucun compte membre, aucune carte, aucun paiement, aucune
// cotisation n'est créé. Le contact n'est jamais public par
// défaut, et le journal d'audit ne contient que des compteurs,
// jamais un contact.
app.post('/admin/bureau/analyser', { preHandler: adminG }, async (req) => {
  const part = await req.file();
  if (!part) throw httpError(400, 'Aucun fichier reçu.');
  // B-24, 22 nov. 2026 : lecture en flux avec plafond, un import
  // du Bureau est un Word ou un PDF de quelques pages, jamais un
  // gros fichier. Le flux est coupé dès le dépassement, au lieu
  // de charger jusqu'à 100 Mo en mémoire comme le faisait toBuffer.
  const max = 10 * 1024 * 1024;
  const morceaux = [];
  let taille = 0;
  for await (const morceau of part.file) {
    taille += morceau.length;
    if (taille > max) throw httpError(413, 'Fichier trop volumineux.');
    morceaux.push(morceau);
  }
  const octets = Buffer.concat(morceaux);
  if (octets.length === 0) throw httpError(400, 'Fichier vide.');
  const analyse = analyserBureauImport(octets, (part.filename || '').slice(0, 200));
  return analyse;
});

app.post('/admin/bureau/import', { preHandler: adminG }, async (req) => {
  const corps = z
    .object({
      lignes: z
        .array(
          z.object({
            nom: z.string(),
            fonction_brute: z.string().optional(),
            fonction: z.string().optional(),
            contact: z.string().optional(),
          }),
        )
        .min(1)
        .max(500),
      etablissement_id: z.string().uuid().optional().nullable(),
    })
    .parse(req.body);
  const etablissementImport = corps.etablissement_id ?? null;
  if (etablissementImport) {
    const e = (await q('SELECT id FROM etablissements WHERE id = $1', [etablissementImport])).rows[0];
    if (!e) throw httpError(400, 'Établissement inconnu.');
  }
  const resultats = [];
  let importes = 0;
  let ignores = 0;
  let rejetes = 0;
  const vus = new Set();
  const ordreDepart = (await q('SELECT COALESCE(MAX(ordre), -1) AS m FROM bureau_membres')).rows[0].m;
  let prochainOrdre = ordreDepart + 1;
  for (let i = 0; i < corps.lignes.length; i++) {
    const l = corps.lignes[i];
    const base = { ligne: i + 1, nom: nomCompletMajuscules(l.nom ?? '') };
    const rejeter = (motif) => {
      rejetes++;
      resultats.push({ ...base, statut: 'rejete', motif });
    };
    const nom = nomCompletMajuscules(l.nom ?? '');
    // La correspondance est refaite côté serveur, jamais
    // seulement sur la fonction envoyée par le client.
    const fonction = nomCompletMajuscules(l.fonction_brute
      ? mapperFonctionBureau(l.fonction_brute).fonction
      : (l.fonction ?? '').trim());
    const contact = (l.contact ?? '').trim() || null;
    if (nom.length < 1 || nom.length > 200) {
      rejeter('Nom manquant ou trop long.');
      continue;
    }
    if (fonction.length < 1 || fonction.length > 200) {
      rejeter('Fonction manquante ou trop longue.');
      continue;
    }
    if (contact && contact.length > 200) {
      rejeter('Contact trop long.');
      continue;
    }
    const cle = `${nom.toLowerCase()}|${fonction.toLowerCase()}`;
    if (vus.has(cle)) {
      ignores++;
      resultats.push({ ...base, fonction, statut: 'ignore', motif: 'Déjà présent dans ce fichier.' });
      continue;
    }
    vus.add(cle);
    const existant = await q(
      'SELECT id, etablissement_id FROM bureau_membres WHERE lower(nom) = lower($1) AND lower(fonction) = lower($2) LIMIT 1',
      [nom, fonction],
    );
    if (existant.rows.length > 0) {
      // Correctif du bogue ISPAM, 3 nov. 2026 : une entrée déjà
      // importée sans établissement, donc affichée sous
      // Structure, prend l'établissement du lot quand le lot
      // en fournit un, au lieu de rester sous Communauté.
      // Une entrée déjà rattachée à un établissement n'est
      // jamais déplacée par un import.
      if (etablissementImport && !existant.rows[0].etablissement_id) {
        await q('UPDATE bureau_membres SET etablissement_id = $1 WHERE id = $2', [etablissementImport, existant.rows[0].id]);
        importes++;
        resultats.push({ ...base, fonction, statut: 'importe', motif: 'Établissement mis à jour.' });
        continue;
      }
      ignores++;
      resultats.push({ ...base, fonction, statut: 'ignore', motif: 'Déjà présent.' });
      continue;
    }
    await q(
      'INSERT INTO bureau_membres (nom, fonction, contact, contact_public, ordre, membre_id, etablissement_id) VALUES ($1,$2,$3,false,$4,NULL,$5)',
      [nom, fonction, contact, prochainOrdre, etablissementImport],
    );
    prochainOrdre++;
    importes++;
    resultats.push({ ...base, fonction, statut: 'importe' });
  }
  await tx(async (c) => {
    await audit(c, req, 'bureau.import', 'bureau_membres', null, {
      lignes: corps.lignes.length,
      importes,
      ignores,
      rejetes,
      etablissement_id: etablissementImport,
    });
  });
  return { lignes: resultats, importes, ignores, rejetes };
});

app.post('/admin/cotisations', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req, reply) => {
  exigerFonctionAdmin(req, 'tresorier', 'responsable');
  const b = z.object({ matricule: z.string().trim().min(3), mois: date.optional(), moyen: z.enum(['especes', 'wave', 'orange_money', 'paypal']).optional() }).parse(req.body);
  const m = (await q('SELECT id, etablissement_id FROM membres WHERE matricule = $1', [b.matricule])).rows[0];
  if (!m) throw httpError(404, 'Matricule inconnu.');
  // Périmètre serveur : un administrateur d'établissement n'enregistre
  // que pour les membres de son établissement. Un membre sans
  // établissement n'est enregistré que par l'admin général.
  if (req.user.role === 'admin_etablissement' && (m.etablissement_id == null || m.etablissement_id !== req.user.eid)) throw httpError(403, 'Accès refusé.');
  // Mois omis : mois en cours côté serveur. Le montant reste celui
  // imposé par la table, 1000 FCFA par mois, jamais envoyé par le client.
  const mois = b.mois ?? new Date().toISOString().slice(0, 10);
  const r = await tx(async (c) => {
    let row;
    try {
      row = (await c.query(
        "INSERT INTO cotisations (membre_id, mois, enregistre_par, moyen) VALUES ($1, date_trunc('month', $2::date)::date, $3, $4) RETURNING *",
        [m.id, mois, req.user.sub, b.moyen ?? 'especes'],
      )).rows[0];
    } catch (e) {
      if (e.code === '23505') throw httpError(409, 'Cotisation du mois déjà enregistrée.');
      throw e;
    }
    await audit(c, req, 'cotisation.enregistree', 'cotisations', row.id, { matricule: b.matricule, mois: String(row.mois).slice(0, 10), moyen: row.moyen, montant: row.montant_fcfa });
    return row;
  });
  // La ligne cotisations du mois compte dans la définition de « soldé »
  // de la cloche : le rappel de cotisation du mois disparaît seul à la
  // prochaine lecture de la cloche, sans changer ses règles.
  return reply.code(201).send(r);
});

// ───────────────────────── Présences, phase 1, 29 oct. 2026 ─────────────────────────
// Une activité de présence est soit un camp (evenements), soit une activité
// d'établissement (activites_etablissement). Le périmètre est contrôlé ici,
// jamais côté application : un admin_etablissement ne voit et ne marque que
// les membres de son établissement, et seulement ses propres activités
// d'établissement. Les camps sont communautaires : pour eux, seul
// l'établissement du membre compte. Une présence annulée est marquée,
// jamais effacée. Le journal d'audit propre aux présences ne remplace pas
// journal_audit, qui garde les autres actions.
async function resolveActivite(id) {
  const ev = (await q("SELECT id, nom, NULL::uuid AS etablissement_id, 'evenement' AS type FROM evenements WHERE id = $1", [id])).rows[0];
  if (ev) return ev;
  return (await q("SELECT id, titre AS nom, etablissement_id, 'activite_etablissement' AS type FROM activites_etablissement WHERE id = $1", [id])).rows[0] ?? null;
}
const peutPresence = (req, membreEtabId, activite) => {
  if (req.user.role === 'admin_general') return true;
  if (req.user.role !== 'admin_etablissement') return false;
  // Membre sans établissement, camp communautaire, 30 oct. 2026 : un
  // membre sans établissement n'appartient au périmètre d'aucun
  // établissement, et les camps sont communautaires. L'administrateur
  // d'établissement peut donc le marquer présent à un camp. Les
  // activités d'établissement restent strictes, et les membres d'un
  // autre établissement restent refusés.
  if (membreEtabId == null) return activite != null && activite.type === 'evenement';
  if (membreEtabId !== req.user.eid) return false;
  if (activite && activite.type === 'activite_etablissement' && activite.etablissement_id !== req.user.eid) return false;
  return true;
};
const auditPresence = (c, req, action, entite, entiteId, details) =>
  c.query('INSERT INTO audit (acteur_id, action, entite, entite_id, details) VALUES ($1,$2,$3,$4,$5)', [
    req?.user?.mid ?? null,
    action,
    entite,
    entiteId ?? null,
    details ? JSON.stringify(details) : null,
  ]);
// Espace parent, 8 nov. 2026 : parents validés d'un enfant, et
// notification à chacun. Best effort : une notification qui échoue
// ne bloque jamais l'action (scan, annulation, clôture, moyennes).
async function parentsValidesDe(enfantMembreId) {
  return (await q(
    `SELECT parent_membre_id FROM liens_parent_enfant WHERE enfant_membre_id = $1 AND statut = 'valide'`,
    [enfantMembreId],
  )).rows.map((r) => r.parent_membre_id);
}

async function notifierParentsEnfant(enfantId, type, titre, message, lienType, lienId) {
  try {
    const parents = await parentsValidesDe(enfantId);
    for (const pid of parents) {
      await notifierMembre(pid, type, titre, message, lienType, lienId);
    }
  } catch (e) {
    app.log.error(e);
  }
}

async function marquerPresence(c, req, activite, membre, methode) {
  const ancien = (await c.query('SELECT * FROM presences WHERE membre_id = $1 AND activite_id = $2', [membre.id, activite.id])).rows[0];
  if (ancien && ancien.statut === 'present') throw httpError(409, 'Ce membre est déjà présent à cette activité.');
  const details = { activite_id: activite.id, activite_nom: activite.nom, membre_nom: membre.nom_complet, matricule: membre.matricule, methode };
  let ligne;
  if (ancien) {
    ligne = (await c.query("UPDATE presences SET statut = 'present', scanne_le = now(), scanne_par = $2, methode = $3 WHERE id = $1 RETURNING *", [ancien.id, req.user.mid ?? null, methode])).rows[0];
    await auditPresence(c, req, 'presence.reprise', 'presences', ligne.id, details);
  } else {
    ligne = (await c.query('INSERT INTO presences (membre_id, activite_id, scanne_par, methode) VALUES ($1,$2,$3,$4) RETURNING *', [membre.id, activite.id, req.user.mid ?? null, methode])).rows[0];
    // Prochain culte, tranche 1, 19 nov. 2026 : la confirmation
    // par le membre lui-même s'audite 'presence.confirmation',
    // pas 'presence.manuel', qui reste la saisie par un admin.
    await auditPresence(c, req, methode === 'scan' ? 'presence.scan' : methode === 'confirmation' ? 'presence.confirmation' : 'presence.manuel', 'presences', ligne.id, details);
  }
  return { ...ligne, nom_complet: membre.nom_complet, matricule: membre.matricule };
}

app.post('/presences/scan', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const b = z.object({ activite_id: z.string().uuid(), matricule: z.string().trim().min(3).max(40) }).parse(req.body);
  const activite = await resolveActivite(b.activite_id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  const membre = (await q('SELECT id, nom_complet, matricule, etablissement_id FROM membres WHERE matricule = $1', [b.matricule.toUpperCase()])).rows[0];
  if (!membre) throw httpError(404, 'Matricule inconnu.');
  if (!peutPresence(req, membre.etablissement_id, activite)) throw httpError(403, 'Accès refusé à cet établissement.');
  const ligne = await tx((c) => marquerPresence(c, req, activite, membre, 'scan'));
  await notifierParentsEnfant(membre.id, 'presence_enfant', `${prenomDe(membre.nom_complet)} est arrivé(e) à ${activite.nom}`, `${prenomDe(membre.nom_complet)} est arrivé(e) à l'activité ${activite.nom}.`, 'activite', activite.id);
  return reply.code(201).send(ligne);
});

app.post('/presences/manuel', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const b = z.object({ activite_id: z.string().uuid(), membre_id: z.string().uuid() }).parse(req.body);
  const activite = await resolveActivite(b.activite_id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  const membre = (await q('SELECT id, nom_complet, matricule, etablissement_id FROM membres WHERE id = $1', [b.membre_id])).rows[0];
  if (!membre) throw httpError(404, 'Membre introuvable.');
  if (!peutPresence(req, membre.etablissement_id, activite)) throw httpError(403, 'Accès refusé à cet établissement.');
  const ligne = await tx((c) => marquerPresence(c, req, activite, membre, 'manuel'));
  await notifierParentsEnfant(membre.id, 'presence_enfant', `${prenomDe(membre.nom_complet)} est arrivé(e) à ${activite.nom}`, `${prenomDe(membre.nom_complet)} est arrivé(e) à l'activité ${activite.nom}.`, 'activite', activite.id);
  return reply.code(201).send(ligne);
});

app.get('/presences/activite/:id', { preHandler: contenuG }, async (req) => {
  const activite = await resolveActivite(req.params.id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  if (req.user.role === 'admin_etablissement' && activite.type === 'activite_etablissement' && activite.etablissement_id !== req.user.eid) {
    throw httpError(403, 'Accès refusé à cet établissement.');
  }
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  // Camp communautaire, 30 oct. 2026 : l'administrateur d'établissement
  // voit aussi les membres sans établissement, qui n'appartiennent à
  // aucun périmètre, pour que les présences ajoutées à la main restent
  // visibles dans sa liste. Les activités d'établissement restent
  // strictes, et les autres établissements restent invisibles.
  const inclureSans = req.user.role === 'admin_etablissement' && activite.type === 'evenement';
  const pres = (
    await q(
      `SELECT p.*, m.nom_complet, m.matricule, m.etablissement_id
       FROM presences p JOIN membres m ON m.id = p.membre_id
       WHERE p.activite_id = $1 AND ($2::uuid IS NULL OR m.etablissement_id = $2 OR ($3::boolean AND m.etablissement_id IS NULL))
       ORDER BY p.scanne_le`,
      [activite.id, perimetre, inclureSans],
    )
  ).rows;
  let inscrits = [];
  if (activite.type === 'evenement') {
    inscrits = (
      await q(
        `SELECT i.membre_id, m.nom_complet, m.matricule, m.etablissement_id
         FROM inscriptions i JOIN membres m ON m.id = i.membre_id
         WHERE i.evenement_id = $1 AND ($2::uuid IS NULL OR m.etablissement_id = $2 OR ($3::boolean AND m.etablissement_id IS NULL))
         ORDER BY m.nom_complet`,
        [activite.id, perimetre, inclureSans],
      )
    ).rows;
  }
  const parMembre = new Map(pres.map((p) => [p.membre_id, p]));
  const entrees = inscrits.map((i) => {
    const p = parMembre.get(i.membre_id);
    return {
      presence_id: p?.id ?? null,
      membre_id: i.membre_id,
      nom_complet: i.nom_complet,
      matricule: i.matricule,
      statut: p ? p.statut : 'absent',
      scanne_le: p?.scanne_le ?? null,
      methode: p?.methode ?? null,
      inscrit: true,
    };
  });
  for (const p of pres) {
    if (!inscrits.some((i) => i.membre_id === p.membre_id)) {
      entrees.push({
        presence_id: p.id,
        membre_id: p.membre_id,
        nom_complet: p.nom_complet,
        matricule: p.matricule,
        statut: p.statut,
        scanne_le: p.scanne_le,
        methode: p.methode,
        inscrit: false,
      });
    }
  }
  return { activite: { id: activite.id, type: activite.type, nom: activite.nom }, entrees };
});


// Inscriptions d'un camp pour l'administration, 31 oct. 2026 :
// export des inscriptions par camp. Même garde et même périmètre
// que la liste des présences : l'administrateur d'établissement
// voit son établissement et, pour un camp communautaire, les
// membres sans établissement ; les autres établissements restent
// invisibles. Aucune donnée médicale n'est renvoyée ici.
app.get('/admin/inscriptions', { preHandler: contenuG }, async (req) => {
  const evenementId =
    typeof req.query.evenement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.evenement_id)
      ? req.query.evenement_id
      : null;
  if (!evenementId) throw httpError(400, 'Camp requis.');
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1', [evenementId])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  await exigerNomination(req, 'camp.inscriptions', { evenementId, obligatoire: true });
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const inclureSans = req.user.role === 'admin_etablissement';
  return (
    await q(
      `SELECT e.nom AS camp, COALESCE(m.nom_complet, pe.nom_complet) AS nom_complet, m.matricule, i.inscrit_le, i.contact_parent,
              i.badge_numero, i.age, i.sexe, i.telephone, i.email, i.residence, i.niveau_etude, i.profession, i.structure_appartenance,
              i.antecedents_medicaux, i.precisions_medicales, i.allergies, i.besoins_medicaux,
              i.contact_urgence_nom, i.contact_urgence_lien, i.contact_urgence_telephone, i.observations,
              CASE WHEN e.est_kairos AND i.badge_numero IS NOT NULL THEN 'KP' || COALESCE(EXTRACT(YEAR FROM e.date_debut), EXTRACT(YEAR FROM CURRENT_DATE))::int::text || '-' || LPAD(i.badge_numero::text, 4, '0') END AS badge_id,
              (NOT i.versements_requis OR (SELECT COALESCE(SUM(montant_fcfa), 0) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = COALESCE(i.membre_id, i.personne_externe_id) AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme') >= e.tarif_fcfa) AS pass_visible
       FROM inscriptions i LEFT JOIN membres m ON m.id = i.membre_id LEFT JOIN personnes_externes pe ON pe.id = i.personne_externe_id JOIN evenements e ON e.id = i.evenement_id
       WHERE i.evenement_id = $1 AND ($2::uuid IS NULL OR COALESCE(m.etablissement_id, pe.etablissement_id) = $2 OR ($3::boolean AND COALESCE(m.etablissement_id, pe.etablissement_id) IS NULL))
       ORDER BY COALESCE(m.nom_complet, pe.nom_complet)`,
      [evenementId, perimetre, inclureSans],
    )
  ).rows;
});

// Inscription au camp par un administrateur, correctif global
// 27 nov. 2026 : formulaire pro pour inscrire un membre sans
// téléphone, ou une personne hors système, avec le contact du
// parent ou tuteur. Même garde et périmètre que la liste.
// Le pass est généré comme pour l'auto-inscription ; les 6
// versements s'appliquent quand le tarif est supérieur à 0.
// Une personne hors système n'a pas de compte, donc pas de
// notification ni de groupe : son règlement se fait par don de
// camp au nom de la personne, comme aujourd'hui.
app.post('/admin/evenements/:id/inscriptions', { preHandler: contenuG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  // Formulaire KAIROS 2027, correction de suivi 27 nov. 2026 :
  // les 5 sections du formulaire d'Axel. Le téléphone du
  // campeur n'est pas obligatoire, le cas d'usage est le membre
  // sans téléphone ; le contact d'urgence, lui, l'est, nom et
  // téléphone. Le médical est confidentiel : il est stocké sur
  // l'inscription et ne sort que par la liste administrateur.
  const body = z.object({
    membre_id: z.string().uuid().optional().nullable(),
    personne_externe_id: z.string().uuid().optional().nullable(),
    contact_parent: z.string().trim().max(200).optional().nullable(),
    age: z.number().int().min(0).max(120).optional().nullable(),
    sexe: z.enum(['Femme', 'Homme']).optional().nullable(),
    telephone: z.string().trim().max(40).optional().nullable(),
    email: z.string().trim().max(200).optional().nullable(),
    residence: z.string().trim().max(200).optional().nullable(),
    niveau_etude: z.string().trim().max(200).optional().nullable(),
    profession: z.string().trim().max(200).optional().nullable(),
    structure_appartenance: z.string().trim().max(200).optional().nullable(),
    antecedents_medicaux: z.enum(['Oui', 'Non', 'Ne souhaite pas répondre']).optional().nullable(),
    precisions_medicales: z.string().trim().max(1000).optional().nullable(),
    allergies: z.string().trim().max(500).optional().nullable(),
    besoins_medicaux: z.string().trim().max(500).optional().nullable(),
    contact_urgence_nom: z.string().trim().min(1).max(200),
    contact_urgence_lien: z.enum(['Père', 'Mère', 'Conjoint(e)', 'Frère-Sœur', 'Parent-Tuteur', 'Ami(e)', 'Autre']).optional().nullable(),
    contact_urgence_telephone: z.string().trim().min(1).max(40),
    observations: z.string().trim().max(1000).optional().nullable(),
  }).parse(req.body ?? {});
  if (!body.membre_id && !body.personne_externe_id) throw httpError(400, 'Choisissez un membre ou une personne hors système.');
  if (body.membre_id && body.personne_externe_id) throw httpError(400, 'Choisissez un membre ou une personne hors système, pas les deux.');
  const ev = (await q('SELECT id, nom, type, est_kairos, tarif_fcfa, date_debut FROM evenements WHERE id = $1 AND publie', [id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: id, obligatoire: true });
  let nomComplet = null; let etablissementId = null;
  if (body.membre_id) {
    const membre = (await q('SELECT id, nom_complet, etablissement_id FROM membres WHERE id = $1', [body.membre_id])).rows[0];
    if (!membre) throw httpError(404, 'Membre introuvable.');
    nomComplet = membre.nom_complet; etablissementId = membre.etablissement_id;
  } else {
    const externe = (await q('SELECT id, nom_complet, etablissement_id FROM personnes_externes WHERE id = $1', [body.personne_externe_id])).rows[0];
    if (!externe) throw httpError(404, 'Personne introuvable.');
    nomComplet = externe.nom_complet; etablissementId = externe.etablissement_id;
  }
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  if (perimetre && etablissementId != null && etablissementId !== perimetre) throw httpError(403, 'Cette personne n’appartient pas à votre établissement.');
  const existante = (await q(
    body.membre_id
      ? 'SELECT id FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2'
      : 'SELECT id FROM inscriptions WHERE evenement_id = $1 AND personne_externe_id = $2',
    [id, body.membre_id ?? body.personne_externe_id])).rows[0];
  if (existante) throw httpError(409, 'Cette personne est déjà inscrite à ce camp.');
  let r;
  try {
    r = (await q(
      `INSERT INTO inscriptions (evenement_id, membre_id, personne_externe_id, versements_requis, contact_parent,
           age, sexe, telephone, email, residence, niveau_etude, profession, structure_appartenance,
           antecedents_medicaux, precisions_medicales, allergies, besoins_medicaux,
           contact_urgence_nom, contact_urgence_lien, contact_urgence_telephone, observations, badge_numero)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,
         (SELECT COALESCE(MAX(badge_numero), 0) + 1 FROM inscriptions WHERE evenement_id = $1))
       RETURNING id, code_pass, inscrit_le, versements_requis, badge_numero`,
      [id, body.membre_id ?? null, body.personne_externe_id ?? null, (ev.tarif_fcfa ?? 0) > 0, body.contact_parent ?? null,
       body.age ?? null, body.sexe ?? null, body.telephone ?? null, body.email ?? null, body.residence ?? null,
       body.niveau_etude ?? null, body.profession ?? null, body.structure_appartenance ?? null,
       body.antecedents_medicaux ?? null, body.precisions_medicales ?? null, body.allergies ?? null, body.besoins_medicaux ?? null,
       body.contact_urgence_nom, body.contact_urgence_lien ?? null, body.contact_urgence_telephone, body.observations ?? null],
    )).rows[0];
  } catch (e) {
    if (e.code === '23505') throw httpError(409, 'Cette personne est déjà inscrite à ce camp.');
    throw e;
  }
  if (body.membre_id && estTypeEvenementGroupe(ev.type)) await assurerGroupeEvenement(id, ev.nom, body.membre_id);
  let versements = null;
  if (body.membre_id && r.versements_requis) {
    const prog = await progressionCamp(body.membre_id, id);
    versements = { ...prog, requis: true };
    const tarif = ev.tarif_fcfa ?? 0;
    await notifierMembre(
      body.membre_id,
      'camp_rappel',
      'Paiement du camp en 6 fois',
      `Bonjour {prenom}, votre inscription à ${ev.nom} est enregistrée. Votre pass sera généré quand les 6 versements seront payés, soit ${fcfaTexte(montantVersement(tarif, 1))} par versement, ${fcfaTexte(tarif)} au total. Il vous reste ${fcfaTexte(tarif)} à payer.`,
      'camp',
      id,
      'Paiement du camp en 6 fois',
      `Votre inscription à ${ev.nom} est enregistrée. Votre pass sera généré quand les 6 versements seront payés, soit ${fcfaTexte(montantVersement(tarif, 1))} par versement, ${fcfaTexte(tarif)} au total. Il vous reste ${fcfaTexte(tarif)} à payer.`,
    );
  }
  await audit(pool, req, 'inscription_camp.creee', 'inscriptions', r.id, { evenement_id: id, membre_id: body.membre_id ?? null, personne_externe_id: body.personne_externe_id ?? null, badge_numero: r.badge_numero });
  const anneeBadge = ev.date_debut ? new Date(ev.date_debut).getUTCFullYear() : new Date().getUTCFullYear();
  const badgeId = ev.est_kairos ? `KP${anneeBadge}-${String(r.badge_numero).padStart(4, '0')}` : null;
  return reply.code(201).send({ evenement: ev.nom, badge: ev.est_kairos, code_pass: r.code_pass, inscrit_le: r.inscrit_le, versements, nom_complet: nomComplet, badge_numero: r.badge_numero, badge_id: badgeId });
});

// Suivi des versements de camp, 2 nov. 2026, tranche 2 des 7
// propositions validées par Axel : lecture seule pour la
// trésorerie, jamais un paiement, jamais un rappel nouveau, jamais
// un prélèvement automatique. Mêmes garde et périmètre que
// /admin/inscriptions : administrateur général tout, administrateur
// d'établissement forcé à son établissement, membres sans
// établissement inclus pour les camps communautaires. Seules les
// inscriptions avec versements_requis vrai sont renvoyées : ni les
// paiements en une fois, ni les dons de camp comme lignes propres.
// Un don de camp pour un bénéficiaire compte pour le bénéficiaire,
// par la règle beneficiaire_contact, exactement comme
// progressionCamp, qui est réutilisée ici sans redéfinir les
// sommes : versements distincts confirmés, payé, versement suivant
// égal au nombre distincts confirmés plus 1, comme le code
// existant, pas le plus petit numéro manquant, montant suivant par
// montantVersement, les 5 premiers prenant la part entière et le
// 6e le reste. Le pass est visible quand le payé atteint ou
// dépasse le tarif, même en cas de versement tardif, aucun
// paiement n'est bloqué après l'échéance des rappels. L'état du
// rappel mensuel est un texte seulement, sans date inventée :
// actif tant qu'un solde reste et que la date de début est absente
// ou à plus de 12 jours, arrêté sinon, ce qui couvre aussi le cas
// soldé, où il n'y a plus rien à rappeler. Aucune donnée
// médicale, aucun sujet de prière, aucun secret, aucun identifiant
// de paiement sensible, seulement la référence d'un versement en
// attente, comme dans les listes existantes.
app.get('/admin/suivi-versements', { preHandler: contenuG }, async (req) => {
  const evenementId =
    typeof req.query.evenement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.evenement_id)
      ? req.query.evenement_id
      : null;
  if (!evenementId) throw httpError(400, 'Camp requis.');
  const ev = (await q('SELECT id, nom, tarif_fcfa, date_debut FROM evenements WHERE id = $1', [evenementId])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  await exigerNomination(req, 'finances.lire', { evenementId, obligatoire: true });
  if (req.user.role === 'admin_etablissement' && !req.user.eid) {
    return { camp: { id: ev.id, nom: ev.nom, tarif_fcfa: ev.tarif_fcfa ?? 0, date_debut: ev.date_debut }, totaux: { inscrits_versements: 0, total_paye: 0, total_restant: 0, pass_debloques: 0, avec_en_attente: 0 }, membres: [] };
  }
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const inclureSans = req.user.role === 'admin_etablissement';
  const inscrits = (
    await q(
      `SELECT m.id AS membre_id, m.nom_complet, m.matricule, e.nom AS etablissement, i.inscrit_le
       FROM inscriptions i JOIN membres m ON m.id = i.membre_id LEFT JOIN etablissements e ON e.id = m.etablissement_id
       WHERE i.evenement_id = $1 AND i.versements_requis
         AND ($2::uuid IS NULL OR m.etablissement_id = $2 OR ($3::boolean AND m.etablissement_id IS NULL))
       ORDER BY m.nom_complet`,
      [evenementId, perimetre, inclureSans],
    )
  ).rows;
  const tarif = ev.tarif_fcfa ?? 0;
  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);
  const membres = [];
  let totalPaye = 0;
  let totalRestant = 0;
  let passDebloques = 0;
  let avecEnAttente = 0;
  for (const inscrit of inscrits) {
    const prog = await progressionCamp(inscrit.membre_id, evenementId);
    if (!prog) continue;
    const paye = prog.paye ?? 0;
    const restant = Math.max(0, tarif - paye);
    const passVisible = paye >= tarif;
    const suivant = passVisible ? null : prog.suivant;
    const montantSuivant = passVisible ? null : prog.montant_suivant;
    const versementsRestants = passVisible ? 0 : 6 - (prog.valides ?? 0);
    let rappelEtat = 'arrete';
    if (restant > 0) {
      if (!ev.date_debut) {
        rappelEtat = 'actif';
      } else {
        // Comparaison sur des dates seules, sans heure ni fuseau,
        // comme la règle SQL existante CURRENT_DATE <= date_debut
        // moins 12 jours : la chaîne ISO est découpée en année,
        // mois et jour, puis reconstruite en date locale.
        const texteDebut = ev.date_debut instanceof Date ? ev.date_debut.toISOString().slice(0, 10) : String(ev.date_debut).slice(0, 10);
        const [annee, mois, jour] = texteDebut.split('-').map(Number);
        const limite = new Date(annee, mois - 1, jour);
        limite.setDate(limite.getDate() - 12);
        rappelEtat = aujourdHui <= limite ? 'actif' : 'arrete';
      }
    }
    if (prog.en_attente) avecEnAttente += 1;
    if (passVisible) passDebloques += 1;
    totalPaye += paye;
    totalRestant += restant;
    membres.push({
      nom_complet: inscrit.nom_complet,
      matricule: inscrit.matricule,
      etablissement: inscrit.etablissement || '',
      inscrit_le: inscrit.inscrit_le,
      tarif,
      paye,
      restant,
      versements_valides: prog.valides ?? 0,
      versements_restants: versementsRestants,
      versement_suivant: suivant,
      montant_suivant: montantSuivant,
      versement_en_attente: prog.en_attente,
      pass_visible: passVisible,
      rappel_etat: rappelEtat,
    });
  }
  return {
    camp: { id: ev.id, nom: ev.nom, tarif_fcfa: tarif, date_debut: ev.date_debut },
    totaux: {
      inscrits_versements: membres.length,
      total_paye: totalPaye,
      total_restant: totalRestant,
      pass_debloques: passDebloques,
      avec_en_attente: avecEnAttente,
    },
    membres,
  };
});

// Taux de présence par camp, lot 1, 31 oct. 2026 : mêmes garde et
// périmètre que la liste de présence. Le numérateur compte les
// membres avec statut present sur ce camp, y compris les présents
// sans inscription marqués à la main. Le dénominateur compte les
// inscrits du camp. Les annulés ne comptent jamais comme présents.
// Pour une activité d'établissement, il n'y a pas d'inscriptions :
// inscrits vaut 0 et taux vaut null.
app.get('/presences/activite/:id/taux', { preHandler: contenuG }, async (req) => {
  const activite = await resolveActivite(req.params.id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  if (req.user.role === 'admin_etablissement' && activite.type === 'activite_etablissement' && activite.etablissement_id !== req.user.eid) {
    throw httpError(403, 'Accès refusé à cet établissement.');
  }
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const inclureSans = req.user.role === 'admin_etablissement' && activite.type === 'evenement';
  const filtre = `($2::uuid IS NULL OR m.etablissement_id = $2 OR ($3::boolean AND m.etablissement_id IS NULL))`;
  const presents = (await q(
    `SELECT COUNT(*)::int AS n FROM presences p JOIN membres m ON m.id = p.membre_id
     WHERE p.activite_id = $1 AND p.statut = 'present' AND ${filtre}`,
    [activite.id, perimetre, inclureSans],
  )).rows[0].n;
  let inscrits = 0;
  if (activite.type === 'evenement') {
    inscrits = (await q(
      `SELECT COUNT(*)::int AS n FROM inscriptions i JOIN membres m ON m.id = i.membre_id
       WHERE i.evenement_id = $1 AND ${filtre}`,
      [activite.id, perimetre, inclureSans],
    )).rows[0].n;
  }
  return {
    activite: { id: activite.id, type: activite.type, nom: activite.nom },
    inscrits,
    presents,
    taux: inscrits > 0 ? Math.round((presents * 100) / inscrits) : null,
  };
});

// Présence du membre connecté sur un camp, lot 1, 31 oct. 2026 : le
// membre ne voit que sa propre ligne, jamais celle d'un autre membre.
// Sert au bouton Certificat sur ses propres camps. Sans ligne, le
// statut vaut null, comme une absence.
// Dernier changement l'emporte, par élément : un élément plus récent
// côté client remplace l'état serveur, et inversement à la lecture.
const bibleRefSchema = z.object({
  livre: z.number().int().min(0).max(65),
  chapitre: z.number().int().min(1),
  verset: z.number().int().min(1),
  langue: z.enum(['fr', 'en']),
  modifie_le: z.string().datetime(),
  supprime: z.boolean().optional(),
});
const bibleSyncSchema = z.object({
  favoris: z.array(bibleRefSchema).max(10000),
  surlignages: z.array(bibleRefSchema).max(10000),
  taille_texte: z.object({ niveau: z.number().int().min(0).max(2), modifie_le: z.string().datetime() }).nullable().optional(),
});

const fusionnerBible = async (c, table, membreId, items) => {
  for (const it of items) {
    const ex = (await c.query(
      `SELECT modifie_le FROM ${table} WHERE membre_id = $1 AND livre = $2 AND chapitre = $3 AND verset = $4 AND langue = $5`,
      [membreId, it.livre, it.chapitre, it.verset, it.langue],
    )).rows[0];
    if (ex && new Date(it.modifie_le) <= new Date(ex.modifie_le)) continue;
    await c.query(
      `INSERT INTO ${table} (membre_id, livre, chapitre, verset, langue, modifie_le, supprime_le) VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (membre_id, livre, chapitre, verset, langue) DO UPDATE SET modifie_le = EXCLUDED.modifie_le, supprime_le = EXCLUDED.supprime_le`,
      [membreId, it.livre, it.chapitre, it.verset, it.langue, it.modifie_le, it.supprime ? it.modifie_le : null],
    );
  }
};

const lireBibleSync = async (membreId) => {
  const lire = async (table) => (await q(
    `SELECT livre, chapitre, verset, langue, modifie_le, (supprime_le IS NOT NULL) AS supprime FROM ${table} WHERE membre_id = $1 ORDER BY langue, livre, chapitre, verset`,
    [membreId],
  )).rows.map((r) => ({ livre: r.livre, chapitre: r.chapitre, verset: r.verset, langue: r.langue, modifie_le: r.modifie_le.toISOString(), supprime: r.supprime }));
  const pref = (await q(`SELECT taille_texte, modifie_le FROM membre_preferences WHERE membre_id = $1`, [membreId])).rows[0];
  return {
    favoris: await lire('bible_favoris'),
    surlignages: await lire('bible_surlignages'),
    taille_texte: pref ? { niveau: pref.taille_texte, modifie_le: pref.modifie_le.toISOString() } : null,
  };
};

app.get('/moi/bible-sync', { preHandler: membreG }, async (req) => lireBibleSync(req.user.mid));

app.post('/moi/bible-sync', { preHandler: membreG }, async (req) => {
  const corps = bibleSyncSchema.parse(req.body ?? {});
  await tx(async (c) => {
    await fusionnerBible(c, 'bible_favoris', req.user.mid, corps.favoris);
    await fusionnerBible(c, 'bible_surlignages', req.user.mid, corps.surlignages);
    if (corps.taille_texte) {
      await c.query(
        `INSERT INTO membre_preferences (membre_id, taille_texte, modifie_le) VALUES ($1, $2, $3)
         ON CONFLICT (membre_id) DO UPDATE SET taille_texte = EXCLUDED.taille_texte, modifie_le = EXCLUDED.modifie_le
         WHERE EXCLUDED.modifie_le > membre_preferences.modifie_le`,
        [req.user.mid, corps.taille_texte.niveau, corps.taille_texte.modifie_le],
      );
    }
  });
  return lireBibleSync(req.user.mid);
});

// Jauge d'objectif de don, 31 oct. 2026, lot 1 chantier 6 sur 6.
// Lecture publique, agrégat seulement : total collecté, cible,
// pourcentage, jamais de nom de donateur ni de montant individuel.
// Seuls les dons libres confirmés comptent : type 'don' (les dons de
// camp sont de type 'camp', les cotisations et les cartes ont leurs
// propres types) et statut 'confirme', à partir de la création de
// l'objectif. Les montants PayPal en devise sont comptés par leur
// montant de référence en FCFA enregistré dans le paiement, comme
// partout dans l'application.
async function lireObjectifDon() {
  const row = (await q(
    `SELECT id, libelle, cible_fcfa, cree_le FROM objectifs_don WHERE actif ORDER BY cree_le DESC LIMIT 1`,
  )).rows[0];
  if (!row) return { actif: false };
  const total = (await q(
    `SELECT COALESCE(SUM(montant_fcfa), 0) AS total FROM paiements WHERE type = 'don' AND statut = 'confirme' AND cree_le >= $1`,
    [row.cree_le],
  )).rows[0];
  const collecte = Number(total.total);
  const cible = row.cible_fcfa;
  return {
    actif: true,
    id: row.id,
    libelle: row.libelle,
    cible_fcfa: cible,
    collecte_fcfa: collecte,
    restant_fcfa: Math.max(0, cible - collecte),
    pourcentage: Math.round((collecte * 100) / cible),
    depasse: collecte > cible,
  };
}

app.get('/objectif-don', async () => lireObjectifDon());

app.post('/admin/objectifs-don', { preHandler: adminG }, async (req) => {
  const b = z.object({ libelle: z.string().trim().min(1).max(200).transform(texteMajuscules), cible_fcfa: z.number().int().positive() }).parse(req.body);
  return tx(async (c) => {
    await c.query(`UPDATE objectifs_don SET actif = false WHERE actif`);
    const row = (await c.query(
      `INSERT INTO objectifs_don (libelle, cible_fcfa, actif) VALUES ($1, $2, true) RETURNING id, libelle, cible_fcfa, actif, cree_le`,
      [b.libelle, b.cible_fcfa],
    )).rows[0];
    return row;
  });
});

app.put('/admin/objectifs-don/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ libelle: z.string().trim().min(1).max(200).transform(texteMajuscules), cible_fcfa: z.number().int().positive() }).parse(req.body);
  const row = (await q(
    `UPDATE objectifs_don SET libelle = $1, cible_fcfa = $2, modifie_le = now() WHERE id = $3 RETURNING id, libelle, cible_fcfa, actif, cree_le`,
    [b.libelle, b.cible_fcfa, id],
  )).rows[0];
  if (!row) throw httpError(404, 'Objectif introuvable.');
  return row;
});

app.post('/admin/objectifs-don/:id/desactiver', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const row = (await q(
    `UPDATE objectifs_don SET actif = false, modifie_le = now() WHERE id = $1 RETURNING id`,
    [id],
  )).rows[0];
  if (!row) throw httpError(404, 'Objectif introuvable.');
  return { desactive: true };
});

app.get('/moi/presences/:activiteId', { preHandler: membreG }, async (req) => {
  if (req.user.mid == null) return { statut: null };
  const ligne = (await q(
    'SELECT statut FROM presences WHERE membre_id = $1 AND activite_id = $2',
    [req.user.mid, req.params.activiteId],
  )).rows[0];
  return { statut: ligne?.statut ?? null };
});

// Prochain culte, tranche 1, 19 nov. 2026 : le membre confirme
// lui-même sa présence au culte, une seule fois. Le culte est
// un événement de type 'culte', daté à venir : un camp ou une
// réunion ne passe pas ici (leurs présences restent le scan et
// la saisie manuelle par la structure), et un culte passé ou
// sans date non plus. La reprise après annulation repasse par
// marquerPresence, comme le scan : 409 seulement si la présence
// est déjà confirmée. Aucune notification aux parents : ce
// n'est pas une arrivée constatée, c'est le membre qui annonce
// qu'il viendra.
async function chargerCulte(id) {
  const ev = (await q('SELECT id, nom, type, date_debut FROM evenements WHERE id = $1', [id])).rows[0];
  if (!ev) throw httpError(404, 'Culte introuvable.');
  if (ev.type !== 'culte') throw httpError(403, 'Ce n’est pas un culte.');
  return ev;
}

function cultePasse(dateDebut) {
  if (dateDebut == null) return true;
  const jour = dateDebut instanceof Date ? dateDebut : new Date(dateDebut);
  if (Number.isNaN(jour.getTime())) return true;
  return jour.toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10);
}

app.post('/moi/presences/:activiteId', { preHandler: membreG }, async (req, reply) => {
  const { activiteId } = z.object({ activiteId: z.string().uuid() }).parse(req.params);
  const ev = await chargerCulte(activiteId);
  if (cultePasse(ev.date_debut)) throw httpError(400, 'Ce culte est déjà passé ou sans date.');
  if (req.user.mid == null) throw httpError(403, 'Compte membre requis.');
  const membre = (await q('SELECT id, nom_complet, matricule FROM membres WHERE id = $1', [req.user.mid])).rows[0];
  if (!membre) throw httpError(404, 'Membre introuvable.');
  const ligne = await tx((c) => marquerPresence(c, req, ev, membre, 'confirmation'));
  return reply.code(201).send(ligne);
});

app.post('/moi/presences/:activiteId/annuler', { preHandler: membreG }, async (req) => {
  const { activiteId } = z.object({ activiteId: z.string().uuid() }).parse(req.params);
  const ev = await chargerCulte(activiteId);
  if (req.user.mid == null) throw httpError(403, 'Compte membre requis.');
  const ligne = (await q('SELECT * FROM presences WHERE membre_id = $1 AND activite_id = $2', [req.user.mid, activiteId])).rows[0];
  if (!ligne) throw httpError(404, 'Présence introuvable.');
  if (ligne.statut === 'annule') return ligne;
  const maj = await tx(async (c) => {
    const row = (await c.query(`UPDATE presences SET statut = 'annule' WHERE id = $1 RETURNING *`, [ligne.id])).rows[0];
    await auditPresence(c, req, 'presence.annuler', 'presences', ligne.id, { activite_id: activiteId, activite_nom: ev.nom });
    return row;
  });
  return maj;
});

// Espace parent, 8 nov. 2026 : retrouver un membre par son matricule
// (celui de sa carte), pour demander un lien parent-enfant. Ne
// renvoie que l'identité publique de la carte, jamais autre chose.
app.get('/moi/membres/par-matricule/:matricule', { preHandler: membreG }, async (req) => {
  const matricule = (req.params.matricule ?? '').toString().trim().toUpperCase();
  if (matricule.length < 3) throw httpError(400, 'Matricule trop court.');
  const m = (await q('SELECT id, nom_complet, matricule FROM membres WHERE matricule = $1', [matricule])).rows[0];
  if (!m) throw httpError(404, 'Matricule inconnu.');
  return m;
});

// Carte 128, 11 nov. 2026 : recherche d'un enfant par nom ou par
// matricule, pour demander un lien parent-enfant. La saisie est
// passée en majuscules, les noms sont stockés en majuscules depuis
// la carte 125, et UPPER couvre les noms anciens en casse mixte.
// Bornée à 10 résultats, triés par pertinence : matricule exact,
// nom exact, nom qui commence par la saisie, puis nom qui la
// contient. Ne renvoie que nom, matricule et établissement.
app.get('/moi/membres/recherche', { preHandler: membreG }, async (req) => {
  const saisie = (req.query?.q ?? '').toString().trim().toUpperCase();
  if (saisie.length < 3) throw httpError(400, 'Saisissez au moins 3 caractères.');
  const echappee = saisie.replace(/[%_\\]/g, (c) => `\\${c}`);
  return (await q(
    `SELECT m.id, m.nom_complet, m.matricule, e.nom AS etablissement FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id WHERE m.id IS DISTINCT FROM $5 AND (m.matricule = $1 OR UPPER(m.nom_complet) LIKE $2 ESCAPE '\\') ORDER BY CASE WHEN m.matricule = $1 THEN 0 WHEN UPPER(m.nom_complet) = $3 THEN 1 WHEN UPPER(m.nom_complet) LIKE $4 ESCAPE '\\' THEN 2 ELSE 3 END, m.nom_complet LIMIT 10`,
    [saisie, `%${echappee}%`, saisie, `${echappee}%`, req.user.mid ?? null],
  )).rows;
});

// ───────────────────────── Espace parent, 8 nov. 2026 ─────────────────────────
// Lien parent-enfant : le parent demande, un responsable valide. Tant
// que le lien n'est pas validé, le parent ne voit rien de l'enfant.
// Le tableau de bord parent ne montre que ses enfants liés validés.
app.post('/moi/liens-parent-enfant', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(404, 'Profil introuvable.');
  const b = z.object({ enfant_membre_id: z.string().uuid() }).parse(req.body ?? {});
  if (b.enfant_membre_id === req.user.mid) throw httpError(400, 'On ne peut pas se lier à soi-même.');
  const enfant = (await q('SELECT id, nom_complet FROM membres WHERE id = $1', [b.enfant_membre_id])).rows[0];
  if (!enfant) throw httpError(404, 'Membre introuvable.');
  const existant = (await q('SELECT id FROM liens_parent_enfant WHERE parent_membre_id = $1 AND enfant_membre_id = $2', [req.user.mid, b.enfant_membre_id])).rows[0];
  if (existant) throw httpError(409, 'Ce lien existe déjà.');
  const row = (await q(`INSERT INTO liens_parent_enfant (parent_membre_id, enfant_membre_id) VALUES ($1, $2) RETURNING *`, [req.user.mid, b.enfant_membre_id])).rows[0];
  return reply.code(201).send(row);
});

app.get('/moi/liens-parent-enfant', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(404, 'Profil introuvable.');
  return (await q(
    `SELECT l.*, m.nom_complet AS enfant_nom, m.matricule AS enfant_matricule FROM liens_parent_enfant l JOIN membres m ON m.id = l.enfant_membre_id WHERE l.parent_membre_id = $1 ORDER BY l.cree_le DESC`,
    [req.user.mid],
  )).rows;
});

app.delete('/moi/liens-parent-enfant/:id', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(404, 'Profil introuvable.');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const row = (await q('DELETE FROM liens_parent_enfant WHERE id = $1 AND parent_membre_id = $2 RETURNING id', [id, req.user.mid])).rows[0];
  if (!row) throw httpError(404, 'Lien introuvable.');
  return { supprime: true };
});

app.get('/admin/liens-parent-enfant', { preHandler: contenuG }, async (req) => {
  const statut = typeof req.query?.statut === 'string' ? req.query.statut : '';
  const filtre = ['en_attente', 'valide', 'rejete'].includes(statut) ? statut : null;
  // Carte 124, 10 nov. 2026 : un administrateur d'établissement ne
  // voit que les liens des enfants de son établissement, comme les
  // suivis scolaires. Sans établissement rattaché, liste vide.
  if (req.user.role === 'admin_etablissement' && !req.user.eid) return [];
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const conditions = [];
  const params = [];
  if (filtre) { conditions.push(`l.statut = $${params.length + 1}`); params.push(filtre); }
  if (perimetre) { conditions.push(`e.etablissement_id = $${params.length + 1}`); params.push(perimetre); }
  const rows = (await q(
    `SELECT l.*, p.nom_complet AS parent_nom, p.matricule AS parent_matricule, e.nom_complet AS enfant_nom, e.matricule AS enfant_matricule FROM liens_parent_enfant l JOIN membres p ON p.id = l.parent_membre_id JOIN membres e ON e.id = l.enfant_membre_id ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''} ORDER BY CASE WHEN l.statut = 'en_attente' THEN 0 ELSE 1 END, l.cree_le DESC`,
    params,
  )).rows;
  return rows;
});

app.post('/admin/liens-parent-enfant/:id/valider', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  // Carte 124, 10 nov. 2026 : un administrateur d'établissement ne
  // valide que les liens des enfants de son établissement, comme les
  // suivis scolaires. Lien inexistant : on laisse la mise à jour
  // répondre 404 comme avant.
  if (req.user.role === 'admin_etablissement') {
    const enfant = (await q(`SELECT e.etablissement_id FROM liens_parent_enfant l JOIN membres e ON e.id = l.enfant_membre_id WHERE l.id = $1`, [id])).rows[0];
    if (enfant && (enfant.etablissement_id == null || enfant.etablissement_id !== req.user.eid)) throw httpError(403, 'Cet enfant n’appartient pas à votre établissement.');
  }
  const row = (await q(`UPDATE liens_parent_enfant SET statut = 'valide', valide_par = $2, valide_le = now() WHERE id = $1 AND statut = 'en_attente' RETURNING *`, [id, req.user.mid ?? null])).rows[0];
  if (!row) throw httpError(404, 'Lien introuvable ou déjà traité.');
  await audit(pool, req, 'lien_parent.valide', 'liens_parent_enfant', id, { parent_membre_id: row.parent_membre_id, enfant_membre_id: row.enfant_membre_id });
  return row;
});

app.post('/admin/liens-parent-enfant/:id/rejeter', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  // Carte 124, 10 nov. 2026 : même périmètre que pour valider.
  if (req.user.role === 'admin_etablissement') {
    const enfant = (await q(`SELECT e.etablissement_id FROM liens_parent_enfant l JOIN membres e ON e.id = l.enfant_membre_id WHERE l.id = $1`, [id])).rows[0];
    if (enfant && (enfant.etablissement_id == null || enfant.etablissement_id !== req.user.eid)) throw httpError(403, 'Cet enfant n’appartient pas à votre établissement.');
  }
  const row = (await q(`UPDATE liens_parent_enfant SET statut = 'rejete', valide_par = $2, valide_le = now() WHERE id = $1 AND statut = 'en_attente' RETURNING *`, [id, req.user.mid ?? null])).rows[0];
  if (!row) throw httpError(404, 'Lien introuvable ou déjà traité.');
  await audit(pool, req, 'lien_parent.rejete', 'liens_parent_enfant', id, { parent_membre_id: row.parent_membre_id, enfant_membre_id: row.enfant_membre_id });
  return row;
});

// Tableau de bord parent : pour chaque enfant lié validé, les 10
// dernières activités (présent/absent) et ses suivis scolaires.
app.get('/moi/enfants', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(404, 'Profil introuvable.');
  const enfants = (await q(
    `SELECT m.id, m.nom_complet, m.matricule, m.etablissement_id FROM liens_parent_enfant l JOIN membres m ON m.id = l.enfant_membre_id WHERE l.parent_membre_id = $1 AND l.statut = 'valide' ORDER BY m.nom_complet`,
    [req.user.mid],
  )).rows;
  const result = [];
  for (const enfant of enfants) {
    const activites = (await q(
      `SELECT a.id, a.nom, a.date_tri FROM (
         SELECT id, nom, COALESCE(date_debut, cree_le::date) AS date_tri FROM evenements
         UNION ALL
         SELECT id, titre AS nom, cree_le::date AS date_tri FROM activites_etablissement WHERE etablissement_id = $1
       ) a ORDER BY a.date_tri DESC NULLS LAST, a.nom LIMIT 10`,
      [enfant.etablissement_id],
    )).rows;
    const presents = new Set((await q(
      `SELECT activite_id FROM presences WHERE membre_id = $1 AND statut = 'present' AND activite_id = ANY($2::uuid[])`,
      [enfant.id, activites.map((a) => a.id)],
    )).rows.map((r) => r.activite_id));
    // Sécurité, 22 nov. 2026 : une activité sans scan n'est
    // plus présentée comme absent par défaut. Absent seulement
    // quand l'activité est clôturée et l'enfant non scanné,
    // sinon non scanné, l'information n'existe pas encore.
    const cloturees = new Set((await q(
      `SELECT activite_id FROM clotures_activite WHERE activite_id = ANY($1::uuid[])`,
      [activites.map((a) => a.id)],
    )).rows.map((r) => r.activite_id));
    const presences = activites.map((a) => ({
      activite_id: a.id,
      nom: a.nom,
      date: a.date_tri,
      statut: presents.has(a.id) ? 'present' : (cloturees.has(a.id) ? 'absent' : 'non_scanne'),
    }));
    const suivis = (await q(`${SCOLAIRE_SELECT} WHERE s.membre_id = $1 ORDER BY s.annee_scolaire DESC`, [enfant.id])).rows;
    // Programme du camp, 21 nov. 2026 : les camps où l'enfant
    // est inscrit, pour que le parent ouvre leur programme.
    const campsInscrits = (await q(
      `SELECT e.id, e.nom, e.date_debut::text AS date_debut, e.date_fin::text AS date_fin
       FROM inscriptions i JOIN evenements e ON e.id = i.evenement_id
       WHERE i.membre_id = $1 ORDER BY e.date_debut ASC NULLS LAST, e.nom ASC`,
      [enfant.id],
    )).rows;
    result.push({ id: enfant.id, nom_complet: enfant.nom_complet, matricule: enfant.matricule, presences, suivis, camps_inscrits: campsInscrits });
  }
  return result;
});

// Clôture d'activité : une seule fois, puis chaque parent validé est
// notifié pour chacun de ses enfants — présent ou absent. Les enfants
// d'un autre établissement ne reçoivent pas de « absent » pour une
// activité d'établissement à laquelle ils ne pouvaient pas participer.
app.post('/presences/activite/:id/cloturer', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const activite = await resolveActivite(req.params.id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  const deja = (await q('SELECT activite_id FROM clotures_activite WHERE activite_id = $1', [activite.id])).rows[0];
  if (deja) throw httpError(409, 'Cette activité est déjà clôturée.');
  await q(`INSERT INTO clotures_activite (activite_id, cloture_par) VALUES ($1, $2)`, [activite.id, req.user.mid ?? null]);
  await audit(pool, req, 'activite.cloturee', 'clotures_activite', activite.id, { activite_nom: activite.nom });
  const presents = new Set((await q(`SELECT membre_id FROM presences WHERE activite_id = $1 AND statut = 'present'`, [activite.id])).rows.map((r) => r.membre_id));
  const liens = (await q(
    `SELECT l.parent_membre_id, l.enfant_membre_id, m.nom_complet AS enfant_nom, m.etablissement_id AS enfant_etablissement_id FROM liens_parent_enfant l JOIN membres m ON m.id = l.enfant_membre_id WHERE l.statut = 'valide'`,
  )).rows;
  for (const lien of liens) {
    if (activite.type === 'activite_etablissement' && lien.enfant_etablissement_id !== activite.etablissement_id) continue;
    const prenom = prenomDe(lien.enfant_nom);
    if (presents.has(lien.enfant_membre_id)) {
      await notifierMembre(lien.parent_membre_id, 'presence_enfant', `Activité terminée : ${prenom} était présent(e)`, `${prenom} était présent(e) à l'activité ${activite.nom}.`, 'activite', activite.id);
    } else {
      await notifierMembre(lien.parent_membre_id, 'presence_enfant', `${prenom} n'était pas présent(e) à ${activite.nom}`, `${prenom} n'a pas participé à l'activité ${activite.nom}.`, 'activite', activite.id);
    }
  }
  return reply.code(201).send({ cloturee: true });
});

app.post('/presences/:id/annuler', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const ligne = (
    await q(
      `SELECT p.*, m.etablissement_id AS membre_etablissement_id, m.nom_complet, m.matricule FROM presences p JOIN membres m ON m.id = p.membre_id WHERE p.id = $1`,
      [req.params.id],
    )
  ).rows[0];
  if (!ligne) throw httpError(404, 'Présence introuvable.');
  const activite = await resolveActivite(ligne.activite_id);
  if (!peutPresence(req, ligne.membre_etablissement_id, activite)) throw httpError(403, 'Accès refusé à cet établissement.');
  if (ligne.statut === 'annule') return ligne;
  const maj = await tx(async (c) => {
    const row = (await c.query(`UPDATE presences SET statut = 'annule' WHERE id = $1 RETURNING *`, [ligne.id])).rows[0];
    await auditPresence(c, req, 'presence.annuler', 'presences', ligne.id, {
      activite_id: ligne.activite_id,
      activite_nom: activite?.nom ?? '',
      membre_nom: ligne.nom_complet,
      matricule: ligne.matricule,
    });
    return row;
  });
  await notifierParentsEnfant(ligne.membre_id, 'presence_enfant', `Présence annulée pour ${prenomDe(ligne.nom_complet)}`, `La présence de ${prenomDe(ligne.nom_complet)} à l'activité ${activite?.nom ?? ''} a été annulée.`, 'activite', ligne.activite_id);
  return maj;
});

app.get('/presences', { preHandler: contenuG }, async (req) => {
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  return (
    await q(
      `SELECT p.id, p.activite_id, p.statut, p.scanne_le, p.methode,
         m.nom_complet, m.matricule,
         COALESCE(e.nom, a.titre, '') AS activite_nom,
         CASE WHEN e.id IS NOT NULL THEN 'evenement' ELSE 'activite_etablissement' END AS activite_type,
         s.nom_complet AS scanne_par_nom
       FROM presences p
       JOIN membres m ON m.id = p.membre_id
       LEFT JOIN evenements e ON e.id = p.activite_id
       LEFT JOIN activites_etablissement a ON a.id = p.activite_id
       LEFT JOIN membres s ON s.id = p.scanne_par
       WHERE ($1::uuid IS NULL OR m.etablissement_id = $1)
       ORDER BY p.scanne_le DESC LIMIT 500`,
      [perimetre],
    )
  ).rows;
});

app.get('/admin/membres', { preHandler: contenuG }, async (req) => {
  const demande = typeof req.query.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null;
  const filtre = req.user.role === 'admin_etablissement' ? req.user.eid : demande;
  // Sélecteur d'ajout manuel, 30 oct. 2026 : avec
  // inclure_sans_etablissement=1, l'administrateur d'établissement voit
  // aussi les membres sans établissement, qui n'appartiennent à aucun
  // périmètre. Sans ce paramètre, le comportement ne change pas, les
  // pages Membres et Cotisations restent strictes.
  const inclureSans = req.query.inclure_sans_etablissement === '1';
  // Cartes et fiches, 30 oct. 2026 : avec details=1, la liste
  // renvoie aussi la photo, la validité, l'inscription et le
  // contact, pour l'impression et l'export. Sans ce paramètre,
  // la réponse ne change pas. Sécurité, 22 nov. 2026 :
  // details=1 est réservé à l'administrateur général, un
  // administrateur d'établissement ne l'obtient plus.
  const details = req.query.details === '1';
  if (details && req.user.role !== 'admin_general') throw httpError(403, 'Accès refusé.');
  const colonnesDetails = details ? ', m.photo_donnees AS photo, m.valide_jusqua, m.inscrit_le, u.telephone, u.email' : '';
  // Sécurité, 22 nov. 2026 : périmètre nomination comme sur
  // le détail. Un administrateur nommé ne voit que les membres
  // inscrits à ses activités, jamais tout son établissement.
  // Sans nomination, le périmètre d'établissement ne change pas.
  const porteeNomination = await activitesPourPermission(req, 'camp.lire');
  return (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet, m.fonction, m.etablissement_id, e.nom AS etablissement,
         CASE WHEN EXISTS (SELECT 1 FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation' AND p.statut = 'confirme') THEN 'confirme'
              WHEN EXISTS (SELECT 1 FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation' AND p.statut = 'en_attente') THEN 'en_attente'
              ELSE 'aucune' END AS cotisation_statut,
         (SELECT max(cree_le) FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation') AS dernier_paiement_cotisation, u.role AS role_compte, u.etablissement_admin_id AS etablissement_admin_id, u.fonction_admin AS fonction_admin${colonnesDetails}
       FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN utilisateurs u ON u.id = m.utilisateur_id
       WHERE ($1::uuid IS NULL OR m.etablissement_id = $1 OR ($2::boolean AND m.etablissement_id IS NULL))
         AND ($3::uuid[] IS NULL OR EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = m.id AND i.evenement_id = ANY($3::uuid[])))
       ORDER BY m.nom_complet LIMIT 500`,
      [filtre, inclureSans, porteeNomination],
    )
  ).rows;
});

// Exports complets en Excel et PDF, correctif global 27 nov. 2026 :
// mêmes données, mêmes colonnes et même périmètre que les listes
// (la liste client est plafonnée, l'export serveur ne l'est pas,
// sauf le plafond de garde à 5 000 lignes pour les paiements).
// Lecture seule, aucune écriture en base. Format xlsx par défaut,
// pdf sur ?format=pdf. Les inscriptions exigent evenement_id,
// comme la liste, avec la même garde de nomination.
app.get('/admin/exports/:sujet', { preHandler: contenuG }, async (req, reply) => {
  const { sujet } = z.object({ sujet: z.enum(['membres', 'paiements', 'presences', 'inscriptions']) }).parse(req.params);
  const { format, evenement_id } = z.object({
    format: z.enum(['xlsx', 'pdf']).optional().default('xlsx'),
    evenement_id: z.string().uuid().optional(),
  }).parse(req.query);
  const dateIso = (v) => (v instanceof Date ? v.toISOString() : (v ?? ''));
  let titre;
  let colonnes;
  let lignes;
  if (sujet === 'membres') {
    const filtre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
    const porteeNomination = await activitesPourPermission(req, 'camp.lire');
    const rows = (
      await q(
        `SELECT m.matricule, m.nom_complet, m.fonction, u.role AS role_compte, e.nom AS etablissement
         FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id
         LEFT JOIN utilisateurs u ON u.id = m.utilisateur_id
         WHERE ($1::uuid IS NULL OR m.etablissement_id = $1)
           AND ($2::uuid[] IS NULL OR EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = m.id AND i.evenement_id = ANY($2::uuid[])))
         ORDER BY m.nom_complet LIMIT 500`,
        [filtre, porteeNomination],
      )
    ).rows;
    titre = 'Membres';
    colonnes = ['Nom', 'Matricule', 'Fonction', 'Rôle', 'Établissement'];
    lignes = rows.map((r) => [r.nom_complet ?? '', r.matricule ?? '', r.fonction ?? '', r.role_compte ?? '', r.etablissement ?? '']);
  } else if (sujet === 'paiements') {
    const porteeNomination = await activitesPourPermission(req, 'finances.lire');
    const rows = (
      await q(
        `SELECT p.reference, p.type, p.montant_fcfa, p.statut, p.moyen, m.nom_complet
         FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
         WHERE ($1::uuid IS NULL OR m.etablissement_id = $1)
           AND ($2::uuid[] IS NULL OR p.evenement_id = ANY($2::uuid[]) OR (p.type = 'camp' AND EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = (CASE WHEN p.beneficiaire_contact IS NOT NULL THEN p.beneficiaire_id ELSE p.membre_id END) AND i.evenement_id = ANY($2::uuid[]))))
         ORDER BY p.cree_le DESC LIMIT 5000`,
        [req.user.role === 'admin_etablissement' ? req.user.eid : null, porteeNomination],
      )
    ).rows;
    titre = 'Paiements';
    colonnes = ['Référence', 'Type', 'Montant FCFA', 'Statut', 'Moyen', 'Membre'];
    lignes = rows.map((r) => [r.reference ?? '', r.type ?? '', Number(r.montant_fcfa) || 0, r.statut ?? '', r.moyen ?? '', r.nom_complet ?? '']);
  } else if (sujet === 'presences') {
    const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
    const rows = (
      await q(
        `SELECT p.statut, p.scanne_le, p.methode, COALESCE(e.nom, a.titre, '') AS activite_nom, s.nom_complet AS scanne_par_nom
         FROM presences p JOIN membres m ON m.id = p.membre_id
         LEFT JOIN evenements e ON e.id = p.activite_id
         LEFT JOIN activites_etablissement a ON a.id = p.activite_id
         LEFT JOIN membres s ON s.id = p.scanne_par
         WHERE ($1::uuid IS NULL OR m.etablissement_id = $1)
         ORDER BY p.scanne_le DESC LIMIT 500`,
        [perimetre],
      )
    ).rows;
    titre = 'Présences';
    colonnes = ['Activité', 'Statut', 'Scanné le', 'Méthode', 'Scanné par'];
    lignes = rows.map((r) => [r.activite_nom ?? '', r.statut ?? '', dateIso(r.scanne_le), r.methode ?? '', r.scanne_par_nom ?? '']);
  } else {
    if (!evenement_id) throw httpError(400, 'Camp requis.');
    const ev = (await q('SELECT id, nom FROM evenements WHERE id = $1', [evenement_id])).rows[0];
    if (!ev) throw httpError(404, 'Camp introuvable.');
    await exigerNomination(req, 'camp.inscriptions', { evenementId: evenement_id, obligatoire: true });
    const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
    const inclureSans = req.user.role === 'admin_etablissement';
    const rows = (
      await q(
        `SELECT COALESCE(m.nom_complet, pe.nom_complet) AS nom_complet, m.matricule, i.inscrit_le,
                (NOT i.versements_requis OR (SELECT COALESCE(SUM(montant_fcfa), 0) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = COALESCE(i.membre_id, i.personne_externe_id) AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme') >= e.tarif_fcfa) AS pass_visible
         FROM inscriptions i LEFT JOIN membres m ON m.id = i.membre_id LEFT JOIN personnes_externes pe ON pe.id = i.personne_externe_id JOIN evenements e ON e.id = i.evenement_id
         WHERE i.evenement_id = $1 AND ($2::uuid IS NULL OR COALESCE(m.etablissement_id, pe.etablissement_id) = $2 OR ($3::boolean AND COALESCE(m.etablissement_id, pe.etablissement_id) IS NULL))
         ORDER BY COALESCE(m.nom_complet, pe.nom_complet)`,
        [evenement_id, perimetre, inclureSans],
      )
    ).rows;
    titre = `Inscriptions ${ev.nom}`;
    colonnes = ['Nom', 'Matricule', 'Inscrit le', 'Pass visible'];
    lignes = rows.map((r) => [r.nom_complet ?? '', r.matricule ?? '', dateIso(r.inscrit_le), r.pass_visible ? 'oui' : 'non']);
  }
  const tampon = format === 'pdf' ? await genererPdfExport(titre, colonnes, lignes) : genererXlsx(titre, colonnes, lignes);
  const mime = format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  return reply
    .header('Content-Type', mime)
    .header('Content-Disposition', `attachment; filename="${sujet}.${format}"`)
    .send(tampon);
});

// Carte d'un membre pour l'administration, 30 oct. 2026 : lecture
// seule, pour voir et imprimer la carte. Périmètre : général voit
// tout, établissement voit son établissement, et un membre sans
// établissement reste visible en lecture seule pour
// l'administration d'établissement, comme pour les présences
// d'un camp communautaire. Les exports en masse, eux, restent
// stricts : sans établissement, pas de périmètre d'établissement.
app.get('/admin/membres/:id', { preHandler: contenuG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet, m.fonction, m.etablissement_id, e.nom AS etablissement,
         m.photo_donnees AS photo, m.valide_jusqua, m.inscrit_le, m.statut_adhesion, to_char(m.date_naissance, 'YYYY-MM-DD') AS date_naissance, u.telephone, u.email,
         CASE WHEN EXISTS (SELECT 1 FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation' AND p.statut = 'confirme') THEN 'confirme'
              WHEN EXISTS (SELECT 1 FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation' AND p.statut = 'en_attente') THEN 'en_attente'
              ELSE 'aucune' END AS cotisation_statut, u.role AS role_compte, u.etablissement_admin_id AS etablissement_admin_id, u.fonction_admin AS fonction_admin
       FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN utilisateurs u ON u.id = m.utilisateur_id
       WHERE m.id = $1`,
      [id],
    )
  ).rows[0];
  if (!r) throw httpError(404, 'Membre introuvable.');
  // Sécurité, 22 nov. 2026 : motif 404 unique, comme en
  // messagerie. Un 403 révélerait l'existence du membre et
  // son établissement à un administrateur d'un autre
  // établissement.
  if (req.user.role === 'admin_etablissement' && r.etablissement_id != null && r.etablissement_id !== req.user.eid) {
    throw httpError(404, 'Membre introuvable.');
  }
  // Sécurité, 22 nov. 2026 : même périmètre nomination que
  // sur la liste. Un administrateur nommé ne lit que les
  // membres de ses activités ou de son établissement nommé.
  await exigerNomination(req, 'camp.lire', { membreId: r.id });
  return r;
});

// Correction du nom d'un membre, carte 108, 8 nov. 2026 :
// aujourd'hui personne ne peut corriger un nom, ni le membre
// depuis son Profil, ni l'administrateur. L'administrateur
// général corrige partout, l'administrateur d'établissement
// seulement pour les membres de son établissement, même
// périmètre que la lecture ci-dessus. Champs : nom complet
// (règle des deux mots, carte 101), date de naissance,
// établissement. Le matricule n'est jamais recalculé, ses
// initiales sont figées à l'attribution. Le nom est aussi corrigé
// dans bureau_membres pour les lignes liées par membre_id, sinon
// le Bureau garderait l'ancien nom. La correction est journalisée
// en audit avec le fait seulement, jamais les valeurs. Le membre voit
// le nom corrigé à la prochaine synchronisation, sans nouveau
// paiement si sa carte était déjà validée. Le QR de la carte ne
// code que le matricule, donc il ne change pas ; le QR du profil
// code matricule, nom et ministère, donc il change avec le nom.
// Le nom d'une attestation déjà délivrée est lu en direct dans
// membres au moment de l'affichage, donc il suit la correction
// à la réouverture, rien à changer là.
app.put('/admin/membres/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const corps = correctionMembreSchema.parse(req.body ?? {});
  const ancien = (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet, to_char(m.date_naissance, 'YYYY-MM-DD') AS date_naissance, m.etablissement_id
       FROM membres m WHERE m.id = $1`,
      [id],
    )
  ).rows[0];
  if (!ancien) throw httpError(404, 'Membre introuvable.');
  if (
    !correctionMembreAutorisee({
      role: req.user.role,
      eidAdmin: req.user.eid,
      membreEtablissementId: ancien.etablissement_id,
      nouvelEtablissementId: 'etablissement_id' in corps ? corps.etablissement_id : undefined,
    })
  ) {
    throw httpError(403, 'Accès refusé à cet établissement.');
  }
  if (corps.etablissement_id) {
    const etab = (await q('SELECT id FROM etablissements WHERE id = $1', [corps.etablissement_id])).rows[0];
    if (!etab) throw httpError(404, 'Établissement introuvable.');
  }
  const corrige = await tx(async (c) => {
    const champs = [];
    const valeurs = [];
    let n = 1;
    if (corps.nom_complet !== undefined) {
      champs.push(`nom_complet = $${n++}`);
      valeurs.push(corps.nom_complet);
    }
    if (corps.date_naissance !== undefined) {
      champs.push(`date_naissance = $${n++}`);
      valeurs.push(corps.date_naissance);
    }
    if (corps.etablissement_id !== undefined) {
      champs.push(`etablissement_id = $${n++}`);
      valeurs.push(corps.etablissement_id);
    }
    valeurs.push(id);
    await c.query(`UPDATE membres SET ${champs.join(', ')} WHERE id = $${n}`, valeurs);
    if (corps.nom_complet !== undefined) {
      await c.query('UPDATE bureau_membres SET nom = $2 WHERE membre_id = $1', [id, corps.nom_complet]);
    }
    // Nominations et bureaux, 21 nov. 2026 : quand l'établissement
    // du membre change, son entrée au Bureau suit, comme le nom
    // le fait déjà. Les nominations, elles, ne bougent pas
    // toutes seules : l'écran de déplacement les liste et
    // l'administrateur tranche par nomination.
    if (corps.etablissement_id !== undefined) {
      await c.query('UPDATE bureau_membres SET etablissement_id = $2 WHERE membre_id = $1', [id, corps.etablissement_id]);
    }
    await audit(c, req, 'membre.corrige', 'membres', ancien.id, correctionMembreDetails(ancien, corps));
    return {
      id: ancien.id,
      matricule: ancien.matricule,
      nom_complet: corps.nom_complet ?? ancien.nom_complet,
      date_naissance: corps.date_naissance !== undefined ? corps.date_naissance : ancien.date_naissance,
      etablissement_id: corps.etablissement_id !== undefined ? corps.etablissement_id : ancien.etablissement_id,
    };
  });
  return { ok: true, ...corrige };
});

// Réinitialisation assistée, 29 oct. 2026 : administrateur général
// seul, jamais un simple masquage, le garde refuse les autres rôles.
// Le temporaire est renvoyé une seule fois, par TLS, à
// l'administrateur qui le transmet hors application. Il n'est jamais
// journalisé, ni en clair ni en empreinte, et n'est jamais stocké en
// clair : seule son empreinte remplace l'ancien mot de passe.
// Les sessions existantes sont révoquées en même temps.
app.post('/admin/membres/:id/mot-de-passe-temporaire', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const temporaire = genererMotDePasseTemporaire();
  const hash = await argon2.hash(temporaire, { type: argon2.argon2id });
  const m = await tx(async (c) => {
    const row = (
      await c.query('SELECT id, matricule, nom_complet, utilisateur_id FROM membres WHERE id = $1', [id])
    ).rows[0];
    if (!row) throw httpError(404, 'Membre introuvable.');
    await c.query(
      `UPDATE utilisateurs SET mot_de_passe_hash = $2, mot_de_passe_temporaire_expire_le = now() + interval '24 hours' WHERE id = $1`,
      [row.utilisateur_id, hash],
    );
    await c.query('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1 AND NOT revoque', [row.utilisateur_id]);
    await audit(c, req, 'motdepasse.temporaire_genere', 'membres', row.id, { matricule: row.matricule });
    return row;
  });
  return { matricule: m.matricule, nom_complet: m.nom_complet, mot_de_passe_temporaire: temporaire, valable_heures: 24 };
});

// Fonctions clés d'administrateur, carte 75 : catalogue servi par
// le serveur, pour que l'application nomme avec les mêmes libellés
// et les mêmes droits que le serveur applique. Administrateur
// général seul. Si la table n'a pas encore été remplie, la
// constante FONCTIONS_ADMIN sert de repli, jamais une liste vide.
app.get('/admin/fonctions-admin', { preHandler: adminG }, async () => {
  try {
    const rows = (await q('SELECT code, libelle, description, droits, permissions, ordre FROM fonctions_admin WHERE actif ORDER BY ordre, code')).rows;
    if (rows.length) return rows;
  } catch (_) {}
  return FONCTIONS_ADMIN;
});

// Nommer ou révoquer un administrateur, 1er nov. 2026 :
// administrateur général seul, jamais le dernier général,
// jamais son propre compte, jamais un général ciblé. La
// nomination met le rôle admin_etablissement avec l'établissement
// administré, qui doit exister. La révocation remet le rôle
// membre et efface l'établissement administré, ainsi que la
// fonction clé. Carte 75 : la nomination peut aussi donner une
// fonction clé (modérateur, éditeur, responsable, trésorier), ou
// aucune, et dans ce cas l'administrateur garde tout contenuG,
// comme avant. Changer la fonction seule, sans changer le rôle
// ni l'établissement, passe par la même route. Le nouveau rôle,
// comme la nouvelle fonction, s'applique au prochain jeton, au
// plus 15 minutes plus tard.
app.post('/admin/membres/:id/role', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = z.object({ role: z.enum(['membre', 'admin_etablissement']), etablissement_id: z.string().uuid().optional().nullable(), fonction_admin: z.enum([...CODES_FONCTION_ADMIN, '']).optional().nullable() }).parse(req.body ?? {});
  if (id === req.user.mid) throw httpError(400, 'Vous ne pouvez pas changer votre propre rôle.');
  const row = (
    await q('SELECT m.id, m.matricule, m.nom_complet, m.utilisateur_id, u.role, u.fonction_admin FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1', [id])
  ).rows[0];
  if (!row) throw httpError(404, 'Membre introuvable.');
  if (row.role === 'admin_general') throw httpError(400, 'Le rôle d’un administrateur général ne change pas ici.');
  let etablissementId = null;
  let fonctionAdmin = null;
  if (body.role === 'admin_etablissement') {
    if (!body.etablissement_id) throw httpError(400, 'Choisissez un établissement.');
    // Sécurité, 22 nov. 2026 : tout nouvel administrateur
    // d'établissement porte une fonction clé, jamais de plein
    // accès sans fonction. Les comptes existants sans fonction
    // gardent leur accès jusqu'à leur prochaine nomination, le
    // changement ne touche que cette route de promotion.
    if (!body.fonction_admin) throw httpError(400, 'Choisissez une fonction clé.');
    const etab = (await q('SELECT id FROM etablissements WHERE id = $1', [body.etablissement_id])).rows[0];
    if (!etab) throw httpError(404, 'Établissement introuvable.');
    etablissementId = body.etablissement_id;
    fonctionAdmin = body.fonction_admin ? body.fonction_admin : null;
  }
  await q('UPDATE utilisateurs SET role = $2, etablissement_admin_id = $3, fonction_admin = $4 WHERE id = $1', [row.utilisateur_id, body.role, etablissementId, fonctionAdmin]);
  // MO-3, 22 nov. 2026 : le changement de rôle révoque les jetons
  // de renouvellement, le nouveau rôle s'applique immédiatement,
  // pas seulement au prochain renouvellement.
  await q('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1 AND NOT revoque', [row.utilisateur_id]);
  await audit(pool, req, 'administrateur.role_change', 'membres', row.id, { matricule: row.matricule, role: body.role, etablissement_id: etablissementId, fonction_admin: fonctionAdmin });
  return { ok: true, id: row.id, matricule: row.matricule, role: body.role, etablissement_id: etablissementId, fonction_admin: fonctionAdmin };
});

// Nominations, carte 126 tranche 2 : une nomination lie un membre
// à une fonction, pour la grande structure ou pour une activité,
// avec un début, une fin et une révocation. Nominations et bureaux,
// 21 nov. 2026 : troisième portée, l'établissement. Une personne
// peut cumuler plusieurs nominations. L'administrateur général seul
// crée, modifie et révoque, comme pour les rôles, et la fonction
// clé (utilisateurs.fonction_admin) est gardée pour compatibilité.
// Pas de doublon actif : même membre, même portée, même activité
// ou même établissement, même fonction. Les gardes par activité
// restent pour les tranches suivantes, ces routes ne font que
// gérer les nominations.
app.post('/admin/nominations', { preHandler: adminG }, async (req, reply) => {
  const body = z.object({
    membre_id: z.string().uuid().optional().nullable(),
    // Correctif global 27 nov. 2026 : une personne hors système
    // (fiche personnes_externes) peut être nommée à un poste,
    // sans compte application. Exactement l'un des deux.
    personne_externe_id: z.string().uuid().optional().nullable(),
    portee: z.enum(['structure', 'etablissement', 'activite']),
    evenement_id: z.string().uuid().optional().nullable(),
    etablissement_id: z.string().uuid().optional().nullable(),
    fonction_code: z.string().min(1),
    debute_le: z.string().optional().nullable(),
    finit_le: z.string().optional().nullable(),
  }).parse(req.body ?? {});
  if (body.portee === 'structure' && (body.evenement_id || body.etablissement_id)) throw httpError(400, 'Une nomination de structure ne porte ni sur une activité ni sur un établissement.');
  if (body.portee === 'etablissement' && !body.etablissement_id) throw httpError(400, 'Choisissez un établissement.');
  if (body.portee === 'etablissement' && body.evenement_id) throw httpError(400, 'Une nomination d’établissement ne porte pas sur une activité.');
  if (body.portee === 'activite' && !body.evenement_id) throw httpError(400, 'Choisissez une activité.');
  if (body.portee === 'activite' && body.etablissement_id) throw httpError(400, 'Une nomination d’activité ne porte pas sur un établissement.');
  if (!body.membre_id && !body.personne_externe_id) throw httpError(400, 'Choisissez un membre ou une personne hors système.');
  if (body.membre_id && body.personne_externe_id) throw httpError(400, 'Choisissez un membre ou une personne hors système, pas les deux.');
  let membre = null; let externe = null;
  if (body.membre_id) {
    membre = (await q('SELECT id, matricule FROM membres WHERE id = $1', [body.membre_id])).rows[0];
    if (!membre) throw httpError(404, 'Membre introuvable.');
  } else {
    externe = (await q('SELECT id, nom_complet FROM personnes_externes WHERE id = $1', [body.personne_externe_id])).rows[0];
    if (!externe) throw httpError(404, 'Personne introuvable.');
  }
  if (body.evenement_id) {
    const ev = (await q('SELECT id FROM evenements WHERE id = $1', [body.evenement_id])).rows[0];
    if (!ev) throw httpError(404, 'Activité introuvable.');
  }
  if (body.etablissement_id) {
    const etab = (await q('SELECT id FROM etablissements WHERE id = $1', [body.etablissement_id])).rows[0];
    if (!etab) throw httpError(404, 'Établissement introuvable.');
  }
  const fonction = (await q('SELECT code FROM fonctions_admin WHERE code = $1 AND actif', [body.fonction_code])).rows[0];
  if (!fonction) throw httpError(404, 'Fonction introuvable.');
  const debute = body.debute_le ? new Date(body.debute_le) : new Date();
  const finit = body.finit_le ? new Date(body.finit_le) : null;
  if (Number.isNaN(debute.getTime()) || (finit && Number.isNaN(finit.getTime()))) throw httpError(400, 'Dates invalides.');
  if (finit && finit <= debute) throw httpError(400, 'La fin doit être après le début.');
  const doublon = (await q(
    body.membre_id
      ? 'SELECT id FROM nominations WHERE membre_id = $1 AND portee = $2 AND evenement_id IS NOT DISTINCT FROM $3 AND etablissement_id IS NOT DISTINCT FROM $4 AND fonction_code = $5 AND NOT revoque AND (finit_le IS NULL OR finit_le > now())'
      : 'SELECT id FROM nominations WHERE personne_externe_id = $1 AND portee = $2 AND evenement_id IS NOT DISTINCT FROM $3 AND etablissement_id IS NOT DISTINCT FROM $4 AND fonction_code = $5 AND NOT revoque AND (finit_le IS NULL OR finit_le > now())',
    [body.membre_id ?? body.personne_externe_id, body.portee, body.evenement_id ?? null, body.etablissement_id ?? null, body.fonction_code])).rows[0];
  if (doublon) throw httpError(409, 'Cette nomination existe déjà.');
  const [sql, params] = insertSql('nominations', { membre_id: body.membre_id ?? null, personne_externe_id: body.personne_externe_id ?? null, portee: body.portee, evenement_id: body.evenement_id ?? null, etablissement_id: body.etablissement_id ?? null, fonction_code: body.fonction_code, debute_le: debute.toISOString(), finit_le: finit ? finit.toISOString() : null, cree_par: req.user.sub });
  const row = await tx(async (c) => {
    const r = (await c.query(sql, params)).rows[0];
    await audit(c, req, 'nomination.creee', 'nominations', r.id, { membre_id: membre?.id ?? null, personne_externe_id: externe?.id ?? null, matricule: membre?.matricule ?? null, portee: body.portee, evenement_id: body.evenement_id ?? null, etablissement_id: body.etablissement_id ?? null, fonction_code: body.fonction_code });
    return r;
  });
  return reply.code(201).send(row);
});

app.put('/admin/nominations/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({
    fonction_code: z.string().min(1).optional(),
    debute_le: z.string().optional().nullable(),
    finit_le: z.string().optional().nullable(),
    // Nominations et bureaux, 21 nov. 2026 : changer
    // l'établissement d'une nomination d'établissement, quand
    // la personne déménage et que sa nomination la suit.
    // La portée ne change pas ici, seule la fonction, les dates
    // et l'établissement se modifient.
    etablissement_id: z.string().uuid().optional(),
  }).parse(req.body ?? {}));
  const existante = (await q('SELECT * FROM nominations WHERE id = $1', [id])).rows[0];
  if (!existante) throw httpError(404, 'Nomination introuvable.');
  if (existante.revoque) throw httpError(409, 'Nomination révoquée, elle ne se modifie plus.');
  if (body.fonction_code) {
    const fonction = (await q('SELECT code FROM fonctions_admin WHERE code = $1 AND actif', [body.fonction_code])).rows[0];
    if (!fonction) throw httpError(404, 'Fonction introuvable.');
  }
  if ('etablissement_id' in body) {
    if (existante.portee !== 'etablissement') throw httpError(400, 'Seule une nomination d’établissement peut changer d’établissement.');
    const etab = (await q('SELECT id FROM etablissements WHERE id = $1', [body.etablissement_id])).rows[0];
    if (!etab) throw httpError(404, 'Établissement introuvable.');
  }
  const debute = body.debute_le ? new Date(body.debute_le) : new Date(existante.debute_le);
  const finit = 'finit_le' in body ? (body.finit_le ? new Date(body.finit_le) : null) : (existante.finit_le ? new Date(existante.finit_le) : null);
  if (Number.isNaN(debute.getTime()) || (finit && Number.isNaN(finit.getTime()))) throw httpError(400, 'Dates invalides.');
  if (finit && finit <= debute) throw httpError(400, 'La fin doit être après le début.');
  const maj = {};
  if (body.fonction_code) maj.fonction_code = body.fonction_code;
  if (body.debute_le) maj.debute_le = debute.toISOString();
  if ('finit_le' in body) maj.finit_le = finit ? finit.toISOString() : null;
  if ('etablissement_id' in body) maj.etablissement_id = body.etablissement_id;
  if (!Object.keys(maj).length) throw httpError(400, 'Aucune modification.');
  const fonctionFinale = maj.fonction_code ?? existante.fonction_code;
  const etablissementFinal = 'etablissement_id' in maj ? maj.etablissement_id : existante.etablissement_id;
  const doublon = (await q(
    existante.membre_id
      ? 'SELECT id FROM nominations WHERE id <> $1 AND membre_id = $2 AND portee = $3 AND evenement_id IS NOT DISTINCT FROM $4 AND etablissement_id IS NOT DISTINCT FROM $5 AND fonction_code = $6 AND NOT revoque AND (finit_le IS NULL OR finit_le > now())'
      : 'SELECT id FROM nominations WHERE id <> $1 AND personne_externe_id = $2 AND portee = $3 AND evenement_id IS NOT DISTINCT FROM $4 AND etablissement_id IS NOT DISTINCT FROM $5 AND fonction_code = $6 AND NOT revoque AND (finit_le IS NULL OR finit_le > now())',
    [id, existante.membre_id ?? existante.personne_externe_id, existante.portee, existante.evenement_id, etablissementFinal, fonctionFinale])).rows[0];
  if (doublon) throw httpError(409, 'Cette nomination existe déjà.');
  const [sql, params] = updateSql('nominations', id, maj);
  const row = await tx(async (c) => {
    const r = (await c.query(sql, params)).rows[0];
    if (!r) throw httpError(404, 'Nomination introuvable.');
    await audit(c, req, 'nomination.modifiee', 'nominations', id, maj);
    return r;
  });
  return row;
});

app.post('/admin/nominations/:id/revoquer', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const existante = (await q('SELECT id, revoque FROM nominations WHERE id = $1', [id])).rows[0];
  if (!existante) throw httpError(404, 'Nomination introuvable.');
  if (existante.revoque) throw httpError(409, 'Nomination déjà révoquée.');
  const row = await tx(async (c) => {
    const r = (await c.query('UPDATE nominations SET revoque = true WHERE id = $1 RETURNING *', [id])).rows[0];
    await audit(c, req, 'nomination.revoquee', 'nominations', id, {});
    return r;
  });
  return row;
});

app.get('/admin/nominations', { preHandler: adminG }, async (req) => {
  const filtre = z.object({
    membre_id: z.string().uuid().optional(),
    evenement_id: z.string().uuid().optional(),
    etablissement_id: z.string().uuid().optional(),
    portee: z.enum(['structure', 'etablissement', 'activite']).optional(),
    actives: z.enum(['true', 'false']).optional(),
  }).parse(req.query ?? {});
  const conditions = [];
  const params = [];
  if (filtre.membre_id) { params.push(filtre.membre_id); conditions.push(`n.membre_id = $${params.length}`); }
  if (filtre.evenement_id) { params.push(filtre.evenement_id); conditions.push(`n.evenement_id = $${params.length}`); }
  if (filtre.etablissement_id) { params.push(filtre.etablissement_id); conditions.push(`n.etablissement_id = $${params.length}`); }
  if (filtre.portee) { params.push(filtre.portee); conditions.push(`n.portee = $${params.length}`); }
  if (filtre.actives === 'true') conditions.push(`NOT n.revoque AND (n.finit_le IS NULL OR n.finit_le > now())`);
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const rows = (await q(`SELECT n.*, f.libelle AS fonction_libelle, f.permissions, COALESCE(m.nom_complet, pe.nom_complet) AS nom_complet, m.matricule, e.nom AS evenement_nom, et.nom AS etablissement_nom, me.nom AS membre_etablissement, pe.nom_complet AS personne_externe_nom, pe.contact AS personne_externe_contact FROM nominations n JOIN fonctions_admin f ON f.code = n.fonction_code LEFT JOIN membres m ON m.id = n.membre_id LEFT JOIN personnes_externes pe ON pe.id = n.personne_externe_id LEFT JOIN evenements e ON e.id = n.evenement_id LEFT JOIN etablissements et ON et.id = n.etablissement_id LEFT JOIN etablissements me ON me.id = COALESCE(m.etablissement_id, pe.etablissement_id) ${where} ORDER BY n.cree_le DESC`, params)).rows;
  return rows;
});

// Mes nominations, carte 126 tranche 2 : le membre voit ses
// nominations actives, titre, activité, niveau, modules
// accessibles, dates de début et de fin. Expirées et révoquées
// n'apparaissent plus, l'effet est immédiat. Nominations et
// bureaux, 21 nov. 2026 : le nom de l'établissement est renvoyé
// pour la portée établissement, pour Mes responsabilités.
app.get('/moi/nominations', { preHandler: membreG }, async (req) => {
  const rows = (await q(`SELECT n.id, n.portee, n.evenement_id, n.etablissement_id, n.fonction_code, f.libelle AS fonction_libelle, f.permissions, n.debute_le, n.finit_le, e.nom AS evenement_nom, et.nom AS etablissement_nom FROM nominations n JOIN fonctions_admin f ON f.code = n.fonction_code LEFT JOIN evenements e ON e.id = n.evenement_id LEFT JOIN etablissements et ON et.id = n.etablissement_id WHERE n.membre_id = $1 AND NOT n.revoque AND (n.finit_le IS NULL OR n.finit_le > now()) ORDER BY n.portee, n.debute_le`, [req.user.mid])).rows;
  return rows;
});

// ───────────────────────── Personnes hors système, correctif
// global 27 nov. 2026 ─────────────────────────
// Fiche personne sans compte application : nom, fonction,
// contact, établissement et rôle admin désigné. Utilisable
// dans Nominations, Planning des responsables, Département
// scolaire et inscriptions au camp. La suppression refuse
// quand la personne est utilisée quelque part.
const personneExterneCorps = z.object({
  nom_complet: z.string().trim().min(1).max(200),
  fonction: z.string().trim().max(100).optional().nullable(),
  contact: z.string().trim().max(200).optional().nullable(),
  etablissement_id: z.string().uuid().optional().nullable(),
  role_admin: z.enum(['admin_general', 'admin_etablissement']).optional().nullable(),
});

async function personneExterneParId(id) {
  return (await q(`SELECT p.*, e.nom AS etablissement_nom FROM personnes_externes p LEFT JOIN etablissements e ON e.id = p.etablissement_id WHERE p.id = $1`, [id])).rows[0] ?? null;
}

function formaterPersonneExterne(row) {
  return {
    id: row.id,
    nom_complet: row.nom_complet,
    fonction: row.fonction,
    contact: row.contact ?? '',
    etablissement_id: row.etablissement_id ?? null,
    etablissement_nom: row.etablissement_nom ?? null,
    role_admin: row.role_admin ?? null,
    cree_le: row.cree_le,
  };
}

app.get('/admin/personnes-externes', { preHandler: adminG }, async () => {
  const rows = (await q(`SELECT p.*, e.nom AS etablissement_nom FROM personnes_externes p LEFT JOIN etablissements e ON e.id = p.etablissement_id ORDER BY p.nom_complet`)).rows;
  return rows.map(formaterPersonneExterne);
});

app.post('/admin/personnes-externes', { preHandler: adminG }, async (req, reply) => {
  const b = personneExterneCorps.parse(req.body ?? {});
  if (b.etablissement_id) {
    const etab = (await q('SELECT id FROM etablissements WHERE id = $1', [b.etablissement_id])).rows[0];
    if (!etab) throw httpError(404, 'Établissement introuvable.');
  }
  if (b.role_admin === 'admin_etablissement' && !b.etablissement_id) throw httpError(400, 'Choisissez un établissement pour un administrateur d’établissement.');
  const [sql, params] = insertSql('personnes_externes', { nom_complet: b.nom_complet, fonction: b.fonction ?? 'Membre', contact: b.contact ?? '', etablissement_id: b.etablissement_id ?? null, role_admin: b.role_admin ?? null, cree_par: req.user.sub });
  const row = await tx(async (c) => {
    const r = (await c.query(sql, params)).rows[0];
    await audit(c, req, 'personne_externe.creee', 'personnes_externes', r.id, { nom_complet: b.nom_complet });
    return r;
  });
  return reply.code(201).send(formaterPersonneExterne(await personneExterneParId(row.id)));
});

app.put('/admin/personnes-externes/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(personneExterneCorps.partial().parse(req.body ?? {}));
  const existante = await personneExterneParId(id);
  if (!existante) throw httpError(404, 'Personne introuvable.');
  if ('etablissement_id' in body && body.etablissement_id) {
    const etab = (await q('SELECT id FROM etablissements WHERE id = $1', [body.etablissement_id])).rows[0];
    if (!etab) throw httpError(404, 'Établissement introuvable.');
  }
  if (Object.keys(body).length === 0) throw httpError(400, 'Aucune modification.');
  const roleFinal = 'role_admin' in body ? body.role_admin : existante.role_admin;
  const etabFinal = 'etablissement_id' in body ? body.etablissement_id : existante.etablissement_id;
  if (roleFinal === 'admin_etablissement' && !etabFinal) throw httpError(400, 'Choisissez un établissement pour un administrateur d’établissement.');
  const [sql, params] = updateSql('personnes_externes', id, { ...body, modifie_le: new Date().toISOString() });
  const row = await tx(async (c) => {
    const r = (await c.query(sql, params)).rows[0];
    if (!r) throw httpError(404, 'Personne introuvable.');
    await audit(c, req, 'personne_externe.modifiee', 'personnes_externes', id, body);
    return r;
  });
  return formaterPersonneExterne(await personneExterneParId(row.id));
});

app.delete('/admin/personnes-externes/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const existante = await personneExterneParId(id);
  if (!existante) throw httpError(404, 'Personne introuvable.');
  const usages = (await q(`SELECT (SELECT COUNT(*) FROM nominations WHERE personne_externe_id = $1) + (SELECT COUNT(*) FROM plannings_responsables WHERE personne_externe_id = $1) + (SELECT COUNT(*) FROM suivis_scolaires WHERE personne_externe_id = $1) + (SELECT COUNT(*) FROM inscriptions WHERE personne_externe_id = $1) AS n`, [id])).rows[0]?.n ?? 0;
  if (usages > 0) throw httpError(409, 'Cette personne est utilisée, elle ne peut pas être supprimée.');
  await tx(async (c) => {
    await c.query('DELETE FROM personnes_externes WHERE id = $1', [id]);
    await audit(c, req, 'personne_externe.supprimee', 'personnes_externes', id, { nom_complet: existante.nom_complet });
  });
  return { ok: true };
});


// Analyse d'un import de membres par CSV, carte 74, 7 nov. 2026 :
// la dernière vérification avant publication, demandée par Axel.
// Même garde que l'import (contenuG), mêmes règles ligne par
// ligne, mais sans aucune création : ni compte, ni matricule, ni
// temporaire, ni carte, ni paiement. La réponse ne contient aucun
// contact déjà en base, seulement le statut de chaque ligne du
// fichier (prête, doublon, erreur) et son motif, pour que
// l'application affiche l'écran de relecture et laisse corriger
// ou décocher avant de publier. La publication repasse par
// POST /admin/membres/import, qui revalide tout côté serveur.
app.post('/admin/membres/analyser', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const corps = z
    .object({
      lignes: z
        .array(
          z.object({
            nom_complet: z.string(),
            telephone: z.string().optional(),
            email: z.string().optional(),
            etablissement: z.string().optional(),
            fonction: z.string().optional(),
            date_naissance: z.string().optional(),
          }),
        )
        .min(1)
        .max(500),
    })
    .parse(req.body);
  const etablissements = (await q('SELECT id, nom FROM etablissements')).rows;
  // Contacts déjà en base, normalisés des deux formes (affichée
  // et canonique), pour que les variantes d'un même numéro se
  // reconnaissent comme un doublon. Ils ne quittent jamais le
  // serveur : seule la réponse par ligne en dépend.
  const telephonesExistants = new Set();
  const emailsExistants = new Set();
  for (const u of (await q('SELECT telephone, email FROM utilisateurs WHERE telephone IS NOT NULL OR email IS NOT NULL')).rows) {
    if (u.telephone) {
      telephonesExistants.add(normalizePhoneServer(u.telephone));
      telephonesExistants.add(displayPhoneServer(u.telephone));
    }
    if (u.email) emailsExistants.add(String(u.email).trim().toLowerCase());
  }
  return analyserMembresImport(corps.lignes, {
    etablissements,
    fonctions: FONCTIONS_MEMBRE,
    perimetreEtablissementId: req.user.role === 'admin_etablissement' ? req.user.eid : null,
    telephonesExistants,
    emailsExistants,
    normaliserTelephone: normalizePhoneServer,
    afficherTelephone: displayPhoneServer,
    variantesTelephone: phoneVariantsServer,
  });
});


// Import de membres par CSV, 31 oct. 2026 : création de comptes
// en masse depuis un fichier CSV, ordinateur seulement côté
// client. La garde contenuG admet l'administrateur général et
// l'administrateur d'établissement ; le périmètre se joue ligne
// par ligne : l'administrateur d'établissement ne peut importer
// que pour son propre établissement, toute autre ligne est
// rejetée avec son motif. Chaque ligne est validée comme une
// inscription (normalisation téléphone et e-mail identique,
// fonction parmi la liste des 11, établissement résolu par nom,
// date de naissance réelle au format AAAA-MM-JJ). Un doublon par
// téléphone ou e-mail est ignoré, jamais écrasé, jamais doublé.
// Le matricule vient de la séquence existante, jamais de max+1.
// Le mot de passe est un temporaire au format de la
// réinitialisation assistée (12 caractères en 3 groupes de 4,
// 24 heures, changement forcé au premier écran), renvoyé une
// seule fois dans la réponse, jamais journalisé. L'import ne
// crée ni paiement, ni cotisation, ni carte. Limite : 500 lignes.
app.post('/admin/membres/import', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  // Carte 126 tranche 3 : le secrétariat et la direction
  // enregistrent des membres par nomination de structure, un
  // responsable nommé pour une activité seulement ne peut pas.
  await exigerNomination(req, 'membres.inscrire');
  const corps = z
    .object({
      lignes: z
        .array(
          z.object({
            nom_complet: z.string(),
            telephone: z.string().optional(),
            email: z.string().optional(),
            etablissement: z.string().optional(),
            fonction: z.string().optional(),
            date_naissance: z.string().optional(),
          }),
        )
        .min(1)
        .max(500),
    })
    .parse(req.body);
  const etablissements = (await q('SELECT id, nom FROM etablissements')).rows;
  const resultats = [];
  let importes = 0;
  let ignores = 0;
  let rejetes = 0;
  const vusTelephone = new Set();
  const vusEmail = new Set();
  for (let i = 0; i < corps.lignes.length; i++) {
    const l = corps.lignes[i];
    // Carte 125, 10 nov. 2026 : comme à l'inscription, le nom
    // importé est enregistré en majuscules.
    const nom = nomCompletMajuscules(l.nom_complet);
    const base = { ligne: i + 1, nom };
    const rejeter = (motif) => {
      rejetes++;
      resultats.push({ ...base, statut: 'rejete', motif });
    };
    if (nom.length < 2 || nom.length > 120) {
      rejeter('Nom complet invalide.');
      continue;
    }
    // Carte 101, 8 nov. 2026 : comme à l'inscription, un seul mot
    // ne suffit pas, la ligne est rejetée, jamais importée.
    if (!nomCompletDeuxMots(nom)) {
      rejeter('Nom complet incomplet : écris ton prénom et ton nom.');
      continue;
    }
    const telephoneBrut = (l.telephone ?? '').trim();
    const emailBrut = (l.email ?? '').trim().toLowerCase();
    if (!telephoneBrut && !emailBrut) {
      rejeter('Un téléphone ou un e-mail est requis.');
      continue;
    }
    if (telephoneBrut && (telephoneBrut.length < 6 || telephoneBrut.length > 20)) {
      rejeter('Téléphone invalide.');
      continue;
    }
    if (emailBrut && !z.string().email().safeParse(emailBrut).success) {
      rejeter('E-mail invalide.');
      continue;
    }
    const telephone = telephoneBrut ? displayPhoneServer(telephoneBrut) : null;
    const email = emailBrut || null;
    let dateNaissance = null;
    const dateBrute = (l.date_naissance ?? '').trim();
    if (dateBrute) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateBrute)) {
        rejeter('Date de naissance invalide.');
        continue;
      }
      const [y, mo, d] = dateBrute.split('-').map(Number);
      const dt = new Date(Date.UTC(y, mo - 1, d));
      if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) {
        rejeter('Date de naissance invalide.');
        continue;
      }
      dateNaissance = dateBrute;
    }
    const fonctionBrute = (l.fonction ?? '').trim();
    const fonction = fonctionBrute === '' ? 'Membre' : fonctionBrute;
    if (!FONCTIONS_MEMBRE.includes(fonction)) {
      rejeter('Fonction inconnue.');
      continue;
    }
    let etablissementId = null;
    const etabNom = (l.etablissement ?? '').trim();
    if (etabNom) {
      const trouve = etablissements.find((e) => e.nom.toLowerCase() === etabNom.toLowerCase());
      if (!trouve) {
        rejeter('Établissement inconnu.');
        continue;
      }
      etablissementId = trouve.id;
    }
    if (req.user.role === 'admin_etablissement' && etablissementId !== req.user.eid) {
      rejeter('Cet établissement ne fait pas partie de votre périmètre.');
      continue;
    }
    // Doublon dans le fichier lui-même : le contact a déjà été
    // rencontré sur une ligne précédente du même fichier, qui a
    // passé toutes les validations ci-dessus.
    if ((telephone && vusTelephone.has(normalizePhoneServer(telephone))) || (email && vusEmail.has(email))) {
      ignores++;
      resultats.push({ ...base, statut: 'ignore', motif: 'Déjà existant dans ce fichier.' });
      continue;
    }
    if (telephone) vusTelephone.add(normalizePhoneServer(telephone));
    if (email) vusEmail.add(email);
    let doublon = false;
    if (telephone) {
      const variantesImport = phoneVariantsServer(telephone);
      const r = await q('SELECT id FROM utilisateurs WHERE telephone = $1 OR telephone = $2 LIMIT 1', [variantesImport[0], variantesImport[1] ?? variantesImport[0]]);
      doublon = r.rows.length > 0;
    }
    if (!doublon && email) {
      const r = await q('SELECT id FROM utilisateurs WHERE lower(email) = lower($1) LIMIT 1', [email]);
      doublon = r.rows.length > 0;
    }
    if (doublon) {
      ignores++;
      resultats.push({ ...base, statut: 'ignore', motif: 'Déjà existant.' });
      continue;
    }
    try {
      const cree = await tx(async (c) => {
        const temporaire = genererMotDePasseTemporaire();
        const hash = await argon2.hash(temporaire, { type: argon2.argon2id });
        const u = (
          await c.query(
            `INSERT INTO utilisateurs (email, telephone, mot_de_passe_hash, mot_de_passe_temporaire_expire_le, role) VALUES ($1,$2,$3, now() + interval '24 hours', 'membre') RETURNING id`,
            [email, telephone, hash],
          )
        ).rows[0];
        const numeroSeq = (await c.query("SELECT nextval('seq_matricule_nouveau') AS n")).rows[0].n;
        const matricule = `CP-${initialesMatricule(nom)}-${String(numeroSeq).padStart(4, '0')}`;
        const m = (
          await c.query(
            'INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction, date_naissance, matricule) VALUES ($1,$2,$3,$4,$5,$6) RETURNING matricule',
            [u.id, nom, etablissementId, fonction, dateNaissance, matricule],
          )
        ).rows[0];
        return { matricule: m.matricule, temporaire };
      });
      importes++;
      resultats.push({ ...base, statut: 'importe', matricule: cree.matricule, mot_de_passe_temporaire: cree.temporaire });
    } catch (e) {
      if (e?.code === '23505') {
        ignores++;
        resultats.push({ ...base, statut: 'ignore', motif: 'Déjà existant.' });
      } else {
        throw e;
      }
    }
  }
  await tx(async (c) => {
    await audit(c, req, 'membres.import', 'membres', null, {
      lignes: corps.lignes.length,
      importes,
      ignores,
      rejetes,
    });
  });
  return { lignes: resultats, importes, ignores, rejetes };
});

// Suppression definitive de compte, 31 oct. 2026 : administrateur
// general seulement, jamais son propre compte, jamais le dernier
// administrateur general. Le compte et ses donnees personnelles
// disparaissent definitivement (identifiants, sessions par cascade,
// inscriptions, presences, scores, cotisations) ; les paiements et
// les traces d'audit ne sont jamais effaces (paiements en SET NULL,
// affiches « compte supprime »), le matricule n'est jamais reutilise,
// le numero et l'e-mail sont liberes pour une nouvelle inscription.
// Le corps de la suppression vit dans src/effacement_compte.js,
// effacerCompteDefinitivement, partage avec la purge automatique
// des 30 jours, pour que les deux effacent exactement pareil.
app.delete('/admin/membres/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const m = await tx(async (c) => {
    const row = (
      await c.query('SELECT m.id, m.matricule, m.nom_complet, m.utilisateur_id, m.photo_id, u.role FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1', [id])
    ).rows[0];
    if (!row) throw httpError(404, 'Membre introuvable.');
    if (row.utilisateur_id === req.user.sub) throw httpError(409, 'Vous ne pouvez pas supprimer votre propre compte.');
    if (row.role === 'admin_general') {
      const n = (await c.query("SELECT COUNT(*)::int AS n FROM utilisateurs WHERE role = 'admin_general' AND id <> $1", [row.utilisateur_id])).rows[0].n;
      if (n === 0) throw httpError(409, 'Impossible de supprimer le dernier administrateur général.');
    }
    return effacerCompteDefinitivement(c, { ...row, actionAudit: 'membre.supprime', auditUtilisateurId: req.user.sub, origine: 'suppression_admin' });
  });
  return { supprime: true, matricule: m.matricule, nom_complet: m.nom_complet };
});

// Effacement definitif apres 30 jours, declenchement manuel,
// 8 nov. 2026 : administrateur general seulement, sans corps.
// Appelle la meme purge que le demarrage et l'intervalle de
// 24 heures ci-dessous, et renvoie les matricules effaces et
// ceux ignores parce que administrateurs generaux. Sert aussi
// a la premiere verification reelle, sans attendre 24 heures.
app.post('/admin/comptes/effacer-echus', { preHandler: adminG }, async () => {
  return tx(async (c) => purgerComptesEchus(c, new Date()));
});

// Anniversaires, 29 oct. 2026 : l'admin général voit tout,
// l'admin d'établissement voit son périmètre seulement, comme pour
// les membres et les présences. La réponse ne contient que jour et
// mois, jamais l'année de naissance ni un âge, pour aucun membre.
// Le jour de référence est la date du serveur (Abidjan est à UTC,
// sans décalage, donc le jour du serveur est le jour du membre).
// Limite connue : un anniversaire du 29 février n'apparaît dans la
// liste du jour que les années bissextiles ; il reste visible dans
// la liste du mois de février les autres années.
app.get('/admin/anniversaires', { preHandler: contenuG }, async (req) => {
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const select = `SELECT m.nom_complet, m.matricule, EXTRACT(MONTH FROM m.date_naissance)::int AS mois, EXTRACT(DAY FROM m.date_naissance)::int AS jour, e.nom AS etablissement `;
  const base = `FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id
    WHERE m.date_naissance IS NOT NULL AND ($1::uuid IS NULL OR m.etablissement_id = $1)`;
  const jour = (await q(`${select} ${base} AND EXTRACT(MONTH FROM m.date_naissance) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(DAY FROM m.date_naissance) = EXTRACT(DAY FROM CURRENT_DATE) ORDER BY m.nom_complet`, [perimetre])).rows;
  const mois = (await q(`${select} ${base} AND EXTRACT(MONTH FROM m.date_naissance) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(DAY FROM m.date_naissance) <> EXTRACT(DAY FROM CURRENT_DATE) ORDER BY EXTRACT(DAY FROM m.date_naissance), m.nom_complet`, [perimetre])).rows;
  return { jour, mois };
});

// Envoi des courriels d'anniversaire, tranche 5, 4 nov. 2026.
// Réservé à l'administrateur général seulement (adminG), ou, pour
// le seul workflow quotidien validé le 4 nov. 2026, à la clé
// x-anniversaire-key (voir anniversaireAutoG) : aucun déclencheur
// au démarrage, aucun cron serveur, aucun envoi en masse non
// demandé. L'administrateur général déclenche, d'abord en aperçu
// (sans confirmer), puis en envoi confirmé. Un membre ne reçoit
// qu'un seul courriel par année
// civile, tracé dans envois_anniversaire : un second déclenchement
// la même année le classe en déjà envoyé, sans doublon, même en
// cas de double clic, grâce à la contrainte unique.
// Règles de sélection : date de naissance du jour seulement (29
// février fêté le 28 février les années non bissextiles, comme la
// carte), courriel requis, date de naissance requise. Les membres
// sans courriel ou sans date sont comptés, jamais envoyés, jamais
// inventés. Sans SMTP, 503, sans envoi simulé. La réponse ne
// contient aucun courriel, seulement des matricules et des comptes.
// La date cible, optionnelle, vaut la date du serveur par défaut ;
// elle sert aux tests et aux rattrapages décidés par
// l'administrateur général, l'année de référence restant celle de
// cette date. Aucun sujet de prière n'est lu ni stocké ici.
app.post('/admin/anniversaires/envoyer', { preHandler: anniversaireAutoG }, async (req, reply) => {
  const b = z.object({
    confirmer: z.boolean().optional().default(false),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }).parse(req.body ?? {});
  const jourCible = b.date ?? new Date().toISOString().slice(0, 10);
  const annee = Number(jourCible.slice(0, 4));
  const membres = (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet,
              to_char(m.date_naissance, 'YYYY-MM-DD') AS date_naissance,
              to_char(m.inscrit_le, 'YYYY-MM-DD') AS inscrit_le,
              COALESCE(m.fuseau_decalage_min, 0) AS fuseau_decalage_min,
              u.email AS email
       FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id
       ORDER BY m.nom_complet`,
      [],
    )
  ).rows;
  // Fuseau par membre : sans date explicite, le jour et l'année
  // de référence sont ceux du membre, pas ceux du serveur. Un
  // membre à Toronto et un membre à Abidjan ne reçoivent donc pas
  // leur courriel le même jour UTC quand leurs jours locaux
  // diffèrent, par exemple autour du nouvel an. Avec une date
  // explicite (test ou rattrapage décidé par l'administrateur
  // général), l'ancien comportement est gardé, jour et année de
  // cette date pour tous.
  const dejaParAnnee = new Map();
  for (const r of (await q('SELECT membre_id, annee FROM envois_anniversaire', [])).rows) {
    const cle = String(r.membre_id);
    if (!dejaParAnnee.has(cle)) dejaParAnnee.set(cle, new Set());
    dejaParAnnee.get(cle).add(Number(r.annee));
  }
  const jourLocalMembre = (m) => {
    if (b.date) return { jour: jourCible, annee };
    const decalage = Number(m.fuseau_decalage_min) || 0;
    const local = new Date(Date.now() + decalage * 60000);
    const jj = String(local.getUTCDate()).padStart(2, '0');
    const mm = String(local.getUTCMonth() + 1).padStart(2, '0');
    return { jour: `${local.getUTCFullYear()}-${mm}-${jj}`, annee: local.getUTCFullYear() };
  };
  const sansDate = [];
  const sansCourriel = [];
  const dejaEnvoyes = [];
  const aEnvoyer = [];
  for (const m of membres) {
    if (!m.date_naissance) {
      sansDate.push(m.matricule);
      continue;
    }
    const ref = jourLocalMembre(m);
    if (!estAnniversaireAujourdhui(m.date_naissance, ref.jour)) continue;
    if (!m.email) {
      sansCourriel.push(m.matricule);
      continue;
    }
    if ((dejaParAnnee.get(String(m.id)) ?? new Set()).has(ref.annee)) {
      dejaEnvoyes.push(m.matricule);
      continue;
    }
    m.annee_locale = ref.annee;
    aEnvoyer.push(m);
  }
  if (!b.confirmer) {
    return {
      apercu: true,
      date: jourCible,
      annee,
      a_envoyer: aEnvoyer.map((m) => ({ matricule: m.matricule, nom_complet: m.nom_complet })),
      deja_envoyes: dejaEnvoyes,
      sans_courriel: sansCourriel,
      sans_date: sansDate.length,
    };
  }
  if (!smtpConfigure()) {
    return reply.code(503).send({ erreur: 'Le service d’envoi n’est pas encore configuré par la structure.' });
  }
  const envoyes = [];
  const echecs = [];
  for (const m of aEnvoyer) {
    const referenceVerset = anniversaireReference(m.matricule, m.annee_locale ?? annee);
    const dateIntegration = formaterDateIntegration(m.inscrit_le);
    try {
      await envoyerAnniversaire({
        email: m.email,
        nom: m.nom_complet,
        dateIntegration,
        referenceVerset,
      });
      await q(
        'INSERT INTO envois_anniversaire (membre_id, annee) VALUES ($1, $2) ON CONFLICT (membre_id, annee) DO NOTHING',
        [m.id, m.annee_locale ?? annee],
      );
      envoyes.push(m.matricule);
    } catch (e) {
      req.log.error({ envoi: 'anniversaire', code: e?.code ?? null, responseCode: e?.responseCode ?? null }, 'Echec envoi anniversaire.');
      echecs.push(m.matricule);
    }
  }
  return { ok: true, date: jourCible, annee, envoyes, deja_envoyes: dejaEnvoyes, sans_courriel: sansCourriel, sans_date: sansDate.length, echecs };
});

// Cloche de notifications internes, 29 oct. 2026 : lecture seule
// pour le membre connecté, sur l'identifiant membre du jeton,
// jamais sur un identifiant fourni par le client. Un membre ne
// voit donc jamais la notification de paiement d'un autre membre.
app.get('/notifications', { preHandler: membreG }, async (req) => {
  // Rappel de cotisation entretenu à chaque lecture : un seul par
  // mois, à partir du 15, effacé seul dès que le mois est soldé.
  await entretenirRappelCotisation(req.user.mid);
  // Rappel mensuel des versements de camp, 31 oct. 2026 : un seul
  // par camp et par mois, tant que le solde reste, arrêté 12 jours
  // avant le début du camp.
  await entretenirRappelsCamp(req.user.mid);
  const list = (
    await q(
      `SELECT id, type, titre, message, lien_type, lien_id, lue, cree_le FROM notifications
       WHERE membre_id = $1 ORDER BY cree_le DESC, id DESC LIMIT 100`,
      [req.user.mid],
    )
  ).rows;
  const nonLues = (await q(`SELECT COUNT(*)::int AS n FROM notifications WHERE membre_id = $1 AND NOT lue`, [req.user.mid])).rows[0]?.n ?? 0;
  return { notifications: list, non_lues: nonLues };
});
app.post('/notifications/:id/lue', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = await q(`UPDATE notifications SET lue = true WHERE id = $1 AND membre_id = $2 RETURNING id`, [id, req.user.mid]);
  if (!r.rows[0]) throw httpError(404, 'Introuvable.');
  return { ok: true };
});
app.post('/notifications/tout-lire', { preHandler: membreG }, async (req) => {
  const r = await q(`UPDATE notifications SET lue = true WHERE membre_id = $1 AND NOT lue`, [req.user.mid]);
  return { ok: true, marquees: r.rowCount ?? 0 };
});

// Jetons de notification poussée Android, 2 nov. 2026 : un jeton
// par appareil, jamais journalisé, jamais renvoyé en lecture.
// L'enregistrement exige un membre connecté, garde membreG, et
// ne crée jamais de jeton pour un visiteur, l'application
// n'appelle cette route que pour un membre connecté. Les
// catégories sont limitées aux types déjà émis par le serveur,
// les inconnues sont ignorées, jamais inventées comme catégories.
// Un même jeton pour le même membre met à jour les catégories
// au lieu de créer un doublon, grâce à l'index unique.
app.post('/moi/notification-token', { preHandler: membreG }, async (req) => {
  const corps = z.object({
    jeton: z.string().trim().min(1).max(1000),
    plateforme: z.enum(['android']),
    categories: z.array(z.string().trim().max(50)).max(20).optional().nullable(),
  }).parse(req.body ?? {});
  // Carte 1, 21 nov. 2026 : 'messagerie' est accepté comme
  // alias de 'nouveau_message', pour les jetons déjà stockés
  // avec l'ancien nom par les anciennes applications. Les
  // inconnues sont ignorées, jamais inventées comme catégories.
  const categories = normaliserCategoriesPush(corps.categories ?? []).filter((c) => TYPES_NOTIFICATIONS_CONNUS.includes(c));
  // Conflit sur utilisateur et jeton, pas sur membre et jeton :
  // un compte sans profil membre a membre_id nul, et un index
  // unique sur une colonne nulle ne déduplique jamais. Le membre
  // est quand même mis à jour à chaque enregistrement, pour que
  // les poussées à un seul membre retrouvent son jeton.
  await q(
    `INSERT INTO notification_tokens (utilisateur_id, membre_id, jeton, plateforme, categories, actif)
     VALUES ($1, $2, $3, $4, $5::jsonb, true)
     ON CONFLICT (utilisateur_id, jeton) DO UPDATE SET membre_id = EXCLUDED.membre_id, plateforme = EXCLUDED.plateforme, categories = EXCLUDED.categories, actif = true, modifie_le = now()`,
    [req.user.sub, req.user.mid ?? null, corps.jeton, corps.plateforme, JSON.stringify(categories)],
  );
  return { ok: true };
});

// Désactivation d'un jeton, à la déconnexion, au mieux, sans
// jamais bloquer la déconnexion si le jeton est inconnu.
app.post('/moi/notification-token/desactiver', { preHandler: membreG }, async (req) => {
  const corps = z.object({ jeton: z.string().trim().min(1).max(1000) }).parse(req.body ?? {});
  await q(`UPDATE notification_tokens SET actif = false, modifie_le = now() WHERE jeton = $1 AND utilisateur_id = $2`, [corps.jeton, req.user.sub]);
  return { ok: true };
});

app.get('/admin/audit', { preHandler: adminG }, async (req) => {
  return (
    await q(
      `SELECT a.id, a.action, a.entite, a.entite_id, a.details, a.horodatage,
         m.nom_complet AS acteur_nom, m.matricule AS acteur_matricule
       FROM audit a LEFT JOIN membres m ON m.id = a.acteur_id
       ORDER BY a.horodatage DESC LIMIT 200`,
    )
  ).rows;
});

// Question de quiz : 4 choix, une seule bonne réponse (vérifié aussi par la base).
app.post('/admin/quiz/questions', { preHandler: adminG }, async (req, reply) => {
  const b = z
    .object({
      personnage: z.string().trim().min(1).max(120).transform(texteMajuscules),
      testament: z.enum(['ancien', 'nouveau']),
      enonce: txt,
      reference_verset: z.string().trim().min(1).max(80),
      explication: opt(txt),
      choix: z.array(z.string().trim().min(1).max(300)).length(4),
      bonne: z.number().int().min(1).max(4), // position de la bonne réponse
    })
    .parse(req.body);
  const out = await tx(async (c) => {
    const pers = (
      await c.query(
        'INSERT INTO quiz_personnages (nom, testament) VALUES ($1,$2) ON CONFLICT (nom) DO UPDATE SET nom = EXCLUDED.nom RETURNING id',
        [b.personnage, b.testament],
      )
    ).rows[0];
    const qu = (
      await c.query(
        'INSERT INTO quiz_questions (personnage_id, enonce, reference_verset, explication) VALUES ($1,$2,$3,$4) RETURNING id',
        [pers.id, b.enonce, b.reference_verset, b.explication ?? null],
      )
    ).rows[0];
    for (let i = 0; i < 4; i++) {
      await c.query('INSERT INTO quiz_choix (question_id, position, libelle, est_correct) VALUES ($1,$2,$3,$4)', [qu.id, i + 1, b.choix[i], i + 1 === b.bonne]);
    }
    await audit(c, req, 'quiz.question_creee', 'quiz_questions', qu.id);
    return qu;
  });
  return reply.code(201).send(out);
});

// ───────────────────────── Téléversement (type réel vérifié) ─────────────────────────
const AUTORISES = {
  livre: { mimes: ['application/pdf', 'application/epub+zip'], max: 50 * 1024 * 1024 },
  audio: { mimes: ['audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/aac', 'audio/ogg', 'audio/vnd.wave', 'audio/x-wav'], max: 100 * 1024 * 1024 },
  image: { mimes: ['image/jpeg', 'image/png', 'image/webp'], max: 5 * 1024 * 1024 },
  // Documents institutionnels, correctif global 27 nov. 2026 :
  // PDF et bureautique Office, 20 Mo. Le type est lu dans les
  // octets par file-type : un faux .docx (simple zip) est détecté
  // application/zip et refusé en 415.
  document: { mimes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'], max: 20 * 1024 * 1024 },
};

app.post('/admin/fichiers', { preHandler: contenuG }, async (req, reply) => {
  const { type } = z.object({ type: z.enum(['livre', 'audio', 'image', 'document']) }).parse(req.query);
  // Document : même garde que la publication d'un document, éditeur
  // ou responsable, général toujours admis. Livre et audio restent
  // réservés au général, comme avant.
  if (type === 'document') exigerFonctionAdmin(req, 'editeur', 'responsable');
  else if (type !== 'image' && req.user.role !== 'admin_general') throw httpError(403, 'Accès refusé.');
  if (type === 'image') exigerFonctionAdmin(req, 'editeur', 'responsable');
  const part = await req.file();
  if (!part) throw httpError(400, 'Aucun fichier reçu.');

  const rule = AUTORISES[type];
  const tmpDir = path.join(CFG.uploadDir, 'tmp');
  await fsp.mkdir(tmpDir, { recursive: true });
  const tmp = path.join(tmpDir, crypto.randomUUID());
  const hash = crypto.createHash('sha256');
  let size = 0;
  part.file.on('data', (ch) => {
    size += ch.length;
    hash.update(ch);
  });
  try {
    await pipeline(part.file, fs.createWriteStream(tmp));
    if (part.file.truncated || size > rule.max) throw httpError(413, 'Fichier trop volumineux.');
    if (size === 0) throw httpError(400, 'Fichier vide.');
    // Le type est lu dans les octets, jamais d'après le nom ou l'en-tête envoyé.
    const ft = await fileTypeFromFile(tmp);
    if (!ft || !rule.mimes.includes(ft.mime)) throw httpError(415, 'Type de fichier non autorisé.');
    const key = `${type}/${crypto.randomUUID()}.${ft.ext}`;
    // Le disque Render s'efface à chaque redéploiement : les octets sont
    // gardés dans la base, comme la photo de profil, sinon le fichier
    // disparaît au premier redéploiement suivant le téléversement.
    const data = await fsp.readFile(tmp);
    const row = await tx(async (c) => {
      const r = (
        await c.query(
          `INSERT INTO fichiers (cle_stockage, nom_original, type_mime_reel, taille_octets, sha256, verifie, donnees)
           VALUES ($1,$2,$3,$4,$5,true,$6) RETURNING id, type_mime_reel, taille_octets`,
          [key, (part.filename || '').slice(0, 200), ft.mime, size, hash.digest('hex'), data],
        )
      ).rows[0];
      await audit(c, req, 'fichier.televerse', 'fichiers', r.id, { type, mime: ft.mime });
      return r;
    });
    return reply.code(201).send(row);
  } finally {
    await fsp.rm(tmp, { force: true });
  }
});

// ───────────────────────── Stories de 24 heures ─────────────────────────
// 17 nov. 2026, décision de Muse sur délégation d'Axel : la
// Tout membre publie, décision d'Axel le 21 nov. 2026 :
// tout le monde peut faire des stories, la publication
// n'est plus réservée à la structure. Médias sur R2,
// compartiment privé. Carte 153, 22 nov. 2026 : l'application
// ne voit plus l'adresse signée R2 directe, que le navigateur
// ne peut pas lire sans CORS. Elle lit le média par la route
// /stories/:id/media, même origine, et le serveur récupère
// l'objet sur R2 côté serveur. Suppression automatique après
// 24 heures, contenu et ligne, sans trace : aucune entrée de
// journal d'audit pour les stories, ni à la publication ni à
// la suppression. Sans clés R2, la liste est vide et l'envoi
// refuse en 503, proprement, sans erreur visible côté membre.
app.get('/stories', { preHandler: membreG }, async (req) => {
  // Réécriture 22 nov. 2026 : la purge des expirées ne passe
  // plus par cette route. Elle tournait ici avant la lecture,
  // avec des suppressions R2 séquentielles sans délai : un R2
  // lent retenait toute la liste. Elle tourne désormais
  // seulement au démarrage et toutes les heures, en tâche de
  // fond. La lecture ne fait plus que lire et signer.
  const config = configR2();
  if (!config) return { stories: [], r2: false };
  const lignes = (await q(
    `SELECT s.id, s.type, s.cle_r2, s.cree_le, s.expire_le,
            m.nom_complet AS auteur_nom, e.nom AS etablissement_nom
     FROM stories s
     LEFT JOIN membres m ON m.id = s.auteur_id
     LEFT JOIN etablissements e ON e.id = s.etablissement_id
     WHERE s.expire_le > now()
     ORDER BY s.cree_le DESC`,
  )).rows;
  // Une ligne anormale (clé R2 absente ou invalide) est écartée,
  // jamais une erreur pour toute la liste : la liste reste
  // disponible même si une story est corrompue.
  const stories = [];
  for (const ligne of lignes) {
    if (!cleR2Valide(ligne.cle_r2)) continue;
    // Carte 153 : l'adresse de lecture passe par l'API, même
    // origine, jamais l'adresse signée R2 directe.
    const url = urlMediaStory(CFG.publicBaseUrl, ligne.id);
    if (!url) continue;
    try {
      stories.push(formaterStoryPublique(ligne, url));
    } catch {
      continue;
    }
  }
  return { r2: true, stories };
});

// Lecture du média d'une story par le serveur, carte 153,
// 22 nov. 2026 : le web ne peut pas lire l'adresse signée
// R2 directe, le navigateur la bloque sans CORS de R2, alors
// que l'APK la lit sans problème. La lecture passe donc par
// l'API, même origine, et le serveur récupère l'objet sur R2
// côté serveur, sans CORS. Route publique, sans jeton : le
// client la charge en adresse d'image sans en-tête
// d'autorisation, comme /fichiers/:id, et l'exiger ici
// casserait tous les cercles. L'identifiant est un UUID non
// devinable, la story doit exister et ne pas être expirée.
// 404 dans tous les cas, sans révéler si la story existe.
app.get('/stories/:id/media', async (req, reply) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Story introuvable.');
  const config = configR2();
  if (!config) throw httpError(404, 'Story introuvable.');
  const ligne = (await q(
    `SELECT cle_r2, type_mime FROM stories WHERE id = $1 AND expire_le > now()`,
    [id],
  )).rows[0];
  if (!ligne || !cleR2Valide(ligne.cle_r2)) throw httpError(404, 'Story introuvable.');
  let octets;
  try {
    octets = await lireObjetR2(config, ligne.cle_r2);
  } catch {
    throw httpError(502, 'Média indisponible.');
  }
  reply.header('Cache-Control', 'private, max-age=600');
  return sendBuffer(req, reply, octets, ligne.type_mime);
});

app.post('/stories', { preHandler: membreG }, async (req, reply) => {
  const config = configR2();
  if (!config) throw httpError(503, 'Les stories sont désactivées pour le moment.');
  const { type } = z.object({ type: z.enum(['photo', 'video', 'audio']) }).parse(req.query);
  // Administrateur d'établissement : seulement son établissement.
  // Administrateur général : celui de la requête, ou la structure.
  // Membre : aucun établissement, la story porte seulement son nom.
  const etablissementId = req.user.role === 'admin_general'
    ? (typeof req.query.etablissement_id === 'string' && UUID_RE.test(req.query.etablissement_id) ? req.query.etablissement_id : null)
    : req.user.eid;
  if (req.user.role === 'admin_etablissement' && !etablissementId) throw httpError(403, 'Accès refusé.');
  const part = await req.file();
  if (!part) throw httpError(400, 'Aucun média reçu.');
  const max = type === 'photo' ? TAILLE_MAX_PHOTO_OCTETS : type === 'audio' ? TAILLE_MAX_AUDIO_OCTETS : TAILLE_MAX_VIDEO_OCTETS;
  // Lecture en mémoire, avec plafond : une story est courte,
  // jamais un gros fichier. Le flux est coupé dès le dépassement.
  const morceaux = [];
  let taille = 0;
  for await (const morceau of part.file) {
    taille += morceau.length;
    if (taille > max) throw httpError(413, 'Média trop volumineux.');
    morceaux.push(morceau);
  }
  const octets = Buffer.concat(morceaux);
  if (octets.length === 0) throw httpError(400, 'Média vide.');
  // Le type est lu dans les octets, jamais d'après le nom ou
  // l'en-tête envoyé, comme pour /admin/fichiers.
  const ft = await fileTypeFromBuffer(octets);
  if (!ft) throw httpError(415, 'Type de média non autorisé.');
  const refus = validerPublication({ type, mime: ft.mime, tailleOctets: octets.length });
  if (refus) throw httpError(refus.statut, refus.message);
  const cle = cleStory(type, ft.mime);
  const expireLe = dateExpirationStory();
  // Validation du dossier complet avant l'envoi R2 et
  // l'enregistrement, réécriture 22 nov. 2026, expert : une story
  // invalide est refusée ici avec un message clair, jamais
  // acceptée puis subie par tous les clients. Rien n'est stocké
  // quand elle est refusée, ni objet R2 ni ligne.
  const refusEnregistrement = validerEnregistrementStory({
    type,
    cle,
    mime: ft.mime,
    tailleOctets: octets.length,
    etablissementId,
    expireLe,
  });
  if (refusEnregistrement) throw httpError(refusEnregistrement.statut, refusEnregistrement.message);
  const noms = (await q(
    `SELECT m.nom_complet AS auteur_nom, e.nom AS etablissement_nom
     FROM (SELECT $1::uuid AS auteur_id, $2::uuid AS etablissement_id) x
     LEFT JOIN membres m ON m.id = x.auteur_id
     LEFT JOIN etablissements e ON e.id = x.etablissement_id`,
    [req.user.mid ?? null, etablissementId],
  )).rows[0];
  // Dédoublonnage, réécriture 22 nov. 2026 : si la même
  // publication vient d'être enregistrée, on renvoie la story
  // existante au lieu d'en créer une seconde. Un double envoi
  // (nouvelle tentative après un délai) ne crée donc jamais
  // deux lignes. Rien n'est envoyé vers R2 quand c'est un doublon.
  if (req.user.mid != null) {
    const recents = (await q(
      `SELECT id, type, cle_r2, cree_le, expire_le, auteur_id, type_mime, taille_octets
       FROM stories WHERE auteur_id = $1 AND cree_le > now() - interval '60 seconds'
       ORDER BY cree_le DESC`,
      [req.user.mid],
    )).rows;
    const doublon = trouverDoublonRecent(
      { auteurId: req.user.mid, type, mime: ft.mime, tailleOctets: octets.length },
      recents,
    );
    if (doublon) {
      return reply.code(200).send(formaterStoryPublique(
        { ...doublon, auteur_nom: noms?.auteur_nom ?? '', etablissement_nom: noms?.etablissement_nom ?? '' },
        urlMediaStory(CFG.publicBaseUrl, doublon.id),
      ));
    }
  }
  await envoyerObjetR2(config, cle, octets, ft.mime);
  const cree = (await q(
    `INSERT INTO stories (auteur_id, etablissement_id, type, cle_r2, type_mime, taille_octets, expire_le)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, type, cree_le, expire_le`,
    [req.user.mid ?? null, etablissementId, type, cle, ft.mime, octets.length, expireLe],
  )).rows[0];
  return reply.code(201).send(formaterStoryPublique(
    { ...cree, auteur_nom: noms?.auteur_nom ?? '', etablissement_nom: noms?.etablissement_nom ?? '' },
    urlMediaStory(CFG.publicBaseUrl, cree.id),
  ));
});

app.delete('/stories/:id', { preHandler: membreG }, async (req) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Story introuvable.');
  const ligne = (await q(`SELECT id, cle_r2, etablissement_id, auteur_id FROM stories WHERE id = $1`, [id])).rows[0];
  if (!ligne) throw httpError(404, 'Story introuvable.');
  // Administrateur d'établissement : seulement les stories de
  // son établissement. Membre : seulement ses propres stories.
  // 404 dans tous les cas, sans révéler si la story existe ou
  // si elle appartient à quelqu'un d'autre.
  if (req.user.role === 'admin_etablissement' && req.user.eid !== ligne.etablissement_id) throw httpError(404, 'Story introuvable.');
  if (req.user.role === 'membre' && ligne.auteur_id !== req.user.mid) throw httpError(404, 'Story introuvable.');
  const config = configR2();
  if (config) await supprimerObjetR2(config, ligne.cle_r2);
  await q(`DELETE FROM stories WHERE id = $1`, [id]);
  return { ok: true };
});

// ───────────────────────── Témoignages ─────────────────────────
// Cinquième onglet de la pilule, 17 nov. 2026, à la place de la
// Carte : publication par le membre, modération par le Bureau.
// Un témoignage publié est en attente, seuls les témoignages
// approuvés sont visibles dans le fil, l'auteur voit le statut
// des siens, le Bureau voit la file d'attente. Médias sur R2,
// compartiment privé, liens signés de 15 minutes, comme les
// stories. Sans clés R2, la liste est vide et l'envoi refuse
// en 503, proprement, sans erreur visible côté membre.
app.get('/temoignages', { preHandler: membreG }, async (req) => {
  const config = configR2();
  if (!config) return { temoignages: [], mes_temoignages: [], moderation: [], r2: false };
  const estModerateur = req.user.role === 'admin_general' || req.user.role === 'admin_etablissement';
  const fil = (await q(
    `SELECT t.id, t.cle_r2, t.statut, t.cree_le, t.texte, t.type_mime,
            m.nom_complet AS auteur_nom, e.nom AS etablissement_nom
     FROM temoignages t
     LEFT JOIN membres m ON m.id = t.auteur_id
     LEFT JOIN etablissements e ON e.id = t.etablissement_id
     WHERE t.statut = 'approuve'
     ORDER BY t.cree_le DESC`,
  )).rows;
  const miens = (await q(
    `SELECT t.id, t.cle_r2, t.statut, t.cree_le, t.texte, t.type_mime,
            m.nom_complet AS auteur_nom, e.nom AS etablissement_nom
     FROM temoignages t
     LEFT JOIN membres m ON m.id = t.auteur_id
     LEFT JOIN etablissements e ON e.id = t.etablissement_id
     WHERE t.auteur_id = $1
     ORDER BY t.cree_le DESC`,
    [req.user.mid ?? null],
  )).rows;
  // File de modération : en attente seulement. Administrateur
  // d'établissement : seulement son établissement, comme pour
  // les stories. Administrateur général : toute la file.
  let moderation = [];
  if (estModerateur) {
    const parametres = [];
    let condition = `t.statut = 'en_attente'`;
    if (req.user.role === 'admin_etablissement') {
      parametres.push(req.user.eid);
      condition += ` AND t.etablissement_id = $${parametres.length}`;
    }
    moderation = (await q(
      `SELECT t.id, t.cle_r2, t.statut, t.cree_le, t.texte, t.type_mime,
              m.nom_complet AS auteur_nom, e.nom AS etablissement_nom
       FROM temoignages t
       LEFT JOIN membres m ON m.id = t.auteur_id
       LEFT JOIN etablissements e ON e.id = t.etablissement_id
       WHERE ${condition}
       ORDER BY t.cree_le ASC`,
      parametres,
    )).rows;
  }
  const signer = (ligne) => formaterTemoignagePublic(
    ligne,
    ligne.cle_r2 ? urlSigneeR2(config, ligne.cle_r2, { expireSecondes: DUREE_URL_SIGNEE_SECONDES }) : '',
  );
  return {
    r2: true,
    temoignages: fil.map(signer),
    mes_temoignages: miens.map(signer),
    moderation: moderation.map(signer),
  };
});

app.post('/temoignages', { preHandler: membreG }, async (req, reply) => {
  const config = configR2();
  if (!config) throw httpError(503, 'Les témoignages sont désactivés pour le moment.');
  // Administrateur d'établissement : seulement son établissement.
  // Administrateur général : celui de la requête, ou la structure.
  // Membre : son établissement.
  const etablissementId = req.user.role === 'admin_general'
    ? (typeof req.query.etablissement_id === 'string' && UUID_RE.test(req.query.etablissement_id) ? req.query.etablissement_id : null)
    : req.user.eid;
  if (req.user.role === 'admin_etablissement' && !etablissementId) throw httpError(403, 'Accès refusé.');
  // Texte et média arrivent dans le même envoi multipart : le
  // champ texte avant ou après le fichier, l'ordre ne compte
  // pas, on lit toutes les parties. Un texte seul est accepté,
  // sans fichier. Lecture en mémoire, avec plafond : un
  // témoignage est court, jamais un gros fichier. Le flux est
  // coupé dès le dépassement.
  let texte = '';
  let octets = null;
  for await (const partie of req.parts()) {
    if (partie.type === 'field') {
      if (partie.fieldname === 'texte' && typeof partie.value === 'string') texte = partie.value;
      continue;
    }
    if (partie.type !== 'file') continue;
    if (octets != null) {
      for await (const _ of partie.file) { /* un seul média, on vide le reste */ }
      continue;
    }
    const morceaux = [];
    let taille = 0;
    for await (const morceau of partie.file) {
      taille += morceau.length;
      if (taille > TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS) throw httpError(413, 'Média trop volumineux.');
      morceaux.push(morceau);
    }
    octets = Buffer.concat(morceaux);
  }
  const textePropre = texte.trim();
  if (textePropre.length > LONGUEUR_MAX_TEXTE_TEMOIGNAGE) throw httpError(400, 'Texte trop long : 2000 caractères au plus.');
  if (octets != null && octets.length === 0) throw httpError(400, 'Média vide.');
  // Le type est lu dans les octets, jamais d'après le nom ou
  // l'en-tête envoyé, comme pour /admin/fichiers.
  const ft = octets == null ? null : await fileTypeFromBuffer(octets);
  if (octets != null && !ft) throw httpError(415, 'Type de média non autorisé.');
  const refus = validerTemoignage({ mime: ft?.mime ?? null, tailleOctets: octets?.length ?? 0, texte: textePropre });
  if (refus) throw httpError(refus.statut, refus.message);
  const cle = ft ? cleTemoignage(ft.mime) : null;
  if (ft) await envoyerObjetR2(config, cle, octets, ft.mime);
  const cree = (await q(
    `INSERT INTO temoignages (auteur_id, etablissement_id, cle_r2, type_mime, taille_octets, texte, statut)
     VALUES ($1,$2,$3,$4,$5,$6,'en_attente') RETURNING id, statut, cree_le`,
    [req.user.mid ?? null, etablissementId, cle, ft?.mime ?? '', octets?.length ?? 0, textePropre],
  )).rows[0];
  const noms = (await q(
    `SELECT m.nom_complet AS auteur_nom, e.nom AS etablissement_nom
     FROM (SELECT $1::uuid AS auteur_id, $2::uuid AS etablissement_id) x
     LEFT JOIN membres m ON m.id = x.auteur_id
     LEFT JOIN etablissements e ON e.id = x.etablissement_id`,
    [req.user.mid ?? null, etablissementId],
  )).rows[0];
  return reply.code(201).send(formaterTemoignagePublic(
    { ...cree, auteur_nom: noms?.auteur_nom ?? '', etablissement_nom: noms?.etablissement_nom ?? '', texte: textePropre, type_mime: ft?.mime ?? '' },
    cle ? urlSigneeR2(config, cle, { expireSecondes: DUREE_URL_SIGNEE_SECONDES }) : '',
  ));
});

app.put('/temoignages/:id/moderer', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Témoignage introuvable.');
  const { statut } = z.object({ statut: z.enum(['approuve', 'refuse']) }).parse(req.body);
  if (!statutTemoignageValide(statut)) throw httpError(400, 'Statut invalide.');
  const ligne = (await q(`SELECT id, cle_r2, etablissement_id, texte, type_mime FROM temoignages WHERE id = $1`, [id])).rows[0];
  if (!ligne) throw httpError(404, 'Témoignage introuvable.');
  // Administrateur d'établissement : seulement les témoignages
  // de son établissement. 404 dans les deux cas, sans révéler si
  // le témoignage existe ou s'il appartient à un autre établissement.
  if (req.user.role === 'admin_etablissement' && req.user.eid !== ligne.etablissement_id) throw httpError(404, 'Témoignage introuvable.');
  const modere = (await q(
    `UPDATE temoignages SET statut = $2, modere_le = now(), modere_par = $3
     WHERE id = $1 RETURNING id, statut, cree_le`,
    [id, statut, req.user.mid ?? null],
  )).rows[0];
  const config = configR2();
  const noms = (await q(
    `SELECT m.nom_complet AS auteur_nom, e.nom AS etablissement_nom
     FROM temoignages t
     LEFT JOIN membres m ON m.id = t.auteur_id
     LEFT JOIN etablissements e ON e.id = t.etablissement_id
     WHERE t.id = $1`,
    [id],
  )).rows[0];
  return formaterTemoignagePublic(
    { ...modere, auteur_nom: noms?.auteur_nom ?? '', etablissement_nom: noms?.etablissement_nom ?? '', texte: ligne.texte ?? '', type_mime: ligne.type_mime ?? '' },
    config && ligne.cle_r2 ? urlSigneeR2(config, ligne.cle_r2, { expireSecondes: DUREE_URL_SIGNEE_SECONDES }) : '',
  );
});

app.delete('/temoignages/:id', { preHandler: membreG }, async (req) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Témoignage introuvable.');
  const ligne = (await q(`SELECT id, auteur_id, cle_r2, etablissement_id FROM temoignages WHERE id = $1`, [id])).rows[0];
  if (!ligne) throw httpError(404, 'Témoignage introuvable.');
  // L'auteur supprime les siens, le Bureau supprime dans son
  // périmètre : administrateur d'établissement, seulement son
  // établissement. 404 dans les deux cas, sans révéler si le
  // témoignage existe ou à qui il appartient.
  const estModerateur = req.user.role === 'admin_general' || req.user.role === 'admin_etablissement';
  const estAuteur = req.user.mid != null && ligne.auteur_id === req.user.mid;
  if (!estAuteur) {
    if (!estModerateur) throw httpError(404, 'Témoignage introuvable.');
    if (req.user.role === 'admin_etablissement' && req.user.eid !== ligne.etablissement_id) throw httpError(404, 'Témoignage introuvable.');
  }
  const config = configR2();
  if (config && ligne.cle_r2) await supprimerObjetR2(config, ligne.cle_r2);
  await q(`DELETE FROM temoignages WHERE id = $1`, [id]);
  return { ok: true };
});

// ───────────────────────── Mur des membres ─────────────────────────
// Carte 174, refonte totale tranche 2, carte 176, 24 nov. 2026 :
// publications des membres, visibles par tous, sans modération.
// Lecture seule en base : GET ne fait que lire, les J'aime et
// les commentaires passent par les routes génériques, cible
// 'mur'. Photo en base comme la photo de profil, 700 Ko au
// plus, jamais de média R2.
// Mur des membres v2, tranche 1, 25 nov. 2026 : colonnes d'une
// publication, partagées par le fil et le détail. $1 est
// l'identifiant du membre qui lit, pour mon type de réaction,
// mes enregistrements et mon droit d'auteur.
const COLONNES_PUBLICATION_MUR = `
  p.id, p.auteur_id, p.texte, p.photo_donnees AS photo,
  p.categorie, p.statut_moderation, p.cle_r2_video,
  p.type_mime_video, p.taille_video_octets, p.cree_le,
  m.nom_complet AS auteur_nom, e.nom AS etablissement_nom,
  (SELECT COUNT(*) FILTER (WHERE type = 'jaime') FROM aimes WHERE cible_type = 'mur' AND cible_id = p.id) AS nb_jaime,
  (SELECT COUNT(*) FILTER (WHERE type = 'amen') FROM aimes WHERE cible_type = 'mur' AND cible_id = p.id) AS nb_amen,
  (SELECT COUNT(*) FILTER (WHERE type = 'priere') FROM aimes WHERE cible_type = 'mur' AND cible_id = p.id) AS nb_priere,
  (SELECT type FROM aimes WHERE cible_type = 'mur' AND cible_id = p.id AND membre_id = $1) AS mon_type,
  (SELECT COUNT(*) FROM commentaires WHERE cible_type = 'mur' AND cible_id = p.id) AS nb_commentaires,
  EXISTS (SELECT 1 FROM mur_enregistrements WHERE membre_id = $1 AND publication_id = p.id) AS enregistre,
  EXISTS (SELECT 1 FROM mur_suivis WHERE suiveur_id = $1 AND suivi_id = p.auteur_id) AS suivi_par_moi,
  (p.auteur_id = $1) AS est_auteur`;
const JOINTURES_PUBLICATION_MUR = `
  FROM mur_publications p
  LEFT JOIN membres m ON m.id = p.auteur_id
  LEFT JOIN etablissements e ON e.id = p.etablissement_id`;

app.get('/mur', { preHandler: membreG }, async (req) => {
  const mid = req.user.mid ?? null;
  const categorie = typeof req.query.categorie === 'string' ? req.query.categorie : null;
  if (categorie != null && !CATEGORIES_MUR.includes(categorie)) throw httpError(400, 'Catégorie invalide.');
  const saisie = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  if (saisie !== '' && saisie.length < 3) throw httpError(400, 'Saisissez au moins 3 caractères.');
  const limiteBrute = Number.parseInt(req.query.limite ?? '', 10);
  const limite = Number.isNaN(limiteBrute) ? 20 : Math.min(LIMITE_MUR_PUBLICATIONS, Math.max(1, limiteBrute));
  const params = [mid];
  const conditions = [`p.statut_moderation IN ('visible', 'en_examen')`];
  if (categorie != null) {
    params.push(categorie);
    conditions.push(`p.categorie = $${params.length}`);
  }
  if (saisie !== '') {
    const echappee = saisie.replace(/[%_\\]/g, (c) => `\\${c}`);
    params.push(`%${echappee}%`);
    conditions.push(`(p.texte ILIKE $${params.length} ESCAPE '\\' OR m.nom_complet ILIKE $${params.length} ESCAPE '\\')`);
  }
  const avant = typeof req.query.avant === 'string' ? req.query.avant : null;
  if (avant != null) {
    if (!UUID_RE.test(avant)) throw httpError(400, 'Curseur invalide.');
    const curseur = (await q(`SELECT cree_le FROM mur_publications WHERE id = $1`, [avant])).rows[0];
    if (!curseur) throw httpError(400, 'Curseur invalide.');
    params.push(curseur.cree_le, avant);
    conditions.push(`(p.cree_le, p.id) < ($${params.length - 1}, $${params.length})`);
  }
  params.push(limite + 1);
  const lignes = (await q(
    `SELECT ${COLONNES_PUBLICATION_MUR}
     ${JOINTURES_PUBLICATION_MUR}
     WHERE ${conditions.join(' AND ')}
     ORDER BY p.cree_le DESC, p.id DESC
     LIMIT $${params.length}`,
    params,
  )).rows;
  const suivante = lignes.length > limite ? lignes[limite - 1].id : null;
  return { publications: lignes.slice(0, limite).map(formaterPublicationMur), suivante };
});

// Photos des auteurs du fil, en lot : un seul appel pour toute
// la page, mise en cache côté application. Jamais de photo dans
// les listes, même règle que la recherche messagerie : nom et
// établissement seulement, sans aucune coordonnée de contact.
app.get('/mur/auteurs-photos', { preHandler: membreG }, async (req) => {
  const bruts = (req.query.ids ?? '').toString().split(',').map((s) => s.trim()).filter(Boolean);
  if (bruts.length === 0 || bruts.length > 100) throw httpError(400, 'La liste des auteurs est invalide.');
  const valides = bruts.filter((id) => UUID_RE.test(id));
  if (valides.length === 0) return { photos: [] };
  const lignes = (await q(
    `SELECT id AS membre_id, photo_donnees AS photo FROM membres WHERE id = ANY($1::uuid[])`,
    [valides],
  )).rows;
  const parId = new Map(lignes.map((l) => [l.membre_id, l.photo ?? null]));
  return { photos: valides.map((id) => ({ membre_id: id, photo: parId.get(id) ?? null })) };
});

app.get('/mur/:id', { preHandler: membreG }, async (req) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Publication introuvable.');
  const ligne = (await q(
    `SELECT ${COLONNES_PUBLICATION_MUR}
     ${JOINTURES_PUBLICATION_MUR}
     WHERE p.id = $2`,
    [req.user.mid ?? null, id],
  )).rows[0];
  if (!ligne || ligne.statut_moderation === 'masque' || ligne.statut_moderation === 'retire') {
    throw httpError(404, 'Publication introuvable.');
  }
  return { publication: formaterPublicationMur(ligne) };
});

// Mes enregistrements, mur v2 tranche 5, 25 nov. 2026 :
// publications enregistrées, par date d'enregistrement,
// même forme que le fil, curseur `avant`, limite 20.
// Sans fiche membre, la liste est vide.
app.get('/mur/enregistrements', { preHandler: membreG }, async (req) => {
  const mid = req.user.mid ?? null;
  if (!mid) return { publications: [], suivante: null };
  const limiteBrute = Number.parseInt(req.query.limite ?? '', 10);
  const limite = Number.isNaN(limiteBrute) ? 20 : Math.min(LIMITE_MUR_PUBLICATIONS, Math.max(1, limiteBrute));
  const params = [mid];
  const conditions = [`enr.membre_id = $1`, `p.statut_moderation IN ('visible', 'en_examen')`];
  const avant = typeof req.query.avant === 'string' ? req.query.avant : null;
  if (avant != null) {
    if (!UUID_RE.test(avant)) throw httpError(400, 'Curseur invalide.');
    const curseur = (await q(`SELECT cree_le FROM mur_enregistrements WHERE membre_id = $1 AND publication_id = $2`, [mid, avant])).rows[0];
    if (!curseur) throw httpError(400, 'Curseur invalide.');
    params.push(curseur.cree_le, avant);
    conditions.push(`(enr.cree_le, p.id) < ($${params.length - 1}, $${params.length})`);
  }
  params.push(limite + 1);
  const lignes = (await q(
    `SELECT ${COLONNES_PUBLICATION_MUR}
     ${JOINTURES_PUBLICATION_MUR}
     JOIN mur_enregistrements enr ON enr.publication_id = p.id AND enr.membre_id = $1
     WHERE ${conditions.join(' AND ')}
     ORDER BY enr.cree_le DESC, p.id DESC
     LIMIT $${params.length}`,
    params,
  )).rows;
  const suivante = lignes.length > limite ? lignes[limite - 1].id : null;
  return { publications: lignes.slice(0, limite).map(formaterPublicationMur), suivante };
});

// Enregistrer une publication, idempotent : 200 quand elle
// l'est déjà. Retirer un enregistrement, idempotent aussi.
// Une publication masquée ou retirée ne s'enregistre plus.
app.post('/mur/:id/enregistrer', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre.');
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Publication introuvable.');
  const ligne = (await q(`SELECT id FROM mur_publications WHERE id = $1 AND statut_moderation IN ('visible', 'en_examen')`, [id])).rows[0];
  if (!ligne) throw httpError(404, 'Publication introuvable.');
  await q(
    `INSERT INTO mur_enregistrements (membre_id, publication_id) VALUES ($1, $2)
     ON CONFLICT (membre_id, publication_id) DO NOTHING`,
    [req.user.mid, id],
  );
  return { enregistre: true };
});

app.delete('/mur/:id/enregistrer', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre.');
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Publication introuvable.');
  const ligne = (await q(`SELECT id FROM mur_publications WHERE id = $1`, [id])).rows[0];
  if (!ligne) throw httpError(404, 'Publication introuvable.');
  await q(`DELETE FROM mur_enregistrements WHERE membre_id = $1 AND publication_id = $2`, [req.user.mid, id]);
  return { enregistre: false };
});

// Profil public d'un membre du mur, mur v2 tranche 4,
// 25 nov. 2026 : jamais le matricule, compteurs calculés
// en lecture seule, publications visibles du membre avec
// le même curseur que le fil, limite 20. Mon suivi est
// faux quand je n'ai pas de fiche membre.
app.get('/mur/membres/:id', { preHandler: membreG }, async (req) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Membre introuvable.');
  const mid = req.user.mid ?? null;
  const membre = (await q(
    `SELECT m.id, m.nom_complet, m.fonction, e.nom AS etablissement_nom,
            m.photo_donnees AS photo, m.presentation, m.inscrit_le,
            (SELECT COUNT(*) FROM mur_publications WHERE auteur_id = m.id AND statut_moderation IN ('visible', 'en_examen')) AS nb_publications,
            (SELECT COUNT(*) FROM aimes a JOIN mur_publications p ON p.id = a.cible_id WHERE a.cible_type = 'mur' AND p.auteur_id = m.id AND p.statut_moderation IN ('visible', 'en_examen')) AS nb_reactions,
            (SELECT COUNT(*) FROM mur_suivis WHERE suivi_id = m.id) AS nb_abonnes,
            (SELECT COUNT(*) FROM mur_suivis WHERE suiveur_id = m.id) AS nb_abonnements,
            EXISTS (SELECT 1 FROM mur_suivis WHERE suiveur_id = $2 AND suivi_id = m.id) AS suivi_par_moi,
            (m.id = $2) AS est_moi
     FROM membres m
     LEFT JOIN etablissements e ON e.id = m.etablissement_id
     WHERE m.id = $1`,
    [id, mid],
  )).rows[0];
  if (!membre) throw httpError(404, 'Membre introuvable.');
  const limiteBrute = Number.parseInt(req.query.limite ?? '', 10);
  const limite = Number.isNaN(limiteBrute) ? 20 : Math.min(LIMITE_MUR_PUBLICATIONS, Math.max(1, limiteBrute));
  const params = [mid, id];
  const conditions = [`p.auteur_id = $2`, `p.statut_moderation IN ('visible', 'en_examen')`];
  const avant = typeof req.query.avant === 'string' ? req.query.avant : null;
  if (avant != null) {
    if (!UUID_RE.test(avant)) throw httpError(400, 'Curseur invalide.');
    const curseur = (await q(`SELECT cree_le FROM mur_publications WHERE id = $1`, [avant])).rows[0];
    if (!curseur) throw httpError(400, 'Curseur invalide.');
    params.push(curseur.cree_le, avant);
    conditions.push(`(p.cree_le, p.id) < ($${params.length - 1}, $${params.length})`);
  }
  params.push(limite + 1);
  const lignes = (await q(
    `SELECT ${COLONNES_PUBLICATION_MUR}
     ${JOINTURES_PUBLICATION_MUR}
     WHERE ${conditions.join(' AND ')}
     ORDER BY p.cree_le DESC, p.id DESC
     LIMIT $${params.length}`,
    params,
  )).rows;
  const suivante = lignes.length > limite ? lignes[limite - 1].id : null;
  return { membre: formaterProfilMur(membre), publications: lignes.slice(0, limite).map(formaterPublicationMur), suivante };
});

// Abonnés et abonnements d'un membre, 50 au plus : nom et
// établissement seulement, sans photo en liste, même règle
// que la recherche messagerie. 404 quand le membre n'existe
// pas, pour ne pas distinguer un membre sans abonnés.
app.get('/mur/membres/:id/abonnes', { preHandler: membreG }, async (req) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Membre introuvable.');
  const existe = (await q(`SELECT id FROM membres WHERE id = $1`, [id])).rows[0];
  if (!existe) throw httpError(404, 'Membre introuvable.');
  const lignes = (await q(
    `SELECT m.id, m.nom_complet, e.nom AS etablissement_nom
     FROM mur_suivis s
     JOIN membres m ON m.id = s.suiveur_id
     LEFT JOIN etablissements e ON e.id = m.etablissement_id
     WHERE s.suivi_id = $1
     ORDER BY s.cree_le DESC
     LIMIT 50`,
    [id],
  )).rows;
  return { membres: lignes.map(formaterMembreSuivi) };
});

app.get('/mur/membres/:id/abonnements', { preHandler: membreG }, async (req) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Membre introuvable.');
  const existe = (await q(`SELECT id FROM membres WHERE id = $1`, [id])).rows[0];
  if (!existe) throw httpError(404, 'Membre introuvable.');
  const lignes = (await q(
    `SELECT m.id, m.nom_complet, e.nom AS etablissement_nom
     FROM mur_suivis s
     JOIN membres m ON m.id = s.suivi_id
     LEFT JOIN etablissements e ON e.id = m.etablissement_id
     WHERE s.suiveur_id = $1
     ORDER BY s.cree_le DESC
     LIMIT 50`,
    [id],
  )).rows;
  return { membres: lignes.map(formaterMembreSuivi) };
});

// Suivre un membre, mur v2 tranche 4 : idempotent, 200
// quand le suivi existe déjà, sans nouvelle notification.
// 400 pour se suivre soi-même, 404 pour un membre
// inexistant. Nouveau suiveur : cloche seulement, lien
// vers le profil du suiveur, jamais de push.
app.post('/mur/suivis', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour suivre.');
  const suiviId = (req.body?.suivi_id ?? '').toString();
  if (!UUID_RE.test(suiviId)) throw httpError(400, 'Membre invalide.');
  if (suiviId === req.user.mid) throw httpError(400, 'Impossible de se suivre soi-même.');
  const existe = (await q(`SELECT id FROM membres WHERE id = $1`, [suiviId])).rows[0];
  if (!existe) throw httpError(404, 'Membre introuvable.');
  const cree = (await q(
    `INSERT INTO mur_suivis (suiveur_id, suivi_id) VALUES ($1, $2)
     ON CONFLICT (suiveur_id, suivi_id) DO NOTHING RETURNING id`,
    [req.user.mid, suiviId],
  )).rows[0];
  if (cree) {
    await notifierClocheSeule(
      suiviId,
      'mur_suivi',
      'Nouveau suiveur',
      'Bonjour {prenom}, un membre a commencé à vous suivre.',
      'mur_profil',
      req.user.mid,
      'Nouveau suiveur',
      'Un membre a commencé à vous suivre.',
    );
  }
  return { suivi: true };
});

app.delete('/mur/suivis/:id', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour suivre.');
  const suiviId = req.params.id;
  if (!UUID_RE.test(suiviId ?? '')) throw httpError(404, 'Suivi introuvable.');
  const effacees = (await q(
    `DELETE FROM mur_suivis WHERE suiveur_id = $1 AND suivi_id = $2`,
    [req.user.mid, suiviId],
  )).rowCount;
  if (effacees === 0) throw httpError(404, 'Suivi introuvable.');
  return { suivi: false };
});

app.post('/mur', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour publier.');
  // Administrateur d'établissement : seulement son établissement.
  // Administrateur général : celui de la requête, ou la structure.
  // Membre : son établissement.
  const etablissementId = req.user.role === 'admin_general'
    ? (typeof req.query.etablissement_id === 'string' && UUID_RE.test(req.query.etablissement_id) ? req.query.etablissement_id : null)
    : req.user.eid;
  if (req.user.role === 'admin_etablissement' && !etablissementId) throw httpError(403, 'Accès refusé.');
  const body = req.body ?? {};
  const refus = validerPublicationMur({ texte: body.texte, photo: body.photo, categorie: body.categorie });
  if (refus) throw httpError(refus.statut, refus.message);
  const textePropre = String(body.texte ?? '').trim();
  const photo = typeof body.photo === 'string' && body.photo !== '' ? body.photo : null;
  const categorie = typeof body.categorie === 'string' && CATEGORIES_MUR.includes(body.categorie) ? body.categorie : 'autre';
  const cree = (await q(
    `INSERT INTO mur_publications (auteur_id, etablissement_id, texte, photo_donnees, categorie)
     VALUES ($1,$2,$3,$4,$5) RETURNING id`,
    [req.user.mid, etablissementId, textePropre, photo, categorie],
  )).rows[0];
  const ligne = (await q(
    `SELECT ${COLONNES_PUBLICATION_MUR}
     ${JOINTURES_PUBLICATION_MUR}
     WHERE p.id = $2`,
    [req.user.mid ?? null, cree.id],
  )).rows[0];
  return reply.code(201).send({ publication: formaterPublicationMur(ligne) });
});

// Vidéo d'une publication, mur v2 tranche 2, 25 nov. 2026 :
// une seule vidéo par publication, 60 s côté application,
// 25 Mo côté serveur comme les stories, sur R2. Lecture par
// route même origine sans authentification, comme
// /stories/:id/media : l'identifiant est un UUID non
// devinable, la vidéo doit exister et la publication ne doit
// pas être masquée ni retirée.
app.post('/mur/:id/video', { preHandler: membreG }, async (req, reply) => {
  const config = configR2();
  // 503 explicite, comme les routes SMTP : le gestionnaire
  // d'erreurs convertit un httpError(503) en 500, comme pour
  // les stories, alors que la conception demande 503 ici.
  if (!config) return reply.code(503).send({ erreur: 'Les vidéos du mur sont désactivées pour le moment.' });
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Publication introuvable.');
  const ligne = (await q(
    `SELECT id, auteur_id, statut_moderation, cle_r2_video FROM mur_publications WHERE id = $1`,
    [id],
  )).rows[0];
  if (!ligne || ligne.statut_moderation === 'masque' || ligne.statut_moderation === 'retire') {
    throw httpError(404, 'Publication introuvable.');
  }
  // Auteur seulement, 404 indistinct sinon.
  if (req.user.mid == null || ligne.auteur_id !== req.user.mid) throw httpError(404, 'Publication introuvable.');
  const part = await req.file();
  if (!part) throw httpError(400, 'Aucune vidéo reçue.');
  // Lecture en mémoire, avec plafond : une vidéo de mur est
  // courte, jamais un gros fichier. Le flux est coupé dès le
  // dépassement, comme pour les stories.
  const morceaux = [];
  let taille = 0;
  for await (const morceau of part.file) {
    taille += morceau.length;
    if (taille > TAILLE_MAX_VIDEO_OCTETS) throw httpError(413, 'Vidéo trop volumineuse.');
    morceaux.push(morceau);
  }
  const octets = Buffer.concat(morceaux);
  if (octets.length === 0) throw httpError(400, 'Vidéo vide.');
  // Le type est lu dans les octets, jamais d'après le nom ou
  // l'en-tête envoyé, comme pour les stories.
  const ft = await fileTypeFromBuffer(octets);
  if (!ft || !MIMES_VIDEO.includes(ft.mime)) throw httpError(415, 'Type de vidéo non autorisé.');
  const cle = cleMurVideo(ft.mime);
  // Une seule vidéo par publication : l'ancien objet est
  // effacé avant l'envoi du nouveau, jamais deux objets pour
  // une même publication.
  if (ligne.cle_r2_video) await supprimerObjetR2(config, ligne.cle_r2_video);
  await envoyerObjetR2(config, cle, octets, ft.mime);
  await q(
    `UPDATE mur_publications SET cle_r2_video = $2, type_mime_video = $3, taille_video_octets = $4 WHERE id = $1`,
    [id, cle, ft.mime, octets.length],
  );
  const publiee = (await q(
    `SELECT ${COLONNES_PUBLICATION_MUR}
     ${JOINTURES_PUBLICATION_MUR}
     WHERE p.id = $2`,
    [req.user.mid ?? null, id],
  )).rows[0];
  return reply.code(200).send({ publication: formaterPublicationMur(publiee) });
});

app.get('/mur/:id/video', async (req, reply) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Vidéo introuvable.');
  const config = configR2();
  if (!config) throw httpError(404, 'Vidéo introuvable.');
  const ligne = (await q(
    `SELECT cle_r2_video, type_mime_video, statut_moderation FROM mur_publications WHERE id = $1`,
    [id],
  )).rows[0];
  if (!ligne || !ligne.cle_r2_video || ligne.statut_moderation === 'masque' || ligne.statut_moderation === 'retire') {
    throw httpError(404, 'Vidéo introuvable.');
  }
  let octets;
  try {
    octets = await lireObjetR2(config, ligne.cle_r2_video);
  } catch {
    throw httpError(502, 'Vidéo indisponible.');
  }
  reply.header('Cache-Control', 'private, max-age=600');
  return sendBuffer(req, reply, octets, ligne.type_mime_video);
});

app.delete('/mur/:id/video', { preHandler: membreG }, async (req) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Publication introuvable.');
  const ligne = (await q(`SELECT id, auteur_id, etablissement_id, cle_r2_video FROM mur_publications WHERE id = $1`, [id])).rows[0];
  if (!ligne) throw httpError(404, 'Publication introuvable.');
  // Auteur ou structure, comme pour la publication : 404 dans
  // les deux cas, sans révéler si la publication existe ou à
  // qui elle appartient.
  const estModerateur = req.user.role === 'admin_general' || req.user.role === 'admin_etablissement';
  const estAuteur = req.user.mid != null && ligne.auteur_id === req.user.mid;
  if (!estAuteur) {
    if (!estModerateur) throw httpError(404, 'Publication introuvable.');
    if (req.user.role === 'admin_etablissement' && req.user.eid !== ligne.etablissement_id) throw httpError(404, 'Publication introuvable.');
  }
  const config = configR2();
  if (config && ligne.cle_r2_video) await supprimerObjetR2(config, ligne.cle_r2_video);
  await q(
    `UPDATE mur_publications SET cle_r2_video = NULL, type_mime_video = NULL, taille_video_octets = NULL WHERE id = $1`,
    [id],
  );
  return { ok: true };
});

app.delete('/mur/:id', { preHandler: membreG }, async (req) => {
  const id = req.params.id;
  if (!UUID_RE.test(id ?? '')) throw httpError(404, 'Publication introuvable.');
  const ligne = (await q(`SELECT id, auteur_id, etablissement_id, cle_r2_video FROM mur_publications WHERE id = $1`, [id])).rows[0];
  if (!ligne) throw httpError(404, 'Publication introuvable.');
  // Auteur ou structure, comme pour les témoignages : 404 dans
  // les deux cas, sans révéler si la publication existe ou à
  // qui elle appartient.
  const estModerateur = req.user.role === 'admin_general' || req.user.role === 'admin_etablissement';
  const estAuteur = req.user.mid != null && ligne.auteur_id === req.user.mid;
  if (!estAuteur) {
    if (!estModerateur) throw httpError(404, 'Publication introuvable.');
    if (req.user.role === 'admin_etablissement' && req.user.eid !== ligne.etablissement_id) throw httpError(404, 'Publication introuvable.');
  }
  // Mur v2 tranche 2 : la vidéo R2 part avec la publication,
  // comme pour les témoignages. La suppression R2 ne lève
  // jamais, un objet déjà absent ne bloque rien.
  const config = configR2();
  if (config && ligne.cle_r2_video) await supprimerObjetR2(config, ligne.cle_r2_video);
  await q(`DELETE FROM aimes WHERE cible_type = 'mur' AND cible_id = $1`, [id]);
  await q(`DELETE FROM commentaires WHERE cible_type = 'mur' AND cible_id = $1`, [id]);
  await q(`DELETE FROM mur_enregistrements WHERE publication_id = $1`, [id]);
  await q(`DELETE FROM mur_publications WHERE id = $1`, [id]);
  return { ok: true };
});

// ───────────────────────── Chaîne de prière ─────────────────────────
// Tranche 1, 21 nov. 2026 : 24 créneaux d'une heure, un membre
// par créneau, un créneau par membre et par jour. La chaîne est
// celle du jour courant côté serveur (CURRENT_DATE, même
// convention que les rapports et les cotisations). Lecture pour
// tous les membres connectés, engagement et libération pour le
// membre lui-même seulement. Refus clair en 409 quand le
// créneau est pris ou quand le membre a déjà un créneau ce
// jour-là. L'unicité en base protège aussi deux demandes en
// même temps, le refus reste un 409.
// ───────────────────────── Chaîne de prière en direct ─────────────────────────
// Refonte d'après la maquette, 21 nov. 2026 : la page navigue
// d'un jour à l'autre, la réservation est ouverte aujourd'hui
// et les jours à venir, les jours passés sont en lecture
// seule. Le jour demandé arrive en ?jour=AAAA-MM-JJ sur la
// lecture, en corps sur l'engagement et la libération, il vaut
// le jour courant quand il est absent. La réponse donne aussi
// aujourd_hui, le jour courant côté serveur, pour que
// l'application sache quel jour est passé. Le déplacement d'un
// créneau vers un autre le même jour se fait en une seule
// opération, deplacer vrai, pour ne jamais perdre son créneau
// entre la libération et la reprise.
app.get('/chaine-priere', { preHandler: membreG }, async (req) => {
  const demande = typeof req.query.jour === 'string' ? req.query.jour : null;
  if (demande != null && normaliserJour(demande) == null) {
    throw httpError(400, 'Jour invalide : un jour AAAA-MM-JJ.');
  }
  const jour = demande ?? (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour;
  const lignes = (await q(
    `SELECT c.heure, c.membre_id, m.nom_complet
     FROM chaine_priere c
     LEFT JOIN membres m ON m.id = c.membre_id
     WHERE c.jour = $1::date
     ORDER BY c.heure ASC`,
    [jour],
  )).rows;
  const aujourdHui = (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour ?? null;
  // Sécurité, 22 nov. 2026 : les identifiants des autres
  // membres ne sortent plus, prénom seul pour leurs créneaux,
  // nom complet seulement pour le créneau de l'appelant.
  const creneaux = chaineComplete(lignes, req.user.mid ?? null);
  return { jour, aujourd_hui: aujourdHui, creneaux, couverts: compterCouverts(creneaux), total: NB_CRENEAUX };
});

app.post('/chaine-priere', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour prendre un créneau.');
  const refus = validerEngagement(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const heure = normaliserHeure(req.body.heure);
  const demande = typeof req.body.jour === 'string' ? req.body.jour : null;
  const jour = demande ?? (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour;
  const aujourdHui = (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour ?? null;
  if (jourPasse(jour, aujourdHui)) throw httpError(400, 'On ne peut pas réserver un jour passé.');
  const deplacer = req.body.deplacer === true;
  const cree = await tx(async (c) => {
    const pris = (await c.query(
      `SELECT membre_id FROM chaine_priere WHERE jour = $1::date AND heure = $2`,
      [jour, heure],
    )).rows[0];
    if (pris) throw httpError(409, 'Ce créneau est déjà pris.');
    if (deplacer) {
      await c.query(
        `DELETE FROM chaine_priere WHERE jour = $1::date AND membre_id = $2`,
        [jour, req.user.mid],
      );
    } else {
      const mien = (await c.query(
        `SELECT heure FROM chaine_priere WHERE jour = $1::date AND membre_id = $2`,
        [jour, req.user.mid],
      )).rows[0];
      if (mien) throw httpError(409, 'Tu as déjà un créneau ce jour-là.');
    }
    try {
      return (await c.query(
        `INSERT INTO chaine_priere (membre_id, jour, heure) VALUES ($1, $2::date, $3)
         RETURNING id, membre_id, heure, jour, cree_le`,
        [req.user.mid, jour, heure],
      )).rows[0];
    } catch (e) {
      if (e?.code === '23505') throw httpError(409, 'Ce créneau est déjà pris.');
      throw e;
    }
  });
  const nom = (await q(`SELECT nom_complet FROM membres WHERE id = $1`, [req.user.mid])).rows[0];
  return reply.code(201).send({
    jour: cree.jour instanceof Date ? cree.jour.toISOString().slice(0, 10) : String(cree.jour).slice(0, 10),
    creneau: { heure: cree.heure, membre_id: cree.membre_id, prenom: nom?.nom_complet?.split(/\s+/)[0] ?? '', nom_complet: nom?.nom_complet ?? '' },
  });
});

app.delete('/chaine-priere', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour libérer un créneau.');
  const demande = typeof req.body?.jour === 'string' ? req.body.jour : null;
  if (demande != null && normaliserJour(demande) == null) {
    throw httpError(400, 'Jour invalide : un jour AAAA-MM-JJ.');
  }
  const jour = demande ?? (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour;
  const aujourdHui = (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour ?? null;
  if (jourPasse(jour, aujourdHui)) throw httpError(400, 'On ne peut pas libérer un jour passé.');
  const supprime = (await q(
    `DELETE FROM chaine_priere WHERE jour = $1::date AND membre_id = $2 RETURNING heure`,
    [jour, req.user.mid],
  )).rows[0];
  if (!supprime) throw httpError(404, 'Tu n’as pas de créneau ce jour-là.');
  return { ok: true, heure: supprime.heure, jour };
});

// ───────────────────────── Programme du camp et cellules ─────────────────────────
// 21 nov. 2026 : le chronogramme n'existait nulle part, un camp
// n'avait que nom, dates, lieu et tarif. Le programme est lié à
// l'événement, jour par jour, modifiable par la structure selon
// l'année et les changements. Visible par le campeur inscrit et
// par son parent validé, jamais par tous les membres : un membre
// non inscrit reçoit 403, comme un visiteur sans fiche. Les
// cellules se répètent chaque semaine au même jour et à la même
// heure, modifiables semaine par semaine par une exception.
async function peutVoirChronogramme(req, evenementId) {
  if (req.user.role === 'admin_general' || req.user.role === 'admin_etablissement') return true;
  if (!req.user.mid) return false;
  const inscrit = (await q('SELECT 1 FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2', [evenementId, req.user.mid])).rows[0];
  if (inscrit) return true;
  const parent = (await q(
    `SELECT 1 FROM liens_parent_enfant l JOIN inscriptions i ON i.membre_id = l.enfant_membre_id
     WHERE l.parent_membre_id = $1 AND l.statut = 'valide' AND i.evenement_id = $2`,
    [req.user.mid, evenementId],
  )).rows[0];
  return !!parent;
}

function formaterEntreeChronogramme(row) {
  return {
    id: row.id,
    evenement_id: row.evenement_id,
    jour: row.jour instanceof Date ? row.jour.toISOString().slice(0, 10) : String(row.jour).slice(0, 10),
    heure_debut: String(row.heure_debut).slice(0, 5),
    heure_fin: String(row.heure_fin).slice(0, 5),
    titre: row.titre,
    lieu: row.lieu ?? '',
    type: row.type ?? '',
  };
}

app.get('/evenements/:id/chronogramme', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const evenement = (await q('SELECT id, nom, date_debut::text AS date_debut, date_fin::text AS date_fin FROM evenements WHERE id = $1', [id])).rows[0];
  if (!evenement) throw httpError(404, 'Camp introuvable.');
  if (!(await peutVoirChronogramme(req, id))) throw httpError(403, 'Le programme est visible par les campeurs inscrits et leurs parents.');
  const lignes = (await q(
    `SELECT * FROM chronogramme_camp WHERE evenement_id = $1 ORDER BY jour ASC, heure_debut ASC, titre ASC`,
    [id],
  )).rows;
  return { evenement, entrees: lignes.map(formaterEntreeChronogramme), types: TYPES_CRENEAU_MODELE };
});

app.post('/admin/evenements/:id/chronogramme', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: req.params.id });
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const evenement = (await q('SELECT id, date_debut::text AS date_debut, date_fin::text AS date_fin FROM evenements WHERE id = $1', [id])).rows[0];
  if (!evenement) throw httpError(404, 'Camp introuvable.');
  const refus = validerEntreeChronogramme(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const jour = normaliserJour(req.body.jour);
  if (evenement.date_debut && jour < evenement.date_debut) throw httpError(400, 'Le jour est avant le début du camp.');
  if (evenement.date_fin && jour > evenement.date_fin) throw httpError(400, 'Le jour est après la fin du camp.');
  try {
    const row = (await q(
      `INSERT INTO chronogramme_camp (evenement_id, jour, heure_debut, heure_fin, titre, lieu, type)
       VALUES ($1, $2::date, $3::time, $4::time, $5, $6, $7) RETURNING *`,
      [id, jour, normaliserHeureCamp(req.body.heure_debut), normaliserHeureCamp(req.body.heure_fin), String(req.body.titre).trim(), (req.body.lieu ?? '').toString().trim() || null, (req.body.type ?? '').toString().trim() || null],
    )).rows[0];
    return reply.code(201).send(formaterEntreeChronogramme(row));
  } catch (e) {
    if (e?.code === '23505') throw httpError(409, 'Un créneau existe déjà ce jour-là à cette heure.');
    throw e;
  }
});

app.post('/admin/evenements/:id/chronogramme/modele', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: req.params.id });
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const evenement = (await q('SELECT id, date_debut::text AS date_debut, date_fin::text AS date_fin FROM evenements WHERE id = $1', [id])).rows[0];
  if (!evenement) throw httpError(404, 'Camp introuvable.');
  const dimanche = normaliserJour(req.body?.dimanche);
  if (dimanche == null) throw httpError(400, 'Dimanche invalide : un jour AAAA-MM-JJ.');
  const entrees = appliquerModeleChronogramme(dimanche);
  if (entrees.length === 0) throw httpError(400, 'Le dimanche doit être un dimanche, AAAA-MM-JJ.');
  if (evenement.date_debut && dimanche < evenement.date_debut) throw httpError(400, 'La semaine est avant le début du camp.');
  if (evenement.date_fin && dimanche > evenement.date_fin) throw httpError(400, 'La semaine est après la fin du camp.');
  let inserees = 0;
  for (const e of entrees) {
    const r = await q(
      `INSERT INTO chronogramme_camp (evenement_id, jour, heure_debut, heure_fin, titre, lieu, type)
       VALUES ($1, $2::date, $3::time, $4::time, $5, NULL, $6) ON CONFLICT (evenement_id, jour, heure_debut) DO NOTHING RETURNING id`,
      [id, e.jour, e.heure_debut, e.heure_fin, e.titre, e.type],
    );
    inserees += r.rowCount;
  }
  return { ok: true, dimanche, inserees, total_modele: entrees.length };
});

app.put('/admin/evenements/:id/chronogramme/:entreeId', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: req.params.id });
  const { id, entreeId } = z.object({ id: z.string().uuid(), entreeId: z.string().uuid() }).parse(req.params);
  const evenement = (await q('SELECT id, date_debut::text AS date_debut, date_fin::text AS date_fin FROM evenements WHERE id = $1', [id])).rows[0];
  if (!evenement) throw httpError(404, 'Camp introuvable.');
  const refus = validerEntreeChronogramme(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const jour = normaliserJour(req.body.jour);
  if (evenement.date_debut && jour < evenement.date_debut) throw httpError(400, 'Le jour est avant le début du camp.');
  if (evenement.date_fin && jour > evenement.date_fin) throw httpError(400, 'Le jour est après la fin du camp.');
  const row = (await q(
    `UPDATE chronogramme_camp SET jour = $3::date, heure_debut = $4::time, heure_fin = $5::time, titre = $6, lieu = $7, type = $8, modifie_le = now()
     WHERE id = $1 AND evenement_id = $2 RETURNING *`,
    [entreeId, id, normaliserJour(req.body.jour), normaliserHeureCamp(req.body.heure_debut), normaliserHeureCamp(req.body.heure_fin), String(req.body.titre).trim(), (req.body.lieu ?? '').toString().trim() || null, (req.body.type ?? '').toString().trim() || null],
  )).rows[0];
  if (!row) throw httpError(404, 'Créneau introuvable.');
  return formaterEntreeChronogramme(row);
});

app.delete('/admin/evenements/:id/chronogramme/:entreeId', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: req.params.id });
  const { id, entreeId } = z.object({ id: z.string().uuid(), entreeId: z.string().uuid() }).parse(req.params);
  const row = (await q('DELETE FROM chronogramme_camp WHERE id = $1 AND evenement_id = $2 RETURNING id', [entreeId, id])).rows[0];
  if (!row) throw httpError(404, 'Créneau introuvable.');
  return { ok: true };
});

// Cellules d'un établissement, semaine demandée ou semaine
// courante côté serveur. Chaque cellule porte son occurrence
// de la semaine, avec l'exception appliquée, et ses personnes
// assignées par rôle, prénom et matricule seulement.
app.get('/etablissements/:id/cellules', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const etablissement = (await q('SELECT id, nom FROM etablissements WHERE id = $1', [id])).rows[0];
  if (!etablissement) throw httpError(404, 'Établissement introuvable.');
  // Sécurité, 22 nov. 2026 : la liste n'est plus ouverte à
  // tout membre. Administrateur général partout, administrateur
  // d'établissement sur le sien seulement, membre seulement
  // s'il est de l'établissement ou assigné à une de ses
  // cellules. Hors périmètre, 404, sans révéler l'existence.
  if (req.user.role === 'admin_etablissement' && req.user.eid !== id) throw httpError(404, 'Établissement introuvable.');
  if (req.user.role === 'membre') {
    const moi = req.user.mid ? (await q('SELECT etablissement_id FROM membres WHERE id = $1', [req.user.mid])).rows[0] : null;
    const deEtab = moi?.etablissement_id === id;
    const deCellule = !deEtab && req.user.mid ? (await q(
      `SELECT 1 FROM cellule_assignations a JOIN cellules c ON c.id = a.cellule_id WHERE a.membre_id = $1 AND c.etablissement_id = $2 LIMIT 1`,
      [req.user.mid, id],
    )).rows[0] : null;
    if (!deEtab && !deCellule) throw httpError(404, 'Établissement introuvable.');
  }
  const demande = typeof req.query.semaine === 'string' ? req.query.semaine : null;
  if (demande != null && normaliserJour(demande) == null) throw httpError(400, 'Semaine invalide : un jour AAAA-MM-JJ.');
  const aujourdHui = (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour;
  const semaine = demande ?? lundiDeLaSemaine(aujourdHui);
  if (new Date(`${semaine}T00:00:00Z`).getUTCDay() !== 1) throw httpError(400, 'Semaine invalide : le lundi de la semaine.');
  const cellules = (await q(
    `SELECT c.* FROM cellules c WHERE c.etablissement_id = $1 ORDER BY c.jour_semaine ASC, c.heure ASC, c.nom ASC`,
    [id],
  )).rows;
  const result = [];
  for (const c of cellules) {
    const assignations = (await q(
      `SELECT a.membre_id, a.role, m.nom_complet, m.matricule FROM cellule_assignations a
       JOIN membres m ON m.id = a.membre_id WHERE a.cellule_id = $1 ORDER BY a.role ASC, m.nom_complet ASC`,
      [c.id],
    )).rows.map((a) => ({ membre_id: a.membre_id, role: a.role, nom_complet: a.nom_complet, matricule: a.matricule }));
    const exception = (await q(
      `SELECT annulee, heure::text AS heure, lieu, note FROM cellule_exceptions WHERE cellule_id = $1 AND semaine = $2::date`,
      [c.id, semaine],
    )).rows[0];
    const dateOccurrence = prochaineOccurrence(c.jour_semaine, semaine);
    const occurrence = appliquerExceptionCellule(
      { date: dateOccurrence, heure: String(c.heure).slice(0, 5), lieu: c.lieu ?? '' },
      exception ? { annulee: exception.annulee, heure: exception.heure ? String(exception.heure).slice(0, 5) : null, lieu: exception.lieu, note: exception.note } : null,
    );
    result.push({
      id: c.id,
      etablissement_id: c.etablissement_id,
      nom: c.nom,
      jour_semaine: c.jour_semaine,
      jour_libelle: libelleJourSemaine(c.jour_semaine),
      heure: String(c.heure).slice(0, 5),
      lieu: c.lieu ?? '',
      assignations,
      occurrence,
    });
  }
  return { etablissement, semaine, roles: ROLES_CELLULE, cellules: result };
});

const celluleEtablissement = async (celluleId) => {
  const row = (await q('SELECT etablissement_id FROM cellules WHERE id = $1', [celluleId])).rows[0];
  return row?.etablissement_id ?? null;
};

app.post('/admin/etablissements/:id/cellules', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  if (!peutGerer(req, id)) throw httpError(403, 'Accès refusé à cet établissement.');
  const refus = validerCellule(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  try {
    const row = (await q(
      `INSERT INTO cellules (etablissement_id, nom, jour_semaine, heure, lieu)
       VALUES ($1, $2, $3, $4::time, $5) RETURNING *`,
      [id, String(req.body.nom).trim(), Number(req.body.jour_semaine), normaliserHeureCamp(req.body.heure), (req.body.lieu ?? '').toString().trim() || null],
    )).rows[0];
    return reply.code(201).send({ ...row, heure: String(row.heure).slice(0, 5) });
  } catch (e) {
    if (e?.code === '23505') throw httpError(409, 'Une cellule de ce nom existe déjà dans cet établissement.');
    throw e;
  }
});

app.put('/admin/cellules/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const etablissementId = await celluleEtablissement(id);
  if (!etablissementId) throw httpError(404, 'Cellule introuvable.');
  if (!peutGerer(req, etablissementId)) throw httpError(403, 'Accès refusé à cet établissement.');
  const refus = validerCellule(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const row = (await q(
    `UPDATE cellules SET nom = $2, jour_semaine = $3, heure = $4::time, lieu = $5, modifie_le = now() WHERE id = $1 RETURNING *`,
    [id, String(req.body.nom).trim(), Number(req.body.jour_semaine), normaliserHeureCamp(req.body.heure), (req.body.lieu ?? '').toString().trim() || null],
  )).rows[0];
  return { ...row, heure: String(row.heure).slice(0, 5) };
});

app.delete('/admin/cellules/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const etablissementId = await celluleEtablissement(id);
  if (!etablissementId) throw httpError(404, 'Cellule introuvable.');
  if (!peutGerer(req, etablissementId)) throw httpError(403, 'Accès refusé à cet établissement.');
  await q('DELETE FROM cellules WHERE id = $1', [id]);
  return { ok: true };
});

app.post('/admin/cellules/:id/assignations', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const etablissementId = await celluleEtablissement(id);
  if (!etablissementId) throw httpError(404, 'Cellule introuvable.');
  if (!peutGerer(req, etablissementId)) throw httpError(403, 'Accès refusé à cet établissement.');
  const b = z.object({ membre_id: z.string().uuid(), role: z.string() }).parse(req.body ?? {});
  const refus = validerAssignation(b);
  if (refus) throw httpError(refus.statut, refus.message);
  const membre = (await q('SELECT id FROM membres WHERE id = $1', [b.membre_id])).rows[0];
  if (!membre) throw httpError(404, 'Membre introuvable.');
  try {
    const row = (await q(
      `INSERT INTO cellule_assignations (cellule_id, membre_id, role) VALUES ($1, $2, $3) RETURNING *`,
      [id, b.membre_id, b.role],
    )).rows[0];
    return reply.code(201).send(row);
  } catch (e) {
    if (e?.code === '23505') throw httpError(409, 'Ce membre est déjà assigné à cette cellule, ou un dirigeant est déjà nommé.');
    throw e;
  }
});

app.delete('/admin/cellules/:id/assignations/:membreId', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id, membreId } = z.object({ id: z.string().uuid(), membreId: z.string().uuid() }).parse(req.params);
  const etablissementId = await celluleEtablissement(id);
  if (!etablissementId) throw httpError(404, 'Cellule introuvable.');
  if (!peutGerer(req, etablissementId)) throw httpError(403, 'Accès refusé à cet établissement.');
  const row = (await q('DELETE FROM cellule_assignations WHERE cellule_id = $1 AND membre_id = $2 RETURNING id', [id, membreId])).rows[0];
  if (!row) throw httpError(404, 'Assignation introuvable.');
  return { ok: true };
});

app.post('/admin/cellules/:id/exceptions', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const etablissementId = await celluleEtablissement(id);
  if (!etablissementId) throw httpError(404, 'Cellule introuvable.');
  if (!peutGerer(req, etablissementId)) throw httpError(403, 'Accès refusé à cet établissement.');
  const refus = validerException(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const semaine = normaliserJour(req.body.semaine);
  const row = (await q(
    `INSERT INTO cellule_exceptions (cellule_id, semaine, annulee, heure, lieu, note)
     VALUES ($1, $2::date, $3, $4::time, $5, $6)
     ON CONFLICT (cellule_id, semaine) DO UPDATE SET annulee = EXCLUDED.annulee, heure = EXCLUDED.heure, lieu = EXCLUDED.lieu, note = EXCLUDED.note
     RETURNING *`,
    [id, semaine, req.body.annulee === true, normaliserHeureCamp(req.body.heure ?? '') ?? null, (req.body.lieu ?? '').toString().trim() || null, (req.body.note ?? '').toString().trim() || null],
  )).rows[0];
  return reply.code(201).send(row);
});

// ───────────────────────── Défis de prière 7 jours ─────────────────────────
// Tranches 1 à 3 de l'audit du 17 nov., 21 nov. 2026 : un défi
// dure 7 jours à partir de sa date de début, la structure comme
// un membre peut en créer un, chaque participant coche chaque
// jour fait, progression x/7. Le rappel matinal est local, côté
// application, jamais envoyé par le serveur. Le jour coché doit
// être dans la fenêtre du défi, et un jour déjà coché est refusé
// en 409. Ne pas confondre avec le défi du quiz hebdomadaire,
// routes /defi/*, qui est un classement par score.
app.get('/defis-priere', { preHandler: membreG }, async (req) => {
  const lignes = (await q(
    `SELECT d.id, d.titre, d.description, d.date_debut::text AS date_debut, d.cree_le,
            (SELECT COUNT(*) FROM defis_participants p WHERE p.defi_id = d.id) AS participants,
            (SELECT p.jours_valides FROM defis_participants p WHERE p.defi_id = d.id AND p.membre_id = $1) AS mes_jours
     FROM defis_priere d
     ORDER BY d.date_debut DESC, d.cree_le DESC`,
    [req.user.mid],
  )).rows;
  return { defis: lignes.map((l) => formaterDefiPublic(l, l.mes_jours ?? null)) };
});

app.post('/defis-priere', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour créer un défi.');
  const refus = validerDefi(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  const cree = (await q(
    `INSERT INTO defis_priere (titre, description, date_debut, createur_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, titre, description, date_debut::text AS date_debut, cree_le`,
    [b.titre.trim(), (b.description ?? '').toString().trim(), b.date_debut, req.user.mid],
  )).rows[0];
  return reply.code(201).send({ defi: formaterDefiPublic({ ...cree, participants: 0 }, []) });
});

app.post('/defis-priere/:id/rejoindre', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour rejoindre un défi.');
  const defi = (await q(`SELECT id, date_debut::text AS date_debut FROM defis_priere WHERE id = $1`, [req.params.id])).rows[0];
  if (!defi) throw httpError(404, 'Défi introuvable.');
  if (dateFinDefi(defi.date_debut) < (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour) throw httpError(409, 'Ce défi est terminé.');
  try {
    await q(
      `INSERT INTO defis_participants (defi_id, membre_id) VALUES ($1, $2)`,
      [defi.id, req.user.mid],
    );
  } catch (e) {
    if (e?.code === '23505') throw httpError(409, 'Tu participes déjà à ce défi.');
    throw e;
  }
  return reply.code(201).send({ ok: true });
});

app.post('/defis-priere/:id/jour', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour cocher un jour.');
  const refus = validerJourDefi(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const jour = normaliserJourDefi(req.body.jour);
  const defi = (await q(`SELECT id, date_debut::text AS date_debut FROM defis_priere WHERE id = $1`, [req.params.id])).rows[0];
  if (!defi) throw httpError(404, 'Défi introuvable.');
  const aujourdHui = (await q(`SELECT CURRENT_DATE::text AS jour`)).rows[0]?.jour;
  const courant = jourCourantDefi(defi.date_debut, aujourdHui);
  if (courant == null) throw httpError(409, aujourdHui < defi.date_debut ? 'Ce défi n’a pas encore commencé.' : 'Ce défi est terminé.');
  if (jour > courant) throw httpError(409, 'Ce jour n’est pas encore arrivé.');
  const mis = (await q(
    `UPDATE defis_participants SET jours_valides = array_append(jours_valides, $2)
     WHERE defi_id = $1 AND membre_id = $3 AND NOT ($2 = ANY(jours_valides))
     RETURNING jours_valides`,
    [defi.id, jour, req.user.mid],
  )).rows[0];
  if (!mis) {
    const inscrit = (await q(`SELECT 1 FROM defis_participants WHERE defi_id = $1 AND membre_id = $2`, [defi.id, req.user.mid])).rows[0];
    if (!inscrit) throw httpError(404, 'Tu ne participes pas à ce défi.');
    throw httpError(409, 'Ce jour est déjà coché.');
  }
  const jours = joursValidesUniques(mis.jours_valides);
  return { ok: true, jours_valides: jours, progression: compterJoursValides(jours), total: NB_JOURS_DEFI };
});

// ───────────────────────── Carnet de Promesses ─────────────────────────
// Tranches 1 à 3 de l'audit du 17 nov., 21 nov. 2026 : carnet
// personnel du membre, visible par lui seul, jamais partagé.
// Le texte du verset n'est jamais stocké ici : il vient de la
// Bible embarquée dans l'application, à partir de la référence
// saisie, sinon le champ texte reste saisi par le membre.
app.get('/promesses', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) return { promesses: [] };
  const lignes = (await q(
    `SELECT id, reference, note, texte, cree_le FROM promesses
     WHERE membre_id = $1 ORDER BY cree_le DESC`,
    [req.user.mid],
  )).rows;
  return { promesses: lignes.map(formaterPromesse) };
});

app.post('/promesses', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour enregistrer une promesse.');
  const refus = validerPromesse(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  const cree = (await q(
    `INSERT INTO promesses (membre_id, reference, note, texte)
     VALUES ($1, $2, $3, $4)
     RETURNING id, reference, note, texte, cree_le`,
    [req.user.mid, b.reference.trim(), (b.note ?? '').toString().trim(), (b.texte ?? '').toString().trim()],
  )).rows[0];
  return reply.code(201).send({ promesse: formaterPromesse(cree) });
});

app.delete('/promesses/:id', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(404, 'Promesse introuvable.');
  const supprime = (await q(
    `DELETE FROM promesses WHERE id = $1 AND membre_id = $2 RETURNING id`,
    [req.params.id, req.user.mid],
  )).rows[0];
  if (!supprime) throw httpError(404, 'Promesse introuvable.');
  return { ok: true };
});

// ───────────────────────── Demandes de prière avec suivi ─────────────────────────
// Tranches 1 à 3 de l'audit du 17 nov., 21 nov. 2026 : le membre
// envoie une demande et suit son statut, ouvert, en cours ou
// exaucée, avec une note de suivi ajoutée par le Bureau. Les
// sujets de prière par e-mail, route /prieres, existent déjà et
// ne changent pas. Le membre ne voit que les siennes, le Bureau
// voit toutes, dans son périmètre pour un administrateur
// d'établissement, et change le statut.
app.get('/demandes-priere', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) return { demandes: [] };
  const lignes = (await q(
    `SELECT id, texte, statut, note_suivi, cree_le, modifie_le FROM demandes_priere
     WHERE membre_id = $1 ORDER BY cree_le DESC`,
    [req.user.mid],
  )).rows;
  return { demandes: lignes.map(formaterDemandePriere) };
});

app.post('/demandes-priere', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour envoyer une demande de prière.');
  const refus = validerDemandePriere(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const cree = (await q(
    `INSERT INTO demandes_priere (membre_id, texte, statut)
     VALUES ($1, $2, 'ouvert')
     RETURNING id, texte, statut, note_suivi, cree_le, modifie_le`,
    [req.user.mid, req.body.texte.trim()],
  )).rows[0];
  return reply.code(201).send({ demande: formaterDemandePriere(cree) });
});

app.get('/admin/demandes-priere', { preHandler: contenuG }, async (req) => {
  const lignes = (await q(
    `SELECT d.id, d.texte, d.statut, d.note_suivi, d.cree_le, d.modifie_le,
            split_part(m.nom_complet, ' ', 1) AS prenom
     FROM demandes_priere d
     LEFT JOIN membres m ON m.id = d.membre_id
     WHERE ($1::text = 'admin_general' OR m.etablissement_id = $2)
     ORDER BY d.cree_le DESC`,
    [req.user.role, req.user.eid ?? null],
  )).rows;
  return { demandes: lignes.map(formaterDemandePriere) };
});

app.patch('/admin/demandes-priere/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const refus = validerSuiviDemandePriere(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const ligne = (await q(
    `SELECT d.id FROM demandes_priere d
     LEFT JOIN membres m ON m.id = d.membre_id
     WHERE d.id = $1 AND ($2::text = 'admin_general' OR m.etablissement_id = $3)`,
    [req.params.id, req.user.role, req.user.eid ?? null],
  )).rows[0];
  if (!ligne) throw httpError(404, 'Demande introuvable.');
  const b = req.body;
  const mise = (await q(
    `UPDATE demandes_priere SET statut = $1, note_suivi = $2, modifie_le = now()
     WHERE id = $3
     RETURNING id, texte, statut, note_suivi, cree_le, modifie_le`,
    [b.statut, (b.note_suivi ?? '').toString().trim(), req.params.id],
  )).rows[0];
  return { demande: formaterDemandePriere(mise) };
});

// ───────────────────────── Parrainage jusqu'au baptême ─────────────────────────
// Tranches 4 et 5 de l'audit du 17 nov., 21 nov. 2026 : la
// structure désigne un parrain pour un nouveau membre, le
// parrain voit ses filleuls et leur avancement, le filleul
// voit son parrain, la structure marque le baptême, ce qui
// clôt le parrainage. Un filleul n'a qu'un seul parrainage en
// cours, l'unicité partielle en base protège deux désignations
// en même temps. L'administrateur d'établissement ne désigne
// et ne voit que dans son établissement.
app.get('/parrainages', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) return { comme_parrain: [], mon_parrain: null };
  const commeParrain = (await q(
    `SELECT p.id, p.parrain_id, p.filleul_id, p.date_debut::text AS date_debut, p.statut, p.date_bapteme::text AS date_bapteme,
            m.nom_complet AS filleul_nom
     FROM parrainages p LEFT JOIN membres m ON m.id = p.filleul_id
     WHERE p.parrain_id = $1 ORDER BY p.date_debut DESC`,
    [req.user.mid],
  )).rows;
  const monParrain = (await q(
    `SELECT p.id, p.parrain_id, p.filleul_id, p.date_debut::text AS date_debut, p.statut, p.date_bapteme::text AS date_bapteme,
            m.nom_complet AS parrain_nom
     FROM parrainages p LEFT JOIN membres m ON m.id = p.parrain_id
     WHERE p.filleul_id = $1 ORDER BY p.date_debut DESC LIMIT 1`,
    [req.user.mid],
  )).rows[0];
  return {
    comme_parrain: commeParrain.map(formaterParrainage),
    mon_parrain: monParrain ? formaterParrainage(monParrain) : null,
  };
});

app.post('/admin/parrainages', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const refus = validerParrainage(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  const membres = (await q(
    `SELECT id, etablissement_id FROM membres WHERE id = ANY($1::uuid[])`,
    [[b.parrain_id, b.filleul_id]],
  )).rows;
  if (membres.length !== 2) throw httpError(404, 'Membre introuvable.');
  if (req.user.role === 'admin_etablissement' && membres.some((m) => m.etablissement_id !== req.user.eid)) {
    throw httpError(404, 'Membre introuvable.');
  }
  try {
    await q(
      `INSERT INTO parrainages (parrain_id, filleul_id, statut) VALUES ($1, $2, 'en cours')`,
      [b.parrain_id, b.filleul_id],
    );
  } catch (e) {
    if (e?.code === '23505') throw httpError(409, 'Ce membre a déjà un parrainage en cours.');
    throw e;
  }
  const cree = (await q(
    `SELECT p.id, p.parrain_id, p.filleul_id, p.date_debut::text AS date_debut, p.statut, p.date_bapteme::text AS date_bapteme,
            mp.nom_complet AS parrain_nom, mf.nom_complet AS filleul_nom
     FROM parrainages p
     LEFT JOIN membres mp ON mp.id = p.parrain_id
     LEFT JOIN membres mf ON mf.id = p.filleul_id
     WHERE p.parrain_id = $1 AND p.filleul_id = $2 AND p.statut = 'en cours'
     ORDER BY p.cree_le DESC LIMIT 1`,
    [b.parrain_id, b.filleul_id],
  )).rows[0];
  return reply.code(201).send({ parrainage: formaterParrainage(cree) });
});

app.get('/admin/parrainages', { preHandler: contenuG }, async (req) => {
  const lignes = (await q(
    `SELECT p.id, p.parrain_id, p.filleul_id, p.date_debut::text AS date_debut, p.statut, p.date_bapteme::text AS date_bapteme,
            mp.nom_complet AS parrain_nom, mf.nom_complet AS filleul_nom
     FROM parrainages p
     LEFT JOIN membres mp ON mp.id = p.parrain_id
     LEFT JOIN membres mf ON mf.id = p.filleul_id
     WHERE ($1::text = 'admin_general' OR mf.etablissement_id = $2)
     ORDER BY p.date_debut DESC`,
    [req.user.role, req.user.eid ?? null],
  )).rows;
  return { parrainages: lignes.map(formaterParrainage) };
});

app.patch('/admin/parrainages/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'moderateur', 'responsable');
  const refus = validerBapteme(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const ligne = (await q(
    `SELECT p.id, p.statut FROM parrainages p
     LEFT JOIN membres mf ON mf.id = p.filleul_id
     WHERE p.id = $1 AND ($2::text = 'admin_general' OR mf.etablissement_id = $3)`,
    [req.params.id, req.user.role, req.user.eid ?? null],
  )).rows[0];
  if (!ligne) throw httpError(404, 'Parrainage introuvable.');
  if (ligne.statut === 'baptisé') throw httpError(409, 'Ce parrainage est déjà clos par le baptême.');
  const mis = (await q(
    `UPDATE parrainages SET statut = 'baptisé', date_bapteme = $1
     WHERE id = $2
     RETURNING id, parrain_id, filleul_id, date_debut::text AS date_debut, statut, date_bapteme::text AS date_bapteme`,
    [req.body.date_bapteme, req.params.id],
  )).rows[0];
  const noms = (await q(
    `SELECT mp.nom_complet AS parrain_nom, mf.nom_complet AS filleul_nom
     FROM parrainages p
     LEFT JOIN membres mp ON mp.id = p.parrain_id
     LEFT JOIN membres mf ON mf.id = p.filleul_id
     WHERE p.id = $1`,
    [req.params.id],
  )).rows[0];
  return { parrainage: formaterParrainage({ ...mis, ...noms }) };
});

// ───────────────────────── Culte en direct et replay chapitré ─────────────────────────
// Tranches 4 et 5 de l'audit du 17 nov., 21 nov. 2026 : la
// structure publie un culte avec le lien du direct et, quand
// il existe, celui du replay, puis découpe le replay en
// chapitres. Lecture pour tout membre, publication par la
// structure seulement. Aucun fournisseur de diffusion n'est
// imposé : la structure fournit les URL. À ne pas confondre
// avec les cultes présentiels, événements de type 'culte' avec
// présence du membre : ceux-là ne changent pas.
app.get('/cultes-direct', { preHandler: membreG }, async (req) => {
  const lignes = (await q(
    `SELECT id, titre, date::text AS date, url_direct, url_replay, statut
     FROM cultes_direct ORDER BY date DESC, cree_le DESC`,
  )).rows;
  const chapitres = (await q(
    `SELECT id, culte_id, titre, debut_secondes FROM cultes_direct_chapitres ORDER BY culte_id, debut_secondes`,
  )).rows;
  const parCulte = new Map();
  for (const c of chapitres) {
    if (!parCulte.has(c.culte_id)) parCulte.set(c.culte_id, []);
    parCulte.get(c.culte_id).push(c);
  }
  return { cultes: lignes.map((l) => formaterCulteDirect(l, parCulte.get(l.id) ?? [])) };
});

app.get('/cultes-direct/:id', { preHandler: membreG }, async (req) => {
  const ligne = (await q(
    `SELECT id, titre, date::text AS date, url_direct, url_replay, statut FROM cultes_direct WHERE id = $1`,
    [req.params.id],
  )).rows[0];
  if (!ligne) throw httpError(404, 'Culte introuvable.');
  const chapitres = (await q(
    `SELECT id, culte_id, titre, debut_secondes FROM cultes_direct_chapitres WHERE culte_id = $1 ORDER BY debut_secondes`,
    [req.params.id],
  )).rows;
  return { culte: formaterCulteDirect(ligne, chapitres) };
});

app.post('/admin/cultes-direct', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const refus = validerCulte(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  const cree = (await q(
    `INSERT INTO cultes_direct (titre, date, url_direct, url_replay, statut)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, titre, date::text AS date, url_direct, url_replay, statut`,
    [b.titre.trim(), b.date, (b.url_direct ?? '').toString().trim(), (b.url_replay ?? '').toString().trim(), b.statut ?? 'à venir'],
  )).rows[0];
  return reply.code(201).send({ culte: formaterCulteDirect(cree, []) });
});

app.patch('/admin/cultes-direct/:id', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const refus = validerCulteModif(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  const champs = [];
  const valeurs = [];
  const poser = (colonne, valeur) => {
    valeurs.push(valeur);
    champs.push(`${colonne} = $${valeurs.length}`);
  };
  if (b.titre !== undefined) poser('titre', b.titre.trim());
  if (b.date !== undefined) poser('date', b.date);
  if (b.url_direct !== undefined) poser('url_direct', b.url_direct.toString().trim());
  if (b.url_replay !== undefined) poser('url_replay', b.url_replay.toString().trim());
  if (b.statut !== undefined) poser('statut', b.statut);
  if (champs.length === 0) throw httpError(400, 'Aucun changement à enregistrer.');
  poser('modifie_le', new Date().toISOString());
  const mis = (await q(
    `UPDATE cultes_direct SET ${champs.join(', ')} WHERE id = $${valeurs.length + 1}
     RETURNING id, titre, date::text AS date, url_direct, url_replay, statut`,
    [...valeurs, req.params.id],
  )).rows[0];
  if (!mis) throw httpError(404, 'Culte introuvable.');
  const chapitres = (await q(
    `SELECT id, culte_id, titre, debut_secondes FROM cultes_direct_chapitres WHERE culte_id = $1 ORDER BY debut_secondes`,
    [req.params.id],
  )).rows;
  return { culte: formaterCulteDirect(mis, chapitres) };
});

app.post('/admin/cultes-direct/:id/chapitres', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const refus = validerChapitreCulte(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const culte = (await q(`SELECT id FROM cultes_direct WHERE id = $1`, [req.params.id])).rows[0];
  if (!culte) throw httpError(404, 'Culte introuvable.');
  const cree = (await q(
    `INSERT INTO cultes_direct_chapitres (culte_id, titre, debut_secondes)
     VALUES ($1, $2, $3)
     RETURNING id, titre, debut_secondes`,
    [culte.id, req.body.titre.trim(), normaliserDebutSecondes(req.body.debut_secondes)],
  )).rows[0];
  return reply.code(201).send({ chapitre: formaterChapitreCulte(cree) });
});

app.delete('/admin/cultes-direct/:id/chapitres/:chapitreId', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  const supprime = (await q(
    `DELETE FROM cultes_direct_chapitres WHERE id = $1 AND culte_id = $2 RETURNING id`,
    [req.params.chapitreId, req.params.id],
  )).rows[0];
  if (!supprime) throw httpError(404, 'Chapitre introuvable.');
  return { ok: true };
});

// ───────────────────────── Réactions « Amen » ─────────────────────────
// Tranches 6 de l'audit du 17 nov., 21 nov. 2026 : un Amen par
// membre et par cible, méditation ou enseignement, bascule
// possible. POST est idempotent : un deuxième Amen du même
// membre sur la même cible renvoie le compte, sans doublon,
// l'unicité en base protège deux envois en même temps.
app.get('/amens', { preHandler: membreG }, async (req) => {
  const cibleType = req.query.cible_type;
  const cibleId = req.query.cible_id;
  const refus = validerAmen({ cible_type: cibleType, cible_id: cibleId });
  if (refus) throw httpError(refus.statut, refus.message);
  const compte = (await q(
    `SELECT COUNT(*) AS nombre,
            EXISTS (SELECT 1 FROM amens WHERE cible_type = $1 AND cible_id = $2 AND membre_id = $3) AS a_dit_amen
     FROM amens WHERE cible_type = $1 AND cible_id = $2`,
    [cibleType, cibleId, req.user.mid],
  )).rows[0];
  return formaterCompteAmen({ cible_type: cibleType, cible_id: cibleId, nombre: compte.nombre, a_dit_amen: compte.a_dit_amen });
});

// Comptes de plusieurs cibles d'un coup, pour une liste de
// cartes : un seul appel au lieu d'un appel par carte.
app.get('/amens/comptes', { preHandler: membreG }, async (req) => {
  const cibleType = req.query.cible_type;
  const bruts = (req.query.cible_ids ?? '').toString().split(',').map((s) => s.trim()).filter(Boolean);
  if (!['méditation', 'enseignement'].includes(cibleType)) throw httpError(400, 'La cible des Amens est invalide.');
  if (bruts.length === 0 || bruts.length > 100) throw httpError(400, 'La liste des cibles est invalide.');
  const valides = bruts.filter((id) => validerAmen({ cible_type: cibleType, cible_id: id }) == null);
  if (valides.length === 0) return { comptes: [] };
  const lignes = (await q(
    `SELECT cible_id, COUNT(*) AS nombre,
            BOOL_OR(membre_id = $2) AS a_dit_amen
     FROM amens WHERE cible_type = $1 AND cible_id = ANY($3::text[])
     GROUP BY cible_id`,
    [cibleType, req.user.mid, valides],
  )).rows;
  const parId = new Map(lignes.map((l) => [l.cible_id, l]));
  return {
    comptes: valides.map((id) => formaterCompteAmen({
      cible_type: cibleType,
      cible_id: id,
      nombre: parId.get(id)?.nombre ?? 0,
      a_dit_amen: parId.get(id)?.a_dit_amen ?? false,
    })),
  };
});

app.post('/amens', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour dire Amen.');
  const refus = validerAmen(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  await q(
    `INSERT INTO amens (membre_id, cible_type, cible_id) VALUES ($1, $2, $3)
     ON CONFLICT (membre_id, cible_type, cible_id) DO NOTHING`,
    [req.user.mid, b.cible_type, b.cible_id],
  );
  const compte = (await q(
    `SELECT COUNT(*) AS nombre FROM amens WHERE cible_type = $1 AND cible_id = $2`,
    [b.cible_type, b.cible_id],
  )).rows[0];
  return reply.code(201).send({ amen: formaterCompteAmen({ cible_type: b.cible_type, cible_id: b.cible_id, nombre: compte.nombre, a_dit_amen: true }) });
});

app.delete('/amens/:cibleType/:cibleId', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour retirer son Amen.');
  const cibleType = decodeURIComponent(req.params.cibleType);
  const cibleId = decodeURIComponent(req.params.cibleId);
  const refus = validerAmen({ cible_type: cibleType, cible_id: cibleId });
  if (refus) throw httpError(refus.statut, refus.message);
  const supprime = (await q(
    `DELETE FROM amens WHERE membre_id = $1 AND cible_type = $2 AND cible_id = $3 RETURNING id`,
    [req.user.mid, cibleType, cibleId],
  )).rows[0];
  if (!supprime) throw httpError(404, 'Tu n’as pas dit Amen à cette cible.');
  const compte = (await q(
    `SELECT COUNT(*) AS nombre FROM amens WHERE cible_type = $1 AND cible_id = $2`,
    [cibleType, cibleId],
  )).rows[0];
  return { amen: formaterCompteAmen({ cible_type: cibleType, cible_id: cibleId, nombre: compte.nombre, a_dit_amen: false }) };
});

// ───────────────────────── Entraide entre membres ─────────────────────────
// Tranche 7 de l'audit du 17 nov., 21 nov. 2026 : offres et
// demandes entre membres, visibles par tous les membres. Seul
// l'auteur marque sa publication résolue. Le contact avec
// l'auteur passe par la messagerie existante, côté
// application. À ne pas confondre avec le clavardage d'aide
// avec la structure, canal vers la structure, pas entre membres.
app.get('/entraide', { preHandler: membreG }, async (req) => {
  const type = req.query.type;
  if (type != null && !['offre', 'demande'].includes(type)) throw httpError(400, 'Le type de la publication est invalide.');
  const lignes = (await q(
    `SELECT e.id, e.membre_id, e.type, e.categorie, e.titre, e.description, e.statut, e.cree_le, e.modifie_le,
            m.nom_complet AS auteur_nom
     FROM entraide e LEFT JOIN membres m ON m.id = e.membre_id
     ${type ? 'WHERE e.type = $1' : ''}
     ORDER BY e.cree_le DESC`,
    type ? [type] : [],
  )).rows;
  return { entraide: lignes.map((l) => formaterEntraide(l, req.user.mid)) };
});

app.post('/entraide', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour publier une entraide.');
  const refus = validerEntraide(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  const cree = (await q(
    `INSERT INTO entraide (membre_id, type, categorie, titre, description)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, membre_id, type, categorie, titre, description, statut, cree_le, modifie_le`,
    [req.user.mid, b.type, b.categorie.trim(), b.titre.trim(), (b.description ?? '').toString().trim()],
  )).rows[0];
  const auteur = (await q(`SELECT nom_complet AS auteur_nom FROM membres WHERE id = $1`, [req.user.mid])).rows[0];
  return reply.code(201).send({ entraide: formaterEntraide({ ...cree, auteur_nom: auteur?.auteur_nom ?? '' }, req.user.mid) });
});

app.patch('/entraide/:id', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour modifier une publication.');
  const refus = validerStatutEntraide(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const ligne = (await q(`SELECT id, membre_id FROM entraide WHERE id = $1`, [req.params.id])).rows[0];
  if (!ligne) throw httpError(404, 'Publication introuvable.');
  if (ligne.membre_id !== req.user.mid) throw httpError(403, 'Seul l’auteur marque sa publication résolue.');
  const mis = (await q(
    `UPDATE entraide SET statut = $1, modifie_le = now() WHERE id = $2
     RETURNING id, membre_id, type, categorie, titre, description, statut, cree_le, modifie_le`,
    [req.body.statut, req.params.id],
  )).rows[0];
  const auteur = (await q(`SELECT nom_complet AS auteur_nom FROM membres WHERE id = $1`, [req.user.mid])).rows[0];
  return { entraide: formaterEntraide({ ...mis, auteur_nom: auteur?.auteur_nom ?? '' }, req.user.mid) };
});

// ───────────────────────── Présence au culte, tranches 2 à 5 ─────────────────────────
// 21 nov. 2026. Tranche 2, temps forts du camp : moments publiés
// par la structure sur la page du camp, visibles par tous les
// membres, avec une photo facultative par /admin/fichiers.
// Tranche 3, J'aime et commentaires : un J'aime par membre et
// par cible, temps fort ou témoignage, jamais de liste publique,
// seulement le nombre ; les enseignements et les méditations
// gardent leurs Amens, un J'aime dessus ferait doublon. Les
// commentaires sont visibles par tous, l'auteur supprime le
// sien, la structure supprime tout. Tranche 4, Mon mur : la page
// du Profil qui rassemble les dernières activités. Tranche 5,
// verset en storie : la carte du verset part par POST /stories,
// sans route nouvelle.
app.get('/evenements/:id/temps-forts', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const evenement = (await q('SELECT id FROM evenements WHERE id = $1', [id])).rows[0];
  if (!evenement) throw httpError(404, 'Camp introuvable.');
  const lignes = (await q(
    `SELECT * FROM temps_forts_camp WHERE evenement_id = $1 ORDER BY publie_le DESC, cree_le DESC`,
    [id],
  )).rows;
  return { temps_forts: lignes.map(formaterTempsFort) };
});

app.post('/admin/evenements/:id/temps-forts', { preHandler: contenuG }, async (req, reply) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: req.params.id });
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const evenement = (await q('SELECT id FROM evenements WHERE id = $1', [id])).rows[0];
  if (!evenement) throw httpError(404, 'Camp introuvable.');
  const refus = validerTempsFort(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  const imageId = (b.image_id ?? '').toString().trim() || null;
  if (imageId) {
    const fichier = (await q('SELECT id FROM fichiers WHERE id = $1', [imageId])).rows[0];
    if (!fichier) throw httpError(404, 'Image introuvable.');
  }
  const row = (await q(
    `INSERT INTO temps_forts_camp (evenement_id, titre, texte, image_id, cree_par)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [id, String(b.titre).trim(), (b.texte ?? '').toString().trim(), imageId, req.user.sub],
  )).rows[0];
  return reply.code(201).send(formaterTempsFort(row));
});

app.put('/admin/evenements/:id/temps-forts/:tempsFortId', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: req.params.id });
  const { id, tempsFortId } = z.object({ id: z.string().uuid(), tempsFortId: z.string().uuid() }).parse(req.params);
  const evenement = (await q('SELECT id FROM evenements WHERE id = $1', [id])).rows[0];
  if (!evenement) throw httpError(404, 'Camp introuvable.');
  const refus = validerTempsFort(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  const imageId = (b.image_id ?? '').toString().trim() || null;
  if (imageId) {
    const fichier = (await q('SELECT id FROM fichiers WHERE id = $1', [imageId])).rows[0];
    if (!fichier) throw httpError(404, 'Image introuvable.');
  }
  const row = (await q(
    `UPDATE temps_forts_camp SET titre = $3, texte = $4, image_id = $5, modifie_le = now()
     WHERE id = $1 AND evenement_id = $2 RETURNING *`,
    [tempsFortId, id, String(b.titre).trim(), (b.texte ?? '').toString().trim(), imageId],
  )).rows[0];
  if (!row) throw httpError(404, 'Temps fort introuvable.');
  return formaterTempsFort(row);
});

app.delete('/admin/evenements/:id/temps-forts/:tempsFortId', { preHandler: contenuG }, async (req) => {
  exigerFonctionAdmin(req, 'editeur', 'responsable');
  await exigerNomination(req, 'camp.inscriptions', { evenementId: req.params.id });
  const { id, tempsFortId } = z.object({ id: z.string().uuid(), tempsFortId: z.string().uuid() }).parse(req.params);
  const row = (await q('DELETE FROM temps_forts_camp WHERE id = $1 AND evenement_id = $2 RETURNING id', [tempsFortId, id])).rows[0];
  if (!row) throw httpError(404, 'Temps fort introuvable.');
  return { ok: true };
});

// La cible d'un J'aime ou d'un commentaire existe, temps fort,
// témoignage approuvé ou non, ou publication du mur : l'application
// ne montre le bouton que sur ce qu'elle affiche déjà.
async function cibleAimeExiste(cibleType, cibleId) {
  if (cibleType === 'temps_fort') {
    return !!(await q('SELECT id FROM temps_forts_camp WHERE id = $1', [cibleId])).rows[0];
  }
  if (cibleType === 'mur') {
    return !!(await q('SELECT id FROM mur_publications WHERE id = $1', [cibleId])).rows[0];
  }
  return !!(await q('SELECT id FROM temoignages WHERE id = $1', [cibleId])).rows[0];
}

app.get('/aimes', { preHandler: membreG }, async (req) => {
  const cibleType = req.query.cible_type;
  const cibleId = req.query.cible_id;
  const refus = validerAime({ cible_type: cibleType, cible_id: cibleId });
  if (refus) throw httpError(refus.statut, refus.message);
  const compte = (await q(
    `SELECT COUNT(*) AS nombre,
            COUNT(*) FILTER (WHERE type = 'jaime') AS nb_jaime,
            COUNT(*) FILTER (WHERE type = 'amen') AS nb_amen,
            COUNT(*) FILTER (WHERE type = 'priere') AS nb_priere,
            (SELECT type FROM aimes WHERE cible_type = $1 AND cible_id = $2 AND membre_id = $3) AS mon_type,
            EXISTS (SELECT 1 FROM aimes WHERE cible_type = $1 AND cible_id = $2 AND membre_id = $3) AS a_aime
     FROM aimes WHERE cible_type = $1 AND cible_id = $2`,
    [cibleType, cibleId, req.user.mid],
  )).rows[0];
  return formaterCompteAime({ cible_type: cibleType, cible_id: cibleId, ...compte });
});

// Comptes de plusieurs cibles d'un coup, pour une liste de
// cartes : un seul appel au lieu d'un appel par carte, comme
// pour les Amens.
app.get('/aimes/comptes', { preHandler: membreG }, async (req) => {
  const cibleType = req.query.cible_type;
  const bruts = (req.query.cible_ids ?? '').toString().split(',').map((s) => s.trim()).filter(Boolean);
  if (!CIBLES_AIME.includes(cibleType)) throw httpError(400, 'La cible des J’aime est invalide.');
  if (bruts.length === 0 || bruts.length > 100) throw httpError(400, 'La liste des cibles est invalide.');
  const valides = bruts.filter((id) => validerAime({ cible_type: cibleType, cible_id: id }) == null);
  if (valides.length === 0) return { comptes: [] };
  const lignes = (await q(
    `SELECT cible_id, COUNT(*) AS nombre,
            COUNT(*) FILTER (WHERE type = 'jaime') AS nb_jaime,
            COUNT(*) FILTER (WHERE type = 'amen') AS nb_amen,
            COUNT(*) FILTER (WHERE type = 'priere') AS nb_priere,
            MAX(CASE WHEN membre_id = $2 THEN type END) AS mon_type,
            BOOL_OR(membre_id = $2) AS a_aime
     FROM aimes WHERE cible_type = $1 AND cible_id = ANY($3::uuid[])
     GROUP BY cible_id`,
    [cibleType, req.user.mid, valides],
  )).rows;
  const parId = new Map(lignes.map((l) => [l.cible_id, l]));
  return {
    comptes: valides.map((id) => formaterCompteAime({
      cible_type: cibleType,
      cible_id: id,
      ...(parId.get(id) ?? { nombre: 0, a_aime: false }),
    })),
  };
});

app.post('/aimes', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour aimer.');
  const refus = validerAime(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  if (!(await cibleAimeExiste(b.cible_type, b.cible_id))) throw httpError(404, 'Cible introuvable.');
  const type = typeof b.type === 'string' && TYPES_REACTION.includes(b.type) ? b.type : 'jaime';
  // Notification de réaction, mur seulement : seulement quand
  // la réaction est nouvelle ou que son type change, pour ne
  // pas déranger l'auteur à chaque toucher répété.
  const precedent = (await q(
    `SELECT type FROM aimes WHERE membre_id = $1 AND cible_type = $2 AND cible_id = $3`,
    [req.user.mid, b.cible_type, b.cible_id],
  )).rows[0];
  await q(
    `INSERT INTO aimes (membre_id, cible_type, cible_id, type) VALUES ($1, $2, $3, $4)
     ON CONFLICT (membre_id, cible_type, cible_id) DO UPDATE SET type = EXCLUDED.type`,
    [req.user.mid, b.cible_type, b.cible_id, type],
  );
  if (b.cible_type === 'mur' && (!precedent || precedent.type !== type)) {
    const publication = (await q(`SELECT auteur_id FROM mur_publications WHERE id = $1`, [b.cible_id])).rows[0];
    if (publication && publication.auteur_id !== req.user.mid) {
      await notifierClocheSeule(
        publication.auteur_id,
        'mur_reaction',
        'Nouvelle réaction sur votre publication',
        'Bonjour {prenom}, un membre a réagi à votre publication.',
        'mur_publication',
        b.cible_id,
        'Nouvelle réaction sur votre publication',
        'Un membre a réagi à votre publication.',
      );
    }
  }
  const compte = (await q(
    `SELECT COUNT(*) AS nombre,
            COUNT(*) FILTER (WHERE type = 'jaime') AS nb_jaime,
            COUNT(*) FILTER (WHERE type = 'amen') AS nb_amen,
            COUNT(*) FILTER (WHERE type = 'priere') AS nb_priere,
            (SELECT type FROM aimes WHERE cible_type = $1 AND cible_id = $2 AND membre_id = $3) AS mon_type,
            EXISTS (SELECT 1 FROM aimes WHERE cible_type = $1 AND cible_id = $2 AND membre_id = $3) AS a_aime
     FROM aimes WHERE cible_type = $1 AND cible_id = $2`,
    [b.cible_type, b.cible_id, req.user.mid],
  )).rows[0];
  return reply.code(201).send({ aime: formaterCompteAime({ cible_type: b.cible_type, cible_id: b.cible_id, ...compte }) });
});

app.delete('/aimes/:cibleType/:cibleId', { preHandler: membreG }, async (req) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour retirer son J’aime.');
  const cibleType = decodeURIComponent(req.params.cibleType);
  const cibleId = decodeURIComponent(req.params.cibleId);
  const refus = validerAime({ cible_type: cibleType, cible_id: cibleId });
  if (refus) throw httpError(refus.statut, refus.message);
  const supprime = (await q(
    `DELETE FROM aimes WHERE membre_id = $1 AND cible_type = $2 AND cible_id = $3 RETURNING id`,
    [req.user.mid, cibleType, cibleId],
  )).rows[0];
  if (!supprime) throw httpError(404, 'Tu n’as pas aimé cette cible.');
  const compte = (await q(
    `SELECT COUNT(*) AS nombre,
            COUNT(*) FILTER (WHERE type = 'jaime') AS nb_jaime,
            COUNT(*) FILTER (WHERE type = 'amen') AS nb_amen,
            COUNT(*) FILTER (WHERE type = 'priere') AS nb_priere,
            (SELECT type FROM aimes WHERE cible_type = $1 AND cible_id = $2 AND membre_id = $3) AS mon_type,
            EXISTS (SELECT 1 FROM aimes WHERE cible_type = $1 AND cible_id = $2 AND membre_id = $3) AS a_aime
     FROM aimes WHERE cible_type = $1 AND cible_id = $2`,
    [cibleType, cibleId, req.user.mid],
  )).rows[0];
  return { aime: formaterCompteAime({ cible_type: cibleType, cible_id: cibleId, ...compte }) };
});

app.get('/commentaires', { preHandler: membreG }, async (req) => {
  const cibleType = req.query.cible_type;
  const cibleId = req.query.cible_id;
  const refus = validerAime({ cible_type: cibleType, cible_id: cibleId });
  if (refus) throw httpError(refus.statut, refus.message);
  const lignes = (await q(
    `SELECT c.id, c.cible_type, c.cible_id, c.parent_id, c.membre_id, c.texte, c.cree_le,
            m.nom_complet AS auteur_nom
     FROM commentaires c LEFT JOIN membres m ON m.id = c.membre_id
     WHERE c.cible_type = $1 AND c.cible_id = $2
     ORDER BY c.cree_le ASC
     LIMIT 100`,
    [cibleType, cibleId],
  )).rows;
  const peutModerer = req.user.role === 'admin_general' || req.user.role === 'admin_etablissement';
  return {
    commentaires: lignes.map((l) => formaterCommentaire({ ...l, est_auteur: req.user.mid != null && l.membre_id === req.user.mid })),
    peut_moderer: peutModerer,
  };
});

app.post('/commentaires', { preHandler: membreG }, async (req, reply) => {
  if (!req.user.mid) throw httpError(403, 'Il faut une fiche membre pour commenter.');
  const refus = validerCommentaire(req.body ?? {});
  if (refus) throw httpError(refus.statut, refus.message);
  const b = req.body;
  if (!(await cibleAimeExiste(b.cible_type, b.cible_id))) throw httpError(404, 'Cible introuvable.');
  // Réponse, mur v2 tranche 3 : le parent doit exister, viser
  // la même cible et être de premier niveau.
  let parent = null;
  if (b.parent_id != null && b.parent_id !== '') {
    if (!UUID_RE.test(b.parent_id)) throw httpError(400, 'Commentaire parent invalide.');
    parent = (await q(
      `SELECT id, cible_type, cible_id, parent_id, membre_id FROM commentaires WHERE id = $1`,
      [b.parent_id],
    )).rows[0];
    const refusParent = refusReponse(parent, { cible_type: b.cible_type, cible_id: b.cible_id });
    if (refusParent) throw httpError(refusParent.statut, refusParent.message);
  }
  // Mentions : 5 au plus, dédupliquées, existantes en base.
  const { mentions, refus: refusMentions } = normaliserMentions(b.mentions);
  if (refusMentions) throw httpError(refusMentions.statut, refusMentions.message);
  if (mentions.length > 0) {
    const existants = (await q(`SELECT id FROM membres WHERE id = ANY($1::uuid[])`, [mentions])).rows;
    if (existants.length !== mentions.length) throw httpError(400, 'Mention invalide.');
  }
  const cree = (await q(
    `INSERT INTO commentaires (membre_id, cible_type, cible_id, texte, parent_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, cible_type, cible_id, parent_id, membre_id, texte, cree_le`,
    [req.user.mid, b.cible_type, b.cible_id, String(b.texte).trim(), parent?.id ?? null],
  )).rows[0];
  const auteur = (await q(`SELECT nom_complet AS auteur_nom FROM membres WHERE id = $1`, [req.user.mid])).rows[0];
  // Notifications du mur, au mieux, sans jamais faire échouer
  // le commentaire : l'auteur de la publication, l'auteur du
  // commentaire parent quand c'est une réponse, et chaque
  // membre mentionné, sauf soi-même, sans doublon par type.
  if (b.cible_type === 'mur') {
    const publication = (await q(`SELECT auteur_id FROM mur_publications WHERE id = $1`, [b.cible_id])).rows[0];
    const auteurPub = publication?.auteur_id ?? null;
    const notifies = new Set();
    if (auteurPub && auteurPub !== req.user.mid) {
      notifies.add(`commentaire:${auteurPub}`);
      await notifierMembre(
        auteurPub,
        'mur_commentaire',
        'Nouveau commentaire sur votre publication',
        'Bonjour {prenom}, un membre a commenté votre publication.',
        'mur_publication',
        b.cible_id,
        'Nouveau commentaire sur votre publication',
        'Un membre a commenté votre publication.',
      );
    }
    if (parent && parent.membre_id !== req.user.mid && !notifies.has(`commentaire:${parent.membre_id}`)) {
      notifies.add(`commentaire:${parent.membre_id}`);
      await notifierMembre(
        parent.membre_id,
        'mur_commentaire',
        'Réponse à votre commentaire',
        'Bonjour {prenom}, un membre a répondu à votre commentaire.',
        'mur_publication',
        b.cible_id,
        'Réponse à votre commentaire',
        'Un membre a répondu à votre commentaire.',
      );
    }
    for (const mentionne of mentions) {
      if (mentionne === req.user.mid) continue;
      await notifierMembre(
        mentionne,
        'mur_mention',
        'Vous êtes mentionné dans un commentaire',
        'Bonjour {prenom}, un membre vous a mentionné dans un commentaire sur le mur.',
        'mur_publication',
        b.cible_id,
        'Vous êtes mentionné dans un commentaire',
        'Un membre vous a mentionné dans un commentaire sur le mur.',
      );
    }
  }
  return reply.code(201).send({ commentaire: formaterCommentaire({ ...cree, auteur_nom: auteur?.auteur_nom ?? '', est_auteur: true }) });
});

app.delete('/commentaires/:id', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ligne = (await q(`SELECT id, membre_id FROM commentaires WHERE id = $1`, [id])).rows[0];
  if (!ligne) throw httpError(404, 'Commentaire introuvable.');
  const estAuteur = req.user.mid != null && ligne.membre_id === req.user.mid;
  const estStructure = req.user.role === 'admin_general' || req.user.role === 'admin_etablissement';
  if (!estAuteur && !estStructure) throw httpError(403, 'Seul l’auteur ou la structure supprime un commentaire.');
  await q(`DELETE FROM commentaires WHERE id = $1`, [id]);
  return { ok: true };
});

// Mon mur, tranche 4 : les dernières activités de la structure,
// 20 par kind, 50 au total, du plus récent au plus ancien.
// Mêmes filtres que les listes publiques : enseignements
// publiés, actualités et annonces actives et dues, camps
// publiés, témoignages approuvés. Aucune écriture ici.
app.get('/mon-mur', { preHandler: membreG }, async (req) => {
  const enseignements = (await q(
    `SELECT id, titre, description, orateur, publie_le FROM enseignements WHERE publie ORDER BY publie_le DESC LIMIT ${LIMITE_PAR_KIND_MUR}`,
  )).rows;
  const actualites = (await q(
    `SELECT id, titre, texte, publiee_le FROM actualites WHERE (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC LIMIT ${LIMITE_PAR_KIND_MUR}`,
  )).rows;
  const annonces = (await q(
    `SELECT id, titre, texte, publiee_le FROM annonces_audio WHERE actif AND (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC, id DESC LIMIT ${LIMITE_PAR_KIND_MUR}`,
  )).rows;
  const camps = (await q(
    `SELECT id, nom, lieu, date_debut FROM evenements WHERE type = 'camp' AND publie ORDER BY date_debut DESC NULLS LAST, nom LIMIT ${LIMITE_PAR_KIND_MUR}`,
  )).rows;
  const temoignages = (await q(
    `SELECT t.id, t.texte, t.cree_le, m.nom_complet AS auteur_nom
     FROM temoignages t LEFT JOIN membres m ON m.id = t.auteur_id
     WHERE t.statut = 'approuve' ORDER BY t.cree_le DESC LIMIT ${LIMITE_PAR_KIND_MUR}`,
  )).rows;
  const elements = [
    ...enseignements.map((e) => formaterElementMur({ kind: 'enseignement', id: e.id, titre: e.titre, texte: e.description ?? '', date: e.publie_le, auteur_nom: e.orateur ?? '' })),
    ...actualites.map((a) => formaterElementMur({ kind: 'actualite', id: a.id, titre: a.titre, texte: a.texte ?? '', date: a.publiee_le, auteur_nom: '' })),
    ...annonces.map((a) => formaterElementMur({ kind: 'annonce', id: a.id, titre: a.titre, texte: a.texte ?? '', date: a.publiee_le, auteur_nom: '' })),
    ...camps.map((c) => formaterElementMur({ kind: 'camp', id: c.id, titre: c.nom, texte: '', date: c.date_debut, auteur_nom: '', lieu: c.lieu ?? '' })),
    ...temoignages.map((t) => formaterElementMur({ kind: 'temoignage', id: t.id, titre: '', texte: t.texte ?? '', date: t.cree_le, auteur_nom: t.auteur_nom ?? '' })),
  ];
  return { elements: trierElementsMur(elements) };
});

// ───────────────────────── Messagerie et Signalement ─────────────────────────
// Port du module e-System Church (spécification v2, 16 nov. 2026),
// adapté à une seule structure : pas de church_id, pas de RLS, le
// contrôle d'accès est applicatif, partout. Règles dures :
//  • un appelant non participant ne voit jamais le contenu d'une
//    conversation, même l'administrateur général : 404, sans
//    révéler l'existence ;
//  • seule la file de modération renvoie evidence_snapshot, jamais
//    les messages en direct ;
//  • un signalement de motif sécurité d'un enfant ne passe jamais
//    par la file ordinaire : il est rangé avec routed_to
//    'child_safety_referent' et n'est visible par aucune route tant
//    qu'un référent protection de l'enfance n'est pas désigné
//    (point ouvert, voir ci-dessous) ;
//  • aucune sanction par la personne qui a signalé ou qui est
//    concernée (conflit d'intérêts, 409) ;
//  • pas de chiffrement de bout en bout en V1 : la protection
//    repose sur le contrôle d'accès et la journalisation, comme
//    dans la spécification d'origine.
// Types de conversation : directe (1:1), groupe_etablissement
// (un seul établissement), groupe_structure (annonces, créé par
// l'administrateur général, réponses désactivables), pastorale
// (un membre + l'administrateur général, confidentielle).
const TYPES_CONVERSATION_MSG = ['directe', 'groupe_etablissement', 'groupe_structure', 'pastorale'];
const MOTIFS_SIGNALEMENT = ['harassment', 'hate_speech', 'threat', 'misinformation', 'spam', 'child_safety', 'doctrinal_error', 'influence_peddling', 'financial_mismanagement', 'other'];
// Clés françaises envoyées par l'application, vers les clés anglaises
// stockées : l'application envoie 'harcelement', le serveur stocke 'harassment'.
const MOTIFS_SIGNALEMENT_FR = {
  harcelement: 'harassment',
  propos_haineux: 'hate_speech',
  menace: 'threat',
  desinformation: 'misinformation',
  spam: 'spam',
  securite_enfant: 'child_safety',
  erreur_doctrinale: 'doctrinal_error',
  trafic_influence: 'influence_peddling',
  mauvaise_gestion_finances: 'financial_mismanagement',
  autre: 'other',
};
const normaliserMotifSignalement = (motif) => MOTIFS_SIGNALEMENT_FR[motif] ?? motif;
const ACTIONS_MODERATION = ['rejeter', 'avertir', 'sourdine', 'suspendre', 'escalader', 'retirer', 'masquer'];
const ACTIONS_CONTESTABLES = ['avertir', 'sourdine', 'suspendre'];
const LIMITE_MSG_MINUTE = 30;
const LIMITE_MSG_HEURE = 300;
const DELAI_RECOURS_JOURS = 15;
const DELAI_REPONSE_RECOURS_JOURS = 30;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Garde de modération : administrateur général (toute la structure,
// hors circuit protection de l'enfance) ou administrateur
// d'établissement (son établissement, file locale seulement).
const moderationG = async (req, reply) => {
  try {
    await req.jwtVerify();
  } catch {
    return reply.code(401).send({ erreur: 'Authentification requise.' });
  }
  if (req.user.role !== 'admin_general' && req.user.role !== 'admin_etablissement') {
    return reply.code(403).send({ erreur: 'Accès refusé.' });
  }
};

// Profil membre de l'appelant, ou 403 : la messagerie exige un
// profil membre, y compris pour un administrateur.
function membreMsgId(req) {
  if (!req.user.mid) throw httpError(403, 'Profil membre requis.');
  return req.user.mid;
}

// Vrai si le membre est participant actif de la conversation.
async function estParticipantMsg(conversationId, membreId) {
  const r = await q(
    `SELECT 1 FROM conversation_participants WHERE conversation_id = $1 AND member_id = $2 AND is_active`,
    [conversationId, membreId],
  );
  return r.rows.length > 0;
}

// Vrai si la messagerie du membre est suspendue en ce moment.
async function messagerieSuspendue(membreId) {
  const r = await q(`SELECT messagerie_suspendu_jusquau FROM membres WHERE id = $1`, [membreId]);
  const jusquau = r.rows[0]?.messagerie_suspendu_jusquau;
  return jusquau ? new Date(jusquau) : null;
}

// Limite de débit, spécification section 10 : 30 messages par
// minute et 300 par heure et par membre, comptés en base pour
// survivre à un redémarrage. Au-delà, 429 rate_limited.
async function verifierLimiteDebit(membreId) {
  const r = await q(
    `SELECT
       (SELECT COUNT(*)::int FROM messages WHERE sender_id = $1 AND created_at > now() - interval '1 minute') AS minute,
       (SELECT COUNT(*)::int FROM messages WHERE sender_id = $1 AND created_at > now() - interval '1 hour') AS heure`,
    [membreId],
  );
  if (r.rows[0].minute >= LIMITE_MSG_MINUTE || r.rows[0].heure >= LIMITE_MSG_HEURE) {
    return false;
  }
  return true;
}

// Aperçu d'un message pour la cloche : texte nettoyé, 100 caractères
// maximum, jamais le message entier dans une poussée.
function apercuMessage(contenu) {
  const propre = String(contenu ?? '').replace(/\s+/g, ' ').trim();
  return propre.length <= 100 ? propre : `${propre.slice(0, 100)}…`;
}

// Personne concernée par un signalement : cible directe, auteur
// du message ciblé, ou créateur de la conversation ciblée. Sert
// au contrôle de conflit d'intérêts et au droit de recours.
// Mur v2 tranche 5 : auteur de la publication ou du commentaire.
async function personneConcernee(signalement) {
  if (signalement.target_type === 'user') return signalement.target_id;
  if (signalement.target_type === 'message') {
    const r = await q(`SELECT sender_id FROM messages WHERE id = $1`, [signalement.target_id]);
    return r.rows[0]?.sender_id ?? null;
  }
  if (signalement.target_type === 'mur_publication') {
    const r = await q(`SELECT auteur_id FROM mur_publications WHERE id = $1`, [signalement.target_id]);
    return r.rows[0]?.auteur_id ?? null;
  }
  if (signalement.target_type === 'mur_commentaire') {
    const r = await q(`SELECT membre_id FROM commentaires WHERE id = $1`, [signalement.target_id]);
    return r.rows[0]?.membre_id ?? null;
  }
  const r = await q(`SELECT created_by FROM conversations WHERE id = $1`, [signalement.target_id]);
  return r.rows[0]?.created_by ?? null;
}

// Utilisateur (compte) derrière un membre, pour le contrôle de
// conflit d'intérêts côté modération.
async function utilisateurDeMembre(membreId) {
  if (!membreId) return null;
  const r = await q(`SELECT utilisateur_id FROM membres WHERE id = $1`, [membreId]);
  return r.rows[0]?.utilisateur_id ?? null;
}

// Forme canonique d'une valeur JSON (clés triées, récursif) : la
// preuve figée traverse jsonb, qui ne garantit pas l'ordre des
// clés, donc l'empreinte doit rester vérifiable après relecture.
function jsonCanonique(valeur) {
  if (Array.isArray(valeur)) return `[${valeur.map(jsonCanonique).join(',')}]`;
  if (valeur && typeof valeur === 'object') {
    return `{${Object.keys(valeur).sort().map((k) => `${JSON.stringify(k)}:${jsonCanonique(valeur[k])}`).join(',')}}`;
  }
  return JSON.stringify(valeur) ?? 'null';
}

// ── POST /messagerie/conversations : créer une conversation.
app.post('/messagerie/conversations', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({
    type: z.enum(TYPES_CONVERSATION_MSG),
    title: z.string().trim().max(200).optional().nullable(),
    participant_member_ids: z.array(z.string().uuid()).min(1).max(200),
    replies_disabled: z.boolean().optional(),
    // Messages éphémères, 21 nov. 2026 : durée en jours, 7 par
    // défaut quand le mode est choisi, null pour désactiver.
    ephemere: z.number().int().min(1).max(30).optional().nullable(),
  }).parse(req.body ?? {});
  const mid = membreMsgId(req);
  const suspendu = await messagerieSuspendue(mid);
  if (suspendu && suspendu > new Date()) throw httpError(403, `Accès à la messagerie suspendu jusqu'au ${suspendu.toISOString()}.`);
  const ids = [...new Set(b.participant_member_ids)];
  if (!ids.includes(mid)) ids.push(mid);
  const membres = (
    await q(`SELECT m.id, m.etablissement_id, u.role FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = ANY($1::uuid[])`, [ids])
  ).rows;
  if (membres.length !== ids.length) throw httpError(400, 'Tous les participants doivent être des membres.');
  const moi = membres.find((m) => m.id === mid);
  if (b.type === 'directe') {
    if (ids.length !== 2) throw httpError(400, 'Une conversation directe compte exactement 2 participants.');
    const autre = membres.find((m) => m.id !== mid);
    const bloque = await q(
      `SELECT 1 FROM blocks WHERE (blocker_id = $1 AND blocked_id = $2) OR (blocker_id = $2 AND blocked_id = $1)`,
      [mid, autre.id],
    );
    if (bloque.rows.length > 0) throw httpError(403, 'Conversation impossible : un blocage existe entre ces deux membres.');
    // Mineurs, spécification 7.1 : un membre mineur ne parle en
    // direct qu'à un tuteur déclaré ou à l'administrateur général.
    // Il n'existe pas encore de rôle « responsable enfants » dans
    // cette application : seuls les tuteurs déclarés sont admis.
    for (const p of [moi, autre]) {
      const flag = (await q(`SELECT is_minor, guardian_ids FROM minor_flags WHERE member_id = $1`, [p.id])).rows[0];
      if (flag?.is_minor) {
        const autreCote = p.id === mid ? autre : moi;
        const estTuteur = (flag.guardian_ids ?? []).includes(autreCote.id);
        const autreRole = (await q(`SELECT role FROM utilisateurs u JOIN membres m ON m.utilisateur_id = u.id WHERE m.id = $1`, [autreCote.id])).rows[0]?.role;
        if (!estTuteur && autreRole !== 'admin_general') {
          throw httpError(403, 'Un membre mineur ne peut échanger en direct qu’avec un tuteur ou l’administrateur général.');
        }
      }
    }
  }
  if (b.type === 'groupe_etablissement') {
    // Un groupe d'établissement ne mélange pas les établissements.
    const etablissements = new Set(membres.map((m) => m.etablissement_id).filter(Boolean));
    if (etablissements.size !== 1) throw httpError(400, 'Un groupe d’établissement ne réunit que des membres du même établissement.');
  }
  if (b.type === 'groupe_structure') {
    // Canal d'annonces : créé par l'administrateur général seulement.
    if (req.user.role !== 'admin_general') throw httpError(403, 'Seul l’administrateur général crée un groupe de structure.');
  }
  if (b.type === 'pastorale') {
    if (ids.length !== 2) throw httpError(400, 'Une conversation pastorale compte exactement 2 participants : un membre et l’administrateur général.');
    const autre = membres.find((m) => m.id !== mid);
    const unAdminGeneral = moi.role === 'admin_general' || autre.role === 'admin_general';
    const lesDeuxAdmin = moi.role === 'admin_general' && autre.role === 'admin_general';
    if (!unAdminGeneral || lesDeuxAdmin) throw httpError(400, 'Une conversation pastorale compte exactement un membre et l’administrateur général.');
  }
  // Messages éphémères, 21 nov. 2026 : privé seulement, jamais
  // les groupes. Une durée invalide est refusée, comme un type
  // de conversation invalide.
  if (b.ephemere != null) {
    if (!ephemereValide(b.ephemere)) throw httpError(400, 'Durée éphémère invalide, entre 1 et 30 jours.');
    if (!conversationEphemereAutorisee(b.type)) throw httpError(400, 'Les messages éphémères ne sont possibles que dans une conversation privée.');
  }
  const conv = await tx(async (c) => {
    const r = (
      await c.query(
        `INSERT INTO conversations (type, title, created_by, replies_disabled, ephemere) VALUES ($1,$2,$3,$4,$5) RETURNING id, type, title, created_at, replies_disabled, ephemere`,
        [b.type, b.title ?? null, mid, b.type === 'groupe_structure' ? (b.replies_disabled ?? false) : false, b.ephemere ?? null],
      )
    ).rows[0];
    for (const pid of ids) {
      await c.query(
        `INSERT INTO conversation_participants (conversation_id, member_id, role) VALUES ($1,$2,'membre')`,
        [r.id, pid],
      );
    }
    await audit(c, req, 'messagerie.conversation_creee', 'conversations', r.id, { type: b.type, participants: ids.length });
    return r;
  });
  return reply.code(201).send(conv);
});

// ── GET /messagerie/conversations : conversations de l'appelant.
// L'autre participant des directes est joint (nom, matricule,
// photo), pour que la liste et l'en-tête montrent avec qui l'on
// cause au lieu du libellé générique. Groupes et pastorale
// gardent leur titre, sans autre participant.
app.get('/messagerie/conversations', { preHandler: membreG }, async (req) => {
  const mid = membreMsgId(req);
  const lignes = (await q(SQL_CONVERSATIONS_LISTE, [mid])).rows;
  return lignes.map(formaterConversationListe);
});

// ── POST /messagerie/conversations/:id/favori : marquer une
// conversation en favori, ou retirer le favori. Le favori ne
// vaut que pour l'appelant : il est posé sur sa participation,
// jamais sur la conversation elle-même, et ne se voit que par
// lui. 404 quand la conversation n'existe pas ou quand
// l'appelant n'en est pas participant actif.
app.post('/messagerie/conversations/:id/favori', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const mid = membreMsgId(req);
  const b = z.object({ favori: z.boolean() }).parse(req.body ?? {});
  const r = (await q(SQL_FAVORI_BASCULER, [id, mid, b.favori])).rows[0];
  if (!r) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  return { favori: r.est_favori };
});

// ── PATCH /messagerie/conversations/:id/ephemere : régler les
// messages éphémères d'une conversation privée, 21 nov. 2026,
// carte 3. Durée en jours, 1 à 30, 7 par défaut à l'activation,
// null pour désactiver. Participant seulement, privé seulement :
// un groupe refuse avec 400, un non participant ne voit rien.
app.patch('/messagerie/conversations/:id/ephemere', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const b = z.object({ ephemere: z.number().int().min(1).max(30).nullable().optional() }).parse(req.body ?? {});
  const mid = membreMsgId(req);
  if (!(await estParticipantMsg(id, mid))) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const conv = (await q(`SELECT id, type FROM conversations WHERE id = $1`, [id])).rows[0];
  if (!conv) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  if (!conversationEphemereAutorisee(conv.type)) throw httpError(400, 'Les messages éphémères ne sont possibles que dans une conversation privée.');
  const jours = b.ephemere ?? null;
  if (!ephemereValide(jours)) throw httpError(400, 'Durée éphémère invalide, entre 1 et 30 jours.');
  const r = (await q(`UPDATE conversations SET ephemere = $2 WHERE id = $1 RETURNING id, ephemere`, [id, jours])).rows[0];
  return r;
});

// ── GET /messagerie/conversations/:id : une conversation, participants seulement.
app.get('/messagerie/conversations/:id', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const mid = membreMsgId(req);
  if (!(await estParticipantMsg(id, mid))) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const conv = (await q(`SELECT id, type, title, created_at, last_message_at, replies_disabled, ephemere, aide_statut, aide_motif FROM conversations WHERE id = $1`, [id])).rows[0];
  if (!conv) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const participants = (
    await q(SQL_PARTICIPANTS_CONVERSATION, [id])
  ).rows;
  // Consultation d'une conversation signalée : journalisée, en ajout seul.
  const signalee = (
    await q(
      `SELECT 1 FROM messages WHERE conversation_id = $1 AND is_reported
        UNION SELECT 1 FROM reports WHERE target_type = 'conversation' AND target_id = $1 LIMIT 1`,
      [id],
    )
  ).rows.length > 0;
  if (signalee) {
    await audit(pool, req, 'messagerie.conversation_signalee_consultee', 'conversations', id, {}).catch(() => {});
  }
  return { ...conv, participants };
});

// ── POST /messagerie/conversations/:id/messages : envoyer un message texte.
app.post('/messagerie/conversations/:id/messages', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const b = z.object({ content: z.string().min(1).max(5000), type: z.literal('text').optional().default('text') }).parse(req.body ?? {});
  const mid = membreMsgId(req);
  if (!(await estParticipantMsg(id, mid))) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const suspendu = await messagerieSuspendue(mid);
  if (suspendu && suspendu > new Date()) throw httpError(403, `Accès à la messagerie suspendu jusqu'au ${suspendu.toISOString()}.`);
  const conv = (await q(`SELECT id, type, replies_disabled, created_by, ephemere, aide_statut FROM conversations WHERE id = $1`, [id])).rows[0];
  if (!conv) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  if (conv.type === 'groupe_structure' && conv.replies_disabled && req.user.role !== 'admin_general') {
    throw httpError(403, 'Les réponses sont désactivées dans ce groupe d’annonces.');
  }
  // Demande d'aide résolue, 21 nov. 2026, carte 4 : le membre ne
  // peut plus écrire tant qu'il ne l'a pas rouverte, le
  // responsable peut ajouter un mot de clôture.
  if (conv.type === 'aide' && !peutEnvoyerDansAide({ statut: conv.aide_statut, estResponsable: req.user.role === 'admin_general' || req.user.role === 'admin_etablissement' })) {
    throw httpError(409, 'Cette demande est résolue. Rouvre-la pour écrire de nouveau.');
  }
  if (!(await verifierLimiteDebit(mid))) {
    return reply.code(429).send({ erreur: 'Trop de messages. Réessaie plus tard.', code: 'rate_limited' });
  }
  // Messages éphémères, 21 nov. 2026 : expire_le est fixé à
  // l'envoi, selon le mode de la conversation, jamais après.
  const expireLe = dateExpirationEphemere(new Date(), conv.ephemere);
  const msg = await tx(async (c) => {
    const r = (
      await c.query(
        `INSERT INTO messages (conversation_id, sender_id, content, type, expire_le) VALUES ($1,$2,$3,'text',$4)
         RETURNING id, conversation_id, sender_id, content, type, created_at, expire_le`,
        [id, mid, b.content, expireLe ? expireLe.toISOString() : null],
      )
    ).rows[0];
    await c.query(`UPDATE conversations SET last_message_at = NOW() WHERE id = $1`, [id]);
    return r;
  });
  // Notification aux autres participants actifs, sauf l'expéditeur
  // et sauf ceux en sourdine : cloche interne + poussée FCM au
  // mieux, via notifierMembre existant. Un échec de poussée ne
  // fait jamais échouer l'envoi du message, et sans compte de
  // service Firebase configuré, seule la cloche est émise.
  // Conversation éphémère : aucun aperçu du contenu dans la
  // poussée, seulement « Nouveau message ».
  const expediteur = (await q(`SELECT nom_complet FROM membres WHERE id = $1`, [mid])).rows[0];
  const autres = (
    await q(
      `SELECT member_id FROM conversation_participants
        WHERE conversation_id = $1 AND member_id <> $2 AND is_active
          AND (muted_until IS NULL OR muted_until <= NOW())`,
      [id, mid],
    )
  ).rows;
  for (const a of autres) {
    const notif = notificationNouveauMessage({
      ephemere: conv.ephemere,
      prenom: prenomDe(expediteur?.nom_complet),
      apercu: apercuMessage(b.content),
    });
    await notifierMembre(
      a.member_id,
      'nouveau_message',
      notif.titre,
      notif.corps,
      'messagerie',
      id,
      notif.titre,
      notif.corps,
    );
  }
  return reply.code(201).send(msg);
});

// ── POST /messagerie/conversations/:id/messages/audio : envoyer un message vocal.
// 18 nov. 2026 : même garde que le texte (participant, suspension,
// groupe d'annonces, limite de débit), son en multipart, 10 Mo et
// 5 minutes au plus, type lu dans les octets. Le son part sur R2
// sous messages-vocaux/, la pièce jointe garde la clé, le message
// porte le type 'audio' et le libellé comme contenu. Sans clés R2,
// l'envoi refuse en 503, proprement, sans casser le texte.
app.post('/messagerie/conversations/:id/messages/audio', { preHandler: membreG }, async (req, reply) => {
  const config = configR2();
  if (!config) throw httpError(503, 'Les messages vocaux sont désactivés pour le moment.');
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const dureeSecondes = Number.parseInt(req.query?.duree_secondes ?? '', 10);
  const mid = membreMsgId(req);
  if (!(await estParticipantMsg(id, mid))) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const suspendu = await messagerieSuspendue(mid);
  if (suspendu && suspendu > new Date()) throw httpError(403, `Accès à la messagerie suspendu jusqu'au ${suspendu.toISOString()}.`);
  const conv = (await q(`SELECT id, type, replies_disabled, created_by, ephemere, aide_statut FROM conversations WHERE id = $1`, [id])).rows[0];
  if (!conv) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  if (conv.type === 'groupe_structure' && conv.replies_disabled && req.user.role !== 'admin_general') {
    throw httpError(403, 'Les réponses sont désactivées dans ce groupe d’annonces.');
  }
  // Demande d'aide résolue, 21 nov. 2026, carte 4 : même garde
  // que le texte, le membre rouvre d'abord.
  if (conv.type === 'aide' && !peutEnvoyerDansAide({ statut: conv.aide_statut, estResponsable: req.user.role === 'admin_general' || req.user.role === 'admin_etablissement' })) {
    throw httpError(409, 'Cette demande est résolue. Rouvre-la pour écrire de nouveau.');
  }
  if (!(await verifierLimiteDebit(mid))) {
    return reply.code(429).send({ erreur: 'Trop de messages. Réessaie plus tard.', code: 'rate_limited' });
  }
  const part = await req.file();
  if (!part) throw httpError(400, 'Aucun son reçu.');
  // Lecture en mémoire, avec plafond : un message vocal est court,
  // jamais un gros fichier. Le flux est coupé dès le dépassement.
  const morceaux = [];
  let taille = 0;
  for await (const morceau of part.file) {
    taille += morceau.length;
    if (taille > TAILLE_MAX_MESSAGE_VOCAL_OCTETS) throw httpError(413, 'Message vocal trop volumineux.');
    morceaux.push(morceau);
  }
  const octets = Buffer.concat(morceaux);
  if (octets.length === 0) throw httpError(400, 'Message vocal vide.');
  const ft = await fileTypeFromBuffer(octets);
  if (!ft) throw httpError(415, 'Type audio non autorisé.');
  const refus = validerMessageVocal({ mime: ft.mime, tailleOctets: octets.length, dureeSecondes });
  if (refus) throw httpError(refus.statut, refus.message);
  const cle = cleMessageVocal(ft.mime);
  await envoyerObjetR2(config, cle, octets, ft.mime);
  const libelle = libelleMessageVocal(dureeSecondes);
  // Messages éphémères, 21 nov. 2026 : expire_le fixé à l'envoi,
  // comme pour le texte, selon le mode de la conversation.
  const expireLe = dateExpirationEphemere(new Date(), conv.ephemere);
  const msg = await tx(async (c) => {
    const r = (
      await c.query(
        `INSERT INTO messages (conversation_id, sender_id, content, type, expire_le) VALUES ($1,$2,$3,'audio',$4)
         RETURNING id, conversation_id, sender_id, content, type, created_at, expire_le`,
        [id, mid, libelle, expireLe ? expireLe.toISOString() : null],
      )
    ).rows[0];
    const empreinte = crypto.createHash('sha256').update(octets).digest('hex');
    await c.query(
      `INSERT INTO message_attachments (message_id, storage_key, mime_type, size_bytes, sha256, duree_secondes)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [r.id, cle, ft.mime, octets.length, empreinte, dureeSecondes],
    );
    await c.query(`UPDATE conversations SET last_message_at = NOW() WHERE id = $1`, [id]);
    return r;
  });
  const expediteur = (await q(`SELECT nom_complet FROM membres WHERE id = $1`, [mid])).rows[0];
  const autres = (
    await q(
      `SELECT member_id FROM conversation_participants
        WHERE conversation_id = $1 AND member_id <> $2 AND is_active
          AND (muted_until IS NULL OR muted_until <= NOW())`,
      [id, mid],
    )
  ).rows;
  for (const a of autres) {
    // Conversation éphémère : aucun aperçu du contenu dans la
    // poussée, seulement « Nouveau message », comme pour le texte.
    const notif = notificationNouveauMessage({
      ephemere: conv.ephemere,
      prenom: prenomDe(expediteur?.nom_complet),
      apercu: libelle,
    });
    await notifierMembre(
      a.member_id,
      'nouveau_message',
      notif.titre,
      notif.corps,
      'messagerie',
      id,
      notif.titre,
      notif.corps,
    );
  }
  return reply.code(201).send(formaterMessageAudio(
    { ...msg, duree_secondes: dureeSecondes },
    urlSigneeR2(config, cle, { expireSecondes: DUREE_URL_SIGNEE_SECONDES }),
  ));
});

// ── GET /messagerie/conversations/:id/messages : les derniers messages, limite 100.
app.get('/messagerie/conversations/:id/messages', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const mid = membreMsgId(req);
  if (!(await estParticipantMsg(id, mid))) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const limite = Math.min(Math.max(Number.parseInt(req.query?.limit ?? '100', 10) || 100, 1), 100);
  const config = configR2();
  const lignes = (
    await q(
      `SELECT m.id, m.conversation_id, m.sender_id, m.content, m.type, m.created_at, m.edited_at, m.deleted_at, m.expire_le,
              s.nom_complet AS sender_nom, s.matricule AS sender_matricule,
              ma.storage_key AS cle_audio, ma.duree_secondes AS duree_secondes
         FROM messages m LEFT JOIN membres s ON s.id = m.sender_id
         LEFT JOIN message_attachments ma ON ma.message_id = m.id
        WHERE m.conversation_id = $1 AND (m.expire_le IS NULL OR m.expire_le > now())
        ORDER BY m.created_at DESC, m.id DESC LIMIT $2`,
      [id, limite],
    )
  ).rows;
  // Un message audio ne montre jamais sa clé R2 : le client ne
  // reçoit que le lien signé temporaire, 15 minutes. Un message
  // supprimé ne montre plus que « Message supprimé », jamais son
  // contenu ni son son : la ligne reste, pour que la suppression
  // se voie, sans rien révéler.
  const messages = lignes.map((ligne) => {
    const masquee = masquerMessageSupprime(ligne);
    const { cle_audio: cleAudio, ...reste } = masquee;
    if (masquee.deleted_at || ligne.type !== 'audio' || !cleAudio || !config) return reste;
    return formaterMessageAudio(reste, urlSigneeR2(config, cleAudio, { expireSecondes: DUREE_URL_SIGNEE_SECONDES }));
  });
  const signalee = (
    await q(
      `SELECT 1 FROM messages WHERE conversation_id = $1 AND is_reported
        UNION SELECT 1 FROM reports WHERE target_type = 'conversation' AND target_id = $1 LIMIT 1`,
      [id],
    )
  ).rows.length > 0;
  if (signalee) {
    await audit(pool, req, 'messagerie.conversation_signalee_consultee', 'conversations', id, {}).catch(() => {});
  }
  // Les derniers messages, renvoyés dans l'ordre chronologique.
  return messages.reverse();
});

// ── PATCH /messagerie/conversations/:id/messages/:messageId :
// modifier un message texte, 21 nov. 2026, carte 3. Contenu de
// 5000 caractères au plus, l'auteur seulement, jamais un message
// déjà supprimé : met edited_at, le contenu d'origine ne revient
// plus. Un non participant ne voit rien, 404.
app.patch('/messagerie/conversations/:id/messages/:messageId', { preHandler: membreG }, async (req, reply) => {
  const { id, messageId } = req.params;
  if (!UUID_RE.test(id ?? '') || !UUID_RE.test(messageId ?? '')) return reply.code(404).send({ erreur: 'Message introuvable.' });
  const b = z.object({ content: z.string().trim().min(1).max(5000) }).parse(req.body ?? {});
  const mid = membreMsgId(req);
  const msg = (
    await q(
      `SELECT id, conversation_id, sender_id, content, type, created_at, edited_at, deleted_at, expire_le
         FROM messages WHERE id = $1 AND conversation_id = $2`,
      [messageId, id],
    )
  ).rows[0];
  const decision = peutModifierMessage({ message: msg, membreId: mid, estParticipant: await estParticipantMsg(id, mid) });
  if (!decision.ok) {
    if (decision.statut === 404) return reply.code(404).send({ erreur: 'Message introuvable.' });
    throw httpError(decision.statut, decision.erreur);
  }
  const r = (
    await q(
      `UPDATE messages SET content = $2, edited_at = now() WHERE id = $1
        RETURNING id, conversation_id, sender_id, content, type, created_at, edited_at, deleted_at, expire_le`,
      [messageId, b.content],
    )
  ).rows[0];
  return r;
});

// ── DELETE /messagerie/conversations/:id/messages/:messageId :
// supprimer un message, 21 nov. 2026, carte 3. Met deleted_at,
// la ligne reste visible comme « Message supprimé », son contenu
// et ses pièces ne partent plus à personne : les pièces R2 sont
// effacées par supprimerObjetR2, un objet déjà absent ne bloque
// jamais la suppression. L'auteur seulement, ou la structure
// pour la modération, journalisée. La suppression ne fait pas
// disparaître la preuve d'un signalement déjà fait : le cliché
// figé vit dans reports.evidence_snapshot, jamais dans messages.
app.delete('/messagerie/conversations/:id/messages/:messageId', { preHandler: membreG }, async (req, reply) => {
  const { id, messageId } = req.params;
  if (!UUID_RE.test(id ?? '') || !UUID_RE.test(messageId ?? '')) return reply.code(404).send({ erreur: 'Message introuvable.' });
  const mid = membreMsgId(req);
  const msg = (
    await q(
      `SELECT m.id, m.conversation_id, m.sender_id, m.type, m.created_at, m.deleted_at,
              s.etablissement_id AS sender_etablissement
         FROM messages m LEFT JOIN membres s ON s.id = m.sender_id
        WHERE m.id = $1 AND m.conversation_id = $2`,
      [messageId, id],
    )
  ).rows[0];
  const decision = peutSupprimerMessage({
    message: msg,
    membreId: mid,
    estParticipant: await estParticipantMsg(id, mid),
    role: req.user.role,
    etablissementAuteur: msg?.sender_etablissement ?? null,
    etablissementModerateur: req.user.eid ?? null,
  });
  if (!decision.ok) {
    if (decision.statut === 404) return reply.code(404).send({ erreur: 'Message introuvable.' });
    throw httpError(decision.statut, decision.erreur);
  }
  const config = configR2();
  const pieces = (await q(`SELECT storage_key FROM message_attachments WHERE message_id = $1`, [messageId])).rows;
  for (const piece of pieces) {
    if (!config || !piece.storage_key) continue;
    try {
      await supprimerObjetR2(config, piece.storage_key);
    } catch (e) {
      app.log.warn({ err: e, message: messageId }, 'Pièce R2 du message supprimé non effacée');
    }
  }
  const r = await tx(async (c) => {
    await c.query(`DELETE FROM message_attachments WHERE message_id = $1`, [messageId]);
    const supprime = (
      await c.query(
        `UPDATE messages SET deleted_at = now() WHERE id = $1
          RETURNING id, conversation_id, sender_id, content, type, created_at, edited_at, deleted_at, expire_le`,
        [messageId],
      )
    ).rows[0];
    if (decision.moderation) {
      await audit(c, req, 'messagerie.message_supprime_moderation', 'messages', messageId, { conversation_id: id });
    }
    return supprime;
  });
  return masquerMessageSupprime(r);
});

// ── POST /messagerie/signalements : signaler un message, une conversation ou un membre.
app.post('/messagerie/signalements', { preHandler: membreG }, async (req, reply) => {
  const corps = req.body ?? {};
  // L'application envoie la clé française, le serveur stocke l'anglaise.
  const b = z.object({
    target_type: z.enum(['message', 'conversation', 'user', 'mur_publication', 'mur_commentaire']),
    target_id: z.string().uuid(),
    reason: z.enum(MOTIFS_SIGNALEMENT),
    description: z.string().trim().max(500).optional().nullable(),
    escalader: z.boolean().optional(),
  }).parse({ ...corps, reason: normaliserMotifSignalement(corps.reason) });
  const mid = membreMsgId(req);
  // Preuve figée au moment du signalement : une suppression
  // ultérieure par l'auteur ne fait pas disparaître la preuve.
  // Aucune coordonnée de contact n'entre dans le cliché.
  let snapshot;
  let etablissementId = null;
  if (b.target_type === 'message') {
    const msg = (
      await q(
        `SELECT m.id, m.conversation_id, m.sender_id, m.content, m.type, m.created_at,
                s.nom_complet AS sender_nom, s.matricule AS sender_matricule, s.etablissement_id AS sender_etablissement
           FROM messages m LEFT JOIN membres s ON s.id = m.sender_id WHERE m.id = $1`,
        [b.target_id],
      )
    ).rows[0];
    if (!msg) throw httpError(422, 'Contenu signalé introuvable.');
    if (!(await estParticipantMsg(msg.conversation_id, mid))) return reply.code(404).send({ erreur: 'Contenu signalé introuvable.' });
    etablissementId = msg.sender_etablissement ?? null;
    const contexte = (
      await q(
        `SELECT m.id, m.sender_id, s.nom_complet AS sender_nom, m.content, m.created_at
           FROM messages m LEFT JOIN membres s ON s.id = m.sender_id
          WHERE m.conversation_id = $1 AND m.created_at < $2 AND m.deleted_at IS NULL
          ORDER BY m.created_at DESC LIMIT 5`,
        [msg.conversation_id, msg.created_at],
      )
    ).rows.reverse();
    const pieces = (
      await q(`SELECT storage_key, mime_type, size_bytes, sha256 FROM message_attachments WHERE message_id = $1`, [b.target_id])
    ).rows;
    snapshot = {
      cible: 'message',
      message: { id: msg.id, conversation_id: msg.conversation_id, sender_id: msg.sender_id, sender_nom: msg.sender_nom, sender_matricule: msg.sender_matricule, content: msg.content, type: msg.type, created_at: msg.created_at },
      contexte,
      pieces_jointes: pieces,
    };
  } else if (b.target_type === 'conversation') {
    const conv = (await q(`SELECT id, type, title, created_by, created_at FROM conversations WHERE id = $1`, [b.target_id])).rows[0];
    if (!conv) throw httpError(422, 'Contenu signalé introuvable.');
    if (!(await estParticipantMsg(conv.id, mid))) return reply.code(404).send({ erreur: 'Contenu signalé introuvable.' });
    const createur = (await q(`SELECT etablissement_id FROM membres WHERE id = $1`, [conv.created_by])).rows[0];
    etablissementId = createur?.etablissement_id ?? null;
    const derniers = (
      await q(
        `SELECT m.id, m.sender_id, s.nom_complet AS sender_nom, m.content, m.created_at
           FROM messages m LEFT JOIN membres s ON s.id = m.sender_id
          WHERE m.conversation_id = $1 AND m.deleted_at IS NULL ORDER BY m.created_at DESC LIMIT 10`,
        [conv.id],
      )
    ).rows.reverse();
    snapshot = { cible: 'conversation', conversation: conv, derniers_messages: derniers };
  } else if (b.target_type === 'mur_publication') {
    // Mur v2 tranche 5 : cliché figé de la publication, la
    // structure lit le contenu même si l'auteur le supprime.
    // Une publication retirée ne se signale plus.
    const pub = (
      await q(
        `SELECT p.id, p.auteur_id, m.nom_complet AS auteur_nom, p.texte, p.categorie, p.cree_le, p.etablissement_id, p.statut_moderation
           FROM mur_publications p LEFT JOIN membres m ON m.id = p.auteur_id WHERE p.id = $1`,
        [b.target_id],
      )
    ).rows[0];
    if (!pub || pub.statut_moderation === 'retire') throw httpError(422, 'Contenu signalé introuvable.');
    etablissementId = pub.etablissement_id ?? null;
    snapshot = {
      cible: 'mur_publication',
      publication: { id: pub.id, auteur_id: pub.auteur_id, auteur_nom: pub.auteur_nom, texte: pub.texte, categorie: pub.categorie, cree_le: pub.cree_le, etablissement_id: pub.etablissement_id },
    };
  } else if (b.target_type === 'mur_commentaire') {
    const com = (
      await q(
        `SELECT c.id, c.texte, c.membre_id AS auteur, c.cible_id AS publication_id, p.etablissement_id
           FROM commentaires c LEFT JOIN mur_publications p ON p.id = c.cible_id
          WHERE c.id = $1 AND c.cible_type = 'mur'`,
        [b.target_id],
      )
    ).rows[0];
    if (!com) throw httpError(422, 'Contenu signalé introuvable.');
    etablissementId = com.etablissement_id ?? null;
    snapshot = {
      cible: 'mur_commentaire',
      commentaire: { id: com.id, texte: com.texte, auteur: com.auteur, publication_id: com.publication_id },
    };
  } else {
    const cible = (
      await q(
        `SELECT m.id, m.matricule, m.nom_complet, m.etablissement_id, e.nom AS etablissement_nom
           FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id WHERE m.id = $1`,
        [b.target_id],
      )
    ).rows[0];
    if (!cible) throw httpError(422, 'Membre signalé introuvable.');
    etablissementId = cible.etablissement_id ?? null;
    snapshot = { cible: 'user', membre: cible };
  }
  // Routage : la sécurité d'un enfant va toujours au référent
  // protection de l'enfance, hors file ordinaire, quel que soit
  // le choix du rapporteur ; sinon, escalade vers le Bureau
  // national si le rapporteur le demande, file locale par défaut.
  const routedTo = b.reason === 'child_safety' ? 'child_safety_referent' : b.escalader ? 'national' : 'local';
  // Empreinte sur la forme canonique du cliché, pour qu'elle se
  // vérifie encore après le passage par jsonb.
  const hash = sha256(jsonCanonique(JSON.parse(JSON.stringify(snapshot))));
  const report = await tx(async (c) => {
    const r = (
      await c.query(
        `INSERT INTO reports (reporter_id, target_type, target_id, reason, description, evidence_snapshot, evidence_hash, routed_to, etablissement_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, reporter_id, target_type, target_id, reason, routed_to, status, created_at`,
        [mid, b.target_type, b.target_id, b.reason, b.description ?? null, JSON.stringify(snapshot), hash, routedTo, etablissementId],
      )
    ).rows[0];
    if (b.target_type === 'message') {
      await c.query(`UPDATE messages SET is_reported = true WHERE id = $1`, [b.target_id]);
    }
    if (b.target_type === 'mur_publication') {
      // Un signalement ne masque pas tout de suite : la
      // publication passe en examen et reste visible.
      await c.query(`UPDATE mur_publications SET statut_moderation = 'en_examen' WHERE id = $1 AND statut_moderation = 'visible'`, [b.target_id]);
    }
    await audit(c, req, 'signalement.cree', 'reports', r.id, { motif: b.reason, routed_to: routedTo, cible: b.target_type });
    return r;
  });
  return reply.code(201).send(report);
});

// ── GET /messagerie/membres : choix des participants.
// Sécurité, 22 nov. 2026 : plus d'annuaire complet. Sans
// recherche, seuls les membres avec qui l'appelant a déjà
// une conversation active. Avec q, recherche par préfixe,
// 3 caractères au moins, bornée à 50 résultats. Nom,
// matricule et établissement seulement, sans aucune
// coordonnée de contact, jamais de photo en base64.
app.get('/messagerie/membres', { preHandler: membreG }, async (req) => {
  const saisie = typeof req.query?.q === 'string' ? req.query.q.trim() : '';
  if (saisie !== '') {
    if (saisie.length < 3) throw httpError(400, 'Saisissez au moins 3 caractères.');
    const haut = saisie.toUpperCase();
    const echappee = haut.replace(/[%_\\]/g, (c) => `\\${c}`);
    return (await q(
      `SELECT m.id, m.nom_complet, m.matricule, COALESCE(e.nom, '') AS etablissement
         FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id
        WHERE m.id IS DISTINCT FROM $3 AND (m.matricule = $1 OR UPPER(m.nom_complet) LIKE $2 ESCAPE '\\')
        ORDER BY CASE WHEN m.matricule = $1 THEN 0 ELSE 1 END, m.nom_complet ASC LIMIT 50`,
      [haut, `${echappee}%`, req.user.mid ?? null],
    )).rows;
  }
  if (!req.user.mid) return [];
  return (await q(
    `SELECT DISTINCT m.id, m.nom_complet, m.matricule, COALESCE(e.nom, '') AS etablissement
       FROM conversation_participants cp
       JOIN conversation_participants cp2 ON cp2.conversation_id = cp.conversation_id AND cp2.is_active
       JOIN membres m ON m.id = cp2.member_id
       LEFT JOIN etablissements e ON e.id = m.etablissement_id
      WHERE cp.member_id = $1 AND cp.is_active AND m.id <> $1
      ORDER BY m.nom_complet ASC LIMIT 500`,
    [req.user.mid],
  )).rows;
});

// ── GET /messagerie/signalements : mes signalements, statut et
// notes de résolution, sans détail des sanctions prises à l'égard
// d'un tiers. La preuve figée n'est pas renvoyée ici.
app.get('/messagerie/signalements', { preHandler: membreG }, async (req) => {
  const mid = membreMsgId(req);
  const lignes = (
    await q(
      `SELECT id, target_type, target_id, reason, description, status, routed_to,
              created_at, resolved_at, resolution_notes
         FROM reports WHERE reporter_id = $1 ORDER BY created_at DESC LIMIT 200`,
      [mid],
    )
  ).rows;
  return lignes;
});

// ── GET /messagerie/mes-sanctions : les sanctions qui me
// concernent (avertir, sourdine, suspendre), avec leur signalement
// et leur action d'origine pour le recours. Seule la personne
// sanctionnée voit cette liste.
app.get('/messagerie/mes-sanctions', { preHandler: membreG }, async (req) => {
  const mid = membreMsgId(req);
  const actions = (
    await q(
      `SELECT a.id, a.report_id, a.id AS moderation_action_id, a.action, a.notes, a.created_at,
              r.target_type, r.target_id, r.reason
         FROM moderation_actions a JOIN reports r ON r.id = a.report_id
        WHERE a.action IN ('avertir','sourdine','suspendre')
        ORDER BY a.created_at DESC LIMIT 200`,
    )
  ).rows;
  const lignes = [];
  for (const a of actions) {
    const concerne = await personneConcernee({ target_type: a.target_type, target_id: a.target_id });
    if (concerne === mid) lignes.push(a);
  }
  return lignes;
});

// ── GET /messagerie/moderation : file de modération.
// Administrateur général : tout sauf le circuit protection de
// l'enfance. Administrateur d'établissement : sa file locale
// seulement. Les signalements « sécurité d'un enfant » n'y
// apparaissent jamais. Seule cette file renvoie evidence_snapshot.
app.get('/messagerie/moderation', { preHandler: moderationG }, async (req) => {
  const statut = req.query?.statut;
  const motif = normaliserMotifSignalement(req.query?.motif);
  const params = [];
  let filtre = `r.routed_to <> 'child_safety_referent'`;
  if (req.user.role === 'admin_etablissement') {
    params.push(req.user.eid);
    filtre += ` AND r.routed_to = 'local' AND r.etablissement_id = $${params.length}`;
  }
  if (statut && ['pending', 'in_review', 'resolved', 'dismissed', 'escalated', 'appealed'].includes(statut)) {
    params.push(statut);
    filtre += ` AND r.status = $${params.length}`;
  }
  if (motif && MOTIFS_SIGNALEMENT.includes(motif)) {
    params.push(motif);
    filtre += ` AND r.reason = $${params.length}`;
  }
  const lignes = (
    await q(
      `SELECT r.*, rm.nom_complet AS reporter_nom, rm.matricule AS reporter_matricule
         FROM reports r LEFT JOIN membres rm ON rm.id = r.reporter_id
        WHERE ${filtre} ORDER BY r.created_at DESC LIMIT 200`,
      params,
    )
  ).rows;
  await audit(pool, req, 'moderation.file_consultee', 'reports', null, { resultats: lignes.length }).catch(() => {});
  return lignes;
});

// ── POST /messagerie/moderation/:id/action : décider sur un signalement.
app.post('/messagerie/moderation/:id/action', { preHandler: moderationG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Signalement introuvable.' });
  const b = z.object({
    action: z.enum(ACTIONS_MODERATION),
    note: z.string().trim().min(1).max(1000),
    duree_heures: z.number().int().min(1).max(720).optional(),
  }).parse(req.body ?? {});
  const report = (await q(`SELECT * FROM reports WHERE id = $1`, [id])).rows[0];
  if (!report) return reply.code(404).send({ erreur: 'Signalement introuvable.' });
  if (report.routed_to === 'child_safety_referent') return reply.code(404).send({ erreur: 'Signalement introuvable.' });
  if (req.user.role === 'admin_etablissement' && !(report.routed_to === 'local' && report.etablissement_id === req.user.eid)) {
    return reply.code(404).send({ erreur: 'Signalement introuvable.' });
  }
  // Conflit d'intérêts : aucune sanction par la personne qui a
  // signalé ou qui est concernée par le contenu.
  const rapporteurUtilisateur = await utilisateurDeMembre(report.reporter_id);
  const concerne = await personneConcernee(report);
  const concerneUtilisateur = await utilisateurDeMembre(concerne);
  let participantConversation = false;
  if (report.target_type === 'conversation' && req.user.mid) {
    participantConversation = await estParticipantMsg(report.target_id, req.user.mid);
  }
  if (req.user.sub === rapporteurUtilisateur || req.user.sub === concerneUtilisateur || participantConversation) {
    return reply.code(409).send({ erreur: 'Conflit d’intérêts : vous avez signalé ce contenu ou vous êtes concerné. Le dossier doit être transféré.', code: 'conflit_interet' });
  }
  if (b.action === 'escalader' && report.routed_to === 'national') {
    throw httpError(409, 'Ce signalement est déjà escaladé vers le Bureau national.');
  }
  if ((b.action === 'sourdine' || b.action === 'suspendre') && report.target_type === 'conversation') {
    throw httpError(422, 'La sourdine et la suspension visent une personne : signalez un message ou un membre pour les appliquer.');
  }
  if ((b.action === 'retirer' || b.action === 'masquer') && report.target_type !== 'mur_publication') {
    throw httpError(422, 'Le retrait et le masquage visent une publication du mur.');
  }
  const sanctionne = (b.action === 'sourdine' || b.action === 'suspendre') ? concerne : null;
  const duree = b.duree_heures ?? (b.action === 'sourdine' ? 24 : 168);
  const sortie = await tx(async (c) => {
    const action = (
      await c.query(
        `INSERT INTO moderation_actions (report_id, moderator_id, action, notes, duree_heures)
         VALUES ($1,$2,$3,$4,$5) RETURNING id, report_id, moderator_id, action, notes, duree_heures, created_at`,
        [id, req.user.sub, b.action, b.note, b.action === 'sourdine' || b.action === 'suspendre' ? duree : null],
      )
    ).rows[0];
    let statut = report.status;
    let retention = null;
    if (b.action === 'rejeter') {
      statut = 'dismissed';
      retention = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString();
    } else if (b.action === 'avertir' || b.action === 'sourdine' || b.action === 'suspendre') {
      statut = 'resolved';
      retention = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString();
    } else if (b.action === 'retirer' || b.action === 'masquer') {
      // Mur v2 tranche 5 : le dossier se clôt, la ligne reste
      // en base pour la traçabilité, à la différence de DELETE.
      statut = 'resolved';
      retention = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString();
    } else if (b.action === 'escalader') {
      statut = 'escalated';
    }
    await c.query(
      `UPDATE reports SET status = $2, resolved_at = CASE WHEN $2 IN ('resolved','dismissed') THEN NOW() ELSE resolved_at END,
         resolution_notes = $3, retention_until = $4::timestamptz,
         routed_to = CASE WHEN $5 = 'escalader' THEN 'national' ELSE routed_to END
       WHERE id = $1`,
      [id, statut, b.action === 'rejeter' || b.action === 'avertir' || b.action === 'sourdine' || b.action === 'suspendre' || b.action === 'retirer' || b.action === 'masquer' ? b.note : null, retention, b.action],
    );
    if (b.action === 'sourdine' && sanctionne) {
      // Sourdine : plus de notification dans les conversations
      // partagées avec le rapporteur (message ciblé : sa seule
      // conversation ; membre ciblé : toutes celles partagées).
      // L'accès à la conversation n'est pas coupé.
      const fin = new Date(Date.now() + duree * 3600 * 1000).toISOString();
      if (report.target_type === 'message') {
        const msg = (await c.query(`SELECT conversation_id FROM messages WHERE id = $1`, [report.target_id])).rows[0];
        if (msg) await c.query(`UPDATE conversation_participants SET muted_until = $3 WHERE conversation_id = $1 AND member_id = $2`, [msg.conversation_id, sanctionne, fin]);
      } else {
        await c.query(
          `UPDATE conversation_participants SET muted_until = $3 WHERE member_id = $1
            AND conversation_id IN (SELECT conversation_id FROM conversation_participants WHERE member_id = $2)`,
          [sanctionne, report.reporter_id, fin],
        );
      }
    }
    if (b.action === 'suspendre' && sanctionne) {
      const fin = new Date(Date.now() + duree * 3600 * 1000).toISOString();
      await c.query(`UPDATE membres SET messagerie_suspendu_jusquau = $2 WHERE id = $1`, [sanctionne, fin]);
    }
    if (b.action === 'retirer' && report.target_type === 'mur_publication') {
      await c.query(`UPDATE mur_publications SET statut_moderation = 'retire' WHERE id = $1`, [report.target_id]);
    } else if (b.action === 'masquer' && report.target_type === 'mur_publication') {
      await c.query(`UPDATE mur_publications SET statut_moderation = 'masque' WHERE id = $1`, [report.target_id]);
    } else if (b.action === 'rejeter' && report.target_type === 'mur_publication') {
      // Rejet du signalement : la publication en examen redevient visible.
      await c.query(`UPDATE mur_publications SET statut_moderation = 'visible' WHERE id = $1 AND statut_moderation = 'en_examen'`, [report.target_id]);
    }
    await audit(c, req, 'moderation.action', 'reports', id, { action: b.action, statut });
    return { action, statut };
  });
  // Le rapporteur est informé de la clôture, sans détail des
  // sanctions prises à l'égard d'un tiers.
  if (sortie.statut === 'resolved' || sortie.statut === 'dismissed') {
    await notifierMembre(report.reporter_id, 'signalement_cloture', 'Votre signalement a été traité', 'Bonjour {prenom}, votre signalement a été examiné et traité. Merci de votre vigilance.', 'signalement', id, 'Votre signalement a été traité', 'Votre signalement a été examiné et traité. Merci de votre vigilance.');
  } else if (sortie.statut === 'escalated') {
    await notifierMembre(report.reporter_id, 'signalement_cloture', 'Votre signalement a été escaladé', 'Bonjour {prenom}, votre signalement a été transmis au Bureau national.', 'signalement', id, 'Votre signalement a été escaladé', 'Votre signalement a été transmis au Bureau national.');
  }
  return reply.code(201).send(sortie.action);
});

// ── POST /messagerie/moderation/:id/transfert : transférer un
// dossier en conflit d'intérêts. Le transfert est enregistré dans
// moderation_actions (action 'transfert', note obligatoire) et le
// signalement repart en file (statut 'pending') pour qu'un autre
// modérateur le prenne. L'instance qui tranche quand
// l'administrateur général lui-même est concerné reste à désigner
// par la structure : en attendant, le dossier repart en file
// nationale, visible de tout administrateur général.
app.post('/messagerie/moderation/:id/transfert', { preHandler: moderationG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Signalement introuvable.' });
  const b = z.object({ note: z.string().trim().min(1).max(1000) }).parse(req.body ?? {});
  const report = (await q(`SELECT * FROM reports WHERE id = $1`, [id])).rows[0];
  if (!report) return reply.code(404).send({ erreur: 'Signalement introuvable.' });
  if (report.routed_to === 'child_safety_referent') return reply.code(404).send({ erreur: 'Signalement introuvable.' });
  if (req.user.role === 'admin_etablissement' && !(report.routed_to === 'local' && report.etablissement_id === req.user.eid)) {
    return reply.code(404).send({ erreur: 'Signalement introuvable.' });
  }
  await tx(async (c) => {
    await c.query(
      `INSERT INTO moderation_actions (report_id, moderator_id, action, notes) VALUES ($1,$2,'transfert',$3)`,
      [id, req.user.sub, b.note],
    );
    await c.query(`UPDATE reports SET status = 'pending' WHERE id = $1`, [id]);
    await audit(c, req, 'moderation.transfert', 'reports', id, { note: b.note });
  });
  return reply.code(201).send({ id, status: 'pending' });
});

// ── POST /messagerie/recours : contester une sanction, sous 15 jours.
app.post('/messagerie/recours', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({
    report_id: z.string().uuid(),
    moderation_action_id: z.string().uuid(),
    reason: z.string().trim().min(1).max(1000),
  }).parse(req.body ?? {});
  const mid = membreMsgId(req);
  const report = (await q(`SELECT * FROM reports WHERE id = $1`, [b.report_id])).rows[0];
  if (!report) throw httpError(422, 'Signalement introuvable.');
  const action = (
    await q(`SELECT * FROM moderation_actions WHERE id = $1 AND report_id = $2`, [b.moderation_action_id, b.report_id])
  ).rows[0];
  if (!action) throw httpError(422, 'Décision de modération introuvable.');
  if (!ACTIONS_CONTESTABLES.includes(action.action)) throw httpError(422, 'Cette décision ne peut pas faire l’objet d’un recours.');
  if (Date.now() - new Date(action.created_at).getTime() > DELAI_RECOURS_JOURS * 24 * 3600 * 1000) {
    throw httpError(422, 'Délai de recours dépassé (15 jours).');
  }
  const concerne = await personneConcernee(report);
  if (concerne !== mid) throw httpError(403, 'Seule la personne sanctionnée peut contester cette décision.');
  const existant = (
    await q(`SELECT 1 FROM appeals WHERE moderation_action_id = $1 AND status IN ('pending','in_review')`, [action.id])
  ).rows[0];
  if (existant) throw httpError(409, 'Un recours est déjà en cours pour cette décision.');
  const recours = await tx(async (c) => {
    const r = (
      await c.query(
        `INSERT INTO appeals (report_id, moderation_action_id, appellant_id, reason, repondre_avant)
         VALUES ($1,$2,$3,$4, NOW() + interval '${DELAI_REPONSE_RECOURS_JOURS} days') RETURNING id, report_id, moderation_action_id, appellant_id, reason, status, created_at, repondre_avant`,
        [b.report_id, action.id, req.user.sub, b.reason],
      )
    ).rows[0];
    // Le recours est traité par une personne différente de celle
    // qui a décidé : le modérateur initial est conservé sur
    // l'action (moderator_id), la route d'examen du recours, à
    // construire, devra refuser reviewer_id = moderator_id.
    await c.query(`UPDATE reports SET status = 'appealed' WHERE id = $1`, [b.report_id]);
    await audit(c, req, 'recours.cree', 'appeals', r.id, { report_id: b.report_id });
    return r;
  });
  return reply.code(201).send(recours);
});

// ── Aide de la structure, 21 nov. 2026, carte 4 ─────────────
// Un canal dédié de clavardage avec la structure, qui reprend le
// moteur de la Messagerie : mêmes tables conversations et
// messages, même envoi, mêmes notifications. Une demande est une
// conversation de type 'aide', avec un motif simple, problème ou
// abus, dans conversations.aide_motif, et un statut suivi côté
// serveur dans conversations.aide_statut : ouvert, en cours,
// résolu. À la création, le membre et les responsables du Bureau
// sont participants : l'administrateur général partout,
// l'administrateur d'établissement sur son établissement
// seulement. Une demande résolue reste lisible, sans nouveau
// message du membre tant qu'il ne l'a pas rouverte. Les routes
// /messagerie/* restent la voie d'envoi des messages et de
// lecture du fil, elles refusent l'écriture d'un membre dans une
// demande résolue. Signaler un problème et Signalements
// disparaissent côté application, ce service les remplace ; la
// modération des contenus garde ses propres routes.

// Responsables d'une demande : l'administrateur général, et les
// administrateurs de l'établissement du membre qui l'a ouverte.
async function responsablesAide(etablissementId) {
  const lignes = (
    await q(
      `SELECT m.id FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id
        WHERE u.role = 'admin_general'
           OR (u.role = 'admin_etablissement' AND m.etablissement_id = $1)`,
      [etablissementId],
    )
  ).rows;
  return lignes.map((l) => l.id);
}

// ── POST /aide/demandes : ouvrir une demande d'aide, motif
// simple et premier message. Crée la conversation de type
// 'aide', ses participants et le premier message, puis prévient
// les responsables. 201 avec la demande créée.
app.post('/aide/demandes', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({
    motif: z.enum(MOTIFS_AIDE),
    message: z.string().trim().min(1).max(5000),
  }).parse(req.body ?? {});
  if (!motifAideValide(b.motif)) throw httpError(400, 'Motif invalide.');
  const mid = membreMsgId(req);
  const suspendu = await messagerieSuspendue(mid);
  if (suspendu && suspendu > new Date()) throw httpError(403, `Accès à la messagerie suspendu jusqu'au ${suspendu.toISOString()}.`);
  const demandeur = (await q(`SELECT id, nom_complet, etablissement_id FROM membres WHERE id = $1`, [mid])).rows[0];
  if (!demandeur) throw httpError(403, 'Profil membre requis.');
  const responsables = await responsablesAide(demandeur.etablissement_id);
  const demande = await tx(async (c) => {
    const conv = (
      await c.query(
        `INSERT INTO conversations (type, title, created_by, aide_statut, aide_motif) VALUES ('aide', $1, $2, 'ouvert', $3)
         RETURNING id, type, title, created_at, last_message_at, aide_statut, aide_motif`,
        [titreDemandeAide(b.motif), mid, b.motif],
      )
    ).rows[0];
    await c.query(`INSERT INTO conversation_participants (conversation_id, member_id, role) VALUES ($1, $2, 'membre')`, [conv.id, mid]);
    for (const responsable of responsables) {
      await c.query(
        `INSERT INTO conversation_participants (conversation_id, member_id, role) VALUES ($1, $2, 'responsable')
         ON CONFLICT (conversation_id, member_id) DO UPDATE SET is_active = true`,
        [conv.id, responsable],
      );
    }
    await c.query(
      `INSERT INTO messages (conversation_id, sender_id, content, type) VALUES ($1, $2, $3, 'text')`,
      [conv.id, mid, b.message],
    );
    await c.query(`UPDATE conversations SET last_message_at = NOW() WHERE id = $1`, [conv.id]);
    await audit(c, req, 'aide.demande_creee', 'conversations', conv.id, { motif: b.motif });
    return conv;
  });
  for (const responsable of responsables) {
    await notifierMembre(
      responsable,
      'nouveau_message',
      'Nouvelle demande d’aide',
      `${b.motif === 'abus' ? 'Abus' : 'Problème'} : ${apercuMessage(b.message)}`,
      'messagerie',
      demande.id,
      'Nouvelle demande d’aide',
      `${b.motif === 'abus' ? 'Abus' : 'Problème'} : ${apercuMessage(b.message)}`,
    );
  }
  return reply.code(201).send(formaterDemandeAide({ ...demande, demandeur_nom: demandeur.nom_complet }));
});

// ── GET /aide/mes-demandes : mes demandes d'aide, statut et
// motif, la plus récente d'abord.
app.get('/aide/mes-demandes', { preHandler: membreG }, async (req) => {
  const mid = membreMsgId(req);
  const lignes = (
    await q(
      `SELECT c.id, c.type, c.title, c.created_at, c.last_message_at, c.aide_statut, c.aide_motif,
              m.nom_complet AS demandeur_nom, m.matricule AS demandeur_matricule
         FROM conversations c JOIN conversation_participants cp ON cp.conversation_id = c.id
         LEFT JOIN membres m ON m.id = c.created_by
        WHERE cp.member_id = $1 AND cp.is_active AND c.type = 'aide' AND NOT c.is_archived
        ORDER BY c.last_message_at DESC NULLS LAST, c.created_at DESC`,
      [mid],
    )
  ).rows;
  return lignes.map(formaterDemandeAide);
});

// ── GET /aide/demandes : file des demandes, pour le Bureau.
// Administrateur général : toute la file. Administrateur
// d'établissement : les demandes de son établissement seulement.
// Filtre par statut, ouvert, en cours ou résolu.
app.get('/aide/demandes', { preHandler: moderationG }, async (req) => {
  const statut = req.query?.statut;
  const params = [];
  let filtre = `c.type = 'aide' AND NOT c.is_archived`;
  if (req.user.role === 'admin_etablissement') {
    params.push(req.user.eid);
    filtre += ` AND m.etablissement_id = $${params.length}`;
  }
  if (statut && statutAideValide(statut)) {
    params.push(statut);
    filtre += ` AND c.aide_statut = $${params.length}`;
  }
  const lignes = (
    await q(
      `SELECT c.id, c.type, c.title, c.created_at, c.last_message_at, c.aide_statut, c.aide_motif,
              m.nom_complet AS demandeur_nom, m.matricule AS demandeur_matricule
         FROM conversations c LEFT JOIN membres m ON m.id = c.created_by
        WHERE ${filtre} ORDER BY c.last_message_at DESC NULLS LAST, c.created_at DESC LIMIT 200`,
      params,
    )
  ).rows;
  return lignes.map(formaterDemandeAide);
});

// ── GET /aide/demandes/:id : une demande, pour le Bureau, avec
// ses participants. Le responsable qui l'ouvre devient
// participant quand il ne l'était pas encore, pour pouvoir
// répondre dans le fil. 404 quand la demande n'existe pas,
// 404 quand la demande n'existe pas ou ne relève pas de
// son établissement, motif unique, 22 nov. 2026.
app.get('/aide/demandes/:id', { preHandler: moderationG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Demande introuvable.' });
  const ligne = (
    await q(
      `SELECT c.id, c.type, c.title, c.created_at, c.last_message_at, c.aide_statut, c.aide_motif, c.created_by,
              m.nom_complet AS demandeur_nom, m.matricule AS demandeur_matricule, m.etablissement_id AS demandeur_etablissement
         FROM conversations c LEFT JOIN membres m ON m.id = c.created_by
        WHERE c.id = $1 AND c.type = 'aide'`,
      [id],
    )
  ).rows[0];
  if (!ligne) return reply.code(404).send({ erreur: 'Demande introuvable.' });
  if (!peutChangerStatutAide({ role: req.user.role, etablissementDemandeur: ligne.demandeur_etablissement, etablissementResponsable: req.user.eid })) {
    return reply.code(404).send({ erreur: 'Demande introuvable.' });
  }
  const mid = req.user.mid;
  if (mid) {
    await q(
      `INSERT INTO conversation_participants (conversation_id, member_id, role) VALUES ($1, $2, 'responsable')
       ON CONFLICT (conversation_id, member_id) DO UPDATE SET is_active = true`,
      [id, mid],
    );
  }
  const participants = (await q(SQL_PARTICIPANTS_CONVERSATION, [id])).rows;
  return { ...formaterDemandeAide(ligne), participants };
});

// ── PATCH /aide/demandes/:id/statut : changer le statut d'une
// demande, ouvert, en cours ou résolu. Le responsable qui change
// le statut devient participant quand il ne l'était pas encore.
// Le membre est prévenu du nouveau statut.
app.patch('/aide/demandes/:id/statut', { preHandler: moderationG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Demande introuvable.' });
  const b = z.object({ statut: z.enum(STATUTS_AIDE) }).parse(req.body ?? {});
  if (!statutAideValide(b.statut)) throw httpError(400, 'Statut invalide.');
  const ligne = (
    await q(
      `SELECT c.id, c.type, c.title, c.created_at, c.last_message_at, c.aide_statut, c.aide_motif, c.created_by,
              m.nom_complet AS demandeur_nom, m.matricule AS demandeur_matricule, m.etablissement_id AS demandeur_etablissement
         FROM conversations c LEFT JOIN membres m ON m.id = c.created_by
        WHERE c.id = $1 AND c.type = 'aide'`,
      [id],
    )
  ).rows[0];
  if (!ligne) return reply.code(404).send({ erreur: 'Demande introuvable.' });
  if (!peutChangerStatutAide({ role: req.user.role, etablissementDemandeur: ligne.demandeur_etablissement, etablissementResponsable: req.user.eid })) {
    return reply.code(404).send({ erreur: 'Demande introuvable.' });
  }
  const sortie = await tx(async (c) => {
    const r = (
      await c.query(
        `UPDATE conversations SET aide_statut = $2 WHERE id = $1
         RETURNING id, type, title, created_at, last_message_at, aide_statut, aide_motif`,
        [id, b.statut],
      )
    ).rows[0];
    if (req.user.mid) {
      await c.query(
        `INSERT INTO conversation_participants (conversation_id, member_id, role) VALUES ($1, $2, 'responsable')
         ON CONFLICT (conversation_id, member_id) DO UPDATE SET is_active = true`,
        [id, req.user.mid],
      );
    }
    await audit(c, req, 'aide.statut_change', 'conversations', id, { statut: b.statut });
    return r;
  });
  if (ligne.created_by) {
    await notifierMembre(
      ligne.created_by,
      'nouveau_message',
      `Votre demande d’aide : ${libelleStatutAide(b.statut)}`,
      `Votre demande d’aide est ${b.statut === 'resolu' ? 'résolue' : b.statut === 'en_cours' ? 'en cours de traitement' : 'ouverte'}.`,
      'messagerie',
      id,
      `Votre demande d’aide : ${libelleStatutAide(b.statut)}`,
      `Votre demande d’aide est ${b.statut === 'resolu' ? 'résolue' : b.statut === 'en_cours' ? 'en cours de traitement' : 'ouverte'}.`,
    );
  }
  return { ...formaterDemandeAide({ ...sortie, demandeur_nom: ligne.demandeur_nom, demandeur_matricule: ligne.demandeur_matricule }) };
});

// ── POST /aide/demandes/:id/rouvrir : le membre rouvre sa
// demande résolue, qui repasse en ouvert. Son auteur seulement,
// une demande déjà ouverte refuse en 409.
app.post('/aide/demandes/:id/rouvrir', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Demande introuvable.' });
  const mid = membreMsgId(req);
  const ligne = (
    await q(
      `SELECT c.id, c.type, c.title, c.created_at, c.last_message_at, c.aide_statut, c.aide_motif, c.created_by,
              m.nom_complet AS demandeur_nom, m.matricule AS demandeur_matricule, m.etablissement_id AS demandeur_etablissement
         FROM conversations c LEFT JOIN membres m ON m.id = c.created_by
        WHERE c.id = $1 AND c.type = 'aide'`,
      [id],
    )
  ).rows[0];
  if (!ligne || ligne.created_by !== mid) return reply.code(404).send({ erreur: 'Demande introuvable.' });
  if (!peutRouvrirAide({ statut: ligne.aide_statut, estDemandeur: true })) {
    throw httpError(409, 'Cette demande est déjà ouverte.');
  }
  const sortie = await tx(async (c) => {
    const r = (
      await c.query(
        `UPDATE conversations SET aide_statut = 'ouvert' WHERE id = $1
         RETURNING id, type, title, created_at, last_message_at, aide_statut, aide_motif`,
        [id],
      )
    ).rows[0];
    await audit(c, req, 'aide.demande_rouverte', 'conversations', id, {});
    return r;
  });
  const responsables = await responsablesAide(ligne.demandeur_etablissement);
  for (const responsable of responsables) {
    await notifierMembre(
      responsable,
      'nouveau_message',
      'Demande d’aide rouverte',
      `${ligne.demandeur_nom ?? 'Un membre'} a rouvert sa demande d’aide.`,
      'messagerie',
      id,
      'Demande d’aide rouverte',
      `${ligne.demandeur_nom ?? 'Un membre'} a rouvert sa demande d’aide.`,
    );
  }
  return { ...formaterDemandeAide({ ...sortie, demandeur_nom: ligne.demandeur_nom, demandeur_matricule: ligne.demandeur_matricule }) };
});

// ── Appels audio et vidéo dans la messagerie, 16 nov. 2026.
// Décision d'Axel : services exclusivement gratuits, aucun coût.
// Signalisation par WebSocket sur ce même service Render (route
// /messagerie/ws, remise instantanée) et par HTTP (source durable,
// table appels_signaux, repli par interrogation toutes les 2
// secondes pendant l'établissement). Le média WebRTC est direct
// entre les deux téléphones, jamais par le serveur. Appels à deux
// seulement, depuis une conversation directe ; les appels de
// groupe restent pour une phase suivante (LiveKit Cloud gratuit).
// Mêmes protections que la directe : blocage, règle mineurs,
// suspension de messagerie.

// Registre des sockets de signalisation, un par membre connecté.
const registreAppels = new RegistreSocketsAppels();

// Un appel, avec le nom de l'appelant, ou null.
async function lireAppel(id) {
  const r = (
    await q(
      `SELECT a.id, a.conversation_id, a.appelant_id, a.type, a.statut, a.cree_le, a.repondu_le, a.termine_le,
              m.nom_complet AS appelant_nom
         FROM appels a JOIN membres m ON m.id = a.appelant_id WHERE a.id = $1`,
      [id],
    )
  ).rows[0];
  return r ?? null;
}

// L'autre participant d'une conversation directe : identifiant,
// nom et sourdine éventuelle, ou null.
async function autreParticipantAppel(conversationId, mid) {
  const r = (
    await q(
      `SELECT cp.member_id, m.nom_complet, cp.muted_until
         FROM conversation_participants cp JOIN membres m ON m.id = cp.member_id
        WHERE cp.conversation_id = $1 AND cp.member_id <> $2 AND cp.is_active`,
      [conversationId, mid],
    )
  ).rows[0];
  return r ?? null;
}

// Blocage et règle mineurs entre deux membres, mêmes contrôles
// que la création d'une conversation directe : un membre bloqué
// ne peut pas appeler, un membre mineur ne parle en direct qu'à
// un tuteur déclaré ou à l'administrateur général.
async function appelDirectAutorise(mid, autreId) {
  const bloque = await q(
    `SELECT 1 FROM blocks WHERE (blocker_id = $1 AND blocked_id = $2) OR (blocker_id = $2 AND blocked_id = $1)`,
    [mid, autreId],
  );
  if (bloque.rows.length > 0) throw httpError(403, 'Appel impossible : un blocage existe entre ces deux membres.');
  for (const p of [mid, autreId]) {
    const flag = (await q(`SELECT is_minor, guardian_ids FROM minor_flags WHERE member_id = $1`, [p])).rows[0];
    if (flag?.is_minor) {
      const autreCote = p === mid ? autreId : mid;
      const estTuteur = (flag.guardian_ids ?? []).includes(autreCote);
      const autreRole = (await q(`SELECT role FROM utilisateurs u JOIN membres m ON m.utilisateur_id = u.id WHERE m.id = $1`, [autreCote])).rows[0]?.role;
      if (!estTuteur && autreRole !== 'admin_general') {
        throw httpError(403, 'Un membre mineur ne peut appeler en direct qu’un tuteur ou l’administrateur général.');
      }
    }
  }
}

// ── Appel manqué : une ligne dans la conversation, pour que
// l'appelé voie l'appel raté avec l'heure et puisse rappeler.
// Une seule ligne par appel : insérée à la transition
// sonne → terminé ou sonne → expiré, jamais après une réponse.
// L'auteur est l'appelant, donc la ligne compte comme non lue
// pour l'appelé seulement ; le contenu est le type d'appel,
// 'audio' ou 'video', pour rappeler du même type.
async function insererAppelManque(appel) {
  if (!appel || appel.statut !== 'sonne') return;
  try {
    await q(
      `INSERT INTO messages (conversation_id, sender_id, content, type) VALUES ($1,$2,$3,'appel_manque')`,
      [appel.conversation_id, appel.appelant_id, appel.type],
    );
  } catch (_) {}
}

// ── POST /messagerie/conversations/:id/appels : appeler l'autre membre.
app.post('/messagerie/conversations/:id/appels', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const b = z.object({ type: z.enum(TYPES_APPEL) }).parse(req.body ?? {});
  const mid = membreMsgId(req);
  const suspendu = await messagerieSuspendue(mid);
  if (suspendu && suspendu > new Date()) throw httpError(403, `Accès à la messagerie suspendu jusqu'au ${suspendu.toISOString()}.`);
  const conv = (await q(`SELECT id, type FROM conversations WHERE id = $1`, [id])).rows[0];
  if (!conv) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  if (conv.type !== 'directe') throw httpError(400, 'Les appels sont possibles seulement en conversation directe, pour cette tranche.');
  if (!(await estParticipantMsg(id, mid))) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const autre = await autreParticipantAppel(id, mid);
  if (!autre) throw httpError(400, 'Conversation directe sans autre participant.');
  await appelDirectAutorise(mid, autre.member_id);
  // Un appel resté ouvert (sonnerie sans annulation, appel en
  // cours sans fin) ne bloque plus la conversation pour toujours :
  // expiré ici, le nouvel appel est accepté, 19 nov. 2026.
  const actif = (
    await q(
      `SELECT id, conversation_id, appelant_id, type, statut, cree_le, repondu_le FROM appels WHERE conversation_id = $1 AND statut IN ('sonne','en_cours') ORDER BY cree_le DESC LIMIT 1`,
      [id],
    )
  ).rows[0];
  if (actif && appelObsolete(actif)) {
    await q(
      `UPDATE appels SET statut = 'expire', termine_le = now() WHERE id = $1 AND statut IN ('sonne','en_cours')`,
      [actif.id],
    );
    await insererAppelManque(actif);
  } else if (actif) {
    throw httpError(409, 'Un appel est déjà en cours dans cette conversation.');
  }
  // Limite de créations levée le 20 nov. 2026, décision d'Axel :
  // un rappel après un appel raté ne doit plus être refusé en 429.
  // Le 409 ci-dessus reste : un seul appel actif par conversation.
  const appel = await tx(async (c) => {
    const r = (
      await c.query(
        `INSERT INTO appels (conversation_id, appelant_id, type) VALUES ($1,$2,$3)
         RETURNING id, conversation_id, appelant_id, type, statut, cree_le`,
        [id, mid, b.type],
      )
    ).rows[0];
    await audit(c, req, 'messagerie.appel_cree', 'appels', r.id, { conversation_id: id, type: b.type });
    return r;
  });
  // Sonnerie chez l'appelé : cloche interne + poussée FCM, sauf
  // s'il a mis cette conversation en sourdine. Un échec de
  // poussée ne fait jamais échouer la création de l'appel.
  // Données seules, 20 nov. 2026 : sans champ notification,
  // pour que Android ne montre pas une bannière à la place de
  // l'écran d'appel natif, affiché par l'application depuis le
  // gestionnaire d'arrière-plan, même téléphone verrouillé.
  if (!autre.muted_until || new Date(autre.muted_until) <= new Date()) {
    const appelant = (await q(`SELECT nom_complet FROM membres WHERE id = $1`, [mid])).rows[0];
    await notifierMembre(
      autre.member_id,
      'appel_entrant',
      'Appel entrant',
      '{prenom} vous appelle',
      'appel',
      appel.id,
      'Appel entrant',
      'Un membre vous appelle',
      {
        appel_id: appel.id,
        conversation_id: id,
        appelant_nom: appelant?.nom_complet ?? '',
        type_appel: b.type,
      },
      { donneesSeules: true },
    );
  }
  return reply.code(201).send({ ...appel, appele_id: autre.member_id, appele_nom: autre.nom_complet });
});

// ── GET /messagerie/conversations/:id/appel_actif : appel en cours, ou null.
app.get('/messagerie/conversations/:id/appel_actif', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const mid = membreMsgId(req);
  if (!(await estParticipantMsg(id, mid))) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const appel = (
    await q(
      `SELECT a.id, a.conversation_id, a.appelant_id, a.type, a.statut, a.cree_le, a.repondu_le,
              m.nom_complet AS appelant_nom
         FROM appels a JOIN membres m ON m.id = a.appelant_id
        WHERE a.conversation_id = $1 AND a.statut IN ('sonne','en_cours')
        ORDER BY a.cree_le DESC LIMIT 1`,
      [id],
    )
  ).rows[0] ?? null;
  if (appel && appelObsolete(appel)) {
    await q(`UPDATE appels SET statut = 'expire', termine_le = now() WHERE id = $1 AND statut IN ('sonne','en_cours')`, [appel.id]);
    await insererAppelManque(appel);
    return { appel: null };
  }
  return { appel: appel ?? null };
});

// ── GET /messagerie/conversations/:id/presence : l'autre membre est-il en ligne ?
// En ligne quand il a signalé son activité dans les 10 dernières minutes,
// même fenêtre que la liste administrateur des membres en ligne.
// Directe seulement : un groupe n'a pas un seul autre membre.
app.get('/messagerie/conversations/:id/presence', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const mid = membreMsgId(req);
  const conv = (await q(`SELECT id, type FROM conversations WHERE id = $1`, [id])).rows[0];
  if (!conv) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  if (conv.type !== 'directe') return { en_ligne: false };
  if (!(await estParticipantMsg(id, mid))) return reply.code(404).send({ erreur: 'Conversation introuvable.' });
  const autre = await autreParticipantAppel(id, mid);
  if (!autre) return { en_ligne: false };
  const r = (
    await q(
      `SELECT EXISTS(SELECT 1 FROM membres WHERE id = $1 AND derniere_activite > now() - interval '10 minutes') AS en_ligne`,
      [autre.member_id],
    )
  ).rows[0];
  return { en_ligne: r?.en_ligne === true };
});

// ── GET /messagerie/appels/ice : configuration ICE (STUN, TURN si configuré).
app.get('/messagerie/appels/ice', { preHandler: membreG }, async () => configIce(process.env));

// ── GET /messagerie/appels/entrants : appels en sonnerie où je suis l'appelé.
// Filet de sécurité des appels instantanés, 20 nov. 2026 : FCM n'a jamais
// été prouvé en réel, donc l'accueil sonde cette route toutes les 3 secondes
// tant que l'application est ouverte. Seuls les appels en sonnerie depuis
// moins de 60 secondes sont renvoyés, comme le délai d'expiration serveur.
app.get('/messagerie/appels/entrants', { preHandler: membreG }, async (req) => {
  const mid = membreMsgId(req);
  return (
    await q(
      `SELECT a.id, a.conversation_id, a.appelant_id, a.type, a.statut, a.cree_le, a.repondu_le,
              m.nom_complet AS appelant_nom
         FROM appels a JOIN membres m ON m.id = a.appelant_id
        WHERE a.statut = 'sonne' AND a.appelant_id <> $1
          AND a.cree_le > now() - interval '60 seconds'
          AND EXISTS (SELECT 1 FROM conversation_participants cp WHERE cp.conversation_id = a.conversation_id AND cp.member_id = $1 AND cp.is_active)
        ORDER BY a.cree_le DESC`,
      [mid],
    )
  ).rows;
});

// ── GET /messagerie/appels : mon historique d'appels, tranche
// T4, 26 nov. 2026. Lecture seule : un SELECT, aucune écriture.
// Mes conversations seulement, 50 derniers, du plus récent au
// plus ancien. Chaque ligne porte l'autre membre (nom et
// matricule, jamais de photo) et `manque`, vrai quand je suis
// l'appelé et que l'appel s'est terminé sans réponse. Les appels
// en sonnerie ou en cours n'y figurent pas, ils vivent dans
// /appel_actif et /entrants.
app.get('/messagerie/appels', { preHandler: membreG }, async (req) => {
  const mid = membreMsgId(req);
  const lignes = (
    await q(
      `SELECT a.id, a.conversation_id, a.appelant_id, a.type, a.statut, a.cree_le, a.repondu_le, a.termine_le,
              m.nom_complet AS autre_nom, m.matricule AS autre_matricule
         FROM appels a
         JOIN conversation_participants cp ON cp.conversation_id = a.conversation_id AND cp.member_id = $1 AND cp.is_active
         LEFT JOIN conversation_participants cp2 ON cp2.conversation_id = a.conversation_id AND cp2.member_id <> $1 AND cp2.is_active
         LEFT JOIN membres m ON m.id = cp2.member_id
        WHERE a.statut IN ('termine', 'expire')
        ORDER BY a.cree_le DESC LIMIT 50`,
      [mid],
    )
  ).rows;
  return lignes.map((a) => ({ ...a, manque: estAppelManque(a, mid) }));
});

// ── GET /messagerie/appels/:id : un appel, participants seulement.
app.get('/messagerie/appels/:id', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  const mid = membreMsgId(req);
  const appel = await lireAppel(id);
  if (!appel) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  if (!(await estParticipantMsg(appel.conversation_id, mid))) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  if (appel.statut === 'sonne' && appelExpire(appel.cree_le)) {
    await q(`UPDATE appels SET statut = 'expire', termine_le = now() WHERE id = $1 AND statut = 'sonne'`, [id]);
    await insererAppelManque(appel);
    appel.statut = 'expire';
  }
  const autre = await autreParticipantAppel(appel.conversation_id, mid);
  return { ...appel, appele_id: autre?.member_id ?? null, appele_nom: autre?.nom_complet ?? null };
});

// ── GET /messagerie/appels/:id/signaux : les signaux d'un appel, dans l'ordre.
app.get('/messagerie/appels/:id/signaux', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  const mid = membreMsgId(req);
  const appel = await lireAppel(id);
  if (!appel) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  if (!(await estParticipantMsg(appel.conversation_id, mid))) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  return (
    await q(
      `SELECT id, appel_id, emetteur_id, type, contenu, cree_le FROM appels_signaux
        WHERE appel_id = $1 ORDER BY cree_le ASC, id ASC LIMIT 200`,
      [id],
    )
  ).rows;
});

// ── POST /messagerie/appels/:id/signaux : envoyer un signal (offre, réponse,
// candidat ICE, acceptation, refus, annulation, fin). Le signal est persisté
// puis relayé en instantané par WebSocket à l'autre participant, au mieux :
// la source durable reste la table, lue en repli par l'application.
app.post('/messagerie/appels/:id/signaux', { preHandler: membreG }, async (req, reply) => {
  const { id } = req.params;
  if (!UUID_RE.test(id ?? '')) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  const b = z.object({
    type: z.enum(TYPES_SIGNAL_APPEL),
    contenu: z.object({}).passthrough().optional().default({}),
  }).parse(req.body ?? {});
  const mid = membreMsgId(req);
  const appel = await lireAppel(id);
  if (!appel) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  if (!(await estParticipantMsg(appel.conversation_id, mid))) return reply.code(404).send({ erreur: 'Appel introuvable.' });
  if (appel.statut === 'termine' || appel.statut === 'expire') throw httpError(409, 'Appel terminé.');
  let contenu;
  try {
    contenu = normaliserContenuSignal(b.type, b.contenu ?? {});
  } catch (e) {
    throw httpError(400, e.message);
  }
  const signal = (
    await q(
      `INSERT INTO appels_signaux (appel_id, emetteur_id, type, contenu) VALUES ($1,$2,$3,$4::jsonb)
       RETURNING id, appel_id, emetteur_id, type, contenu, cree_le`,
      [id, mid, b.type, JSON.stringify(contenu)],
    )
  ).rows[0];
  const nouveauStatut = statutApresSignal(appel.statut, b.type);
  if (nouveauStatut === 'en_cours') {
    await q(`UPDATE appels SET statut = 'en_cours', repondu_le = now() WHERE id = $1`, [id]);
  } else if (nouveauStatut === 'termine') {
    await q(`UPDATE appels SET statut = 'termine', termine_le = now() WHERE id = $1`, [id]);
    await insererAppelManque(appel);
  }
  try {
    const autre = await autreParticipantAppel(appel.conversation_id, mid);
    if (autre) {
      registreAppels.diffuser(
        autre.member_id,
        JSON.stringify({ type: 'signal_appel', appel_id: id, signal }),
      );
    }
  } catch (_) {}
  return reply.code(201).send(signal);
});

// ── GET /messagerie/ws : WebSocket de signalisation d'appels.
// H-4, 22 nov. 2026 : le jeton peut arriver par premier message
// JSON {"type":"auth","jeton":"..."}, sans passer par l'URL, pour
// ne plus l'écrire dans les journaux. Sans authentification dans
// les 10 secondes, la socket est fermée (4401). ?jeton= reste
// accepté en repli, pour les APK déjà installées. Le jeton est
// vérifié comme celui des routes HTTP (même secret, même durée
// de 15 minutes), puis la fiche membre est vérifiée en base.
// Sans jeton valide, la socket est fermée (4401). La socket ne
// sert qu'à recevoir : les signaux partent en HTTP (persistés,
// puis relayés ici).
app.get('/messagerie/ws', { websocket: true }, (socket, req) => {
  let authentifie = false;
  const fermerNonAuthentifie = () => {
    if (authentifie) return;
    try {
      socket.close(4401, 'Authentification requise.');
    } catch (_) {}
  };
  const delaiAuth = setTimeout(fermerNonAuthentifie, 10000);
  const inscrireApresAuth = (jeton) => {
    let payload;
    try {
      if (typeof jeton !== 'string' || jeton === '') throw new Error('Jeton manquant.');
      payload = app.jwt.verify(jeton);
    } catch (_) {
      fermerNonAuthentifie();
      return;
    }
    const mid = payload?.mid ?? null;
    const role = payload?.role ?? null;
    if (!mid || !['membre', 'admin_general', 'admin_etablissement'].includes(role)) {
      fermerNonAuthentifie();
      return;
    }
    q(`SELECT id FROM membres WHERE id = $1`, [mid])
      .then((r) => {
        if (r.rows.length === 0) {
          fermerNonAuthentifie();
          return;
        }
        authentifie = true;
        clearTimeout(delaiAuth);
        registreAppels.inscrire(mid, socket);
        socket.on('close', () => registreAppels.retirer(mid, socket));
        socket.on('error', () => registreAppels.retirer(mid, socket));
      })
      .catch(() => {
        try {
          socket.close(1011, 'Erreur interne.');
        } catch (_) {}
      });
  };
  const jetonRequete = req.query?.jeton;
  if (typeof jetonRequete === 'string' && jetonRequete !== '') {
    inscrireApresAuth(jetonRequete);
    return;
  }
  socket.on('message', (donnees) => {
    if (authentifie) return;
    let message;
    try {
      message = JSON.parse(String(donnees));
    } catch (_) {
      fermerNonAuthentifie();
      return;
    }
    if (message?.type !== 'auth' || typeof message?.jeton !== 'string') {
      fermerNonAuthentifie();
      return;
    }
    inscrireApresAuth(message.jeton);
  });
});

// ───────────────────────── Démarrage ─────────────────────────
const stop = async () => {
  await app.close();
  await pool.end();
  process.exit(0);
};
process.on('SIGTERM', stop);
process.on('SIGINT', stop);

await fsp.mkdir(CFG.uploadDir, { recursive: true });

// Schéma initial, une seule fois, si la base est vide.
const existing = await q(
  "SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'etablissements'",
);
if (existing.rows.length === 0) {
  const schemaPath = path.resolve('schema.sql');
  const schema = await fsp.readFile(schemaPath, 'utf-8');
  await q(schema);
}

// 1er nov. 2026 : les échecs de migration sont journalisés (warn)
// au lieu d’être avalés silencieusement — une migration jamais
// appliquée ne doit plus se révéler au moment où la fonctionnalité casse.
// Migrations légères, idempotentes, pour une base déjà existante :
// table des commandes PayPal, et mode de confirmation 'paypal'.
try {
  await q(`CREATE TABLE IF NOT EXISTS paypal_commandes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paiement_id uuid NOT NULL REFERENCES paiements(id) ON DELETE RESTRICT,
    commande_id text NOT NULL UNIQUE,
    devise text NOT NULL,
    montant_devise text NOT NULL,
    statut text NOT NULL DEFAULT 'creee',
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS paypal_commandes (' }, 'Échec de migration — poursuite du démarrage'); }
// Config design, carte 47, 6 nov. 2026 : une seule ligne id 1,
// valeurs par défaut insérées une fois, jamais écrasées ensuite.
try {
  await q(`CREATE TABLE IF NOT EXISTS design_config (
    id integer PRIMARY KEY CHECK (id = 1),
    valeur jsonb NOT NULL,
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(
    'INSERT INTO design_config (id, valeur) VALUES (1, $1::jsonb) ON CONFLICT DO NOTHING',
    [JSON.stringify(DEFAULT_DESIGN_CONFIG)],
  );
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS design_config (' }, 'Échec de migration — poursuite du démarrage'); }
// Palette maquette, T17, 26 nov. 2026 : la ligne id 1, créée avec
// la palette du 18 nov. 2026, garde les anciennes couleurs, et
// mergeDesignConfig les fait passer avant les nouveaux défauts.
// Si les 4 couleurs sont exactement les anciennes, on les remplace
// par les nouvelles, sans toucher aux autres clés. Idempotente :
// après migration, les couleurs ne sont plus les anciennes. Si la
// palette a été personnalisée, on ne touche à rien.
try {
  const rows = (await q('SELECT valeur FROM design_config WHERE id = 1')).rows;
  if (rows.length) {
    const migree = migPaletteDesign(rows[0].valeur);
    if (migree) {
      await q('UPDATE design_config SET valeur = $1::jsonb, modifie_le = now() WHERE id = 1', [JSON.stringify(migree)]);
    }
  }
} catch (e) { app.log.warn({ err: e, migration: 'Palette design T17' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TYPE mode_confirmation ADD VALUE IF NOT EXISTS 'paypal'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TYPE mode_confirmation ADD VALUE IF NOT EXISTS \'paypal\'' }, 'Échec de migration — poursuite du démarrage'); }
// Prestataires de paiement, T16, 26 nov. 2026 : les modes de
// confirmation MTN, Orange et CinetPay, et les colonnes qui
// lient une demande à son paiement chez le prestataire.
try {
  await q(`ALTER TYPE mode_confirmation ADD VALUE IF NOT EXISTS 'mtn'`);
  await q(`ALTER TYPE mode_confirmation ADD VALUE IF NOT EXISTS 'orange'`);
  await q(`ALTER TYPE mode_confirmation ADD VALUE IF NOT EXISTS 'cinetpay'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TYPE mode_confirmation ADD VALUE mtn, orange, cinetpay' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS prestataire text`);
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS prestataire_reference text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN prestataire, prestataire_reference' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS 'carte'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS \'carte\'' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS 'cotisation'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS \'cotisation\'' }, 'Échec de migration — poursuite du démarrage'); }
// Paiement du camp en 6 fois, 31 oct. 2026 : le type camp rejoint
// les types de paiement, sans toucher à schema.sql.
try {
  await q(`ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS 'camp'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS \'camp\'' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS photo_donnees text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE membres ADD COLUMN IF NOT EXISTS photo_donnees text' }, 'Échec de migration — poursuite du démarrage'); }
// Pays de résidence du membre, carte 127, 10 nov. 2026 : colonne
// créée au démarrage, sans toucher à schema.sql.
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS pays_residence text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE membres ADD COLUMN IF NOT EXISTS pays_residence' }, 'Échec de migration — poursuite du démarrage'); }
// Ville du membre, T11, 26 nov. 2026 : colonne créée au démarrage,
// sans toucher à schema.sql, le nom et la ville sont désormais
// persistés côté serveur.
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS ville text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE membres ADD COLUMN IF NOT EXISTS ville' }, 'Échec de migration — poursuite du démarrage'); }
// Catégorie des livres, T11, 26 nov. 2026 : colonne créée au
// démarrage, sans toucher à schema.sql, les livres existants
// passent en « À classer ».
try {
  await q(`ALTER TABLE livres ADD COLUMN IF NOT EXISTS categorie text NOT NULL DEFAULT 'À classer'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE livres ADD COLUMN IF NOT EXISTS categorie' }, 'Échec de migration — poursuite du démarrage'); }
// Catégorie des audios, T13, 26 nov. 2026 : colonne créée au
// démarrage, sans toucher à schema.sql, les enseignements
// existants passent en « Enseignement », première catégorie de
// la liste fermée. Parole vivante regroupe ses audios par
// catégorie : Enseignement, Podcast, Musique.
try {
  await q(`ALTER TABLE enseignements ADD COLUMN IF NOT EXISTS categorie text NOT NULL DEFAULT 'Enseignement'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE enseignements ADD COLUMN IF NOT EXISTS categorie' }, 'Échec de migration — poursuite du démarrage'); }
// Sélections audio de Parole vivante, T13, 26 nov. 2026 : table
// créée au démarrage, sans toucher à schema.sql. Une sélection
// est une liste d'audios choisis par la structure, dans l'ordre
// de audio_ids, jamais une copie des audios eux-mêmes.
try {
  await q(`CREATE TABLE IF NOT EXISTS selections_audio (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    description text,
    audio_ids uuid[] NOT NULL DEFAULT '{}',
    ordre integer NOT NULL DEFAULT 0,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS selections_audio (' }, 'Échec de migration — poursuite du démarrage'); }
// Messages vocaux, 18 nov. 2026 : le type 'audio' rejoint les
// types de message, sans toucher à schema.sql. La contrainte est
// retirée puis recréée avec 'audio', la table garde les autres
// types, et la migration se rejoue sans effet au démarrage
// suivant.
try {
  await q(`ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_type_check`);
  await q(`ALTER TABLE messages ADD CONSTRAINT messages_type_check CHECK (type IN ('text', 'image', 'file', 'system', 'audio'))`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE messages type audio' }, 'Échec de migration — poursuite du démarrage'); }
// Appel manqué, 19 nov. 2026 : le type 'appel_manque' rejoint les
// types de message, même patron que 'audio' : la contrainte est
// retirée puis recréée avec le nouveau type, sans toucher à
// schema.sql, rejouable sans effet au démarrage suivant.
try {
  await q(`ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_type_check`);
  await q(`ALTER TABLE messages ADD CONSTRAINT messages_type_check CHECK (type IN ('text', 'image', 'file', 'system', 'audio', 'appel_manque'))`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE messages type appel_manque' }, 'Échec de migration — poursuite du démarrage'); }
// Prochain culte, tranche 1, 19 nov. 2026 : le type 'culte'
// rejoint l'énumération des événements, sans toucher à
// schema.sql. ADD VALUE ne peut pas tourner dans une
// transaction, chaque migration ici est une requête seule,
// et IF NOT EXISTS rend la migration rejouable sans effet.
try {
  await q(`ALTER TYPE type_evenement ADD VALUE IF NOT EXISTS 'culte'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TYPE type_evenement ADD VALUE culte' }, 'Échec de migration — poursuite du démarrage'); }
// Confirmation de présence au culte, tranche 1, 19 nov. 2026 :
// la méthode 'confirmation' rejoint 'scan' et 'manuel' dans
// la table presences, même patron que les types de message.
try {
  await q(`ALTER TABLE presences DROP CONSTRAINT IF EXISTS presences_methode_check`);
  await q(`ALTER TABLE presences ADD CONSTRAINT presences_methode_check CHECK (methode IN ('scan', 'manuel', 'confirmation'))`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE presences methode confirmation' }, 'Échec de migration — poursuite du démarrage'); }
// La durée d'un message vocal, en secondes, sur sa pièce jointe.
try {
  await q(`ALTER TABLE message_attachments ADD COLUMN IF NOT EXISTS duree_secondes integer`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE message_attachments duree_secondes' }, 'Échec de migration — poursuite du démarrage'); }
// Carte 129, 11 nov. 2026 : le bureau national est un
// établissement comme les autres, pour les responsables qui
// travaillent à la structure. Le nom est unique, l'insertion
// ne fait rien s'il existe déjà, sans toucher à schema.sql.
try {
  await q(`INSERT INTO etablissements (nom) VALUES ('Bureau national') ON CONFLICT (nom) DO NOTHING`);
} catch (e) { app.log.warn({ err: e, migration: 'INSERT Bureau national' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS fonction text NOT NULL DEFAULT ''`);
try {
  await q(`ALTER TABLE enseignements ADD COLUMN IF NOT EXISTS lien_audio text`);
  await q(`ALTER TABLE enseignements ADD COLUMN IF NOT EXISTS thematique text`);
  await q(`ALTER TABLE enseignements ADD COLUMN IF NOT EXISTS format text`);
  await q(`ALTER TABLE enseignements ADD COLUMN IF NOT EXISTS duree text`);
  await q(`ALTER TABLE enseignements ADD COLUMN IF NOT EXISTS date_texte text`);
try {
  await q(`ALTER TABLE fichiers ADD COLUMN IF NOT EXISTS donnees bytea`);
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS refuse_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS refuse_par uuid REFERENCES utilisateurs(id)' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS refuse_le timestamptz`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS refuse_le timestamptz' }, 'Échec de migration — poursuite du démarrage'); }
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS refuse_le timestamptz' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE evenements ADD COLUMN IF NOT EXISTS description text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE evenements ADD COLUMN IF NOT EXISTS description text' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE evenements ADD COLUMN IF NOT EXISTS dates_texte text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE evenements ADD COLUMN IF NOT EXISTS dates_texte text' }, 'Échec de migration — poursuite du démarrage'); }
// Réunions en ligne, 1er nov. 2026 : type 'reunion', nom de salle
// Jitsi et heure de début.
try {
  await q(`ALTER TYPE type_evenement ADD VALUE 'reunion'`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TYPE type_evenement ADD VALUE \'reunion\'' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE evenements ADD COLUMN IF NOT EXISTS salle_visio text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE evenements ADD COLUMN IF NOT EXISTS salle_visio text' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE evenements ADD COLUMN IF NOT EXISTS heure_debut time`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE evenements ADD COLUMN IF NOT EXISTS heure_debut time' }, 'Échec de migration — poursuite du démarrage'); }
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE evenements ADD COLUMN IF NOT EXISTS heure_debut time' }, 'Échec de migration — poursuite du démarrage'); }
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE evenements ADD COLUMN IF NOT EXISTS heure_debut time' }, 'Échec de migration — poursuite du démarrage'); }

try { await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS derniere_activite timestamptz`); } catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE membres ADD COLUMN IF NOT EXISTS derniere_activite' }, 'Échec de migration — poursuite du démarrage'); }

// Jetons de rafraîchissement, 21 nov. 2026 : fenêtre de grâce de
// 60 secondes après rotation (revoque_le, paire_rejouable), pour
// qu'une réponse de renouvellement perdue ne tue pas la session.
// Les jetons d'avant la migration gardent ces colonnes à null,
// donc sans grâce, et tournent normalement au prochain appel.
try { await q(`ALTER TABLE jetons_rafraichissement ADD COLUMN IF NOT EXISTS revoque_le timestamptz`); } catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE jetons_rafraichissement ADD COLUMN IF NOT EXISTS revoque_le timestamptz' }, 'Échec de migration — poursuite du démarrage'); }
try { await q(`ALTER TABLE jetons_rafraichissement ADD COLUMN IF NOT EXISTS paire_rejouable text`); } catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE jetons_rafraichissement ADD COLUMN IF NOT EXISTS paire_rejouable text' }, 'Échec de migration — poursuite du démarrage'); }

// Rapports de bug, 29 oct. 2026 : table créée une seule fois, si elle
// n'existe pas encore, sans toucher à schema.sql.
try {
  await q(`CREATE TABLE IF NOT EXISTS rapports_bug (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid REFERENCES membres(id) ON DELETE SET NULL,
    version_app text NOT NULL DEFAULT '',
    modele text NOT NULL DEFAULT '',
    systeme text NOT NULL DEFAULT '',
    ecran text NOT NULL DEFAULT '',
    message_erreur text NOT NULL DEFAULT '',
    description text NOT NULL DEFAULT '',
    statut text NOT NULL DEFAULT 'Nouveau',
    cree_le timestamptz NOT NULL DEFAULT now(),
    corrige_version text
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS rapports_bug (' }, 'Échec de migration — poursuite du démarrage'); }

// Anniversaires, 29 oct. 2026 : date de naissance facultative du
// membre, pour la carte d'anniversaire et la liste des anniversaires.
// La colonne ne contient qu'une date, jamais un âge calculé, et les
// routes admin ne renvoient que jour et mois, jamais l'année.
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS date_naissance date`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE membres ADD COLUMN IF NOT EXISTS date_naissance date' }, 'Échec de migration — poursuite du démarrage'); }

// Courriels d'anniversaire, tranche 5, 4 nov. 2026 : un seul envoi
// par membre et par année civile, tracé ici. La table ne contient
// ni courriel, ni date de naissance, ni contenu de message, seulement
// l'identifiant du membre, l'année et la date d'envoi. Jamais de
// modification de schema.sql.
try {
  await q(`CREATE TABLE IF NOT EXISTS envois_anniversaire (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    annee smallint NOT NULL,
    envoye_le timestamptz NOT NULL DEFAULT now(),
    UNIQUE (membre_id, annee)
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS envois_anniversaire' }, 'Échec de migration — poursuite du démarrage'); }

// Moyen de paiement, 29 oct. 2026, marquage espèces depuis le scan :
// la demande ne stockait pas le moyen choisi à la création, la
// validation l'enregistre donc, et le règlement en espèces d'une
// cotisation l'enregistre aussi. Jamais de modification de schema.sql.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS moyen text CHECK (moyen IN ('especes','wave','orange_money','paypal'))`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS moyen text CHECK (moyen IN (\'especes\',\'wave' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE cotisations ADD COLUMN IF NOT EXISTS moyen text CHECK (moyen IN ('especes','wave','orange_money','paypal'))`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE cotisations ADD COLUMN IF NOT EXISTS moyen text CHECK (moyen IN (\'especes\',\'wa' }, 'Échec de migration — poursuite du démarrage'); }

// Paiement du camp en 6 fois, 31 oct. 2026 : un versement est une
// demande de paiement ordinaire, liée à son camp et numérotée de 1
// à 6. Une inscription créée avant ce déploiement garde
// versements_requis à faux, donc son pass reste visible comme
// avant ; seules les inscriptions créées après, pour un camp au
// tarif supérieur à 0, exigent les 6 versements. Jamais de
// modification de schema.sql.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS evenement_id uuid REFERENCES evenements(id) ON DELETE SET NULL`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS evenement_id uuid REFERENCES evenements(id)' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS numero_versement smallint CHECK (numero_versement BETWEEN 1 AND 6)`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS numero_versement smallint CHECK (numero_ver' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE inscriptions ADD COLUMN IF NOT EXISTS versements_requis boolean NOT NULL DEFAULT false`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE inscriptions ADD COLUMN IF NOT EXISTS versements_requis boolean NOT NULL DEFAU' }, 'Échec de migration — poursuite du démarrage'); }
// Préparation du prélèvement automatique, 31 oct. 2026, sans
// activation : chaque versement porte son mois cible, pour que
// le passage à l'automatique plus tard ne demande pas de refonte
// des enregistrements. Aucun débit automatique n'est implémenté,
// les versements restent manuels de bout en bout.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS mois_cible date`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS mois_cible date' }, 'Échec de migration — poursuite du démarrage'); }

// Don de camp ou de retraite, 31 oct. 2026 : un don est une
// demande de paiement ordinaire de type camp, payée par celui qui
// offre (membre_id), rattachée à son bénéficiaire quand il est
// connu (beneficiaire_id), sinon gardée en attente sur le contact
// saisi (beneficiaire_contact, normalisé comme à l'inscription),
// pour s'attacher seule à la création du compte. Jamais de
// modification de schema.sql.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_id uuid REFERENCES membres(id) ON DELETE SET NULL`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_id uuid REFERENCES membres(id)' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_nom text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_nom text' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_contact text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_contact text' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS message_don text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD COLUMN IF NOT EXISTS message_don text' }, 'Échec de migration — poursuite du démarrage'); }

// Défi quiz hebdomadaire entre établissements, 31 oct. 2026 : une
// seule participation comptée par membre et par semaine, sans
// toucher à schema.sql.
try {
  await q(`CREATE TABLE IF NOT EXISTS quiz_defi (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    semaine date NOT NULL,
    score smallint NOT NULL,
    total smallint NOT NULL DEFAULT 5,
    joue_le timestamptz NOT NULL DEFAULT now(),
    UNIQUE (membre_id, semaine),
    CHECK (score >= 0 AND score <= total AND total >= 1)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_quiz_defi_semaine ON quiz_defi (semaine)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE INDEX IF NOT EXISTS ix_quiz_defi_semaine ON quiz_defi (semaine)' }, 'Échec de migration — poursuite du démarrage'); }


// Élections, carte 76, 7 nov. 2026 : une élection = titre, poste,
// dates de début et de fin, candidats membres, un vote par membre.
// Les résultats ne sont jamais renvoyés aux membres pendant le
// vote ; la structure les voit à tout moment côté administration.
// Tables créées une seule fois, sans toucher à schema.sql.
try {
  await q(`CREATE TABLE IF NOT EXISTS elections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    description text,
    poste text,
    date_debut timestamptz NOT NULL,
    date_fin timestamptz NOT NULL,
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    CHECK (date_fin > date_debut)
  )`);
  await q(`CREATE TABLE IF NOT EXISTS election_candidats (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    election_id uuid NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
    membre_id uuid REFERENCES membres(id) ON DELETE SET NULL,
    nom text NOT NULL,
    fonction text NOT NULL DEFAULT '',
    ordre smallint NOT NULL DEFAULT 0,
    cree_le timestamptz NOT NULL DEFAULT now(),
    UNIQUE (election_id, membre_id)
  )`);
  await q(`CREATE TABLE IF NOT EXISTS election_votes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    election_id uuid NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    candidat_id uuid NOT NULL REFERENCES election_candidats(id) ON DELETE CASCADE,
    vote_le timestamptz NOT NULL DEFAULT now(),
    UNIQUE (election_id, membre_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_elections_dates ON elections (date_debut, date_fin)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_election_candidats_election ON election_candidats (election_id)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_election_votes_election ON election_votes (election_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS elections' }, 'Échec de migration — poursuite du démarrage'); }

// Plateforme, carte 83, 7 nov. 2026 : abonnements et enseignements
// en attente de validation. Tables créées une seule fois, sans
// toucher à schema.sql. Un enseignement déjà publié reste en
// ligne même après la fin de l'abonnement : aucune suppression
// automatique, la table enseignements garde sa ligne publiée.
try {
  await q(`ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS 'plateforme'`);
} catch (e) { app.log.warn({ err: e, migration: `ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS 'plateforme'` }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`CREATE TABLE IF NOT EXISTS plateforme_abonnements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    paiement_id uuid REFERENCES paiements(id) ON DELETE SET NULL,
    statut text NOT NULL DEFAULT 'En attente',
    date_debut timestamptz,
    date_fin timestamptz,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE TABLE IF NOT EXISTS plateforme_enseignements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auteur_id uuid REFERENCES membres(id) ON DELETE SET NULL,
    titre text NOT NULL,
    orateur text NOT NULL DEFAULT '',
    description text,
    format text NOT NULL DEFAULT 'Audio',
    lien_audio text,
    texte text,
    statut text NOT NULL DEFAULT 'En attente de validation',
    motif_refus text,
    vues integer NOT NULL DEFAULT 0,
    cree_le timestamptz NOT NULL DEFAULT now(),
    publie_le timestamptz
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_plateforme_abonnements_membre ON plateforme_abonnements (membre_id)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_plateforme_enseignements_auteur ON plateforme_enseignements (auteur_id)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_plateforme_enseignements_statut ON plateforme_enseignements (statut)`);
  await q(`ALTER TABLE enseignements ADD COLUMN IF NOT EXISTS texte text`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS plateforme_abonnements' }, 'Échec de migration — poursuite du démarrage'); }

// Présences et journal d'audit, 29 oct. 2026, phase 1 : tables créées une
// seule fois, si elles n'existent pas encore, sans toucher à schema.sql.
// activite_id est volontairement sans clé étrangère : il désigne soit un
// camp (evenements.id), soit une activité d'établissement
// (activites_etablissement.id). La contrainte unique empêche deux présences
// pour le même membre sur la même activité, même après annulation : une
// présence annulée se réactive, elle n'est jamais effacée ni dupliquée.
try {
  await q(`CREATE TABLE IF NOT EXISTS presences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    activite_id uuid NOT NULL,
    scanne_le timestamptz NOT NULL DEFAULT now(),
    scanne_par uuid REFERENCES membres(id) ON DELETE SET NULL,
    methode text NOT NULL CHECK (methode IN ('scan', 'manuel', 'confirmation')),
    statut text NOT NULL DEFAULT 'present' CHECK (statut IN ('present', 'annule')),
    UNIQUE (membre_id, activite_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_presences_activite ON presences (activite_id)`);
  // Espace parent, 8 nov. 2026 : lien parent-enfant, validé par un
  // responsable (jamais actif sans validation), et clôture d'activité
  // (une seule fois, pour ne pas notifier deux fois les parents).
  await q(`CREATE TABLE IF NOT EXISTS liens_parent_enfant (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    enfant_membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    statut text NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'valide', 'rejete')),
    cree_le timestamptz NOT NULL DEFAULT now(),
    valide_par uuid REFERENCES membres(id) ON DELETE SET NULL,
    valide_le timestamptz,
    UNIQUE (parent_membre_id, enfant_membre_id),
    CHECK (parent_membre_id <> enfant_membre_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_liens_parent_enfant ON liens_parent_enfant (enfant_membre_id, statut)`);
  await q(`CREATE TABLE IF NOT EXISTS clotures_activite (
    activite_id uuid PRIMARY KEY,
    cloture_le timestamptz NOT NULL DEFAULT now(),
    cloture_par uuid REFERENCES membres(id) ON DELETE SET NULL
  )`);
  await q(`CREATE TABLE IF NOT EXISTS audit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    acteur_id uuid REFERENCES membres(id) ON DELETE SET NULL,
    action text NOT NULL,
    entite text NOT NULL,
    entite_id text,
    details jsonb,
    horodatage timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_audit_date ON audit (horodatage DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE INDEX IF NOT EXISTS ix_audit_date ON audit (horodatage DESC)' }, 'Échec de migration — poursuite du démarrage'); }

// Cloche de notifications internes, 29 oct. 2026 : une ligne par
// membre et par événement, lue à l'ouverture de l'application.
// Aucune notification poussée, aucun e-mail, aucun SMS. Les types
// sont extensibles : un nouveau type s'ajoute dans les appels à
// notifierMembre ou notifierTous, sans refonte.
try {
  await q(`CREATE TABLE IF NOT EXISTS notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    type text NOT NULL,
    titre text NOT NULL DEFAULT '',
    message text NOT NULL DEFAULT '',
    lien_type text,
    lien_id uuid,
    lue boolean NOT NULL DEFAULT false,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_notifications_membre ON notifications (membre_id, cree_le DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE INDEX IF NOT EXISTS ix_notifications_membre ON notifications (membre_id, cree_le DE' }, 'Échec de migration — poursuite du démarrage'); }

// Stories de 24 heures, 17 nov. 2026 : une ligne par story,
// média sur R2 (clé seule en base, jamais les octets), durée
// de vie 24 heures. La suppression après 24 heures efface la
// ligne et l'objet R2, sans conservation de traçabilité : ni
// contenu ni trace, donc aucun journal d'audit pour les stories.
// auteur_id et etablissement_id sans clé étrangère dure vers
// membres et etablissements : une story survit à la suppression
// d'un établissement, elle expire de toute façon en 24 heures.
try {
  await q(`CREATE TABLE IF NOT EXISTS stories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auteur_id uuid,
    etablissement_id uuid,
    type text NOT NULL CHECK (type IN ('photo', 'video')),
    cle_r2 text NOT NULL,
    type_mime text NOT NULL,
    taille_octets integer NOT NULL CHECK (taille_octets > 0),
    cree_le timestamptz NOT NULL DEFAULT now(),
    expire_le timestamptz NOT NULL
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_stories_actives ON stories (expire_le DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS stories' }, 'Échec de migration — poursuite du démarrage'); }

// Témoignages vidéo, 17 nov. 2026 : publication par le membre,
// modération par le Bureau, seuls les témoignages approuvés sont
// visibles dans le fil. auteur_id et etablissement_id sans clé
// étrangère dure vers membres et etablissements, comme les stories.
try {
  await q(`CREATE TABLE IF NOT EXISTS temoignages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auteur_id uuid,
    etablissement_id uuid,
    cle_r2 text NOT NULL,
    type_mime text NOT NULL,
    taille_octets integer NOT NULL CHECK (taille_octets > 0),
    statut text NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'approuve', 'refuse')),
    cree_le timestamptz NOT NULL DEFAULT now(),
    modere_le timestamptz,
    modere_par uuid
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_temoignages_fil ON temoignages (statut, cree_le DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS temoignages' }, 'Échec de migration — poursuite du démarrage'); }

// Témoignages, compositeur unique, 21 nov. 2026 : texte seul
// accepté, photo et audio en plus de la vidéo. La colonne texte
// est ajoutée, la clé R2 devient facultative et la taille peut
// être zéro pour un texte seul.
try {
  await q(`ALTER TABLE temoignages ADD COLUMN IF NOT EXISTS texte text NOT NULL DEFAULT ''`);
  await q(`ALTER TABLE temoignages ALTER COLUMN cle_r2 DROP NOT NULL`);
  await q(`ALTER TABLE temoignages DROP CONSTRAINT IF EXISTS temoignages_taille_octets_check`);
  await q(`ALTER TABLE temoignages ADD CONSTRAINT temoignages_taille_octets_check CHECK (taille_octets >= 0)`);
} catch (e) { app.log.warn({ err: e, migration: 'temoignages texte' }, 'Échec de migration — poursuite du démarrage'); }

// Mur des membres, carte 174, refonte totale tranche 2,
// carte 176, 24 nov. 2026 : une publication par ligne, texte
// léger et photo en base comme la photo de profil, jamais de
// média R2. Les J'aime et les commentaires vivent dans les
// tables génériques, cible 'mur', effacés avec la publication.
try {
  await q(`CREATE TABLE IF NOT EXISTS mur_publications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auteur_id uuid,
    etablissement_id uuid,
    texte text NOT NULL DEFAULT '',
    photo_donnees text,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_mur_publications_fil ON mur_publications (cree_le DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS mur_publications' }, 'Échec de migration — poursuite du démarrage'); }

// Chaîne de prière en direct, 21 nov. 2026, tranche 1 : un
// créneau par heure du jour courant, un membre par créneau,
// un créneau par membre et par jour. Le jour est CURRENT_DATE
// côté serveur, même convention que les rapports et les
// cotisations. Deux unicités en base, pour que deux demandes
// en même temps ne prennent jamais le même créneau : une par
// (jour, heure), une par (jour, membre).
try {
  await q(`CREATE TABLE IF NOT EXISTS chaine_priere (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    jour date NOT NULL DEFAULT CURRENT_DATE,
    heure integer NOT NULL CHECK (heure >= 0 AND heure <= 23),
    cree_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_chaine_priere_jour_heure UNIQUE (jour, heure),
    CONSTRAINT uq_chaine_priere_jour_membre UNIQUE (jour, membre_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_chaine_priere_jour ON chaine_priere (jour, heure)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS chaine_priere' }, 'Échec de migration — poursuite du démarrage'); }

// Programme du camp et cellules, 21 nov. 2026 : le
// chronogramme est lié à l'événement, jour par jour, une
// entrée par jour et heure de début. Les cellules se répètent
// chaque semaine au même jour et à la même heure, une seule
// assignation par membre et par cellule, un seul dirigeant
// par cellule, une exception par cellule et par semaine.
try {
  await q(`CREATE TABLE IF NOT EXISTS chronogramme_camp (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    evenement_id uuid NOT NULL REFERENCES evenements(id) ON DELETE CASCADE,
    jour date NOT NULL,
    heure_debut time NOT NULL,
    heure_fin time NOT NULL,
    titre text NOT NULL,
    lieu text,
    type text,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT ck_chronogramme_heures CHECK (heure_fin > heure_debut),
    CONSTRAINT uq_chronogramme_jour_heure UNIQUE (evenement_id, jour, heure_debut)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_chronogramme_camp_evenement ON chronogramme_camp (evenement_id, jour, heure_debut)`);
  await q(`CREATE TABLE IF NOT EXISTS cellules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    etablissement_id uuid NOT NULL REFERENCES etablissements(id) ON DELETE CASCADE,
    nom text NOT NULL,
    jour_semaine integer NOT NULL CHECK (jour_semaine >= 0 AND jour_semaine <= 6),
    heure time NOT NULL,
    lieu text,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_cellules_etablissement_nom UNIQUE (etablissement_id, nom)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_cellules_etablissement ON cellules (etablissement_id, jour_semaine, heure)`);
  await q(`CREATE TABLE IF NOT EXISTS cellule_assignations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    cellule_id uuid NOT NULL REFERENCES cellules(id) ON DELETE CASCADE,
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    role text NOT NULL CHECK (role IN ('Dirigeant', 'Louange', 'Prédication', 'Accueil', 'Intercession')),
    cree_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_cellule_assignations_cellule_membre UNIQUE (cellule_id, membre_id)
  )`);
  await q(`CREATE UNIQUE INDEX IF NOT EXISTS ix_cellule_assignations_dirigeant ON cellule_assignations (cellule_id) WHERE role = 'Dirigeant'`);
  await q(`CREATE INDEX IF NOT EXISTS ix_cellule_assignations_membre ON cellule_assignations (membre_id)`);
  await q(`CREATE TABLE IF NOT EXISTS cellule_exceptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    cellule_id uuid NOT NULL REFERENCES cellules(id) ON DELETE CASCADE,
    semaine date NOT NULL,
    annulee boolean NOT NULL DEFAULT false,
    heure time,
    lieu text,
    note text,
    cree_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_cellule_exceptions_cellule_semaine UNIQUE (cellule_id, semaine)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_cellule_exceptions_semaine ON cellule_exceptions (cellule_id, semaine)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS chronogramme_camp' }, 'Échec de migration — poursuite du démarrage'); }

// Défis de prière 7 jours, 21 nov. 2026, tranches 1 à 3 de
// l'audit du 17 nov. : un défi dure 7 jours à partir de sa
// date de début, un membre participe une seule fois par défi,
// ses jours cochés sont un tableau d'entiers 1 à 7, jamais
// une ligne par jour. L'unicité en base protège deux
// inscriptions en même temps.
try {
  await q(`CREATE TABLE IF NOT EXISTS defis_priere (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    description text NOT NULL DEFAULT '',
    date_debut date NOT NULL,
    createur_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE TABLE IF NOT EXISTS defis_participants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    defi_id uuid NOT NULL REFERENCES defis_priere(id) ON DELETE CASCADE,
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    inscrit_le timestamptz NOT NULL DEFAULT now(),
    jours_valides integer[] NOT NULL DEFAULT '{}',
    CONSTRAINT uq_defis_participants_defi_membre UNIQUE (defi_id, membre_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_defis_priere_date ON defis_priere (date_debut)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_defis_participants_defi ON defis_participants (defi_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS defis_priere' }, 'Échec de migration — poursuite du démarrage'); }

// Carnet de Promesses, 21 nov. 2026, tranches 1 à 3 de
// l'audit du 17 nov. : carnet personnel du membre, une
// référence de verset, une note personnelle, un texte saisi
// par lui quand la Bible embarquée ne donne pas le verset.
// Le texte du verset n'est jamais stocké ici.
try {
  await q(`CREATE TABLE IF NOT EXISTS promesses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    reference text NOT NULL,
    note text NOT NULL DEFAULT '',
    texte text NOT NULL DEFAULT '',
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_promesses_membre ON promesses (membre_id, cree_le DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS promesses' }, 'Échec de migration — poursuite du démarrage'); }

// Demandes de prière avec suivi, 21 nov. 2026, tranches 1 à
// 3 de l'audit du 17 nov. : statut ouvert, en cours ou
// exaucée, note de suivi ajoutée par le Bureau. Les sujets de
// prière par e-mail, route /prieres, ne changent pas.
try {
  await q(`CREATE TABLE IF NOT EXISTS demandes_priere (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    texte text NOT NULL,
    statut text NOT NULL DEFAULT 'ouvert' CHECK (statut IN ('ouvert', 'en cours', 'exaucée')),
    note_suivi text NOT NULL DEFAULT '',
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_demandes_priere_membre ON demandes_priere (membre_id, cree_le DESC)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_demandes_priere_statut ON demandes_priere (statut, cree_le DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS demandes_priere' }, 'Échec de migration — poursuite du démarrage'); }

// Parrainage jusqu'au baptême, 21 nov. 2026, tranches 4 et 5
// de l'audit du 17 nov. : un filleul n'a qu'un seul
// parrainage en cours, l'unicité partielle protège deux
// désignations en même temps ; le baptême clôt le parrainage,
// sans jamais l'effacer.
try {
  await q(`CREATE TABLE IF NOT EXISTS parrainages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parrain_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    filleul_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    date_debut date NOT NULL DEFAULT CURRENT_DATE,
    statut text NOT NULL DEFAULT 'en cours' CHECK (statut IN ('en cours', 'baptisé')),
    date_bapteme date,
    cree_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT ck_parrainages_distincts CHECK (parrain_id <> filleul_id)
  )`);
  await q(`CREATE UNIQUE INDEX IF NOT EXISTS uq_parrainages_filleul_en_cours ON parrainages (filleul_id) WHERE statut = 'en cours'`);
  await q(`CREATE INDEX IF NOT EXISTS ix_parrainages_parrain ON parrainages (parrain_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS parrainages' }, 'Échec de migration — poursuite du démarrage'); }

// Culte en direct et replay chapitré, 21 nov. 2026, tranches
// 4 et 5 de l'audit du 17 nov. : la structure fournit les
// liens, aucun fournisseur n'est imposé. Un culte sans
// chapitre n'en montre aucun. À ne pas confondre avec les
// cultes présentiels, événements de type 'culte'.
try {
  await q(`CREATE TABLE IF NOT EXISTS cultes_direct (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    date date NOT NULL,
    url_direct text NOT NULL DEFAULT '',
    url_replay text NOT NULL DEFAULT '',
    statut text NOT NULL DEFAULT 'à venir' CHECK (statut IN ('à venir', 'en direct', 'terminé')),
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE TABLE IF NOT EXISTS cultes_direct_chapitres (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    culte_id uuid NOT NULL REFERENCES cultes_direct(id) ON DELETE CASCADE,
    titre text NOT NULL,
    debut_secondes integer NOT NULL CHECK (debut_secondes >= 0),
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_cultes_direct_date ON cultes_direct (date DESC)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_cultes_direct_chapitres_culte ON cultes_direct_chapitres (culte_id, debut_secondes)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS cultes_direct' }, 'Échec de migration — poursuite du démarrage'); }

// Réactions « Amen » sur méditations et enseignements, 21 nov.
// 2026, tranche 6 de l'audit du 17 nov. : un Amen par membre
// et par cible, l'unicité en base protège deux envois en même
// temps. La cible est une référence de méditation ou
// l'identifiant serveur d'un enseignement, jamais un texte.
try {
  await q(`CREATE TABLE IF NOT EXISTS amens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    cible_type text NOT NULL CHECK (cible_type IN ('méditation', 'enseignement')),
    cible_id text NOT NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_amens_membre_cible UNIQUE (membre_id, cible_type, cible_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_amens_cible ON amens (cible_type, cible_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS amens' }, 'Échec de migration — poursuite du démarrage'); }

// Entraide entre membres, offres et demandes, 21 nov. 2026,
// tranche 7 de l'audit du 17 nov. : l'auteur seul marque sa
// publication résolue, sans jamais l'effacer. Le contact avec
// l'auteur passe par la messagerie, jamais par un contact
// stocké ici.
try {
  await q(`CREATE TABLE IF NOT EXISTS entraide (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    type text NOT NULL CHECK (type IN ('offre', 'demande')),
    categorie text NOT NULL,
    titre text NOT NULL,
    description text NOT NULL DEFAULT '',
    statut text NOT NULL DEFAULT 'ouverte' CHECK (statut IN ('ouverte', 'en cours', 'résolue')),
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_entraide_type ON entraide (type, cree_le DESC)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_entraide_membre ON entraide (membre_id, cree_le DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS entraide' }, 'Échec de migration — poursuite du démarrage'); }

// Temps forts du camp, J'aime et commentaires, 21 nov. 2026,
// tranches 2 et 3 de la présence au culte : un temps fort est
// publié par la structure sur la page d'un camp ; un J'aime est
// unique par membre et par cible, temps fort ou témoignage, les
// enseignements et les méditations gardent leurs Amens ; un
// commentaire est un texte court, visible par tous, supprimé par
// son auteur ou par la structure.
try {
  await q(`CREATE TABLE IF NOT EXISTS temps_forts_camp (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    evenement_id uuid NOT NULL REFERENCES evenements(id) ON DELETE CASCADE,
    titre text NOT NULL,
    texte text NOT NULL DEFAULT '',
    image_id uuid REFERENCES fichiers(id) ON DELETE SET NULL,
    publie_le timestamptz NOT NULL DEFAULT now(),
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_temps_forts_camp_evenement ON temps_forts_camp (evenement_id, publie_le DESC)`);
  await q(`CREATE TABLE IF NOT EXISTS aimes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    cible_type text NOT NULL CHECK (cible_type IN ('temps_fort', 'temoignage')),
    cible_id uuid NOT NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_aimes_membre_cible UNIQUE (membre_id, cible_type, cible_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_aimes_cible ON aimes (cible_type, cible_id)`);
  await q(`CREATE TABLE IF NOT EXISTS commentaires (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    cible_type text NOT NULL CHECK (cible_type IN ('temps_fort', 'temoignage')),
    cible_id uuid NOT NULL,
    texte text NOT NULL,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_commentaires_cible ON commentaires (cible_type, cible_id, cree_le ASC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS presence_culte' }, 'Échec de migration — poursuite du démarrage'); }

// Jetons de notification poussée Android, 2 nov. 2026 : un jeton
// par appareil, jamais renvoyé en lecture, jamais journalisé.
// Le jeton lui-même n'est jamais une donnée sensible de membre,
// il ne permet que d'envoyer une notification à cet appareil, et
// il est désactivé à la déconnexion ou au premier envoi invalide.
// Aucune prière, aucun montant, aucun mot de passe dans cette
// table, seulement le jeton et les catégories activées.
try {
  await q(`CREATE TABLE IF NOT EXISTS notification_tokens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id uuid NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    membre_id uuid REFERENCES membres(id) ON DELETE CASCADE,
    jeton text NOT NULL,
    plateforme text NOT NULL DEFAULT 'android' CHECK (plateforme IN ('android')),
    categories jsonb NOT NULL DEFAULT '[]'::jsonb,
    actif boolean NOT NULL DEFAULT true,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE UNIQUE INDEX IF NOT EXISTS ix_notification_tokens_utilisateur_jeton ON notification_tokens (utilisateur_id, jeton)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_notification_tokens_membre_actif ON notification_tokens (membre_id, actif)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS notification_tokens' }, 'Échec de migration — poursuite du démarrage'); }

// Réinitialisation assistée du mot de passe, 29 oct. 2026 : une seule
// colonne, sans toucher à schema.sql. Non nulle, le mot de passe
// stocké est un temporaire, valable jusqu'à cette date, et la
// connexion impose un changement. Nulle, le mot de passe est normal.
try {
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS mot_de_passe_temporaire_expire_le timestamptz`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS mot_de_passe_temporaire_expire_le timest' }, 'Échec de migration — poursuite du démarrage'); }

// Annonces audio, 29 oct. 2026 : cartes façon Wave sur l'accueil,
// publiées par l'administrateur général seulement, pour signaler
// une mise à jour ou expliquer un fonctionnement. Table séparée
// des enseignements, jamais réutilisée pour eux, et sans toucher
// à schema.sql. Le retrait met actif à faux, sans effacer la ligne.
try {
  await q(`CREATE TABLE IF NOT EXISTS annonces_audio (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    texte text,
    audio_id uuid REFERENCES fichiers(id) ON DELETE SET NULL,
    lien_audio text,
    actif boolean NOT NULL DEFAULT true,
    publiee_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS annonces_audio (' }, 'Échec de migration — poursuite du démarrage'); }

// Programmation des annonces façon Facebook, 30 oct. 2026 : date
// et heure de publication choisies par l'administrateur. Nulle =
// publication immédiate, comme avant. Le drapeau notif_envoyee
// sert à ne sonner la cloche qu'une fois, à la publication.
await q(`ALTER TABLE annonces_audio ADD COLUMN IF NOT EXISTS programmee_le timestamptz`);

// Cartes vidéo, 30 oct. 2026 : titre, explication courte et
// lien vidéo lu dans l'application, téléphone seulement.
// Aucune vidéo n'est stockée en base, seul le lien l'est.
// Le retrait met actif à faux, sans effacer la ligne.
try {
  await q(`CREATE TABLE IF NOT EXISTS cartes_video (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    explication text,
    lien_video text NOT NULL,
    actif boolean NOT NULL DEFAULT true,
    publiee_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS cartes_video (' }, 'Échec de migration — poursuite du démarrage'); }

// Correction de suivi, 27 nov. 2026 : formulaire d'inscription
// au camp KAIROS 2027 (5 sections du formulaire d'Axel) et
// numéro de badge par camp. Les champs vivent sur l'inscription,
// un formulaire par camp : l'âge, le niveau et la structure
// sont ceux du moment du camp, pas du profil. Le médical reste
// confidentiel : il ne sort que par la liste administrateur,
// jamais par la lecture membre ni par le badge. Le numéro de
// badge est attribué à l'inscription, dans l'ordre
// d'inscription, un par camp.
await q(`ALTER TABLE inscriptions
  ADD COLUMN IF NOT EXISTS age smallint,
  ADD COLUMN IF NOT EXISTS sexe text,
  ADD COLUMN IF NOT EXISTS telephone text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS residence text,
  ADD COLUMN IF NOT EXISTS niveau_etude text,
  ADD COLUMN IF NOT EXISTS profession text,
  ADD COLUMN IF NOT EXISTS structure_appartenance text,
  ADD COLUMN IF NOT EXISTS antecedents_medicaux text,
  ADD COLUMN IF NOT EXISTS precisions_medicales text,
  ADD COLUMN IF NOT EXISTS allergies text,
  ADD COLUMN IF NOT EXISTS besoins_medicaux text,
  ADD COLUMN IF NOT EXISTS contact_urgence_nom text,
  ADD COLUMN IF NOT EXISTS contact_urgence_lien text,
  ADD COLUMN IF NOT EXISTS contact_urgence_telephone text,
  ADD COLUMN IF NOT EXISTS observations text,
  ADD COLUMN IF NOT EXISTS badge_numero int`);
await q(`UPDATE inscriptions i SET badge_numero = s.rn FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY evenement_id ORDER BY inscrit_le NULLS LAST, id) AS rn FROM inscriptions
) s WHERE s.id = i.id AND i.badge_numero IS NULL`);
await q(`CREATE UNIQUE INDEX IF NOT EXISTS inscriptions_evenement_badge_numero ON inscriptions (evenement_id, badge_numero)`);

// Correction de suivi, 27 nov. 2026 : une annonce audio ou une
// carte vidéo se publie pour toute la structure ou pour un seul
// établissement, comme les actualités et les documents. La carte
// vidéo se programme comme l'annonce audio.
await q(`ALTER TABLE annonces_audio ADD COLUMN IF NOT EXISTS etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL`);
await q(`ALTER TABLE cartes_video ADD COLUMN IF NOT EXISTS etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL`);
await q(`ALTER TABLE cartes_video ADD COLUMN IF NOT EXISTS programmee_le timestamptz`);

// Documents institutionnels, 1er nov. 2026, version 1 : voir schema.sql.
// La table est créée si elle manque, sans toucher aux autres tables.
try {
  await q(`CREATE TABLE IF NOT EXISTS documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    lien text,
    fichier_id uuid REFERENCES fichiers(id) ON DELETE SET NULL,
    etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    publie_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS documents' }, 'Échec de migration — poursuite du démarrage'); }

// Rapport journalier d'activité, 2 nov. 2026, tranche 1 : un seul
// formulaire pour le secrétariat et la trésorerie, avec offrande,
// dépenses et section incident. Aucune suppression possible : il
// n'existe pas de route DELETE pour cette table, comme pour les
// paiements. activite_id ne porte pas de clé étrangère, car il peut
// désigner un événement (camp, réunion) ou une activité
// d'établissement, deux tables différentes.
try {
  await q(`CREATE TABLE IF NOT EXISTS rapports_activite (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    date_rapport date NOT NULL DEFAULT CURRENT_DATE,
    lieu text,
    activite_id uuid,
    activite_nom text,
    activite_type text NOT NULL DEFAULT 'libre' CHECK (activite_type IN ('evenement', 'activite_etablissement', 'libre')),
    orateur text,
    theme text,
    nombre_participants integer CHECK (nombre_participants >= 0),
    presents jsonb NOT NULL DEFAULT '[]'::jsonb,
    offrande_montant integer NOT NULL DEFAULT 0 CHECK (offrande_montant >= 0),
    offrande_moyen text CHECK (offrande_moyen IN ('especes', 'wave', 'orange')),
    offrande_compte_par text,
    depenses jsonb NOT NULL DEFAULT '[]'::jsonb,
    observations text,
    incident_type text,
    incident_description text,
    incident_personnes text,
    incident_action text,
    incident_suivi text,
    statut text NOT NULL DEFAULT 'brouillon' CHECK (statut IN ('brouillon', 'valide')),
    etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now(),
    valide_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    valide_le timestamptz
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_rapports_activite_etab_mois ON rapports_activite (etablissement_id, date_rapport DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS rapports_activite (' }, 'Échec de migration — poursuite du démarrage'); }

// Département scolaire, 2 nov. 2026, tranche 2 : une ligne par
// membre et par année scolaire, jamais un doublon pour le même
// trimestre, la mise à jour passant par la contrainte unique.
try {
  await q(`CREATE TABLE IF NOT EXISTS suivis_scolaires (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
    classe text NOT NULL,
    classe_libre text,
    annee_scolaire text NOT NULL,
    moyenne_t1 numeric(4,2) CHECK (moyenne_t1 >= 0 AND moyenne_t1 <= 20),
    moyenne_t2 numeric(4,2) CHECK (moyenne_t2 >= 0 AND moyenne_t2 <= 20),
    moyenne_t3 numeric(4,2) CHECK (moyenne_t3 >= 0 AND moyenne_t3 <= 20),
    examen boolean NOT NULL DEFAULT false,
    type_examen text CHECK (type_examen IN ('bepc', 'bac', 'autre')),
    resultat_examen text CHECK (resultat_examen IN ('admis', 'ajourne')),
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    modifie_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now(),
    UNIQUE (membre_id, annee_scolaire)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_suivis_etab_annee ON suivis_scolaires (etablissement_id, annee_scolaire)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS suivis_scolaires' }, 'Échec de migration — poursuite du démarrage'); }

// Attestations, 2 nov. 2026, tranche 3 : une ligne par délivrance,
// jamais de suppression, une erreur se corrige par une nouvelle
// délivrance. La référence est unique et lisible, ATT-AAAA-NNNN.
try {
  await q(`CREATE TABLE IF NOT EXISTS attestations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
    type text NOT NULL CHECK (type IN ('benevolat', 'participation')),
    activite text NOT NULL,
    date_debut date,
    date_fin date,
    role_service text,
    reference text NOT NULL UNIQUE,
    delivre_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    delivre_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_attestations_etab ON attestations (etablissement_id, delivre_le DESC)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_attestations_membre ON attestations (membre_id, delivre_le DESC)`);
  // Carte 106, 9 nov. 2026 : annulation non destructive, décidée
  // par Axel. Une attestation est annulée quand annulee_le n'est
  // pas nul ; elle reste consultable, marquée annulée, jamais
  // supprimée. annulee_par garde qui a annulé, sans jamais
  // bloquer la lecture si l'utilisateur disparaît.
  await q(`ALTER TABLE attestations ADD COLUMN IF NOT EXISTS annulee_le timestamptz`);
  await q(`ALTER TABLE attestations ADD COLUMN IF NOT EXISTS annulee_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL`);
  // Carte 120, 9 nov. 2026 : signature signée dans
  // l'application (data URL PNG, ou signature enregistrée de
  // l'administrateur par Ma signature, carte 96), affichée dans
  // le PDF à la place de la signature du délivreur quand elle
  // est renseignée. Sans elle, le PDF reprend la signature du
  // délivreur, puis la ligne vide. Aucune donnée effacée ici.
  await q(`ALTER TABLE attestations ADD COLUMN IF NOT EXISTS signature_attestation text`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS attestations' }, 'Échec de migration — poursuite du démarrage'); }



// Planning des responsables, 2 nov. 2026, tranche 4 : une ligne par
// activité confiée à un responsable, un jour, des horaires en
// option. Aucune suppression en première version, l'avertissement
// de conflit est calculé côté serveur, jamais un blocage.
try {
  await q(`CREATE TABLE IF NOT EXISTS plannings_responsables (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
    activite text NOT NULL,
    evenement_id uuid REFERENCES evenements(id) ON DELETE SET NULL,
    date date NOT NULL,
    heure_debut time,
    heure_fin time,
    role_service text,
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_plannings_membre_date ON plannings_responsables (membre_id, date)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_plannings_etab_date ON plannings_responsables (etablissement_id, date)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS plannings_responsables' }, 'Échec de migration — poursuite du démarrage'); }

// Suivi des nouveaux membres, 2 nov. 2026, tranche 5 des 7 propositions
// validees : un contact note par membre, jamais une suppression en
// premiere version. Une erreur se corrige en notant un nouveau
// contact, l'ancien reste dans l'historique. Le statut est calcule
// cote serveur a la lecture, jamais stocke : Contacte si un contact
// est note, Rappel 30 jours puis Rappel 7 jours si aucun contact et
// 30 ou 7 jours ecoules depuis l'inscription, sinon En suivi. Aucun
// e-mail ni SMS automatique n'est cree dans cette tranche, la liste
// affiche seulement les rappels visibles.
try {
  await q(`CREATE TABLE IF NOT EXISTS contacts_membres (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    date_contact date NOT NULL,
    canal text NOT NULL CHECK (canal IN ('appel', 'visite', 'message', 'autre')),
    note text,
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_contacts_membre_date ON contacts_membres (membre_id, date_contact DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS contacts_membres' }, 'Échec de migration — poursuite du démarrage'); }

// Liste d'attente de camp, tranche 6 des 7 propositions validées,
// 2 nov. 2026 : capacité fixée par camp, file d'attente dans
// l'ordre d'arrivée, jamais en modifiant schema.sql. La position
// n'est pas stockée, elle est calculée à la lecture parmi les
// demandes encore en attente, pour que la file avance seule.
try {
  await q(`ALTER TABLE evenements ADD COLUMN IF NOT EXISTS nombre_places integer`);
  await q(`CREATE TABLE IF NOT EXISTS liste_attente_camps (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    evenement_id uuid NOT NULL REFERENCES evenements(id) ON DELETE CASCADE,
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    statut text NOT NULL CHECK (statut IN ('en_attente', 'place_proposee')),
    cree_le timestamptz NOT NULL DEFAULT now(),
    UNIQUE (evenement_id, membre_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_liste_attente_camp ON liste_attente_camps (evenement_id, cree_le ASC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS liste_attente_camps' }, 'Échec de migration — poursuite du démarrage'); }

// Inventaire du matériel, 2 nov. 2026, tranche 7 : une fiche par
// matériel, sans valeur financière, sans suppression en v1.
try {
  await q(`CREATE TABLE IF NOT EXISTS materiels (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nom text NOT NULL,
    categorie text,
    quantite integer CHECK (quantite IS NULL OR quantite >= 0),
    etat text NOT NULL CHECK (etat IN ('bon', 'a_reparer', 'hors_service')),
    lieu text,
    etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
    cree_par uuid,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_materiels_etab ON materiels (etablissement_id)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_materiels_etat ON materiels (etat)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS materiels' }, 'Échec de migration — poursuite du démarrage'); }

await q(`ALTER TABLE actualites ADD COLUMN IF NOT EXISTS programmee_le timestamptz`);
await q(`ALTER TABLE actualites ADD COLUMN IF NOT EXISTS notif_envoyee boolean NOT NULL DEFAULT false`);

// Nouveau format officiel de matricule, 31 oct. 2026 : CP-AA-NNNN,
// suite a partir de 2526, sans toucher a schema.sql.
// - Sequence dediee, atomique (nextval), jamais reutilisee.
// - Reattribution des anciens matricules (CP + 6 chiffres) en une
//   seule transaction verrouillee : d'abord le compte
//   administrateur general le plus ancien (2526), puis tous les
//   autres par ordre de creation, en sequence. Les matricules deja
//   au nouveau format ne sont jamais touches : la migration est
//   idempotente et relancable sans effet.
// - Les paiements passent en SET NULL : supprimer un membre ne
//   supprime jamais un paiement, il s'affiche « compte supprime ».
try {
  await q(`CREATE SEQUENCE IF NOT EXISTS seq_matricule_nouveau START WITH 2526`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE SEQUENCE IF NOT EXISTS seq_matricule_nouveau START WITH 2526' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await tx(async (c) => {
    await c.query('LOCK TABLE membres IN EXCLUSIVE MODE');
    const anciens = (await c.query(
      `SELECT m.id, m.nom_complet, u.role FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.matricule ~ '^CP-[0-9]{6}$' ORDER BY m.inscrit_le ASC, m.id ASC`,
    )).rows;
    const idxAdmin = anciens.findIndex((r) => r.role === 'admin_general');
    const ordonnes = idxAdmin >= 0 ? [anciens[idxAdmin], ...anciens.filter((_, i) => i !== idxAdmin)] : anciens;
    let numero = 2526;
    for (const r of ordonnes) {
      const matricule = `CP-${initialesMatricule(r.nom_complet)}-${String(numero).padStart(4, '0')}`;
      await c.query('UPDATE membres SET matricule = $1 WHERE id = $2', [matricule, r.id]);
      numero += 1;
    }
    if (ordonnes.length > 0) {
      const seq = (await c.query('SELECT last_value, is_called FROM seq_matricule_nouveau')).rows[0];
      const prochain = seq.is_called ? Number(seq.last_value) + 1 : Number(seq.last_value);
      if (numero - 1 >= prochain) await c.query('SELECT setval($1, $2, true)', ['seq_matricule_nouveau', numero - 1]);
    }
  });
} catch (e) { app.log.warn({ err: e, migration: 'CREATE SEQUENCE IF NOT EXISTS seq_matricule_nouveau START WITH 2526' }, 'Échec de migration — poursuite du démarrage'); }
try {
  const fk = (await q(
    `SELECT c.conname, c.confdeltype FROM pg_constraint c JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
     WHERE c.conrelid = 'paiements'::regclass AND c.confrelid = 'membres'::regclass AND c.contype = 'f' AND a.attname = 'membre_id'`,
  )).rows[0];
  if (fk && fk.confdeltype !== 'n') {
    await q(`ALTER TABLE paiements ALTER COLUMN membre_id DROP NOT NULL`);
    await q(`ALTER TABLE paiements DROP CONSTRAINT "${fk.conname}"`);
    await q(`ALTER TABLE paiements ADD CONSTRAINT paiements_membre_id_fkey FOREIGN KEY (membre_id) REFERENCES membres(id) ON DELETE SET NULL`);
  }
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE paiements ADD CONSTRAINT paiements_membre_id_fkey FOREIGN KEY (membre_id) REFE' }, 'Échec de migration — poursuite du démarrage'); }


// Fiches santé de camp, 31 oct. 2026 : une seule fiche par membre
// et par camp, contenu chiffré au repos. La fiche disparaît avec
// le compte (CASCADE) et avec le camp (CASCADE).
try {
  await q(`CREATE TABLE IF NOT EXISTS fiches_sante (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    evenement_id uuid NOT NULL REFERENCES evenements(id) ON DELETE CASCADE,
    donnees_chiffrees text NOT NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now(),
    UNIQUE (membre_id, evenement_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS fiches_sante_evenement_idx ON fiches_sante(evenement_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE INDEX IF NOT EXISTS fiches_sante_evenement_idx ON fiches_sante(evenement_id)' }, 'Échec de migration — poursuite du démarrage'); }

// Fiches de présence sur place, 31 oct. 2026 : pour les personnes
// sans compte membre, remplies par la structure sur place. Même
// chiffrement et même suppression automatique que les fiches
// membres, mais rattachées au camp seulement, sans membre, sans
// inscription, sans pass ni badge. La fiche disparaît avec le
// camp (CASCADE). Aucune contrainte d'unicité sur le nom, car
// plusieurs personnes peuvent porter le même nom.
try {
  await q(`CREATE TABLE IF NOT EXISTS fiches_presence (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    evenement_id uuid NOT NULL REFERENCES evenements(id) ON DELETE CASCADE,
    nom_complet text NOT NULL,
    contact text NOT NULL DEFAULT '',
    donnees_chiffrees text NOT NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS fiches_presence_evenement_idx ON fiches_presence(evenement_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE INDEX IF NOT EXISTS fiches_presence_evenement_idx ON fiches_presence(evenement_id)' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await purgerFichesExpirees();
} catch (e) { app.log.warn({ err: e, migration: 'CREATE INDEX IF NOT EXISTS fiches_presence_evenement_idx ON fiches_presence(evenement_id)' }, 'Échec de migration — poursuite du démarrage'); }

// Favoris et surlignages Bible synchronisés au compte, 31 oct. 2026,
// lot 1 chantier 5 sur 6 : le serveur conserve l'ensemble du membre,
// références de versets seulement, jamais le texte du verset. Une
// marque de suppression datée (supprime_le) propage les retraits,
// sans quoi un appareil effacé referait réapparaître l'élément.
// Les données disparaissent avec le compte (CASCADE). Aucune route
// administrateur, ces données sont personnelles au membre.
try {
  await q(`CREATE TABLE IF NOT EXISTS bible_favoris (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    livre smallint NOT NULL,
    chapitre smallint NOT NULL,
    verset smallint NOT NULL,
    langue text NOT NULL,
    modifie_le timestamptz NOT NULL DEFAULT now(),
    supprime_le timestamptz,
    UNIQUE (membre_id, livre, chapitre, verset, langue)
  )`);
  await q(`CREATE TABLE IF NOT EXISTS bible_surlignages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    livre smallint NOT NULL,
    chapitre smallint NOT NULL,
    verset smallint NOT NULL,
    langue text NOT NULL,
    modifie_le timestamptz NOT NULL DEFAULT now(),
    supprime_le timestamptz,
    UNIQUE (membre_id, livre, chapitre, verset, langue)
  )`);
  await q(`CREATE TABLE IF NOT EXISTS membre_preferences (
    membre_id uuid PRIMARY KEY REFERENCES membres(id) ON DELETE CASCADE,
    taille_texte smallint NOT NULL DEFAULT 1,
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS membre_preferences (' }, 'Échec de migration — poursuite du démarrage'); }


// Jauge d'objectif de don, 31 oct. 2026, lot 1 chantier 6 sur 6 : la
// structure définit un objectif unique et actif à la fois, libellé
// libre et cible en FCFA. La création d'un nouvel objectif désactive
// les précédents, et le comptage repart de la création (cree_le),
// sans jamais récupérer les dons d'avant. Modifier la cible ne touche
// pas à cree_le, donc ne remet pas le compteur à zéro. La
// désactivation retire la jauge, sans effacer l'objectif ni les
// paiements, qui ne sont jamais supprimés.
try {
  await q(`CREATE TABLE IF NOT EXISTS objectifs_don (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    libelle text NOT NULL,
    cible_fcfa integer NOT NULL CHECK (cible_fcfa > 0),
    actif boolean NOT NULL DEFAULT true,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS objectifs_don (' }, 'Échec de migration — poursuite du démarrage'); }

// 1er nov. 2026 : purge des jetons de rafraîchissement expirés —
// aucun DELETE n'existait dans tout le code, la table ne faisait
// que croître. Une fois au démarrage, puis toutes les 24 heures.
// Les jetons révoqués ou expirés depuis plus de 7 jours partent,
// le reste (sessions actives) n'est jamais touché.
// 21 nov. 2026 : la paire rejouable ne sert que 60 secondes, on
// la vide 2 minutes après révocation, pour ne pas garder de jeton
// chiffré en base plus longtemps que nécessaire.
async function purgerJetonsExpires() {
  try {
    const r = await q(`DELETE FROM jetons_rafraichissement WHERE expire_le < now() - interval '7 days'`);
    if (r.rowCount > 0) app.log.info({ supprimes: r.rowCount }, 'Purge des jetons de rafraîchissement expirés');
    await q(`UPDATE jetons_rafraichissement SET paire_rejouable = NULL WHERE paire_rejouable IS NOT NULL AND revoque_le IS NOT NULL AND revoque_le < now() - interval '2 minutes'`);
  } catch (e) {
    app.log.warn({ err: e }, 'Échec de la purge des jetons expirés');
  }
}
await purgerJetonsExpires();
setInterval(purgerJetonsExpires, 24 * 60 * 60 * 1000).unref();

// Stories de 24 heures, 17 nov. 2026 : purge des stories
// expirées, contenu et ligne, sans trace. Une fois au
// démarrage, puis toutes les heures, et à chaque lecture de
// la liste. L'objet R2 est supprimé avant la ligne, dans
// la limite du possible : un objet déjà absent ne bloque
// jamais la suppression de la ligne, sinon la trace resterait.
// Sans clés R2, les lignes partent quand même, les objets
// orphelins sont alors repris à la prochaine purge avec clés.
async function purgerStoriesExpirees() {
  try {
    const expirees = (await q(`SELECT id, cle_r2 FROM stories WHERE expire_le <= now()`)).rows;
    if (!expirees.length) return;
    const config = configR2();
    for (const ligne of expirees) {
      if (config) await supprimerObjetR2(config, ligne.cle_r2);
      await q(`DELETE FROM stories WHERE id = $1`, [ligne.id]);
    }
    app.log.info({ supprimes: expirees.length }, 'Purge des stories expirées');
  } catch (e) {
    app.log.warn({ err: e }, 'Échec de la purge des stories expirées');
  }
}
await purgerStoriesExpirees();
setInterval(purgerStoriesExpirees, 60 * 60 * 1000).unref();

// Actualités programmées, carte 160, 23 nov. 2026 : la
// notification ne passe plus par la lecture des membres (GET
// /actualites), mais par cette tâche de fond, une fois au
// démarrage puis toutes les heures, même modèle que la purge
// des stories. Une actualité programmée ne sonne la cloche
// qu'à sa publication, une seule fois, grâce au drapeau. La
// prise du drapeau est atomique : deux exécutions en même temps
// ne notifient qu'une fois. Une actualité supprimée avant sa
// publication ne sonne jamais, comme avant.
async function notifierActualitesProgrammeesDues() {
  try {
    const dues = (await q(`SELECT id, titre FROM actualites WHERE programmee_le IS NOT NULL AND programmee_le <= now() AND NOT notif_envoyee`)).rows;
    for (const d of dues) {
      const prise = (await q(`UPDATE actualites SET notif_envoyee = true WHERE id = $1 AND NOT notif_envoyee RETURNING id`, [d.id])).rows[0];
      if (prise) await notifierTous('nouvelle_actualite', 'Nouvelle actualité', `Bonjour {prenom}, ${d.titre}`, 'actualite', d.id, undefined, d.titre);
    }
  } catch (e) {
    app.log.error(e);
  }
}
await notifierActualitesProgrammeesDues();
setInterval(notifierActualitesProgrammeesDues, 60 * 60 * 1000).unref();

// Messages éphémères, 21 nov. 2026, carte 3 : purge des messages
// dont expire_le est passé, contenu et pièces R2, sans trace.
// Une fois au démarrage, puis toutes les heures, même modèle
// que les stories : l'objet R2 est supprimé avant la ligne, un
// objet déjà absent ne bloque jamais la suppression de la ligne.
// Les signalements ne sont jamais touchés : leur preuve figée
// vit dans reports.evidence_snapshot, pas dans messages.
async function purgerMessagesEphemeresExpires() {
  try {
    const lignes = (await q(SQL_MESSAGES_EPHEMERES_EXPIRES)).rows;
    if (!lignes.length) return;
    const plan = planifierPurgeMessagesEphemeres(lignes);
    const config = configR2();
    for (const cle of plan.clesR2) {
      if (!config) break;
      try {
        await supprimerObjetR2(config, cle);
      } catch (e) {
        app.log.warn({ err: e, cle_r2: cle }, 'Pièce R2 du message éphémère non effacée');
      }
    }
    if (plan.ids.length > 0) {
      await q(`DELETE FROM messages WHERE id = ANY($1::uuid[])`, [plan.ids]);
    }
    app.log.info({ supprimes: plan.ids.length }, 'Purge des messages éphémères expirés');
  } catch (e) {
    app.log.warn({ err: e }, 'Échec de la purge des messages éphémères expirés');
  }
}
await purgerMessagesEphemeresExpires();
setInterval(purgerMessagesEphemeresExpires, 60 * 60 * 1000).unref();

// 8 nov. 2026 : effacement definitif apres 30 jours, carte 92,
// meme modele que la purge des jetons ci-dessus, jamais un
// workflow ni un secret de plus : une fois au demarrage, puis
// toutes les 24 heures. La purge ne touche qu'aux comptes
// desactives dont supprime_le est passe, jamais un compte
// recupere, jamais un administrateur general, jamais un
// paiement ni le journal d'audit, voir
// src/effacement_compte.js. Un echec est journalise, jamais
// propage, pour ne pas empecher le demarrage du serveur.
async function purgerComptesEchusDemandes() {
  try {
    const r = await tx(async (c) => purgerComptesEchus(c, new Date()));
    if (r.effaces.length > 0 || r.ignoresAdminGeneral.length > 0) {
      app.log.info({ effaces: r.effaces, ignores_admin_general: r.ignoresAdminGeneral }, 'Effacement definitif apres 30 jours');
    }
  } catch (e) {
    app.log.warn({ err: e }, 'Échec de l effacement definitif apres 30 jours');
  }
}
await purgerComptesEchusDemandes();
setInterval(purgerComptesEchusDemandes, 24 * 60 * 60 * 1000).unref();

// Codes de réinitialisation de mot de passe par e-mail, 2 nov. 2026 :
// le code n'est jamais stocké en clair, seulement son empreinte
// argon2id, avec expiration, compteur de tentatives et drapeau
// d'usage unique. Aucune route DELETE pour cette table : un code
// périmé ou usé reste marqué, jamais effacé par une route.
try {
  await q(`CREATE TABLE IF NOT EXISTS codes_reinitialisation (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id uuid NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    email text NOT NULL,
    code_hash text NOT NULL,
    expire_le timestamptz NOT NULL,
    tentatives integer NOT NULL DEFAULT 0 CHECK (tentatives >= 0),
    utilise boolean NOT NULL DEFAULT false,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_codes_reinit_utilisateur ON codes_reinitialisation (utilisateur_id, cree_le DESC)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS codes_reinitialisation' }, 'Échec de migration — poursuite du démarrage'); }

// Bureau, 3 nov. 2026 : établissement d'un responsable, pour que
// l'import ISPAM s'affiche sous ISPAM et non sous Communauté.
// Colonne nullable, les anciennes entrées sans établissement
// restent affichées sous Structure côté application.
try {
  await q(`ALTER TABLE bureau_membres ADD COLUMN IF NOT EXISTS etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE bureau_membres ADD COLUMN IF NOT EXISTS etablissement_id' }, 'Échec de migration — poursuite du démarrage'); }

// Tranche carte, 4 nov. 2026 : annee d'adhesion modifiable, champ
// separe sur membres, jamais inscrit_le. Jamais de modification
// de schema.sql, migration de demarrage seulement.
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS annee_adhesion smallint CHECK (annee_adhesion BETWEEN 1900 AND 2100)`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE membres ADD COLUMN IF NOT EXISTS annee_adhesion' }, 'Échec de migration — poursuite du démarrage'); }
// Correctif 4 nov. 2026, ponctuel : seul le compte CP-AA-2526
// (ANIBE ADJA MAURICE AXEL) retrouve son numero avec le 0 apres
// +225, +2250749369433, quelle que soit la forme stockee avant.
// Aucun autre membre n'est touche par cette migration.
try { await q(`UPDATE utilisateurs u SET telephone = '+2250749369433' FROM membres m WHERE m.utilisateur_id = u.id AND m.matricule = 'CP-AA-2526' AND u.telephone IN ('+225749369433', '+2250749369433')`); } catch (e) { app.log.warn({ err: e, migration: 'CP-AA-2526 telephone +2250749369433' }, 'Échec de migration — poursuite du démarrage'); }

// Carte 101, 8 nov. 2026 : les numéros ivoiriens enregistrés avant
// le correctif du 4 nov. 2026 passaient par normalizePhoneServer à
// l'insertion et ont perdu leur 0 après +225. La migration remet le
// 0 : +225 suivi de 9 chiffres commençant par 07, 05 ou 01 sans le
// 0, forme de 13 caractères au total, devient +2250 suivi des mêmes
// 9 chiffres. Sans toucher aux autres pays, sans toucher aux numéros
// qui ont déjà le 0, et seulement si le numéro avec le 0 n'existe
// pas déjà pour un autre compte : en cas de doublon, le numéro est
// laissé tel quel et un avertissement est journalisé. Aucun compte
// n'est supprimé, aucun doublon n'est créé. La migration tourne à
// chaque démarrage mais ne trouve plus rien une fois appliquée.
try {
  const restaures = await q(`
    UPDATE utilisateurs u SET telephone = '+2250' || substr(u.telephone, 5)
    WHERE length(u.telephone) = 13
      AND substr(u.telephone, 1, 4) = '+225'
      AND substr(u.telephone, 5, 1) IN ('7', '5', '1')
      AND translate(substr(u.telephone, 5), '0123456789', '') = ''
      AND NOT EXISTS (
        SELECT 1 FROM utilisateurs u2
        WHERE u2.telephone = '+2250' || substr(u.telephone, 5) AND u2.id <> u.id
      )
    RETURNING id, telephone
  `);
  if (restaures.rowCount > 0) app.log.info({ migration: 'carte-101 zero ivoirien', restaures: restaures.rowCount }, 'Numéros ivoiriens remis avec le 0 après +225');
  const enConflit = await q(`
    SELECT count(*)::int AS n FROM utilisateurs u
    WHERE length(u.telephone) = 13
      AND substr(u.telephone, 1, 4) = '+225'
      AND substr(u.telephone, 5, 1) IN ('7', '5', '1')
      AND translate(substr(u.telephone, 5), '0123456789', '') = ''
      AND EXISTS (
        SELECT 1 FROM utilisateurs u2
        WHERE u2.telephone = '+2250' || substr(u.telephone, 5) AND u2.id <> u.id
      )
  `);
  if (enConflit.rows[0]?.n > 0) app.log.warn({ migration: 'carte-101 zero ivoirien', enConflit: enConflit.rows[0].n }, 'Numéros ivoiriens sans 0 laissés tels quels : le numéro avec le 0 existe déjà pour un autre compte');
} catch (e) { app.log.warn({ err: e, migration: 'carte-101 zero ivoirien' }, 'Échec de migration — poursuite du démarrage'); }

// Migration de démarrage, fuseau par membre, 4 nov. 2026 : deux
// colonnes seulement, jamais de fuseau inventé pour les membres
// existants, qui restent à NULL puis à 0 en repli UTC jusqu'à leur
// prochaine connexion.
try { await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS fuseau text`); } catch (e) { app.log.warn({ err: e, migration: 'fuseau' }, 'Échec de migration — poursuite du démarrage'); }
try { await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS fuseau_decalage_min integer`); } catch (e) { app.log.warn({ err: e, migration: 'fuseau_decalage_min' }, 'Échec de migration — poursuite du démarrage'); }

// Fonctions clés d'administrateur, carte 75, 7 nov. 2026 : colonne
// sur utilisateurs, jamais schema.sql, et table catalogue avec
// les fonctions et leurs droits, avec leurs codes de permission.
// Les comptes existants
// restent à NULL, donc pleins, comme avant. Les lignes du
// catalogue ne sont insérées qu'une fois, jamais écrasées ensuite.
try {
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS fonction_admin text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS fonction_admin text' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE fonctions_admin ADD COLUMN IF NOT EXISTS permissions jsonb NOT NULL DEFAULT '[]'::jsonb`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE fonctions_admin ADD COLUMN IF NOT EXISTS permissions' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`CREATE TABLE IF NOT EXISTS fonctions_admin (
    code text PRIMARY KEY,
    libelle text NOT NULL,
    description text NOT NULL,
    droits jsonb NOT NULL DEFAULT '[]'::jsonb,
    permissions jsonb NOT NULL DEFAULT '[]'::jsonb,
    ordre integer NOT NULL DEFAULT 0,
    actif boolean NOT NULL DEFAULT true,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  for (const f of FONCTIONS_ADMIN) {
    await q(
      'INSERT INTO fonctions_admin (code, libelle, description, droits, permissions, ordre) VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6) ON CONFLICT (code) DO NOTHING',
      [f.code, f.libelle, f.description, JSON.stringify(f.droits), JSON.stringify(f.permissions), f.ordre],
    );
  }
  // Les fonctions d'avant la carte 126 n'avaient pas de codes de
  // permission : on les remplit une fois, sans écraser une
  // permission déjà ajustée, donc seulement quand la colonne est
  // encore vide.
  for (const f of FONCTIONS_ADMIN) {
    await q(
      "UPDATE fonctions_admin SET permissions = $2::jsonb WHERE code = $1 AND (permissions IS NULL OR permissions = '[]'::jsonb)",
      [f.code, JSON.stringify(f.permissions)],
    );
  }
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS fonctions_admin' }, 'Échec de migration — poursuite du démarrage'); }

// Carte 126 tranche 3, 10 nov. 2026 : le secrétariat et la
// direction enregistrent des membres. Le remplissage ci-dessus ne
// touche que les permissions vides, donc les lignes existantes ne
// recevraient pas le nouveau code : on l'ajoute une fois, sans
// doublon, sans écraser les permissions déjà ajustées.
try {
  await q(
    `UPDATE fonctions_admin SET permissions = permissions || '["membres.inscrire"]'::jsonb
     WHERE code IN ('secretariat', 'direction') AND NOT (permissions @> '["membres.inscrire"]'::jsonb)`,
  );
} catch (e) { app.log.warn({ err: e, migration: 'UPDATE fonctions_admin membres.inscrire' }, 'Échec de migration — poursuite du démarrage'); }

// Suppression douce de son propre compte, carte 92, 7 nov. 2026 :
// date d'effacement a +30 jours, sur utilisateurs, jamais
// schema.sql. Le compte desactive utilise actif = false, deja
// en base. Les comptes existants restent a NULL, donc sans
// demande en cours, comme avant.
try {
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS supprime_le timestamptz`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS supprime_le timestamptz' }, 'Échec de migration — poursuite du démarrage'); }

// Signature de l'administrateur, carte 96, 8 nov. 2026 : une
// signature par administrateur, en base, sur utilisateurs, avec
// sa date de mise à jour. Les comptes existants restent à NULL,
// donc sans signature, comme avant, ligne vide sur les documents.
try {
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS signature_admin text`);
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS signature_admin_le timestamptz`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS signature_admin' }, 'Échec de migration — poursuite du démarrage'); }

// Carte 109, 8 nov. 2026 : pays d'une activité (événement),
// affiché après le lieu, « Lieu, Pays ». Les événements
// existants restent à NULL, donc avec le lieu seul, comme avant,
// aucun pays deviné ni ajouté d'office.
try {
  await q(`ALTER TABLE evenements ADD COLUMN IF NOT EXISTS pays text`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE evenements ADD COLUMN IF NOT EXISTS pays' }, 'Échec de migration — poursuite du démarrage'); }

// Carte 126 tranche 1, 10 nov. 2026 : établissement d'une
// activité, pour que les établissements puissent planifier leurs
// activités. Null pour une activité de la grande structure, les
// activités existantes restent générales, comme avant.
try {
  await q(`ALTER TABLE evenements ADD COLUMN IF NOT EXISTS etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL`);
} catch (e) { app.log.warn({ err: e, migration: 'ALTER TABLE evenements ADD COLUMN IF NOT EXISTS etablissement_id' }, 'Échec de migration — poursuite du démarrage'); }

// Carte 126 tranche 2, 10 nov. 2026 : nominations par activité ou
// par structure, avec début, fin et révocation. Une personne peut
// cumuler plusieurs nominations. L'expiration et la révocation sont
// lues à chaque contrôle, donc effet immédiat, sans attendre le
// prochain jeton. Portée structure sans événement, portée activité
// avec événement, jamais l'inverse.
try {
  await q(`CREATE TABLE IF NOT EXISTS nominations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    portee text NOT NULL CHECK (portee IN ('structure', 'activite')),
    evenement_id uuid REFERENCES evenements(id) ON DELETE CASCADE,
    fonction_code text NOT NULL REFERENCES fonctions_admin(code),
    debute_le timestamptz NOT NULL DEFAULT now(),
    finit_le timestamptz,
    revoque boolean NOT NULL DEFAULT false,
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    CHECK ((portee = 'structure' AND evenement_id IS NULL) OR (portee = 'activite' AND evenement_id IS NOT NULL))
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_nominations_membre ON nominations (membre_id)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_nominations_evenement ON nominations (evenement_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS nominations' }, 'Échec de migration — poursuite du démarrage'); }

// Nominations et bureaux, 21 nov. 2026 : portée établissement.
// Une nomination peut porter sur un établissement, comme elle
// portait sur la structure ou sur une activité. La colonne est
// ajoutée, les deux contrôles de portée sont réécrits :
// structure sans événement ni établissement, établissement avec
// établissement et sans événement, activité avec événement et
// sans établissement. Les deux contrôles actuels n'ont pas de
// nom explicite, ils sont retrouvés dans pg_constraint par leur
// contenu pour être remplacés, c'est le point délicat :
// pg_get_constraintdef rend IN sous la forme « portee = ANY
// (ARRAY[...]) » et ajoute « ::text » après chaque littéral,
// les motifs portent donc sur la forme normalisée, pas sur le
// texte de schema.sql. Un contrôle déjà réécrit contient
// « etablissement », il est laissé tel quel, l'opération est
// idempotente. Les nominations existantes restent valides,
// etablissement_id nul, aucun remplissage deviné.
try {
  await q(`ALTER TABLE nominations ADD COLUMN IF NOT EXISTS etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL`);
  const porteeEnum = (await q(`SELECT conname FROM pg_constraint WHERE conrelid = 'nominations'::regclass AND contype = 'c' AND pg_get_constraintdef(oid) LIKE '%portee = ANY%' AND pg_get_constraintdef(oid) NOT LIKE '%etablissement%'`)).rows[0];
  if (porteeEnum) {
    await q(`ALTER TABLE nominations DROP CONSTRAINT "${porteeEnum.conname}"`);
    await q(`ALTER TABLE nominations ADD CHECK (portee IN ('structure', 'etablissement', 'activite'))`);
  }
  const porteeCoherence = (await q(`SELECT conname FROM pg_constraint WHERE conrelid = 'nominations'::regclass AND contype = 'c' AND pg_get_constraintdef(oid) LIKE '%portee = ''structure''%' AND pg_get_constraintdef(oid) NOT LIKE '%etablissement%'`)).rows[0];
  if (porteeCoherence) {
    await q(`ALTER TABLE nominations DROP CONSTRAINT "${porteeCoherence.conname}"`);
    await q(`ALTER TABLE nominations ADD CHECK ((portee = 'structure' AND evenement_id IS NULL AND etablissement_id IS NULL) OR (portee = 'etablissement' AND etablissement_id IS NOT NULL AND evenement_id IS NULL) OR (portee = 'activite' AND evenement_id IS NOT NULL AND etablissement_id IS NULL))`);
  }
  await q(`CREATE INDEX IF NOT EXISTS ix_nominations_etablissement ON nominations (etablissement_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'nominations portee etablissement' }, 'Échec de migration — poursuite du démarrage'); }


// Carte 110, 8 nov. 2026 : certificats d'adhésion. Statut
// d'adhésion sur membres, séquence des numéros, table certificats
// archivée avec PDF figé par déclencheur, un seul certificat actif
// par membre. Les membres déjà inscrits sont validés d'un coup,
// décision d'Axel ; les nouveaux démarrent en attente, par le
// défaut de la colonne. Colonne en texte avec contrôle, comme les
// autres colonnes de ce fichier, pas de type énuméré séparé.
// Aucune donnée existante n'est supprimée.
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS statut_adhesion text NOT NULL DEFAULT 'validee' CHECK (statut_adhesion IN ('en_attente', 'validee', 'suspendue'))`);
  await q(`ALTER TABLE membres ALTER COLUMN statut_adhesion SET DEFAULT 'en_attente'`);
  await q(`CREATE SEQUENCE IF NOT EXISTS seq_certificat START 1`);
  await q(`CREATE TABLE IF NOT EXISTS certificats (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    numero text NOT NULL UNIQUE,
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE RESTRICT,
    matricule text NOT NULL,
    nom_complet text NOT NULL,
    emis_le timestamptz NOT NULL DEFAULT now(),
    emis_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    pdf bytea NOT NULL,
    empreinte text NOT NULL,
    revoque_le timestamptz,
    motif_revocation text,
    envoye_le timestamptz,
    CONSTRAINT ck_revocation_motif CHECK ((revoque_le IS NULL) = (motif_revocation IS NULL))
  )`);
  await q(`CREATE UNIQUE INDEX IF NOT EXISTS ux_certificat_actif ON certificats (membre_id) WHERE revoque_le IS NULL`);
  await q(`CREATE OR REPLACE FUNCTION trg_certificat_fige() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'Un certificat ne peut pas être supprimé ; il se révoque.';
  END IF;
  IF OLD.numero IS DISTINCT FROM NEW.numero
     OR OLD.membre_id IS DISTINCT FROM NEW.membre_id
     OR OLD.matricule IS DISTINCT FROM NEW.matricule
     OR OLD.nom_complet IS DISTINCT FROM NEW.nom_complet
     OR OLD.emis_le IS DISTINCT FROM NEW.emis_le
     OR OLD.pdf IS DISTINCT FROM NEW.pdf
     OR OLD.empreinte IS DISTINCT FROM NEW.empreinte THEN
    RAISE EXCEPTION 'Un certificat émis est figé ; seule la révocation est permise.';
  END IF;
  IF OLD.revoque_le IS NOT NULL AND NEW.revoque_le IS DISTINCT FROM OLD.revoque_le THEN
    RAISE EXCEPTION 'Une révocation ne peut pas être annulée.';
  END IF;
  RETURN NEW;
END $$`);
  await q(`DROP TRIGGER IF EXISTS t_certificat_fige ON certificats`);
  await q(`CREATE TRIGGER t_certificat_fige BEFORE UPDATE OR DELETE ON certificats FOR EACH ROW EXECUTE FUNCTION trg_certificat_fige()`);
} catch (e) { app.log.warn({ err: e, migration: 'certificats adhesion carte 110' }, 'Échec de migration — poursuite du démarrage'); }

// Messagerie et Signalement, 16 nov. 2026 : port du module
// e-System Church (migration 034), sans church_id (une seule
// structure) et sans RLS, le contrôle d'accès est applicatif.
// Chaque table a son propre try/catch avec journal warn, comme
// notification_tokens ci-dessus : une base déjà en ligne reçoit
// les tables au redémarrage, une base neuve les reçoit par
// schema.sql. Idempotent : CREATE TABLE IF NOT EXISTS et
// CREATE INDEX IF NOT EXISTS, rejouable sans effet.
try {
  await q(`CREATE TABLE IF NOT EXISTS conversations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type text NOT NULL CHECK (type IN ('directe', 'groupe_etablissement', 'groupe_structure', 'pastorale')),
    title text,
    created_by uuid REFERENCES membres(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    is_archived boolean NOT NULL DEFAULT false,
    last_message_at timestamptz,
    replies_disabled boolean NOT NULL DEFAULT false
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_conversations_created ON conversations (created_at)`);
  await q(`CREATE TABLE IF NOT EXISTS conversation_participants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    member_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    role text,
    joined_at timestamptz NOT NULL DEFAULT now(),
    last_read_at timestamptz,
    muted_until timestamptz,
    is_active boolean NOT NULL DEFAULT true,
    UNIQUE (conversation_id, member_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_conversation_participants_conversation ON conversation_participants (conversation_id)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_conversation_participants_member ON conversation_participants (member_id)`);
  await q(`CREATE TABLE IF NOT EXISTS messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    content text NOT NULL,
    type text NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'image', 'file', 'system')),
    created_at timestamptz NOT NULL DEFAULT now(),
    edited_at timestamptz,
    deleted_at timestamptz,
    is_reported boolean NOT NULL DEFAULT false
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_messages_conversation_created ON messages (conversation_id, created_at)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_messages_sender_created ON messages (sender_id, created_at)`);
  await q(`CREATE TABLE IF NOT EXISTS message_attachments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id uuid NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    storage_key text NOT NULL,
    mime_type text,
    size_bytes bigint,
    sha256 text
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_message_attachments_message ON message_attachments (message_id)`);
} catch (e) { app.log.warn({ err: e, migration: 'messagerie conversations/messages' }, 'Échec de migration — poursuite du démarrage'); }

// Groupes automatiques de camp et de retraite + favoris, 18 nov.
// 2026 : la conversation d'un camp porte son événement, unique
// par événement, et chaque participation porte son favori.
// Idempotent, rejouable sans effet.
try {
  await q(`ALTER TABLE conversations ADD COLUMN IF NOT EXISTS evenement_id uuid REFERENCES evenements(id) ON DELETE SET NULL`);
  await q(`CREATE UNIQUE INDEX IF NOT EXISTS ix_conversations_evenement_unique ON conversations (evenement_id) WHERE evenement_id IS NOT NULL`);
  await q(`ALTER TABLE conversation_participants ADD COLUMN IF NOT EXISTS est_favori boolean NOT NULL DEFAULT false`);
} catch (e) { app.log.warn({ err: e, migration: 'messagerie groupes camp et favoris' }, 'Échec de migration — poursuite du démarrage'); }

// Messages éphémères, 21 nov. 2026, carte 3 : privé seulement,
// directe et pastorale, jamais les groupes. conversations.ephemere
// porte la durée en jours, null quand le mode est désactivé ;
// messages.expire_le porte la disparition du message, fixée à
// l'envoi. Idempotent, rejouable sans effet.
try {
  await q(`ALTER TABLE conversations ADD COLUMN IF NOT EXISTS ephemere integer CHECK (ephemere IS NULL OR (ephemere >= 1 AND ephemere <= 30))`);
  await q(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS expire_le timestamptz`);
  await q(`CREATE INDEX IF NOT EXISTS ix_messages_expire_le ON messages (expire_le) WHERE expire_le IS NOT NULL`);
} catch (e) { app.log.warn({ err: e, migration: 'messagerie ephemere' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`CREATE TABLE IF NOT EXISTS reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    target_type text NOT NULL CHECK (target_type IN ('message', 'conversation', 'user')),
    target_id uuid NOT NULL,
    reason text NOT NULL CHECK (reason IN ('harassment', 'hate_speech', 'threat', 'misinformation', 'spam', 'child_safety', 'other')),
    description text CHECK (char_length(description) <= 500),
    evidence_snapshot jsonb,
    evidence_hash text,
    routed_to text NOT NULL DEFAULT 'local' CHECK (routed_to IN ('local', 'national', 'child_safety_referent')),
    etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'resolved', 'dismissed', 'escalated', 'appealed')),
    created_at timestamptz NOT NULL DEFAULT now(),
    resolved_at timestamptz,
    resolution_notes text,
    retention_until timestamptz
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_reports_routed_status ON reports (routed_to, status)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_reports_etablissement ON reports (etablissement_id, status)`);
  await q(`CREATE TABLE IF NOT EXISTS moderation_actions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id uuid NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    moderator_id uuid NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    action text NOT NULL,
    notes text NOT NULL,
    duree_heures integer,
    created_at timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_moderation_actions_report ON moderation_actions (report_id)`);
  await q(`CREATE TABLE IF NOT EXISTS appeals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id uuid NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    moderation_action_id uuid REFERENCES moderation_actions(id) ON DELETE SET NULL,
    appellant_id uuid NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    reason text,
    reviewer_id uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'resolved', 'dismissed')),
    created_at timestamptz NOT NULL DEFAULT now(),
    resolved_at timestamptz,
    repondre_avant timestamptz
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_appeals_report ON appeals (report_id)`);
  await q(`CREATE TABLE IF NOT EXISTS blocks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    blocked_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (blocker_id, blocked_id)
  )`);
  await q(`CREATE TABLE IF NOT EXISTS minor_flags (
    member_id uuid PRIMARY KEY REFERENCES membres(id) ON DELETE CASCADE,
    is_minor boolean NOT NULL,
    guardian_ids uuid[] NOT NULL DEFAULT '{}',
    visibility text NOT NULL DEFAULT 'restricted' CHECK (visibility = 'restricted')
  )`);
} catch (e) { app.log.warn({ err: e, migration: 'messagerie reports/moderation/appeals/blocks/minor_flags' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS messagerie_suspendu_jusquau timestamptz`);
  await q(`ALTER TABLE moderation_actions ADD COLUMN IF NOT EXISTS duree_heures integer`);
  await q(`ALTER TABLE appeals ADD COLUMN IF NOT EXISTS repondre_avant timestamptz`);
} catch (e) { app.log.warn({ err: e, migration: 'messagerie colonnes suspension/duree/reponse' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`CREATE TABLE IF NOT EXISTS appels (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    appelant_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    type text NOT NULL CHECK (type IN ('audio', 'video')),
    statut text NOT NULL DEFAULT 'sonne' CHECK (statut IN ('sonne', 'en_cours', 'termine', 'expire')),
    cree_le timestamptz NOT NULL DEFAULT now(),
    repondu_le timestamptz,
    termine_le timestamptz
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_appels_conversation_cree ON appels (conversation_id, cree_le)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_appels_appelant_cree ON appels (appelant_id, cree_le)`);
  await q(`CREATE TABLE IF NOT EXISTS appels_signaux (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    appel_id uuid NOT NULL REFERENCES appels(id) ON DELETE CASCADE,
    emetteur_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    type text NOT NULL CHECK (type IN ('offre', 'reponse', 'candidat_ice', 'accepte', 'refuse', 'annule', 'termine')),
    contenu jsonb NOT NULL DEFAULT '{}'::jsonb,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_appels_signaux_appel_cree ON appels_signaux (appel_id, cree_le)`);
} catch (e) { app.log.warn({ err: e, migration: 'appels audio video' }, 'Échec de migration — poursuite du démarrage'); }

// Aide de la structure, 21 nov. 2026, carte 4 : une demande est
// une conversation de type 'aide', motif et statut sur la
// conversation. Trois blocs séparés, comme les autres
// migrations : si la contrainte de type porte un autre nom sur
// une base ancienne, les colonnes sont quand même ajoutées. La
// contrainte est recréée avec 'aide' en plus, jamais de
// modification de schema.sql, les bases neuves la reçoivent par
// la migration au premier démarrage, comme les colonnes.
try {
  await q(`ALTER TABLE conversations DROP CONSTRAINT IF EXISTS conversations_type_check`);
  await q(`ALTER TABLE conversations ADD CONSTRAINT conversations_type_check CHECK (type IN ('directe', 'groupe_etablissement', 'groupe_structure', 'pastorale', 'aide'))`);
} catch (e) { app.log.warn({ err: e, migration: 'aide conversations type' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE conversations ADD COLUMN IF NOT EXISTS aide_statut text CHECK (aide_statut IN ('ouvert', 'en_cours', 'resolu'))`);
  await q(`ALTER TABLE conversations ADD COLUMN IF NOT EXISTS aide_motif text CHECK (aide_motif IN ('probleme', 'abus'))`);
} catch (e) { app.log.warn({ err: e, migration: 'aide conversations colonnes statut et motif' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`CREATE INDEX IF NOT EXISTS ix_conversations_aide ON conversations (type, aide_statut) WHERE type = 'aide'`);
} catch (e) { app.log.warn({ err: e, migration: 'aide index conversations' }, 'Échec de migration — poursuite du démarrage'); }

// Sécurité, 22 nov. 2026 : vérification d'e-mail à l'inscription
// (MO-25 b), double authentification TOTP des administrateurs
// (MO-25 c), borne absolue de session de 90 jours (MO-1),
// compteur de demandes de code de réinitialisation en base
// (MO-25 a, B-22), liaison PayPal à la session (B-18). Les
// comptes existants sont vérifiés par défaut (email_verifie
// vrai), pour ne déconnecter personne. Les jetons d'avant la
// migration gardent famille_cree_le à null et leur propre
// création fait foi. Jamais de modification de schema.sql.
try {
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS email_verifie boolean NOT NULL DEFAULT true`);
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS double_authentification_active boolean NOT NULL DEFAULT false`);
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS secret_2fa_chiffre text`);
  await q(`ALTER TABLE jetons_rafraichissement ADD COLUMN IF NOT EXISTS famille_cree_le timestamptz`);
  await q(`UPDATE jetons_rafraichissement SET famille_cree_le = cree_le WHERE famille_cree_le IS NULL`);
  await q(`CREATE TABLE IF NOT EXISTS codes_verification_email (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id uuid NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    email text NOT NULL,
    code_hash text NOT NULL,
    expire_le timestamptz NOT NULL,
    utilise boolean NOT NULL DEFAULT false,
    tentatives integer NOT NULL DEFAULT 0,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_codes_verification_util ON codes_verification_email (utilisateur_id, cree_le DESC)`);
  // Codes de changement d'e-mail, T11, 26 nov. 2026 : même patron
  // que codes_verification_email, un code par demande, à usage
  // unique, 30 minutes, 5 tentatives au plus.
  await q(`CREATE TABLE IF NOT EXISTS codes_changement_email (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id uuid NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    email text NOT NULL,
    code_hash text NOT NULL,
    expire_le timestamptz NOT NULL,
    utilise boolean NOT NULL DEFAULT false,
    tentatives integer NOT NULL DEFAULT 0,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_codes_changement_email_util ON codes_changement_email (utilisateur_id, cree_le DESC)`);
  await q(`CREATE TABLE IF NOT EXISTS demandes_code_reinitialisation (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_demandes_code_email ON demandes_code_reinitialisation (email, cree_le DESC)`);
  await q(`ALTER TABLE paypal_commandes ADD COLUMN IF NOT EXISTS utilisateur_id uuid REFERENCES utilisateurs(id) ON DELETE SET NULL`);
  await q(`ALTER TABLE paypal_commandes ADD COLUMN IF NOT EXISTS retour_secret_hash char(64)`);
} catch (e) { app.log.warn({ err: e, migration: 'securite 22 nov. 2026' }, 'Échec de migration — poursuite du démarrage'); }

// Correctif préexistant, 22 nov. 2026 : les trois nouveaux motifs
// de signalement décidés par Axel le 16 nov. 2026 (erreur
// doctrinale, trafic d'influence, mauvaise gestion des finances)
// existent dans MOTIFS_SIGNALEMENT côté serveur mais pas dans la
// contrainte CHECK de schema.sql, donc le signalement échouait
// en 422. La contrainte est élargie ici, sans toucher schema.sql.
try {
  await q(`ALTER TABLE reports DROP CONSTRAINT IF EXISTS reports_reason_check`);
  await q(`ALTER TABLE reports ADD CONSTRAINT reports_reason_check CHECK (reason IN ('harassment', 'hate_speech', 'threat', 'misinformation', 'spam', 'child_safety', 'doctrinal_error', 'influence_peddling', 'financial_mismanagement', 'other'))`);
} catch (e) { app.log.warn({ err: e, migration: 'signalements nouveaux motifs' }, 'Échec de migration — poursuite du démarrage'); }

// Mur des membres v2, tranche 0, 25 nov. 2026 : migrations de
// contrôle, serveur seul, aucun changement de comportement.
// Élargissement des contraintes de cible aux publications du
// mur, colonnes de catégorie et de modération, tables des
// suivis et des enregistrements, réponses aux commentaires,
// types de réaction, présentation du membre. Les contraintes
// sont élargies par bloc DO, en cherchant le nom réel dans
// pg_constraint : sur une base neuve, le nom est celui que
// PostgreSQL donne à la contrainte en ligne, sur une base
// ancienne, il peut différer. Jamais de modification de
// schema.sql.
try {
  await q(`DO $$
  DECLARE
    nom_contrainte text;
  BEGIN
    IF to_regclass('aimes') IS NOT NULL THEN
      SELECT conname INTO nom_contrainte FROM pg_constraint
      WHERE conrelid = 'aimes'::regclass AND contype = 'c'
        AND pg_get_constraintdef(oid) LIKE '%cible_type%';
      IF nom_contrainte IS NOT NULL THEN
        EXECUTE format('ALTER TABLE aimes DROP CONSTRAINT %I', nom_contrainte);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'aimes'::regclass AND conname = 'aimes_cible_type_check') THEN
        EXECUTE 'ALTER TABLE aimes ADD CONSTRAINT aimes_cible_type_check CHECK (cible_type IN (''temps_fort'', ''temoignage'', ''mur''))';
      END IF;
    END IF;
    IF to_regclass('commentaires') IS NOT NULL THEN
      SELECT conname INTO nom_contrainte FROM pg_constraint
      WHERE conrelid = 'commentaires'::regclass AND contype = 'c'
        AND pg_get_constraintdef(oid) LIKE '%cible_type%';
      IF nom_contrainte IS NOT NULL THEN
        EXECUTE format('ALTER TABLE commentaires DROP CONSTRAINT %I', nom_contrainte);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'commentaires'::regclass AND conname = 'commentaires_cible_type_check') THEN
        EXECUTE 'ALTER TABLE commentaires ADD CONSTRAINT commentaires_cible_type_check CHECK (cible_type IN (''temps_fort'', ''temoignage'', ''mur''))';
      END IF;
    END IF;
    IF to_regclass('reports') IS NOT NULL THEN
      SELECT conname INTO nom_contrainte FROM pg_constraint
      WHERE conrelid = 'reports'::regclass AND contype = 'c'
        AND pg_get_constraintdef(oid) LIKE '%target_type%';
      IF nom_contrainte IS NOT NULL THEN
        EXECUTE format('ALTER TABLE reports DROP CONSTRAINT %I', nom_contrainte);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'reports'::regclass AND conname = 'reports_target_type_check') THEN
        EXECUTE 'ALTER TABLE reports ADD CONSTRAINT reports_target_type_check CHECK (target_type IN (''message'', ''conversation'', ''user'', ''mur_publication'', ''mur_commentaire''))';
      END IF;
    END IF;
  END $$`);
  await q(`ALTER TABLE mur_publications ADD COLUMN IF NOT EXISTS categorie text NOT NULL DEFAULT 'autre' CHECK (categorie IN ('temoignage', 'priere', 'verset', 'encouragement', 'enseignement', 'autre'))`);
  await q(`ALTER TABLE mur_publications ADD COLUMN IF NOT EXISTS statut_moderation text NOT NULL DEFAULT 'visible' CHECK (statut_moderation IN ('visible', 'en_examen', 'masque', 'retire'))`);
  await q(`ALTER TABLE mur_publications ADD COLUMN IF NOT EXISTS cle_r2_video text`);
  await q(`ALTER TABLE mur_publications ADD COLUMN IF NOT EXISTS type_mime_video text`);
  await q(`ALTER TABLE mur_publications ADD COLUMN IF NOT EXISTS taille_video_octets integer CHECK (taille_video_octets > 0)`);
  await q(`CREATE INDEX IF NOT EXISTS ix_mur_publications_categorie ON mur_publications (categorie, cree_le DESC)`);
  await q(`ALTER TABLE aimes ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'jaime' CHECK (type IN ('jaime', 'amen', 'priere'))`);
  await q(`ALTER TABLE commentaires ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES commentaires(id) ON DELETE CASCADE`);
  await q(`CREATE INDEX IF NOT EXISTS ix_commentaires_parent ON commentaires (parent_id)`);
  await q(`CREATE TABLE IF NOT EXISTS mur_suivis (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    suiveur_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    suivi_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    cree_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_mur_suivis_couple UNIQUE (suiveur_id, suivi_id),
    CONSTRAINT ck_mur_suivis_distincts CHECK (suiveur_id <> suivi_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_mur_suivis_suivi ON mur_suivis (suivi_id, cree_le DESC)`);
  await q(`CREATE TABLE IF NOT EXISTS mur_enregistrements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    publication_id uuid NOT NULL REFERENCES mur_publications(id) ON DELETE CASCADE,
    cree_le timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_mur_enregistrements_couple UNIQUE (membre_id, publication_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_mur_enregistrements_membre ON mur_enregistrements (membre_id, cree_le DESC)`);
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS presentation text`);
} catch (e) { app.log.warn({ err: e, migration: 'mur v2 tranche 0' }, 'Échec de migration — poursuite du démarrage'); }

// Personnes hors système, correctif global 27 nov. 2026 : fiche
// personne sans compte application (nom, fonction, contact),
// utilisable dans Nominations, Planning des responsables,
// Département scolaire, Administrateurs (désignation) et
// inscriptions au camp. Table et colonnes créées au démarrage,
// sans toucher à schema.sql.
try {
  await q(`CREATE TABLE IF NOT EXISTS personnes_externes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nom_complet text NOT NULL,
    fonction text NOT NULL DEFAULT 'Membre',
    contact text NOT NULL DEFAULT '',
    etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
    role_admin text,
    cree_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
    cree_le timestamptz NOT NULL DEFAULT now(),
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_personnes_externes_nom ON personnes_externes (nom_complet)`);
} catch (e) { app.log.warn({ err: e, migration: 'CREATE TABLE IF NOT EXISTS personnes_externes' }, 'Échec de migration — poursuite du démarrage'); }
try {
  await q(`ALTER TABLE nominations ADD COLUMN IF NOT EXISTS personne_externe_id uuid REFERENCES personnes_externes(id) ON DELETE CASCADE`);
  await q(`ALTER TABLE nominations ALTER COLUMN membre_id DROP NOT NULL`);
  await q(`ALTER TABLE plannings_responsables ADD COLUMN IF NOT EXISTS personne_externe_id uuid REFERENCES personnes_externes(id) ON DELETE CASCADE`);
  await q(`ALTER TABLE plannings_responsables ALTER COLUMN membre_id DROP NOT NULL`);
  await q(`ALTER TABLE suivis_scolaires ADD COLUMN IF NOT EXISTS personne_externe_id uuid REFERENCES personnes_externes(id) ON DELETE CASCADE`);
  await q(`ALTER TABLE suivis_scolaires ALTER COLUMN membre_id DROP NOT NULL`);
  await q(`CREATE UNIQUE INDEX IF NOT EXISTS ix_suivis_externe_annee ON suivis_scolaires (personne_externe_id, annee_scolaire) WHERE personne_externe_id IS NOT NULL`);
  await q(`ALTER TABLE inscriptions ADD COLUMN IF NOT EXISTS personne_externe_id uuid REFERENCES personnes_externes(id) ON DELETE CASCADE`);
  await q(`ALTER TABLE inscriptions ADD COLUMN IF NOT EXISTS contact_parent text`);
  await q(`ALTER TABLE inscriptions ALTER COLUMN membre_id DROP NOT NULL`);
  await q(`CREATE UNIQUE INDEX IF NOT EXISTS ix_inscriptions_externe ON inscriptions (evenement_id, personne_externe_id) WHERE personne_externe_id IS NOT NULL`);
} catch (e) { app.log.warn({ err: e, migration: 'personnes externes colonnes' }, 'Échec de migration — poursuite du démarrage'); }

app.listen({ port: CFG.port, host: '0.0.0.0' });
