# 🏗️ NOÉMA PROJET — Fichier maître (tout le projet en un document)

> **Ce fichier est la mémoire centrale du projet.** Toute session Claude (locale
> ou web) doit le lire en premier. Dernière mise à jour : 2026-07-09.
> Repo : `constructionzya-boop/sarahballet` · Branche de travail :
> `claude/noema-construction-group-pndut3` · Fondateur : Jeremy
> (constructionzya@gmail.com) · Langue de travail : français.

---

## 1. LE BUSINESS

**Noéma Group** : holding Chine ↔ Afrique de l'Ouest. Cœur : **Noéma
Construction** — modules d'une pièce en béton préfabriqué (*One-Room Precast
Solution*) en **Côte d'Ivoire (Abidjan, marché primaire)** et **Gabon**.
Chine = hub sourcing/moules/logistique.

**Le produit** : tout s'emboîte sans réajustement sur chantier — embase faite,
plaques aux dimensions exactes (tolérances usine ±2-3 mm), câbles posés,
plomberie installée. **Pose en 1 jour**, montage **manuporté** (2-4 personnes,
sans engin).

### Les 3 modèles techniques
| Modèle | Équipement |
|---|---|
| **M1 Basique** | Structure seule |
| **M2 Électricité** | Tableau pré-câblé + prises + éclairage (attente CIE) |
| **M3 Eau+Élec** | M2 + arrivée d'eau + évacuation + cellule sanitaire (attentes CIE+SODECI) |

