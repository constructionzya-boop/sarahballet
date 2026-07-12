# Session 2026-07-12 — Plateforme financière du bâtiment

> Session de travail profond, 7 chantiers. Objectif : transformer le site Noéma
> en plateforme financière — acheter, financer, investir en ligne (CB + mobile
> money). Tous les chiffres financiers sont **indicatifs** (hypothèses V1).

## Ce qui a été livré, par chantier

### C1 — Pricing Engine V2 + unit economics
- `lib/economics.ts` : coût de revient variable par offre (4 postes), charges
  fixes atelier, **point mort mensuel**, CAC, **LTV** (module+SAV+extension+
  parrainage), ratio LTV/CAC, payback client, **simulateur de sensibilité**.
- `lib/pricing_v2.ts` : **cost-plus** à paliers de volume (lancement 20 % →
  croissance 27 % → établi 32 %), bascule pilotée par le volume signé,
  **early-adopter lock-in**, **calculateur win-win**.
- `/office/economics` (interne, noindex) + `WinWinPanel` public sur les fiches.
- 18 tests.

### C2 — Checkout universel Stripe (mode test)
- `lib/payment/*` : money multi-devises (EUR centimes / XOF zero-decimal),
  jalons **30/40/30**, **machine à états** COMMANDE→…→LIVRÉ (gardes :
  production après acompte, **pose jamais sous 70 %**), idempotence webhook.
- API `POST /api/checkout` (PaymentIntent par jalon, 3DS forcé au seuil,
  Apple/Google Pay), `POST /api/webhooks/stripe` (signature + dédup event.id).
- UI `/reserver` (+ devise), `/reserver/merci`, bouton « Réserver 30 % ».
- `.env.example`, `docs/integrations/stripe-checkout.md`. 15 tests.

### C3 — Noéma Impact (financement participatif)
- **Cadre légal encodé** : `INVEST_MODE` (pionniers actif / intérêt / régulé
  DÉSACTIVÉ), `REGULATED_ENABLED=false`, disclaimers. `docs/10-invest-compliance.md`.
- `/impact` (cartes style bricks, compteur, mur des bâtisseurs), `/impact/[slug]`
  (double rail CB + mobile money via WhatsApp), `/impact/merci`.
- API `/api/impact/checkout`, `/api/lead` (+ scoring).

### C4 — Espace investisseurs
- `/investisseurs` : chiffres clés **animés**, thèse, **TAM/SAM/SOM**, business
  model, jalons d'exécution, **calendrier de levées**, équipe, **data room**
  qualifiante → CRM scoring. Ton sobre, disclaimers.

### C5 — Marketing & vision
- `/vision` (manifeste master plan 2030), **10 guides SEO** longue traîne
  (`/guides`, `/guides/[slug]`, JSON-LD), **programme ambassadeurs**
  (`/ambassadeurs`, 100 €/filleul, leaderboard), **preuve sociale** sur l'accueil.

### C6 — Sourcing Chine
- `docs/11-sourcing-chine.md` : LCL vs FCL, MOQ moules, inspection QC, FOB +
  transitaire, checklist anti-arnaques, calendrier, montage 1er conteneur mixte.

### C7 — Roadmap V2
- `docs/08-roadmap.md` : nouveautés insérées + **Phase 6 « Plateforme
  financière »** (checkout → impact → licence/PSFP → produits régulés), critères
  de sortie mesurables.

## Transverse
- i18n-ready (`lib/i18n.ts`, fr actif, en scaffold). Disclaimers partout.
- **68 tests** verts (pricing_v2, economics, payment, invest, referral, i18n).
- **Build vert** (41 pages statiques + routes dynamiques).
- Mise à jour `NOEMA-DOSSIER-COMPLET.md` (décision 0-bis).

## Décisions prises
- Marge de lancement volontairement basse (volume-first) ; paliers au volume, pas
  à une date. Lock-in affiché comme argument (« jamais de hausse sur commande
  signée »).
- **Aucun titre financier ni promesse de rendement en V1.** Mode régulé prêt mais
  verrouillé ; chemin légal privilégié = **partenariat PSFP en marque blanche**.
- Settlement CB en EUR (SAS Noéma Diaspora) ; mobile money = 2e rail (CinetPay).

## Ce qui reste (hors session)
- Clés Stripe prod + **persistance DB** des dossiers (`orders`,
  `processed_webhook_events`) + reçus WhatsApp/email par jalon.
- Intégration **CinetPay** réelle (mobile money) — aujourd'hui via WhatsApp.
- Rendus produits **Sanitaire** et **Gardiennage** (slots encore vides).
- **Coûts de revient réels** (devis fournisseurs datés) pour remplacer les
  hypothèses de `lib/economics.ts`.
- Trancher le **statut juridique** du module démontable (conditionne la location).
- KYC/AML + escrow avant toute activation du mode régulé.
