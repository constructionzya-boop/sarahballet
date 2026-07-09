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
