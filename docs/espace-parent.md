# Espace parent — fiche du chantier

> 8 nov. 2026. Contexte : il y a quelques années, certains membres
> faisaient croire à leurs parents qu'ils participaient aux activités
> alors que non. Objectif : que le parent sache si son enfant est venu
> à la structure ou pas, et qu'il puisse suivre sa vie scolaire.
> Activités généralement le mercredi et le samedi.

## Ce qui existe déjà — ne pas reconstruire

- **Présences** : table `presences` (membre, activité, `scanne_le`,
  `scanne_par`, méthode `scan`/`manuel`, statut `present`/`annule`,
  UNIQUE membre+activité), `POST /presences/scan` (matricule, 409 si
  déjà présent), `POST /presences/manuel`, `POST /presences/:id/annuler`,
  `GET /presences/activite/:id`, `GET /presences/activite/:id/taux`,
  `GET /moi/presences/:activiteId`, audit `presence.*`. Écran
  `PerimeterPresencesPage` (lib/admin_pages.dart).
- **Suivis scolaires** : table `suivis_scolaires` (membre, année
  scolaire, `moyenne_t1/t2/t3` 0–20, moyenne annuelle calculée, examen
  bepc/bac, résultat admis/ajourné), CRUD admin
  (`/admin/suivis-scolaires`, rôle `responsable`), lecture par le membre
  lui-même (`GET /moi/suivis-scolaires`). Le membre ne voit que ses
  propres moyennes et ne peut jamais en modifier une.
- **Notifications** : helper `notifierMembre(membreId, type, titre,
  message, ...)` — cloche interne (`notifications`, plafond 100/membre)
  + poussée FCM (`envoyerPushMembres`). Best effort, jamais bloquant.
- **Téléchargement audio hors ligne** (carte 53) et **cache en lecture**
  (PR #12) : sans rapport, ne pas toucher.

## Ce qui manque — périmètre V1

1. Lien parent-enfant (création + validation).
2. Notification au parent quand son enfant est scanné présent.
3. Clôture d'activité + notification de fin (présent / absent).
4. Tableau de bord parent (« Mes enfants ») : présence par activité +
   moyennes.
5. Notification au parent quand les moyennes de son enfant sont
   publiées / mises à jour.

## Données

### `liens_parent_enfant` (nouvelle table)

```sql
id uuid PK DEFAULT gen_random_uuid(),
parent_membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
enfant_membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
statut text NOT NULL DEFAULT 'en_attente'
  CHECK (statut IN ('en_attente', 'valide', 'rejete')),
cree_le timestamptz NOT NULL DEFAULT now(),
valide_par uuid REFERENCES membres(id) ON DELETE SET NULL,
valide_le timestamptz,
UNIQUE (parent_membre_id, enfant_membre_id),
CHECK (parent_membre_id <> enfant_membre_id)
```

- Un parent peut lier plusieurs enfants ; un enfant peut avoir
  plusieurs parents (père, mère).
- Le lien est créé par le parent lui-même, puis **validé par un
  responsable** — jamais de lien actif sans validation (sinon
  n'importe qui se déclare parent d'un enfant).
- Création dans la migration de démarrage (même motif try/catch que
  `presences` / `suivis_scolaires`).

### `clotures_activite` (nouvelle table)

```sql
activite_id uuid PRIMARY KEY,
cloture_le timestamptz NOT NULL DEFAULT now(),
cloture_par uuid REFERENCES membres(id) ON DELETE SET NULL
```

- Une activité ne se clôture qu'une fois (409 sinon) : pas de double
  notification.

## API (serveur)

### Liens

- `POST /moi/liens-parent-enfant` (`membreG`, corps
  `{enfant_membre_id}`) : crée un lien `en_attente`. 409 si lien
  existant (quel que soit le statut), 400 si parent = enfant,
  404 si l'enfant n'existe pas.
- `GET /moi/liens-parent-enfant` (`membreG`) : mes liens (en tant que
  parent) avec nom + matricule de l'enfant et statut.
- `DELETE /moi/liens-parent-enfant/:id` (`membreG`) : le parent retire
  son lien (valide ou en attente).
- `GET /admin/liens-parent-enfant` (`contenuG`, `?statut=en_attente`)
  : liste des liens, en attente d'abord.
- `POST /admin/liens-parent-enfant/:id/valider` et `/rejeter`
  (`contenuG`, `exigerFonctionAdmin` responsable/modérateur) :
  change le statut, journalise dans `audit`
  (`lien_parent.valide` / `lien_parent.rejete`).

### Tableau de bord parent

- `GET /moi/enfants` (`membreG`) : pour chaque enfant lié **validé** :
  - identité (id, nom complet, matricule) ;
  - `presences` : 10 dernières activités (nom, date, statut
    `present` / `absent` — absent = aucune ligne `present` pour
    cette activité) ;
  - `suivis` : suivis scolaires de l'enfant (année, classe,
    moyennes t1/t2/t3, moyenne annuelle, examen).
