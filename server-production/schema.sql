-- ═══════════════════════════════════════════════════════════════════
--  CONNEXION PROPHÉTIQUE — Schéma PostgreSQL (14+)
--  « Former pour mieux servir »
--
--  Règles d'architecture appliquées :
--   • Paiement Wave Business direct, sans agrégateur.
--   • Une demande de paiement n'est « confirmée » que par webhook vérifié
--     ou par validation explicite de la structure. Jamais autrement.
--   • Facture et accès au fichier d'un livre : seulement après confirmation.
--   • Chaque achat garde sa copie d'origine (titre, auteur, prix) ;
--     une modification du catalogue ne la réécrit pas.
--   • Identifiant de paiement Wave unique : un identifiant déjà utilisé est refusé.
--   • Matricule unique, attribué par le serveur.
--   • Fichiers vérifiés par leur type réel (octets), pas par leur nom.
--   • Mots de passe hachés (jamais en clair), jetons d'accès courts + refresh révocables.
--   • Journal d'audit des actions sensibles.
--   • Sujets de prière : AUCUNE table. Ils partent par e-mail, ne sont jamais stockés.
--   • Journal spirituel : reste sur l'appareil, aucune table.
--
--  Montants : entiers en FCFA (pas de décimales).
--  Valeurs inconnues « À confirmer » : colonnes NULL, jamais de valeur inventée.
--
--  Utilisation :  psql -d connexionprophetique -f schema.sql
-- ═══════════════════════════════════════════════════════════════════

BEGIN;

-- gen_random_bytes() (code du pass) vient de pgcrypto. gen_random_uuid() est natif (PG13+).
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ───────────────────────── Types ─────────────────────────
CREATE TYPE role_utilisateur AS ENUM ('membre', 'admin_etablissement', 'admin_general');
CREATE TYPE type_paiement    AS ENUM ('don', 'achat', 'carte', 'cotisation');
CREATE TYPE statut_paiement  AS ENUM ('en_attente', 'confirme', 'refuse', 'annule');
CREATE TYPE mode_confirmation AS ENUM ('webhook', 'validation_structure', 'paypal');
CREATE TYPE type_evenement   AS ENUM ('camp', 'retraite');
CREATE TYPE testament        AS ENUM ('ancien', 'nouveau');

-- ───────────────────── Fonctions utilitaires ─────────────────────
CREATE FUNCTION maj_modifie_le() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.modifie_le := now();
  RETURN NEW;
END $$;

-- ───────────────────── Fichiers téléversés ─────────────────────
-- Chaque fichier (livre, audio, image) est vérifié sur ses octets avant publication.
CREATE TABLE fichiers (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cle_stockage    text NOT NULL UNIQUE,             -- chemin dans le stockage objet
  nom_original    text,
  type_mime_reel  text NOT NULL,                    -- détecté depuis les octets
  taille_octets   bigint NOT NULL CHECK (taille_octets > 0),
  sha256          char(64) NOT NULL,
  verifie         boolean NOT NULL DEFAULT false,   -- true seulement après contrôle serveur
  cree_le         timestamptz NOT NULL DEFAULT now()
);

