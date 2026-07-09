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

- [ ] Site construction : accueil, 5 fiches offres, /technologie, /realisations,
      /financement (contenu), /devis (formulaire court), guides SEO (5 articles).
- [ ] Simulateur de mensualités (statique, matrice de prix v1 en JSON).
- [ ] CTA WhatsApp partout (deep links payload), numéro Business vérifié.
- [ ] Holding one-page + fiches marques (placeholder marques annexes).
- [ ] Leads → Google Sheet/Airtable temporaire + notification WhatsApp interne
      (l'API attendra la phase 2 — zéro dépendance bloquante pour vendre).

**Critère de sortie : premier devis envoyé à un prospect réel depuis le site.**

## Phase 2 — Configurateur & API (semaines 9-16)

- [ ] `services/api` NestJS + PostgreSQL (schéma doc 06 : parties, leads,
      quotes, module_configs).
- [ ] Configurateur 5 étapes (plan 2D dynamique, BOM, prix exact, PDF devis).
- [ ] CRM minimal dans Connect (`/office/crm`) : pipeline, affectation, relances.
- [ ] Auth OTP téléphone (clients + staff).
- [ ] Migration des leads Airtable → base.

## Phase 3 — Contrats & paiements (semaines 17-24) 🎯 encaisser

- [ ] Contrats générés + e-signature OTP + CGV vente/location/accession.
- [ ] Intégration CinetPay (acomptes, échéances) + webhooks + réconciliation.
- [ ] Échéanciers location & rent-to-own (equity_ratio, reçus PDF).
- [ ] Espace client `/app` : dossiers, timeline, paiements, documents.
- [ ] Notifications WhatsApp templates (devis, échéance, reçu).

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