### Les 5 offres commerciales
Box Commerce (M2, mezzanine possible) · Sanitaire public (M3, 2 cabines H/F) ·
Studio/Chambre (M3, cellule d'eau 1,2×1,8 + kitchenette) · Poste de
gardiennage (M2, vision 270°) · Module brut (M1, produit d'appel).

### Les 4 modes de vente
1. **Achat** (assise « Vendu » : dalle coulée autour des poteaux)
2. **Location** (assise « Location » : skid démontable boulonné → si impayé,
   le module est **démonté et récupéré** = actif mobile, LE différenciateur)
3. **Location-accession** (rent-to-own : acompte ≥ coût, loyers = bénéfice)
4. **Location de terrain par Noéma** (bail 5-10 ans, modules dessus, retrait à la fin)

### Les 4 marques annexes B2B (négoce import Chine — JAMAIS de travaux)
**Étansol** (étanchéité) · **Hydralis** (plomberie/eau) · **Ventalis**
(ventilation/confort) · **Saniva** (sanitaire/hygiène). Elles vendent aux
entreprises et alimentent la nomenclature des modules.

---

## 2. LE PRODUIT TECHNIQUE (état des décisions)

### Système constructif
Poteaux béton **rainurés** + **panneaux horizontaux 1200×600×60 empilés**
glissés dans les rainures, assemblage à sec. **Trame fixe 1,20 m.**
Mur type 2,70 m = 4 panneaux + 1 claustra 300. Soubassement 0,20 m,
bandeau toiture ventilé 0,30 m → **3,20 m hors tout**.
❌ Jamais de panneaux verticaux pleine hauteur (~470 kg, engin obligatoire).

### Nomenclature composants (catalogue fermé)
| Réf | Composant | Dim. |
|---|---|---|
| P1 | Panneau mural standard | 1200×600 |
| P2 | Claustra ventilation (moustiquaire + barreaudage intégrés) | 1200×300 |
| P3 | Fenêtre jalousies alu | 1200×1200 |
| P4 | Porte acier + imposte | 900×2100 + 300 |
| P5 | Casquette brise-soleil béton | 1200×400 |
| P6 | Grille ventilation basse | 600×200 |
| P7 | Plafond léger (composite alu/PU) | 1200×600 |
| P8 | Kit technique mural (citerne + coffret élec) | — |

### Pack climat tropical (différenciateur produit)
- **Toiture froide** : double peau ventilée (lame d'air 300 mm) + tôle claire
  réfléchissante + plafond P7. Gain −6 à −10 °C.
- **Débords 600 mm** 4 côtés + **gouttières + descentes** (défaut universel des
  concurrents — personne n'en met).
- **Ventilation traversante permanente** : claustra haut P2 + grilles basses P6,
  ouvertures en vis-à-vis. Règle de pose : grandes façades N-S, pièce d'eau à l'ouest.
- Casquettes P5 sur toutes les baies ; attentes brasseur d'air/split/solaire moulées.

### Points faibles P0 à corriger dans TOUT livrable (diagnostic ingénierie)
1. Étanchéité joint panneau/poteau (profilé + mastic + larmier, essai aspersion)
2. **Chaînage haut périphérique** (stabilité vent — les concurrents n'en ont pas)
3. Arase étanche + surélévation 200 mm (anti-capillarité)
4. Ancrage/fondation selon sol (étude géotechnique sites institutionnels)

### Preuves marché (analyses vidéo chantiers réels)
- **Brésil (Sorocaba)** : maison 43 m² clé en main 30 jours, 4-5 ouvriers, zéro
  engin, dalle coulée autour des poteaux = notre variante « Vendu ». Leçon :
  structure 5 j, finitions humides 20 j → notre différenciation = finitions usine.
- **Inde (Sud)** : montage 100 % à sec sans dalle, 3-4 personnes, kit un-camion,
  claustra ventilant, panneau-linteau = notre variante « Location ». Faiblesses
  observées : pas de chaînage, pas de gouttières, pose au ras du sol.
- **Kenya (Kingdom Precast)** : brochure de référence — tableau comparatif
  précast vs traditionnel à imiter, cibles écoles/cliniques validées.

### Plan V2 module Studio (3,60×4,80×3,20) — corrections restantes
Axes de trame (4 axes sur 3,60 / 5 axes A-E sur 4,80) · casquettes P5
manquantes sur fenêtres avant · débord à porter à 600 · 5 traverses de skid
(pas 4) · ventilation dédiée cellule sanitaire.
⚠️ Toute dimension = hypothèse V1 « à valider par ingénieur structure agréé ».

---

## 3. LA PLATEFORME WEB (ce repo)

**Monorepo pnpm + Turborepo — 7 sites, 1 socle** :

| App | Domaine | Rôle |
|---|---|---|
| `apps/holding` | noema-group.com | Vitrine du réseau |
| `apps/construction` | noema-construction.com | ★ Site phare (vendre les modules) |
| `apps/connect` | connect.noema-group.com | SaaS : clients, partenaires, back-office |
| `apps/{etansol,hydralis,ventalis,saniva}` | 4 domaines | Marques B2B (template partagé `packages/brand-site`) |

**Stack actée** : Next.js 15 + Tailwind 4 + Payload CMS 3 (multi-tenant) +
NestJS + PostgreSQL 16 + Redis. Mobile-first 3G (LCP < 2,5 s).
**WhatsApp = canal n°1** (deep links partout + Business Cloud API).
**Auth par téléphone OTP** (email optionnel). **Paiements mobile money d'abord**
(CinetPay : Orange Money, MTN MoMo, Wave, Moov). Devises XOF/XAF en centimes.
Matrices de prix **versionnées**. Audit immuable hash chaîné (contrats/paiements).

**Détail complet dans `docs/`** : 00-vision · 01-architecture-technique ·
02-sitemap-holding · 03-sitemap-construction (configurateur 5 étapes) ·
04-sitemaps-marques · 05-noema-connect (RBAC 8 rôles, cycle repossession) ·
06-data-model (schéma SQL complet) · 07-integrations · 08-roadmap.

### Roadmap (docs/08) — règle : VENDRE avant de gérer
- **Phase 0** : fondations monorepo + design system (charte ci-dessous)
- **Phase 1 (MVP commercial)** 🎯 : site construction + leads WhatsApp —
  critère de sortie : premier devis réel envoyé
- Phase 2 : configurateur + API + CRM · Phase 3 : contrats + paiements ·
  Phase 4 : production/pose · Phase 5 : marques annexes

---

## 4. CHARTE GRAPHIQUE

| Nom | Hex | Usage |
|---|---|---|
| Night | `#000A21` | Texte, bandeaux |
| Dawn | `#38577D` | Secondaire |
| Dew | `#BFDEF1` | Accent doux |
| Cream | `#FAF6EB` | Fond |
| Snow | `#F7F1EC` | Fond alt |
| Orange | `#FF3311` | Accent fort (CTA) |

---

## 5. PROCHAINES ÉTAPES BUSINESS (hors code)

1. Prototype physique du Modèle 1 (basique) + essais (montage chrono, aspersion joints).
2. Pré-ventes : 10 visites terrain avec rendus + prix → objectif 3 lettres d'intention.
3. ⚖️ Question juridique CI à trancher (conditionne le modèle location) :
   « Un module démontable posé sans fondation permanente, loué — permis de
   construire ou bien mobile ? » → GUPCCU / juriste ivoirien.
4. Sourcing usine Chine : moules + tolérances ±2-3 mm + coût rendu Abidjan.
5. Cadre juridique location (propriété de l'actif, assurance, réserve de propriété).

---

## 6. VISION & ORGANISATION IA

**Vision** : faire de Noéma le standard du local professionnel et du logement
accessible en Afrique de l'Ouest — un produit industrialisé (pas un chantier),
accessible sans capital (location/rent-to-own), récupérable (actif mobile),
et conçu pour le climat (pack tropical). « Eux vendent des morceaux, nous
livrons la pièce — finie, montée, branchée. »

**Organisation** : Jeremy pilote une équipe d'agents IA spécialisés —
ingénieur bâtiment (diagnostic, décisions D1-D11), stratégie/business
(offres, concurrence, pré-vente), dev plateforme (ce repo, Claude Code
local + web), génération visuelle (Sora/fal.ai, avec boucle générer →
expertiser → corriger). Détail et flux : `docs/09-agents-ia.md`.
Dossiers techniques de référence : `docs/references/`.

## 7. RÈGLES POUR CLAUDE

1. Répondre en **français** ; code et identifiants en anglais.
2. Respecter la **trame 1,20 m** et la **nomenclature P1-P8** partout.
3. Rappeler « hypothèse V1 à valider par ingénieur structure agréé » sur tout
   livrable technique (dimensions, structures, prix).
4. Travailler sur `claude/noema-construction-group-pndut3` — **jamais de push
   sur main** sans demande explicite.
5. `git pull` en début de session ; commits fréquents et descriptifs.
6. Mettre à jour CE fichier quand une décision importante est prise.
