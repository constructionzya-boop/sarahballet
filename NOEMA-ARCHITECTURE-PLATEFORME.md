# 🏗️ NOÉMA — ARCHITECTURE COMPLÈTE DE LA PLATEFORME

> Document unique regroupant les 10 documents d'architecture de l'écosystème
> digital Noéma (7 sites + plateforme Connect + agents IA).
> Généré depuis docs/00-09 · Branche : claude/noema-construction-group-pndut3
> · 2026-07-09.

---


---

# Noéma Group — Plateforme web du réseau

> **Bâtir · Équiper · Durer** — Monorepo de l'écosystème digital Noéma : le site de la holding, les 5 sites de marques, et la plateforme client **Noéma Connect**.

## Le réseau

| Domaine | App | Rôle |
|---|---|---|
| `noema-group.com` | `apps/holding` | Site vitrine de la holding — porte d'entrée du réseau |
| `noema-construction.com` | `apps/construction` | **Site phare** — modules préfabriqués béton (vente, location, location-accession) |
| `connect.noema-group.com` | `apps/connect` | Plateforme SaaS — espace client, portail partenaires, back-office |
| `etansol.com` | `apps/etansol` | Marque produits — étanchéité (import/négoce B2B) |
| `hydralis.com` | `apps/hydralis` | Marque produits — plomberie & adduction d'eau (B2B) |
| `ventalis.com` | `apps/ventalis` | Marque produits — ventilation & confort thermique (B2B) |
| `saniva.com` | `apps/saniva` | Marque produits — sanitaire & hygiène (B2B) |

