# DÉCISION — Annulation totale de la règle du démontage (2026-07-19)

> Décideur : Jeremy (fondateur). Statut : **ACTÉE** (option « annulation
> totale » choisie explicitement, après présentation des impacts).
> Tous les agents (SITE, NOEMA_CMO, NOEMA_BET, VISUAL, ARCHI) doivent
> intégrer cette décision à leur prochain `git pull`.

## La décision

1. **Tous les modules Noéma sont DÉFINITIFS (« en dur »)** dès la pose.
2. Le montage ne change pas : empilage à sec manuporté, pose en 1 jour
   sans engin — puis les **rainures sont coulissées au mortier** (calfeutrement
   définitif, remplace garnitures/mastic démontables) [détail TBV BET].
3. **Assise unique** : scellement des poteaux (400) + dalle coulée.
   La **variante skid est SUPPRIMÉE** du catalogue.
4. **Plus aucune promesse ni capacité de reprise** de module.

## Motivation

Simplifier la construction et l'offre : une seule assise, un seul mode de
joint, pas de logistique de reprise.

## Impacts et travaux induits (par agent)

### NOEMA_BET (technique)
- Spécifier le **coulis de rainure** (mortier, séquence, retrait) [TBV].
- Réviser à la prochaine V2 des planches : détail « assise location/skid »
  de PL-03 (obsolète), §5 de l'étude MEP (variante skid), nomenclatures.
- `tools/plans/specs.json` : la section `foundations.rental` devient
  DOCUMENTAIRE (historique) — ne pas l'utiliser dans de nouveaux livrables.
- Gain structure : joints coulissés = rigidité d'ensemble accrue
  (diaphragme) — à exploiter dans les prochains calculs vent.

### NOEMA_CMO (marketing) — RÉVISION OBLIGATOIRE
- STRATEGIE-001 / BENCHMARK-001 : toute mécanique fondée sur « on reprend
  le module » (type M-KOPA/actif récupérable) est **caduque**. Refondre les
  argumentaires location/rent-to-own en crédit-bail classique.
- Le pitch produit devient : « du DUR posé en 1 jour » — c'est désormais
  LE message central (plus fort pour le statut social, plus simple).
- BRAND-BOOK et LEARNINGS à mettre à jour.

### SITE (apps/construction)
- Retirer toutes les mentions « démontable / récupérable / actif mobile »
  (pages offres, investisseurs, FAQ, SEO).
- Pages financement : les modes location/location-accession passent en
  « bientôt disponible — en cours de structuration juridique ».
- Connect (docs/05) : le cycle de reprise est DÉPRÉCIÉ — ne pas le
  développer.

### Juridique / finance (Jeremy + juriste TBV)
- Location & location-accession sans reprise = **crédit non garanti par
  l'actif** : refonte des contrats, scoring client, acomptes plus élevés,
  ou sûretés alternatives (caution, domiciliation mobile money) — À
  CADRER AVANT toute campagne sur ces modes. L'ACHAT comptant/échelonné
  court reste le mode commercialisable immédiatement.

## Ce qui NE change PAS

Trame 1200 · catalogue P1-P9 + P1G · panneaux 1200×600×60 (104 kg,
manuporté) · poteaux rainurés 150×150×2900 · pose 1 jour sans engin ·
toit parasol + pack tropical · zéro coupe sur site · Pack Façade
(SPEC-PACK-FACADE-V1 — l'enduit « Vendu » devient applicable à TOUS les
modules puisque tous sont définitifs).
