# 08 · Roadmap technique — MVP → V3

Principe : **le site vend avant que la plateforme gère**. On livre dans l'ordre
où le business en a besoin, chaque phase est utilisable seule.

## Phase 0 — Fondations (semaines 1-2)

- [ ] Monorepo pnpm + Turborepo, CI GitHub Actions (lint, typecheck, build).
- [ ] `packages/ui` : tokens charte (Night/Dawn/Dew/Cream/Snow/Orange),
      typographie, 15 composants de base, thèmes par marque.
- [ ] `packages/config` : presets TS/ESLint/Tailwind.
- [ ] Payload CMS déployé (tenants : holding + construction), modèle de contenus.
- [ ] Domaines + DNS + redirections, analytics.

## Phase 1 — MVP commercial (semaines 3-8) 🎯 vendre

**Livrables : `apps/construction` + `apps/holding` (réduit) + capture leads.**

- [x] Site construction : accueil, fiches offres, configurateur, visite 3D.
- [x] Simulateur de mensualités (matrice de prix versionnée, PRICING_V1).
- [x] **Guides SEO (10 articles)** longue traîne + JSON-LD + maillage interne.
- [x] CTA WhatsApp partout (deep links), à brancher sur le numéro Business vérifié.
- [x] **Preuve sociale** (témoignages + compteur branché sur METRICS).
- [x] **Manifeste /vision** + **programme ambassadeurs** (parrainage tracké).
- [ ] Holding one-page + fiches marques (placeholder marques annexes).
- [ ] Leads → CRM temporaire + notification WhatsApp interne (`/api/lead` livré,
      persistance Connect en phase 2).

**Critère de sortie : premier devis envoyé à un prospect réel depuis le site.**

> Ajouté session « plateforme financière » : pricing_v2 (cost-plus volume-first
> + lock-in), calculateur win-win public, dashboard interne `/office/economics`.

## Phase 2 — Configurateur & API (semaines 9-16)

- [ ] `services/api` NestJS + PostgreSQL (schéma doc 06 : parties, leads,
      quotes, module_configs).
- [ ] Configurateur 5 étapes (plan 2D dynamique, BOM, prix exact, PDF devis).
- [ ] CRM minimal dans Connect (`/office/crm`) : pipeline, affectation, relances.
- [ ] Auth OTP téléphone (clients + staff).
- [ ] Migration des leads Airtable → base.

## Phase 3 — Contrats & paiements (semaines 17-24) 🎯 encaisser

- [~] **Checkout CB Stripe livré en avance** (mode test) : PaymentIntents par
      jalons 30/40/30, 3DS2/SCA, Apple/Google Pay, webhooks idempotents signés,
      machine à états COMMANDE→…→LIVRÉ (gardes encaissement/pose). Reste : clés
      prod, persistance DB (`orders`, `processed_webhook_events`), reçus.
- [ ] Contrats générés + e-signature OTP + CGV vente/location/accession.
- [ ] Intégration CinetPay (mobile money) + webhooks + réconciliation (2e rail).
- [ ] Échéanciers location & rent-to-own (equity_ratio, reçus PDF).
- [ ] Espace client `/app` : dossiers, timeline, paiements, documents.
- [ ] Notifications WhatsApp templates (devis, échéance, reçu).

> Critère de sortie : premier acompte réel encaissé en ligne (CB ou mobile money)
> avec dossier passé à ACOMPTE_OK et reçu envoyé.

## Phase 4 — Opérations (semaines 25-32) 🎯 produire & poser

- [ ] `/office/production` : ordres de fabrication, jalons + photos, QC.
- [ ] `units` + traçabilité composants + mouvements (usine→dépôt→site).
- [ ] `/partner` installateurs : ordre de pose, checklist SOP, PV signé (PWA offline).
- [ ] Logistique : tournées, zones (polygones), planning.
- [ ] Cycle repossession complet (relances → suspension → démontage → refurb).

## Phase 5 — Marques annexes (semaines 33-40) 🎯 étendre

- [ ] `packages/brand-site` (template) + lancement Étansol (marque pilote).
- [ ] Catalogue central + Meilisearch + comptes pro (prix masqués).
- [ ] Panier de devis B2B → même pipeline CRM.
- [ ] Puis Hydralis, Ventalis, Saniva (1 semaine/marque une fois le template prêt).

## Phase 6 — Plateforme financière (transverse, séquencée) 🎯 financer

Transformer le site en **plateforme financière du bâtiment** : tout devient
accessible par carte ou mobile money. Séquencée pour rester légale à chaque pas.

- [~] **6.1 Checkout universel CB** = **généralisation du socle livré en Phase 3**
      (mêmes PaymentIntents jalonnés, state machine, webhooks). Ici on industrialise :
      clés prod, persistance des dossiers, reçus WhatsApp/email par jalon, extension
      du checkout à tous les produits du configurateur. Le critère de sortie chiffré
      de ce socle est porté ICI (Phase 3 = premier acompte de preuve ; 6.1 = mise à
      l'échelle). *Critère : 10 acomptes encaissés en ligne sans intervention manuelle.*
- [~] **6.2 Noéma Impact — mode Pionniers** (livré, à activer avec clés) : dons
      avec contreparties + prévente. Rail CB confirmé automatiquement ; le mobile
      money reste un relais WhatsApp tant que l'intégration CinetPay (6.1/Phase 3)
      n'est pas branchée. Mur des bâtisseurs, rapports photo (timeline Connect).
      *Critère : 1 projet à impact intégralement financé et livré.*
- [~] **6.3 Manifestation d'intérêt investisseurs** (livré) : `/investisseurs`
      + data room qualifiante → CRM scoring. *Critère : 20 leads qualifiés, 3 RDV
      fonds/family office.*
- [ ] **6.4 Licence / partenariat PSFP** : signer un partenariat marque blanche
      avec une plateforme PSFP agréée (chemin le plus rapide vers la légalité) —
      ou porter l'agrément. *Critère : contrat signé + KYC/AML en place.*
- [ ] **6.5 Produits d'investissement régulés** (mode `regule`, désactivé
      aujourd'hui) : SPV par projet, obligations/royalties, escrow, plafonds.
      *Critère : `REGULATED_ENABLED=true` après validation des 6 points de
      `docs/10-invest-compliance.md`.*

> Discipline : ne jamais activer `regule` avant licence/partenariat. Les modes
> Pionniers et Intérêt sont légaux partout et se déploient dès maintenant.

## V3+ (opportuniste)

- Portail revendeurs avec commissions automatisées.
- Tracking conteneurs API + coût rendu automatisé (TEC/douane).
- Version anglaise complète (partenaires Chine).
- App mobile native si la PWA montre ses limites terrain.
- Scoring crédit location (historique paiements → offres pré-approuvées).

## Règles d'exécution

1. Jamais plus d'une phase en parallèle ; le MVP commercial prime sur tout.
2. Chaque phase se termine par un test utilisateur réel (un commerçant, un
   commercial, un poseur) — pas de validation en chambre.
3. Les matrices de prix sont **versionnées** dès la phase 1 (JSON commité) —
   un devis référence toujours sa version.
4. Toute la plateforme est en français ; l'anglais attend la V3.
