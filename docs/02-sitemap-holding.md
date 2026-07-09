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
