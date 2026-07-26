# CLAUDE.md — Contexte projet Noéma Group

## Ce qu'est ce projet

Plateforme web du réseau **Noéma Group** (holding basée entre la Chine et
l'Afrique de l'Ouest) : construction modulaire préfabriquée béton en
**Côte d'Ivoire et au Gabon**. Fondateur : Jeremy (constructionzya@gmail.com).
Langue de travail : **français**.

## Le business (résumé décisionnel)

- **Produit cœur** : *One-Room Precast Solution* — modules d'une pièce en béton
  préfabriqué (poteaux rainurés + panneaux horizontaux empilés, **trame 1,20 m**,
  assemblage à sec, **pose en 1 jour**, montage manuporté sans engin).
- **3 niveaux d'équipement** : M1 basique · M2 électricité · M3 eau+électricité.
- **5 offres** : Box Commerce, Sanitaire public, Studio, Poste de gardiennage,
  Module brut.
- **DÉCISION 2026-07-19 — fin du démontage** : tous les modules sont
  DÉFINITIFS (« en dur »). Montage inchangé (empilage à sec manuporté,
  1 jour), puis **rainures coulissées au mortier** = ouvrage définitif.
  Plus AUCUNE reprise/récupération de module. Voir
  `docs/decisions/2026-07-19-fin-demontage.md`.
- **Modes de vente** : achat · location-accession et location = crédit/bail
  classique SANS reprise d'actif (**cadre juridique à refondre — juriste
  TBV**) · location de terrain.
- **Assise unique** : scellement 400 + dalle coulée. La variante skid est
  SUPPRIMÉE du catalogue (le détail skid des planches PL-03/PL-07 est
  obsolète, à réviser en V2).
- **Marques annexes B2B** (négoce import Chine, JAMAIS de travaux) :
  Étansol (étanchéité), Hydralis (plomberie/eau), Ventalis (ventilation),
  Saniva (sanitaire).
- **Pack climat tropical** (différenciateur) : toiture froide double peau
  ventilée + tôle claire, débords 600 mm + gouttières, claustra haut avec
  moustiquaire/barreaudage + grilles basses (ventilation traversante),
  casquettes brise-soleil, attentes brasseur d'air/split/solaire.

## Composants standardisés (nomenclature produit)

P1 panneau 1200×600 · P2 claustra 1200×300 · P3 fenêtre jalousies 1200×1200 ·
P4 porte 900×2100+imposte · P5 casquette 1200×400 · P6 grille basse ·
P7 plafond léger · P8 kit technique mural (citerne+coffret).
Hauteur mur type 2,70 m (4 panneaux + 1 claustra), soubassement 0,20 m,
bandeau toiture 0,30 m → 3,20 m hors tout.

## Ce repo

Monorepo pnpm + Turborepo de l'écosystème digital (7 sites) :
`apps/holding` (noema-group.com), `apps/construction` (site phare),
`apps/connect` (SaaS clients/partenaires/back-office), `apps/{etansol,hydralis,
ventalis,saniva}` (template partagé `packages/brand-site`).
**Commencer par lire `docs/00-vision.md` puis les docs 01→08** — toute
l'architecture (sitemaps, modèle de données SQL, intégrations, roadmap) y est.

## Décisions techniques actées

- Next.js 15 + Tailwind 4 + Payload CMS 3 (multi-tenant) + NestJS + PostgreSQL.
- Mobile-first 3G, budget LCP < 2,5 s ; **WhatsApp = canal n°1** (deep links
  partout, Business Cloud API pour notifications).
- **Auth par téléphone OTP** (l'email est optionnel) ; paiements **mobile money
  d'abord** via agrégateur CinetPay (Orange Money, MTN MoMo, Wave, Moov).
- Devises XOF (CI) / XAF (GA) ; montants en centimes ; matrices de prix
  **versionnées** ; audit immuable à hash chaîné sur contrats/paiements.
- Roadmap : docs/08 — **Phase 1 = MVP commercial du site construction**
  (vendre avant de gérer). Ne pas commencer Connect avant que le site vende.

## Charte graphique

Night `#000A21` (texte/bandeaux) · Dawn `#38577D` · Dew `#BFDEF1` (accent doux) ·
Cream `#FAF6EB` / Snow `#F7F1EC` (fonds) · Orange `#FF3311` (accent fort).

## Règles pour Claude

1. Répondre en français ; le code et les identifiants en anglais.
2. Respecter la trame 1,20 m et la nomenclature P1-P8 dans tout ce qui touche
   au produit (configurateur, BOM, contenus).
3. Toute dimension/prix technique est une hypothèse V1 « à valider par
   ingénieur structure agréé » — le rappeler dans les livrables techniques.
4. Brancher sur la branche de travail en cours, ne jamais pousser sur main
   sans demande explicite.
