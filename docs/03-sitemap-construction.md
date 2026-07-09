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