Les 4 marques annexes **ne réalisent pas de travaux** : elles vendent des produits de niche aux entreprises (sourcing Chine → Afrique de l'Ouest & Centrale). Marchés primaires : **Côte d'Ivoire (Abidjan)** et **Gabon**.

## Structure du monorepo

```
.
├── apps/
│   ├── holding/            # noema-group.com        (Next.js, statique+CMS)
│   ├── construction/       # noema-construction.com (Next.js, catalogue+configurateur)
│   ├── connect/            # connect.noema-group.com (Next.js, app authentifiée)
│   ├── etansol/            # marque annexe          (template partagé brand-site)
│   ├── hydralis/           #        "
│   ├── ventalis/           #        "
│   └── saniva/             #        "
├── packages/
│   ├── ui/                 # Design system Noéma (tokens, composants, thèmes par marque)
│   ├── catalog/            # Modèle produit partagé + SDK catalogue
│   ├── i18n/               # Dictionnaires fr (défaut) / en
│   └── config/             # ESLint, TS, Tailwind presets
├── services/
│   ├── api/                # API centrale (NestJS) — devis, contrats, paiements, CRM
│   └── cms/                # CMS headless (Payload) — contenus des 7 sites
├── docs/                   # ⭐ Architecture détaillée (commencer ici)
├── turbo.json
└── pnpm-workspace.yaml
```

## Documentation d'architecture

| Doc | Contenu |
|---|---|
| [`docs/00-vision.md`](docs/00-vision.md) | Le réseau, les marques, les offres |
| [`docs/01-architecture-technique.md`](docs/01-architecture-technique.md) | Stack, monorepo, infra, sécurité |
| [`docs/02-sitemap-holding.md`](docs/02-sitemap-holding.md) | Arborescence noema-group.com |
| [`docs/03-sitemap-construction.md`](docs/03-sitemap-construction.md) | Arborescence détaillée du site phare |
| [`docs/04-sitemaps-marques-annexes.md`](docs/04-sitemaps-marques-annexes.md) | Template commun des 4 marques |
| [`docs/05-noema-connect.md`](docs/05-noema-connect.md) | Plateforme : rôles, espaces, modules |
| [`docs/06-data-model.md`](docs/06-data-model.md) | Entités, relations, schéma SQL |
| [`docs/07-integrations.md`](docs/07-integrations.md) | Mobile money, WhatsApp, logistique |
| [`docs/08-roadmap.md`](docs/08-roadmap.md) | Phases de livraison MVP → V3 |

## Charte

`Night #000A21` · `Dawn #38577D` · `Dew #BFDEF1` · `Cream #FAF6EB` · `Snow #F7F1EC` · `Orange #FF3311`

Night = texte/bandeaux · Orange = accent fort · Dew = accent doux · Cream/Snow = fonds.

---

# 00 · Vision — Le réseau Noéma et ses offres

## 1. Structure du réseau

```
                        ┌──────────────────────────┐
                        │       NOÉMA GROUP        │
                        │   (holding — vitrine)    │
                        └────────────┬─────────────┘
           ┌───────────────┬─────────┴───────┬───────────────┬──────────────┐
           ▼               ▼                 ▼               ▼              ▼
 ┌──────────────────┐ ┌──────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐
 │      NOÉMA       │ │ ÉTANSOL  │  │ HYDRALIS  │  │ VENTALIS  │  │  SANIVA  │
 │  CONSTRUCTION    │ │étanchéité│  │ plomberie │  │ventilation│  │ sanitaire│
 │  (site phare)    │ │   B2B    │  │  & eau B2B│  │  clim B2B │  │hygiène B2B│
 └────────┬─────────┘ └──────────┘  └───────────┘  └───────────┘  └──────────┘
          │                 ▲              ▲              ▲             ▲
          ▼                 └──────────────┴──── produits de niche ────┘
 ┌──────────────────┐              (import/export Chine → Afrique,
 │  NOÉMA CONNECT   │               vente aux entreprises UNIQUEMENT,
 │ (plateforme SaaS)│               aucune réalisation de travaux)
 └──────────────────┘
```

- **Noéma Construction** est le cœur industriel : la *One-Room Precast Solution* — modules
  d'une pièce entièrement préfabriqués en béton, où tout s'emboîte sans réajustement
  sur chantier (dalle/embase faite, plaques aux dimensions exactes, câbles posés,
  plomberie installée). Objectif : **montage en une journée**.
- **Les 4 marques annexes** sont des canaux commerciaux produits : basées sur le
  sourcing Chine, elles vendent aux professionnels (jamais de pose). Chacune alimente
  aussi la nomenclature des modules Noéma (ex. Étansol → joints/étanchéité toiture,
  Ventalis → claustras/brasseurs d'air, Saniva → blocs sanitaires, Hydralis → réservoirs).
- **Noéma Connect** est la plateforme transverse : espace client, contrats de
  location, paiements mobile money, suivi de production et de pose, portail partenaires.

## 2. Le catalogue Noéma Construction

### Niveaux d'équipement (modèles techniques)

| Modèle | Équipement | Statut réseau |
|---|---|---|
| **M1 — Basique** | Structure seule, sans élec ni eau | Aucun raccordement |
| **M2 — Électricité** | Tableau pré-câblé + prises encastrées + éclairage | Attente CIE |
| **M3 — Eau + Électricité** | M2 + arrivée d'eau, évacuation, cellule sanitaire | Attentes CIE + SODECI |

### Offres commerciales (par usage)

| Offre | Base | Cible |
|---|---|---|
| **Box Commerce** (épicerie, local commercial, mezzanine possible) | M2 | Commerçants, gérants télécom |
| **Sanitaire public** (2 cabines H/F, réservoir, puisard optionnel) | M3 | Écoles, marchés, ONG, chantiers |
| **Studio / Chambre** (cellule d'eau 1,2×1,8 + kitchenette) | M3 | Location résidentielle, annexes |
| **Poste de gardiennage** (vision 270°, guichet) | M2 | Entreprises, résidences |
| **Module brut** (stockage, abri) | M1 | Produit d'appel B2B |

### Modes de commercialisation

1. **Achat** — vente directe, variante d'assise « Vendu » (dalle coulée).
2. **Location** — variante d'assise « Location » (embase démontable, skid boulonné) :
   si le client cesse de payer, le module est **démonté et récupéré** (actif mobile).
3. **Location-accession (rent-to-own)** — acompte couvrant le coût, loyers = bénéfice,
   transfert de propriété au terme.
4. **Location de terrain par Noéma** — bail 5-10 ans, modules en location dessus,
   retrait total en fin de bail.

### Différenciateurs produit (pack climat tropical)

- Toiture froide double peau ventilée (lame d'air 300 mm) + tôle réfléchissante.
- Débords 600 mm + gouttières + descentes (défaut universel du marché corrigé).
- Ventilation traversante permanente : claustra haut (moustiquaire + barreaudage
  intégrés) + grilles basses.
- Casquettes brise-soleil sur toutes les baies, fenêtres à jalousies.
- Attentes actives moulées en usine : brasseur d'air, réservation split, kit solaire.

## 3. Marchés & implantations

| Zone | Rôle |
|---|---|
| **Côte d'Ivoire (Abidjan)** | Marché primaire — déficit ~600 000 logements, objectif national 500 000 logements sociaux |
| **Gabon** | Base secondaire |
| **Chine** | Hub sourcing, production des moules, logistique |

Rayon de livraison : défini autour du dépôt/usine (Grand Abidjan d'abord).

## 4. Publics des sites

| Public | Sites concernés | Besoin |
|---|---|---|
| Particulier / petit commerçant | construction | Voir les modules, prix, financement, commander |
| Institutionnel (école, ONG, État) | construction, holding | Dossier technique, références, appel d'offres |
| Entreprise acheteuse de produits | 4 marques annexes | Catalogue B2B, devis, MOQ, délais import |
| Client sous contrat | connect | Payer, suivre son dossier, SAV |
| Partenaire / revendeur | connect | Commandes, stocks, commissions |
| Interne (commercial, production, pose) | connect (back-office) | CRM, ordres de fabrication, planning pose |
| Investisseur / presse | holding | Crédibilité, gouvernance, contact |

---

# 01 · Architecture technique

## 1. Principes directeurs

1. **Un monorepo, sept fronts, un socle.** Les 7 sites partagent design system,
   catalogue, i18n et API — chaque marque garde son domaine, son thème et son SEO.
2. **Contenu découplé.** Un seul CMS headless multi-tenant sert les 7 sites :
   les équipes éditent sans déploiement.
3. **Le web doit marcher là où sont les clients.** Cible : mobile bas de gamme,
   3G instable, data chère → rendu statique/ISR par défaut, images optimisées,
   pages < 200 Ko critiques, PWA offline pour Connect.
4. **WhatsApp est un canal de premier ordre** (pas un gadget) : chaque parcours
   aboutit à « continuer sur WhatsApp » autant qu'à un formulaire.
5. **Paiement local d'abord** : Orange Money, MTN MoMo, Wave, Moov via agrégateur —
   la carte bancaire est secondaire.

## 2. Stack

| Couche | Choix | Justification |
|---|---|---|
| Front | **Next.js 15** (App Router, RSC) | ISR/SSG, i18n, un framework pour les 7 apps |
| UI | **Tailwind CSS 4** + tokens `@noema/ui` | Thémable par marque, poids minimal |
| CMS | **Payload CMS 3** (multi-tenant) | Headless, self-host, localisation fr/en, admin FR |
| API métier | **NestJS 11** (`services/api`) | Devis, contrats, paiements, CRM — modulaire |
| DB | **PostgreSQL 16** | Transactionnel (contrats/paiements) + JSONB (configurateur) |
| Cache/queues | **Redis** + BullMQ | Sessions, files (notifications, webhooks paiement) |
| Stockage | S3-compatible (Cloudflare R2) | Plans PDF, photos chantier, docs contrats |
| Auth | **Auth.js** + OTP SMS/WhatsApp | Le téléphone est l'identifiant primaire (pas l'email) |
| Recherche | Meilisearch | Catalogue produits des 4 marques |
| Analytics | Plausible (self-host) | RGPD-friendly, léger |
| Monorepo | **pnpm workspaces + Turborepo** | Builds incrémentaux, CI rapide |
| CI/CD | GitHub Actions | Lint, tests, preview par app, deploy |
| Hébergement | Vercel (fronts) + Fly.io/VPS (api, cms, db) | Edge CDN Afrique (Johannesburg/Europe Sud) |

## 3. Topologie

```
                       ┌───────────────── CDN / Edge ─────────────────┐
                       │                                              │
   noema-group.com   noema-construction.com   etansol.com … saniva.com   connect.noema-group.com
        │                     │                     │                        │
   [apps/holding]      [apps/construction]    [apps/brand-*]           [apps/connect]
        │  ISR/SSG            │ ISR + îlots         │ ISR                   │ SSR auth (PWA)
        └──────────┬──────────┴──────────┬──────────┘                       │
                   ▼                     ▼                                  ▼
             ┌──────────┐          ┌──────────────┐                 ┌──────────────┐
             │ Payload  │          │  Meilisearch │                 │ services/api │
             │   CMS    │          └──────────────┘                 │   (NestJS)   │
             └────┬─────┘                                           └──────┬───────┘
                  │            ┌──────────────── intégrations ─────────────┤
                  ▼            ▼               ▼              ▼            ▼
             ┌──────────┐ ┌─────────┐  ┌────────────┐  ┌──────────┐ ┌─────────┐
             │PostgreSQL│ │  Redis  │  │ Agrégateur │  │ WhatsApp │ │ R2 / S3 │
             └──────────┘ └─────────┘  │  paiement  │  │ Business │ └─────────┘
                                       │(CinetPay…) │  │Cloud API │
                                       └────────────┘  └──────────┘
```

## 4. Multi-marques : le pattern « brand-site »

Les 4 marques annexes partagent **une seule base de code** (`packages/brand-site`) :

```ts
// apps/etansol/site.config.ts
export default defineBrandSite({
  brand: "etansol",
  domain: "etansol.com",
  theme: { accent: "#1B7A5A", ... },     // dérivé des tokens @noema/ui
  catalogSegment: "etancheite",           // filtre du catalogue central
  markets: ["CI", "GA"],
  contact: { whatsapp: "+225...", ... },
});
```

Ajouter une 5ᵉ marque = 1 dossier `apps/`, 1 fichier de config, 1 tenant CMS.
Zéro duplication de composants.

## 5. i18n & multi-marché

- Locale par défaut **fr** (CI/GA) ; **en** pour sourcing/partenaires Chine.
- Prix multi-devises : **XOF** (CI), **XAF** (GA) — même parité FCFA, mais
  affichage et comptabilité séparés par marché.
- Contenu par marché via champ `market` dans le CMS (un produit peut être
  disponible en CI mais pas au GA).

## 6. Sécurité & conformité

- Contrats et paiements : audit log immuable (table append-only + hash chaîné).
- KYC léger côté location (pièce d'identité + géoloc du site de pose).
- Sauvegardes PostgreSQL chiffrées quotidiennes, rétention 30 j.
- RBAC strict sur Connect (voir doc 05) ; secrets via variables d'env chiffrées.
- Conformité locale : mentions légales par entité juridique (holding CI, filiales),
  CGV distinctes vente / location / location-accession.

## 7. Performance (budget)

| Page | Budget | Stratégie |
|---|---|---|
| Home marques/holding | LCP < 2,5 s en 3G | SSG, hero AVIF < 80 Ko, zéro JS bloquant |
| Fiche module | LCP < 3 s | ISR, galerie lazy, configurateur en îlot différé |
| Connect (app) | TTI < 4 s | PWA, cache offline, pagination serveur |

---

# 02 · Sitemap — noema-group.com (holding)

Rôle : crédibiliser le réseau, router chaque visiteur vers la bonne marque,
servir les publics corporate (institutionnels, investisseurs, presse, talents).

```
noema-group.com
│
├── /                              Accueil
│   ├─ Hero : « Bâtir · Équiper · Durer » + vidéo réseau
│   ├─ Le réseau en 5 cartes (Construction ★ + 4 marques) → sites dédiés
│   ├─ Chiffres clés (modules posés, délai de pose, pays)
│   ├─ Bandeau offre phare : One-Room Precast (CTA → construction)
│   └─ Actualités récentes (3) + CTA carrières/contact
│
├── /groupe                        Qui sommes-nous
│   ├── /groupe/histoire           Fondation, vision, fondateurs
│   ├── /groupe/implantations      CI · Gabon · Chine (carte interactive)
│   ├── /groupe/gouvernance        Direction, entités juridiques
│   └── /groupe/engagements        Qualité, climat tropical, emploi local
│
├── /marques                       Le réseau
│   ├── /marques/noema-construction   Fiche + redirection site
│   ├── /marques/etansol              Fiche + redirection site
│   ├── /marques/hydralis             "
│   ├── /marques/ventalis             "
│   └── /marques/saniva               "
│
├── /solutions                     Vue transverse par besoin (SEO)
│   ├── /solutions/commerce            → Box Commerce (construction)
│   ├── /solutions/education-sante     → Sanitaires & classes modulaires
│   ├── /solutions/logement            → Studios, location-accession
│   └── /solutions/entreprises         → Gardiennage, stockage, produits B2B
│
├── /institutionnels               Espace grands comptes / État / ONG
│   ├─ Références & études de cas
│   ├─ Dossiers techniques téléchargeables (fiches, PV d'essais)
│   └─ Formulaire appel d'offres (→ CRM, routage commercial)
│
├── /actualites                    Blog corporate (chantiers, jalons, presse)
│   └── /actualites/[slug]
│
├── /carrieres                     Offres + candidature spontanée
├── /contact                       Formulaire routé par sujet + WhatsApp + carte
│
├── /mentions-legales · /confidentialite · /cgu
└── /en/*                          Miroir anglais (partenaires, sourcing)
```

## Composants clés

- **BrandSwitcher** (header) : accès permanent aux 5 sites du réseau — présent
  sur les 7 sites (sentiment de groupe).
- **TrustBar** : agréments, laboratoire (LBTP), assurances — réutilisé partout.
- **CaseStudyCard** : étude de cas normalisée (photo avant/après, délai, usage).

## SEO

- Schema.org `Organization` + `Brand` par marque, maillage inter-domaines.
- Cocon « solutions » = requêtes génériques (« kiosque béton abidjan »,
  « toilettes préfabriquées école ») qui redistribuent vers les sites marques.

---

# 03 · Sitemap — noema-construction.com (site phare)

Rôle : vendre les modules. Trois parcours d'achat distincts (particulier /
commerçant / institutionnel), un configurateur, trois modes de financement.

```
noema-construction.com
│
├── /                                    Accueil
│   ├─ Hero produit : module posé « en 1 jour » (vidéo timelapse pose)
│   ├─ Sélecteur d'entrée : « Je veux... » (vendre / loger / équiper / sécuriser)
│   ├─ Les 3 modèles (M1/M2/M3) en comparatif rapide
│   ├─ Bandeau financement : Achat · Location · Location-accession
│   ├─ Tableau « Noéma vs construction traditionnelle » (8 lignes)
│   ├─ Preuves : chantiers livrés, chrono de pose, garanties
│   └─ CTA : Configurer mon module / WhatsApp direct
│
├── /modules                             Catalogue
│   ├── /modules/box-commerce            Fiche offre (base M2)
│   ├── /modules/sanitaire-public        Fiche offre (base M3)
│   ├── /modules/studio                  Fiche offre (base M3)
│   ├── /modules/poste-gardiennage       Fiche offre (base M2)
│   ├── /modules/module-brut             Fiche offre (base M1)
│   └── /modules/comparateur             Tableau comparatif complet
│
│   ── Structure d'une fiche offre ──────────────────────────────
│   │ Galerie (rendus + photos réelles) · Plan coté interactif
│   │ Dimensions/trame · Niveau d'équipement (M1/M2/M3)
│   │ Pack climat (toiture froide, claustra, casquettes) — argumentaire
│   │ Variantes d'assise : Vendu (dalle) / Location (skid démontable)
│   │ Prix « à partir de » par mode de financement (XOF/XAF)
│   │ Délais (fabrication + pose 1 jour) · Zone de livraison
│   │ FAQ spécifique · Docs téléchargeables (fiche PDF)
│   │ CTA : Configurer / Demander un devis / WhatsApp
│   ─────────────────────────────────────────────────────────────
│
├── /configurateur                       ⭐ Parcours guidé (îlot React)
│   ├─ Étape 1 : usage (commerce/sanitaire/studio/gardiennage/brut)
│   ├─ Étape 2 : taille (travées de 1,20 m — plan 2D dynamique)
│   ├─ Étape 3 : équipement (M1/M2/M3 + options : mezzanine, casquettes,
│   │            claustra sup., kit solaire, pré-équipement split, citerne)
│   ├─ Étape 4 : assise (Vendu/Location) + localisation (zone de pose)
│   ├─ Étape 5 : financement (achat / location / location-accession)
│   │            → simulateur de mensualités
│   └─ Sortie : devis PDF instantané + n° dossier → CRM + envoi WhatsApp
│
├── /financement                         Les 3 modes expliqués
│   ├── /financement/achat
│   ├── /financement/location            (module récupérable, dépôt, durées)
│   ├── /financement/location-accession  (simulateur rent-to-own)
│   └── /financement/simulateur          Simulateur global (îlot)
│
├── /technologie                         La preuve technique
│   ├── /technologie/systeme             Poteaux rainurés + panneaux (schémas)
│   ├── /technologie/pose-en-1-jour      SOP 8 étapes, vidéo chantier
│   ├── /technologie/climat-tropical     Pack rafraîchissement (−5 à −8 °C)
│   ├── /technologie/qualite             Tolérances ±2-3 mm, essais, LBTP
│   └── /technologie/demontabilite       L'actif mobile (location)
│
├── /realisations                        Preuve sociale
│   ├── /realisations/[slug]             Étude de cas (photos, chrono, client)
│   └── /realisations/carte              Carte des modules posés
│
├── /pro                                 Espace institutionnels & revendeurs
│   ├─ Dossier technique complet (plans, PV, assurances)
│   ├─ Programme revendeur / partenaire pose
│   └─ Formulaire appel d'offres volumique
│
├── /guides                              Contenu SEO local
│   ├── /guides/permis-construire-cote-divoire
│   ├── /guides/prix-kiosque-abidjan
│   ├── /guides/toilettes-ecole-normes
│   └── /guides/[slug]                   (cocon sémantique CI/GA)
│
├── /devis                               Formulaire court (fallback configurateur)
├── /contact                             Agences, WhatsApp, rappel gratuit
├── /suivi/[numero-dossier]              Suivi public léger → redirige Connect
│
├── /mentions-legales · /cgv-vente · /cgv-location · /confidentialite
└── /en/*                                Version anglaise réduite
```

## Parcours de conversion (3 personas)

| Persona | Entrée | Chemin | Conversion |
|---|---|---|---|
| Commerçant | Facebook/WhatsApp → fiche Box Commerce | fiche → simulateur location | Devis WhatsApp + acompte mobile money |
| Institutionnel | Google « toilettes école » → guide SEO | guide → sanitaire-public → /pro | Dossier AO + RDV commercial |
| Diaspora (achat pour la famille) | Google/diaspora → studio | configurateur → achat | Paiement échelonné à distance |

## Règles métier front

- Prix affichés « à partir de », calcul exact **uniquement** via configurateur
  (params : travées, équipement, assise, zone → matrice de prix versionnée).
- Zone de livraison contrôlée à l'étape 4 : hors rayon → capture lead
  « ouverture prochaine » au lieu d'un devis.
- Chaque CTA a un équivalent WhatsApp (deep link avec payload du dossier).

---

# 04 · Sitemap commun — marques annexes (Étansol · Hydralis · Ventalis · Saniva)

Les 4 sites partagent **le même template** (`packages/brand-site`), différencié
par thème, catalogue et contenus. Positionnement : **négoce B2B de produits de
niche importés** (aucune prestation de travaux).

## Template d'arborescence

```
{marque}.com
│
├── /                                Accueil marque
│   ├─ Hero : promesse métier de la marque
│   ├─ Catégories phares (4-6) → catalogue
│   ├─ Bandeau « produit intégré aux modules Noéma » (cross-sell réseau)
│   ├─ Références clients B2B + logos
│   └─ CTA : Catalogue / Devis pro / WhatsApp commercial
│
├── /catalogue                       Catalogue B2B (Meilisearch)
│   ├── /catalogue/[categorie]
│   └── /catalogue/[categorie]/[produit]
│       │ Fiche : specs, certifications, conditionnement,
│       │ MOQ (quantité minimale), délai (stock local vs import),
│       │ prix pro sur demande (connexion compte pro = prix visibles)
│       └ CTA : Ajouter au devis / Télécharger fiche technique
│
├── /devis                           Panier de devis multi-produits
│   └─ Sortie : demande chiffrée → CRM + notification commercial
│
├── /compte-pro                      Inscription entreprise (RCCM, secteur)
│   └─ Une fois validé → prix visibles + historique devis (via Connect SSO)
│
├── /expertise                       Contenu technique SEO
│   └── /expertise/[slug]            Guides métier (ex. « choisir son
│                                    étanchéité toiture en zone tropicale »)
│
├── /marque                          À propos + rattachement Noéma Group
├── /contact                         WhatsApp pro, dépôt, horaires
└── /mentions-legales · /cgv-pro
```

## Spécialisation par marque

| Marque | Segment catalogue | Catégories types | Lien modules Noéma |
|---|---|---|---|
| **Étansol** | `etancheite` | Membranes, mastics/joints, larmiers, peintures élastomères, cool-roof | Joints rainure P-系, étanchéité toiture |
| **Hydralis** | `plomberie-eau` | Réservoirs, pompes, tuyauterie PVC/PPR, robinetterie, filtration, puisards préfa | Kit technique P8, réseaux M3 |
| **Ventalis** | `ventilation-confort` | Brasseurs d'air, extracteurs, grilles/claustras, isolants minces, splits | Claustras P2, plafond P7, attentes actives |
| **Saniva** | `sanitaire-hygiene` | Cuvettes, lavabos, douches, cloisons sanitaires, accessibilité PMR, sèche-mains | Cellule d'eau M3, sanitaire public |

## Règles B2B communes

- **Prix masqués par défaut** → visibles après validation compte pro
  (levier de qualification commerciale + conformité négoce).
- Stock affiché en 3 états : *Stock Abidjan* / *Stock Libreville* / *Sur import
  (délai X semaines)* — géré dans le catalogue central.
- Devis = objet partagé avec l'API centrale (même pipeline CRM que Construction).
- Cross-sell systématique : chaque fiche produit référence les modules Noéma
  compatibles, et inversement (champ `compatibleModules[]`).

---

# 05 · Noéma Connect — plateforme SaaS du réseau

`connect.noema-group.com` — application authentifiée (PWA, offline-first pour
les équipes terrain). C'est ici que vivent les contrats, les paiements et
l'opérationnel. **Auth par téléphone (OTP SMS/WhatsApp)**, l'email est optionnel.

## 1. Rôles (RBAC)

| Rôle | Qui | Périmètre |
|---|---|---|
| `client` | Acheteur/locataire | Ses dossiers, paiements, SAV |
| `client_pro` | Entreprise (marques annexes) | Devis B2B, prix pro, commandes |
| `partner_reseller` | Revendeur agréé | Leads affectés, commissions, stock alloué |
| `partner_installer` | Équipe de pose partenaire | Ordres de pose, checklists, photos |
| `staff_sales` | Commercial Noéma | CRM, devis, contrats de son portefeuille |
| `staff_ops` | Production/logistique | Ordres de fabrication, stocks, tournées |
| `staff_finance` | Finance | Encaissements, relances, impayés, exports |
| `admin` | Direction | Tout + paramétrage (prix, zones, catalogue) |

## 2. Espace client (`/app`)

```
/app
├── /dashboard            Vue synthèse : dossiers actifs, prochaine échéance
├── /dossiers/[id]        Le cœur : cycle de vie du module
│   ├─ Timeline : Devis → Contrat → Acompte → Fabrication → Livraison
│   │             → Pose (J-day) → Réception → (Location : échéances)
│   ├─ Documents : devis PDF, contrat signé, PV de réception, garanties
│   ├─ Suivi fabrication : jalons usine avec photos
│   └─ Suivi pose : date planifiée, équipe, checklist réception
├── /paiements
│   ├─ Échéancier (location / location-accession) + barre de progression
│   │  rent-to-own (« vous possédez 34 % de votre module »)
│   ├─ Payer une échéance : Orange Money / MTN MoMo / Wave / Moov / carte
│   └─ Reçus téléchargeables + historique
├── /sav                  Tickets (fuite, joint, élec) avec photos, SLA affiché
└── /profil               KYC, téléphone, adresse de pose, bénéficiaires
```

**Logique location (l'actif mobile)** : échéance impayée → relances J+3/J+7
(WhatsApp + SMS) → J+30 suspension → J+45 ordre de démontage (statut
`repossession`) → module retourne au stock reconditionnement. Tout est
tracé dans la timeline du dossier.

## 3. Portail partenaires (`/partner`)

```
/partner
├── /leads                Leads affectés (revendeur), statuts, relances
├── /commandes            Commandes fermes, acomptes, marges/commissions
├── /poses                (installateurs) Planning, ordre de pose du jour,
│                         checklist SOP 8 étapes, upload photos avant/après,
│                         signature client sur écran (PV de réception)
└── /paiements            Relevé de commissions, factures partenaire
```

## 4. Back-office (`/office`)

```
/office
├── /crm                  Pipeline : Lead → Qualifié → Devis → Négo → Signé
│   ├─ Leads entrants (configurateur, formulaires, WhatsApp, marques annexes)
│   ├─ Scoring simple (usage, zone, budget, délai)
│   └─ Relances automatisées (templates WhatsApp approuvés)
├── /devis-contrats       Génération contrat depuis devis, e-signature OTP,
│                         CGV par mode (vente/location/accession), avenants
├── /production           Ordres de fabrication par module
│   ├─ Nomenclature générée depuis le configurateur (BOM P1→P8)
│   ├─ Jalons : moulage → cure → finition usine → contrôle qualité (PCQ)
│   └─ N° de série par composant (traçabilité casse/SAV)
├── /stocks               Composants (usine, dépôt Abidjan, dépôt Libreville)
│   └─ Modules reconditionnés (retours location) avec état
├── /logistique           Tournées de livraison, affectation équipes de pose,
│                         optimisation par zone (rayon de rentabilité)
├── /finance              Encaissements agrégateur, rapprochement, impayés,
│                         export comptable (SYSCOHADA), reporting par entité
├── /catalogue            Administration prix (matrice versionnée), options,
│                         zones de livraison, produits marques annexes
└── /parametres           Utilisateurs, rôles, entités juridiques, taxes
```

## 5. Modules transverses

- **Notifications** : file BullMQ → WhatsApp Business API (templates),
  SMS fallback, email si présent. Événements : devis prêt, acompte reçu,
  date de pose, échéance J-3, reçu de paiement, ticket SAV.
- **Documents** : génération PDF serveur (devis, contrats, reçus, PV) —
  gabarits par entité juridique et par marché (CI/GA).
- **Audit** : toute écriture sur contrat/paiement → événement immuable
  (qui, quoi, quand, avant/après).
- **Offline** (équipes pose) : checklist et photos en local, sync à la
  reconnexion (conflits résolus côté serveur, last-write-wins par champ).

---

# 06 · Modèle de données

PostgreSQL 16. Conventions : `snake_case`, UUID v7, `created_at/updated_at`
partout, soft-delete (`deleted_at`) sur les entités métier, montants en
**centimes XOF/XAF** (`amount_cents` + `currency`).

## 1. Vue d'ensemble

```
 brands ──< products ──< product_variants          (catalogue 5 marques)
                │
 module_types ──< module_configs                    (configurateur)
                │
 parties ──< leads ──< quotes ──< contracts ──< payment_schedules ──< payments
    │                     │           │
    │                     │           ├──< contract_events (audit immuable)
    │                     │           └──< documents
    │                     │
    │                  quote_items (modules OU produits marques)
    │
    ├──< sites (lieux de pose)                     units ──< unit_components
    │                                                 │        (n° série P1..P8)
    └──< tickets (SAV)                                └──< unit_movements
                                                        (usine→dépôt→pose→retour)
 work_orders (fabrication) · installation_orders (pose) · stock_locations
```

## 2. Tables principales

### Référentiel & catalogue

```sql
-- Marques du réseau (noema-construction, etansol, hydralis, ventalis, saniva)
CREATE TABLE brands (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  domain text NOT NULL,
  theme jsonb NOT NULL DEFAULT '{}'
);

-- Produits B2B des marques annexes
CREATE TABLE products (
  id uuid PRIMARY KEY,
  brand_id uuid NOT NULL REFERENCES brands(id),
  category text NOT NULL,               -- ex. 'membranes', 'reservoirs'
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  specs jsonb NOT NULL DEFAULT '{}',    -- fiches techniques structurées
  moq int NOT NULL DEFAULT 1,
  compatible_modules text[] DEFAULT '{}',-- cross-sell vers module_types
  markets text[] NOT NULL DEFAULT '{CI}',-- CI, GA
  status text NOT NULL DEFAULT 'active'
);

CREATE TABLE product_variants (
  id uuid PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id),
  label text NOT NULL,                  -- dimension/couleur/épaisseur
  price_pro_cents bigint,               -- NULL = prix sur demande
  currency text NOT NULL DEFAULT 'XOF',
  stock_state text NOT NULL DEFAULT 'import', -- abidjan|libreville|import
  lead_time_days int
);

-- Types de modules Noéma Construction (box-commerce, sanitaire-public, ...)
CREATE TABLE module_types (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  base_level text NOT NULL CHECK (base_level IN ('M1','M2','M3')),
  name text NOT NULL,
  base_bays_w int NOT NULL, base_bays_d int NOT NULL,  -- travées 1,20 m
  spec jsonb NOT NULL DEFAULT '{}'      -- trame, hauteurs, pack climat
);

-- Une configuration issue du configurateur (immuable une fois devisée)
CREATE TABLE module_configs (
  id uuid PRIMARY KEY,
  module_type_id uuid NOT NULL REFERENCES module_types(id),
  bays_w int NOT NULL, bays_d int NOT NULL,
  level text NOT NULL CHECK (level IN ('M1','M2','M3')),
  base_type text NOT NULL CHECK (base_type IN ('sold_slab','rental_skid')),
  options jsonb NOT NULL DEFAULT '{}',  -- mezzanine, solaire, split, citerne…
  bom jsonb NOT NULL,                   -- nomenclature P1..P8 calculée
  price_matrix_version int NOT NULL,    -- version de la grille tarifaire
  computed_price_cents bigint NOT NULL,
  currency text NOT NULL
);
```

### Parties, ventes, contrats

```sql
-- Toute personne physique/morale (client, entreprise, partenaire)
CREATE TABLE parties (
  id uuid PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('person','company')),
  phone text UNIQUE NOT NULL,           -- identifiant primaire (E.164)
  full_name text NOT NULL,
  email text,
  company_fields jsonb,                 -- RCCM, secteur (comptes pro)
  kyc jsonb NOT NULL DEFAULT '{}',
  market text NOT NULL DEFAULT 'CI'
);

CREATE TABLE leads (
  id uuid PRIMARY KEY,
  party_id uuid REFERENCES parties(id),
  brand_id uuid NOT NULL REFERENCES brands(id),
  source text NOT NULL,                 -- configurateur|whatsapp|form|reseller
  payload jsonb NOT NULL DEFAULT '{}',
  assignee_id uuid,                     -- staff_sales / partner_reseller
  stage text NOT NULL DEFAULT 'new',    -- new|qualified|quoted|nego|won|lost
  zone text                             -- contrôle rayon de livraison
);

CREATE TABLE quotes (
  id uuid PRIMARY KEY,
  number text UNIQUE NOT NULL,          -- Q-CI-2026-000123
  lead_id uuid REFERENCES leads(id),
  party_id uuid NOT NULL REFERENCES parties(id),
  sale_mode text NOT NULL CHECK (sale_mode IN
    ('purchase','rental','rent_to_own','b2b_products')),
  total_cents bigint NOT NULL, currency text NOT NULL,
  valid_until date,
  status text NOT NULL DEFAULT 'draft'  -- draft|sent|accepted|expired
);

CREATE TABLE quote_items (
  id uuid PRIMARY KEY,
  quote_id uuid NOT NULL REFERENCES quotes(id),
  module_config_id uuid REFERENCES module_configs(id),
  product_variant_id uuid REFERENCES product_variants(id),
  qty int NOT NULL DEFAULT 1,
  unit_price_cents bigint NOT NULL,
  CHECK (module_config_id IS NOT NULL OR product_variant_id IS NOT NULL)
);

CREATE TABLE contracts (
  id uuid PRIMARY KEY,
  number text UNIQUE NOT NULL,          -- C-CI-2026-000089
  quote_id uuid NOT NULL REFERENCES quotes(id),
  party_id uuid NOT NULL REFERENCES parties(id),
  sale_mode text NOT NULL,
  legal_entity text NOT NULL,           -- entité juridique signataire
  site_id uuid REFERENCES sites(id),    -- lieu de pose
  status text NOT NULL DEFAULT 'draft',
  -- draft|signed|active|completed|defaulted|repossessed|terminated
  signed_at timestamptz,
  terms jsonb NOT NULL DEFAULT '{}'     -- durée, dépôt, clause de reprise
);

-- Audit immuable (append-only, hash chaîné)
CREATE TABLE contract_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  actor_id uuid,
  event_type text NOT NULL,             -- signed|payment|reminder|suspend|...
  data jsonb NOT NULL DEFAULT '{}',
  prev_hash bytea, this_hash bytea NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

### Paiements

```sql
CREATE TABLE payment_schedules (
  id uuid PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  seq int NOT NULL,                     -- 0 = acompte
  due_date date NOT NULL,
  amount_cents bigint NOT NULL, currency text NOT NULL,
  kind text NOT NULL,                   -- deposit|rent|installment|balance
  equity_ratio numeric(5,4),            -- rent-to-own : part acquise cumulée
  status text NOT NULL DEFAULT 'pending',-- pending|paid|late|waived
  UNIQUE (contract_id, seq)
);

CREATE TABLE payments (
  id uuid PRIMARY KEY,
  schedule_id uuid REFERENCES payment_schedules(id),
  contract_id uuid NOT NULL REFERENCES contracts(id),
  provider text NOT NULL,               -- orange_money|mtn_momo|wave|moov|card
  provider_ref text UNIQUE,             -- ref transaction agrégateur
  amount_cents bigint NOT NULL, currency text NOT NULL,
  status text NOT NULL DEFAULT 'initiated',
  -- initiated|pending|confirmed|failed|refunded  (webhook-driven)
  confirmed_at timestamptz,
  raw_webhook jsonb
);
```

### Production, unités physiques, pose

```sql
CREATE TABLE work_orders (                -- ordre de fabrication
  id uuid PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  module_config_id uuid NOT NULL REFERENCES module_configs(id),
  status text NOT NULL DEFAULT 'queued',
  -- queued|molding|curing|finishing|qc|ready
  qc_report jsonb,
  milestones jsonb NOT NULL DEFAULT '[]' -- [{step, at, photo_url}]
);

CREATE TABLE units (                      -- le module physique (actif)
  id uuid PRIMARY KEY,
  serial text UNIQUE NOT NULL,            -- NM-2026-00042
  module_config_id uuid NOT NULL REFERENCES module_configs(id),
  contract_id uuid REFERENCES contracts(id),   -- NULL = en stock
  state text NOT NULL DEFAULT 'in_production',
  -- in_production|in_stock|installed|rented|repossessed|refurb|scrapped
  condition_grade text                     -- A|B|C (reconditionnement)
);

CREATE TABLE unit_components (            -- traçabilité P1..P8
  id uuid PRIMARY KEY,
  unit_id uuid NOT NULL REFERENCES units(id),
  component_ref text NOT NULL,            -- P1..P8
  serial text UNIQUE NOT NULL,
  batch text                              -- lot béton / fournisseur
);

CREATE TABLE unit_movements (             -- cycle de vie logistique
  id uuid PRIMARY KEY,
  unit_id uuid NOT NULL REFERENCES units(id),
  from_location text, to_location text,   -- usine|depot_abj|depot_lbv|site:<id>
  reason text NOT NULL,                   -- delivery|install|repossess|refurb
  moved_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE installation_orders (        -- ordre de pose
  id uuid PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  unit_id uuid NOT NULL REFERENCES units(id),
  team_party_id uuid REFERENCES parties(id),  -- partner_installer
  scheduled_date date,
  checklist jsonb NOT NULL DEFAULT '[]',  -- SOP 8 étapes + photos
  customer_signature_url text,            -- PV de réception signé
  status text NOT NULL DEFAULT 'planned'  -- planned|onsite|done|aborted
);

CREATE TABLE sites (                      -- lieu de pose
  id uuid PRIMARY KEY,
  party_id uuid NOT NULL REFERENCES parties(id),
  label text, geo point, zone text,
  land_tenure jsonb                       -- ACD/bail — statut foncier déclaré
);

CREATE TABLE tickets (                    -- SAV
  id uuid PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  unit_id uuid REFERENCES units(id),
  category text NOT NULL,                 -- leak|electrical|structure|other
  description text, photos text[],
  sla_due timestamptz,
  status text NOT NULL DEFAULT 'open'
);
```

## 3. Invariants métier clés

1. `module_configs` est **immuable** après émission d'un devis (recalcul = nouvelle config).
2. Un `payment` `confirmed` ne peut jamais être supprimé — uniquement `refunded`.
3. `units.state = 'rented'` ⟺ contrat `active` en mode `rental`/`rent_to_own`.
4. Repossession : transition `rented → repossessed → refurb → in_stock`
   uniquement dans cet ordre, chaque étape émettant un `unit_movement`.
5. `equity_ratio` (rent-to-own) est monotone croissant ; transfert de propriété
   déclenché à 1.0 → contrat `completed`, unité liée définitivement au client.
6. Toute écriture sur `contracts`/`payments` génère un `contract_event` avec
   hash chaîné (audit).

---

# 07 · Intégrations externes

## 1. Paiements — mobile money d'abord

**Stratégie : un agrégateur, pas 4 intégrations directes.**

| Option | Couverture | Note |
|---|---|---|
| **CinetPay** (recommandé MVP) | Orange Money, MTN MoMo, Moov, Wave, cartes — CI/GA/UEMOA | Un seul contrat, webhooks unifiés |
| Alternative : intégrations directes Wave + OM | CI seulement | Meilleures commissions, plus de dev |

Flux type (échéance de location) :

```
Client (/app/paiements)                services/api                 CinetPay
    │  payer échéance #12                   │                           │
    ├──────────────────────────────────────►│  create payment(intent)   │
    │                                       ├──────────────────────────►│
    │            page/push OM/MoMo/Wave ◄───┴───────────────────────────┤
    │  confirme sur son téléphone (USSD/app)                            │
    │                                       │◄── webhook `ACCEPTED` ────┤
    │                                       ├─ payments.status=confirmed
    │                                       ├─ schedule.status=paid
    │                                       ├─ contract_event (hash)
    │  reçu PDF + WhatsApp ◄────────────────┤─ BullMQ: receipt+notify
```

Règles : idempotence par `provider_ref` ; réconciliation quotidienne
(rapport agrégateur vs table `payments`) ; jamais de confirmation côté client
sans webhook serveur.

## 2. WhatsApp Business Cloud API

Canal n°1 du marché. Trois usages, trois exigences :

1. **Entrant (lead)** : deep links `wa.me/<num>?text=<payload devis>` sur tous
   les CTA ; webhook entrant → création/mise à jour du lead dans le CRM ;
   routage par mot-clé (DEVIS, SUIVI, SAV).
2. **Notifications (templates approuvés Meta)** : devis prêt, rappel échéance
   J-3, confirmation paiement, date de pose, ticket SAV. Fallback SMS
   (opérateur local via agrégateur SMS) si non-délivré à H+1.
3. **Conversationnel commercial** : inbox partagée pour `staff_sales`
   (intégrée au CRM Connect — pas d'outil externe, l'historique reste sur le lead).

## 3. OTP & identité

- Auth = téléphone + OTP (WhatsApp d'abord, SMS fallback) — Auth.js custom provider.
- E-signature des contrats : OTP dédié + horodatage + IP + hash du PDF dans
  `contract_events` (valeur probante pragmatique, à valider juriste OHADA).

## 4. Cartographie & zones

- Géocodage des sites de pose : OpenStreetMap/Nominatim (couverture Abidjan OK)
  + saisie assistée par repères (« quartier, rue, repère » — les adresses
  formelles sont rares).
- Zones de livraison : polygones stockés en base (`zones` GeoJSON), contrôle
  au configurateur et à la planification des tournées.

## 5. Logistique & douane (marques annexes + moules)

- Suivi conteneurs : saisie manuelle MVP (n° BL + jalons), API tracking
  (ex. Marine Traffic / ligne maritime) en V2.
- Références douane par produit : champ `hs_code` + catégorie TEC UEMOA/CEDEAO
  (5/10/20 %) dans `products.specs` → estimation coût rendu Abidjan dans
  l'admin catalogue.

## 6. Comptabilité & reporting

- Export **SYSCOHADA** (CSV/Excel) par entité juridique et par marché.
- Rapprochement bancaire/mobile money mensuel automatisé (statuts + écarts).
- KPIs direction (dashboard `/office`) : CA par marque, taux d'impayés,
  délai moyen fabrication→pose, taux de repossession, marge par module.

## 7. Communication produit

- **Génération PDF** : gotenberg (HTML→PDF) pour devis/contrats/reçus/PV —
  mêmes gabarits que la charte (Night/Orange).
- **Emails transactionnels** (secondaire) : Resend/SES, uniquement si email présent.
- **Réseaux sociaux** : Open Graph par fiche module + flux produits
  (catalogue Facebook/Instagram Shopping — canal découverte majeur en CI).

---

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

---

# 09 · Organisation des agents IA du projet Noéma

Le projet est piloté par Jeremy avec une équipe d'agents IA spécialisés.
Chaque agent a un rôle, des livrables et des limites définis.

## 1. Les agents et leurs rôles

| Agent | Rôle | Livrables | Limites |
|---|---|---|---|
| **NOEMA_ENGINEER_AGENT** (ingénieur bâtiment) | Diagnostic technique, système constructif, roadmap ingénierie, veille normative CI | `docs/references/diagnostic-technique-ingenierie-V1.md` (D1-D11, P0-P2, sources qualifiées A/B/C) | Aucune valeur contractuelle : tout doit être validé par un ingénieur structure agréé + bureau de contrôle en CI |
| **Agent stratégie/business** (sessions Claude) | Positionnement, 3 offres de lancement, analyse concurrence (vidéos Brésil/Inde, brochure Kenya), plan de pré-vente LOI | Analyses chantiers (`docs/references/`), plan commercial, prompts de génération visuelle | Les prix restent des ordres de grandeur tant que pas de devis fournisseurs réels datés |
| **Agent dev plateforme** (Claude Code, local PowerShell + web) | Monorepo, 7 sites, API, Connect | Ce repo — architecture `docs/00-08`, code | Ne pousse jamais sur `main` sans demande explicite ; suit la roadmap docs/08 |
| **Génération visuelle** (Sora 2 / ChatGPT Images / fal.ai) | Planches techniques illustratives, rendus commerciaux photoréalistes | Images marketing + planche studio V2 | Les images IA ne sont PAS des plans d'exécution : les cotes exactes vivent dans les dessins vectoriels et les docs — toujours re-vérifier les planches générées (boucle expertise → correction) |

## 2. Le flux de travail validé

```
Idée / besoin (Jeremy)
   │
   ▼
Agent ingénieur ──► diagnostic, décisions D1-D11, points P0
   │                                    │
   ▼                                    ▼
Agent business ──► offre, prix, cible   Génération visuelle ──► rendu/planche
   │                                    │ (boucle : générer → expertiser
   ▼                                    │  → corriger → régénérer)
Agent dev ──► site, configurateur, BOM ◄┘
   │
   ▼
Terrain (prototype, LOI, juriste CI, usine Chine) ──► retours → mise à jour
                                                       NOEMA-PROJET.md
```

**Règle de cohérence** : `NOEMA-PROJET.md` (racine) est la mémoire partagée de
tous les agents. Toute décision actée y est reportée. En cas de contradiction
entre un agent et ce fichier, le fichier gagne — ou Jeremy tranche.

## 3. Déploiement des sessions Claude Code

- **Local (PowerShell, Windows)** : développement quotidien. Lancement :
  `claude` dans le dossier du repo (lit CLAUDE.md automatiquement).
  Mode rapide : `claude --dangerously-skip-permissions` (repo dédié + branche
  protégée = garde-fous git).
- **Web (claude.ai/code)** : sessions d'architecture, analyses lourdes
  (vidéos, PDF), travail asynchrone. Même branche, `git pull` au démarrage.
- **Synchronisation** : les deux environnements poussent sur
  `claude/noema-construction-group-pndut3`. Commits fréquents.

## 4. Dossiers techniques de référence

| Document | Contenu | Emplacement |
|---|---|---|
| Diagnostic ingénierie V1 | Système constructif recommandé, C1-C10, décisions D1-D11 à figer, risques, données CI sourcées (GUPCCU, CIE, SODECI, TEC UEMOA, prix matériaux qualifiés A/B/C) | `docs/references/diagnostic-technique-ingenierie-V1.md` |
| Analyse chantier Brésil | Casa pré-moldada Sorocaba 43 m²/30 jours — séquence de pose 8 étapes, 8 points d'amélioration A1-A8, SOP Noéma v0 | `docs/references/analyse-chantier-bresil-sorocaba.pdf` |
| Jeu de plans V1 (artefact web) | Plans cotés A00-A04 des 3 modules + kit | Artefact Claude (à re-générer en vectoriel dans le repo en Phase 1) |
| Planche studio V2 (image IA) | Studio 3,6×4,8×3,2 — corrections restantes listées dans NOEMA-PROJET.md §2 | Téléchargements Jeremy (à verser dans docs/references/) |