- Règle d'or : un parent ne voit **que** ses enfants liés validés.
  Aucune moyenne, aucune présence d'un autre enfant ne sort jamais
  par cette route.

### Notifications

- **Arrivée** : après `marquerPresence` réussi (scan et manuel),
  chercher les parents validés de l'enfant et `notifierMembre`
  chacun — type `presence_enfant`, « {Prénom} est arrivé(e) à
  {activité} ». Best effort (try/catch, après le commit).
- **Annulation** : après `POST /presences/:id/annuler`, même
  recherche, type `presence_enfant`, « La présence de {Prénom} à
  {activité} a été annulée ».
- **Clôture** : `POST /presences/activite/:id/cloturer` (`contenuG`,
  modérateur/responsable) : crée la ligne `clotures_activite`
  (409 si déjà clôturée), puis pour chaque lien validé, notifie le
  parent — présent : « Activité terminée : {Prénom} était
  présent(e) à {activité} » ; absent : « {Prénom} n'était pas
  présent(e) à {activité} ». Un seul message par enfant et par
  parent.
- **Moyennes** : après `POST` / `PUT /admin/suivis-scolaires`,
  notifier le membre lui-même + ses parents validés, type
  `moyenne_enfant`, « Les moyennes de {Prénom} ({année}) ont été
  mises à jour ».

## Application (Flutter)

- **« Mes enfants »** (nouvel écran) : liste des enfants liés, pour
  chacun les dernières activités (présent/absent) et les moyennes
  (trimestres + annuelle). Entrée depuis le profil, visible seulement
  si le membre a au moins un lien (validé ou en attente).
- **Demander un lien** : recherche d'un membre (nom ou matricule) →
  « Demander à lier » → lien `en_attente`, message « en attente de
  validation par un responsable ».
- **Validation (admin)** : page « Liens parent-enfant » dans
  l'administration (en attente d'abord, valider / rejeter).
- **Clôturer** : bouton « Clôturer l'activité » dans
  `PerimeterPresencesPage` (avec confirmation ; 409 si déjà clôturée).
- **Méthodes `api.dart`** : `demanderLienParentEnfant`,
  `fetchMesLiensParentEnfant`, `retirerLienParentEnfant`,
  `fetchLiensParentEnfantAdmin`, `validerLienParentEnfant`,
  `rejeterLienParentEnfant`, `fetchMesEnfants`,
  `cloturerActivite`.
- **Traductions** : ajouter chaque nouvelle chaîne à `lib/i18n.dart`
  (FR → EN), comme pour les autres écrans.

## Sécurité et confidentialité

- Lien actif seulement après validation responsable.
- Un parent ne voit que ses enfants liés validés — ni les autres
  enfants, ni les autres parents.
- Les moyennes ne figurent dans aucune liste publique ni recherche.
- Audit : validation/rejet de lien, clôture (acteur, date).
- Les notifications ne contiennent pas de moyenne chiffrée, juste
  « mise à jour disponible » (le chiffre se consulte dans l'appli).

## V2 (plus tard, hors périmètre)

- Personnes autorisées à récupérer l'enfant à la sortie.
- Alerte d'absence en cours d'activité (enfant attendu jamais
  scanné X minutes après le début).
- Statistiques par enfant (taux de présence par mois).
- Export de la liste de présence (PDF/CSV) pour un litige.

## Vérifications avant merge

- `flutter analyze` : 0 erreur.
- Tests d'intégration serveur : lien (création, doublon 409,
  validation, visibilité parent limitée), notification d'arrivée,
  clôture (409 si déjà clôturée, message présent/absent),
  moyennes (parent voit l'enfant, étranger 403/vide).
- Branche dédiée rebasée sur la tête de main à jour, PR, jamais
  direct sur main. Annoncer sur l'issue #9.
