# 10 · Noéma Impact — conformité du financement participatif

> ⚠️ Document interne. Le financement participatif immobilier **avec promesse de
> rendement** est une activité **RÉGULÉE** (agrément **PSFP** sous le règlement
> européen ECSP / supervision **AMF** en France ; équivalents **UEMOA/BCEAO**
> pour la Côte d'Ivoire). Ce document fige ce qu'on peut faire **sans licence**,
> et prépare l'architecture régulée sans l'activer.

## Principe directeur

**Aucun titre financier, aucune promesse de rendement en V1.** Le code encode ce
garde-fou : `REGULATED_ENABLED = false` (`lib/invest.ts`) et le feature-flag
`INVEST_MODE` ne peut prendre que des valeurs légales par défaut.

## Les 3 modes (feature-flag `INVEST_MODE`)

### 1. `pionniers` — V1, légal partout ✅ (activé par défaut)
Financement participatif par **don avec contreparties** et **prévente** :
- Contreparties **symboliques/non financières** : nom sur le mur des bâtisseurs,
  rapport photo trimestriel, plaque, visite de chantier (cf. `REWARD_TIERS`).
- Projets **à impact** : écoles, sanitaires publics, logements sociaux.
- Rails de paiement : **CB (Stripe)** + **mobile money (CinetPay)** — les deux
  alimentent la même barre de progression.
- **Interdits** : tout langage de « rendement », « intérêt », « part »,
  « dividende », « retour sur investissement ». Le disclaimer
  `INVEST_DISCLAIMER.pionniers` est affiché sur chaque page.

Base juridique : le don avec contrepartie non financière ne relève pas de
l'offre au public de titres. Rester sous les seuils de la générosité publique et
tenir une compta dédiée par projet (traçabilité des fonds).

### 2. `interet` — V1, légal ✅
**Manifestation d'intérêt** des investisseurs financiers : on collecte
`profil / ticket envisagé / horizon / coordonnées` → CRM, pipeline « future
levée ». **Ce n'est pas** une offre ni une sollicitation (disclaimer
`INVEST_DISCLAIMER.interet`). Objectif : constituer la liste **avant** d'avoir la
licence, pour lever vite le jour venu.

### 3. `regule` — V2, DÉSACTIVÉ 🔒 (structure prête, non activable)
Cible une fois l'agrément obtenu. Architecture documentée ci-dessous.

## Architecture cible du mode régulé (V2)

| Brique | Choix cible | Note |
|---|---|---|
| **Véhicule** | **SPV par projet** (société de projet dédiée) | Isole le risque projet par projet |
| **Instrument** | **Obligations simples** ou **royalties** (redevance sur loyers) | Pas d'actions au public en V1 régulée |
| **Plafonds** | Par investisseur et par projet, selon le régime PSFP | Investisseurs non avertis plafonnés |
| **KYC/AML** | Intégration **Sumsub** (placeholder) | Vérif identité + LCB-FT + PEP/sanctions |
| **Paiements** | Séquestre/escrow jusqu'au closing | Remboursement si objectif non atteint |
| **Reporting** | Timeline Connect (photos, jalons) + reporting réglementaire | Réutilise l'infra existante |

### Le chemin le plus rapide vers la légalité : **partenariat PSFP en marque blanche**
Plutôt que de porter l'agrément nous-mêmes (coûteux, long), **s'adosser à une
plateforme PSFP déjà agréée** et opérer **en marque blanche** :
- Noéma apporte les projets et l'audience ; le partenaire porte la conformité,
  le KYC, l'escrow et l'émission des titres.
- Time-to-market divisé, risque réglementaire externalisé.
- À arbitrer : commission plateforme vs coût/délai d'un agrément propre.
Décision à documenter ici une fois les partenaires sourcés (EU + piste UEMOA).

## Check-list avant d'activer `regule`
1. Agrément PSFP obtenu **ou** contrat marque blanche signé avec un PSFP agréé.
2. KYC/AML en production (Sumsub) + registre des investisseurs.
3. Escrow/séquestre opérationnel + politique de remboursement.
4. Documents d'information réglementaires (KIIS/fiche projet) validés juriste.
5. Plafonds par investisseur implémentés et testés.
6. Revue par un avocat en droit financier (FR **et** UEMOA).

> Tant que ces 6 points ne sont pas cochés, `REGULATED_ENABLED` reste `false`.
