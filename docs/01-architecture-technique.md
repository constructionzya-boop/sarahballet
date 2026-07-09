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
