# Rapport de session — Passe 2 de durcissement (2026-07-13)

Session de travail profond sur `apps/construction`. La passe 1 (session
2026-07-12) avait livré les 7 chantiers de la plateforme financière. Cette
passe 2 est une revue **audit → correction → vérification** : 4 agents d'audit
en lecture seule ont cartographié les défauts par chantier, puis chaque chantier
a été durci et re-testé, avec un commit par jalon.

**État final vérifié** : typecheck ✅ · **89 tests** ✅ · lint ✅ · build ✅
(41 routes, middleware `/office` actif). Baseline d'entrée : 69 tests → +20.

---

## Ce qui a été fait, par chantier

### C1 — Pricing engine V2 + economics  (`c320ca3`)
- **Sécurité** : `middleware.ts` protège `/office/*` par Basic Auth (fail-closed
  sans identifiants). Le dashboard interne (coûts, marges, point mort) n'était
  protégé que par `noindex`.
- **Double comptage des moules levé** : l'amortissement des moules est une charge
  FIXE (`ATELIER_FIXED`) — retiré de la description des matériaux (source unique).
- **Transparence honnête** : `WinWinPanel` renomme « Notre marge » →
  « Marge de contribution » + mention que la marge nette réelle est plus basse.
- `EconomicsDashboard` aligné sur `CURRENT_VOLUME` (plus de prix/marge figés sur
  le palier lancement passé 50 modules).
- Marge de parrainage LTV corrigée 640 k → 600 k (vraie moyenne des 3 offres).
- **+10 tests** economics (calibration catalogue ↔ coûts, point mort, LTV/CAC,
  sensibilité ciment/volume).

### C2 — Checkout universel Stripe  (`3a19202`)
- `apiVersion` Stripe épinglée + helper `stripeMode()` dérivé du préfixe de clé
  → la copie « mode test » ne peut plus mentir.
- Seuil 3DS XOF dérivé de la parité `EUR_XOF` (fin de la constante magique).
- `idempotencyKey` sur `paymentIntents.create` (anti double-clic / retry réseau).
- Mapping webhook extrait en **fonction pure testable** (`lib/payment/webhook.ts`) :
  gère `succeeded` (commande + impact), `payment_failed`, `charge.refunded`,
  `charge.dispute.created`. **+7 tests**.
- Route webhook sécurisée : `try/catch`, event marqué traité **après** succès
  (rejeu Stripe préservé sur erreur), ACK 200 typé.

### C3 — Noéma Impact  (`099df9e`)
- **`INVEST_MODE` réellement opérant** : `capabilitiesFor()` gate les sections
  (don / intérêt / régulé) et **consomme `REGULATED_ENABLED`** (fail-closed).
- Fin de l'affirmation trompeuse « les deux rails alimentent la même barre » :
  copie honnête (CB automatique ; mobile money = relais WhatsApp, CinetPay à venir).
- Seuil 3DS/SCA appliqué au checkout impact ; `contributorName` aligné au webhook.
- Champ mort `m2` par-métrique remplacé par `m2Built` projet, réellement affiché
  (compteur agrégé + page projet). **+2 tests** (garde-fou légal du mode régulé).

### C4 — Espace investisseurs  (`4eb4b0a`)
- Équipe « agents IA » (peu crédible en dossier institutionnel) reformulée :
  l'IA devient un levier de productivité, les recrutements clés rattachés au seed.
- `InterestForm` : honeypot anti-spam + consentement RGPD requis ; `/api/lead`
  rejette le honeypot (200 silencieux), exige le consentement (422), journalise
  le lead avec priorité HOT/WARM/COLD.
- **Pitch deck** : vrai PDF teaser placeholder (`public/`) + bouton de
  téléchargement (au lieu d'une promesse sans fichier).
- `AnimatedCounter` : bug latent corrigé (ré-armement au changement de valeur)
  + support décimales → carnet affiché « 38,4 M ».

### C5 — Marketing & vision  (`03c1ce9`)
- **Parrainage réellement tracké** : `ReferralCard` enregistre l'ambassadeur
  côté serveur (`POST /api/lead` kind=ambassadeur + code).
- **SEO** : JSON-LD `Article` enrichi (url, mainEntityOfPage, image, dates,
  publisher.logo) ; index guides doté d'`ItemList` + `BreadcrumbList` + canonical.
- Constantes `SITE_URL` / `CONTENT_UPDATED_AT` (source unique).

### C6 + C7 + transverse  (`033a352`)
- `docs/11-sourcing-chine` : seuil LCL→FCL rendu cohérent (une seule valeur).
- `docs/08-roadmap` : chevauchement checkout Phase 3 / 6.1 clarifié ; 6.2 corrige
  la mention « double rail ».
- i18n : dictionnaire **EN complété** ; `price.indicative` branché sur la
  constante `PRICE_DISCLAIMER` (source unique).

---

## Décisions prises pendant la session
1. **La persistance DB (dossiers, `processed_webhook_events`) reste Phase 2.**
   Sans base, la state machine ne peut être câblée de bout en bout. Choix : ne PAS
   simuler une persistance en mémoire (trompeuse en serverless) ; à la place,
   isoler la logique en fonctions pures testées et documenter le point d'ancrage.
2. **Transparence : afficher la marge de contribution, pas une « marge nette »
   survendue.** La stratégie volume-first assume une marge nette faible ; le dire
   est cohérent avec le positionnement « transparence radicale ».
3. **Fail-closed partout où c'est réglementaire ou sensible** : `/office` (Basic
   Auth), mode régulé investissement (`REGULATED_ENABLED`).
4. **Ne pas prétendre à un rail mobile money automatisé** tant que CinetPay n'est
   pas intégré : honnêteté produit > promesse marketing.

## Ce qui reste (Phase 2 / hors périmètre de cette passe)
- Persistance DB des dossiers + table d'idempotence webhook partagée entre
  instances ; déblocage production + reçus WhatsApp/email réels par jalon.
- **Intégration CinetPay** (mobile money) : init + webhook de réconciliation, pour
  faire du mobile money un vrai 2e rail alimentant la barre de progression.
- Radar rules (anti-fraude) côté dashboard Stripe ; rate-limiting des routes API.
- Barre de progression Impact et mur des bâtisseurs alimentés par les
  contributions persistées (aujourd'hui : constantes).
- CRM réel pour les leads (aujourd'hui : log priorisé) ; leaderboard ambassadeurs
  alimenté par les enregistrements réels.
- i18n : routing `/en` + bascule de locale (dictionnaires prêts).

## Vérification
```
typecheck : OK        tests : 89 passed (7 fichiers)
lint      : OK        build : OK (41 routes, middleware 34,5 kB)
```