-- ───────────────────── Établissements ─────────────────────
CREATE TABLE etablissements (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom         text NOT NULL UNIQUE,
  description text,
  image_id    uuid REFERENCES fichiers(id) ON DELETE SET NULL,
  cree_le     timestamptz NOT NULL DEFAULT now(),
  modifie_le  timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER t_etab_maj BEFORE UPDATE ON etablissements FOR EACH ROW EXECUTE FUNCTION maj_modifie_le();

-- Trois établissements au départ (document d'architecture).
INSERT INTO etablissements (nom) VALUES ('ISPAM'), ('Céleste'), ('La Silhouette');

CREATE TABLE activites_etablissement (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  etablissement_id uuid NOT NULL REFERENCES etablissements(id) ON DELETE CASCADE,
  titre            text NOT NULL,
  description      text,
  image_id         uuid REFERENCES fichiers(id) ON DELETE SET NULL,
  cree_le          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_activites_etab ON activites_etablissement (etablissement_id);

-- ───────────────────── Comptes et membres ─────────────────────
-- Le visiteur n'a pas de compte : il consulte seulement.
CREATE TABLE utilisateurs (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                 text,
  telephone             text,
  mot_de_passe_hash     text NOT NULL,              -- argon2id / bcrypt, jamais en clair
  role                  role_utilisateur NOT NULL DEFAULT 'membre',
  etablissement_admin_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
  actif                 boolean NOT NULL DEFAULT true,
  cree_le               timestamptz NOT NULL DEFAULT now(),
  modifie_le            timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_contact CHECK (email IS NOT NULL OR telephone IS NOT NULL),
  CONSTRAINT ck_admin_etab CHECK (
    (role = 'admin_etablissement' AND etablissement_admin_id IS NOT NULL)
    OR (role <> 'admin_etablissement' AND etablissement_admin_id IS NULL)
  )
);
CREATE UNIQUE INDEX ux_utilisateurs_email ON utilisateurs (lower(email)) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX ux_utilisateurs_tel   ON utilisateurs (telephone)    WHERE telephone IS NOT NULL;
CREATE TRIGGER t_util_maj BEFORE UPDATE ON utilisateurs FOR EACH ROW EXECUTE FUNCTION maj_modifie_le();

-- Jetons de rafraîchissement (les jetons d'accès sont courts et non stockés).
CREATE TABLE jetons_rafraichissement (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  utilisateur_id uuid NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
  empreinte      char(64) NOT NULL UNIQUE,          -- hash du jeton, jamais le jeton
  expire_le      timestamptz NOT NULL,
  revoque        boolean NOT NULL DEFAULT false,
  cree_le        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_jetons_util ON jetons_rafraichissement (utilisateur_id);

CREATE SEQUENCE seq_matricule START 1;

CREATE TABLE membres (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  utilisateur_id   uuid NOT NULL UNIQUE REFERENCES utilisateurs(id) ON DELETE CASCADE,
  matricule        text NOT NULL UNIQUE
                   DEFAULT ('CP-' || lpad(nextval('seq_matricule')::text, 6, '0')),
  nom_complet      text NOT NULL,
  etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL,
  photo_id         uuid REFERENCES fichiers(id) ON DELETE SET NULL,
  inscrit_le       timestamptz NOT NULL DEFAULT now(),
  valide_jusqua    date NOT NULL DEFAULT ((current_date + interval '1 year')::date),   -- carte valable 1 an
  modifie_le       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_membres_etab ON membres (etablissement_id);
CREATE TRIGGER t_membres_maj BEFORE UPDATE ON membres FOR EACH ROW EXECUTE FUNCTION maj_modifie_le();

-- Cotisation mensuelle (1 000 FCFA par mois). Le statut affiché sur la carte
-- se déduit de la dernière ligne. Mode d'encaissement : à confirmer avec la structure.
CREATE TABLE cotisations (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membre_id   uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
  mois        date NOT NULL CHECK (extract(day from mois) = 1),
  montant_fcfa integer NOT NULL DEFAULT 1000 CHECK (montant_fcfa > 0),
  enregistre_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
  cree_le     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (membre_id, mois)
);

-- Section Bureau : démarre vide. Le contact ne s'affiche qu'avec l'accord de la personne.
CREATE TABLE bureau_membres (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membre_id      uuid REFERENCES membres(id) ON DELETE SET NULL,
  nom            text NOT NULL,
  fonction       text NOT NULL,
  contact        text,
  contact_public boolean NOT NULL DEFAULT false,    -- accord explicite
  ordre          integer NOT NULL DEFAULT 0,
  cree_le        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_contact_accord CHECK (contact_public = false OR contact IS NOT NULL)
);

-- ───────────────────── Actualités ─────────────────────
CREATE TABLE actualites (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  etablissement_id uuid REFERENCES etablissements(id) ON DELETE CASCADE,   -- NULL = générale
  titre            text NOT NULL,
  texte            text NOT NULL,
  image_id         uuid REFERENCES fichiers(id) ON DELETE SET NULL,
  publiee_le       timestamptz NOT NULL DEFAULT now(),
  auteur_id        uuid REFERENCES utilisateurs(id) ON DELETE SET NULL
);
CREATE INDEX ix_actualites_date ON actualites (publiee_le DESC);
CREATE INDEX ix_actualites_etab ON actualites (etablissement_id);

-- ───────────────────── Camps, retraites, inscriptions ─────────────────────
-- Dates, lieu et tarif NULL = « À confirmer ».
CREATE TABLE evenements (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type        type_evenement NOT NULL DEFAULT 'camp',
  nom         text NOT NULL,
  date_debut  date,
  date_fin    date,
  lieu        text,
  tarif_fcfa  integer CHECK (tarif_fcfa IS NULL OR tarif_fcfa >= 0),
  image_id    uuid REFERENCES fichiers(id) ON DELETE SET NULL,
  est_kairos  boolean NOT NULL DEFAULT false,       -- Camp National Kairos : badge automatique
  publie      boolean NOT NULL DEFAULT true,
  cree_le     timestamptz NOT NULL DEFAULT now(),
  modifie_le  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_dates CHECK (date_fin IS NULL OR date_debut IS NULL OR date_fin >= date_debut)
);
CREATE TRIGGER t_even_maj BEFORE UPDATE ON evenements FOR EACH ROW EXECUTE FUNCTION maj_modifie_le();

-- L'inscription crée le pass numérique (code du QR). Pour un camp Kairos,
-- ce même enregistrement sert de badge (nom, matricule, QR), visible immédiatement.
CREATE TABLE inscriptions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evenement_id uuid NOT NULL REFERENCES evenements(id) ON DELETE CASCADE,
  membre_id   uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
  code_pass   text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  inscrit_le  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (evenement_id, membre_id)
);
CREATE INDEX ix_inscr_membre ON inscriptions (membre_id);

-- ───────────────────── Librairie ─────────────────────
CREATE TABLE livres (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre       text NOT NULL,
  auteur      text NOT NULL,
  description text,
  prix_fcfa   integer NOT NULL CHECK (prix_fcfa > 0),
  format      text,
  couverture_id uuid REFERENCES fichiers(id) ON DELETE SET NULL,
  fichier_id  uuid REFERENCES fichiers(id) ON DELETE SET NULL,   -- jamais renvoyé avant paiement confirmé
  publie      boolean NOT NULL DEFAULT true,
  cree_le     timestamptz NOT NULL DEFAULT now(),
  modifie_le  timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER t_livres_maj BEFORE UPDATE ON livres FOR EACH ROW EXECUTE FUNCTION maj_modifie_le();

-- ───────────────────── Paiements (dons et achats) ─────────────────────
CREATE TABLE paiements (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference           text NOT NULL UNIQUE,          -- référence unique générée par le serveur
  type                type_paiement NOT NULL,
  membre_id           uuid NOT NULL REFERENCES membres(id) ON DELETE RESTRICT,
  montant_fcfa        integer NOT NULL CHECK (montant_fcfa > 0),
  statut              statut_paiement NOT NULL DEFAULT 'en_attente',
  wave_transaction_id text UNIQUE,                   -- un identifiant déjà utilisé est refusé
  mode_confirmation   mode_confirmation,
  confirme_par        uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,   -- si validation structure
  confirme_le         timestamptz,
  cree_le             timestamptz NOT NULL DEFAULT now(),
  modifie_le          timestamptz NOT NULL DEFAULT now(),
  -- « Confirmé » exige un mode et une date. Jamais de confirmation implicite.
  CONSTRAINT ck_confirmation CHECK (
    (statut = 'confirme' AND mode_confirmation IS NOT NULL AND confirme_le IS NOT NULL)
    OR (statut <> 'confirme' AND confirme_le IS NULL)
  ),
  CONSTRAINT ck_validation_structure CHECK (
    mode_confirmation IS DISTINCT FROM 'validation_structure' OR confirme_par IS NOT NULL
  )
);
CREATE INDEX ix_paiements_membre ON paiements (membre_id, cree_le DESC);
CREATE INDEX ix_paiements_statut ON paiements (statut) WHERE statut = 'en_attente';
CREATE TRIGGER t_paie_maj BEFORE UPDATE ON paiements FOR EACH ROW EXECUTE FUNCTION maj_modifie_le();

-- Un paiement confirmé est figé : montant, référence, membre, type et statut ne changent plus.
CREATE FUNCTION trg_paiement_fige() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.statut = 'confirme' AND (
       NEW.statut <> 'confirme'
    OR NEW.montant_fcfa <> OLD.montant_fcfa
    OR NEW.reference <> OLD.reference
    OR NEW.membre_id <> OLD.membre_id
    OR NEW.type <> OLD.type
  ) THEN
    RAISE EXCEPTION 'Paiement % confirmé : modification interdite', OLD.reference;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER t_paiement_fige BEFORE UPDATE ON paiements FOR EACH ROW EXECUTE FUNCTION trg_paiement_fige();

-- Lignes d'achat : copie d'origine (titre, auteur, prix). Le catalogue ne la réécrit pas.
CREATE TABLE achats_lignes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paiement_id      uuid NOT NULL REFERENCES paiements(id) ON DELETE CASCADE,
  livre_id         uuid REFERENCES livres(id) ON DELETE SET NULL,
  titre_copie      text NOT NULL,
  auteur_copie     text NOT NULL,
  prix_copie_fcfa  integer NOT NULL CHECK (prix_copie_fcfa > 0)
);
CREATE INDEX ix_lignes_paiement ON achats_lignes (paiement_id);
CREATE INDEX ix_lignes_livre    ON achats_lignes (livre_id);

CREATE FUNCTION trg_ligne_achat() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE p paiements%ROWTYPE;
BEGIN
  IF TG_OP = 'INSERT' THEN
    SELECT * INTO p FROM paiements WHERE id = NEW.paiement_id;
    IF p.type <> 'achat' THEN
      RAISE EXCEPTION 'Les lignes d''achat ne concernent que les paiements de type achat';
    END IF;
    IF p.statut <> 'en_attente' THEN
      RAISE EXCEPTION 'Lignes ajoutables seulement sur un paiement en attente';
    END IF;
  ELSE  -- UPDATE : seule la perte du lien catalogue (livre supprimé) est permise
    IF NEW.paiement_id <> OLD.paiement_id
       OR NEW.titre_copie <> OLD.titre_copie
       OR NEW.auteur_copie <> OLD.auteur_copie
       OR NEW.prix_copie_fcfa <> OLD.prix_copie_fcfa THEN
      RAISE EXCEPTION 'La copie d''origine d''un achat est immuable';
    END IF;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER t_ligne_achat BEFORE INSERT OR UPDATE ON achats_lignes FOR EACH ROW EXECUTE FUNCTION trg_ligne_achat();

-- Factures (PDF ou JPG) : uniquement après confirmation.
CREATE TABLE factures (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero      text NOT NULL UNIQUE,
  paiement_id uuid NOT NULL UNIQUE REFERENCES paiements(id) ON DELETE RESTRICT,
  fichier_id  uuid REFERENCES fichiers(id) ON DELETE SET NULL,
  emise_le    timestamptz NOT NULL DEFAULT now()
);

CREATE FUNCTION trg_facture_si_confirme() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM paiements WHERE id = NEW.paiement_id AND statut = 'confirme') THEN
    RAISE EXCEPTION 'Aucune facture avant confirmation du paiement';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER t_facture BEFORE INSERT ON factures FOR EACH ROW EXECUTE FUNCTION trg_facture_si_confirme();

-- Droit de lecture d'un livre : achat confirmé uniquement.
CREATE VIEW v_acces_livres AS
  SELECT p.membre_id, l.livre_id
  FROM paiements p
  JOIN achats_lignes l ON l.paiement_id = p.id
  WHERE p.type = 'achat' AND p.statut = 'confirme' AND l.livre_id IS NOT NULL;

CREATE FUNCTION peut_lire_livre(p_membre uuid, p_livre uuid) RETURNS boolean
LANGUAGE sql STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM v_acces_livres WHERE membre_id = p_membre AND livre_id = p_livre);
$$;

-- Événements Wave reçus (idempotence + trace). Secret et clé API : variables
-- d'environnement du serveur, jamais en base ni dans l'application.
CREATE TABLE evenements_wave (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evenement_ext text NOT NULL UNIQUE,                -- identifiant d'événement côté Wave
  signature_ok  boolean NOT NULL,
  charge        jsonb NOT NULL,
  paiement_id   uuid REFERENCES paiements(id) ON DELETE SET NULL,
  traite        boolean NOT NULL DEFAULT false,
  recu_le       timestamptz NOT NULL DEFAULT now()
);

-- ───────────────────── Enseignements audio ─────────────────────
CREATE TABLE enseignements (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre       text NOT NULL,
  orateur     text,
  description text,
  audio_id    uuid REFERENCES fichiers(id) ON DELETE SET NULL,
  publie      boolean NOT NULL DEFAULT true,
  publie_le   timestamptz NOT NULL DEFAULT now()
);

-- ───────────────────── Quiz Bible ─────────────────────
CREATE TABLE quiz_personnages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom        text NOT NULL UNIQUE,
  testament  testament NOT NULL
);

CREATE TABLE quiz_questions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  personnage_id   uuid NOT NULL REFERENCES quiz_personnages(id) ON DELETE CASCADE,
  enonce          text NOT NULL,
  reference_verset text NOT NULL,
  explication     text,
  actif           boolean NOT NULL DEFAULT true,
  cree_le         timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_questions_perso ON quiz_questions (personnage_id);

CREATE TABLE quiz_choix (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  position    smallint NOT NULL CHECK (position BETWEEN 1 AND 4),
  libelle     text NOT NULL,
  est_correct boolean NOT NULL DEFAULT false,
  UNIQUE (question_id, position)
);
CREATE UNIQUE INDEX ux_une_bonne_reponse ON quiz_choix (question_id) WHERE est_correct;

-- Quatre choix, une seule bonne réponse, vérifiés en fin de transaction.
CREATE FUNCTION trg_quiz_valide() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE q uuid := COALESCE(NEW.question_id, OLD.question_id); n int; c int;
BEGIN
  SELECT count(*), count(*) FILTER (WHERE est_correct) INTO n, c FROM quiz_choix WHERE question_id = q;
  IF n <> 0 AND (n <> 4 OR c <> 1) THEN
    RAISE EXCEPTION 'Question %: 4 choix et exactement 1 bonne réponse requis (trouvé % choix, % correcte)', q, n, c;
  END IF;
  RETURN NULL;
END $$;
CREATE CONSTRAINT TRIGGER t_quiz_valide
  AFTER INSERT OR UPDATE OR DELETE ON quiz_choix
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW EXECUTE FUNCTION trg_quiz_valide();

-- Pas de répétition tant que toutes les questions ne sont pas passées :
-- une ligne par question vue, par membre et par cycle. Quand toutes sont vues,
-- l'API ouvre un nouveau cycle (cycle + 1).
CREATE TABLE quiz_vus (
  membre_id   uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  cycle       integer NOT NULL DEFAULT 1,
  vu_le       timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (membre_id, question_id, cycle)
);

-- ───────────────────── Journal d'audit ─────────────────────
CREATE TABLE journal_audit (
  id             bigserial PRIMARY KEY,
  utilisateur_id uuid REFERENCES utilisateurs(id) ON DELETE SET NULL,
  action         text NOT NULL,                      -- ex. 'paiement.valide', 'livre.modifie'
  entite         text NOT NULL,
  entite_id      text,
  details        jsonb,
  adresse_ip     inet,
  cree_le        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_audit_date   ON journal_audit (cree_le DESC);
CREATE INDEX ix_audit_entite ON journal_audit (entite, entite_id);

-- L'audit est en ajout seul : ni modification ni suppression.
CREATE FUNCTION trg_audit_append_only() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'journal_audit est en ajout seul';
END $$;
CREATE TRIGGER t_audit_fige BEFORE UPDATE OR DELETE ON journal_audit
  FOR EACH ROW EXECUTE FUNCTION trg_audit_append_only();

-- ───────────────────── Configuration pilotée par le serveur ─────
-- Modèle Desjardins, 27 oct. 2026 : textes d'accueil, libellés de
-- base, messages d'information et activation des sections, lus par
-- l'application sur GET /config, modifiables par PUT /admin/config
-- (administrateur général seulement). Une clé = une valeur JSON
-- (texte, ou objet booléen pour sections). Aucune ligne par défaut
-- n'est insérée : en l'absence de ligne, GET /config renvoie les
-- valeurs par défaut définies dans server.js, qui sont exactement
-- les valeurs actuelles de l'application. Sur une base existante,
-- cette table n'est PAS créée par le démarrage (schema.sql n'est
-- appliqué que si la base est vide) : voir la migration dans
-- docs/DEPLOIEMENT.md, ou le premier PUT /admin/config, qui crée
-- la table lui-même.
CREATE TABLE config_app (
  cle        text PRIMARY KEY,
  valeur     jsonb NOT NULL,
  modifie_le timestamptz NOT NULL DEFAULT now()
);

COMMIT;

-- Commandes PayPal API, 27 oct. 2026 : une commande par demande, pour le retour.
CREATE TABLE IF NOT EXISTS paypal_commandes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paiement_id uuid NOT NULL REFERENCES paiements(id) ON DELETE RESTRICT,
  commande_id text NOT NULL UNIQUE,
  devise text NOT NULL,
  montant_devise text NOT NULL,
  statut text NOT NULL DEFAULT 'creee',
  cree_le timestamptz NOT NULL DEFAULT now()
);
