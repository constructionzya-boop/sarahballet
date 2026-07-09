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
